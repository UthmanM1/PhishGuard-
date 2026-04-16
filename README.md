# 🛡 PhishGuard

**AI-powered phishing detection for URLs, emails, and text messages.**

> Built for Tech Builder Program Hackathon 2026 — Cybersecurity & Privacy Category

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20App-00f5a0?style=for-the-badge)](https://your-deployed-url.vercel.app)

---

## What It Does

PhishGuard lets you paste any suspicious URL, email, or text message and get an instant AI-powered threat analysis:

- ✅ **Verdict** — PHISHING / SUSPICIOUS / SAFE
- 📊 **Risk Score** — 0 to 100 threat rating
- 🔍 **4-Point Indicators** — specific red flags and safe signals
- 🤖 **AI Explanation** — plain-language reasoning, not just a label
- 💡 **Recommendations** — exactly what to do next

---

## Quick Start

### Option 1: Use it directly (no setup)
Just open `index.html` in your browser. Enter your [Anthropic API key](https://console.anthropic.com/) when prompted.

### Option 2: Deploy to Vercel (free, 2 minutes)
```bash
# 1. Fork or clone this repo
git clone https://github.com/yourusername/phishguard

# 2. Deploy to Vercel
npx vercel --prod
```

### Option 3: Deploy to Netlify
Drag and drop `index.html` into [netlify.com/drop](https://app.netlify.com/drop) — done.

---

## Setup

1. Get a free API key from [console.anthropic.com](https://console.anthropic.com/)
2. Open PhishGuard in your browser
3. Paste your API key into the setup field and click Save
4. Your key is stored locally — it never leaves your browser

---

## How It Works

```
Your Input → PhishGuard UI → Claude AI API → Structured Analysis → Visual Results
```

PhishGuard sends your URL/email/text to Claude (Anthropic's AI) with a cybersecurity expert system prompt. Claude returns a structured JSON analysis that PhishGuard renders as a clean visual result.

Unlike traditional blocklist-based tools, AI analysis understands **context** — detecting novel phishing attempts based on tactics, not just known domains.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| AI Engine | Anthropic Claude claude-sonnet-4 |
| Hosting | Vercel / Netlify / GitHub Pages |
| Dependencies | None |

Single-file architecture — everything is in `index.html`. No npm, no build step, no framework.

---

## Features

- 🔗 **URL Scanner** — domain spoofing, suspicious patterns, homograph attacks
- 📧 **Email Analyser** — urgency language, impersonation, social engineering
- 📝 **Text Scanner** — smishing, chat-based phishing
- 🌙 **Dark mode UI** — cybersecurity-themed professional interface
- 📱 **Responsive** — works on mobile and desktop
- 🔒 **Privacy-first** — no data stored, no tracking

---

## Screenshots

> *[Add screenshots of your deployed app here]*

---

## Why PhishGuard?

Phishing attacks cause **$4.9M average breach cost** and are involved in **36% of all data breaches**. Existing tools either:
- Require technical knowledge to use
- Only check against static blocklists (miss new attacks)
- Give verdicts without explanations

PhishGuard combines the accessibility of a simple web form with the sophistication of AI reasoning — making professional-grade phishing analysis available to anyone.

---

## License

MIT — free to use, modify, and deploy.

---

*Tech Builder Program 2026 | Cybersecurity & Privacy*
