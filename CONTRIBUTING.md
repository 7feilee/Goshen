# Contributing to Goshen

Welcome — and thank you. This project exists for the 280 million people navigating a new country. Every contribution, however small, makes a real difference.

**You do not need to be a developer to contribute.** Some of the most valuable work is translations, factual corrections, and sharing your experience as an immigrant.

---

## Four ways to contribute

### 1. 🌍 Translate into your language
**No coding needed. Highest impact.**

Each language unlocks the platform for millions of people. We need:

| Language | Locale | Status |
|----------|--------|--------|
| Farsi | `fa` | Needed |
| Vietnamese | `vi` | Needed |
| Swahili | `sw` | Needed |
| Bengali | `bn` | Needed |
| Urdu | `ur` | Needed |
| Amharic | `am` | Needed |

**How to add a new language:**

```bash
# 1. Fork this repo and clone it
git clone https://github.com/YOUR_USERNAME/goshen.git
cd goshen

# 2. Generate a translation scaffold
node scripts/new-translation.mjs fa   # replace 'fa' with your locale

# 3. Open messages/fa/common.json
# Replace every "[TRANSLATE] ..." value with your translation

# 4. Validate your work
node scripts/validate-translations.mjs

# 5. Open a pull request
```

Rules:
- Translate the **values**, never the **keys**
- Use formal register — these are immigration documents
- If a term has no direct equivalent, keep the original and add a note in your PR
- You must be a native or fluent speaker

---

### 2. 📝 Fix or add country information
**No coding needed.**

Immigration rules change. Visa fees, processing times, language requirements — all of it goes stale. You can fix this by editing a JSON file.

Files live in `content/countries/{CODE}/data.json`.

See [`content/CONTRIBUTING.md`](content/CONTRIBUTING.md) for the full schema and rules.

Every factual change **must** include:
- A link to the official government source
- The date you verified the information

---

### 3. 🛠 Build or improve a tool
**For developers.**

Tools are Next.js pages in `src/app/[locale]/tools/`.
Client-side engines live in `src/lib/engines/`.

**Adding a new tool — 3 steps:**

```
1. src/app/[locale]/tools/my-tool/page.tsx   — UI (React component)
2. src/lib/engines/my-tool.ts                — Client-side logic (no API needed)
3. src/lib/data/tools.ts                     — Register the tool
```

All processing runs entirely in the browser — no API keys, no server required.

Good first issues are labelled [`good first issue`](../../issues?q=label%3A%22good+first+issue%22).

**Setup:**

```bash
git clone https://github.com/goshen/goshen.git
cd goshen
npm install
npm run dev
# No environment variables required
```

---

### 4. 🐛 Report a bug or wrong information
**Just open an issue — takes 2 minutes.**

Wrong immigration information is the most urgent type of bug. It can affect real decisions. Please report it immediately.

Use the [bug report template](../../issues/new?template=bug_report.yml).

---

## Ground rules

| Rule | Why |
|------|-----|
| Accuracy over speed | Wrong immigration info can ruin lives |
| Every fact needs a source | We can't verify everything ourselves |
| Plain language always | Many users have limited English proficiency |
| No legal advice | Always add the disclaimer: *"General information only — not legal advice"* |
| No user data stored | All tools are stateless and run client-side — no inputs ever leave the browser |
| Respectful tone | See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) |

---

## PR checklist

- [ ] `npm run build` passes
- [ ] `npm run lint` passes  
- [ ] If translation: `node scripts/validate-translations.mjs` passes
- [ ] If immigration facts changed: official source linked in PR description
- [ ] No `.env` files or API keys committed

---

## Getting help

- **Questions about contributing:** [GitHub Discussions](../../discussions)
- **Found a bug:** [Bug report](../../issues/new?template=bug_report.yml)
- **Want to add a language:** [Translation issue](../../issues/new?template=translation.yml)
- **Security issue:** 7feilee@gmail.com (not a public issue)

---

## Recognition

All contributors are listed in the README and in the relevant `data.json` files. Translators are credited on the language's page in the app.

---

*By contributing, you agree your work is licensed under MIT.*
