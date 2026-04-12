/**
 * Healthcare Guide data engine for the Goshen immigration platform.
 *
 * Covers healthcare and insurance systems for US, DE, UK, CA, AU
 * aimed at immigrants. Fully static — no server or API required.
 */

import type { CountryCode } from "@/types"

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface CoverageItem {
  service: string
  covered: "yes" | "partial" | "no" | "varies"
  detail: string
  cost?: string
}

export interface KeyNumber {
  label: string
  value: string
  sub?: string
}

export interface HealthItem {
  label: string
  value: string
  note?: string
}

export interface HealthSection {
  heading: string
  items: HealthItem[]
}

export interface HealthCategory {
  id: string
  title: string
  icon: string
  sections: HealthSection[]
}

export interface HealthData {
  country: CountryCode
  flag: string
  name: string
  systemType: string
  systemOverview: string
  immigrantNote: string
  keyNumbers: KeyNumber[]
  publicCoverage: CoverageItem[]
  categories: HealthCategory[]
  officialAuthority: { name: string; url: string }
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const HEALTH_DATA: HealthData[] = [
  // ── United States ────────────────────────────────────────────────────────────
  {
    country: "US",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    name: "United States",
    systemType: "Employer-based multi-payer system",
    systemOverview:
      "The US has no universal public health system; most working-age residents obtain coverage through employer-sponsored insurance or the ACA Marketplace. Public programs Medicare and Medicaid cover older adults, people with disabilities, and low-income individuals, but gaps remain large, especially for recent immigrants.",
    immigrantNote:
      "Legal permanent residents must wait 5 years before qualifying for most federal public programs. Work-visa holders (H-1B, L-1, etc.) can typically join employer plans immediately. Undocumented immigrants are limited to emergency Medicaid in most states.",
    keyNumbers: [
      {
        label: "Avg family premium (employer plan)",
        value: "$1,389/mo",
        sub: "2024 KFF benchmark; employee pays a portion",
      },
      {
        label: "Avg single deductible",
        value: "$1,763",
        sub: "2024 average for employer-sponsored single plan",
      },
      {
        label: "ACA OOP max (single)",
        value: "$9,450",
        sub: "2024 federal ceiling for in-network costs",
      },
      {
        label: "Medicare Part B premium",
        value: "$174.70/mo",
        sub: "Standard 2024 rate; higher for high earners",
      },
      {
        label: "Medicaid enrollment",
        value: "~94 million",
        sub: "Combined Medicaid/CHIP as of 2024",
      },
      {
        label: "Uninsured rate",
        value: "~7.9%",
        sub: "Approx 26 million people as of 2024",
      },
    ],
    publicCoverage: [
      {
        service: "GP/Primary care",
        covered: "varies",
        detail: "Covered under most private plans, Medicare, and Medicaid; no visit if uninsured without paying out-of-pocket.",
        cost: "$20-50 copay (insured); $150-300 self-pay",
      },
      {
        service: "Hospital inpatient",
        covered: "varies",
        detail: "Medicare Part A covers inpatient after deductible ($1,632 in 2024 per benefit period). Medicaid covers. Private plans cover after deductible.",
        cost: "Deductible + coinsurance; $0 cost-share on Medicaid",
      },
      {
        service: "Emergency care",
        covered: "partial",
        detail: "EMTALA requires emergency stabilization regardless of insurance status; billing still occurs for the uninsured.",
        cost: "Avg $1,082 ER visit before insurance; full bill if uninsured",
      },
      {
        service: "Prescription drugs",
        covered: "partial",
        detail: "Medicare Part D covers prescriptions; Medicaid covers most drugs. ACA plans must cover at least one drug per class.",
        cost: "Generic $10-20; brand $30-100+ copay; deductible may apply",
      },
      {
        service: "Mental health",
        covered: "partial",
        detail: "Mental Health Parity Act requires equal coverage with medical benefits. Access varies widely by plan network.",
        cost: "Copay $20-60/session; therapist shortage in many areas",
      },
      {
        service: "Maternity and newborn care",
        covered: "yes",
        detail: "ACA requires all Marketplace and employer plans to cover maternity as an essential health benefit.",
        cost: "Subject to deductible and OOP max; avg $4,500 vaginal delivery after insurance",
      },
      {
        service: "Preventive services",
        covered: "yes",
        detail: "ACA-compliant plans must cover USPSTF A/B-rated preventive services at no cost (annual wellness, vaccines, cancer screenings).",
        cost: "$0 in-network for covered preventive items",
      },
      {
        service: "Dental",
        covered: "no",
        detail: "Medicare does not cover routine dental. Medicaid dental coverage for adults varies by state. Children: CHIP covers dental.",
        cost: "Separate dental insurance $15-50/mo; crown $1,000-1,700 without insurance",
      },
    ],
    categories: [
      {
        id: "public",
        title: "Public Programs",
        icon: "\uD83C\uDFDB\uFE0F",
        sections: [
          {
            heading: "Medicare",
            items: [
              {
                label: "Eligibility",
                value: "Age 65+, or under 65 with certain disabilities or ESRD",
                note: "Must have 40 quarters of US work credits for premium-free Part A.",
              },
              {
                label: "Part A (Hospital)",
                value: "Premium-free for most; covers inpatient, skilled nursing, hospice",
                note: "Deductible $1,632 per benefit period in 2024.",
              },
              {
                label: "Part B (Medical)",
                value: "$174.70/mo standard premium in 2024; covers outpatient and preventive",
                note: "IRMAA surcharge applies for high earners (income above $103,000 single).",
              },
              {
                label: "Part C/D",
                value: "Medicare Advantage (Part C) bundles A+B+often D via private insurer; Part D covers prescriptions",
                note: "Part D has a $2,000 annual OOP cap on drugs starting 2025 (IRA reform).",
              },
              {
                label: "Immigrant access",
                value: "Must have 10 years of US work history or pay premium; 5-year residency requirement for Medicaid but not Medicare",
              },
            ],
          },
          {
            heading: "Medicaid & CHIP",
            items: [
              {
                label: "Medicaid eligibility",
                value: "Income-based (up to 138% FPL in expansion states); covers low-income adults, families, pregnant women",
                note: "Not all states expanded Medicaid under ACA.",
              },
              {
                label: "CHIP",
                value: "Children and pregnant women up to 200-300% FPL depending on state",
                note: "Children up to age 19 covered in all states.",
              },
              {
                label: "Immigrant waiting period",
                value: "5-year waiting period for most legal immigrants before Medicaid/CHIP eligibility",
                note: "Some states (NY, CA, WA, IL, and others) have eliminated the waiting period using state funds.",
              },
              {
                label: "Emergency Medicaid",
                value: "Available to all income-eligible individuals regardless of immigration status for emergency conditions",
              },
            ],
          },
          {
            heading: "ACA Marketplace",
            items: [
              {
                label: "Who can enroll",
                value: "US citizens, nationals, and most visa holders with work authorization",
                note: "Undocumented immigrants cannot enroll in Marketplace plans.",
              },
              {
                label: "Premium tax credits",
                value: "Available if income is 100-400% FPL (or higher with ARP extension); applied monthly",
              },
              {
                label: "Metal tiers",
                value: "Bronze (lowest premium, highest OOP), Silver, Gold, Platinum (highest premium, lowest OOP)",
                note: "Cost-sharing reductions only available on Silver plans.",
              },
              {
                label: "Open enrollment",
                value: "November 1 - January 15 annually; SEP available for qualifying life events (new job loss of coverage, arrival in US)",
              },
            ],
          },
        ],
      },
      {
        id: "private",
        title: "Private Insurance",
        icon: "\uD83C\uDFE2",
        sections: [
          {
            heading: "Employer-Sponsored Insurance",
            items: [
              {
                label: "Coverage rate",
                value: "~55% of Americans covered through employer plans in 2024",
              },
              {
                label: "Average family premium",
                value: "$23,968/yr total in 2024 (KFF); employee pays avg $6,575/yr",
                note: "Employer pays the remainder as a tax-free benefit.",
              },
              {
                label: "Eligibility for immigrants",
                value: "H-1B, L-1, O-1, TN, and most work-authorized visa holders can join employer plans immediately upon hire",
              },
              {
                label: "COBRA continuation",
                value: "Allows continuation of employer coverage for up to 18 months after job loss; employee pays 102% of full premium",
                note: "Expensive option; useful as bridge while finding new coverage.",
              },
            ],
          },
          {
            heading: "Individual and Short-Term Plans",
            items: [
              {
                label: "Short-term health plans",
                value: "Duration up to 3 months (renewable once); no ACA essential-benefit requirements",
                note: "Do not cover pre-existing conditions; use only as last resort.",
              },
              {
                label: "Catastrophic plans",
                value: "Available to adults under 30 or with hardship exemption; low premium, very high deductible ($9,450 in 2024)",
              },
              {
                label: "Health share ministries",
                value: "Not insurance; members share medical costs voluntarily; no state or federal oversight",
                note: "Coverage can be denied; used by some immigrants outside ACA coverage.",
              },
            ],
          },
          {
            heading: "Key Plan Terms",
            items: [
              {
                label: "Deductible",
                value: "Amount paid out-of-pocket before insurance begins to pay (avg $1,763 single 2024)",
              },
              {
                label: "Copay / Coinsurance",
                value: "Fixed fee per visit (copay) or percentage of costs (coinsurance) after deductible",
              },
              {
                label: "Out-of-pocket maximum",
                value: "Annual cap on your cost-sharing; after this, insurance covers 100% in-network",
                note: "$9,450 single / $18,900 family in 2024 federal ceiling.",
              },
              {
                label: "Network",
                value: "In-network providers have contracted rates; out-of-network costs are much higher or not covered",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant Access",
        icon: "\uD83C\uDF0D",
        sections: [
          {
            heading: "Visa-Type Restrictions",
            items: [
              {
                label: "Green card holders (LPR)",
                value: "Eligible for employer plans and ACA Marketplace immediately; Medicaid/CHIP after 5-year wait (unless state waives)",
              },
              {
                label: "H-1B / L-1 / O-1 / TN",
                value: "Can enroll in employer-sponsored insurance or ACA Marketplace from day one of work authorization",
              },
              {
                label: "F-1 / J-1 students",
                value: "Often required to have school-sponsored health insurance; may enroll in ACA Marketplace if they have work authorization (OPT/CPT)",
                note: "Many universities offer student health plans; compare cost vs. Marketplace.",
              },
              {
                label: "Undocumented immigrants",
                value: "Not eligible for ACA Marketplace or most Medicaid; emergency Medicaid available; some community health centers provide care on sliding-scale fees",
              },
            ],
          },
          {
            heading: "Enrollment Timeline and Gaps",
            items: [
              {
                label: "Arrival in US as qualifying life event",
                value: "Moving to the US triggers a 60-day Special Enrollment Period for ACA Marketplace",
              },
              {
                label: "Employer plan waiting period",
                value: "Employers may impose up to 90-day waiting period before new hires can enroll",
                note: "Use ACA Marketplace or short-term plan during this gap.",
              },
              {
                label: "Travel/visitor insurance",
                value: "Critical for first months; does not satisfy ACA requirements but covers emergencies",
                note: "Look for plans with at least $100,000 medical coverage and medivac.",
              },
              {
                label: "Home country coverage while waiting",
                value: "Most home country plans do not cover treatment in the US; confirm with insurer before travel",
              },
            ],
          },
          {
            heading: "Practical Tips",
            items: [
              {
                label: "Federally Qualified Health Centers (FQHCs)",
                value: "Provide care on sliding-fee scale regardless of insurance or immigration status",
                note: "Find nearest at findahealthcenter.hrsa.gov",
              },
              {
                label: "Prescription assistance",
                value: "GoodRx, Blink Health, and manufacturer patient assistance programs reduce drug costs significantly",
              },
              {
                label: "Charity care",
                value: "Nonprofit hospitals must offer financial assistance programs; ask hospital billing for charity care application",
              },
            ],
          },
        ],
      },
      {
        id: "costs",
        title: "Costs & Cost-Sharing",
        icon: "\uD83D\uDCB0",
        sections: [
          {
            heading: "Typical Cost-Sharing",
            items: [
              {
                label: "Primary care visit",
                value: "$20-50 copay (insured); $150-300 self-pay cash price",
              },
              {
                label: "Specialist visit",
                value: "$40-80 copay (insured); $200-400+ self-pay",
              },
              {
                label: "Emergency room",
                value: "$150-350 copay (insured); avg $1,082 self-pay before insurance",
                note: "Urgent care center is far cheaper for non-emergencies ($100-200).",
              },
              {
                label: "Inpatient hospital stay",
                value: "Subject to deductible; avg $2,000-5,000+ per admission after insurance",
                note: "Without insurance, US hospitals are the most expensive in the world.",
              },
              {
                label: "Mental health therapy",
                value: "$20-60 copay per session (insured); $100-250 self-pay",
              },
            ],
          },
          {
            heading: "Prescription Costs",
            items: [
              {
                label: "Generic drugs",
                value: "$10-20 copay at most pharmacies with insurance",
                note: "GoodRx coupons can make generics cheaper than insurance copay.",
              },
              {
                label: "Brand-name drugs",
                value: "$30-100+ copay; specialty drugs can exceed $500/month",
              },
              {
                label: "IRA drug negotiation",
                value: "Starting 2026, Medicare will negotiate prices for high-cost drugs; some savings will pass to patients",
              },
            ],
          },
          {
            heading: "Long-Term and Specialty Care",
            items: [
              {
                label: "Long-term care",
                value: "Medicare covers only short-term skilled nursing (up to 100 days); private LTC insurance or Medicaid for longer stays",
              },
              {
                label: "Nursing home costs",
                value: "Avg $9,500/mo for private room in 2024; Medicaid covers if assets depleted",
              },
              {
                label: "No overall billing cap",
                value: "Without insurance, there is no legal cap on total medical bills in the US; medical debt is leading cause of personal bankruptcy",
              },
            ],
          },
        ],
      },
      {
        id: "dental",
        title: "Dental & Vision",
        icon: "\uD83E\uDDB7",
        sections: [
          {
            heading: "Dental Coverage",
            items: [
              {
                label: "Medicare dental",
                value: "Traditional Medicare does not cover routine dental; Medicare Advantage plans often include dental",
              },
              {
                label: "Private dental insurance",
                value: "$15-50/mo individual; typically covers 100% preventive, 80% basic, 50% major procedures",
                note: "Annual benefit cap usually $1,000-2,000; implants often excluded.",
              },
              {
                label: "CHIP dental",
                value: "All children in CHIP receive dental coverage including preventive and restorative care",
              },
              {
                label: "Dental school clinics",
                value: "Accredited dental schools provide care at 50-80% discount; supervised by licensed dentists",
              },
              {
                label: "Common costs without insurance",
                value: "Cleaning $75-200, filling $150-300, crown $1,000-1,700, extraction $150-400, root canal $700-1,500",
              },
            ],
          },
          {
            heading: "Vision Coverage",
            items: [
              {
                label: "Standard health plans",
                value: "ACA plans do not require adult vision coverage; children under 18 must have vision as essential benefit",
              },
              {
                label: "Vision insurance",
                value: "$5-20/mo; covers annual exam + allowance for frames/contacts ($130-200 allowance typical)",
              },
              {
                label: "LASIK",
                value: "Generally not covered by insurance; avg $2,200-3,000 per eye; FSA/HSA funds can be used",
              },
            ],
          },
          {
            heading: "Saving on Dental and Vision",
            items: [
              {
                label: "Dental discount plans",
                value: "Not insurance; pay annual fee ($100-200) for 10-60% discounts at participating dentists",
              },
              {
                label: "FSA/HSA funds",
                value: "Flexible Spending Accounts and Health Savings Accounts can pay for dental and vision tax-free",
              },
              {
                label: "Costco and retail optical",
                value: "Retail optical chains and warehouse clubs offer exams + glasses packages for $100-200 without insurance",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "HHS / Healthcare.gov / CMS", url: "https://www.healthcare.gov" },
  },

  // ── Germany ──────────────────────────────────────────────────────────────────
  {
    country: "DE",
    flag: "\uD83C\uDDE9\uD83C\uDDEA",
    name: "Germany",
    systemType: "Bismarck statutory health insurance (GKV/PKV)",
    systemOverview:
      "Germany operates a dual public-private system. Employees below the Versicherungspflichtgrenze are mandatorily enrolled in a statutory Krankenkasse (GKV); those above can opt into private insurance (PKV). Contributions are shared between employer and employee, and dependants are co-insured for free under GKV.",
    immigrantNote:
      "Non-EU workers must enroll in GKV within 1-2 weeks of starting employment. EU citizens may use their EHIC initially. International students must prove GKV-equivalent coverage to enroll at university. The Gesundheitskarte (health card) is issued by your Krankenkasse and is required at every doctor visit.",
    keyNumbers: [
      {
        label: "GKV contribution rate",
        value: "14.6% + avg 1.7% Zusatzbeitrag",
        sub: "Split equally between employer and employee",
      },
      {
        label: "Versicherungspflichtgrenze",
        value: "69,300 EUR/yr",
        sub: "2024 threshold; below = mandatory GKV",
      },
      {
        label: "PKV avg family premium",
        value: "500-800 EUR/mo",
        sub: "Age and health dependent at enrollment",
      },
      {
        label: "Prescription copay",
        value: "5-10 EUR per item",
        sub: "Max 2% of annual gross income per year",
      },
      {
        label: "Hospital copay",
        value: "10 EUR/day",
        sub: "Maximum 280 EUR/yr (28 days)",
      },
      {
        label: "Number of Krankenkassen",
        value: "~95 statutory funds",
        sub: "Free choice among all GKV funds since 1996",
      },
    ],
    publicCoverage: [
      {
        service: "GP/Primary care",
        covered: "yes",
        detail: "Covered fully under GKV; referral (Ueberweisung) needed for specialist in most cases.",
        cost: "No copay since 2013 (Praxisgebuehr abolished)",
      },
      {
        service: "Hospital inpatient",
        covered: "yes",
        detail: "Full coverage in general ward; semi-private/private room requires top-up insurance.",
        cost: "10 EUR/day copay, capped at 280 EUR/yr",
      },
      {
        service: "Emergency care",
        covered: "yes",
        detail: "112 ambulance and A&E fully covered for GKV insured.",
        cost: "No copay for emergency services",
      },
      {
        service: "Prescription drugs",
        covered: "partial",
        detail: "GKV covers approved prescription drugs; some lifestyle drugs excluded.",
        cost: "5-10 EUR per package; annual max 2% of gross income",
      },
      {
        service: "Mental health",
        covered: "yes",
        detail: "Psychotherapy covered after approval process; wait times of 3-6 months common in urban areas.",
        cost: "No copay after approval",
      },
      {
        service: "Maternity",
        covered: "yes",
        detail: "Full prenatal, birth, and postnatal care; midwife (Hebamme) services covered; maternity pay (Mutterschaftsgeld) from GKV.",
        cost: "No cost to patient",
      },
      {
        service: "Dental (basic)",
        covered: "partial",
        detail: "GKV covers 70-80% of standard treatment (Regelversorgung); better restorations require patient top-up; Bonusheft compliance increases reimbursement.",
        cost: "Patient pays difference above Regelversorgung; implants not covered",
      },
      {
        service: "Dependant family members",
        covered: "yes",
        detail: "Non-working spouse and children co-insured under Familienversicherung at no extra premium.",
        cost: "Free for qualifying dependants",
      },
    ],
    categories: [
      {
        id: "public",
        title: "GKV Public System",
        icon: "\uD83C\uDFE5",
        sections: [
          {
            heading: "Enrollment and Eligibility",
            items: [
              {
                label: "Mandatory enrollment",
                value: "All employees earning below 69,300 EUR/yr (2024) are legally required to join a GKV",
              },
              {
                label: "Choosing a Krankenkasse",
                value: "Free choice among ~95 statutory funds; popular with expats: Techniker Krankenkasse (TK), DAK, BARMER",
                note: "TK offers strong English-language support and an excellent app.",
              },
              {
                label: "Enrollment timeline",
                value: "Must enroll within 1-2 weeks of starting work; employer registers you if you provide fund selection in time",
              },
              {
                label: "Familienversicherung",
                value: "Non-working spouse and children under 25 (in education) covered for free under the same policy",
                note: "Spouse must earn under 505 EUR/mo to qualify.",
              },
              {
                label: "Gesundheitskarte",
                value: "Electronic health card (eGK) issued by Krankenkasse; present at every doctor visit; contains insurance data",
              },
            ],
          },
          {
            heading: "What GKV Covers",
            items: [
              {
                label: "Doctor visits",
                value: "GP visits with no copay; specialist requires Ueberweisung (referral) or higher fees may apply",
              },
              {
                label: "Hospital care",
                value: "General ward accommodation, surgery, and treatment covered; 10 EUR/day copay applies",
              },
              {
                label: "Preventive care",
                value: "Regular check-ups (Vorsorgeuntersuchungen), cancer screenings, vaccinations per STIKO recommendations",
              },
              {
                label: "Rehabilitation",
                value: "Medical rehabilitation (Reha) covered after illness or surgery; requires application to Krankenkasse",
              },
            ],
          },
          {
            heading: "Waiting Times and Access",
            items: [
              {
                label: "GP appointment",
                value: "Same day to 1 week typically; Terminservicestelle (TSS) at 116117 can expedite specialist appointments",
              },
              {
                label: "Specialist appointment",
                value: "2-6 weeks typical; urgent cases handled via 116117 national appointment service within 4 weeks",
              },
              {
                label: "Mental health",
                value: "3-6 months wait for psychotherapy common; crisis care available via psychiatric emergency services",
              },
            ],
          },
        ],
      },
      {
        id: "private",
        title: "PKV Private System",
        icon: "\uD83C\uDFE6",
        sections: [
          {
            heading: "Who Can Use PKV",
            items: [
              {
                label: "Employees",
                value: "Employees earning above 69,300 EUR/yr may opt out of GKV and join PKV",
                note: "Decision should be made carefully; switching back to GKV after 55 is very difficult.",
              },
              {
                label: "Civil servants (Beamte)",
                value: "Receive Beihilfe (government co-payment 50-80%); PKV covers the remainder; GKV is not cost-effective for Beamte",
              },
              {
                label: "Self-employed",
                value: "No mandatory GKV for self-employed; choose freely between GKV (voluntary) and PKV",
              },
              {
                label: "Freelancers (Freiberufler)",
                value: "Same as self-employed; PKV premiums can be tax-deductible as operating expenses",
              },
            ],
          },
          {
            heading: "PKV Premiums and Benefits",
            items: [
              {
                label: "Premium basis",
                value: "Premiums based on age, health status at enrollment, and chosen benefit level",
                note: "Enrolling young and healthy keeps premiums low; premiums rise with age.",
              },
              {
                label: "Typical premium range",
                value: "200-400 EUR/mo single (young and healthy) to 800+ EUR/mo (older or family)",
              },
              {
                label: "Benefits vs GKV",
                value: "Private or semi-private hospital room, direct specialist access (no referral), faster appointments, higher-quality prosthetics, broader dental",
              },
            ],
          },
          {
            heading: "Switching and Pitfalls",
            items: [
              {
                label: "Switching back to GKV",
                value: "Very difficult before age 55; must either reduce income below threshold or wait until retirement",
                note: "This is the most common regret for people who chose PKV when young and later have families.",
              },
              {
                label: "Dependants not co-insured",
                value: "Unlike GKV, each family member needs a separate PKV policy; family can become very expensive",
              },
              {
                label: "Premium increases",
                value: "PKV premiums increase with age and healthcare cost inflation; no legal cap on increases",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant Access",
        icon: "\uD83C\uDF0D",
        sections: [
          {
            heading: "Non-EU Workers",
            items: [
              {
                label: "Registration requirement",
                value: "Must enroll in GKV within 1-2 weeks of starting employment; employer assists with registration",
              },
              {
                label: "Before GKV card arrives",
                value: "Krankenkasse issues a confirmation letter valid as insurance proof; doctor visits possible with this letter",
              },
              {
                label: "Visa and health insurance link",
                value: "Proof of health insurance coverage required for visa application and residence permit renewal",
              },
              {
                label: "Recommended Krankenkassen for expats",
                value: "TK (Techniker Krankenkasse) top choice: best English app, online services, international claims. DAK and BARMER also good.",
              },
            ],
          },
          {
            heading: "EU Citizens and Students",
            items: [
              {
                label: "EU citizens arriving",
                value: "EHIC/GHIC from home country valid for temporary stays; must enroll in GKV once becoming a resident employee",
              },
              {
                label: "International students",
                value: "Must have GKV-equivalent coverage to enroll at German university; special student GKV rate approx 112 EUR/mo (under 30)",
                note: "Students over 30 pay higher GKV contributions.",
              },
              {
                label: "Non-EU students, self-paid",
                value: "Travel/international student insurance accepted during first semester; must transition to GKV or recognized private insurer",
              },
            ],
          },
          {
            heading: "Coverage Gaps and Travel",
            items: [
              {
                label: "EHIC for EU travel",
                value: "GKV card covers emergency treatment in all EU/EEA countries under EHIC scheme",
              },
              {
                label: "Home country coverage while waiting",
                value: "Most non-EU home country plans do not cover treatment in Germany; international travel insurance as bridge before GKV active",
              },
              {
                label: "Auslandsreisekrankenversicherung",
                value: "Travel health insurance (Auslandsreisekrankenversicherung) required for travel outside EU; not provided by GKV by default",
                note: "Add-on or separate policy needed for long trips outside Europe.",
              },
            ],
          },
        ],
      },
      {
        id: "costs",
        title: "Costs & Copayments",
        icon: "\uD83D\uDCB0",
        sections: [
          {
            heading: "GKV Cost-Sharing",
            items: [
              {
                label: "Doctor visits",
                value: "No copay since 2013; Praxisgebuehr abolished",
              },
              {
                label: "Hospital copay",
                value: "10 EUR per day, maximum 280 EUR per year (28 days); exempted for children",
              },
              {
                label: "Prescription copay",
                value: "5-10 EUR per package; annual cap at 2% of gross income (1% for chronically ill)",
                note: "Zuzahlungsbefreiung: apply to Krankenkasse for exemption once annual cap reached.",
              },
              {
                label: "Rehabilitation",
                value: "10 EUR per day copay; exempt after 28 days per year",
              },
              {
                label: "Ambulance",
                value: "Covered in medical emergencies; non-emergency transport requires prior approval",
              },
            ],
          },
          {
            heading: "Dental Cost-Sharing",
            items: [
              {
                label: "Basic treatment",
                value: "GKV pays 70-80% of standard care (Regelversorgung); patient pays remainder",
                note: "Bonus booklet (Bonusheft) with 5 years of annual checkups raises GKV share to 80%, 10 years to 85%.",
              },
              {
                label: "Higher-quality fillings",
                value: "If you choose treatment above Regelversorgung (e.g., composite vs amalgam), patient pays full difference",
              },
              {
                label: "Implants",
                value: "Not covered by GKV; private Zahnzusatzversicherung (dental top-up) recommended; implant cost 1,500-3,000 EUR each",
              },
            ],
          },
          {
            heading: "Vision Costs",
            items: [
              {
                label: "Adults",
                value: "GKV does not cover glasses or contacts for adults with standard prescriptions; only high myopia/pathological cases",
              },
              {
                label: "Children",
                value: "GKV covers glasses for children up to age 18 (standard frames, limited allowance)",
              },
              {
                label: "Laser correction",
                value: "Not covered by GKV; private add-on may cover partial cost; avg 1,500-2,500 EUR per eye",
              },
            ],
          },
        ],
      },
      {
        id: "dental",
        title: "Dental & Vision",
        icon: "\uD83E\uDDB7",
        sections: [
          {
            heading: "GKV Dental Coverage",
            items: [
              {
                label: "Regelversorgung",
                value: "GKV pays fixed subsidy for standard dental treatment; patient pays difference for premium options",
              },
              {
                label: "Bonusheft compliance",
                value: "Annual dental check-up recorded in Bonusheft; 5 consecutive years raises GKV share to 80%, 10 years to 85%",
                note: "Start keeping your Bonusheft as soon as you arrive in Germany.",
              },
              {
                label: "Orthodontics (children)",
                value: "GKV covers orthodontics for children under 18 if clinically indicated (KIG grade 3-5); mild cases (KIG 1-2) not covered",
              },
              {
                label: "Orthodontics (adults)",
                value: "Not covered by GKV except in severe jaw deformities requiring combined surgery",
              },
            ],
          },
          {
            heading: "Private Dental Add-Ons (Zahnzusatzversicherung)",
            items: [
              {
                label: "Monthly premium",
                value: "Approx 10-30 EUR/mo depending on benefit level",
              },
              {
                label: "What it covers",
                value: "Implants, better crowns, orthodontics, cosmetic treatments; reduces patient share significantly",
              },
              {
                label: "Waiting period",
                value: "Most policies have 3-8 month waiting period for major treatment; enroll early",
              },
            ],
          },
          {
            heading: "Vision",
            items: [
              {
                label: "GKV coverage",
                value: "Children under 18: glasses covered. Adults with severe visual impairment or pathological conditions: covered.",
              },
              {
                label: "Optical stores",
                value: "Fielmann, Apollo Optik widely available; many offer basic frames and lenses from 50-100 EUR",
              },
              {
                label: "Private vision add-on",
                value: "Sehkraftversicherung add-ons available from some PKV and GKV supplemental plans; covers glasses budget",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Bundesgesundheitsministerium / GKV-Spitzenverband", url: "https://www.bundesgesundheitsministerium.de" },
  },

  // ── United Kingdom ───────────────────────────────────────────────────────────
  {
    country: "UK",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    name: "United Kingdom",
    systemType: "National Health Service (NHS) — single-payer tax-funded",
    systemOverview:
      "The NHS provides comprehensive care free at the point of use for all eligible residents, funded through general taxation and National Insurance contributions. Immigrants who have paid the Immigration Health Surcharge (IHS) upfront with their visa have full NHS access on the same basis as UK residents.",
    immigrantNote:
      "Most visa applicants from outside the EEA must pay the IHS (1,035 GBP/yr for adults in 2024) upfront with their visa application. IHS payers can use the NHS identically to UK residents. EU citizens with settled or pre-settled status retain NHS access. Overseas visitors without IHS or settled status are charged 150% of NHS costs.",
    keyNumbers: [
      {
        label: "IHS (Immigration Health Surcharge)",
        value: "1,035 GBP/yr (adults)",
        sub: "776 GBP/yr for students and children (2024)",
      },
      {
        label: "NHS prescription charge (England)",
        value: "9.90 GBP/item",
        sub: "Free in Scotland, Wales, Northern Ireland",
      },
      {
        label: "NHS dental Band 1",
        value: "26.80 GBP",
        sub: "Check-up, scale and polish (England 2024/25)",
      },
      {
        label: "NHS dental Band 3",
        value: "319.10 GBP",
        sub: "Complex treatment including crowns (England 2024/25)",
      },
      {
        label: "Private GP consultation",
        value: "80-200 GBP",
        sub: "Walk-in or same-day private GP",
      },
      {
        label: "PMI individual premium",
        value: "50-150 GBP/mo",
        sub: "Typical private medical insurance",
      },
    ],
    publicCoverage: [
      {
        service: "GP/Primary care",
        covered: "yes",
        detail: "Free registration with local NHS GP; referral needed for specialist. GP also provides minor illness, mental health referral, and vaccinations.",
        cost: "Free",
      },
      {
        service: "Hospital inpatient",
        covered: "yes",
        detail: "All inpatient treatment, surgery, and nursing care free as NHS patient.",
        cost: "Free",
      },
      {
        service: "Emergency (A&E)",
        covered: "yes",
        detail: "A&E (Accident and Emergency) free for all, regardless of immigration status; NHS constitution right.",
        cost: "Free",
      },
      {
        service: "Prescriptions",
        covered: "partial",
        detail: "Prescribed medicines dispensed at NHS pharmacies. Charge applies in England; free in other nations.",
        cost: "9.90 GBP/item England; free Scotland/Wales/NI; Prepayment Certificate 31.25 GBP/3mo saves money",
      },
      {
        service: "Mental health",
        covered: "yes",
        detail: "NHS Talking Therapies (formerly IAPT), community mental health teams, crisis services all available via GP referral or self-referral.",
        cost: "Free",
      },
      {
        service: "Maternity",
        covered: "yes",
        detail: "Full antenatal, birth, and postnatal care; midwife-led unit or consultant-led hospital birth all free.",
        cost: "Free",
      },
      {
        service: "Dental (NHS)",
        covered: "partial",
        detail: "Three charge bands: Band 1 (exam/clean 26.80 GBP), Band 2 (fillings/extractions 73.50 GBP), Band 3 (crowns/dentures 319.10 GBP). Free for under 18, pregnant, recent mothers.",
        cost: "26.80-319.10 GBP per course of treatment (England 2024/25)",
      },
      {
        service: "Optometry (sight tests)",
        covered: "partial",
        detail: "Free NHS sight tests for under 16, over 60, those on qualifying benefits, diabetics, and those at risk of glaucoma.",
        cost: "Approx 25 GBP for adults not meeting free criteria; glasses/contacts not covered",
      },
    ],
    categories: [
      {
        id: "public",
        title: "NHS Public System",
        icon: "\uD83C\uDFE5",
        sections: [
          {
            heading: "Registration and Access",
            items: [
              {
                label: "Registering with a GP",
                value: "Find and register with a local NHS GP practice; you do not need proof of address or immigration status to register",
                note: "If refused registration, contact NHS England on 0300 311 22 33.",
              },
              {
                label: "Dentist registration",
                value: "Register with an NHS dentist separately; many practices have closed NHS lists — phone ahead or use NHS.uk finder",
              },
              {
                label: "Urgent care",
                value: "NHS 111 (phone or online) for urgent non-emergency advice; Minor Injury Units for minor wounds and sprains",
              },
              {
                label: "Hospital referral",
                value: "GP refers to hospital consultant; NHS Constitution target: 18 weeks from referral to treatment",
              },
            ],
          },
          {
            heading: "Key Services",
            items: [
              {
                label: "111 service",
                value: "24/7 non-emergency medical helpline; triages and directs to appropriate care including same-day GP or A&E",
              },
              {
                label: "IAPT / NHS Talking Therapies",
                value: "Self-refer for anxiety, depression, PTSD; typically 6-12 week wait for one-to-one therapy",
              },
              {
                label: "Health visitor and midwife",
                value: "Assigned to pregnant women and new mothers; home visits and community clinics free",
              },
            ],
          },
          {
            heading: "Waiting Times",
            items: [
              {
                label: "GP appointment",
                value: "Same day (urgent) to 2 weeks; 4-week target for routine appointment",
                note: "Variation by practice; telephone and online consultations more available since 2020.",
              },
              {
                label: "Specialist",
                value: "18-week NHS standard; some specialties (orthopaedics, ophthalmology) have longer waits",
              },
              {
                label: "Elective surgery",
                value: "Can be longer than 18 weeks; private referral an option to bypass waits for those with PMI",
              },
            ],
          },
        ],
      },
      {
        id: "private",
        title: "Private Health Insurance",
        icon: "\uD83C\uDFE6",
        sections: [
          {
            heading: "Private Medical Insurance (PMI)",
            items: [
              {
                label: "Main providers",
                value: "Bupa, AXA Health, Vitality Health, Aviva, WPA",
              },
              {
                label: "Typical premium",
                value: "50-150 GBP/mo individual; 150-400 GBP/mo family",
                note: "Employer-provided PMI is a very common UK employment benefit.",
              },
              {
                label: "What PMI covers",
                value: "Faster specialist access, private hospital accommodation, outpatient diagnostics; usually excludes chronic and pre-existing conditions",
              },
              {
                label: "What PMI does NOT cover",
                value: "Usually excludes long-term chronic conditions, maternity, A&E, general dental/optical; NHS still needed for these",
              },
            ],
          },
          {
            heading: "Private Hospitals and Clinics",
            items: [
              {
                label: "Major private hospital groups",
                value: "Nuffield Health, Spire, HCA, BMI Healthcare; located across major UK cities",
              },
              {
                label: "Private GP consultation",
                value: "80-200 GBP same-day; results faster than NHS GP; prescriptions additional",
              },
              {
                label: "Private specialist",
                value: "150-300 GBP first consultation; additional for tests; can be same week vs months on NHS",
              },
            ],
          },
          {
            heading: "Costs Without PMI",
            items: [
              {
                label: "Private hospital stay",
                value: "500-1,500 GBP per night; major surgery 5,000-20,000 GBP",
              },
              {
                label: "Private MRI",
                value: "300-800 GBP; private CT scan 300-900 GBP",
              },
              {
                label: "Value of NHS",
                value: "The NHS eliminates most of these costs for eligible residents; PMI is a comfort supplement, not a necessity for most",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant Access",
        icon: "\uD83C\uDF0D",
        sections: [
          {
            heading: "Immigration Health Surcharge (IHS)",
            items: [
              {
                label: "Who pays IHS",
                value: "Most non-EEA nationals applying for visas of more than 6 months; paid upfront for full visa duration",
                note: "IHS paid with Skilled Worker visa, Student visa, Family visa applications etc.",
              },
              {
                label: "IHS rates (2024)",
                value: "1,035 GBP/yr adults; 776 GBP/yr children, students, and youth mobility applicants",
              },
              {
                label: "IHS access",
                value: "IHS payers access NHS on same basis as UK residents: same services, same charges, no additional fees",
              },
              {
                label: "Exempt categories",
                value: "NHS and social care workers and their dependants are currently IHS exempt (check gov.uk as policy can change)",
              },
            ],
          },
          {
            heading: "EU/EEA and Other Categories",
            items: [
              {
                label: "EU settled status",
                value: "EU nationals with Settled Status or Pre-Settled Status have full NHS access without paying IHS",
              },
              {
                label: "Short-stay visitors",
                value: "Visitors (under 6 months) not eligible for free NHS; emergency treatment provided and billed at 150% of NHS cost",
              },
              {
                label: "Reciprocal agreements",
                value: "UK has agreements with several countries (Australia, New Zealand, etc.) for emergency/urgent NHS treatment reciprocally",
              },
            ],
          },
          {
            heading: "Practical Tips for New Arrivals",
            items: [
              {
                label: "Register with GP first",
                value: "Do this within first week of arrival; needed for referrals, prescriptions, and maternity care",
              },
              {
                label: "Prescription Prepayment Certificate (PPC)",
                value: "If you need more than 3 prescriptions in 3 months (England), buy PPC for 31.25 GBP/3mo or 111.60 GBP/yr",
              },
              {
                label: "Travel insurance gap",
                value: "IHS does not cover you in other countries; buy travel insurance for any trips outside the UK",
              },
            ],
          },
        ],
      },
      {
        id: "costs",
        title: "Costs & Charges",
        icon: "\uD83D\uDCB0",
        sections: [
          {
            heading: "NHS Charges",
            items: [
              {
                label: "Most NHS services",
                value: "Free at point of use for eligible patients including IHS payers",
              },
              {
                label: "Prescriptions (England)",
                value: "9.90 GBP per item; PPC saves money for multiple medications; free for exempt groups",
              },
              {
                label: "NHS dental",
                value: "Band 1: 26.80 GBP, Band 2: 73.50 GBP, Band 3: 319.10 GBP per course of treatment",
                note: "Courses of treatment cover all related work, not per visit.",
              },
              {
                label: "NHS sight test",
                value: "Free for qualifying groups; approx 25 GBP for non-exempt adults",
              },
            ],
          },
          {
            heading: "Private Care Costs",
            items: [
              {
                label: "Private GP",
                value: "80-200 GBP per consultation; some Babylon/GP at Hand style services cheaper",
              },
              {
                label: "Private specialist",
                value: "150-300 GBP initial consultation; 100-200 GBP follow-up",
              },
              {
                label: "Private hospital",
                value: "500-1,500 GBP per night; day-case procedures 1,000-5,000 GBP",
              },
            ],
          },
          {
            heading: "Long-Term and Social Care",
            items: [
              {
                label: "NHS continuing healthcare",
                value: "Free if assessed as having primary health need; social care charged means-tested above 23,250 GBP assets (England)",
              },
              {
                label: "Care home costs",
                value: "Avg 1,100-1,300 GBP/wk for residential care in England; state funding only after assets depleted",
              },
              {
                label: "Social care reform",
                value: "Care cost cap of 86,000 GBP (England, delayed to 2025 at earliest); landscape may change",
              },
            ],
          },
        ],
      },
      {
        id: "dental",
        title: "Dental & Vision",
        icon: "\uD83E\uDDB7",
        sections: [
          {
            heading: "NHS Dental",
            items: [
              {
                label: "NHS dental charges (England 2024/25)",
                value: "Band 1 (exam + clean) 26.80 GBP; Band 2 (fillings, extractions) 73.50 GBP; Band 3 (crowns, dentures, bridges) 319.10 GBP",
              },
              {
                label: "NHS dental access",
                value: "Severe shortage of NHS dentist availability; many practices not accepting new NHS patients",
                note: "Check NHS.uk dentist finder or call practices directly; waiting lists of 6-18 months common.",
              },
              {
                label: "Free NHS dental",
                value: "Free for under 18, pregnant women, mothers within 12 months of birth, and patients on certain benefits",
              },
              {
                label: "Dental tourism",
                value: "Many UK residents travel to Hungary, Poland, and Spain for dental treatment at significant savings",
              },
            ],
          },
          {
            heading: "Private Dentist",
            items: [
              {
                label: "Check-up costs",
                value: "50-150 GBP private check-up; 100-200 GBP scale and polish",
              },
              {
                label: "Restorative costs",
                value: "Private filling 80-250 GBP; crown 600-1,200 GBP; implant 2,500-4,000 GBP",
              },
              {
                label: "Dental insurance",
                value: "10-30 GBP/mo; covers check-ups, some treatment; Denplan and Cigna main providers",
              },
            ],
          },
          {
            heading: "Vision",
            items: [
              {
                label: "NHS sight test",
                value: "Free for qualifying groups; glasses/contacts not provided free by NHS for adults",
              },
              {
                label: "Opticians",
                value: "Specsavers, Vision Express, Boots Opticians offer budget packages; glasses from 25 GBP; full package 100-200 GBP",
              },
              {
                label: "Laser eye surgery",
                value: "Not NHS covered; private LASIK from 1,000-2,500 GBP per eye",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "NHS England / gov.uk IHS", url: "https://www.england.nhs.uk" },
  },

  // ── Canada ───────────────────────────────────────────────────────────────────
  {
    country: "CA",
    flag: "\uD83C\uDDE8\uD83C\uDDE6",
    name: "Canada",
    systemType: "Provincial universal healthcare (Medicare)",
    systemOverview:
      "Canada operates a publicly funded universal health system administered by each province and territory. Core medical and hospital services are free at point of use; however, prescription drugs, dental, vision, and paramedical services are largely not publicly covered and require private employer or individual insurance.",
    immigrantNote:
      "Permanent residents and most work-permit holders qualify for provincial health insurance after a waiting period of up to 3 months (varies by province). The 3-month gap is a critical coverage risk — travel or visitor insurance is essential. International students generally need private student health insurance.",
    keyNumbers: [
      {
        label: "Waiting period",
        value: "Up to 3 months",
        sub: "Varies by province; AB/SK/MB/QC have waiting periods; ON/NS/NB shorter or none",
      },
      {
        label: "Avg employer plan (family)",
        value: "C$200-400/mo",
        sub: "Dental, vision, prescription, paramedical",
      },
      {
        label: "Prescription OOP (no coverage)",
        value: "Avg C$1,000/yr",
        sub: "Out-of-pocket without employer plan",
      },
      {
        label: "Ambulance cost",
        value: "C$200-500/ride",
        sub: "In provinces where not publicly funded",
      },
      {
        label: "CDCP income threshold",
        value: "Under C$90,000 family income",
        sub: "Canadian Dental Care Plan (2024) eligibility",
      },
      {
        label: "IFHP",
        value: "Gov-assisted refugees",
        sub: "Interim Federal Health Program for eligible refugees",
      },
    ],
    publicCoverage: [
      {
        service: "GP/Primary care",
        covered: "yes",
        detail: "Covered under provincial Medicare; free to see a family doctor or walk-in clinic.",
        cost: "Free with valid provincial health card",
      },
      {
        service: "Hospital inpatient",
        covered: "yes",
        detail: "All medically necessary hospital services, surgery, and nursing care free.",
        cost: "Free",
      },
      {
        service: "Emergency care",
        covered: "yes",
        detail: "Emergency department care covered by provincial health insurance for eligible residents.",
        cost: "Free for insured; visitors may be billed",
      },
      {
        service: "Specialist care",
        covered: "yes",
        detail: "Covered by provincial Medicare with referral from family physician.",
        cost: "Free with referral",
      },
      {
        service: "Prescription drugs",
        covered: "partial",
        detail: "Not covered under core Medicare except in Quebec (mandatory drug insurance) and BC (new PharmaCare). Special programs for low-income in some provinces.",
        cost: "C$20-100+ per prescription without coverage; employer plan or provincial programs may cover",
      },
      {
        service: "Mental health",
        covered: "partial",
        detail: "Psychiatrist visits covered; psychology/counselling partially covered in some provinces; major gaps exist.",
        cost: "Psychologist C$150-250/session without coverage; psychiatrist free with referral",
      },
      {
        service: "Dental",
        covered: "no",
        detail: "Not covered by provincial Medicare; Canadian Dental Care Plan (2024) partially covers uninsured low-income Canadians.",
        cost: "Private; check-up C$200-400; dental plan or CDCP if eligible",
      },
      {
        service: "Vision",
        covered: "partial",
        detail: "Eye exams covered for children under 18 and seniors 65+ in most provinces; adults pay out of pocket.",
        cost: "Exam C$100-150 for adults; glasses/contacts private",
      },
    ],
    categories: [
      {
        id: "public",
        title: "Provincial Health System",
        icon: "\uD83C\uDFE5",
        sections: [
          {
            heading: "How Provincial Medicare Works",
            items: [
              {
                label: "Administration",
                value: "Each province/territory runs its own plan: OHIP (Ontario), MSP (BC), AHCIP (Alberta), RAMQ (Quebec), etc.",
              },
              {
                label: "What is covered",
                value: "Medically necessary doctor visits, hospital care, surgery, diagnostic tests (X-ray, MRI, ultrasound)",
                note: "The Canada Health Act requires all provinces to cover these core services.",
              },
              {
                label: "What is NOT covered",
                value: "Prescription drugs (except Quebec/BC programs), dental, vision, physiotherapy, ambulance (in some provinces), private hospital rooms",
              },
              {
                label: "Health card",
                value: "Apply for provincial health card upon enrollment; present at every medical appointment; processing takes 2-4 weeks",
              },
              {
                label: "Family doctor shortage",
                value: "Over 6 million Canadians have no regular family doctor in 2024; walk-in clinics are the main alternative",
              },
            ],
          },
          {
            heading: "Enrollment by Province",
            items: [
              {
                label: "Ontario (OHIP)",
                value: "3-month waiting period for new arrivals; apply at ServiceOntario within first week",
                note: "Some temporary workers exempt from wait if employed full-time.",
              },
              {
                label: "British Columbia (HIBC/MSP)",
                value: "No waiting period since 2020 for most residents; apply online at gov.bc.ca",
              },
              {
                label: "Alberta (AHCIP)",
                value: "3-month waiting period; apply as soon as arrive",
              },
              {
                label: "Quebec (RAMQ)",
                value: "3-month wait for PRs; no wait for certain work permit holders; mandatory drug insurance program unique to Quebec",
              },
            ],
          },
          {
            heading: "Services and Access",
            items: [
              {
                label: "Walk-in clinics",
                value: "No appointment needed; covered by provincial health card; typical wait 30-90 minutes",
              },
              {
                label: "Telehealth",
                value: "Virtual care widely available; Maple, Telus Health, and provincial apps; usually covered",
              },
              {
                label: "Specialist referral",
                value: "GP refers to specialist; typical wait 2-6 months for non-urgent; urgent referrals expedited",
              },
            ],
          },
        ],
      },
      {
        id: "private",
        title: "Private Insurance",
        icon: "\uD83C\uDFE6",
        sections: [
          {
            heading: "Employer Group Benefits",
            items: [
              {
                label: "Coverage",
                value: "Most full-time employees receive group benefits: dental, vision, prescription drugs, paramedical (physiotherapy, chiropractic, massage)",
              },
              {
                label: "Typical employer plan cost",
                value: "C$200-400/mo family total; employee usually pays 20-50% of premium via payroll deduction",
              },
              {
                label: "Provincial drug plans",
                value: "Ontario Drug Benefit (ODB) for low-income; BC PharmaCare; Alberta Seniors Drug Benefit; Quebec mandatory RAMQ drug plan",
              },
            ],
          },
          {
            heading: "Individual Plans",
            items: [
              {
                label: "Main providers",
                value: "Sun Life, Manulife, Great-West Life (Canada Life), Blue Cross, Green Shield",
              },
              {
                label: "Individual health and dental",
                value: "C$80-200/mo single for basic dental + drug coverage; higher for comprehensive",
              },
              {
                label: "Self-employed options",
                value: "Health Spending Account (HSA) allows tax-deductible health expenses; personal health insurance for self-employed",
              },
            ],
          },
          {
            heading: "New Programs (2024)",
            items: [
              {
                label: "Canadian Dental Care Plan (CDCP)",
                value: "Launched 2024; covers uninsured Canadians with family income under C$90,000; free for incomes under C$70,000; co-pays above",
                note: "Covers seniors first, then children, then adults; phased rollout through 2025.",
              },
              {
                label: "BC PharmaCare universal",
                value: "BC expanding PharmaCare toward universal drug coverage; income-based deductible model",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant Access",
        icon: "\uD83C\uDF0D",
        sections: [
          {
            heading: "Permanent Residents and Refugees",
            items: [
              {
                label: "PR waiting period",
                value: "Up to 3 months in most provinces (AB, SK, ON, PEI); BC, MB, NS have shorter or no waits",
                note: "Apply for health card the day you arrive even if waiting period applies.",
              },
              {
                label: "Government-Assisted Refugees (GARs)",
                value: "Covered by Interim Federal Health Program (IFHP) immediately; transitions to provincial health after 3-month wait waived in some cases",
              },
              {
                label: "Privately Sponsored Refugees",
                value: "IFHP coverage for first year or until provincial health obtained; sponsor provides coverage top-up",
              },
            ],
          },
          {
            heading: "Temporary Residents",
            items: [
              {
                label: "Work permit holders",
                value: "Most open and employer-specific work permit holders eligible for provincial health in most provinces",
                note: "Confirm eligibility with specific province; IEC working holiday makers eligible in most provinces.",
              },
              {
                label: "International students",
                value: "Usually not eligible for provincial health; university/college health plan (UHIP in Ontario etc.) mandatory",
                note: "Cost approx C$600-900/yr; provides basic medical coverage.",
              },
              {
                label: "Visitor visa holders",
                value: "Not eligible for provincial health; must have travel or visitor health insurance",
              },
            ],
          },
          {
            heading: "The 3-Month Gap",
            items: [
              {
                label: "Critical coverage gap",
                value: "The 3-month waiting period in some provinces leaves new PRs without coverage; travel insurance is essential",
              },
              {
                label: "Visitor/travel insurance",
                value: "Purchase before leaving home country; look for C$100,000+ medical coverage; Blue Cross, Manulife, Allianz offer visitor to Canada plans",
              },
              {
                label: "Home country coverage abroad",
                value: "Most home country health plans do not cover treatment in Canada; confirm before relying on it",
              },
            ],
          },
        ],
      },
      {
        id: "costs",
        title: "Costs & Gaps",
        icon: "\uD83D\uDCB0",
        sections: [
          {
            heading: "What Medicare Does Not Cover",
            items: [
              {
                label: "Prescription drugs",
                value: "Average Canadian spends C$1,000/yr out-of-pocket on drugs without employer coverage",
              },
              {
                label: "Ambulance",
                value: "C$200-500 per call in Ontario, Alberta, and other provinces; fully covered in Quebec and some others",
              },
              {
                label: "Physiotherapy",
                value: "C$80-150/session without coverage; some employer plans cover 20-30 sessions/yr",
              },
              {
                label: "Paramedical services",
                value: "Chiropractic, massage therapy, acupuncture not covered by Medicare; employer plans often include",
              },
              {
                label: "Private hospital room",
                value: "Semi-private C$100-250/night; private C$200-400/night above standard ward",
              },
            ],
          },
          {
            heading: "Drug Costs",
            items: [
              {
                label: "Without drug plan",
                value: "Generic drugs C$20-50/prescription; brand-name C$50-200+; biologics C$1,000+/mo",
              },
              {
                label: "With employer plan",
                value: "Most plans cover 80-100% of listed drugs after deductible; formulary varies by insurer",
              },
              {
                label: "Provincial drug assistance",
                value: "ODB (Ontario), Pharmacare (BC), Seniors/low-income programs; apply through provincial health ministry",
              },
            ],
          },
          {
            heading: "Long-Term Care",
            items: [
              {
                label: "Long-term care homes",
                value: "Government-subsidized LTC available; income-tested co-payment; wait lists of months to years in most provinces",
              },
              {
                label: "Private retirement homes",
                value: "C$3,000-8,000+/mo; not covered by Medicare; private LTC insurance available",
              },
              {
                label: "Home care",
                value: "Provincial home care programs exist; wait times significant; private home care C$25-40/hr",
              },
            ],
          },
        ],
      },
      {
        id: "dental",
        title: "Dental & Vision",
        icon: "\uD83E\uDDB7",
        sections: [
          {
            heading: "Dental Coverage",
            items: [
              {
                label: "No universal dental",
                value: "Dental is not part of Canadian Medicare; most Canadians rely on employer group benefits",
              },
              {
                label: "Canadian Dental Care Plan (CDCP)",
                value: "2024 federal program for uninsured Canadians with family income under C$90,000; covers preventive and basic restorative",
                note: "Check eligibility at canada.ca/dental; apply via Service Canada.",
              },
              {
                label: "Employer dental",
                value: "Typical employer plan covers 80-100% preventive, 70-80% basic (fillings), 50% major (crowns, bridges)",
              },
              {
                label: "Dental schools",
                value: "University dental clinics offer treatment at 40-70% discount; supervised by licensed dentists; longer appointments",
              },
              {
                label: "Typical costs without coverage",
                value: "Check-up + clean C$200-400; filling C$150-350; crown C$1,200-2,000; braces C$5,000-8,000",
              },
            ],
          },
          {
            heading: "Vision Coverage",
            items: [
              {
                label: "Eye exams",
                value: "Children under 18 and seniors 65+ covered in most provinces; adults pay C$80-150",
              },
              {
                label: "Glasses and contacts",
                value: "Not covered by Medicare; employer plans usually include C$200-400 vision allowance/2 years",
              },
              {
                label: "Individual vision plans",
                value: "C$10-20/mo; limited allowance for glasses; useful if no employer coverage",
              },
            ],
          },
          {
            heading: "Orthodontics",
            items: [
              {
                label: "Children orthodontics",
                value: "C$4,000-8,000 for full braces/Invisalign; employer plans may cover 50% to a lifetime max of C$1,500-3,000",
              },
              {
                label: "Adult orthodontics",
                value: "Generally not covered by employer plans; self-pay C$5,000-8,000",
              },
              {
                label: "Quebec RAMQ",
                value: "Children up to age 10 eligible for free orthodontic assessment under RAMQ",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Health Canada / provincial health ministries", url: "https://www.canada.ca/en/health-canada.html" },
  },

  // ── Australia ────────────────────────────────────────────────────────────────
  {
    country: "AU",
    flag: "\uD83C\uDDE6\uD83C\uDDFA",
    name: "Australia",
    systemType: "Medicare universal + private health insurance (PHI)",
    systemOverview:
      "Australia operates Medicare, a universal public health system funded by a 2% Medicare Levy, providing free GP bulk-billing, subsidised specialist care, and free public hospital treatment. Private health insurance complements Medicare, offering faster specialist access, private hospital accommodation, and extras such as dental, optical, and physiotherapy.",
    immigrantNote:
      "Permanent residents are eligible for Medicare from day one. Most temporary visa holders (including 482 TSS workers) are NOT eligible for Medicare unless from a reciprocal agreement country. International students must hold mandatory OSHC (Overseas Student Health Cover). Working holiday makers should have OHSC or travel insurance as Medicare is not available to them.",
    keyNumbers: [
      {
        label: "Medicare Levy",
        value: "2% of taxable income",
        sub: "Paid by most taxpayers to fund Medicare",
      },
      {
        label: "MLS (no PHI)",
        value: "1-1.5% levy surcharge",
        sub: "If income >A$93,000 and no private hospital cover",
      },
      {
        label: "LHC loading",
        value: "2%/yr over age 31",
        sub: "Lifetime Health Cover loading if no PHI before 31; max 70%",
      },
      {
        label: "PHI Rebate",
        value: "24-32% government subsidy",
        sub: "On PHI premiums; reduces with income tier",
      },
      {
        label: "Child Dental Benefits",
        value: "A$1,052 over 2 years",
        sub: "Medicare CDBS for children under 18",
      },
      {
        label: "Avg hospital PHI (single)",
        value: "A$150-200/mo",
        sub: "Bronze-Silver tier hospital cover",
      },
    ],
    publicCoverage: [
      {
        service: "GP/Primary care",
        covered: "yes",
        detail: "Free if GP bulk-bills (no gap payment). Non-bulk-billing GP charges above Medicare schedule fee — patient pays gap.",
        cost: "Free (bulk-billed) or A$30-60 gap out-of-pocket",
      },
      {
        service: "Specialist",
        covered: "partial",
        detail: "Medicare rebates 75% of MBS schedule fee for out-of-hospital specialists; 85% in hospital. Specialists often charge above schedule, creating a gap.",
        cost: "Gap typically A$100-300; can be zero with gap-cover arrangement",
      },
      {
        service: "Public hospital",
        covered: "yes",
        detail: "Free as a public patient; may not choose surgeon or have private room; waiting lists for elective procedures.",
        cost: "Free as public patient",
      },
      {
        service: "Emergency",
        covered: "yes",
        detail: "Emergency department care free for Medicare-eligible patients at public hospitals.",
        cost: "Free",
      },
      {
        service: "Prescription drugs (PBS)",
        covered: "partial",
        detail: "Pharmaceutical Benefits Scheme subsidises most essential medicines; patient pays co-payment up to safety net threshold.",
        cost: "Concession: A$7.70/script; general: A$31.60/script (2024); above PBS price: patient pays difference",
      },
      {
        service: "Mental health",
        covered: "partial",
        detail: "Mental Health Care Plan (MHCP) from GP provides up to 10 subsidised psychology sessions/yr under MBS Item 2715; psychiatrist free via Medicare referral.",
        cost: "Gap payment A$0-100/session depending on psychologist; Medicare rebate A$137.05/session (2024)",
      },
      {
        service: "Allied health (EPC)",
        covered: "partial",
        detail: "Enhanced Primary Care (EPC) plan from GP provides up to 5 allied health sessions/yr (physiotherapy, podiatry, speech therapy, etc.).",
        cost: "Medicare rebate A$58.30/session; provider may charge gap",
      },
      {
        service: "Dental",
        covered: "partial",
        detail: "Child Dental Benefits Schedule (CDBS) for children under 18: A$1,052 benefit over 2 years. No Medicare dental for adults.",
        cost: "Adults: private or extras cover; children: CDBS up to limit then private",
      },
    ],
    categories: [
      {
        id: "public",
        title: "Medicare Public System",
        icon: "\uD83C\uDFE5",
        sections: [
          {
            heading: "Enrolling in Medicare",
            items: [
              {
                label: "Eligibility",
                value: "Australian citizens, permanent residents, New Zealand citizens (subclass 444), and residents of reciprocal agreement countries",
              },
              {
                label: "How to enroll",
                value: "Register at a Services Australia (Centrelink) office or online via myGov; bring passport and visa evidence",
                note: "Medicare card typically issued within 2-3 weeks; interim certificate available immediately.",
              },
              {
                label: "myGov account",
                value: "Link Medicare to myGov online account for digital Medicare card, claims history, and managing health records (My Health Record)",
              },
              {
                label: "Reciprocal countries",
                value: "UK, New Zealand, Netherlands, Sweden, Finland, Italy, Belgium, Norway, Slovenia, Malta, Ireland — temporary residents from these countries access Medicare for medically necessary treatment",
              },
            ],
          },
          {
            heading: "Bulk-Billing and GP Access",
            items: [
              {
                label: "Bulk-billing",
                value: "GP bulk-bills: accepts Medicare rebate as full payment; patient pays nothing. National bulk-billing rate ~80% of GP visits.",
                note: "Bulk-billing rates vary by location; lower in rural and regional areas.",
              },
              {
                label: "Non-bulk-billing",
                value: "GP charges above MBS fee; you pay upfront then claim Medicare rebate; difference (gap) is out-of-pocket",
              },
              {
                label: "After-hours GP",
                value: "National Home Doctor Service (13SICK) provides after-hours home visits, bulk-billed",
              },
              {
                label: "Telehealth",
                value: "Medicare telehealth consultations widely available since 2020; many GPs bulk-bill telehealth",
              },
            ],
          },
          {
            heading: "PBS and Safety Nets",
            items: [
              {
                label: "Pharmaceutical Benefits Scheme",
                value: "Government subsidises cost of most essential prescription medicines; patient pays set co-payment",
              },
              {
                label: "PBS Safety Net",
                value: "Once family PBS spending exceeds threshold (A$1,636.80 general; A$348 concession in 2024), further scripts free or at concession rate",
              },
              {
                label: "Medicare Safety Net",
                value: "After OOP medical costs exceed threshold (A$531.70 basic; A$770.30 extended in 2024), Medicare pays 80% of further gaps",
              },
            ],
          },
        ],
      },
      {
        id: "private",
        title: "Private Health Insurance",
        icon: "\uD83C\uDFE6",
        sections: [
          {
            heading: "Hospital Cover",
            items: [
              {
                label: "Tiers (2019 reform)",
                value: "Basic, Bronze, Silver, Gold — standardised minimum benefit sets; Gold covers all clinical categories",
              },
              {
                label: "Typical premium (single)",
                value: "Basic A$80-120/mo; Bronze A$100-150/mo; Silver A$150-200/mo; Gold A$200-300/mo",
              },
              {
                label: "Excess/co-payment",
                value: "Chosen excess per admission (A$0, A$250, A$500, A$750); higher excess = lower premium",
              },
              {
                label: "Major funds",
                value: "Medibank Private, Bupa, HCF, NIB, HBF (WA), CBHS, Teachers Health",
                note: "For-profit (Medibank, Bupa, NIB) vs not-for-profit (HCF, HBF, CBHS); not-for-profits often better value.",
              },
            ],
          },
          {
            heading: "Extras Cover",
            items: [
              {
                label: "What extras covers",
                value: "Dental, optical, physiotherapy, chiropractic, remedial massage, psychology, ambulance (in some states)",
              },
              {
                label: "Typical extras premium",
                value: "A$30-80/mo; annual limits per service (e.g., A$300-800 dental, A$200-400 optical)",
              },
              {
                label: "Annual limits and waiting periods",
                value: "Most extras have annual benefit limits and waiting periods of 2-6 months; orthodontics usually 12-month wait",
              },
            ],
          },
          {
            heading: "Incentives and Penalties",
            items: [
              {
                label: "PHI Rebate",
                value: "Government rebate of 24.608-32.812% on premiums depending on age tier (Tier 1 income cuts in above A$93,000)",
                note: "Applied as premium reduction at source; not a cash rebate.",
              },
              {
                label: "Lifetime Health Cover (LHC)",
                value: "If you do not take out hospital cover before July 1 after turning 31, a 2% loading per year applies; max 70% loading",
                note: "New permanent residents have 12 months from grant to take out PHI without LHC loading.",
              },
              {
                label: "Medicare Levy Surcharge (MLS)",
                value: "1-1.5% surcharge if taxable income exceeds A$93,000 single and you do not hold private hospital cover",
              },
            ],
          },
        ],
      },
      {
        id: "immigrant",
        title: "Immigrant Access",
        icon: "\uD83C\uDF0D",
        sections: [
          {
            heading: "Permanent Residents",
            items: [
              {
                label: "Medicare eligibility",
                value: "Permanent residents eligible for Medicare from day one; enroll at Services Australia within first weeks of arrival",
              },
              {
                label: "LHC timing",
                value: "New PRs have 12 months from date of PR grant to take out hospital cover without incurring LHC loading",
                note: "Highly recommended to take PHI in this window, especially if over 30.",
              },
              {
                label: "457/482 TSS visa holders",
                value: "Generally not eligible for Medicare; employer may provide private health insurance as part of package; check visa conditions",
              },
            ],
          },
          {
            heading: "Temporary Visa Holders",
            items: [
              {
                label: "Not Medicare eligible (general)",
                value: "Most temporary visa holders (student visa, working holiday, bridging visa, 482) cannot access Medicare unless from a reciprocal country",
              },
              {
                label: "OSHC (students)",
                value: "Overseas Student Health Cover mandatory for all student visa holders; covers GP, hospital, limited dental/optical",
                note: "Minimum OSHC required; compare Allianz, Medibank, BUPA, NIB, CBHS student products.",
              },
              {
                label: "OVHC (working holiday/sponsored workers)",
                value: "Overseas Visitors Health Cover available for non-Medicare temporary residents; not mandatory but recommended",
              },
              {
                label: "Reciprocal country residents",
                value: "Citizens/residents of UK, NZ, Netherlands, Sweden, Finland, Italy, Belgium, Norway, Slovenia, Malta, Ireland can access Medicare for medically necessary care",
              },
            ],
          },
          {
            heading: "Practical Steps for New Arrivals",
            items: [
              {
                label: "Day 1 actions (PR)",
                value: "Enroll in Medicare at Services Australia; consider PHI to avoid LHC loading; register GP near home",
              },
              {
                label: "Ambulance cover",
                value: "Queensland and Tasmania include ambulance in Medicare-equivalent; other states charge A$500-1,200/call; check state or get extras cover",
              },
              {
                label: "My Health Record",
                value: "Link to myGov; stores medical history, medications, and test results; useful when seeing new doctors",
              },
            ],
          },
        ],
      },
      {
        id: "costs",
        title: "Costs & Out-of-Pocket",
        icon: "\uD83D\uDCB0",
        sections: [
          {
            heading: "GP and Specialist Gaps",
            items: [
              {
                label: "Bulk-billed GP",
                value: "Free; no gap payment; choose a bulk-billing practice",
              },
              {
                label: "Non-bulk-billing GP",
                value: "Out-of-pocket gap A$30-60 after Medicare rebate; some inner-city GPs charge more",
              },
              {
                label: "Specialist out-of-hospital",
                value: "Gap typically A$100-300; some specialists offer no-gap arrangements if you have PHI",
              },
              {
                label: "Pathology and radiology",
                value: "Most bulk-billed; occasional gap of A$20-50 for non-bulk-billing providers",
              },
            ],
          },
          {
            heading: "Hospital Costs",
            items: [
              {
                label: "Public patient (Medicare)",
                value: "Free; no choice of surgeon or private room; waiting lists for elective procedures",
              },
              {
                label: "Private patient in public hospital",
                value: "PHI pays hospital component; Medicare pays 75% of MBS; PHI gap cover handles remainder",
              },
              {
                label: "Private hospital without PHI",
                value: "Extremely expensive; A$1,000-2,000/night plus surgical and anaesthetic fees; uninsured should use public system",
              },
              {
                label: "PHI excess",
                value: "Standard excess of A$500-750 per admission applies; choose appropriate excess level at enrollment",
              },
            ],
          },
          {
            heading: "Medicines and PBS",
            items: [
              {
                label: "PBS general co-payment",
                value: "A$31.60 per script (2024); rises with CPI annually",
              },
              {
                label: "Concession card holders",
                value: "A$7.70 per script; Health Care Card or Pensioner Concession Card required",
              },
              {
                label: "Non-PBS medicines",
                value: "Full retail price; can be A$50-500+ per month for specialty medications not on PBS",
              },
            ],
          },
        ],
      },
      {
        id: "dental",
        title: "Dental & Vision",
        icon: "\uD83E\uDDB7",
        sections: [
          {
            heading: "Medicare Dental",
            items: [
              {
                label: "Child Dental Benefits Schedule (CDBS)",
                value: "A$1,052 benefit over 2 calendar years for children under 18 on Medicare; covers check-ups, fillings, extractions",
                note: "Children must be Medicare eligible and receive certain government payments or their parent must.",
              },
              {
                label: "Adult Medicare dental",
                value: "Medicare does not cover routine adult dental; specialist dental surgery covered in hospital under Medicare",
              },
              {
                label: "State/territory public dental",
                value: "Free or low-cost public dental clinics for concession card holders and low-income adults; long wait lists (1-3 years in some states)",
              },
            ],
          },
          {
            heading: "Private Dental",
            items: [
              {
                label: "Extras cover dental",
                value: "Annual benefit A$300-800 for general dental; major dental (crowns, bridges) A$500-1,500 limit; 12-month wait for major",
              },
              {
                label: "Common costs (no cover)",
                value: "Check-up + clean A$200-350; filling A$150-300; crown A$1,500-2,500; root canal A$900-1,500; extraction A$200-400",
              },
              {
                label: "Dental schools",
                value: "University of Sydney, Melbourne, Queensland, Adelaide, UNSW offer treatment at 40-60% discount; supervised by qualified staff",
              },
              {
                label: "Orthodontics",
                value: "Braces/Invisalign A$6,000-9,000; extras cover orthodontics limit usually A$1,500-3,000; 12-month waiting period typical",
              },
            ],
          },
          {
            heading: "Vision",
            items: [
              {
                label: "Medicare eye tests",
                value: "Optometrist eye exams bulk-billed under Medicare for all Medicare-eligible patients; no gap for standard exam",
              },
              {
                label: "Glasses and contacts",
                value: "Not covered by Medicare; extras cover optical typically A$200-300 per year; OPSM, Specsavers, George and Matilda major chains",
              },
              {
                label: "Laser eye surgery",
                value: "Not covered by Medicare; private cost A$2,500-4,000 per eye; extras cover rarely includes LASIK",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: { name: "Services Australia / Medicare", url: "https://www.servicesaustralia.gov.au/medicare" },
  },
]

// ── Lookup helper ─────────────────────────────────────────────────────────────

export function getHealthData(country: CountryCode): HealthData | undefined {
  return HEALTH_DATA.find((d) => d.country === country)
}
