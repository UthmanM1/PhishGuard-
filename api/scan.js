export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { input } = req.body;

  const prompt = `
You are PhishGuard AI.

Return ONLY JSON:

{
  "verdict": "PHISHING" | "SUSPICIOUS" | "SAFE",
  "riskScore": number,
  "confidence": number,
  "summary": "",
  "attackType": "",
  "technicalBreakdown": {
    "domainAnalysis": "",
    "languageAnalysis": ""
  },
  "timeline": [],
  "indicators": [],
  "recommendations": [],
  "educationalTip": ""
}

Analyze:
${input}
`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.content[0].text;

    const json = JSON.parse(text.match(/\{[\s\S]*\}/)[0]);

    res.status(200).json(json);

  } catch (e) {
    res.status(200).json({
      verdict: "SUSPICIOUS",
      riskScore: 50,
      confidence: 60,
      summary: "Fallback mode",
      attackType: "Unknown",
      technicalBreakdown: {
        domainAnalysis: "N/A",
        languageAnalysis: "N/A"
      },
      timeline: ["User receives message", "Clicks link", "Risk occurs"],
      indicators: [{ text: "Basic heuristic triggered" }],
      recommendations: ["Do not click unknown links"],
      educationalTip: "Always verify sender identity"
    });
  }
}
