export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { input, simple } = req.body;

  // --- HEURISTIC DETECTION ---
  function basicCheck(text) {
    let score = 0;
    let indicators = [];

    const keywords = ['urgent','verify','password','bank','login','click'];

    keywords.forEach(word => {
      if (text.toLowerCase().includes(word)) {
        score += 10;
        indicators.push({ type: 'red', text: `Suspicious keyword: ${word}` });
      }
    });

    if (text.includes('@')) {
      score += 15;
      indicators.push({ type: 'red', text: 'Contains @ symbol' });
    }

    if (/https?:\/\/.*\..*\..*/.test(text)) {
      score += 10;
      indicators.push({ type: 'yellow', text: 'Multiple domains detected' });
    }

    return { score, indicators };
  }

  const basic = basicCheck(input);

  // --- FAST DETECTION ---
  if (basic.score >= 40) {
    return res.json({
      verdict: "PHISHING",
      riskScore: Math.min(100, basic.score + 40),
      summary: simple
        ? "This looks like a scam trying to trick you."
        : "High-risk phishing indicators detected",
      indicators: basic.indicators.slice(0, 4),
      analysis: simple
        ? "This message uses common tricks scammers use, like urgency or fake links."
        : "Detected multiple known phishing patterns using heuristic analysis.",
      recommendations: [
        "Do not click links",
        "Do not enter credentials",
        "Delete message",
        "Report sender"
      ]
    });
  }

  // --- AI ANALYSIS ---
  try {
    const prompt = simple
      ? `Explain simply if this is phishing: ${input}`
      : `Analyze for phishing and return JSON with verdict, riskScore, summary, indicators, analysis, recommendations: ${input}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version":"2023-06-01"
      },
      body: JSON.stringify({
        model:"claude-sonnet-4-20250514",
        max_tokens:500,
        messages:[{ role:"user", content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.content[0].text;

    if (simple) {
      return res.json({
        verdict:"SUSPICIOUS",
        riskScore:50,
        summary:"AI simplified explanation",
        indicators:[{ type:"blue", text:"AI explanation mode" }],
        analysis:text,
        recommendations:["Be cautious"]
      });
    }

    const json = JSON.parse(text.match(/\{[\s\S]*\}/)[0]);
    return res.json(json);

  } catch {
    return res.json({
      verdict:"SUSPICIOUS",
      riskScore:50,
      summary:"Fallback analysis",
      indicators:[{ type:"yellow", text:"AI unavailable" }],
      analysis:"Basic detection used.",
      recommendations:["Be cautious"]
    });
  }
}
