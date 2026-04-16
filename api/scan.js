export default async function handler(req, res) {
  try {
    const { input, type } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Missing input" });
    }

    const typeLabel =
      type === "url"
        ? "URL"
        : type === "email"
        ? "email"
        : "text message";

    const systemPrompt = `You are PhishGuard, an expert cybersecurity AI.

Return ONLY JSON:
{
  "verdict": "PHISHING" | "SUSPICIOUS" | "SAFE",
  "riskScore": 0-100,
  "summary": "",
  "simpleExplanation": "",
  "attackType": "",
  "confidence": 0-100,
  "indicators": [
    { "type": "red|yellow|green|blue", "text": "" }
  ],
  "analysis": "",
  "recommendations": []
}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 900,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: `Analyse this ${typeLabel}:\n\n${input}`
          }
        ]
      })
    });

    const data = await response.json();

    const raw = data.content?.[0]?.text || "{}";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : {};
    }

    res.status(200).json(parsed);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
