/**
 * Tax Explainer data engine for the Goshen immigration platform.
 *
 * Covers the tax systems of US, DE, UK, CA, and AU for immigrant workers.
 * Fully static — no server or API required. All figures use 2024/2025 tax year.
 */

import type { CountryCode } from "@/types"

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface TaxBracketRow {
  income: string
  rate: string
  label?: string
}

export interface KeyNumber {
  label: string
  value: string
  sub?: string
}

export interface TaxItem {
  label: string
  value: string
  note?: string
}

export interface TaxSection {
  heading: string
  items: TaxItem[]
}

export interface TaxCategory {
  id: string
  title: string
  icon: string
  sections: TaxSection[]
}

export interface TaxData {
  country: CountryCode
  flag: string
  name: string
  currency: string
  taxYear: string
  filingDeadline: string
  immigrantNote: string
  keyNumbers: KeyNumber[]
  brackets: TaxBracketRow[]
  categories: TaxCategory[]
  officialAuthority: { name: string; url: string }
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const TAX_DATA: TaxData[] = [
  // ── United States ────────────────────────────────────────────────────────────
  {
    country: "US",
    flag: "🇺🇸",
    name: "United States",
    currency: "USD",
    taxYear: "Jan 1 – Dec 31",
    filingDeadline: "April 15",
    immigrantNote:
      "The US taxes residents on worldwide income. If you meet the Substantial Presence Test (183 days) you are a tax resident even on a work visa. Green card holders are taxed the same as citizens regardless of where they live.",
    keyNumbers: [
      { label: "Standard Deduction (Single)", value: "$14,600", sub: "2024 tax year" },
      { label: "Standard Deduction (Married)", value: "$29,200", sub: "2024 tax year" },
      { label: "FICA — Social Security", value: "6.2%", sub: "Employee share; wage base $168,600" },
      { label: "FICA — Medicare", value: "1.45%", sub: "Employee share; +0.9% over $200k" },
      { label: "Child Tax Credit", value: "$2,000/child", sub: "Partially refundable up to $1,700" },
      { label: "Filing Deadline", value: "April 15", sub: "Extension to Oct 15 on request" },
    ],
    brackets: [
      { income: "$0 – $11,600", rate: "10%" },
      { income: "$11,601 – $47,150", rate: "12%" },
      { income: "$47,151 – $100,525", rate: "22%" },
      { income: "$100,526 – $191,950", rate: "24%" },
      { income: "$191,951 – $243,725", rate: "32%" },
      { income: "$243,726 – $609,350", rate: "35%" },
      { income: "Over $609,350", rate: "37%" },
    ],
    categories: [
      {
        id: "income",
        title: "Income Tax",
        icon: "💵",
        sections: [
          {
            heading: "How the Federal System Works",
            items: [
              {
                label: "Progressive brackets",
                value: "7 federal brackets from 10% to 37%",
                note: "Only the income within each bracket is taxed at that rate — not all income.",
              },
              {
                label: "W-4 withholding",
                value: "Employer withholds federal (and state) tax from each paycheck",
                note: "File a new W-4 after major life changes (marriage, new child).",
              },
              {
                label: "Standard vs. itemized deduction",
                value: "Most filers take the standard deduction ($14,600 single / $29,200 married)",
                note: "Itemize only if your deductions (mortgage interest, charity, state taxes) exceed the standard amount.",
              },
              {
                label: "Alternative Minimum Tax (AMT)",
                value: "Parallel tax system that applies at ~26–28% on adjusted income",
                note: "Exemption of $85,700 (single) for 2024; mainly affects high earners with large deductions.",
              },
            ],
          },
          {
            heading: "State & Local Income Tax",
            items: [
              {
                label: "State income tax",
                value: "Most states levy income tax; 9 states have none (TX, FL, WA, NV, WY, SD, AK, TN, NH)",
                note: "CA top rate 13.3%; NY top rate 10.9%.",
              },
              {
                label: "Local income tax",
                value: "Some cities (NYC, Philadelphia, Detroit) add a local income tax on top of state tax",
              },
              {
                label: "Total combined burden",
                value: "Effective combined federal + state rate often 25–35% for middle-income workers in high-tax states",
              },
            ],
          },
          {
            heading: "Self-Employment & Freelancers",
            items: [
              {
                label: "Self-employment tax",
                value: "15.3% on net earnings (12.4% SS + 2.9% Medicare)",
                note: "You pay both the employer and employee share when self-employed.",
              },
              {
                label: "Quarterly estimated payments",
                value: "Due Apr 15, Jun 17, Sep 16, Jan 15 — penalties apply if underpaid",
              },
              {
                label: "Schedule SE",
                value: "File Schedule SE with your Form 1040 to calculate self-employment tax",
              },
            ],
          },
        ],
      },
      {
        id: "social",
        title: "Social Security & Medicare (FICA)",
        icon: "🏥",
        sections: [
          {
            heading: "Employee Contributions",
            items: [
              {
                label: "Social Security (OASDI)",
                value: "6.2% of wages up to $168,600 wage base (2024)",
                note: "Once you hit the wage base your SS withholding stops for that year.",
              },
              {
                label: "Medicare (HI)",
                value: "1.45% on all wages; additional 0.9% on wages over $200,000",
                note: "The 0.9% additional Medicare tax is not matched by the employer.",
              },
              {
                label: "Total employee FICA",
                value: "7.65% up to the SS wage base; 2.35% on wages above $200k",
              },
            ],
          },
          {
            heading: "Employer Contributions",
            items: [
              {
                label: "Employer Social Security",
                value: "6.2% up to the $168,600 wage base (matches employee)",
              },
              {
                label: "Employer Medicare",
                value: "1.45% on all wages (no employer share of the additional 0.9%)",
              },
              {
                label: "Federal Unemployment (FUTA)",
                value: "6% on first $7,000 of wages (typically reduced to 0.6% after state tax credit)",
                note: "Paid by employer only; not deducted from employee wages.",
              },
            ],
          },
          {
            heading: "Immigrant-Specific FICA Rules",
            items: [
              {
                label: "Nonresident aliens (F, J, M, Q visas)",
                value: "Generally exempt from FICA on wages from authorized employment",
                note: "Exemption does not apply once F/J visa holders become resident aliens for tax purposes.",
              },
              {
                label: "H-1B, L-1, O-1, TN visa holders",
                value: "Must pay FICA from day one of employment",
              },
              {
                label: "Totalization agreements",
                value: "US has agreements with 30+ countries to avoid double Social Security taxation",
                note: "Check whether your home country has a totalization agreement at ssa.gov.",
              },
            ],
          },
        ],
      },
      {
        id: "filing",
        title: "Filing & Deadlines",
        icon: "📅",
        sections: [
          {
            heading: "Key Dates",
            items: [
              {
                label: "Main filing deadline",
                value: "April 15 (moved to next business day if on weekend/holiday)",
              },
              {
                label: "Automatic extension",
                value: "File Form 4868 by April 15 for 6-month extension to October 15",
                note: "An extension to file is NOT an extension to pay. Interest and penalties accrue on unpaid tax from April 15.",
              },
              {
                label: "W-2 / 1099 delivery",
                value: "Employers must send W-2s by January 31; financial institutions send 1099s by February 15",
              },
              {
                label: "FBAR deadline",
                value: "April 15 (automatic extension to Oct 15) via FinCEN BSA E-Filing system",
              },
            ],
          },
          {
            heading: "Who Must File",
            items: [
              {
                label: "Income thresholds (2024)",
                value: "Single under 65: gross income over $14,600; married filing jointly: over $29,200",
              },
              {
                label: "Self-employed",
                value: "Must file if net self-employment income is $400 or more",
              },
              {
                label: "Nonresident aliens (Form 1040-NR)",
                value: "Must file if they had US-source income not fully withheld at source",
              },
            ],
          },
          {
            heading: "Free Filing Tools",
            items: [
              {
                label: "IRS Free File",
                value: "Free guided software for AGI under $79,000 at IRS.gov/freefile",
              },
              {
                label: "VITA (Volunteer Income Tax Assistance)",
                value: "Free tax prep for income under ~$67,000, people with disabilities, and limited-English speakers",
                note: "Particularly useful for newly arrived immigrants. Find a site at irs.gov/vita.",
              },
              {
                label: "Direct File",
                value: "IRS direct e-filing tool expanding to more states in 2024",
              },
            ],
          },
        ],
      },
      {
        id: "deductions",
        title: "Deductions & Credits",
        icon: "🧾",
        sections: [
          {
            heading: "Key Deductions (Above-the-line)",
            items: [
              {
                label: "Student loan interest",
                value: "Deduct up to $2,500/year; phases out at AGI $80,000–$95,000 (single)",
              },
              {
                label: "IRA contributions",
                value: "Up to $7,000 ($8,000 if age 50+) deductible if no workplace plan or within income limits",
              },
              {
                label: "Health Savings Account (HSA)",
                value: "Up to $4,150 single / $8,300 family pre-tax contribution for 2024",
              },
              {
                label: "401(k) / 403(b) contributions",
                value: "Up to $23,000 pre-tax ($30,500 if age 50+); reduces taxable income immediately",
              },
            ],
          },
          {
            heading: "Key Itemized Deductions",
            items: [
              {
                label: "Mortgage interest",
                value: "Deductible on loans up to $750,000; reported on Form 1098",
              },
              {
                label: "State & local taxes (SALT)",
                value: "Capped at $10,000/year (combined property + income or sales tax)",
              },
              {
                label: "Charitable contributions",
                value: "Up to 60% of AGI for cash donations to qualifying organisations",
              },
            ],
          },
          {
            heading: "Key Credits",
            items: [
              {
                label: "Child Tax Credit",
                value: "$2,000 per qualifying child under 17; up to $1,700 refundable (ACTC)",
                note: "Phases out above $200,000 AGI (single) / $400,000 (married).",
              },
              {
                label: "Earned Income Tax Credit (EITC)",
                value: "Up to $7,830 for three children (2024); powerful credit for lower-income workers",
                note: "Requires valid SSN; ITIN filers do not qualify.",
              },
              {
                label: "Child & Dependent Care Credit",
                value: "20–35% of up to $3,000 (one dependent) or $6,000 (two+) in care expenses",
              },
              {
                label: "American Opportunity Credit",
                value: "Up to $2,500 per eligible student for first 4 years of higher education; 40% refundable",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant-Specific Rules",
        icon: "🛂",
        sections: [
          {
            heading: "Tax Residency",
            items: [
              {
                label: "Substantial Presence Test",
                value: "183-day test: 31 days current year + 1/3 of days in prior year + 1/6 of days two years prior equals 183+",
                note: "If you meet this test you are a US resident alien for tax purposes, even on a temporary visa.",
              },
              {
                label: "Green card holders",
                value: "Taxed as US residents on worldwide income from the date the card is approved",
              },
              {
                label: "First-year election",
                value: "Certain new residents may elect to be treated as resident for part of their first year — file Form 1040 and attach election statement",
              },
              {
                label: "Dual-status returns",
                value: "In the year you change status (arrive or depart) you may be a dual-status alien — file both 1040 and 1040-NR or use 1040 with dual-status statement",
              },
            ],
          },
          {
            heading: "ITIN, SSN & Foreign Account Reporting",
            items: [
              {
                label: "ITIN (Individual Taxpayer Identification Number)",
                value: "Apply via Form W-7; for individuals ineligible for an SSN who need to file a US tax return",
                note: "ITIN holders cannot claim EITC, Social Security benefits, or work legally.",
              },
              {
                label: "FBAR (FinCEN Form 114)",
                value: "Must be filed if aggregate value of foreign financial accounts exceeded $10,000 at any point during the year",
                note: "Civil penalty up to $10,000 per violation; criminal penalties for willful violations.",
              },
              {
                label: "FATCA — Form 8938",
                value: "Disclose foreign financial assets above $50,000 (single, in US) with your 1040",
              },
              {
                label: "PFIC rules",
                value: "Foreign mutual funds and certain foreign investment vehicles are treated as Passive Foreign Investment Companies — complex taxation applies",
                note: "Many immigrants should liquidate foreign funds before becoming US tax residents to avoid PFIC rules.",
              },
            ],
          },
          {
            heading: "Tax Treaties & Double Taxation",
            items: [
              {
                label: "US tax treaties",
                value: "US has income tax treaties with 60+ countries; may reduce withholding on US-source income for nonresidents",
                note: "Treaty benefits must be claimed — they are not automatic. Use Form 8833 to disclose treaty positions.",
              },
              {
                label: "Foreign Tax Credit",
                value: "File Form 1116 to claim a dollar-for-dollar credit for foreign taxes paid on foreign income",
              },
              {
                label: "Foreign Earned Income Exclusion (FEIE)",
                value: "Exclude up to $126,500 (2024) of foreign earned income if you live and work abroad — file Form 2555",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Internal Revenue Service (IRS)", url: "https://www.irs.gov" },
  },

  // ── Germany ───────────────────────────────────────────────────────────────────
  {
    country: "DE",
    flag: "🇩🇪",
    name: "Germany",
    currency: "EUR",
    taxYear: "Jan 1 – Dec 31",
    filingDeadline: "July 31",
    immigrantNote:
      "Germany taxes residents on worldwide income. You become a tax resident as soon as you have a permanent residence (Wohnsitz) or habitual abode (gewohnlicher Aufenthalt) in Germany — arrival immediately triggers full tax liability. The 183-day rule is rarely a limiting factor because renting a flat already establishes residency.",
    keyNumbers: [
      { label: "Grundfreibetrag (Basic Allowance)", value: "€11,604", sub: "2024; income below this is tax-free" },
      { label: "Top rate (Spitzensteuersatz)", value: "42%", sub: "Applies above €66,761" },
      { label: "Reichsteuer", value: "45%", sub: "Applies above €277,826" },
      { label: "Solidaritatszuschlag", value: "5.5% of income tax", sub: "Only for higher earners after 2021 reform" },
      { label: "Arbeitnehmer-Pauschbetrag", value: "€1,230", sub: "Automatic work expense deduction" },
      { label: "Filing Deadline", value: "July 31", sub: "Extended to Nov 30 if using a tax advisor (Steuerberater)" },
    ],
    brackets: [
      { income: "Up to €11,604", rate: "0%", label: "Grundfreibetrag" },
      { income: "€11,605 – €17,005", rate: "14% – 24%", label: "Entry zone (progressive)" },
      { income: "€17,006 – €66,760", rate: "24% – 42%", label: "Middle zone (progressive)" },
      { income: "€66,761 – €277,825", rate: "42%", label: "Spitzensteuersatz" },
      { income: "Over €277,826", rate: "45%", label: "Reichsteuer" },
    ],
    categories: [
      {
        id: "income",
        title: "Einkommensteuer (Income Tax)",
        icon: "💶",
        sections: [
          {
            heading: "How the German System Works",
            items: [
              {
                label: "Progressive formula",
                value: "German income tax is a smooth mathematical formula, not discrete steps — the rate rises continuously from 14% to 42% between €11,604 and €66,760",
              },
              {
                label: "Lohnsteuer (payroll withholding)",
                value: "For employees, income tax is withheld monthly by the employer via the Lohnsteuer system based on your Steuerklasse",
                note: "Lohnsteuer is not a separate tax — it is advance payment of Einkommensteuer reconciled in the annual return.",
              },
              {
                label: "Solidaritatszuschlag",
                value: "5.5% surcharge on income tax; since 2021 only affects the top ~10% of earners (roughly income tax above €17,543)",
              },
              {
                label: "Kirchensteuer (Church Tax)",
                value: "8% of income tax (Baden-Wurttemberg/Bavaria) or 9% (other states) if you are registered as a member of a recognised church",
                note: "Immigrants can opt out by formally leaving (Kirchenaustritt) at the local registry office (Standesamt).",
              },
            ],
          },
          {
            heading: "Steuerklassen (Tax Classes)",
            items: [
              {
                label: "Klasse I",
                value: "Single, separated, or divorced — standard class for most single immigrants",
              },
              {
                label: "Klasse III / V",
                value: "Married couple where one earns significantly more: higher earner takes III (low withholding), lower earner takes V (high withholding)",
              },
              {
                label: "Klasse IV",
                value: "Married couples with roughly equal incomes — balanced withholding for both",
              },
              {
                label: "Klasse VI",
                value: "For a second or additional job — high withholding rate, no allowances applied",
              },
            ],
          },
          {
            heading: "Types of Taxable Income",
            items: [
              {
                label: "Employment income (Einkommen aus nichtselbststandiger Arbeit)",
                value: "Wages, salary, bonuses, non-cash benefits (Sachbezuge)",
              },
              {
                label: "Capital income (Kapitalertrage)",
                value: "Flat 25% Abgeltungsteuer (withholding tax) on dividends and interest; Saver's Allowance (Sparerpauschbetrag) €1,000 single / €2,000 married",
              },
              {
                label: "Rental income",
                value: "Taxed at marginal rate; mortgage interest, depreciation (AfA), and maintenance deductible",
              },
            ],
          },
        ],
      },
      {
        id: "social",
        title: "Sozialversicherung (Social Contributions)",
        icon: "🏛️",
        sections: [
          {
            heading: "Employee Contributions (approximate 2024 rates)",
            items: [
              {
                label: "Rentenversicherung (pension)",
                value: "9.3% employee + 9.3% employer = 18.6% total",
                note: "Contributions capped at income ceiling of €90,600 (West) / €89,400 (East) per year.",
              },
              {
                label: "Krankenversicherung (health insurance)",
                value: "7.3% employee + 7.3% employer base rate; additional Zusatzbeitrag avg ~1.7% (split equally)",
                note: "Total employee contribution typically ~8.15%. Above income ceiling (€69,300) you may switch to private health insurance (PKV).",
              },
              {
                label: "Pflegeversicherung (long-term care)",
                value: "1.7% employee (childless: 2.0%) + 1.7% employer",
              },
              {
                label: "Arbeitslosenversicherung (unemployment)",
                value: "1.3% employee + 1.3% employer",
              },
            ],
          },
          {
            heading: "Total Payroll Burden",
            items: [
              {
                label: "Total employee social contributions",
                value: "Approximately 20% of gross salary (income-dependent ceilings apply)",
              },
              {
                label: "Total employer social contributions",
                value: "Approximately 20% of gross salary on top of the employee gross",
              },
              {
                label: "Net-gross ratio",
                value: "A single earner (Klasse I) on €50,000 gross typically takes home approximately €31,000–€33,000 net",
              },
            ],
          },
          {
            heading: "Immigrant Access to Social Benefits",
            items: [
              {
                label: "Pension portability",
                value: "EU Blue Card holders can transfer pension rights within the EU; bilateral agreements exist with some non-EU countries",
              },
              {
                label: "Krankenversicherungspflicht",
                value: "Health insurance is mandatory for all residents — either statutory (GKV) or private (PKV)",
              },
              {
                label: "Kindergeld",
                value: "Child benefit €250/month per child (2024) available to all residents paying into the system, regardless of nationality",
              },
            ],
          },
        ],
      },
      {
        id: "filing",
        title: "Steuererklarung (Filing)",
        icon: "📅",
        sections: [
          {
            heading: "Key Dates & Who Must File",
            items: [
              {
                label: "Filing deadline",
                value: "July 31 of the following year (e.g., 2024 taxes due July 31, 2025)",
                note: "Extended to November 30 if a Steuerberater (tax advisor) prepares the return.",
              },
              {
                label: "Mandatory filing (Pflichtveranlagung)",
                value: "Must file if: you received income from multiple sources, Lohnersatzleistungen (ALG I, parental pay) over €410, self-employment income, or Finanzamt requests a return",
              },
              {
                label: "Voluntary filing (Antragsveranlagung)",
                value: "Employees can voluntarily file to claim deductions — the average refund in Germany is over €1,000",
              },
              {
                label: "Steuernummer vs. Steuer-ID",
                value: "Steuer-ID (11-digit) is assigned at registration and never changes; Steuernummer is assigned per Finanzamt and may change",
              },
            ],
          },
          {
            heading: "Online Filing with Elster",
            items: [
              {
                label: "Elster (Elektronische Steuererklarung)",
                value: "Free official online filing portal at elster.de — available in German",
              },
              {
                label: "ElsterFormular and Mein Elster",
                value: "Both the desktop software and web portal are free; certificates can be used for secure authentication",
              },
              {
                label: "Commercial software",
                value: "WISO Steuer, SteuerGo, Taxfix — some offer English-language interfaces for immigrants",
              },
            ],
          },
          {
            heading: "Registering with Authorities",
            items: [
              {
                label: "Anmeldung (residence registration)",
                value: "Must register address at local Burgeramt within 14 days of moving in — triggers automatic Steuer-ID issuance within 1–3 weeks",
              },
              {
                label: "Finanzamt",
                value: "Your local tax office; assigned based on registered address; handles income tax, business tax, VAT",
              },
              {
                label: "Lohnsteuerkarte digital",
                value: "Since 2013 the paper tax card is replaced by the electronic ELStAM database — no card needed, employer retrieves data automatically",
              },
            ],
          },
        ],
      },
      {
        id: "deductions",
        title: "Deductions & Allowances",
        icon: "🧾",
        sections: [
          {
            heading: "Werbungskosten (Work-Related Expenses)",
            items: [
              {
                label: "Arbeitnehmer-Pauschbetrag",
                value: "€1,230 flat-rate work expense deduction applied automatically without receipts",
              },
              {
                label: "Commuting allowance (Pendlerpauschale)",
                value: "€0.30/km for first 20 km; €0.38/km from km 21 onwards; one way per working day",
                note: "Can exceed the €1,230 Pauschbetrag — claim both if actual expenses are higher.",
              },
              {
                label: "Home office",
                value: "€6/day up to €1,260/year for working from home (as of 2023 reform)",
              },
              {
                label: "Work equipment and professional development",
                value: "Laptop, tools, professional books, union fees, courses — all deductible as Werbungskosten",
              },
            ],
          },
          {
            heading: "Sonderausgaben (Special Expenses)",
            items: [
              {
                label: "Pension contributions",
                value: "Up to €27,566 (single, 2024) of statutory and private pension contributions deductible as Sonderausgaben",
              },
              {
                label: "Krankenversicherung premiums",
                value: "Health and long-term care insurance premiums fully deductible as Sonderausgaben",
              },
              {
                label: "Charitable donations",
                value: "Up to 20% of total income; donations to recognised German charities (gemeinnützige Organisationen)",
              },
              {
                label: "Childcare costs",
                value: "Up to 2/3 of costs, max €4,000 per child under 14, deductible as Sonderausgaben",
              },
            ],
          },
          {
            heading: "Haushaltsnahe Aufwendungen (Household Credits)",
            items: [
              {
                label: "Haushaltsnahe Dienstleistungen",
                value: "20% credit (up to €4,000) for household services: cleaning, gardening, elderly care",
                note: "Must be invoiced and paid by bank transfer — cash payments do not qualify.",
              },
              {
                label: "Handwerkerleistungen (craft services)",
                value: "20% credit (up to €1,200) for repair/renovation work in your home",
              },
              {
                label: "Energetische Sanierung",
                value: "20% credit over 3 years (max €40,000 total) for energy renovation of owner-occupied property built before 2002",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant-Specific Rules",
        icon: "🛂",
        sections: [
          {
            heading: "Tax Residency in Germany",
            items: [
              {
                label: "Unlimited tax liability (unbeschrankte Steuerpflicht)",
                value: "Triggered by having a registered address (Wohnsitz) or staying 183+ days in Germany — worldwide income taxed",
              },
              {
                label: "Limited tax liability (beschrankte Steuerpflicht)",
                value: "Non-residents with German-source income only pay German tax on that income — flat rates apply to some categories",
              },
              {
                label: "EU Blue Card holders",
                value: "Immediately subject to unlimited tax liability from day of registration; no grace period",
              },
              {
                label: "Double taxation treaties",
                value: "Germany has over 95 double taxation treaties (Doppelbesteuerungsabkommen) — among the widest networks globally",
              },
            ],
          },
          {
            heading: "Foreign Income & Assets",
            items: [
              {
                label: "Foreign income reporting",
                value: "All worldwide income must be declared in the German return; attach Anlage AUS for foreign income",
              },
              {
                label: "Anrechnungsmethode (credit method)",
                value: "Foreign taxes paid are credited against German tax on the same income — prevents double taxation",
              },
              {
                label: "Freistellungsmethode (exemption method)",
                value: "Some treaty partners allow foreign income to be exempt from German tax but included for rate-progression purposes",
              },
              {
                label: "Wegzugsteuer (exit tax)",
                value: "If you leave Germany and hold >1% of a corporation, accrued capital gains may be taxed upon departure",
              },
            ],
          },
          {
            heading: "Practical Tips for Newcomers",
            items: [
              {
                label: "Steuerberater recommendation",
                value: "German tax returns can be complex — a Steuerberater (licensed tax advisor) costs €100–€500 but typically pays for itself in refunds",
              },
              {
                label: "Language barrier",
                value: "All official forms are in German; English translation services and bilingual tax advisors are widely available in major cities",
              },
              {
                label: "First-year return",
                value: "Claim moving expenses (Umzugskosten) if you moved for work — up to BRKG flat-rate amounts deductible without receipts",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Bundeszentralamt fur Steuern (BZSt)", url: "https://www.bzst.de" },
  },

  // ── United Kingdom ────────────────────────────────────────────────────────────
  {
    country: "UK",
    flag: "🇬🇧",
    name: "United Kingdom",
    currency: "GBP",
    taxYear: "Apr 6 – Apr 5",
    filingDeadline: "January 31 (online Self Assessment)",
    immigrantNote:
      "The UK uses the Statutory Residence Test (SRT) to determine tax residency. Being in the UK for 183 or more days in a tax year is the clearest automatic UK resident test. UK residents are taxed on worldwide income. The remittance basis for non-domiciled individuals was abolished from April 6, 2025.",
    keyNumbers: [
      { label: "Personal Allowance", value: "£12,570", sub: "2024/25; tapers above £100,000 income" },
      { label: "Basic Rate", value: "20%", sub: "£12,571 – £50,270" },
      { label: "Higher Rate", value: "40%", sub: "£50,271 – £125,140" },
      { label: "Additional Rate", value: "45%", sub: "Over £125,140" },
      { label: "National Insurance (Employee)", value: "8%", sub: "On earnings £12,570 – £50,270; 2% above" },
      { label: "Self Assessment Deadline", value: "January 31", sub: "Online; paper return October 31" },
    ],
    brackets: [
      { income: "Up to £12,570", rate: "0%", label: "Personal Allowance" },
      { income: "£12,571 – £50,270", rate: "20%", label: "Basic rate" },
      { income: "£50,271 – £125,140", rate: "40%", label: "Higher rate" },
      { income: "Over £125,140", rate: "45%", label: "Additional rate" },
    ],
    categories: [
      {
        id: "income",
        title: "Income Tax",
        icon: "💷",
        sections: [
          {
            heading: "How the UK System Works",
            items: [
              {
                label: "Personal Allowance",
                value: "First £12,570 of income is tax-free; tapers by £1 for every £2 over £100,000 (effectively 60% marginal rate between £100k–£125,140)",
              },
              {
                label: "PAYE (Pay As You Earn)",
                value: "For employees, income tax and National Insurance are deducted by the employer every pay period via an electronic tax code system",
                note: "Most employed workers do not need to file a tax return — PAYE handles it automatically.",
              },
              {
                label: "Tax codes",
                value: "HMRC issues a tax code to your employer (e.g., 1257L for standard personal allowance); check yours via HMRC Personal Tax Account",
              },
              {
                label: "Dividend allowance",
                value: "First £500 (2024/25) of dividend income is tax-free; above that: 8.75% basic rate, 33.75% higher rate, 39.35% additional rate",
              },
            ],
          },
          {
            heading: "Scottish & Welsh Income Tax",
            items: [
              {
                label: "Scottish income tax",
                value: "Scottish Parliament sets its own rates and bands for non-savings income: Starter 19%, Basic 20%, Intermediate 21%, Higher 42%, Advanced 45%, Top 48%",
              },
              {
                label: "Welsh income tax",
                value: "Wales has devolved income tax powers but has set rates equal to the rest of England for 2024/25",
              },
              {
                label: "Which rate applies?",
                value: "Your main place of residence determines which nation's rates apply, regardless of where you work",
              },
            ],
          },
          {
            heading: "Capital Gains Tax",
            items: [
              {
                label: "CGT Annual Exempt Amount",
                value: "£3,000 (2024/25) — gains below this are not taxed",
              },
              {
                label: "CGT rates",
                value: "10% (basic rate) / 20% (higher rate) on most assets; 18% / 24% on residential property (2024/25 rates after Spring Budget 2024)",
              },
              {
                label: "Principal Private Residence Relief",
                value: "Your primary home is exempt from CGT if you lived in it throughout ownership",
              },
            ],
          },
        ],
      },
      {
        id: "social",
        title: "National Insurance",
        icon: "🏥",
        sections: [
          {
            heading: "Employee National Insurance (Class 1)",
            items: [
              {
                label: "Rate on earnings £12,570 – £50,270",
                value: "8% (reduced from 10% in January 2024, then 8% from April 2024)",
              },
              {
                label: "Rate above £50,270",
                value: "2% (no upper limit)",
              },
              {
                label: "Earnings below £12,570",
                value: "No NI contribution; earnings between £6,396 and £12,570 count as a qualifying year for State Pension even though no NI is paid",
              },
            ],
          },
          {
            heading: "Employer NI (Class 1 Secondary)",
            items: [
              {
                label: "Employer rate",
                value: "13.8% on employee earnings above £9,100/year",
                note: "Employment Allowance of £5,000 reduces employer NI for eligible smaller employers.",
              },
              {
                label: "Apprenticeship Levy",
                value: "0.5% on payroll above £3 million/year; paid by employers to fund apprenticeship training",
              },
            ],
          },
          {
            heading: "Self-Employed NI (Class 2 & 4)",
            items: [
              {
                label: "Class 2",
                value: "Abolished from April 6, 2024 — self-employed now get State Pension credit through Class 4 contributions",
              },
              {
                label: "Class 4",
                value: "9% on profits £12,570 – £50,270; 2% above £50,270 (rates from April 2024)",
              },
              {
                label: "Voluntary Class 3",
                value: "£17.45/week to fill gaps in your National Insurance record and protect your State Pension",
              },
            ],
          },
        ],
      },
      {
        id: "filing",
        title: "Filing & Deadlines",
        icon: "📅",
        sections: [
          {
            heading: "Self Assessment Deadlines",
            items: [
              {
                label: "Register for Self Assessment",
                value: "By October 5 after the tax year in which you became liable (e.g., earn self-employment income in 2024/25 — register by October 5, 2025)",
              },
              {
                label: "Paper return deadline",
                value: "October 31 following the end of the tax year",
              },
              {
                label: "Online return deadline",
                value: "January 31 following the end of the tax year",
                note: "The same January 31 deadline applies for paying any tax owed.",
              },
              {
                label: "Payments on Account",
                value: "If your tax bill exceeds £1,000, you pay two instalments: January 31 and July 31 of the following year (50% each)",
              },
            ],
          },
          {
            heading: "Who Needs to File Self Assessment",
            items: [
              {
                label: "Employed workers",
                value: "Most employed workers do NOT need to file — PAYE handles their tax",
              },
              {
                label: "Must file if:",
                value: "Self-employed, director of a company, income over £100,000, rental income, foreign income, capital gains above the exempt amount, Child Benefit clawback (HICBC)",
              },
              {
                label: "P60 / P45 forms",
                value: "P60 is your annual tax summary from employer; P45 is issued when you leave a job — keep both for your records",
              },
            ],
          },
          {
            heading: "HMRC Tools",
            items: [
              {
                label: "HMRC Personal Tax Account",
                value: "Free online account at gov.uk to check tax codes, claim refunds, file Self Assessment — accessible via Government Gateway ID",
              },
              {
                label: "HMRC app",
                value: "Official iOS/Android app for checking pay, tax code, National Insurance record and State Pension forecast",
              },
              {
                label: "HMRC free resources for new arrivals",
                value: "HMRC runs webinars and publishes guides specifically for individuals new to the UK tax system",
              },
            ],
          },
        ],
      },
      {
        id: "deductions",
        title: "Deductions & Credits",
        icon: "🧾",
        sections: [
          {
            heading: "Key Allowances & Reliefs",
            items: [
              {
                label: "Marriage Allowance",
                value: "Transfer £1,260 of Personal Allowance to a basic-rate taxpayer spouse/civil partner — saves up to £252/year",
              },
              {
                label: "Blind Person's Allowance",
                value: "Extra £2,870 (2024/25) tax-free allowance for registered blind or severely visually impaired individuals",
              },
              {
                label: "Pension contributions",
                value: "Contributions to a registered pension receive tax relief at your marginal rate — basic rate automatically applied; higher-rate relief claimed via Self Assessment",
              },
              {
                label: "ISA allowance",
                value: "Up to £20,000/year in an Individual Savings Account — interest, dividends, and gains are completely tax-free",
              },
            ],
          },
          {
            heading: "Work-Related Expenses",
            items: [
              {
                label: "Employment expenses",
                value: "Claim via P87 or Self Assessment: professional subscriptions, uniforms, tools, mileage at 45p/mile (first 10,000 miles), 25p/mile after",
              },
              {
                label: "Working from home",
                value: "£6/week (£312/year) flat-rate relief without receipts if you are required to work from home",
              },
              {
                label: "Professional fees and subscriptions",
                value: "HMRC maintains a list of approved professional bodies whose fees are deductible",
              },
            ],
          },
          {
            heading: "Tax Credits & Benefits",
            items: [
              {
                label: "Child Tax Credit",
                value: "Being replaced by Universal Credit for new claimants; existing claimants: up to £3,455/year for first child",
              },
              {
                label: "Working Tax Credit",
                value: "Being replaced by Universal Credit; provides in-work financial support for low-income workers",
              },
              {
                label: "Child Benefit",
                value: "£25.60/week for first child (2024/25); taxed back via HICBC if either parent earns over £60,000",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant-Specific Rules",
        icon: "🛂",
        sections: [
          {
            heading: "Statutory Residence Test (SRT)",
            items: [
              {
                label: "Automatic UK resident",
                value: "You are automatically UK resident if: present in UK 183+ days in the tax year; OR have a UK home with no overseas home; OR work full-time in UK for 365 days with no significant break",
              },
              {
                label: "Automatic non-resident",
                value: "Fewer than 16 days in the UK (or 46 days if not UK resident in any of the previous 3 years); or work full-time overseas with fewer than 91 days in UK",
              },
              {
                label: "Sufficient ties test",
                value: "If you fall in between, HMRC counts 'ties' (family, accommodation, work, 90-day, country tie) to determine residency",
              },
              {
                label: "Split-year treatment",
                value: "In the year you arrive or depart, your tax year may be split so you are only UK resident for part of the year — claim via Self Assessment",
              },
            ],
          },
          {
            heading: "Foreign Income & Non-Doms",
            items: [
              {
                label: "Remittance basis (abolished)",
                value: "The non-domicile remittance basis — where foreign income was only taxed when brought to the UK — was abolished from April 6, 2025",
                note: "A 4-year temporary repatriation facility (TRF) allows previous users to remit accumulated foreign income at reduced rates transitionally.",
              },
              {
                label: "New arrivals regime (from April 2025)",
                value: "Individuals who were not UK resident in the prior 10 years can elect to exempt foreign income and gains for the first 4 years of UK residency",
              },
              {
                label: "Double taxation treaties",
                value: "UK has over 130 double taxation treaties — the most of any country; claim treaty relief via Self Assessment and form DT-Individual",
              },
            ],
          },
          {
            heading: "Practical Matters for New Arrivals",
            items: [
              {
                label: "National Insurance Number (NIN)",
                value: "Apply via DWP as soon as you have the right to work — required for payroll and to build State Pension record",
              },
              {
                label: "P45 from abroad",
                value: "No equivalent when arriving from overseas — complete a new starter declaration (P46-equivalent via payroll) with your employer using tax code 1257L on a Week 1/Month 1 basis until HMRC issues a code",
              },
              {
                label: "State Pension qualifying years",
                value: "You need 35 qualifying NI years for a full new State Pension (£221.20/week in 2024/25); minimum 10 years for any pension",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "HM Revenue & Customs (HMRC)", url: "https://www.gov.uk/government/organisations/hm-revenue-customs" },
  },

  // ── Canada ────────────────────────────────────────────────────────────────────
  {
    country: "CA",
    flag: "🇨🇦",
    name: "Canada",
    currency: "CAD",
    taxYear: "Jan 1 – Dec 31",
    filingDeadline: "April 30",
    immigrantNote:
      "Canada taxes permanent residents and deemed residents on worldwide income from the date of landing. Temporary residents are generally taxed on Canadian-source income and any employment income. A Social Insurance Number (SIN) is required to file — apply at a Service Canada centre when you arrive.",
    keyNumbers: [
      { label: "Basic Personal Amount", value: "C$15,705", sub: "2024 federal non-refundable credit base" },
      { label: "Top Federal Rate", value: "33%", sub: "On income over C$220,000" },
      { label: "CPP Contribution (Employee)", value: "5.95%", sub: "On earnings up to C$68,500 pensionable maximum" },
      { label: "EI Premium (Employee)", value: "1.66%", sub: "On insurable earnings up to C$63,200 (2024)" },
      { label: "RRSP Contribution Limit", value: "18% of earned income", sub: "Max C$31,560 for 2024" },
      { label: "Filing Deadline", value: "April 30", sub: "Self-employed: June 15 (tax payment still April 30)" },
    ],
    brackets: [
      { income: "C$0 – C$55,867", rate: "15%" },
      { income: "C$55,868 – C$111,733", rate: "20.5%" },
      { income: "C$111,734 – C$154,906", rate: "26%" },
      { income: "C$154,907 – C$220,000", rate: "29%" },
      { income: "Over C$220,000", rate: "33%" },
    ],
    categories: [
      {
        id: "income",
        title: "Income Tax",
        icon: "🍁",
        sections: [
          {
            heading: "How the Federal System Works",
            items: [
              {
                label: "Progressive federal brackets",
                value: "5 federal brackets from 15% to 33%; each level only taxes the income within that bracket",
              },
              {
                label: "Federal non-refundable tax credits",
                value: "Rather than deductions, Canada uses tax credits at 15% (the lowest federal rate): Basic Personal Amount, CPP/EI, age amount, disability, tuition",
              },
              {
                label: "Employer withholding",
                value: "Employers deduct federal and provincial income tax, CPP, and EI from each paycheque; reported on T4 slip issued by February 28",
              },
              {
                label: "Tax return purpose",
                value: "Annual T1 return reconciles withholding and determines eligibility for credits and benefits like GST/HST credit and Canada Child Benefit",
              },
            ],
          },
          {
            heading: "Provincial Income Tax",
            items: [
              {
                label: "Ontario (ON)",
                value: "5.05% on income up to C$51,446; up to 13.16% on income over C$220,000",
              },
              {
                label: "British Columbia (BC)",
                value: "5.06% on income up to C$45,654; up to 20.5% on income over C$240,716",
              },
              {
                label: "Alberta (AB)",
                value: "10% flat rate on all income up to C$148,269; higher rates on income above that level",
              },
              {
                label: "Quebec (QC)",
                value: "14% to 25.75%; Quebec administers its own separate provincial tax return (TP1) in addition to the federal T1",
              },
            ],
          },
          {
            heading: "Capital Gains",
            items: [
              {
                label: "Inclusion rate (2024)",
                value: "50% inclusion rate for individuals on first C$250,000 of annual capital gains; 2/3 inclusion above C$250,000 (2024 Budget proposal — confirm status)",
                note: "Only the included portion is taxed at marginal rates, not the full gain.",
              },
              {
                label: "Principal residence exemption",
                value: "Capital gain on sale of your principal residence is generally fully exempt from tax",
              },
              {
                label: "Lifetime Capital Gains Exemption",
                value: "C$1,016,602 (2024) exemption on qualifying small business shares and farm/fishing property",
              },
            ],
          },
        ],
      },
      {
        id: "social",
        title: "CPP, EI & Payroll",
        icon: "🏥",
        sections: [
          {
            heading: "Canada Pension Plan (CPP)",
            items: [
              {
                label: "Employee contribution rate",
                value: "5.95% on earnings between C$3,500 (basic exemption) and C$68,500 (2024 Year's Maximum Pensionable Earnings)",
              },
              {
                label: "Employer contribution",
                value: "Matches employee contribution — 5.95% up to the same ceiling",
              },
              {
                label: "CPP2 (second additional tier)",
                value: "An additional 4% on earnings between C$68,500 and C$73,200 (2024 Year's Additional Maximum Pensionable Earnings) — enhancing future CPP benefits",
              },
              {
                label: "Quebec Pension Plan (QPP)",
                value: "Quebec residents contribute to QPP instead of CPP at slightly different rates",
              },
            ],
          },
          {
            heading: "Employment Insurance (EI)",
            items: [
              {
                label: "Employee premium rate",
                value: "1.66% on insurable earnings up to C$63,200 (2024 maximum insurable earnings)",
              },
              {
                label: "Employer premium",
                value: "1.4 times the employee rate = 2.324% on the same insurable earnings ceiling",
              },
              {
                label: "EI for immigrants",
                value: "Must work at least 420–700 insurable hours (depending on regional unemployment rate) before qualifying for regular EI benefits",
                note: "On your first EI claim, the qualifying period considers your entire work history in Canada.",
              },
            ],
          },
          {
            heading: "Other Payroll Considerations",
            items: [
              {
                label: "Workers Compensation",
                value: "Employer-paid (not employee); rates vary by province and industry — mandatory for most employers",
              },
              {
                label: "Provincial payroll taxes",
                value: "Ontario, Manitoba, Quebec, and Newfoundland levy employer health taxes/payroll taxes on larger payrolls",
              },
              {
                label: "RRSP as payroll planning",
                value: "RRSP contributions reduce net income, can lower CPP self-employment and EI repayment thresholds",
              },
            ],
          },
        ],
      },
      {
        id: "filing",
        title: "Filing & Deadlines",
        icon: "📅",
        sections: [
          {
            heading: "Key Dates",
            items: [
              {
                label: "General filing deadline",
                value: "April 30 — all individuals except self-employed",
              },
              {
                label: "Self-employed deadline",
                value: "June 15 for filing, BUT any tax balance owing is still due April 30 — interest runs from May 1 if not paid",
              },
              {
                label: "RRSP contribution deadline",
                value: "60 days after December 31 (typically March 1 or 2); contributions reduce the prior year's taxable income",
              },
              {
                label: "T4/T5 slip deadline",
                value: "Employers must issue T4 slips by February 28; financial institutions send T5 slips (investment income) by February 28",
              },
            ],
          },
          {
            heading: "Filing Tools",
            items: [
              {
                label: "CRA My Account",
                value: "Online portal at canada.ca/cra to file, view assessment, check benefit payments, manage RRSP room",
              },
              {
                label: "NETFILE",
                value: "Electronic filing of T1 return using CRA-certified software (TurboTax, SimpleTax/Wealthsimple Tax, UFile); Wealthsimple Tax is free",
              },
              {
                label: "Community Volunteer Income Tax Program (CVITP)",
                value: "Free tax clinics for modest-income individuals — particularly helpful for newcomers to Canada",
              },
              {
                label: "Auto-fill my return",
                value: "CRA prefills T-slips and RRSP room in certified software if you link your My Account — reduces data entry errors",
              },
            ],
          },
          {
            heading: "Notice of Assessment (NOA)",
            items: [
              {
                label: "What it is",
                value: "CRA issues a NOA after processing your return — shows your assessed income, tax payable, RRSP room, and any adjustments",
              },
              {
                label: "Reassessment period",
                value: "CRA has 3 years from the NOA to reassess your return (10 years for certain misrepresentations)",
              },
              {
                label: "Objection rights",
                value: "You have 90 days from NOA to file a Notice of Objection if you disagree with the assessment",
              },
            ],
          },
        ],
      },
      {
        id: "deductions",
        title: "Deductions & Credits",
        icon: "🧾",
        sections: [
          {
            heading: "Key Deductions",
            items: [
              {
                label: "RRSP contributions",
                value: "Deduct contributions up to 18% of prior year earned income (max C$31,560 for 2024) — tax-deferred growth until withdrawal",
              },
              {
                label: "Childcare expenses",
                value: "Deductible by the lower-income spouse: C$8,000 per child under 7, C$5,000 per child 7–16",
              },
              {
                label: "Moving expenses",
                value: "Deductible if you moved at least 40 km closer to a new job or school — eligible costs include transport, temporary housing, selling costs",
              },
              {
                label: "Employment expenses",
                value: "Commission employees, tradespersons, artists, and those required by employer to work from home may deduct certain costs (T2200 form required from employer)",
              },
            ],
          },
          {
            heading: "Key Non-Refundable Credits",
            items: [
              {
                label: "Basic Personal Amount",
                value: "15% credit on C$15,705 (2024) = C$2,356 reduction in federal tax",
              },
              {
                label: "Spousal / Eligible Dependant Amount",
                value: "Up to C$15,705 credit base for a spouse or dependant with little or no income",
              },
              {
                label: "Disability Tax Credit (DTC)",
                value: "C$9,428 (2024) federal credit base for individuals with prolonged physical or mental impairment",
              },
              {
                label: "Canada Training Credit",
                value: "Refundable credit accumulating at C$250/year (max C$5,000 lifetime) for eligible training and tuition fees",
              },
            ],
          },
          {
            heading: "Key Refundable Credits & Benefits",
            items: [
              {
                label: "Canada Child Benefit (CCB)",
                value: "Tax-free monthly benefit up to C$7,437/year for children under 6 and C$6,275 for children 6–17 (2023/24); income-tested",
              },
              {
                label: "GST/HST Credit",
                value: "Quarterly tax-free payment for low-to-moderate income individuals and families — file a return even if no income to receive it",
              },
              {
                label: "Climate Action Incentive (CAIP)",
                value: "Quarterly payments to residents of provinces where federal carbon pricing applies (AB, SK, MB, ON, NB, NS, PEI, NL)",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant-Specific Rules",
        icon: "🛂",
        sections: [
          {
            heading: "Tax Residency & First Year",
            items: [
              {
                label: "Deemed resident from landing",
                value: "Permanent residents are taxed on worldwide income from their landing date — not January 1",
                note: "Your first T1 return covers only your partial year of residency in Canada.",
              },
              {
                label: "Determining residency (Part-Year)",
                value: "Your worldwide income for the full year is used to calculate your provincial tax and some credits, but you report and pay tax only on income earned after becoming resident",
              },
              {
                label: "Temporary residents",
                value: "Work permit holders are generally taxed on Canadian-source income and income from employment performed in Canada",
              },
              {
                label: "Ties to Canada",
                value: "CRA uses residential ties (home, spouse, dependants, bank accounts, health card, drivers licence) to determine residency — not just day-counting",
              },
            ],
          },
          {
            heading: "SIN & Foreign Asset Reporting",
            items: [
              {
                label: "Social Insurance Number (SIN)",
                value: "Apply at any Service Canada centre — required for employment, CRA filing, and benefits; issued within minutes",
              },
              {
                label: "Form T1135 — Foreign Income Verification",
                value: "Must be filed if you owned specified foreign property with a total cost of more than C$100,000 at any point in the year",
                note: "Includes foreign bank accounts, stocks, real estate (other than personal use), and private corp interests. Penalties up to C$2,500 plus 5% of asset value.",
              },
              {
                label: "Departure tax",
                value: "When you leave Canada and cease to be resident, you are deemed to have disposed of most assets at fair market value — triggering potential capital gains (departure tax)",
              },
            ],
          },
          {
            heading: "Tax Treaties & Remittances",
            items: [
              {
                label: "Tax treaties",
                value: "Canada has tax treaties with 90+ countries; may reduce withholding on Canadian-source income paid to non-residents and credit foreign taxes paid",
              },
              {
                label: "Foreign tax credit",
                value: "File Schedule T2209 to claim credit for foreign income taxes paid; separate calculations for business and non-business income",
              },
              {
                label: "Pension income from abroad",
                value: "Foreign pension income is generally taxable in Canada; treaty provisions may allow partial or full exemption depending on the country",
              },
              {
                label: "First-year RRSP room",
                value: "RRSP contribution room is based on prior-year earned income reported in Canada — newly arrived immigrants typically have little or no room in their first year",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Canada Revenue Agency (CRA)", url: "https://www.canada.ca/en/revenue-agency.html" },
  },

  // ── Australia ─────────────────────────────────────────────────────────────────
  {
    country: "AU",
    flag: "🇦🇺",
    name: "Australia",
    currency: "AUD",
    taxYear: "Jul 1 – Jun 30",
    filingDeadline: "October 31",
    immigrantNote:
      "Australia uses a residence-based tax system. You are an Australian tax resident from day one of becoming a permanent resident. Temporary residents (most skilled work visa holders) are only taxed on Australian-source income and certain employment income — a significant concession. You must apply for a Tax File Number (TFN) as soon as possible; without it your employer must withhold tax at 47%.",
    keyNumbers: [
      { label: "Tax-Free Threshold", value: "A$18,200", sub: "2024/25; only available to Australian tax residents" },
      { label: "Top Marginal Rate", value: "45%", sub: "On income over A$180,000" },
      { label: "Medicare Levy", value: "2%", sub: "On taxable income; low-income exemption below ~A$26,000" },
      { label: "Superannuation (Employer)", value: "11%", sub: "Paid by employer on top of salary (Superannuation Guarantee 2024)" },
      { label: "Low Income Tax Offset (LITO)", value: "Up to A$700", sub: "Offsets tax for income up to A$37,500" },
      { label: "Lodgment Deadline", value: "October 31", sub: "Or May 15 if using a registered tax agent" },
    ],
    brackets: [
      { income: "Up to A$18,200", rate: "0%", label: "Tax-free threshold" },
      { income: "A$18,201 – A$45,000", rate: "19%" },
      { income: "A$45,001 – A$120,000", rate: "32.5%" },
      { income: "A$120,001 – A$180,000", rate: "37%" },
      { income: "Over A$180,000", rate: "45%" },
    ],
    categories: [
      {
        id: "income",
        title: "Income Tax",
        icon: "🦘",
        sections: [
          {
            heading: "How the Australian System Works",
            items: [
              {
                label: "Progressive brackets",
                value: "4 tax brackets from 19% to 45% above the A$18,200 tax-free threshold",
                note: "The Stage 3 tax cuts (effective July 1, 2024) restructured the middle brackets — the 37% rate now starts at A$120,001 instead of A$87,000.",
              },
              {
                label: "PAYG withholding",
                value: "Employers withhold Pay As You Go tax each pay period based on your tax file number declaration and estimated annual earnings",
              },
              {
                label: "Medicare Levy",
                value: "2% of taxable income for most taxpayers; added to income tax liability and collected together",
              },
              {
                label: "Medicare Levy Surcharge (MLS)",
                value: "1–1.5% additional levy on higher-income earners (singles >A$93,000) without private hospital insurance",
              },
            ],
          },
          {
            heading: "Tax Offsets",
            items: [
              {
                label: "Low Income Tax Offset (LITO)",
                value: "Up to A$700 for income up to A$37,500; phases out to zero by A$66,667",
                note: "LITO effectively raises the tax-free threshold closer to A$21,885 for low-income earners.",
              },
              {
                label: "Low and Middle Income Tax Offset (LMITO)",
                value: "LMITO ended after the 2021/22 income year — it is no longer available from 2022/23 onwards",
              },
              {
                label: "Senior Australians and Pensioners Tax Offset (SAPTO)",
                value: "For eligible older Australians receiving age pension — can eliminate tax on income up to certain thresholds",
              },
            ],
          },
          {
            heading: "Capital Gains Tax",
            items: [
              {
                label: "CGT discount",
                value: "50% CGT discount for assets held more than 12 months (individuals); net gain taxed at marginal rate",
              },
              {
                label: "Primary residence exemption",
                value: "Your main residence is generally fully exempt from CGT; partial exemption if you use it for income-producing purposes",
              },
              {
                label: "Temporary residents and CGT",
                value: "Temporary residents are only subject to CGT on taxable Australian property (real estate and business assets), not on foreign assets",
              },
            ],
          },
        ],
      },
      {
        id: "social",
        title: "Superannuation & Medicare",
        icon: "🏥",
        sections: [
          {
            heading: "Superannuation (Employer Contributions)",
            items: [
              {
                label: "Superannuation Guarantee (SG) rate",
                value: "11% for 2023/24; rising to 11.5% on July 1, 2024 and 12% from July 1, 2025",
                note: "This is paid by the employer on top of your salary — it does not reduce your take-home pay.",
              },
              {
                label: "Choice of fund",
                value: "Most employees can choose which super fund receives their SG contributions; if you do not choose, contributions go to your employer's default fund",
              },
              {
                label: "Concessional (before-tax) contributions cap",
                value: "A$27,500/year (2024/25) including employer SG and salary sacrifice; taxed at 15% inside the fund",
              },
              {
                label: "Non-concessional (after-tax) contributions cap",
                value: "A$110,000/year (or A$330,000 over 3 years using bring-forward rule) for those with total super below A$1.9 million",
              },
            ],
          },
          {
            heading: "Medicare",
            items: [
              {
                label: "Medicare levy",
                value: "2% of taxable income; exemptions for low-income earners and certain visa holders",
              },
              {
                label: "Medicare coverage",
                value: "Residents and some temporary visa holders (from countries with reciprocal health agreements: UK, NZ, Italy, Belgium, Netherlands, Sweden, Finland, Norway, Ireland, Malta, Slovenia) access subsidised healthcare",
              },
              {
                label: "Private health insurance",
                value: "Lifetime Health Cover loading applies 2% per year over 30 — take out hospital cover before you turn 31 to avoid higher premiums",
              },
            ],
          },
          {
            heading: "No Employer Unemployment Insurance",
            items: [
              {
                label: "No payroll unemployment tax",
                value: "Australia does not have a US/Canadian-style unemployment insurance payroll tax — JobSeeker payments are funded via general taxation",
              },
              {
                label: "Workers compensation",
                value: "Each state/territory has its own workers compensation scheme — employer-funded and mandatory",
              },
              {
                label: "Payroll tax (state-level)",
                value: "States levy payroll tax on employers with payrolls above state-specific thresholds (e.g., NSW: A$1.2 million) — not deducted from employee wages",
              },
            ],
          },
        ],
      },
      {
        id: "filing",
        title: "Lodgment & Deadlines",
        icon: "📅",
        sections: [
          {
            heading: "Key Dates",
            items: [
              {
                label: "Tax year end",
                value: "June 30 each year (financial year)",
              },
              {
                label: "Self-lodgment deadline",
                value: "October 31 — lodge via myTax (free, online, integrated with myGov account)",
              },
              {
                label: "Tax agent deadline",
                value: "May 15 of the following year if you use a registered tax agent and are on the agent's lodgment program",
              },
              {
                label: "Payment due date",
                value: "November 21 for self-lodged returns with a tax debt; same deadline as October 31 lodgment requirement",
              },
            ],
          },
          {
            heading: "myTax and ATO Tools",
            items: [
              {
                label: "myTax",
                value: "ATO free online tax return tool integrated with myGov at my.gov.au — pre-fills employer data, bank interest, health insurance",
              },
              {
                label: "ATO app",
                value: "Official ATO mobile app for tracking lodgments, viewing assessments, and using the tax withheld calculator",
              },
              {
                label: "Pre-fill data",
                value: "ATO receives data from employers, banks, government agencies, and health insurers — most information is pre-filled in myTax by late August",
              },
              {
                label: "Tax Help program",
                value: "ATO-sponsored free tax return help for people earning approximately A$60,000 or less — includes migrants and international students",
              },
            ],
          },
          {
            heading: "PAYG Summary & Employer Reporting",
            items: [
              {
                label: "Income Statement (formerly Payment Summary)",
                value: "Replaces the old Group Certificate — available in myGov from mid-July; shows total income and PAYG withheld",
              },
              {
                label: "Single Touch Payroll (STP)",
                value: "Employers report wages, PAYG, and super contributions directly to ATO each payday — significantly reduces year-end paperwork",
              },
              {
                label: "Private health insurance statement",
                value: "Insurer sends statement showing days of cover and premiums — needed to calculate Medicare Levy Surcharge and Private Health Insurance rebate",
              },
            ],
          },
        ],
      },
      {
        id: "deductions",
        title: "Deductions & Offsets",
        icon: "🧾",
        sections: [
          {
            heading: "Work-Related Deductions",
            items: [
              {
                label: "Work-related expenses general rule",
                value: "Deductible if directly incurred in earning assessable income, not private/domestic, and not already reimbursed by employer",
              },
              {
                label: "Vehicle and travel",
                value: "Cents per kilometre method: A$0.88/km (2024/25) for up to 5,000 km; no log book required",
              },
              {
                label: "Working from home",
                value: "Fixed rate method: 67 cents/hour (from 2022/23) for additional running expenses while working from home",
              },
              {
                label: "Self-education expenses",
                value: "Deductible if the course maintains or improves skills for your current job; not if aimed at getting a new career",
              },
            ],
          },
          {
            heading: "Investment & Other Deductions",
            items: [
              {
                label: "Negative gearing",
                value: "If investment property expenses exceed rental income, the net loss can be offset against other income, reducing overall tax",
              },
              {
                label: "Superannuation salary sacrifice",
                value: "Arrange with employer to contribute additional salary to super as concessional contributions (taxed at 15% inside fund vs your marginal rate)",
              },
              {
                label: "Income protection insurance",
                value: "Premiums for income protection insurance (held outside super) are generally tax-deductible",
              },
              {
                label: "Charitable donations",
                value: "Donations of A$2 or more to Deductible Gift Recipients (DGRs) are tax-deductible",
              },
            ],
          },
          {
            heading: "Franking Credits",
            items: [
              {
                label: "What are franking credits?",
                value: "Australian companies pay 30% corporate tax; they attach franking credits to dividends so shareholders are not double-taxed on the same profit",
              },
              {
                label: "Refundable franking credits",
                value: "If your franking credits exceed your tax liability, the excess is refunded — a significant benefit for low-income investors",
              },
              {
                label: "Non-resident and immigrant treatment",
                value: "Temporary residents and non-residents generally cannot use franking credits — they apply only to Australian residents for tax purposes",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant-Specific Rules",
        icon: "🛂",
        sections: [
          {
            heading: "Tax Residency",
            items: [
              {
                label: "Permanent resident",
                value: "Tax resident from day 1 of PR; taxed on worldwide income including overseas salary, foreign investments, and offshore super/pension",
              },
              {
                label: "Temporary resident concession",
                value: "Most temporary visa holders (e.g., 482 TSS, 457 legacy, 500 student, WHM 417/462) are temporary residents — taxed only on Australian-source income and certain employment income; foreign investment income excluded",
                note: "Temporary resident status is lost once you hold a permanent visa or are considered ordinarily resident.",
              },
              {
                label: "183-day rule (non-residents)",
                value: "If you spend 183+ days in Australia in the income year, you are presumed resident unless you can show your usual place of abode is overseas",
              },
              {
                label: "Departing Australia",
                value: "Inform your super fund and employer of your departure date; lodge a final tax return; apply for DASP for your super",
              },
            ],
          },
          {
            heading: "TFN, DASP & Foreign Assets",
            items: [
              {
                label: "Tax File Number (TFN)",
                value: "Apply online at ato.gov.au before or after arriving; takes up to 28 days; without it employer withholds at top rate (47%)",
              },
              {
                label: "DASP (Departing Australia Superannuation Payment)",
                value: "When leaving Australia permanently, claim your super balance via the ATO DASP online service — tax of 35% (or 45% for tax-free components) withheld",
                note: "WHM visa holders face higher DASP tax (65% on taxable component). Super cannot be paid into foreign accounts — claims must be processed via ATO online service.",
              },
              {
                label: "Foreign income — residents",
                value: "Once a permanent resident, declare all foreign employment income, rental income, capital gains, dividends, and interest in your Australian return",
              },
              {
                label: "Foreign tax credits",
                value: "Complete Item 20 of the tax return; credits available for foreign tax paid on the same foreign income — prevents double taxation",
              },
            ],
          },
          {
            heading: "Double Tax Agreements & Treaties",
            items: [
              {
                label: "DTAs",
                value: "Australia has Double Tax Agreements with 44 countries including US, UK, Germany, Canada, Japan, China, India, and New Zealand",
              },
              {
                label: "Claiming DTA benefits",
                value: "Claim treaty relief in your Australian return by disclosing the foreign income and applying the credit or exemption method as specified in the relevant DTA",
              },
              {
                label: "Controlled Foreign Companies (CFC)",
                value: "If you are an Australian resident and own interests in foreign companies or trusts, CFC attribution rules may tax undistributed profits at your marginal rate — seek specialist advice",
              },
              {
                label: "Foreign Investment Review Board (FIRB)",
                value: "Separate from tax — temporary residents and foreign investors generally require FIRB approval before acquiring residential real estate in Australia",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Australian Taxation Office (ATO)", url: "https://www.ato.gov.au" },
  },
]

// ── Lookup ────────────────────────────────────────────────────────────────────

export function getTaxData(country: CountryCode): TaxData | undefined {
  return TAX_DATA.find((d) => d.country === country)
}
