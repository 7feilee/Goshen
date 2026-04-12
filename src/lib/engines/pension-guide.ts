/**
 * Pension Guide data engine for the Goshen immigration platform.
 *
 * Covers pension and retirement systems of US, DE, UK, CA, and AU for immigrant workers.
 * Fully static -- no server or API required. All figures use 2024/2025 data.
 */

import type { CountryCode } from "@/types"

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface ContributionRate {
  party: string
  rate: string
  cap?: string
  note?: string
}

export interface KeyNumber {
  label: string
  value: string
  sub?: string
}

export interface PensionItem {
  label: string
  value: string
  note?: string
}

export interface PensionSection {
  heading: string
  items: PensionItem[]
}

export interface PensionCategory {
  id: string
  title: string
  icon: string
  sections: PensionSection[]
}

export interface PensionData {
  country: CountryCode
  flag: string
  name: string
  systemType: string
  systemOverview: string
  retirementAge: string
  immigrantNote: string
  keyNumbers: KeyNumber[]
  contributions: ContributionRate[]
  categories: PensionCategory[]
  officialAuthority: { name: string; url: string }
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const PENSION_DATA: PensionData[] = [
  // ── United States ─────────────────────────────────────────────────────────
  {
    country: "US",
    flag: "🇺🇸",
    name: "United States",
    systemType: "Three-pillar system",
    systemOverview:
      "The US retirement system rests on Social Security (mandatory public insurance), employer-sponsored plans such as 401(k), and individual savings accounts like IRAs. Immigrants who work and pay FICA taxes accrue the same Social Security credits as citizens.",
    retirementAge: "67 (born 1960 or later)",
    immigrantNote:
      "Immigrants with a valid SSN who pay FICA taxes build Social Security credits from day one. The US has totalization agreements with 30 countries to prevent double contributions and allow credit portability.",
    keyNumbers: [
      { label: "Full Retirement Age", value: "67", sub: "born 1960 or later" },
      { label: "Early Retirement", value: "62", sub: "reduced benefit" },
      { label: "Max Delay Bonus", value: "Age 70", sub: "+8% per year after FRA" },
      { label: "2024 Max Monthly Benefit", value: "$3,822", sub: "at full retirement age" },
      { label: "Quarters Needed", value: "40", sub: "approx. 10 years of work" },
      { label: "OASDI Wage Base 2024", value: "$168,600", sub: "above this SS tax stops" },
    ],
    contributions: [
      {
        party: "Employee",
        rate: "6.2% OASDI + 1.45% Medicare",
        cap: "OASDI capped at $168,600 (2024); Medicare uncapped",
        note: "Additional 0.9% Medicare surtax on wages above $200k single / $250k joint",
      },
      {
        party: "Employer",
        rate: "6.2% OASDI + 1.45% Medicare",
        cap: "Same wage base as employee",
        note: "Employer share is not visible on pay stub but is required by law",
      },
      {
        party: "Self-employed",
        rate: "15.3% (12.4% OASDI + 2.9% Medicare)",
        cap: "OASDI capped at $168,600 (2024)",
        note: "Deduct half of SE tax on Form 1040; same net benefit as employed workers",
      },
    ],
    categories: [
      {
        id: "state",
        title: "Social Security (OASDI)",
        icon: "🏛️",
        sections: [
          {
            heading: "How it works",
            items: [
              {
                label: "Earnings credits",
                value: "You earn up to 4 credits per year; 40 lifetime credits (10 years) needed for retirement benefit",
              },
              {
                label: "Benefit calculation",
                value: "Based on Average Indexed Monthly Earnings (AIME) across your 35 highest-earning years",
              },
              {
                label: "Primary Insurance Amount",
                value: "Calculated via a progressive bend-point formula applied to your AIME",
                note: "Lower earners replace a higher share of pre-retirement income",
              },
              {
                label: "Medicare",
                value: "Part A (hospital) is premium-free if you have 40 Medicare credits; Part B has a monthly premium",
              },
            ],
          },
          {
            heading: "Retirement age and adjustments",
            items: [
              {
                label: "Full Retirement Age (FRA)",
                value: "67 for anyone born 1960 or later",
              },
              {
                label: "Early claiming at 62",
                value: "Benefit permanently reduced by up to 30%",
                note: "Reduction is roughly 5/9% per month for first 36 months, then 5/12%",
              },
              {
                label: "Delayed retirement credits",
                value: "Benefit grows 8% for each year you delay past FRA, up to age 70",
              },
              {
                label: "Spousal benefit",
                value: "Up to 50% of your spouse's PIA; survivor benefit up to 100%",
              },
              {
                label: "Cost-of-living adjustment (COLA)",
                value: "Annual adjustment based on CPI-W; 2024 COLA was 3.2%",
              },
            ],
          },
          {
            heading: "Eligibility and means-testing",
            items: [
              {
                label: "Minimum requirement",
                value: "40 credits (10 years of covered employment)",
                note: "Totalization agreement credits can fill gaps",
              },
              {
                label: "Means-testing",
                value: "Social Security is not means-tested; all eligible workers receive benefits regardless of other income or assets",
              },
              {
                label: "Supplemental Security Income (SSI)",
                value: "Separate means-tested program for low-income aged/disabled; most immigrants ineligible for 5 years",
              },
              {
                label: "Earnings test before FRA",
                value: "Benefits reduced $1 for every $2 earned above $22,320 (2024) if you claim early and keep working",
              },
            ],
          },
        ],
      },
      {
        id: "workplace",
        title: "Employer-Sponsored Plans",
        icon: "🏢",
        sections: [
          {
            heading: "401(k) and similar plans",
            items: [
              {
                label: "401(k)",
                value: "Most common private-sector plan; contributions are pre-tax (traditional) or post-tax (Roth); investments chosen by employee from a menu",
              },
              {
                label: "Employer match",
                value: "Common range is 3-6% of salary; no federal mandate to offer or match",
                note: "Always contribute at least enough to capture the full employer match -- it is free compensation",
              },
              {
                label: "403(b)",
                value: "Tax-sheltered annuity plan for non-profits, public schools, and some government workers; similar rules to 401(k)",
              },
              {
                label: "Defined benefit (pension)",
                value: "Mostly found in public sector (federal, state, local government); provides a guaranteed monthly income in retirement based on years of service and salary",
              },
              {
                label: "Vesting",
                value: "Employer contributions may vest over 2-6 years depending on the plan schedule; your own contributions are always 100% vested immediately",
              },
            ],
          },
          {
            heading: "Plan limits and participation",
            items: [
              {
                label: "Employee contribution limit 2024",
                value: "$23,000 (401k/403b); $30,500 if age 50 or older (catch-up)",
              },
              {
                label: "Total annual additions limit 2024",
                value: "$69,000 (combined employee + employer contributions)",
              },
              {
                label: "Eligibility waiting period",
                value: "Plans may require up to 1 year of service before participation; SECURE 2.0 requires long-term part-time worker coverage",
              },
              {
                label: "ERISA protections",
                value: "Federal law sets fiduciary standards and ensures plan assets are held in trust separate from employer assets",
              },
            ],
          },
          {
            heading: "Public sector pensions",
            items: [
              {
                label: "Federal Employees Retirement System (FERS)",
                value: "Three-part system: Basic Benefit Plan (DB), TSP (401k-like), and Social Security",
              },
              {
                label: "State and local pensions",
                value: "Typically defined benefit; benefit formulas vary widely by state and plan",
              },
              {
                label: "Portability challenge",
                value: "Defined benefit public pensions are often not portable; switching jobs before vesting forfeits employer-funded accruals",
              },
            ],
          },
        ],
      },
      {
        id: "private",
        title: "Private and Voluntary Savings",
        icon: "💰",
        sections: [
          {
            heading: "Individual Retirement Accounts (IRAs)",
            items: [
              {
                label: "Traditional IRA contribution limit 2024",
                value: "$7,000 ($8,000 if age 50 or older)",
                note: "Deductibility phases out if covered by workplace plan and income is above $77k single / $123k married (2024)",
              },
              {
                label: "Roth IRA",
                value: "Contributions are after-tax but qualified withdrawals (including growth) are tax-free in retirement",
                note: "Phase-out: $146k-$161k single, $230k-$240k married (2024); excess earners can use backdoor Roth",
              },
              {
                label: "Required Minimum Distributions",
                value: "Traditional IRA and 401(k): must start withdrawals at age 73 (SECURE 2.0); Roth IRA has no RMDs during owner lifetime",
              },
              {
                label: "Early withdrawal penalty",
                value: "10% penalty plus ordinary income tax on pre-age-59.5 withdrawals from traditional accounts; exceptions apply",
              },
            ],
          },
          {
            heading: "Health Savings Account (HSA)",
            items: [
              {
                label: "Triple tax advantage",
                value: "Contributions deductible, growth tax-free, withdrawals tax-free for qualified medical expenses",
              },
              {
                label: "2024 contribution limits",
                value: "$4,150 (self-only) / $8,300 (family) HDHP coverage required",
              },
              {
                label: "Retirement use",
                value: "After age 65, HSA funds can be withdrawn for any purpose (taxed as ordinary income, like traditional IRA); medical expenses remain tax-free",
              },
            ],
          },
          {
            heading: "Other voluntary savings",
            items: [
              {
                label: "SEP-IRA",
                value: "For self-employed and small business owners; up to 25% of net self-employment income or $69,000 (2024)",
              },
              {
                label: "SIMPLE IRA",
                value: "For small employers (100 or fewer employees); employee limit $16,000 (2024); mandatory employer match",
              },
              {
                label: "After-tax brokerage accounts",
                value: "No contribution limits; long-term capital gains taxed at 0%, 15%, or 20% depending on income; no special retirement protections",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant-Specific Rules",
        icon: "🌍",
        sections: [
          {
            heading: "Social Security and visa status",
            items: [
              {
                label: "Who pays FICA",
                value: "All workers with a valid SSN authorized to work in the US must pay FICA; this includes green card holders and most work visa holders",
              },
              {
                label: "F-1 and J-1 exemptions",
                value: "Nonresident alien students (F-1) and exchange visitors (J-1) are generally exempt from FICA for the first 5 years of US presence",
                note: "Once classified as resident aliens for tax purposes, FICA applies",
              },
              {
                label: "SSN requirement",
                value: "You need an SSN (or ITIN for tax filing only) to work legally; SSN is required to receive Social Security benefits",
              },
              {
                label: "Benefits abroad",
                value: "Social Security benefits can be paid to most countries; payments blocked to North Korea, Cuba, and certain sanctioned countries",
              },
            ],
          },
          {
            heading: "Totalization agreements",
            items: [
              {
                label: "Coverage",
                value: "US has totalization agreements with 30 countries including Germany, UK, Canada, Australia, Japan, and most of Western Europe",
              },
              {
                label: "Double-contribution avoidance",
                value: "If you work temporarily in the US and your home country has an agreement, you may pay only into one system (usually where you were sent from)",
              },
              {
                label: "Credit portability",
                value: "Contribution periods in both countries can be combined to meet minimum eligibility requirements in either country",
              },
              {
                label: "Claiming benefits from both",
                value: "You may receive a partial benefit from each country based on the credits earned in that country; benefits are not combined into one payment",
              },
              {
                label: "Certificate of Coverage",
                value: "Obtain a Certificate of Coverage from SSA or the foreign country to prove which system you pay into while working abroad",
              },
            ],
          },
          {
            heading: "Contributions if you leave",
            items: [
              {
                label: "Vested credits stay",
                value: "Social Security credits earned in the US are permanently yours; you can claim them at retirement age even if you no longer live in the US",
              },
              {
                label: "401(k) portability",
                value: "You can leave the 401(k) with the plan, roll it into an IRA, or take a distribution (subject to 10% penalty + tax if under 59.5)",
              },
              {
                label: "No SS refund",
                value: "Unlike some countries, the US does not offer a refund of Social Security contributions if you leave permanently; use a totalization agreement to convert credits",
              },
            ],
          },
        ],
      },
      {
        id: "claiming",
        title: "Claiming and Retirement",
        icon: "📋",
        sections: [
          {
            heading: "How to apply for Social Security",
            items: [
              {
                label: "When to apply",
                value: "Apply up to 4 months before the month you want benefits to begin at SSA.gov or by phone/in-person",
              },
              {
                label: "Documents needed",
                value: "Proof of age (birth certificate or passport), W-2s or self-employment tax returns, military discharge papers if applicable",
              },
              {
                label: "Direct deposit",
                value: "Benefits paid by direct deposit to US bank account; international direct deposit available to many countries",
              },
              {
                label: "my Social Security",
                value: "Create an account at my.SSA.gov to view your earnings history, estimated benefit, and request a Social Security Statement",
              },
            ],
          },
          {
            heading: "Taxation of benefits",
            items: [
              {
                label: "Combined income threshold",
                value: "Up to 85% of Social Security benefits may be taxable if combined income exceeds $34,000 (single) or $44,000 (married filing jointly)",
                note: "Combined income = AGI + nontaxable interest + 50% of SS benefits",
              },
              {
                label: "State taxes",
                value: "37 states do not tax Social Security benefits; 11 states tax to some degree; check your state rules",
              },
              {
                label: "Non-resident alien withholding",
                value: "If you live outside the US when receiving benefits, 25.5% may be withheld unless a tax treaty reduces or eliminates withholding",
              },
            ],
          },
          {
            heading: "Planning tools",
            items: [
              {
                label: "SSA Retirement Estimator",
                value: "ssa.gov/estimator -- estimates your benefit at different claiming ages using your actual earnings record",
              },
              {
                label: "Social Security Statement",
                value: "Available online at my.SSA.gov; mailed at ages 25, 30, 35, 40, 45, 50, 55, and 60 if not registered online",
              },
              {
                label: "Windfall Elimination Provision (WEP)",
                value: "Reduces SS benefit if you also receive a pension from work not covered by Social Security (e.g., some foreign pensions or US public pensions)",
                note: "Government Pension Offset (GPO) affects spousal/survivor benefits in similar situations",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Social Security Administration (SSA)", url: "https://www.ssa.gov" },
  },

  // ── Germany ────────────────────────────────────────────────────────────────
  {
    country: "DE",
    flag: "🇩🇪",
    name: "Germany",
    systemType: "Three-pillar system",
    systemOverview:
      "Germany operates a statutory pay-as-you-go pension (Gesetzliche Rentenversicherung), mandatory occupational pension entitlements (bAV), and subsidized private pensions such as Riester and Rürup. Contributions earn Entgeltpunkte (earnings points) which determine the final benefit.",
    retirementAge: "67 (phased in by 2031)",
    immigrantNote:
      "Germany has bilateral social security agreements with over 50 countries and full EU coordination. EU/EEA contribution periods count toward the German minimum. Non-EU nationals who leave before 5 years may request a refund of their own contributions.",
    keyNumbers: [
      { label: "Total GRV Contribution Rate", value: "18.6%", sub: "split 9.3% employee / 9.3% employer" },
      { label: "Standard Retirement Age", value: "67", sub: "fully phased in by 2031" },
      { label: "Minimum Wartezeit", value: "5 years", sub: "for standard pension" },
      { label: "Full Pension Wartezeit", value: "45 years", sub: "for Altersrente fur besonders langj. Versicherte" },
      { label: "Average Monthly Pension 2024", value: "~1,543 EUR", sub: "West Germany; East slightly lower" },
      { label: "Riester Basic Allowance", value: "175 EUR/year", sub: "plus 300 EUR per child" },
    ],
    contributions: [
      {
        party: "Employee",
        rate: "9.3% of gross salary",
        cap: "Beitragsbemessungsgrenze: 90,600 EUR/yr West / 89,400 EUR/yr East (2024)",
        note: "Contributions above the ceiling are exempt; ceiling is adjusted annually",
      },
      {
        party: "Employer",
        rate: "9.3% of gross salary",
        cap: "Same Beitragsbemessungsgrenze as employee",
        note: "Employer also pays half of long-term care, health, and unemployment insurance",
      },
      {
        party: "Self-employed",
        rate: "18.6% (full rate) or opt-in to GRV voluntarily",
        note: "Most self-employed are not automatically in GRV; some professions (Handwerker, artists via KSK) have mandatory coverage; Rürup-Rente is the main alternative",
      },
      {
        party: "State",
        rate: "Federal subsidies for Riester and Rürup pension savers",
        note: "Riester: state pays basic allowance 175 EUR + 300 EUR per child under 25 directly into the contract",
      },
    ],
    categories: [
      {
        id: "state",
        title: "Gesetzliche Rentenversicherung (GRV)",
        icon: "🏛️",
        sections: [
          {
            heading: "How Entgeltpunkte work",
            items: [
              {
                label: "Earnings points system",
                value: "Each year you earn Entgeltpunkte (EP) proportional to your earnings relative to the national average; earning exactly the average gives 1.0 EP per year",
              },
              {
                label: "Pension calculation",
                value: "Monthly pension = Total EP x Zugangsfaktor x Rentenartfaktor x Aktueller Rentenwert; Rentenwert West = 37.60 EUR (July 2024)",
              },
              {
                label: "Kindererziehungszeiten",
                value: "3 Entgeltpunkte credited per child born after 1992 (1 EP for children born before 1992) regardless of whether you worked during childcare",
              },
              {
                label: "Credits for unemployment / illness",
                value: "Periods of registered unemployment (ALG I) and sick pay (Krankengeld) are credited and count toward the Wartezeit",
              },
              {
                label: "Zugangsfaktor",
                value: "1.0 at standard retirement age; reduced 0.3% per month of early retirement; increased 0.5% per month of deferral beyond 67",
              },
            ],
          },
          {
            heading: "Retirement age options",
            items: [
              {
                label: "Standard (Regelaltersrente)",
                value: "Age 67 (fully applicable to those born 1964 or later); currently being phased in from 65",
              },
              {
                label: "Long-service early retirement (45 years)",
                value: "Possible at 63-65 depending on birth year if you have 45 years of Wartezeit",
              },
              {
                label: "Reduced early retirement (35 years)",
                value: "Possible from age 63 with permanent deductions of 0.3% per month taken early",
              },
              {
                label: "Disability pension (Erwerbsminderungsrente)",
                value: "Available before retirement age if medically certified to be unable to work more than 3 hours per day",
              },
            ],
          },
          {
            heading: "Benefit levels and supplements",
            items: [
              {
                label: "Mindestschutz (minimum protection)",
                value: "Germany does not have a statutory minimum pension; Grundsicherung im Alter (basic income top-up) applies for those with low pensions",
              },
              {
                label: "Rentenanpassung (annual adjustment)",
                value: "Pensions are adjusted each July based on wage growth in Germany; adjustments were +4.57% West / +5.86% East in July 2024",
              },
              {
                label: "Survivors pension (Hinterbliebenenrente)",
                value: "Widow/widower receives 55% (large widow's pension) or 25% (small) of the deceased's pension entitlement",
              },
            ],
          },
        ],
      },
      {
        id: "workplace",
        title: "Betriebliche Altersversorgung (bAV)",
        icon: "🏢",
        sections: [
          {
            heading: "Legal framework and obligation",
            items: [
              {
                label: "Entitlement to deferred compensation",
                value: "Every employee has the legal right to convert up to 4% of the Beitragsbemessungsgrenze (approx. 3,624 EUR in 2024) of gross salary into bAV via Entgeltumwandlung",
              },
              {
                label: "Employer contribution obligation",
                value: "Since 2019 for new contracts, employers must top up employee Entgeltumwandlung contributions by 15% (up to the savings in social contributions), in Pensionskasse, Pensionsfonds, or Direktversicherung",
              },
              {
                label: "Tax-free contribution limit",
                value: "Up to 8% of Beitragsbemessungsgrenze (approx. 7,248 EUR in 2024) can be paid into bAV tax-free; 4% is also social-contribution-free",
              },
              {
                label: "Five delivery models",
                value: "Direktzusage (book reserve), Pensionskasse, Pensionsfonds, Direktversicherung (life insurance), Unterstützungskasse (support fund); employee most commonly sees Direktversicherung",
              },
            ],
          },
          {
            heading: "Vesting and portability",
            items: [
              {
                label: "Immediate vesting of own contributions",
                value: "Employee Entgeltumwandlung contributions vest immediately; employer contributions vest after minimum 3 years of employment and age 21 (since 2018 reform)",
              },
              {
                label: "Portability",
                value: "Employees can request a Übertragung (transfer) of vested entitlement to a new employer plan; alternatively the entitlement stays with the old employer or insurer",
              },
              {
                label: "PSVaG insolvency protection",
                value: "Direktzusage and Unterstützungskasse are insured by the Pensions-Sicherungs-Verein (PSVaG); other models are protected through regulatory supervision",
              },
            ],
          },
          {
            heading: "Taxation and payout",
            items: [
              {
                label: "Tax during accumulation",
                value: "Contributions within the 8% ceiling are tax and social-contribution-free during the savings phase",
              },
              {
                label: "Tax on payout",
                value: "Benefits are fully taxable as income in retirement (Nachgelagerte Besteuerung); full health insurance contributions also apply on bAV pensions above the Freibetrag (178 EUR/month in 2024)",
              },
              {
                label: "Payout forms",
                value: "Lifetime annuity is standard; lump sum possible in some models; partial lump sum and annuity combinations allowed in Pensionsfonds",
              },
            ],
          },
        ],
      },
      {
        id: "private",
        title: "Private Pension (Riester and Rürup)",
        icon: "💰",
        sections: [
          {
            heading: "Riester-Rente",
            items: [
              {
                label: "Who can use it",
                value: "Employees in GRV, civil servants (Beamte), and certain self-employed persons who are obligatorily insured; not open to the freely self-employed",
              },
              {
                label: "State allowances",
                value: "Basic allowance 175 EUR/year; child supplement 300 EUR/year per child born after 2008 (185 EUR for children born before 2008)",
              },
              {
                label: "Required own contribution",
                value: "Minimum 4% of prior year gross income (minus allowances) must be contributed to receive full allowances; minimum contribution is 60 EUR/year",
              },
              {
                label: "Tax deductibility",
                value: "Contributions up to 2,100 EUR/year are deductible as Sonderausgaben; the state checks which is more beneficial (allowance vs. deduction) automatically",
              },
              {
                label: "Repayment risk",
                value: "If you leave Germany permanently and lose GRV membership, all state allowances and tax benefits must be repaid; contributions themselves are returned",
              },
            ],
          },
          {
            heading: "Rürup-Rente (Basisrente)",
            items: [
              {
                label: "Who can use it",
                value: "Available to anyone, but most beneficial for the self-employed who are not in GRV and have no access to bAV or Riester",
              },
              {
                label: "Tax deductibility 2024",
                value: "Up to 27,565 EUR (single) / 55,130 EUR (joint) deductible as Altersvorsorgeaufwendungen; 100% deductible from 2023 onward",
              },
              {
                label: "Restrictions",
                value: "Cannot be inherited, surrendered, or pledged as collateral; must provide a lifelong annuity; lump-sum payout not allowed",
              },
              {
                label: "Tax on payout",
                value: "Fully taxable in retirement like GRV pension (Nachgelagerte Besteuerung); no health insurance contributions required on Rürup unlike bAV",
              },
            ],
          },
          {
            heading: "Other private vehicles",
            items: [
              {
                label: "Private life insurance (Kapitallebensversicherung)",
                value: "Pre-2005 contracts: 50% of gains tax-free at maturity; post-2005 contracts taxed in full; mostly legacy products now",
              },
              {
                label: "ETF/brokerage savings plans",
                value: "No pension-specific tax advantages; long-term capital gains taxed at Abgeltungsteuer 25% plus solidarity surcharge; Sparerpauschbetrag 1,000 EUR/year tax-free",
              },
              {
                label: "Real estate",
                value: "Owner-occupied real estate (Wohn-Riester) can be financed via a Riester contract; rental income taxed as regular income",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant-Specific Rules",
        icon: "🌍",
        sections: [
          {
            heading: "Versicherungsnummer and enrollment",
            items: [
              {
                label: "Versicherungsnummer",
                value: "Permanent 12-digit social security number assigned by Deutsche Rentenversicherung; you receive it after first employment or registration; required to collect pension credits",
              },
              {
                label: "Start of accrual",
                value: "Contributions accrue from the first month of employment in Germany; no minimum period of residence before contributing",
              },
              {
                label: "EU/EEA workers",
                value: "Under EU Regulation 883/2004, contribution periods in any EU/EEA country are aggregated to meet German minimum requirements and to calculate benefit level",
              },
              {
                label: "Non-EU workers",
                value: "Germany has bilateral agreements with 50+ countries; if no agreement exists, contribution periods abroad may not count toward German Wartezeit",
              },
            ],
          },
          {
            heading: "Contribution refund (Erstattung)",
            items: [
              {
                label: "Who can apply",
                value: "Non-EU nationals who leave Germany and no longer have German social security coverage; not available if a bilateral agreement covers the situation",
                note: "EU citizens cannot request a refund; their credits remain and will be paid as a partial pension at retirement",
              },
              {
                label: "What is refunded",
                value: "Only the employee share of contributions (9.3%); the employer share stays with Deutsche Rentenversicherung",
              },
              {
                label: "Minimum waiting period",
                value: "24 months must have passed since last German insurance coverage before applying for Erstattung",
              },
              {
                label: "Consequences",
                value: "Claiming a refund cancels all accrued Entgeltpunkte and Wartezeit; you lose any future German pension entitlement from those periods",
              },
            ],
          },
          {
            heading: "International portability",
            items: [
              {
                label: "Totalization countries",
                value: "Agreements with the US, Canada, Australia, India, Japan, Korea, Turkey, and many others; each agreement defines which country pays and how credits are recognized",
              },
              {
                label: "Pension from home country",
                value: "Foreign pension income is generally taxable in Germany if you are a German tax resident; some treaty exemptions apply",
              },
              {
                label: "Pension payment abroad",
                value: "German pension is paid abroad to EU/agreement countries; payment possible to most non-agreement countries but German tax at source may apply",
              },
            ],
          },
        ],
      },
      {
        id: "claiming",
        title: "Claiming and Retirement",
        icon: "📋",
        sections: [
          {
            heading: "How to apply",
            items: [
              {
                label: "Application authority",
                value: "Apply to Deutsche Rentenversicherung (DRV) -- regional office (LVA) or federal (DRV Bund) depending on your history",
              },
              {
                label: "When to apply",
                value: "Apply 3 months before the desired start date; pension is not paid retroactively beyond 3 months from application",
              },
              {
                label: "Documents",
                value: "Rentenversicherungsnummer, Ausweis/passport, employment records, child birth certificates, foreign insurance records",
              },
              {
                label: "Online portal",
                value: "Applications can be submitted via the DRV online portal at eservice.deutsche-rentenversicherung.de",
              },
            ],
          },
          {
            heading: "Renteninformation and planning",
            items: [
              {
                label: "Renteninformation",
                value: "Annual pension statement sent by Deutsche Rentenversicherung once you reach age 27 and have at least 5 years of contributions; shows current and projected benefits",
              },
              {
                label: "Rentenauskunft",
                value: "Detailed pension information statement available on request; shows full contribution history and projected benefit at various retirement ages",
              },
              {
                label: "RV-Online",
                value: "Digital service at rv.de; view your contributions, EP balance, and forecast benefit",
              },
            ],
          },
          {
            heading: "Taxation and healthcare in retirement",
            items: [
              {
                label: "Taxation (Alterseinkünftegesetz)",
                value: "Since 2005, GRV pension is progressively more taxable; those retiring in 2024 pay tax on 83% of their GRV pension; 100% taxable for those retiring from 2058",
              },
              {
                label: "Health insurance in retirement",
                value: "Pensioners are members of statutory health insurance (KVdR) if they meet the 90% rule; premium is approx. 7.3% employee + 7.3% DRV on pension income",
              },
              {
                label: "Payment abroad",
                value: "German pension paid abroad in EU and agreement countries without deduction; to non-agreement countries, German withholding tax of up to 15% may apply under tax treaties",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Deutsche Rentenversicherung", url: "https://www.deutsche-rentenversicherung.de" },
  },

  // ── United Kingdom ────────────────────────────────────────────────────────
  {
    country: "UK",
    flag: "🇬🇧",
    name: "United Kingdom",
    systemType: "Three-pillar system",
    systemOverview:
      "The UK pension system comprises the New State Pension (funded by National Insurance contributions), mandatory workplace auto-enrolment pensions, and voluntary personal pensions including SIPPs and ISAs. The State Pension is underpinned by the Triple Lock which ensures annual increases match the highest of inflation, earnings growth, or 2.5%.",
    retirementAge: "66 years 8 months (rising to 67 by 2028)",
    immigrantNote:
      "National Insurance contributions begin from the first day of legal employment in the UK. Workers who leave before accumulating 10 qualifying years receive no State Pension; those with 10-34 years receive a partial pension payable from State Pension age.",
    keyNumbers: [
      { label: "Full New State Pension 2024/25", value: "221.20 GBP/week", sub: "requires 35 qualifying NI years" },
      { label: "Minimum NI Years", value: "10 years", sub: "for any State Pension entitlement" },
      { label: "State Pension Age", value: "66", sub: "rising to 67 by 2028" },
      { label: "Auto-Enrolment Minimum Total", value: "8%", sub: "3% employer + 5% employee" },
      { label: "Annual Allowance (pension)", value: "60,000 GBP", sub: "2024/25 tax year" },
      { label: "Lifetime ISA Bonus", value: "25%", sub: "government adds 25% on up to 4,000 GBP/year" },
    ],
    contributions: [
      {
        party: "Employee",
        rate: "8% NI on earnings between 12,570-50,270 GBP; 2% above 50,270 GBP (Class 1, 2024/25)",
        note: "NI contributions build qualifying years for State Pension; rates changed April 2024 (reduced from 10%/2%)",
      },
      {
        party: "Employer",
        rate: "13.8% NI on all employee earnings above 9,100 GBP (2024/25)",
        note: "Employer NI does not contribute to employee State Pension entitlement; it funds the National Insurance Fund generally",
      },
      {
        party: "Self-employed",
        rate: "Class 4 NI: 6% on profits 12,570-50,270 GBP; 2% above 50,270 GBP (2024/25)",
        note: "Class 2 NI (flat rate) was abolished from April 2024; self-employed still build State Pension years via Class 4",
      },
      {
        party: "Employer (auto-enrolment)",
        rate: "Minimum 3% of qualifying earnings (6,240-50,270 GBP band, 2024/25)",
        note: "Many employers contribute more; some match employee contributions up to a higher cap",
      },
    ],
    categories: [
      {
        id: "state",
        title: "New State Pension",
        icon: "🏛️",
        sections: [
          {
            heading: "How it works",
            items: [
              {
                label: "Qualifying years",
                value: "Each tax year you pay or are credited with NI contributions counts as a qualifying year",
              },
              {
                label: "Full pension",
                value: "221.20 GBP/week (2024/25) requires 35 qualifying NI years",
              },
              {
                label: "Partial pension",
                value: "Proportional amount paid with 10-34 qualifying years; no pension if fewer than 10 years",
              },
              {
                label: "NI credits",
                value: "Credits are awarded for periods of unemployment (claiming JSA/UC), statutory sick pay, childcare (Child Benefit registered), and approved training",
              },
              {
                label: "Triple Lock",
                value: "State Pension rises each April by the highest of: CPI inflation, average earnings growth, or 2.5%; introduced in 2011",
              },
            ],
          },
          {
            heading: "Pension Credit and low-income support",
            items: [
              {
                label: "Guarantee Credit",
                value: "Top-up to a minimum weekly income of 218.15 GBP (single, 2024/25) for those at State Pension age with low income",
              },
              {
                label: "Savings Credit",
                value: "Legacy element for those who reached State Pension age before 6 April 2016; provides small reward for modest retirement savings",
              },
              {
                label: "Eligibility",
                value: "Must be at State Pension age; income and capital are assessed; receiving Pension Credit can unlock other benefits (free TV licence, council tax reduction)",
              },
            ],
          },
          {
            heading: "Deferral and early retirement",
            items: [
              {
                label: "Deferral bonus",
                value: "State Pension grows by 1% for every 9 weeks you defer beyond State Pension age (approx. 5.8% per year)",
              },
              {
                label: "No early state pension",
                value: "The New State Pension cannot be claimed before State Pension age; no equivalent of the US early claiming option",
              },
              {
                label: "Voluntary NI contributions",
                value: "You can pay Class 3 voluntary NI contributions (824.20 GBP/year, 2024/25) to fill gaps in your record; generally cost-effective if you have fewer than 35 years",
              },
            ],
          },
        ],
      },
      {
        id: "workplace",
        title: "Workplace Auto-Enrolment Pensions",
        icon: "🏢",
        sections: [
          {
            heading: "Auto-enrolment rules",
            items: [
              {
                label: "Mandatory enrolment",
                value: "Employers must automatically enrol eligible workers (aged 22-66, earnings above 10,000 GBP/year) into a qualifying workplace pension since 2012",
              },
              {
                label: "Minimum contributions",
                value: "Total minimum 8% of qualifying earnings band: at least 3% from employer, rest from employee; employee minimum is 5% (including tax relief)",
              },
              {
                label: "Opt-out right",
                value: "Workers can opt out within one month of enrolment and receive a full refund of contributions; employer must re-enrol every 3 years",
              },
              {
                label: "NEST (National Employment Savings Trust)",
                value: "Government-backed default pension provider for employers with no existing scheme; no minimum employer size",
              },
              {
                label: "Vesting",
                value: "All contributions (employee and employer) vest immediately in defined contribution workplace pensions; no waiting period",
              },
            ],
          },
          {
            heading: "Types of workplace pension",
            items: [
              {
                label: "Defined contribution (DC)",
                value: "Most common type for private sector; retirement income depends on contributions paid and investment growth; risk borne by employee",
              },
              {
                label: "Defined benefit (DB) -- final salary",
                value: "Legacy schemes, mostly public sector (NHS, teachers, civil service, police, military); provides guaranteed income based on salary and service years",
              },
              {
                label: "Career average revalued earnings (CARE)",
                value: "Modern form of DB used in reformed public sector schemes; pension based on average salary over career rather than final salary",
              },
              {
                label: "Master trusts",
                value: "Large multi-employer DC trusts (e.g., Nest, Now Pensions, The People Pension) used by small employers; regulated by The Pensions Regulator",
              },
            ],
          },
          {
            heading: "Access and transfer rules",
            items: [
              {
                label: "Minimum pension access age",
                value: "55 (rising to 57 in 2028); no requirement to stop working to access pension",
              },
              {
                label: "Pension transfer",
                value: "You can transfer DC pension pots between providers; DB transfers over 30,000 GBP require regulated financial adviser sign-off",
              },
              {
                label: "Small pot rule",
                value: "Pension pots under 10,000 GBP can be taken as a full lump sum (trivial commutation) from age 55; first 25% tax-free",
              },
            ],
          },
        ],
      },
      {
        id: "private",
        title: "Private and Voluntary Pensions",
        icon: "💰",
        sections: [
          {
            heading: "SIPP (Self-Invested Personal Pension)",
            items: [
              {
                label: "Who uses SIPPs",
                value: "Self-employed, additional savers beyond workplace pension, and investors wanting control over underlying investments (shares, ETFs, commercial property)",
              },
              {
                label: "Annual Allowance",
                value: "60,000 GBP per year (2024/25) across all pension contributions (employee + employer); includes Money Purchase Annual Allowance (MPAA) of 10,000 GBP after flexibly accessing a pension",
              },
              {
                label: "Tax relief",
                value: "Basic rate taxpayers get 20% added by HMRC (relief at source); higher-rate taxpayers claim additional relief via self-assessment; effective 40-45% relief on contributions",
              },
              {
                label: "Tax-free cash",
                value: "25% of pension pot (up to a Lump Sum Allowance of 268,275 GBP lifetime) can be taken tax-free from age 55 (57 from 2028); remainder taxed as income",
              },
              {
                label: "Carry forward",
                value: "Unused Annual Allowance from the previous 3 tax years can be carried forward to allow larger contributions in one year",
              },
            ],
          },
          {
            heading: "ISA and Lifetime ISA",
            items: [
              {
                label: "Stocks and Shares ISA",
                value: "Annual subscription limit 20,000 GBP; all growth and income tax-free; no lock-up period; flexible withdrawals anytime",
              },
              {
                label: "Lifetime ISA (LISA)",
                value: "Open age 18-40; contribute up to 4,000 GBP/year and receive a 25% government bonus (up to 1,000 GBP/year); can be used for first home purchase or accessed from age 60",
                note: "Withdrawal for any other purpose before age 60 incurs a 25% penalty, which effectively claws back the government bonus plus a small amount of your own money",
              },
              {
                label: "Cash ISA",
                value: "Interest earned is tax-free; same 20,000 GBP annual limit shared across all ISA types; useful for short-term retirement savings or emergency fund",
              },
            ],
          },
          {
            heading: "Other savings vehicles",
            items: [
              {
                label: "Annuities",
                value: "Convert a pension pot into guaranteed lifetime income; rates depend on age, health, and gilt yields; enhanced annuities available for poor health",
              },
              {
                label: "Drawdown",
                value: "Keep pension invested and draw income flexibly; growth and timing risk remains with the individual; no requirement to buy an annuity",
              },
              {
                label: "Pension vs ISA decision",
                value: "Pension wins for higher-rate taxpayers due to upfront relief; ISA wins for access before 57, flexibility, and where employer pension is unavailable",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant-Specific Rules",
        icon: "🌍",
        sections: [
          {
            heading: "NI contributions and status",
            items: [
              {
                label: "When NI starts",
                value: "NI contributions begin from the first day you work legally in the UK; no minimum period of prior residence required",
              },
              {
                label: "NI Number",
                value: "You need a National Insurance number to work and pay NI; apply online at GOV.UK after arriving; no NI number = no qualifying years recorded",
              },
              {
                label: "IHS (Immigration Health Surcharge)",
                value: "Paid by visa applicants to fund NHS access; this is not a National Insurance contribution and does not build State Pension entitlement",
              },
              {
                label: "EU Settled Status post-Brexit",
                value: "NI years paid before and after Brexit by EU nationals count fully toward the UK State Pension; pre-Brexit EU contributions may count under coordination rules",
              },
            ],
          },
          {
            heading: "Pension if you leave the UK",
            items: [
              {
                label: "Pension frozen if under 10 years",
                value: "Leaving with fewer than 10 qualifying NI years means no State Pension entitlement; those years cannot be claimed and there is no refund option",
              },
              {
                label: "Paying abroad",
                value: "State Pension is paid to 160+ countries; transfer to an overseas bank account or UK account",
              },
              {
                label: "Annual uprating abroad",
                value: "Annual Triple Lock increases apply only if you live in the UK, EU/EEA, Switzerland, or a country with a reciprocal agreement (e.g., US, Philippines, Barbados); pension is frozen at current level in other countries including Australia and Canada",
              },
              {
                label: "Overseas Transfer of workplace pension",
                value: "You can transfer a UK pension to a Qualifying Recognised Overseas Pension Scheme (QROPS); a 25% overseas transfer charge applies unless you live in the country where the QROPS is registered",
              },
            ],
          },
          {
            heading: "Reciprocal agreements",
            items: [
              {
                label: "Countries with uprating agreements",
                value: "US, Jamaica, Barbados, Mauritius, Philippines, Israel, Switzerland, EU/EEA; pension paid to residents of these countries is uprated annually",
              },
              {
                label: "Totalization",
                value: "UK has a limited number of formal totalization agreements; within EU/EEA, EU Regulation 883/2004 (retained by UK post-Brexit for EU nationals) coordinates benefit periods",
              },
              {
                label: "Voluntary NI while abroad",
                value: "UK nationals (and some others) working abroad can pay Class 2 or Class 3 voluntary NI contributions to maintain or build State Pension entitlement",
              },
            ],
          },
        ],
      },
      {
        id: "claiming",
        title: "Claiming and Retirement",
        icon: "📋",
        sections: [
          {
            heading: "How to claim the State Pension",
            items: [
              {
                label: "Application",
                value: "Claim online at gov.uk/state-pension; phone or postal options also available; you will receive an invitation letter 2 months before State Pension age",
              },
              {
                label: "State Pension forecast",
                value: "Check your NI record and get a State Pension forecast at gov.uk/check-state-pension using Government Gateway login",
              },
              {
                label: "Deferral",
                value: "If you do not claim immediately, pension grows by approx. 5.8% per year; no maximum deferral period",
              },
              {
                label: "Payment frequency",
                value: "Paid every 4 weeks directly into your bank account; first payment within 5 weeks of State Pension age",
              },
            ],
          },
          {
            heading: "Taxation in retirement",
            items: [
              {
                label: "State Pension is taxable",
                value: "The State Pension counts as taxable income; it is paid gross (no PAYE deducted at source); HMRC adjusts PAYE coding on other income or you file a Self Assessment return",
              },
              {
                label: "Personal Allowance",
                value: "The 2024/25 personal allowance is 12,570 GBP; State Pension of 11,502 GBP/year (221.20 x 52) fits almost entirely within this for most pensioners",
              },
              {
                label: "Double taxation treaties",
                value: "UK has tax treaties with most countries; if you are a non-UK resident receiving UK pension, the treaty determines taxing rights -- often UK can still tax at source",
              },
            ],
          },
          {
            heading: "Workplace and private pension access",
            items: [
              {
                label: "Pension Wise",
                value: "Free government guidance service for over-50s with a DC pension; available at moneyhelper.org.uk or by phone",
              },
              {
                label: "Pension tracing",
                value: "Lost track of old workplace pensions? Use the Pension Tracing Service at gov.uk/find-pension-contact-details",
              },
              {
                label: "Pension dashboard (forthcoming)",
                value: "Government project to allow individuals to see all their pension pots in one place; expected to be available to the public from 2025-26",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Department for Work and Pensions (DWP)", url: "https://www.gov.uk/browse/working/state-pension" },
  },

  // ── Canada ────────────────────────────────────────────────────────────────
  {
    country: "CA",
    flag: "🇨🇦",
    name: "Canada",
    systemType: "Three-pillar system",
    systemOverview:
      "Canada combines the Canada Pension Plan (CPP, contribution-based) with Old Age Security (OAS, residency-based) as its public pillar, mandatory and voluntary workplace pensions as the second pillar, and tax-advantaged RRSP and TFSA accounts as the third pillar. Quebec operates the Quebec Pension Plan (QPP) instead of CPP.",
    retirementAge: "65 (OAS and full CPP); CPP as early as 60",
    immigrantNote:
      "CPP contributions begin from your first paycheque once you have a Social Insurance Number (SIN). OAS requires 10 years of Canadian residency after age 18; immigrants can build toward it from the day they arrive as permanent residents.",
    keyNumbers: [
      { label: "CPP Max Monthly Benefit at 65", value: "1,364.60 CAD", sub: "2024; average is much lower ~758 CAD" },
      { label: "OAS Full Monthly Benefit at 65", value: "698.60 CAD", sub: "2024 Q4; indexed quarterly" },
      { label: "CPP Contribution Rate 2024", value: "5.95%", sub: "employee + 5.95% employer" },
      { label: "RRSP Limit 2024", value: "31,560 CAD", sub: "or 18% of prior year earned income" },
      { label: "TFSA Limit 2024", value: "7,000 CAD", sub: "cumulative room since 2009 is 95,000 CAD" },
      { label: "OAS Residency Requirement", value: "10 years", sub: "in Canada after age 18 for any OAS" },
    ],
    contributions: [
      {
        party: "Employee",
        rate: "5.95% on pensionable earnings",
        cap: "Maximum pensionable earnings $68,500 (2024); basic exemption $3,500; max contribution $3,867.50/year",
        note: "CPP2 second tier: additional 4% on earnings between $68,500 and $73,200 (2024)",
      },
      {
        party: "Employer",
        rate: "5.95% matching employee CPP contributions",
        cap: "Same maximum as employee; CPP2 employer rate also 4%",
        note: "Self-employed pay both employee and employer shares (11.9% total plus CPP2)",
      },
      {
        party: "Self-employed",
        rate: "11.9% CPP (employee + employer) on net self-employment income",
        cap: "Same pensionable earnings ceiling as employed workers",
        note: "Half of CPP contributions (employer portion) is deductible on the T1 return",
      },
      {
        party: "State",
        rate: "OAS funded from general tax revenues; no designated payroll contribution",
        note: "The government tops up low-income seniors via GIS (Guaranteed Income Supplement) with no contribution required",
      },
    ],
    categories: [
      {
        id: "state",
        title: "CPP and Old Age Security",
        icon: "🏛️",
        sections: [
          {
            heading: "Canada Pension Plan (CPP)",
            items: [
              {
                label: "How CPP is calculated",
                value: "Based on your contributions and how long you contributed; maximum is earned by contributing for 39 years at or above the maximum pensionable earnings",
              },
              {
                label: "CPP at 65",
                value: "Maximum $1,364.60/month (2024); average recipient receives about $758/month because most people earn below maximum or have contribution gaps",
              },
              {
                label: "Early CPP at 60",
                value: "Benefit reduced by 0.6% per month before 65 (maximum 36% reduction at 60)",
              },
              {
                label: "Deferred CPP to 70",
                value: "Benefit increased by 0.7% per month after 65 (maximum 42% increase at 70)",
              },
              {
                label: "Post-retirement benefit (PRB)",
                value: "If you work and contribute to CPP while already receiving CPP (age 65-70), you earn small additional benefit amounts each year",
              },
            ],
          },
          {
            heading: "Old Age Security (OAS)",
            items: [
              {
                label: "Eligibility",
                value: "Canadian citizen or legal resident; age 65+; at least 10 years of Canadian residency after age 18 for any OAS; 40 years for full OAS while living abroad",
              },
              {
                label: "Full OAS rate Q4 2024",
                value: "698.60 CAD/month (age 65-74); enhanced by 10% at age 75 (768.46 CAD/month)",
              },
              {
                label: "Partial OAS",
                value: "1/40th of full OAS for each complete year of residency in Canada after age 18; minimum 10 years required",
              },
              {
                label: "OAS clawback (recovery tax)",
                value: "OAS is reduced by 15 cents for every dollar of net income above $90,997 (2024); fully clawed back at approx. $148,000",
              },
              {
                label: "Deferral to 70",
                value: "Deferring OAS past 65 increases the monthly benefit by 0.6% per month deferred (up to 36% increase at age 70)",
              },
            ],
          },
          {
            heading: "GIS and low-income supplements",
            items: [
              {
                label: "Guaranteed Income Supplement (GIS)",
                value: "Monthly non-taxable top-up for low-income OAS recipients; maximum $1,065.47/month (single, 2024 Q4); income-tested",
              },
              {
                label: "Allowance",
                value: "For low-income Canadians aged 60-64 whose spouse receives OAS; bridges the income gap before OAS eligibility",
              },
              {
                label: "Allowance for the Survivor",
                value: "For low-income widowed Canadians aged 60-64; up to $1,614.89/month (2024 Q4)",
              },
            ],
          },
        ],
      },
      {
        id: "workplace",
        title: "Workplace Pension Plans",
        icon: "🏢",
        sections: [
          {
            heading: "Registered Pension Plans (RPP)",
            items: [
              {
                label: "Defined benefit (DBPP)",
                value: "Common in public sector (federal, provincial, municipal, teachers, police); benefit formula based on years of service and salary; indexed to inflation in many public plans",
              },
              {
                label: "Defined contribution (DCPP)",
                value: "Employee and employer contributions invested; retirement income depends on investment returns; more common in private sector",
              },
              {
                label: "No universal mandate",
                value: "Employers in most provinces are not required to offer a pension plan; coverage is more common in unionized and public sector workplaces",
              },
              {
                label: "Group RRSP",
                value: "Employer-facilitated RRSP plan; uses employee RRSP room; employer contributions are an employment benefit (taxable income) but immediately deductible via RRSP",
              },
              {
                label: "PRPP (Pooled Registered Pension Plan)",
                value: "Low-cost option for small employers and self-employed; employer participation voluntary; federally regulated sectors and some provinces",
              },
            ],
          },
          {
            heading: "Quebec Pension Plan (QPP)",
            items: [
              {
                label: "Who is covered",
                value: "Workers employed in Quebec; QPP replaces CPP entirely; contribution rates and benefit formulas are slightly different from CPP",
              },
              {
                label: "QPP rate 2024",
                value: "6.4% employee + 6.4% employer (higher than CPP 5.95%); additional second tier (QPP2) also applies",
              },
              {
                label: "Portability",
                value: "Workers who move from Quebec to another province switch from QPP to CPP; years in each count toward the respective plan",
              },
            ],
          },
          {
            heading: "Vesting and locking-in",
            items: [
              {
                label: "Vesting",
                value: "Federal RPP rules: employee contributions vest immediately; employer contributions vest after 2 years of membership (federal standard); provincial rules vary",
              },
              {
                label: "Locked-in accounts",
                value: "Vested employer pension money transferred on leaving a job goes into a Locked-In Retirement Account (LIRA) or Locked-In RRSP; cannot be withdrawn before retirement age",
              },
              {
                label: "Small balance unlocking",
                value: "Some provinces allow full withdrawal from a LIRA if the balance is below a threshold (e.g., 25% of YMPE in Ontario = approx. $17,175 in 2024)",
              },
            ],
          },
        ],
      },
      {
        id: "private",
        title: "RRSP, TFSA, and Personal Savings",
        icon: "💰",
        sections: [
          {
            heading: "Registered Retirement Savings Plan (RRSP)",
            items: [
              {
                label: "2024 contribution limit",
                value: "18% of prior year earned income up to $31,560; unused room carries forward indefinitely",
              },
              {
                label: "Tax treatment",
                value: "Contributions reduce taxable income in the year of contribution; all growth tax-deferred; withdrawals fully taxed as income in the year taken",
              },
              {
                label: "Spousal RRSP",
                value: "Contribute to your spouse or common-law partner RRSP using your own room; useful for income splitting in retirement if you are the higher earner",
              },
              {
                label: "Home Buyers Plan (HBP)",
                value: "Withdraw up to $60,000 (2024, increased from $35,000) tax-free for a first home purchase; must repay over 15 years",
              },
              {
                label: "RRSP to RRIF conversion",
                value: "RRSP must be converted to a RRIF (Registered Retirement Income Fund), annuity, or lump sum by December 31 of the year you turn 71",
              },
            ],
          },
          {
            heading: "Tax-Free Savings Account (TFSA)",
            items: [
              {
                label: "2024 annual limit",
                value: "$7,000; cumulative room since 2009 is $95,000 (for those eligible every year since inception)",
              },
              {
                label: "Tax treatment",
                value: "Contributions not deductible; all growth and withdrawals completely tax-free; no impact on income-tested benefits like OAS/GIS",
              },
              {
                label: "Room accumulation",
                value: "TFSA room accumulates from age 18 or the year you became a Canadian resident (whichever is later); non-residents cannot accumulate room but existing balances can remain",
              },
              {
                label: "Withdrawn room restored",
                value: "Any amounts you withdraw are added back to your contribution room on January 1 of the following year",
              },
            ],
          },
          {
            heading: "Other registered accounts",
            items: [
              {
                label: "First Home Savings Account (FHSA)",
                value: "Launched 2023; up to $8,000/year contributions deductible (lifetime limit $40,000); tax-free withdrawal for qualifying first home purchase",
              },
              {
                label: "RRIF (Registered Retirement Income Fund)",
                value: "Conversion vehicle from RRSP; minimum annual withdrawal percentages apply from age 72; withdrawals fully taxable",
              },
              {
                label: "Pension income splitting",
                value: "At age 65+, up to 50% of eligible pension income (RPP, RRIF, and RRSP annuity income) can be split with a spouse to reduce combined tax",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant-Specific Rules",
        icon: "🌍",
        sections: [
          {
            heading: "CPP and SIN requirements",
            items: [
              {
                label: "SIN required",
                value: "You need a Social Insurance Number to work, pay CPP/EI, and file taxes; apply at a Service Canada centre after receiving your work authorization",
              },
              {
                label: "When CPP starts",
                value: "CPP contributions start from your first paycheque; there is no minimum residency period before contributing",
              },
              {
                label: "Totalization agreements",
                value: "Canada has totalization agreements with 60+ countries including the US, UK, Germany, Australia, France, Italy, and Japan; prevents double CPP/OAS/foreign pension contributions",
              },
              {
                label: "Credit portability",
                value: "Under a totalization agreement, contribution periods in both countries may be combined to meet eligibility thresholds for each country s pension",
              },
            ],
          },
          {
            heading: "OAS for newcomers",
            items: [
              {
                label: "Counting residency years",
                value: "OAS residency is counted from the date you become a legal resident of Canada (landing date); years as a student, temporary worker, or refugee claimant may not count",
              },
              {
                label: "Partial OAS abroad",
                value: "If you leave Canada after age 65 with at least 20 years of Canadian residency after age 18, OAS continues to be paid abroad; below 20 years it stops if you leave",
              },
              {
                label: "Delayed arrival",
                value: "Every complete year of Canadian residency gives 1/40th of full OAS; arriving at 55 gives max 10 years by 65 -- consider deferring to age 70 to collect longer and at a higher rate",
              },
            ],
          },
          {
            heading: "RRSP and TFSA for newcomers",
            items: [
              {
                label: "RRSP room",
                value: "RRSP room accumulates from the year of landing; you need earned income reported on a Canadian tax return to generate room; no carry-in from foreign accounts",
              },
              {
                label: "TFSA room",
                value: "TFSA room accumulates from the year you become a Canadian resident at age 18 or older; no room for years of non-residency",
              },
              {
                label: "Foreign pension income",
                value: "Declare all foreign pension income on your Canadian T1 return; a foreign tax credit or treaty exemption may reduce double taxation; some foreign pensions qualify for pension income splitting",
              },
            ],
          },
        ],
      },
      {
        id: "claiming",
        title: "Claiming and Retirement",
        icon: "📋",
        sections: [
          {
            heading: "How to apply for CPP and OAS",
            items: [
              {
                label: "When to apply",
                value: "Apply 6-11 months before the month you want benefits to start; Service Canada recommends applying well in advance to avoid gaps",
              },
              {
                label: "How to apply",
                value: "Apply online at canada.ca/en/services/benefits/publicpensions or at a Service Canada centre; need SIN, banking details, and residency/work history",
              },
              {
                label: "My Account (Service Canada)",
                value: "View CPP Statement of Contributions and OAS/GIS estimates online using your My Service Canada Account; linked to CRA My Account",
              },
              {
                label: "Payment abroad",
                value: "CPP and OAS can be paid to bank accounts in most countries; international direct deposit available or Canadian cheque mailed",
              },
            ],
          },
          {
            heading: "Taxation of pension income",
            items: [
              {
                label: "CPP is fully taxable",
                value: "CPP benefits are included in income for Canadian tax purposes; no withholding at source unless you request it or are a non-resident",
              },
              {
                label: "OAS taxation",
                value: "OAS is taxable income; GIS is not taxable; high-income recipients are subject to the OAS clawback (recovery tax)",
              },
              {
                label: "Non-resident withholding",
                value: "Non-residents receiving CPP/OAS are subject to 25% non-resident withholding tax, reduced to 15% under most tax treaties (e.g., Canada-UK, Canada-US)",
              },
              {
                label: "Pension income tax credit",
                value: "Federal credit on up to $2,000 of eligible pension income (private pension, RPP annuity, RRIF withdrawals from age 65); reduces federal tax by up to $300",
              },
            ],
          },
          {
            heading: "Planning resources",
            items: [
              {
                label: "Retirement Income Calculator",
                value: "canada.ca/en/services/benefits/publicpensions/cpp/retirement-income-calculator -- estimates CPP, OAS, and GIS amounts at different retirement ages",
              },
              {
                label: "CPP Statement of Contributions",
                value: "Available in My Service Canada Account; shows all contributory periods and estimated future CPP benefit",
              },
              {
                label: "Financial Consumer Agency of Canada (FCAC)",
                value: "canada.ca/fcac -- free, unbiased financial planning tools and information for retirement planning, RRSP vs TFSA comparison, and more",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Service Canada -- Public Pensions", url: "https://www.canada.ca/en/services/benefits/publicpensions.html" },
  },

  // ── Australia ─────────────────────────────────────────────────────────────
  {
    country: "AU",
    flag: "🇦🇺",
    name: "Australia",
    systemType: "Two-pillar + Superannuation",
    systemOverview:
      "Australia relies on a means-tested Age Pension as the safety net and mandatory employer Superannuation (Super) as the primary private savings vehicle. Super is compulsory for all employees -- the Superannuation Guarantee (SG) requires employers to contribute 11% of ordinary time earnings in 2024, rising to 12% by July 2025.",
    retirementAge: "67 (Age Pension); Preservation Age 60 for Super access",
    immigrantNote:
      "Superannuation accumulates from the first day of employment with an employer who is required to pay SG. Temporary residents can claim a Departing Australia Superannuation Payment (DASP) when they leave permanently, though it is taxed at 35% (65% for Working Holiday Makers).",
    keyNumbers: [
      { label: "Super Guarantee Rate 2024", value: "11%", sub: "rising to 12% by July 2025" },
      { label: "Age Pension (single) 2024", value: "1,116.30 AUD/fortnight", sub: "full rate; means-tested" },
      { label: "Concessional Cap 2024/25", value: "27,500 AUD/year", sub: "pre-tax super contributions" },
      { label: "Non-concessional Cap 2024/25", value: "110,000 AUD/year", sub: "after-tax super contributions" },
      { label: "Preservation Age", value: "60", sub: "for those born after 30 June 1964" },
      { label: "Age Pension Residency", value: "10 years", sub: "5 continuous years required" },
    ],
    contributions: [
      {
        party: "Employer",
        rate: "11% of ordinary time earnings (OTE)",
        cap: "No cap on OTE for SG purposes; paid on top of salary (not deducted from employee wages)",
        note: "Rising to 11.5% from July 2024 and 12% from July 2025; must be paid at least quarterly",
      },
      {
        party: "Employee",
        rate: "Voluntary salary sacrifice; no mandatory employee contribution",
        cap: "Concessional (pre-tax) total cap $27,500/year including employer SG; excess taxed at top marginal rate",
        note: "Salary sacrifice reduces taxable income; contributions taxed at 15% inside super instead of marginal rate",
      },
      {
        party: "Self-employed",
        rate: "No mandatory SG obligation on own earnings; voluntary concessional contributions up to $27,500/year",
        note: "Self-employed can claim a tax deduction for personal super contributions (lodge a Notice of Intent to Claim with the fund)",
      },
      {
        party: "State",
        rate: "Government co-contribution: matches 50c for each $1 of after-tax contribution up to $500 (income below $43,445 in 2024/25)",
        note: "Super co-contribution phases out for incomes between $43,445 and $58,445; no co-contribution above $58,445",
      },
    ],
    categories: [
      {
        id: "state",
        title: "Age Pension",
        icon: "🏛️",
        sections: [
          {
            heading: "Eligibility",
            items: [
              {
                label: "Age",
                value: "Age 67 for both men and women (fully phased in since July 2023)",
              },
              {
                label: "Residency",
                value: "Must be an Australian resident (citizen or permanent resident); 10 years Australian residency required, including 5 continuous years",
              },
              {
                label: "Means test",
                value: "Both an assets test and an income test apply; the test that produces the lower pension payment is used",
              },
              {
                label: "Assets test (2024)",
                value: "Full pension if assets below $301,750 (single homeowner) / $451,500 (couple homeowner); pension reduces by $3 per fortnight per $1,000 above threshold",
              },
              {
                label: "Income test (2024)",
                value: "Full pension if income below $204/fortnight (single); pension reduces by 50 cents per dollar above this threshold; super drawdowns after 67 count as income",
              },
            ],
          },
          {
            heading: "Benefit rates",
            items: [
              {
                label: "Full single rate (2024)",
                value: "$1,116.30 AUD per fortnight (approx. $29,024/year); includes Pension Supplement and Energy Supplement",
              },
              {
                label: "Full couple rate (2024)",
                value: "$1,682.80 AUD per fortnight combined (approx. $43,753/year)",
              },
              {
                label: "Indexation",
                value: "Age Pension is indexed twice yearly (March and September) to the higher of CPI or Male Total Average Weekly Earnings (MTAWE), with a Pensioner Living Cost Index floor",
              },
              {
                label: "Pension Supplement",
                value: "Up to $81.60/fortnight (single, 2024); can be paid quarterly as a lump sum instead of fortnightly",
              },
            ],
          },
          {
            heading: "Pension Loans Scheme",
            items: [
              {
                label: "What it is",
                value: "A government-backed reverse mortgage allowing age pensioners (and eligible self-funded retirees) to draw equity from Australian real estate to top up income",
              },
              {
                label: "Interest rate",
                value: "3.95% per annum (compound); debt registered as a charge on the property; recovered when property is sold",
              },
              {
                label: "Maximum",
                value: "Up to 150% of maximum Age Pension rate; no negative equity guarantee -- government will not recover more than the value of the property",
              },
            ],
          },
        ],
      },
      {
        id: "workplace",
        title: "Superannuation (Employer Guarantee)",
        icon: "🏢",
        sections: [
          {
            heading: "Superannuation Guarantee (SG)",
            items: [
              {
                label: "Rate 2024",
                value: "11% of Ordinary Time Earnings (OTE); rising to 11.5% from 1 July 2024 and 12% from 1 July 2025",
              },
              {
                label: "Who is covered",
                value: "All employees aged 18+ (and under-18s working more than 30 hours/week) earning $450 or more per month (threshold removed in 2022 -- now all employees covered regardless of income)",
              },
              {
                label: "Employer obligation",
                value: "SG must be paid at least quarterly to the employee s chosen super fund (or stapled fund); non-payment triggers Super Guarantee Charge (SGC) penalty",
              },
              {
                label: "Paid on top of salary",
                value: "Super is paid on top of gross salary, not deducted from it; total employment cost to employer = salary + 11% SG",
              },
              {
                label: "MySuper",
                value: "Default low-cost, simple investment product that all default super funds must offer; used when employee does not choose their own fund",
              },
            ],
          },
          {
            heading: "Choosing and managing your fund",
            items: [
              {
                label: "Choice of fund",
                value: "Most employees can choose which super fund receives their SG contributions; complete a Standard Choice Form for the employer",
              },
              {
                label: "Stapled fund",
                value: "From November 2021, if a new employee does not choose a fund, the employer must contribute to the employee s existing (stapled) super fund rather than a default fund",
              },
              {
                label: "SMSF (Self-Managed Super Fund)",
                value: "Up to 6 members; trustees are the members; full investment flexibility but significant compliance obligations; APRA not involved -- ATO regulates",
              },
              {
                label: "Consolidation",
                value: "ATO myGov can be used to find all super accounts and consolidate them; multiple accounts incur multiple sets of fees",
              },
            ],
          },
          {
            heading: "Defined benefit super funds",
            items: [
              {
                label: "Legacy government schemes",
                value: "Commonwealth Superannuation Scheme (CSS) and Public Sector Superannuation (PSS) are closed DB schemes for long-serving federal public servants",
              },
              {
                label: "State schemes",
                value: "Many state government employees in legacy DB schemes (e.g., NSW State Super, VicSuper heritage DB); benefit formula based on years of service and salary",
              },
              {
                label: "Private sector",
                value: "Very few private sector DB funds remain open; virtually all new private sector workplace super is accumulation (DC)",
              },
            ],
          },
        ],
      },
      {
        id: "private",
        title: "Voluntary Super Contributions",
        icon: "💰",
        sections: [
          {
            heading: "Concessional (pre-tax) contributions",
            items: [
              {
                label: "Annual cap 2024/25",
                value: "$27,500 total (including employer SG); excess concessional contributions taxed at marginal rate plus excess concessional contributions charge",
              },
              {
                label: "Tax rate inside super",
                value: "Concessional contributions taxed at 15% inside the fund (Division 293 tax of additional 15% applies if income plus concessional contributions exceed $250,000)",
              },
              {
                label: "Catch-up contributions",
                value: "If your total super balance is below $500,000, you can carry forward unused concessional cap space from the prior 5 years and make a larger contribution in one year",
              },
              {
                label: "Salary sacrifice",
                value: "Arrange with your employer to redirect pre-tax salary to super; reduces taxable income; salary sacrifice counts toward the $27,500 concessional cap",
              },
            ],
          },
          {
            heading: "Non-concessional (after-tax) contributions",
            items: [
              {
                label: "Annual cap 2024/25",
                value: "$110,000; nil cap if Total Super Balance (TSB) is $1.9 million or more at 30 June of prior year",
              },
              {
                label: "Bring-forward rule",
                value: "If under age 75, you can trigger a bring-forward and contribute up to 3 years of non-concessional cap ($330,000) in a single year",
              },
              {
                label: "Downsizer contributions",
                value: "Age 55+: contribute up to $300,000 ($600,000 per couple) from the sale of a principal residence (held for 10+ years); does not count against non-concessional cap",
              },
              {
                label: "Government co-contribution",
                value: "For income below $43,445 (2024/25): government adds 50c per $1 of after-tax super contribution up to $500; phases out at $58,445",
              },
            ],
          },
          {
            heading: "Spouse contributions and other strategies",
            items: [
              {
                label: "Spouse contribution offset",
                value: "Contribute to your spouse s super if their income is below $40,000; tax offset of up to $540 per year available for contributions up to $3,000",
              },
              {
                label: "First Home Super Saver (FHSS)",
                value: "Voluntary super contributions can be withdrawn (up to $50,000 total, $15,000 per year) for a first home deposit; taxed at marginal rate less 30% offset",
              },
              {
                label: "Transition to Retirement (TTR)",
                value: "From Preservation Age (60), start an income stream from super while still working; earnings inside TTR pension are taxed at 15% (not 0%) until fully retired",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant-Specific Rules",
        icon: "🌍",
        sections: [
          {
            heading: "Super from day one",
            items: [
              {
                label: "When super starts",
                value: "SG accumulates from the first day of employment; employer must pay into an approved fund regardless of visa type (provided you are an employee not a contractor)",
              },
              {
                label: "TFN (Tax File Number)",
                value: "Provide your TFN to your super fund; without it, fund must withhold 47% tax on contributions; apply for TFN via ATO website after arriving in Australia",
              },
              {
                label: "All visa types covered",
                value: "Temporary visa holders including 457/482 TSS, student workers (within hour limits), and WHM are entitled to SG; the employer s obligation does not depend on visa permanency",
              },
              {
                label: "Investment options",
                value: "Choose your investment strategy (growth, balanced, conservative, ethical); default is MySuper balanced option; consider risk tolerance and years to retirement",
              },
            ],
          },
          {
            heading: "Departing Australia Superannuation Payment (DASP)",
            items: [
              {
                label: "Who can claim DASP",
                value: "Temporary visa holders (not permanent residents or Australian citizens) who have departed Australia and whose visa has expired or been cancelled",
              },
              {
                label: "Tax on DASP",
                value: "Taxed at 35% on the taxed element; 65% for Working Holiday Maker visa holders; these rates are fixed regardless of your home country tax treaty",
              },
              {
                label: "How to apply",
                value: "Apply online via ATO myGov or DASP Online System; can claim after departure; funds released to your overseas bank account",
              },
              {
                label: "Decision: DASP vs keep",
                value: "Permanent residents and citizens should not claim DASP; keep super invested for Australian retirement if you may return; consider that 35% DASP tax may be worse than long-term growth",
              },
            ],
          },
          {
            heading: "International agreements and portability",
            items: [
              {
                label: "Social security agreements",
                value: "Australia has International Social Security Agreements with 31 countries including the US (for Age Pension purposes), UK, NZ, Germany, Italy, and others",
              },
              {
                label: "What agreements cover",
                value: "Agreements primarily help with Age Pension residency requirements and prevent double payment of income-tested pensions; they do not make super portable like CPP",
              },
              {
                label: "No US-AU super totalization",
                value: "The US-Australia social security agreement does not cover superannuation; Americans working in Australia pay SG normally and cannot credit super toward US Social Security",
              },
              {
                label: "NZ Trans-Tasman portability",
                value: "Australian and New Zealand super can be transferred between the two countries under a bilateral arrangement; transferable under specific rules",
              },
            ],
          },
        ],
      },
      {
        id: "claiming",
        title: "Accessing Super and Retirement",
        icon: "📋",
        sections: [
          {
            heading: "Preservation Age and access conditions",
            items: [
              {
                label: "Preservation Age",
                value: "Age 60 for everyone born after 30 June 1964; you can access super on or after this age if you meet a condition of release",
              },
              {
                label: "Conditions of release",
                value: "Reaching Preservation Age and retiring; turning 65 (regardless of employment status); terminal medical condition; permanent incapacity; severe financial hardship; compassionate grounds",
              },
              {
                label: "Tax-free super at 60+",
                value: "Withdrawals from a taxed super fund after age 60 are completely tax-free (both lump sum and income stream); significant advantage over other savings vehicles",
              },
              {
                label: "Under 60 access",
                value: "Accessing super before age 60 via Transition to Retirement pension: taxed at marginal rate less 15% tax offset; full early access generally not permitted except special conditions",
              },
            ],
          },
          {
            heading: "Payout options",
            items: [
              {
                label: "Account-based pension (ABP)",
                value: "Most flexible income stream; draw a minimum percentage of balance each year (2% at age 65-74, 4% from 75); balance remains invested; balance passes to estate on death",
              },
              {
                label: "Annuity",
                value: "Convert super lump sum to guaranteed lifetime (or fixed-term) income; less common in Australia than account-based pensions; eliminates longevity risk",
              },
              {
                label: "Lump sum",
                value: "Take all or part of super as a cash lump sum; no tax after age 60 from a taxed fund; consider whether this interacts with Age Pension means test",
              },
              {
                label: "Combination",
                value: "Many retirees use a combination: keep super in an account-based pension for flexibility, use Age Pension as a safety net, and draw on home equity via Pension Loans Scheme if needed",
              },
            ],
          },
          {
            heading: "Administration and planning tools",
            items: [
              {
                label: "myGov / ATO super portal",
                value: "View all your super accounts, consolidate, find lost super, check employer SG payments, and lodge DASP applications via myGov linked to ATO",
              },
              {
                label: "Apply for Age Pension",
                value: "Apply via Services Australia online (my.gov.au) or at a Centrelink service centre; apply up to 13 weeks before you turn 67",
              },
              {
                label: "Moneysmart retirement planner",
                value: "moneysmart.gov.au/retirement-income-estimator -- models Age Pension, super, and other income sources; run by ASIC, independent of product providers",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Australian Taxation Office -- Super", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families" },
  },
]

// ── Lookup helper ─────────────────────────────────────────────────────────────

export function getPensionData(country: CountryCode): PensionData | undefined {
  return PENSION_DATA.find((d) => d.country === country)
}
