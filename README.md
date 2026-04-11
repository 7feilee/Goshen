<div align="center">

# 🌍 Immigrant Guide

**Free, open-source tools for every immigrant.**

Visa · Language · Family · Assets · Work · Business

No paywalls. No ads. No accounts. Built in public, for everyone.

[![CI](https://github.com/immigrant-guide/immigrant-guide/actions/workflows/ci.yml/badge.svg)](https://github.com/immigrant-guide/immigrant-guide/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Languages](https://img.shields.io/badge/languages-15-blue)](#translations)
[![Countries](https://img.shields.io/badge/countries-5-orange)](#countries)
[![Good First Issues](https://img.shields.io/github/issues/immigrant-guide/immigrant-guide/good%20first%20issue)](../../issues?q=label%3A%22good+first+issue%22)

[**Live site**](https://immigrant-guide.vercel.app) · [**Tools**](https://immigrant-guide.vercel.app/en/tools) · [**Discussions**](../../discussions) · [**Roadmap**](../../projects)

</div>

---

## Why this exists

There are **280 million immigrants** in the world. Most of them navigate an overwhelming tangle of visa rules, bureaucratic letters, language barriers, school systems, tax obligations, and employment rights — alone, in a language they're still learning.

No good free tool exists for this. We're building it together.

---

## Tools

| Tool | Pillar | Countries | Status |
|------|--------|-----------|--------|
| [Visa pathway finder](https://immigrant-guide.vercel.app/en/tools/visa-finder) | Visa | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | ✅ Live |
| [Official letter decoder](https://immigrant-guide.vercel.app/en/tools/letter-decoder) | Language | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | ✅ Live |
| Citizenship test trainer | Visa | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | 🔵 Beta |
| PR eligibility checker | Visa | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | 🔵 Beta |
| Daily language coach | Language | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | 🔵 Beta |
| Credential recognition guide | Work | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | 🔜 Planned |
| Worker rights explainer | Work | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | 🔜 Planned |
| Remittance rate finder | Assets | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | 🔜 Planned |
| Tax residency explainer | Assets | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | 🔜 Planned |
| School system navigator | Family | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | 🔜 Planned |
| Child benefits calculator | Family | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | 🔜 Planned |
| Company formation wizard | Business | 🇺🇸🇩🇪🇬🇧🇨🇦🇦🇺 | 🔜 Planned |

---

## Translations

All tools are available in 15 languages. The app auto-detects your language from your browser.

| Language | Locale | Status | Contributor |
|----------|--------|--------|-------------|
| English | `en` | ✅ Complete | Core team |
| 中文 Chinese | `zh` | ✅ Complete | Core team |
| Español | `es` | 🔜 Needed | — |
| हिन्दी Hindi | `hi` | 🔜 Needed | — |
| العربية Arabic | `ar` | 🔜 Needed | — |
| Português | `pt` | 🔜 Needed | — |
| Français | `fr` | 🔜 Needed | — |
| Deutsch | `de` | 🔜 Needed | — |
| 日本語 Japanese | `ja` | 🔜 Needed | — |
| 한국어 Korean | `ko` | 🔜 Needed | — |
| Tagalog | `tl` | 🔜 Needed | — |
| Русский Russian | `ru` | 🔜 Needed | — |
| Türkçe Turkish | `tr` | 🔜 Needed | — |
| Polski Polish | `pl` | 🔜 Needed | — |
| Українська Ukrainian | `uk` | 🔜 Needed | — |

**👉 [Add a translation — no coding needed](CONTRIBUTING.md#1--translate-into-your-language)**

---

## Countries

| Country | Immigrant population | Data status | Last verified |
|---------|---------------------|-------------|---------------|
| 🇺🇸 United States | 50M | ✅ Complete | Jan 2025 |
| 🇩🇪 Germany | 16M | ✅ Complete | Jan 2025 |
| 🇬🇧 United Kingdom | 10M | 🔜 Needed | — |
| 🇨🇦 Canada | 8.3M | 🔜 Needed | — |
| 🇦🇺 Australia | 8M | 🔜 Needed | — |

Priority countries after launch: 🇫🇷 France · 🇳🇱 Netherlands · 🇸🇪 Sweden · 🇯🇵 Japan · 🇸🇬 Singapore

**👉 [Add or fix country data — no coding needed](content/CONTRIBUTING.md)**

---

## How to contribute

### No coding needed
| What | How |
|------|-----|
| Translate into your language | [Guide](CONTRIBUTING.md#1--translate-into-your-language) · [Issue template](../../issues/new?template=translation.yml) |
| Fix wrong visa information | [Guide](content/CONTRIBUTING.md) · [Issue template](../../issues/new?template=content_update.yml) |
| Add a country's data | [Guide](content/CONTRIBUTING.md) · Edit `content/countries/{CODE}/data.json` |
| Report a bug | [Bug report](../../issues/new?template=bug_report.yml) |
| Request a new tool | [Tool request](../../issues/new?template=tool_request.yml) |

### For developers
```bash
git clone https://github.com/immigrant-guide/immigrant-guide.git
cd immigrant-guide
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev                  # → http://localhost:3000
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for architecture guide, adding tools, and PR checklist.

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 App Router · TypeScript |
| Styling | Tailwind CSS |
| Internationalisation | next-intl · 15 locales · auto-detect · RTL support |
| AI | Anthropic Claude (streaming, multilingual) |
| Hosting | Vercel (free tier) |
| CI | GitHub Actions (build · translations · security · content) |

---

## Project structure

```
immigrant-guide/
├── src/
│   ├── app/[locale]/          # Pages — auto locale-routed
│   │   ├── page.tsx           # Homepage
│   │   └── tools/             # Tool pages
│   │       ├── visa-finder/
│   │       ├── letter-decoder/
│   │       └── ...
│   ├── app/api/ai/            # Streaming AI endpoints
│   ├── lib/ai/                # Prompt builders + Anthropic client
│   ├── lib/data/              # Countries + tools registry
│   └── types/                 # Shared TypeScript types
│
├── messages/                  # ← Translations live here
│   ├── en/common.json         # English source of truth
│   ├── zh/common.json
│   └── {locale}/common.json  # Add your language here
│
├── content/                   # ← Country data lives here (no code)
│   ├── countries/
│   │   ├── US/data.json
│   │   ├── DE/data.json
│   │   └── {CODE}/data.json  # Add your country here
│   └── CONTRIBUTING.md        # Schema + rules for content
│
├── scripts/
│   ├── validate-translations.mjs   # Checks all locales match EN keys
│   └── new-translation.mjs         # Scaffolds a new language file
│
└── .github/
    ├── workflows/ci.yml            # Build · translations · security · content
    ├── ISSUE_TEMPLATE/             # Bug · translation · content · tool request
    └── labels.json                 # All labels (import via GitHub CLI)
```

---

## Community

- 💬 [GitHub Discussions](../../discussions) — questions, ideas, sharing your story
- 🐛 [Issues](../../issues) — bugs and concrete tasks
- 📣 Announcements — watch this repo for updates

---

## Disclaimer

This project provides general information only. Nothing here is legal advice. Immigration rules change and vary by individual circumstance. Always consult a licensed immigration lawyer or your country's official immigration authority for your specific situation.

---

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START -->
*Be the first contributor — your name goes here.*
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## License

MIT — free to use, fork, and build on. See [LICENSE](LICENSE).

---

<div align="center">

*Built in public · For everyone · Forever free*

**[⭐ Star this repo](../../stargazers) to help others find it**

</div>
