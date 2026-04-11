# How to contribute country data

Country data lives in `content/countries/{CODE}/data.json`.
No coding needed — just edit the JSON file and open a pull request.

---

## File structure

```
content/
  countries/
    US/data.json      ← United States
    DE/data.json      ← Germany
    UK/data.json      ← United Kingdom
    CA/data.json      ← Canada
    AU/data.json      ← Australia
    FR/data.json      ← Add a new country like this
```

---

## Full schema with descriptions

```jsonc
{
  // ISO 3166-1 alpha-2 country code
  "code": "FR",

  // English name
  "name": "France",

  // Emoji flag
  "flag": "🇫🇷",

  // Approximate immigrant population (string, e.g. "8M", "500K")
  "immigrantPopulation": "8M",

  // Top 5 origin countries of immigrants
  "topOrigins": ["Algeria", "Morocco", "Portugal", "Tunisia", "Italy"],

  // Link to official immigration authority website
  "officialImmigrationWebsite": "https://www.immigration.interieur.gouv.fr",

  // YYYY-MM — when you last verified this information
  "lastVerified": "2025-01",

  // Array of visa routes — add as many as you know
  "visas": [
    {
      // Unique ID — lowercase, no spaces
      "id": "talent-passport",

      // Full official name
      "name": "Talent Passport (Passeport Talent)",

      // One of: work | study | family | asylum | business | working_holiday | investor
      "category": "work",

      // 2–3 sentence plain-language description
      "description": "Multi-year permit for highly skilled workers, researchers, investors, and artists. Covers many sub-categories.",

      // List of key requirements — plain language, bullet-ready
      "requirements": [
        "Qualifying profession (researcher, executive, investor, etc.)",
        "Salary above 1.5x minimum wage (for most categories)",
        "Job offer or business plan"
      ],

      // Realistic processing time including consulate wait
      "processingTime": "2–4 months",

      // Approximate fee
      "fee": "€99",

      // Maximum duration before renewal needed
      "maxDuration": "4 years",

      // What this visa can lead to, or null if it doesn't lead anywhere
      "leadsTo": "10-year residence card after conditions met",

      // null if no cap, or number if there is a cap
      "annualCap": null,

      // REQUIRED: Link to official government page for this visa
      "source": "https://www.service-public.fr/particuliers/vosdroits/F16922"
    }
  ],

  // Citizenship / naturalisation information
  "citizenship": {
    "name": "Naturalisation",
    "requiresResidency": "5 years legal residence",
    "languageRequirement": "French B1",
    "testName": "No formal test — interview-based",
    "testQuestions": null,
    "testPassMark": null,
    "fee": 55,
    "dualCitizenshipAllowed": true,
    "note": "Optional note about anything unusual",
    "source": "https://www.service-public.fr/particuliers/vosdroits/F2213"
  },

  // Key welfare benefits
  "benefits": {
    "childBenefit": "Allocations familiales — varies by number of children",
    "healthInsurance": "Sécurité Sociale — universal coverage",
    "unemployment": "Allocation chômage — up to 57% of salary for up to 24 months",
    "source": "https://www.caf.fr"
  },

  // Brief tax notes for immigrants
  "taxNotes": "France taxes worldwide income for tax residents (183+ days/year).",

  // List people who contributed to this file
  "contributors": ["@githubusername — what you added, date"]
}
```

---

## Rules for contributors

1. **Every factual claim must link to an official source** in the `source` field.
2. **Date your verification** in `lastVerified` — rules change, stale data is dangerous.
3. **Plain language** — write for someone with basic English proficiency, not a lawyer.
4. **No legal advice** — describe facts, not recommendations. ("You need X" not "You should apply for X")
5. **Add yourself to `contributors`** so we can credit you and ask follow-up questions.

---

## Adding a new country

1. Create `content/countries/{CODE}/data.json`
2. Use the schema above
3. Open a pull request with label `content` + `good first issue`
4. A maintainer will review the facts before merging

Priority countries needing data: 🇫🇷 France, 🇳🇱 Netherlands, 🇸🇪 Sweden, 🇨🇭 Switzerland, 🇯🇵 Japan, 🇸🇬 Singapore, 🇳🇿 New Zealand
