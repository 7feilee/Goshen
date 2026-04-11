/**
 * PR eligibility checker engine.
 *
 * Rule-based evaluation of permanent residence pathways for
 * US, DE, UK, CA, AU. No AI or server required — runs fully client-side.
 *
 * Each pathway evaluates the user's PRProfile against a set of rules and
 * returns an eligibility result with met/missing requirements.
 */

import type { PRProfile, PRPathway, CountryCode } from '@/types'

// ── Helpers ───────────────────────────────────────────────────────────────────

function ieltsToLabel(score: number): string {
  if (score >= 8) return 'C2'
  if (score >= 7) return 'C1'
  if (score >= 6) return 'B2'
  if (score >= 5) return 'B1'
  if (score >= 4) return 'A2'
  return 'A1'
}

function incomeLabel(usd: number): string {
  if (usd >= 200000) return '$200 k+'
  if (usd >= 100000) return '$100–200 k'
  if (usd >= 60000)  return '$60–100 k'
  if (usd >= 40000)  return '$40–60 k'
  if (usd >= 25000)  return '$25–40 k'
  return 'under $25 k'
}

// ── Country-specific evaluators ────────────────────────────────────────────────

function evalUS(p: PRProfile): PRPathway[] {
  const pathways: PRPathway[] = []

  // ── EB-1A: Extraordinary ability ──
  {
    const met: string[] = []
    const missing: string[] = []
    const advanced = p.educationLevel === 'phd' || p.educationLevel === 'master'
    if (advanced) met.push('Advanced degree (supporting evidence)')
    else missing.push('Typically requires PhD or exceptional professional achievements')
    if (p.workedYears >= 5) met.push('Substantial work experience (≥ 5 years)')
    else missing.push(`Work experience < 5 years (have ${p.workedYears})`)
    pathways.push({
      id: 'us-eb1a',
      country: 'US',
      name: 'EB-1A — Extraordinary Ability',
      stream: 'Employment-based',
      description: 'Green card for individuals with extraordinary ability in sciences, arts, education, business, or athletics. No job offer or employer sponsor needed.',
      eligibility: missing.length === 0 ? 'likely' : missing.length <= 1 ? 'partial' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '12–36 months',
      officialUrl: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-first-preference-eb-1',
      notes: 'Requires extensive evidence: awards, publications, high salary, judging peers, critical role.',
    })
  }

  // ── EB-2 NIW: National Interest Waiver ──
  {
    const met: string[] = []
    const missing: string[] = []
    const advancedDeg = p.educationLevel === 'master' || p.educationLevel === 'phd'
    if (advancedDeg) met.push("Advanced degree (master's or PhD)")
    else missing.push("Advanced degree (master's or higher) required")
    if (p.workedYears >= 3) met.push(`${p.workedYears} years of work experience`)
    else missing.push('Typically 3+ years of professional experience expected')
    pathways.push({
      id: 'us-eb2-niw',
      country: 'US',
      name: 'EB-2 NIW — National Interest Waiver',
      stream: 'Employment-based',
      description: 'Green card for advanced-degree professionals whose work benefits the US national interest. No employer sponsor needed — self-petitioned.',
      eligibility: missing.length === 0 ? 'likely' : 'partial',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '18–48 months',
      officialUrl: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-second-preference-eb-2',
      notes: 'Must show work is of substantial merit, national scope, and that waiving the job offer is in the national interest.',
    })
  }

  // ── EB-3: Skilled Workers ──
  {
    const met: string[] = []
    const missing: string[] = []
    const hasDeg = p.educationLevel !== 'highschool'
    if (hasDeg) met.push("Bachelor's degree or higher")
    else missing.push("Bachelor's degree (or 2 years of training for certain roles)")
    if (p.hasJobOffer) met.push('Employer job offer')
    else missing.push('US employer job offer required')
    if (p.workedYears >= 2) met.push(`${p.workedYears} years of work experience`)
    pathways.push({
      id: 'us-eb3',
      country: 'US',
      name: 'EB-3 — Skilled Worker / Professional',
      stream: 'Employment-based',
      description: "Green card for professionals with a bachelor's degree or skilled workers. Requires employer sponsorship and PERM labor certification.",
      eligibility: missing.length === 0 ? 'likely' : missing.length === 1 ? 'partial' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '2–5 years (varies by country of birth)',
      officialUrl: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-third-preference-eb-3',
      notes: 'Processing time varies significantly by country of birth due to annual per-country caps.',
    })
  }

  // ── IR-1/CR-1: Immediate Relative (Spouse of US Citizen) ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.hasSpouseCitizen) met.push('Spouse is a US citizen')
    else missing.push('Spouse must be a US citizen (this pathway is for spouses of citizens only)')
    pathways.push({
      id: 'us-ir1',
      country: 'US',
      name: 'IR-1 / CR-1 — Spouse of US Citizen',
      stream: 'Family-based',
      description: 'Immediate relative green card for the spouse of a US citizen. Highest priority family category — no annual numerical cap.',
      eligibility: p.hasSpouseCitizen ? 'likely' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '12–36 months',
      officialUrl: 'https://www.uscis.gov/family/family-of-us-citizens/immediate-relatives-of-us-citizens',
    })
  }

  // ── F-2A: Spouse/Child of Lawful Permanent Resident ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.hasSpousePR) met.push('Spouse is a US Lawful Permanent Resident')
    else missing.push('Spouse must be a US Lawful Permanent Resident')
    pathways.push({
      id: 'us-f2a',
      country: 'US',
      name: 'F-2A — Spouse of Permanent Resident',
      stream: 'Family-based',
      description: 'Family preference green card for the spouse of a US Lawful Permanent Resident (LPR/green card holder). Subject to annual cap.',
      eligibility: p.hasSpousePR ? 'likely' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '2–3 years',
      officialUrl: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html',
    })
  }

  // ── EB-5: Investor ──
  {
    const met: string[] = []
    const missing: string[] = []
    const richEnough = p.annualIncomeUSD >= 200000
    if (richEnough) met.push('Sufficient income level (investment of $800k–$1.05M required)')
    else missing.push('Requires minimum investment of $800,000 (TEA) or $1,050,000')
    missing.push('Must create 10 full-time jobs for US workers')
    pathways.push({
      id: 'us-eb5',
      country: 'US',
      name: 'EB-5 — Investor Visa',
      stream: 'Investment',
      description: 'Green card through capital investment of $800,000 (Targeted Employment Area) or $1,050,000, creating 10 full-time US jobs.',
      eligibility: richEnough ? 'partial' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '29–43 months',
      officialUrl: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/eb-5-immigrant-investor-program',
    })
  }

  return pathways
}

// ──────────────────────────────────────────────────────────────────────────────

function evalDE(p: PRProfile): PRPathway[] {
  const pathways: PRPathway[] = []
  const langLevel = ieltsToLabel(p.languageScore)
  const hasB1 = p.languageScore >= 5
  const hasB2 = p.languageScore >= 6
  const sufficientIncome = p.annualIncomeUSD >= 28000  // approx €25 k/year

  // ── Niederlassungserlaubnis (standard) ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.residenceYears >= 5) met.push(`${p.residenceYears} years of legal residence (≥ 5 required)`)
    else missing.push(`Only ${p.residenceYears} year(s) of residence (5 required)`)
    if (hasB1) met.push(`German language: ${langLevel} (B1 minimum met)`)
    else missing.push(`German language B1 required (current level: ${langLevel})`)
    if (sufficientIncome) met.push('Sufficient income (not reliant on social benefits)')
    else missing.push('Sufficient income required — currently estimated below threshold')
    met.push('Requires 60 months of pension contributions')
    pathways.push({
      id: 'de-nle',
      country: 'DE',
      name: 'Niederlassungserlaubnis (Permanent Residence)',
      stream: 'Standard',
      description: 'Unrestricted permanent settlement permit after 5 years of legal residence in Germany. The main route to German PR.',
      eligibility: missing.length === 0 ? 'likely' : missing.length === 1 ? 'partial' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '1–3 months after application',
      officialUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Niederlassung/niederlassung-node.html',
      notes: 'Clean criminal record required. Accommodation must be adequate.',
    })
  }

  // ── EU Blue Card → NLE (accelerated) ──
  {
    const met: string[] = []
    const missing: string[] = []
    const highEarner = p.annualIncomeUSD >= 66000  // approx EU Blue Card threshold ~€58 k
    if (highEarner) met.push('Salary meets EU Blue Card threshold (approx. €58,400/year)')
    else missing.push('Salary must meet EU Blue Card threshold (approx. €58,400/year)')
    const hasDeg = p.educationLevel !== 'highschool'
    if (hasDeg) met.push('University degree or equivalent qualification')
    else missing.push('University degree or equivalent qualification required')
    if (hasB1) {
      if (p.residenceYears >= 3) met.push(`${p.residenceYears} years on Blue Card (B1 German → 33 months required)`)
      else missing.push(`33 months on EU Blue Card required with B1 German (have ${p.residenceYears} yrs)`)
    } else if (hasB2) {
      if (p.residenceYears >= 2) met.push(`${p.residenceYears} years on Blue Card (B2 German → 21 months required)`)
      else missing.push(`21 months on EU Blue Card required with B2 German (have ${p.residenceYears} yrs)`)
    } else {
      missing.push(`German language B1 required at minimum (current: ${langLevel})`)
    }
    pathways.push({
      id: 'de-bluecard-nle',
      country: 'DE',
      name: 'EU Blue Card → Niederlassungserlaubnis (Accelerated)',
      stream: 'Highly Skilled',
      description: 'Holders of the EU Blue Card can obtain permanent residence faster: after 33 months (B1 German) or 21 months (B2 German).',
      eligibility: missing.length === 0 ? 'likely' : missing.length <= 2 ? 'partial' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '1–3 months after eligibility',
      officialUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Fachkraeftezuwanderung/BlueCard/blue-card-node.html',
    })
  }

  // ── Skilled Worker (Fachkraft) – 4 year route ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.residenceYears >= 4) met.push(`${p.residenceYears} years of legal residence as a qualified worker`)
    else missing.push(`4 years on a skilled worker permit required (have ${p.residenceYears})`)
    if (hasB1) met.push(`German language: ${langLevel} (B1 minimum)`)
    else missing.push(`German B1 required (current: ${langLevel})`)
    if (sufficientIncome) met.push('Sufficient income secured')
    else missing.push('Sufficient income required')
    pathways.push({
      id: 'de-fachkraft-nle',
      country: 'DE',
      name: 'Niederlassungserlaubnis — Skilled Worker (4 years)',
      stream: 'Skilled Worker',
      description: 'Qualified workers (Fachkräfte) with recognised qualifications can apply for permanent residence after 4 years instead of 5.',
      eligibility: missing.length === 0 ? 'likely' : missing.length === 1 ? 'partial' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '1–3 months',
      officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/permanent-residence',
    })
  }

  // ── Spouse of German citizen ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.hasSpouseCitizen) met.push('Spouse is a German citizen')
    else missing.push('Spouse must be a German citizen')
    if (p.residenceYears >= 3) met.push(`${p.residenceYears} years of residence (3 required for this route)`)
    else missing.push(`3 years of residence required (have ${p.residenceYears})`)
    pathways.push({
      id: 'de-spouse',
      country: 'DE',
      name: 'Niederlassungserlaubnis — Spouse of German Citizen',
      stream: 'Family',
      description: 'Spouses of German citizens can obtain permanent residence after just 3 years, provided they meet integration requirements.',
      eligibility: (p.hasSpouseCitizen && p.residenceYears >= 3) ? 'likely' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '1–3 months',
      officialUrl: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/Ehegattennachzug/ehegattennachzug-node.html',
    })
  }

  return pathways
}

// ──────────────────────────────────────────────────────────────────────────────

function evalUK(p: PRProfile): PRPathway[] {
  const pathways: PRPathway[] = []
  const langLevel = ieltsToLabel(p.languageScore)
  const hasB1 = p.languageScore >= 5

  // ── ILR — Skilled Worker ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.residenceYears >= 5) met.push(`${p.residenceYears} years on qualifying visa (Skilled Worker)`)
    else missing.push(`5 years on Skilled Worker visa required (have ${p.residenceYears})`)
    if (hasB1) met.push(`English language: ${langLevel} (B1 minimum met)`)
    else missing.push(`English B1 required for ILR (current: ${langLevel})`)
    if (p.annualIncomeUSD >= 38700) met.push('Salary meets Skilled Worker threshold (£38,700/year)')  // approx 2024 threshold
    else missing.push('Salary must meet Skilled Worker going rate (£38,700/year from April 2024)')
    met.push('Must pass Life in the UK test')
    met.push('No more than 180 days outside UK per year')
    pathways.push({
      id: 'uk-ilr-skilled',
      country: 'UK',
      name: 'ILR — Skilled Worker Route',
      stream: 'Employment',
      description: 'Indefinite Leave to Remain after 5 continuous years on a Skilled Worker visa. The primary employment route to UK settlement.',
      eligibility: missing.length === 0 ? 'likely' : missing.length <= 2 ? 'partial' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '2–6 months',
      officialUrl: 'https://www.gov.uk/indefinite-leave-to-remain/skilled-workers',
      notes: 'Applications from April 2024 require salary of £38,700/year (or going rate, whichever higher).',
    })
  }

  // ── ILR — Spouse / Partner of British Citizen ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.hasSpouseCitizen) met.push('Spouse is a British citizen')
    else missing.push('Spouse must be a British citizen or settled person')
    if (p.residenceYears >= 5) met.push(`${p.residenceYears} years on Family visa (5 required)`)
    else missing.push(`5 years on Family (spouse) visa required (have ${p.residenceYears})`)
    if (hasB1) met.push(`English language: ${langLevel}`)
    else missing.push(`English B1 required`)
    pathways.push({
      id: 'uk-ilr-family',
      country: 'UK',
      name: 'ILR — Spouse / Partner Route',
      stream: 'Family',
      description: 'Indefinite Leave to Remain after 5 years on a spouse or partner visa with a British citizen or settled person.',
      eligibility: (p.hasSpouseCitizen && p.residenceYears >= 5 && hasB1) ? 'likely'
        : (p.hasSpouseCitizen) ? 'partial' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '2–6 months',
      officialUrl: 'https://www.gov.uk/indefinite-leave-to-remain/family-members',
    })
  }

  // ── ILR — Long Residence (10 years) ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.residenceYears >= 10) met.push(`${p.residenceYears} years of continuous lawful residence (10 required)`)
    else missing.push(`10 years of continuous lawful residence required (have ${p.residenceYears})`)
    if (hasB1) met.push(`English language: ${langLevel}`)
    else missing.push('English B1 required')
    pathways.push({
      id: 'uk-ilr-long-residence',
      country: 'UK',
      name: 'ILR — Long Residence (10 Years)',
      stream: 'Long Residence',
      description: 'Any person who has lived lawfully in the UK for 10 continuous years on any combination of visas may apply for ILR.',
      eligibility: (p.residenceYears >= 10 && hasB1) ? 'likely' : (p.residenceYears >= 7) ? 'partial' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '2–6 months',
      officialUrl: 'https://www.gov.uk/indefinite-leave-to-remain/long-residence',
      notes: 'Continuous residence means no single trip abroad of > 6 months or total > 18 months in the 10 years.',
    })
  }

  // ── Global Talent ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.residenceYears >= 3) met.push(`${p.residenceYears} years on Global Talent visa`)
    else missing.push('3 years on Global Talent visa required (some fast-track in 3 years)')
    if (p.educationLevel === 'phd' || p.workedYears >= 5)
      met.push('Strong track record in field (required for endorsement)')
    else missing.push('Demonstrated exceptional talent required for endorsement')
    pathways.push({
      id: 'uk-global-talent',
      country: 'UK',
      name: 'ILR — Global Talent Route',
      stream: 'Highly Skilled',
      description: 'Individuals with Global Talent visas (science, engineering, arts, digital) can apply for ILR after 3 or 5 years depending on endorsement type.',
      eligibility: missing.length === 0 ? 'likely' : 'partial',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '2–6 months',
      officialUrl: 'https://www.gov.uk/global-talent',
    })
  }

  return pathways
}

// ──────────────────────────────────────────────────────────────────────────────

function evalCA(p: PRProfile): PRPathway[] {
  const pathways: PRPathway[] = []
  // CA language: IELTS score (CLB 7 ≈ IELTS 6.0 for reading/writing, 6.5 listening/speaking)
  const clb7 = p.languageScore >= 6
  const clb9 = p.languageScore >= 7

  // Rough CRS score estimate (simplified)
  let crsScore = 0
  if (p.age >= 18 && p.age <= 35) crsScore += 100
  else if (p.age <= 39) crsScore += 85
  else if (p.age <= 44) crsScore += 65
  if (p.educationLevel === 'phd') crsScore += 150
  else if (p.educationLevel === 'master') crsScore += 135
  else if (p.educationLevel === 'bachelor') crsScore += 120
  if (p.languageScore >= 8) crsScore += 136
  else if (p.languageScore >= 7) crsScore += 110
  else if (p.languageScore >= 6) crsScore += 84
  if (p.workedYears >= 3) crsScore += 80
  else if (p.workedYears >= 1) crsScore += 40
  if (p.hasJobOffer) crsScore += 50
  if (p.hasSpouseCitizen || p.hasSpousePR) crsScore += 40

  // ── Express Entry — Canadian Experience Class (CEC) ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.workedYears >= 1) met.push(`${p.workedYears} year(s) of Canadian work experience (1 required for CEC)`)
    else missing.push('At least 1 year of full-time skilled work experience in Canada required')
    if (clb7) met.push(`Language: IELTS ${p.languageScore.toFixed(1)} (CLB 7 minimum met for TEER 0–2)`)
    else missing.push('IELTS 6.0+ (CLB 7) required for TEER 0–2 occupations')
    met.push(`Estimated CRS score: ~${crsScore} (recent cut-offs ~490–520 for CEC draws)`)
    pathways.push({
      id: 'ca-ee-cec',
      country: 'CA',
      name: 'Express Entry — Canadian Experience Class',
      stream: 'Economic',
      description: 'For people already working in Canada. One year of skilled work experience in Canada plus language proof qualifies for the Express Entry pool.',
      eligibility: (p.workedYears >= 1 && clb7) ? (crsScore >= 470 ? 'likely' : 'partial') : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '6 months (if invited)',
      officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/canadian-experience-class.html',
      notes: `Estimated CRS score: ~${crsScore}. CRS cut-offs vary by draw type; scores can be boosted by provincial nomination (+600 pts).`,
    })
  }

  // ── Express Entry — Federal Skilled Worker ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.workedYears >= 1) met.push(`${p.workedYears} year(s) of foreign work experience`)
    else missing.push('At least 1 year of skilled work experience required')
    if (clb7) met.push(`Language: IELTS ${p.languageScore.toFixed(1)} (CLB 7 minimum met)`)
    else missing.push('IELTS 6.0+ (CLB 7) for all 4 abilities required')
    if (p.educationLevel !== 'highschool') met.push('Post-secondary education credential (must be assessed by ECA)')
    else missing.push('Post-secondary education credential required')
    pathways.push({
      id: 'ca-ee-fsw',
      country: 'CA',
      name: 'Express Entry — Federal Skilled Worker',
      stream: 'Economic',
      description: 'For skilled workers outside Canada with foreign work experience. Must score 67/100 on the FSW eligibility grid and enter the Express Entry pool.',
      eligibility: (p.workedYears >= 1 && clb7 && p.educationLevel !== 'highschool') ? (crsScore >= 470 ? 'likely' : 'partial') : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '6 months (if invited)',
      officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html',
      notes: `Estimated CRS score: ~${crsScore}. Foreign credentials must be assessed by a designated ECA body.`,
    })
  }

  // ── PNP — Provincial Nominee ──
  {
    const met: string[] = []
    const missing: string[] = []
    met.push('Most provinces have streams for skilled workers, graduates, and entrepreneurs')
    if (p.workedYears >= 1 || p.employmentStatus === 'employed') {
      met.push('Work experience supports most PNP streams')
    }
    if (!clb7) missing.push('Many PNP streams require CLB 4–7 language proficiency')
    pathways.push({
      id: 'ca-pnp',
      country: 'CA',
      name: 'Provincial Nominee Program (PNP)',
      stream: 'Economic',
      description: 'Each province nominates immigrants who meet local labour needs. A provincial nomination adds 600 CRS points, virtually guaranteeing an Express Entry invitation.',
      eligibility: 'partial',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '6–12 months (after provincial nomination)',
      officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html',
      notes: "Check your target province's specific streams — requirements vary widely.",
    })
  }

  // ── Spousal / Family Sponsorship ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.hasSpouseCitizen || p.hasSpousePR) met.push('Spouse is a Canadian citizen or permanent resident (can sponsor)')
    else missing.push('Spouse or partner must be a Canadian citizen or PR to sponsor you')
    pathways.push({
      id: 'ca-family-sponsorship',
      country: 'CA',
      name: 'Family Sponsorship — Spouse / Partner',
      stream: 'Family',
      description: 'Canadian citizens and permanent residents can sponsor their spouse or partner for permanent residence. One of the fastest PR routes.',
      eligibility: (p.hasSpouseCitizen || p.hasSpousePR) ? 'likely' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '12 months',
      officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/spouse-partner-children.html',
    })
  }

  return pathways
}

// ──────────────────────────────────────────────────────────────────────────────

function evalAU(p: PRProfile): PRPathway[] {
  const pathways: PRPathway[] = []
  const competentEng = p.languageScore >= 6   // IELTS 6.0 in each band
  const proficientEng = p.languageScore >= 7

  // Points test score (simplified)
  let points = 0
  if (p.age >= 18 && p.age <= 24) points += 25
  else if (p.age <= 32) points += 30
  else if (p.age <= 39) points += 25
  else if (p.age <= 44) points += 15
  if (p.educationLevel === 'phd') points += 20
  else if (p.educationLevel === 'master') points += 15
  else if (p.educationLevel === 'bachelor') points += 15
  if (p.languageScore >= 8) points += 20
  else if (p.languageScore >= 7) points += 10
  else if (p.languageScore >= 6) points += 0
  if (p.workedYears >= 8) points += 15
  else if (p.workedYears >= 5) points += 10
  else if (p.workedYears >= 3) points += 5
  if (p.hasSpouseCitizen || p.hasSpousePR) points += 5
  if (p.educationLevel !== 'highschool') points += 5  // Australian study or overseas

  // ── Skilled Independent (subclass 189) ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.age < 45) met.push(`Age ${p.age} — under 45 limit`)
    else missing.push('Must be under 45 at time of invitation')
    if (competentEng) met.push(`English: IELTS ${p.languageScore.toFixed(1)} (competent level met)`)
    else missing.push('Competent English required (IELTS 6.0 in each band)')
    if (p.workedYears >= 1) met.push(`${p.workedYears} year(s) of skilled work in nominated occupation`)
    if (points >= 65) met.push(`Estimated points score: ~${points} (65 minimum threshold met)`)
    else missing.push(`Estimated points: ~${points} (minimum 65 required; actual cut-offs 90–100+)`)
    pathways.push({
      id: 'au-189',
      country: 'AU',
      name: 'Skilled Independent (subclass 189)',
      stream: 'Skilled Migration',
      description: 'Points-based permanent residence visa with no state sponsorship or employer required. Must lodge an Expression of Interest (EOI) and receive an invitation.',
      eligibility: (points >= 65 && p.age < 45 && competentEng) ? (points >= 90 ? 'likely' : 'partial') : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '8–14 months (after invitation)',
      officialUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189',
      notes: `Estimated points: ~${points}. Recent invitation rounds typically require 90+ points. Occupation must be on the Medium and Long-term Strategic Skills List (MLTSSL).`,
    })
  }

  // ── Skilled Nominated (subclass 190) ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.age < 45) met.push(`Age ${p.age} — under 45`)
    else missing.push('Must be under 45')
    if (competentEng) met.push(`English: IELTS ${p.languageScore.toFixed(1)} (competent)`)
    else missing.push('Competent English required')
    const pts190 = points + 5  // nomination worth +5
    if (pts190 >= 65) met.push(`Estimated points: ~${pts190} (with 5-pt nomination bonus; 65 minimum met)`)
    else missing.push(`Need at least 60 base points + state nomination (have ~${points})`)
    missing.push('Must receive a nomination from an Australian state or territory')
    pathways.push({
      id: 'au-190',
      country: 'AU',
      name: 'Skilled Nominated (subclass 190)',
      stream: 'Skilled Migration',
      description: 'State or territory nominates a skilled migrant. Nomination adds 5 points to the SkillSelect score. Lower cut-off scores than the 189.',
      eligibility: (points >= 60 && p.age < 45 && competentEng) ? 'partial' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '8–14 months (after state nomination + invitation)',
      officialUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190',
      notes: 'Each state has its own occupation list and requirements. Check your target state.',
    })
  }

  // ── Employer Nomination Scheme (subclass 186) ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.hasJobOffer) met.push('Employer willing to nominate')
    else missing.push('Australian employer must nominate you')
    if (p.workedYears >= 3) met.push(`${p.workedYears} years of experience in nominated occupation`)
    else missing.push('3 years of experience in the nominated occupation required')
    if (competentEng) met.push(`English: IELTS ${p.languageScore.toFixed(1)} (competent)`)
    else missing.push('Competent English required')
    if (p.age < 45) met.push(`Age ${p.age} — under 45`)
    else missing.push('Must be under 45')
    pathways.push({
      id: 'au-186',
      country: 'AU',
      name: 'Employer Nomination Scheme (subclass 186)',
      stream: 'Employer Sponsored',
      description: 'Permanent visa for skilled workers nominated by an approved Australian employer. Direct Entry or Temporary Residence Transition streams.',
      eligibility: (p.hasJobOffer && p.workedYears >= 2 && competentEng && p.age < 45) ? 'likely' : 'partial',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '6–18 months',
      officialUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/employer-nomination-scheme-186',
    })
  }

  // ── Partner visa (subclass 820/801) ──
  {
    const met: string[] = []
    const missing: string[] = []
    if (p.hasSpouseCitizen || p.hasSpousePR) met.push('Sponsor is an Australian citizen, PR, or eligible NZ citizen')
    else missing.push('Sponsor must be an Australian citizen, PR, or eligible NZ citizen')
    pathways.push({
      id: 'au-partner',
      country: 'AU',
      name: 'Partner Visa (subclass 820 / 801)',
      stream: 'Family',
      description: 'For partners of Australian citizens, permanent residents, or eligible NZ citizens. Temporary partner visa (820) leads to permanent partner visa (801) after 2+ years.',
      eligibility: (p.hasSpouseCitizen || p.hasSpousePR) ? 'likely' : 'ineligible',
      metRequirements: met,
      missingRequirements: missing,
      processingTime: '15–29 months (for permanent component)',
      officialUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/partner-onshore-820-801',
    })
  }

  return pathways
}

// ── Main export ────────────────────────────────────────────────────────────────

export function checkPREligibility(profile: PRProfile): PRPathway[] {
  const evaluators: Record<CountryCode, (p: PRProfile) => PRPathway[]> = {
    US: evalUS,
    DE: evalDE,
    UK: evalUK,
    CA: evalCA,
    AU: evalAU,
    // future countries not yet supported
    FR: () => [],
    NL: () => [],
    SE: () => [],
    CH: () => [],
    NZ: () => [],
  }
  return (evaluators[profile.country] ?? (() => []))(profile)
}

export const COUNTRY_INCOME_LABELS: Record<CountryCode, string[]> = {
  US: ['Under $25,000', '$25,000–$40,000', '$40,000–$60,000', '$60,000–$100,000', '$100,000–$200,000', 'Over $200,000'],
  DE: ['Under €20,000', '€20,000–€30,000', '€30,000–€45,000', '€45,000–€65,000', '€65,000–€100,000', 'Over €100,000'],
  UK: ['Under £20,000', '£20,000–£30,000', '£30,000–£45,000', '£45,000–£65,000', '£65,000–£100,000', 'Over £100,000'],
  CA: ['Under C$25,000', 'C$25,000–$40,000', 'C$40,000–$60,000', 'C$60,000–$90,000', 'C$90,000–$150,000', 'Over C$150,000'],
  AU: ['Under A$30,000', 'A$30,000–$50,000', 'A$50,000–$75,000', 'A$75,000–$110,000', 'A$110,000–$180,000', 'Over A$180,000'],
  FR: [], NL: [], SE: [], CH: [], NZ: [],
}

// USD equivalents for the income bands (midpoints) — used for engine comparisons
export const INCOME_USD_VALUES: Record<CountryCode, number[]> = {
  US: [15000, 32000, 50000, 80000, 150000, 250000],
  DE: [17000, 24000, 38000, 56000, 86000, 130000],
  UK: [19000, 27000, 40000, 57000, 87000, 135000],
  CA: [15000, 23000, 38000, 56000, 90000, 140000],
  AU: [17000, 29000, 46000, 64000, 99000, 155000],
  FR: [], NL: [], SE: [], CH: [], NZ: [],
}

export const LANGUAGE_OPTIONS: Record<CountryCode, { label: string; value: number }[]> = {
  US: [
    { label: 'Basic English (A1–A2)', value: 3.5 },
    { label: 'Conversational (B1)', value: 5 },
    { label: 'Proficient (B2)', value: 6 },
    { label: 'Advanced (C1)', value: 7 },
    { label: 'Fluent (C2)', value: 8.5 },
  ],
  DE: [
    { label: 'A1 — Beginner', value: 2 },
    { label: 'A2 — Elementary', value: 3.5 },
    { label: 'B1 — Intermediate', value: 5 },
    { label: 'B2 — Upper-intermediate', value: 6 },
    { label: 'C1 — Advanced', value: 7 },
    { label: 'C2 — Proficient', value: 8.5 },
  ],
  UK: [
    { label: 'A1 — Beginner', value: 2 },
    { label: 'A2 — Elementary', value: 3.5 },
    { label: 'B1 — Intermediate (IELTS 4.0–5.0)', value: 5 },
    { label: 'B2 — Upper-intermediate (IELTS 5.5–6.5)', value: 6 },
    { label: 'C1 — Advanced (IELTS 7.0+)', value: 7 },
    { label: 'C2 — Proficient (IELTS 8.0+)', value: 8.5 },
  ],
  CA: [
    { label: 'CLB 4 — Beginner (IELTS ~4.0)', value: 4 },
    { label: 'CLB 5/6 — Developing (IELTS ~5.0)', value: 5 },
    { label: 'CLB 7 — Adequate (IELTS 6.0)', value: 6 },
    { label: 'CLB 9 — Fluent (IELTS 7.0)', value: 7 },
    { label: 'CLB 10+ — Advanced (IELTS 8.0+)', value: 8 },
  ],
  AU: [
    { label: 'Functional English (IELTS 4.5)', value: 4.5 },
    { label: 'Vocational English (IELTS 5.0)', value: 5 },
    { label: 'Competent English (IELTS 6.0)', value: 6 },
    { label: 'Proficient English (IELTS 7.0)', value: 7 },
    { label: 'Superior English (IELTS 8.0+)', value: 8 },
  ],
  FR: [], NL: [], SE: [], CH: [], NZ: [],
}
