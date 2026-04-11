/**
 * Child benefits calculator engine.
 *
 * Returns applicable benefits and estimated amounts for each of
 * US, DE, UK, CA, AU based on a household profile.
 * Rule-based, fully client-side — no API or server required.
 *
 * All amounts are approximate and in local currency as noted.
 * Last verified: January 2025.
 */

import type { ChildBenefitProfile, Benefit, CountryCode } from '@/types'

// ── US Benefits ───────────────────────────────────────────────────────────────

function evalUS(p: ChildBenefitProfile): Benefit[] {
  const benefits: Benefit[] = []
  const { numChildren, childAges, annualIncomeUSD, residencyStatus } = p
  const isCitizenOrPR = residencyStatus === 'citizen' || residencyStatus === 'pr'

  // Child Tax Credit (CTC) — 2024
  if (numChildren > 0 && annualIncomeUSD <= 400000) {
    const qualifyingChildren = childAges.filter((a) => a < 17).length
    const baseCredit = qualifyingChildren * 2000
    const refundablePer = Math.min(1600, annualIncomeUSD >= 2500 ? 1600 : 0)
    const refundable = qualifyingChildren * refundablePer
    benefits.push({
      id: 'us-ctc',
      name: 'Child Tax Credit (CTC)',
      description: 'Federal tax credit of up to $2,000 per qualifying child under 17. Up to $1,600 is refundable (Additional Child Tax Credit) for lower-income families.',
      monthlyAmountUSD: Math.round(baseCredit / 12),
      amountNote: `$${baseCredit.toLocaleString()}/year total (up to $2,000/child under 17) · $${refundable.toLocaleString()} refundable portion`,
      eligibility: qualifyingChildren > 0 ? 'eligible' : 'check',
      requirements: [
        'Child must be under 17 at end of tax year',
        'Child must be a US citizen, national, or resident alien',
        'Phases out above $200,000 (single) / $400,000 (married)',
        'Must have Social Security numbers for each qualifying child',
      ],
      officialUrl: 'https://www.irs.gov/credits-deductions/individuals/child-tax-credit',
    })
  }

  // CHIP — Children's Health Insurance Program
  if (numChildren > 0) {
    benefits.push({
      id: 'us-chip',
      name: 'CHIP — Children\'s Health Insurance',
      description: 'Low-cost or free health insurance for children in families that earn too much for Medicaid but can\'t afford private insurance. Available in all 50 states.',
      monthlyAmountUSD: null,
      amountNote: 'Low-cost or free — varies by state and income. Covers doctor visits, prescriptions, dental, and vision.',
      eligibility: annualIncomeUSD <= 80000 ? 'likely' : 'check',
      requirements: [
        'Child must be under 19',
        'Income must be within state-set limits (typically 200–300% of federal poverty level)',
        'Many states cover children of immigrants who have lived in US for 5 years',
        'Apply through Healthcare.gov or your state\'s Medicaid office',
      ],
      officialUrl: 'https://www.healthcare.gov/medicaid-chip/childrens-health-insurance-program/',
    })
  }

  // Child and Dependent Care Tax Credit
  if (numChildren > 0 && childAges.some((a) => a < 13)) {
    const youngChildren = childAges.filter((a) => a < 13).length
    const maxExpenses = youngChildren === 1 ? 3000 : 6000
    benefits.push({
      id: 'us-cdctc',
      name: 'Child and Dependent Care Credit',
      description: 'Tax credit for childcare expenses so you (and your spouse) can work. Covers 20–35% of up to $3,000 for one child or $6,000 for two or more.',
      monthlyAmountUSD: null,
      amountNote: `Up to ${youngChildren === 1 ? '$1,050' : '$2,100'}/year credit on up to $${maxExpenses.toLocaleString()} in qualifying expenses`,
      eligibility: 'eligible',
      requirements: [
        'Child must be under 13',
        'Childcare must allow you (and spouse) to work or look for work',
        'Credit is 20–35% of expenses depending on income',
        'Provider cannot be your spouse or dependent',
      ],
      officialUrl: 'https://www.irs.gov/credits-deductions/individuals/child-and-dependent-care-credit',
    })
  }

  // Earned Income Tax Credit (with children)
  if (numChildren > 0 && annualIncomeUSD <= 60000 && isCitizenOrPR) {
    const maxEITC = numChildren === 1 ? 3995 : numChildren === 2 ? 6604 : 7430
    benefits.push({
      id: 'us-eitc',
      name: 'Earned Income Tax Credit (EITC)',
      description: 'Refundable federal tax credit for low-to-moderate income working families. One of the most valuable credits for families with children.',
      monthlyAmountUSD: Math.round(maxEITC / 12),
      amountNote: `Up to $${maxEITC.toLocaleString()}/year with ${numChildren >= 3 ? '3+' : numChildren} child${numChildren > 1 ? 'ren' : ''}`,
      eligibility: annualIncomeUSD <= 53000 ? 'eligible' : 'check',
      requirements: [
        'Must have earned income (wages, self-employment)',
        `Income limit: ~$${numChildren === 1 ? '46,560' : numChildren === 2 ? '52,918' : '56,838'} (married filing jointly)`,
        'Children must have valid Social Security numbers',
        'You must be a US citizen or resident alien all year',
      ],
      officialUrl: 'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/eitc-central',
    })
  }

  return benefits
}

// ── DE Benefits ───────────────────────────────────────────────────────────────

function evalDE(p: ChildBenefitProfile): Benefit[] {
  const benefits: Benefit[] = []
  const { numChildren, childAges, annualIncomeUSD, residencyStatus } = p
  const isCitizenOrPR = residencyStatus === 'citizen' || residencyStatus === 'pr'
  const hasWorkVisa = residencyStatus === 'work_visa'

  // Kindergeld — monthly child allowance
  if (numChildren > 0 && (isCitizenOrPR || hasWorkVisa)) {
    const monthlyTotal = numChildren * 255  // €255/month per child (2024)
    benefits.push({
      id: 'de-kindergeld',
      name: 'Kindergeld (Child Benefit)',
      description: 'Monthly cash benefit paid to parents for each child. €255/month per child in 2024, paid until child turns 18 (up to 25 if in education).',
      monthlyAmountUSD: Math.round(monthlyTotal * 1.08),  // approx EUR→USD
      amountNote: `€${monthlyTotal}/month total (€255 per child) — paid until age 18 (or 25 if in full-time education)`,
      eligibility: 'eligible',
      requirements: [
        'Parent must have a valid residence permit or be EU citizen',
        'Child must live in Germany or EU/EEA',
        'Apply at your local Familienkasse (Family Benefits Office)',
        'No income limit — universal benefit',
      ],
      officialUrl: 'https://www.arbeitsagentur.de/familie-und-kinder/kindergeld',
    })
  }

  // Kinderzuschlag — supplement for low-income families
  if (numChildren > 0 && annualIncomeUSD <= 45000 && (isCitizenOrPR || hasWorkVisa)) {
    benefits.push({
      id: 'de-kinderzuschlag',
      name: 'Kinderzuschlag (Child Supplement)',
      description: 'Additional monthly payment of up to €292/child for families whose income is slightly too low to cover children\'s needs. Tops up income to avoid dependency on social assistance (Bürgergeld).',
      monthlyAmountUSD: Math.round(292 * numChildren * 1.08),
      amountNote: `Up to €292/month per child (2024) — means-tested, tapers with income`,
      eligibility: annualIncomeUSD <= 35000 ? 'likely' : 'check',
      requirements: [
        'Receiving Kindergeld',
        'Minimum income: €600/month (single parent) or €900/month (couple)',
        'Income must not be high enough to cover children\'s needs independently',
        'Children must be under 25 and living in the household',
      ],
      officialUrl: 'https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag',
    })
  }

  // Elterngeld — parental benefit (newborns)
  if (childAges.includes(0) || childAges.includes(1)) {
    const baseMonthly = Math.min(1800, Math.max(300, Math.round(annualIncomeUSD * 0.65 / 12 * 0.9)))
    benefits.push({
      id: 'de-elterngeld',
      name: 'Elterngeld (Parental Benefit)',
      description: '65–100% of your net income (min. €300, max. €1,800/month) for up to 14 months after birth. Both parents can share the months. Available to all residents.',
      monthlyAmountUSD: Math.round(baseMonthly * 1.08),
      amountNote: `€300–€1,800/month for 12–14 months — 65% of prior net income (higher % for lower earners)`,
      eligibility: 'likely',
      requirements: [
        'Must live in Germany and care for child yourself',
        'May not work more than 32 hours/week',
        'Must apply within 3 months of birth — applies retroactively',
        'ElterngeldPlus allows part-time work with half-rate payments for longer',
      ],
      officialUrl: 'https://www.elterngeld-digital.de',
    })
  }

  // Bildungs- und Teilhabepaket
  if (numChildren > 0 && annualIncomeUSD <= 25000) {
    benefits.push({
      id: 'de-bup',
      name: 'Bildungs- und Teilhabepaket (Education Package)',
      description: 'Benefits for children from low-income families: school meals, trips, sports/music clubs, tutoring. Up to €150/year per child.',
      monthlyAmountUSD: null,
      amountNote: 'Up to €150/year per child for activities + subsidised school meals',
      eligibility: 'likely',
      requirements: [
        'Receiving Bürgergeld, Wohngeld, or Kinderzuschlag',
        'Apply at your local Jobcenter or Sozialamt',
        'Children aged 6–18 (some benefits up to 25)',
      ],
      officialUrl: 'https://www.bmas.de/DE/Soziales/Bildung-und-Teilhabe/bildung-und-teilhabe.html',
    })
  }

  return benefits
}

// ── UK Benefits ───────────────────────────────────────────────────────────────

function evalUK(p: ChildBenefitProfile): Benefit[] {
  const benefits: Benefit[] = []
  const { numChildren, childAges, annualIncomeUSD, residencyStatus } = p
  const isCitizenOrPR = residencyStatus === 'citizen' || residencyStatus === 'pr'
  const hasWorkVisa = residencyStatus === 'work_visa'

  // Child Benefit
  if (numChildren > 0 && (isCitizenOrPR || hasWorkVisa)) {
    const monthly = numChildren === 1
      ? Math.round(25.60 * 4.33)   // £25.60/week for eldest, ~£110.8/month
      : Math.round((25.60 + (numChildren - 1) * 16.95) * 4.33)
    benefits.push({
      id: 'uk-child-benefit',
      name: 'Child Benefit',
      description: 'Weekly payment for each child under 16 (or under 20 in full-time education). £25.60/week for eldest, £16.95/week for each additional child (April 2024 rates).',
      monthlyAmountUSD: Math.round(monthly * 1.27),  // approx GBP→USD
      amountNote: `£${numChildren === 1 ? '25.60' : `${25.60} + ${(numChildren - 1)} × £16.95`}/week · ~£${monthly}/month`,
      eligibility: 'eligible',
      requirements: [
        'Must be responsible for a child under 16 (or under 20 in approved education)',
        'You or partner must live in the UK',
        'High Income Child Benefit Charge applies if either parent earns over £60,000 (2024)',
        'Claim even if you pay it back — protects your National Insurance credits',
      ],
      officialUrl: 'https://www.gov.uk/child-benefit',
    })
  }

  // Universal Credit (child element)
  if (numChildren > 0 && annualIncomeUSD <= 45000 && (isCitizenOrPR || hasWorkVisa)) {
    const childElement = Math.min(numChildren, 2) * 315  // £315/month per child (max 2 children rule)
    benefits.push({
      id: 'uk-uc-children',
      name: 'Universal Credit — Child Element',
      description: '£315/month per child (up to 2 children in most cases) added to your Universal Credit award. Includes additional amounts for disabled children.',
      monthlyAmountUSD: Math.round(childElement * 1.27),
      amountNote: `£${childElement}/month for ${Math.min(numChildren, 2)} child(ren) — two-child limit applies to children born after April 2017`,
      eligibility: annualIncomeUSD <= 35000 ? 'likely' : 'check',
      requirements: [
        'Must be on Universal Credit (income-based)',
        'Two-child limit: only 2 children (born after April 2017) qualify unless exceptions apply',
        'Must be responsible for the child and child must live with you',
        'Income taper applies — benefit reduces gradually as income rises',
      ],
      officialUrl: 'https://www.gov.uk/child-element-universal-credit',
    })
  }

  // Free school meals
  if (childAges.some((a) => a >= 5 && a <= 16) && annualIncomeUSD <= 30000) {
    benefits.push({
      id: 'uk-fsm',
      name: 'Free School Meals',
      description: 'All children in Reception to Year 2 get free school meals. Older children qualify if parents receive certain benefits (Universal Credit under £7,400 net earnings).',
      monthlyAmountUSD: Math.round(480 / 12 * 1.27),
      amountNote: 'Worth ~£2.65/day (~£480/year) per qualifying child',
      eligibility: annualIncomeUSD <= 25000 ? 'likely' : 'check',
      requirements: [
        'Automatic for children in Reception to Year 2 (ages 4–7)',
        'For older children: parent must receive Universal Credit with net earnings ≤ £7,400/year, or certain other benefits',
        'Apply through your child\'s school or local council',
      ],
      officialUrl: 'https://www.gov.uk/apply-free-school-meals',
    })
  }

  // 30 hours free childcare
  if (childAges.some((a) => a >= 3 && a <= 4) && (isCitizenOrPR || hasWorkVisa)) {
    benefits.push({
      id: 'uk-free-childcare',
      name: '30 Hours Free Childcare',
      description: 'Working parents of 3–4 year olds can get 30 hours/week of free childcare during term time. Saves ~£6,000/year per child.',
      monthlyAmountUSD: null,
      amountNote: '~£6,000/year in childcare savings (30 hrs/week, 38 weeks/year)',
      eligibility: 'likely',
      requirements: [
        'Both parents must work (or be in approved training)',
        'Each parent must earn at least the National Living Wage × 16 hrs/week',
        'Neither parent earns over £100,000/year',
        'Child must be 3 or 4 years old (some areas extend to 2-year-olds from April 2024)',
      ],
      officialUrl: 'https://www.childcarechoices.gov.uk',
    })
  }

  return benefits
}

// ── CA Benefits ───────────────────────────────────────────────────────────────

function evalCA(p: ChildBenefitProfile): Benefit[] {
  const benefits: Benefit[] = []
  const { numChildren, childAges, annualIncomeUSD, residencyStatus } = p
  const isCitizenOrPR = residencyStatus === 'citizen' || residencyStatus === 'pr'

  // Canada Child Benefit (CCB)
  if (numChildren > 0 && isCitizenOrPR) {
    const under6 = childAges.filter((a) => a < 6).length
    const sixTo17 = childAges.filter((a) => a >= 6 && a < 18).length
    // 2024-25 max: $7,786.92/year (<6), $6,570.00/year (6-17)
    const annualMax = (under6 * 7787) + (sixTo17 * 6570)
    // Taper: full amount if income < $36,502, reduces above
    const incomeCAD = annualIncomeUSD * 1.35
    let annual = annualMax
    if (incomeCAD > 36502) {
      const reduction = Math.min(annual, (incomeCAD - 36502) * 0.07)
      annual = Math.max(0, annual - reduction)
    }
    benefits.push({
      id: 'ca-ccb',
      name: 'Canada Child Benefit (CCB)',
      description: 'Tax-free monthly payments to help with the cost of raising children under 18. Up to $7,787/year for children under 6, $6,570/year for ages 6–17.',
      monthlyAmountUSD: Math.round((annual / 12) / 1.35),
      amountNote: `~C$${Math.round(annual).toLocaleString()}/year · C$${Math.round(annual / 12).toLocaleString()}/month (estimated based on income)`,
      eligibility: 'eligible',
      requirements: [
        'Must be the primary caregiver of the child',
        'You and your spouse/partner must be Canadian citizens, PRs, protected persons, or temporary residents with 18+ months in Canada',
        'Apply through CRA My Account or complete RC66 form',
        'CCB is recalculated each July based on previous year\'s tax return',
      ],
      officialUrl: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview.html',
    })
  }

  // GST/HST Credit (children)
  if (numChildren > 0 && annualIncomeUSD <= 60000 && isCitizenOrPR) {
    benefits.push({
      id: 'ca-gst',
      name: 'GST/HST Credit',
      description: 'Quarterly tax-free payment to offset the GST/HST paid by lower-income individuals and families. Amount increases with number of children.',
      monthlyAmountUSD: Math.round(50 / 1.35),  // approx $50/month total
      amountNote: 'Up to ~C$179/quarter per child + base amount (varies by income)',
      eligibility: annualIncomeUSD <= 50000 ? 'eligible' : 'check',
      requirements: [
        'Must be a Canadian resident for income tax purposes',
        'Filed a tax return (mandatory to qualify)',
        'Applied automatically when you file taxes',
      ],
      officialUrl: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/gst-hst-credit.html',
    })
  }

  // Ontario / provincial child benefit (example — Ontario)
  if (numChildren > 0 && annualIncomeUSD <= 45000 && isCitizenOrPR) {
    benefits.push({
      id: 'ca-province-benefit',
      name: 'Provincial Child Benefits',
      description: 'Most provinces offer additional child benefits on top of the federal CCB. For example, Ontario\'s Children\'s Benefit adds up to C$125/child/month for low-income families.',
      monthlyAmountUSD: null,
      amountNote: 'Varies by province — up to C$125/month/child in Ontario (OCCB)',
      eligibility: 'check',
      requirements: [
        'Must receive CCB (CCB application usually triggers provincial benefits automatically)',
        'Amount and eligibility vary significantly by province',
        'Some provinces: Alberta ($40–100/month), BC (up to $150/month), Manitoba, Quebec have separate systems',
      ],
      officialUrl: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs.html',
    })
  }

  // Employment Insurance (EI) Maternity/Parental Benefits
  if (childAges.includes(0) || childAges.includes(1)) {
    benefits.push({
      id: 'ca-ei-parental',
      name: 'EI Maternity & Parental Benefits',
      description: 'Employment Insurance benefits replace 55% of your earnings (up to C$668/week) for up to 15 weeks maternity + 35 weeks parental (or 61 weeks extended at 33%).',
      monthlyAmountUSD: null,
      amountNote: '55% of weekly insurable earnings (max C$668/week standard, or 33% for extended 61 weeks)',
      eligibility: 'check',
      requirements: [
        'Must have paid EI premiums and have 600+ insurable hours in last 52 weeks',
        'Must be a Canadian citizen, PR, or temporary resident who has worked in Canada',
        'Apply through Service Canada within 4 weeks of birth/adoption',
        'Both parents can share parental weeks',
      ],
      officialUrl: 'https://www.canada.ca/en/services/benefits/ei/ei-maternity-parental.html',
    })
  }

  return benefits
}

// ── AU Benefits ───────────────────────────────────────────────────────────────

function evalAU(p: ChildBenefitProfile): Benefit[] {
  const benefits: Benefit[] = []
  const { numChildren, childAges, annualIncomeUSD, residencyStatus } = p
  const isCitizenOrPR = residencyStatus === 'citizen' || residencyStatus === 'pr'
  const hasWorkVisa = residencyStatus === 'work_visa'

  // Family Tax Benefit Part A
  if (numChildren > 0 && isCitizenOrPR) {
    const under13 = childAges.filter((a) => a < 13).length
    const thirteenTo19 = childAges.filter((a) => a >= 13 && a < 20).length
    // FTB Part A 2024: max ~$233.20/fortnight per child under 13
    const fortnightlyBase = (under13 * 233.20) + (thirteenTo19 * 303.20)
    const monthly = Math.round(fortnightlyBase * 2.167)
    benefits.push({
      id: 'au-ftb-a',
      name: 'Family Tax Benefit Part A',
      description: 'Regular payment per child to help with child-rearing costs. Up to A$233.20/fortnight per child under 13, A$303.20 for teenagers. Amount reduces with income.',
      monthlyAmountUSD: Math.round(monthly * 0.63),  // approx AUD→USD
      amountNote: `A$${monthly.toLocaleString()}/month estimated (up to A$233.20/fortnight per child <13)`,
      eligibility: annualIncomeUSD <= 100000 ? 'eligible' : 'check',
      requirements: [
        'Must be an Australian citizen or PR (some visa holders qualify)',
        'You must have care of the child',
        'Child must be under 16, or 16–19 in full-time education',
        'Higher-income families receive a reduced base rate (min A$61.46/fortnight per child)',
      ],
      officialUrl: 'https://www.servicesaustralia.gov.au/family-tax-benefit',
    })
  }

  // Family Tax Benefit Part B
  if (numChildren > 0 && isCitizenOrPR && childAges.some((a) => a < 13)) {
    benefits.push({
      id: 'au-ftb-b',
      name: 'Family Tax Benefit Part B',
      description: 'Additional support for single-parent families or families where one parent earns significantly less than the other. Up to A$188.86/fortnight.',
      monthlyAmountUSD: Math.round(188.86 * 2.167 * 0.63),
      amountNote: 'Up to A$188.86/fortnight (~A$409/month)',
      eligibility: 'check',
      requirements: [
        'Single-parent families: always qualify if income below threshold',
        'Two-parent families: primary earner must earn < A$100,000/year',
        'Secondary earner must earn < A$5,840/year (or be working less)',
        'Youngest child must be under 13',
      ],
      officialUrl: 'https://www.servicesaustralia.gov.au/family-tax-benefit-part-b',
    })
  }

  // Parental Leave Pay
  if (childAges.includes(0) && isCitizenOrPR) {
    benefits.push({
      id: 'au-parental-leave',
      name: 'Parental Leave Pay',
      description: 'Government-funded pay at the national minimum wage (A$882.75/week in 2024) for up to 22 weeks (from 1 July 2024, increasing to 26 weeks by 2026).',
      monthlyAmountUSD: Math.round(882.75 * 4.33 * 0.63),
      amountNote: 'A$882.75/week for up to 22 weeks (2024) — increasing to 26 weeks by 2026',
      eligibility: 'likely',
      requirements: [
        'Must be the primary carer of a child born or adopted from 1 July 2023',
        'Must have worked 10 of the 13 months before the birth and worked at least 330 hours',
        'Individual income must be A$168,865 or less in the previous financial year',
        'Must be an Australian resident',
      ],
      officialUrl: 'https://www.servicesaustralia.gov.au/parental-leave-pay',
    })
  }

  // Child Care Subsidy
  if (childAges.some((a) => a < 13) && isCitizenOrPR) {
    const subsidyPct = annualIncomeUSD < 80000 ? 90 : annualIncomeUSD < 120000 ? 75 : annualIncomeUSD < 160000 ? 60 : 50
    benefits.push({
      id: 'au-ccs',
      name: 'Child Care Subsidy (CCS)',
      description: 'Government subsidy for approved childcare services. Covers 50–90% of childcare fees based on income, hours of activity, and type of care.',
      monthlyAmountUSD: null,
      amountNote: `~${subsidyPct}% of childcare fees covered (estimated based on income). Cap on subsidised hours applies.`,
      eligibility: 'likely',
      requirements: [
        'Child must be under 13 and not attending secondary school',
        'Must use an approved childcare service',
        'Both parents (or single parent) must meet activity test (work, study, volunteer)',
        'Child must be up to date with immunisations',
      ],
      officialUrl: 'https://www.servicesaustralia.gov.au/child-care-subsidy',
    })
  }

  return benefits
}

// ── Main export ────────────────────────────────────────────────────────────────

export function calculateBenefits(profile: ChildBenefitProfile): Benefit[] {
  const evaluators: Record<CountryCode, (p: ChildBenefitProfile) => Benefit[]> = {
    US: evalUS,
    DE: evalDE,
    UK: evalUK,
    CA: evalCA,
    AU: evalAU,
    FR: () => [], NL: () => [], SE: () => [], CH: () => [], NZ: () => [],
  }
  return (evaluators[profile.country] ?? (() => []))(profile)
}

// USD income band labels and midpoints per country
export const BENEFIT_INCOME_LABELS: Record<CountryCode, string[]> = {
  US: ['Under $25,000', '$25,000–$40,000', '$40,000–$60,000', '$60,000–$80,000', '$80,000–$120,000', 'Over $120,000'],
  DE: ['Under €20,000', '€20,000–€30,000', '€30,000–€45,000', '€45,000–€65,000', '€65,000–€100,000', 'Over €100,000'],
  UK: ['Under £20,000', '£20,000–£35,000', '£35,000–£50,000', '£50,000–£75,000', '£75,000–£100,000', 'Over £100,000'],
  CA: ['Under C$30,000', 'C$30,000–$50,000', 'C$50,000–$75,000', 'C$75,000–$100,000', 'C$100,000–$150,000', 'Over C$150,000'],
  AU: ['Under A$30,000', 'A$30,000–$60,000', 'A$60,000–$90,000', 'A$90,000–$130,000', 'A$130,000–$180,000', 'Over A$180,000'],
  FR: [], NL: [], SE: [], CH: [], NZ: [],
}

export const BENEFIT_INCOME_USD: Record<CountryCode, number[]> = {
  US: [15000, 32000, 50000, 70000, 100000, 150000],
  DE: [17000, 24000, 38000, 56000, 86000, 130000],
  UK: [17000, 30000, 45000, 63000, 87000, 140000],
  CA: [18000, 30000, 55000, 62000, 92000, 140000],
  AU: [17000, 35000, 58000, 78000, 110000, 160000],
  FR: [], NL: [], SE: [], CH: [], NZ: [],
}
