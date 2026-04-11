# Quick-start for first-time contributors

## Option A — Translation (no code needed)

1. Fork this repo on GitHub
2. Run: `node scripts/new-translation.mjs {locale}` (e.g. `fa` for Farsi)
3. Open `messages/{locale}/common.json`
4. Replace every `"[TRANSLATE] ..."` value with your translation
5. Open a pull request

CI automatically checks you haven't missed any keys.

---

## Option B — Country data (no code, edit JSON)

1. Fork and clone the repo
2. Open `content/countries/{CODE}/data.json`
3. Fill in or correct fields — see `content/CONTRIBUTING.md` for the schema
4. Every fact must link to an official government source
5. Open a pull request with label `content`

---

## Option C — Code (developers)

```bash
git clone https://github.com/YOUR_USERNAME/goshen.git
cd goshen
npm install
npm run dev                  # → localhost:3000
# No environment variables required
```

Find work: issues labelled `good first issue` or `help wanted`.

Before PR:
```bash
npm run lint && npm run build
node scripts/validate-translations.mjs
```

---

## Good PR title examples

```
feat: add Spanish translation
fix: correct H-1B processing time (source: uscis.gov)
feat: add UK country data
feat: add worker rights tool for Germany
```

---

Questions? Open a [Discussion](../../discussions).
