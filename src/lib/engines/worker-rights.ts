/**
 * Worker Rights data engine for the Goshen immigration platform.
 *
 * Covers immigrant-worker rights across US, DE, UK, CA, AU.
 * Fully static — no server or API required.
 */

import type { CountryCode } from '@/types'

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface KeyNumber {
  label: string
  value: string
  sub?: string
}

export interface RightItem {
  label: string
  value: string
  note?: string
}

export interface RightSection {
  heading: string
  items: RightItem[]
}

export interface RightCategory {
  id: string
  title: string
  icon: string
  sections: RightSection[]
}

export interface WorkerRightsData {
  country: CountryCode
  flag: string
  name: string
  keyNumbers: KeyNumber[]
  categories: RightCategory[]
  officialAuthority: { name: string; url: string }
  immigrantNote: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const WORKER_RIGHTS: WorkerRightsData[] = [
  // ── United States ──────────────────────────────────────────────────────────
  {
    country: 'US',
    flag: '🇺🇸',
    name: 'United States',
    keyNumbers: [
      {
        label: 'Minimum Wage',
        value: '$7.25/hr',
        sub: 'Federal; many states higher (CA $16, NY $16, WA $16.28)',
      },
      {
        label: 'Standard Work Week',
        value: '40 hours',
      },
      {
        label: 'Paid Annual Leave',
        value: 'No federal mandate',
        sub: 'Many employers offer 10+ days',
      },
      {
        label: 'Notice Period',
        value: 'None required',
        sub: 'At-will employment',
      },
      {
        label: 'Overtime Rate',
        value: '1.5x pay',
        sub: 'For hours over 40/week (FLSA)',
      },
      {
        label: "Workers' Compensation",
        value: 'Required',
        sub: 'In all 50 states',
      },
    ],
    categories: [
      {
        id: 'pay',
        title: 'Pay & Hours',
        icon: '💰',
        sections: [
          {
            heading: 'Minimum Wage',
            items: [
              {
                label: 'Federal minimum',
                value: '$7.25/hr',
                note: 'Many states set higher rates — check your state minimum.',
              },
              {
                label: 'State rates',
                value: 'CA $16, NY $16, WA $16.28 (examples)',
                note: 'Employers must pay at least the applicable state rate.',
              },
              {
                label: 'Tipped workers',
                value: 'Tip credit allowed in some states (min $2.13/hr + tips)',
                note: 'Total must still reach at least the federal or state minimum.',
              },
            ],
          },
          {
            heading: 'Overtime',
            items: [
              {
                label: 'FLSA overtime rule',
                value: '1.5x pay for all hours over 40 in a workweek',
              },
              {
                label: 'Salary threshold',
                value: 'Salaried workers earning less than $684/week must receive overtime',
              },
              {
                label: 'Exempt roles',
                value: 'Executives, administrators, and professionals above the salary threshold may be exempt',
              },
            ],
          },
          {
            heading: 'Pay Frequency & Pay Stubs',
            items: [
              {
                label: 'Pay stubs',
                value: 'Employer must provide itemised stubs showing hours worked and all deductions',
              },
              {
                label: 'Pay frequency',
                value: 'Set by employer; varies by state',
              },
              {
                label: 'Immigration status',
                value: 'Illegal to pay less than minimum wage regardless of immigration status',
              },
            ],
          },
        ],
      },
      {
        id: 'leave',
        title: 'Leave & Time Off',
        icon: '🏖️',
        sections: [
          {
            heading: 'Federal Leave (FMLA)',
            items: [
              {
                label: 'Entitlement',
                value: '12 weeks unpaid, job-protected leave per year',
                note: 'Applies to employers with 50+ employees.',
              },
              {
                label: 'Qualifying reasons',
                value: 'Serious illness, new child, or military family obligations',
              },
              {
                label: 'Eligibility',
                value: 'Must have worked for the employer for at least 12 months',
              },
            ],
          },
          {
            heading: 'Paid Leave',
            items: [
              {
                label: 'Federal mandate',
                value: 'No federal paid sick or vacation requirement',
              },
              {
                label: 'State laws',
                value: 'Many states have paid sick leave laws (CA, NY, WA, and others)',
              },
              {
                label: 'Employer policy',
                value: "Check your employer's PTO policy — many offer paid leave voluntarily",
              },
            ],
          },
        ],
      },
      {
        id: 'protection',
        title: 'Job Protection',
        icon: '🛡️',
        sections: [
          {
            heading: 'At-Will Employment',
            items: [
              {
                label: 'Default rule',
                value: 'Employer or employee can end employment at any time',
              },
              {
                label: 'Illegal reasons to fire',
                value: 'Discrimination, retaliation, jury duty, or whistle-blowing are all prohibited',
              },
            ],
          },
          {
            heading: 'Anti-Discrimination',
            items: [
              {
                label: 'Title VII',
                value: 'Prohibits discrimination based on race, color, religion, sex, or national origin',
              },
              {
                label: 'Other laws',
                value: 'ADA (disability), ADEA (age 40+), GINA (genetic information)',
              },
              {
                label: 'Complaints',
                value: 'File with the Equal Employment Opportunity Commission (EEOC)',
              },
            ],
          },
          {
            heading: 'Termination',
            items: [
              {
                label: 'Severance',
                value: 'No federal requirement for severance pay',
              },
              {
                label: 'WARN Act',
                value: '60-day notice required for mass layoffs affecting 100+ employees',
              },
              {
                label: 'State protections',
                value: 'Some states have additional termination protections',
              },
            ],
          },
        ],
      },
      {
        id: 'rights',
        title: 'Workplace Rights',
        icon: '⚖️',
        sections: [
          {
            heading: 'Union Rights',
            items: [
              {
                label: 'NLRA protection',
                value: 'National Labor Relations Act protects your right to organise, join a union, and bargain collectively',
              },
              {
                label: 'Anti-retaliation',
                value: 'Cannot be fired or disciplined for union activity',
              },
            ],
          },
          {
            heading: 'Workplace Safety',
            items: [
              {
                label: 'OSHA',
                value: 'Employer must provide a safe workplace free from recognised hazards',
              },
              {
                label: 'Unsafe work',
                value: 'Right to refuse genuinely dangerous work without retaliation',
              },
              {
                label: 'Complaints',
                value: 'Can file anonymously with OSHA; right to inspect records and hazard information',
              },
            ],
          },
          {
            heading: 'Wage Theft',
            items: [
              {
                label: 'Definition',
                value: 'Illegal to withhold earned wages, including overtime and final paychecks',
              },
              {
                label: 'Remedy',
                value: 'File a claim with the Department of Labor; back pay plus damages possible',
              },
              {
                label: 'Retaliation ban',
                value: 'Employer cannot retaliate for filing a wage claim',
              },
            ],
          },
        ],
      },
      {
        id: 'immigrant',
        title: 'Immigrant-Specific Rights',
        icon: '🌍',
        sections: [
          {
            heading: 'Immigration Status & Wages',
            items: [
              {
                label: 'FLSA applies to all',
                value: 'All workers have wage and hour rights regardless of immigration status, visa type, or documentation',
              },
              {
                label: 'No retaliation',
                value: 'Employer cannot threaten to report you to immigration authorities to deny wages or silence complaints',
              },
            ],
          },
          {
            heading: 'Work Authorization',
            items: [
              {
                label: 'Valid authorization required',
                value: 'Must have valid work authorization (H-1B, OPT, EAD, green card, etc.)',
              },
              {
                label: 'I-9 process',
                value: 'Employer must verify via Form I-9 but cannot discriminate based on national origin during the process',
              },
            ],
          },
          {
            heading: 'IRCA Protection',
            items: [
              {
                label: 'Anti-discrimination',
                value: 'Immigration Reform and Control Act prohibits discrimination based on citizenship status or national origin',
                note: 'Applies to employers with 4+ employees in hiring, firing, and recruitment.',
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: {
      name: 'U.S. Department of Labor',
      url: 'https://www.dol.gov',
    },
    immigrantNote:
      'All workers — regardless of immigration status — have the same FLSA wage and hour rights. An employer cannot threaten to report you to immigration authorities to deny wages or prevent you from exercising your rights.',
  },

  // ── Germany ────────────────────────────────────────────────────────────────
  {
    country: 'DE',
    flag: '🇩🇪',
    name: 'Germany',
    keyNumbers: [
      {
        label: 'Minimum Wage (Mindestlohn)',
        value: '€12.41/hr',
        sub: 'Gross, 2024; some sectors higher via Tarifvertrag',
      },
      {
        label: 'Standard Work Week',
        value: '40 hours',
        sub: 'Legal maximum 48 hrs/week',
      },
      {
        label: 'Paid Annual Leave',
        value: '20 days minimum',
        sub: '24 days for 6-day workers; collective agreements often give 25–30',
      },
      {
        label: 'Notice Period',
        value: '4 weeks minimum',
        sub: 'Increases with tenure up to 7 months',
      },
      {
        label: 'Overtime',
        value: 'Must be compensated',
        sub: 'Time off in lieu or paid at agreed rate',
      },
      {
        label: 'Sick Pay',
        value: '6 weeks full salary',
        sub: 'Then ~70% Krankengeld from Krankenkasse for up to 78 weeks',
      },
    ],
    categories: [
      {
        id: 'pay',
        title: 'Pay & Hours',
        icon: '💰',
        sections: [
          {
            heading: 'Minimum Wage (Mindestlohn)',
            items: [
              {
                label: 'Rate',
                value: '€12.41/hr gross (2024)',
              },
              {
                label: 'Scope',
                value: 'Applies to all workers in Germany including temporary and part-time workers',
              },
              {
                label: 'Collective agreements',
                value: 'Some Tarifvertrage (sector agreements) set higher rates; those apply instead',
              },
            ],
          },
          {
            heading: 'Working Hours (Arbeitszeitgesetz)',
            items: [
              {
                label: 'Standard hours',
                value: 'Maximum 8 hours/day, averaged to 8 over 6 months allows up to 10 hours/day',
              },
              {
                label: 'Weekly maximum',
                value: '48 hours/week',
              },
              {
                label: 'Rest periods',
                value: 'Mandatory 11-hour rest between shifts; Sunday work only permitted in specific industries',
              },
            ],
          },
          {
            heading: 'Overtime',
            items: [
              {
                label: 'Compensation required',
                value: 'All overtime must be compensated — either time off in lieu or payment at the agreed rate',
              },
              {
                label: 'Contract or agreement',
                value: 'Exact rules set by employment contract or collective agreement',
              },
              {
                label: 'Unpaid overtime',
                value: '"Voluntary" unpaid overtime is frequently illegal',
              },
            ],
          },
        ],
      },
      {
        id: 'leave',
        title: 'Leave & Time Off',
        icon: '🏖️',
        sections: [
          {
            heading: 'Annual Leave (Jahresurlaub)',
            items: [
              {
                label: 'Statutory minimum',
                value: '20 days for 5-day workers; 24 days for 6-day workers',
              },
              {
                label: 'Collective agreements',
                value: 'Often provide 25–30 days',
              },
              {
                label: 'Carry-over',
                value: 'Leave must generally be taken in the current year; carry-over requires agreement',
                note: 'Employer cannot force you to take leave during a notice period without your consent.',
              },
            ],
          },
          {
            heading: 'Sick Leave (Krankenstand)',
            items: [
              {
                label: 'Notification',
                value: 'Notify employer immediately on first day of illness',
              },
              {
                label: 'Sick note (Krankmeldung)',
                value: 'Required from day 1; some employers allow 3 days before needing a note',
              },
              {
                label: 'Employer pay',
                value: 'Full salary for up to 6 weeks',
              },
              {
                label: 'Krankenkasse pay',
                value: 'After 6 weeks, Krankenkasse pays approximately 70% for up to 78 weeks',
              },
            ],
          },
          {
            heading: 'Parental & Other Leave',
            items: [
              {
                label: 'Elternzeit',
                value: 'Up to 3 years parental leave per child per parent; job guaranteed on return',
              },
              {
                label: 'Elterngeld',
                value: '65% of net income (max €1,800/mo) available for the first 14 months; shareable between parents',
              },
              {
                label: 'Mutterschutz',
                value: '6 weeks before and 8 weeks after birth, fully paid',
              },
              {
                label: 'Other',
                value: 'Moving day (typically 1 day); marriage and bereavement — check contract or collective agreement',
              },
            ],
          },
        ],
      },
      {
        id: 'protection',
        title: 'Job Protection',
        icon: '🛡️',
        sections: [
          {
            heading: 'Unfair Dismissal (Kundigungsschutz)',
            items: [
              {
                label: 'When it applies',
                value: 'After 6 months of employment, employer needs a legally valid reason to dismiss',
              },
              {
                label: 'Valid reasons',
                value: 'Conduct, operational necessity (betriebsbedingt), or personal reasons',
              },
              {
                label: 'Formalities',
                value: 'Dismissal must be in writing; the works council (Betriebsrat) must be consulted',
              },
            ],
          },
          {
            heading: 'Notice Periods (Kundigungsfristen)',
            items: [
              {
                label: 'Initial period',
                value: '4 weeks to the 15th or end of the month',
              },
              {
                label: 'Tenure-based increases',
                value: '1 month after 2 years of service; up to 7 months after 20 years',
              },
              {
                label: 'Minimum notice',
                value: 'Statutory minimums cannot be waived by contract',
              },
            ],
          },
          {
            heading: 'Probation (Probezeit)',
            items: [
              {
                label: 'Maximum length',
                value: 'Up to 6 months',
              },
              {
                label: 'Notice during probation',
                value: '2-week notice period applies during probation',
              },
              {
                label: 'Protection',
                value: 'Kundigungsschutz does not apply during the probationary period',
              },
            ],
          },
        ],
      },
      {
        id: 'rights',
        title: 'Workplace Rights',
        icon: '⚖️',
        sections: [
          {
            heading: 'Works Council (Betriebsrat)',
            items: [
              {
                label: 'Right to elect',
                value: 'Employees can elect a works council in companies with 5 or more permanent employees',
              },
              {
                label: 'Powers',
                value: 'Council must be consulted on dismissals, overtime decisions, and major workplace changes',
              },
            ],
          },
          {
            heading: 'Equal Treatment (AGG)',
            items: [
              {
                label: 'General Equal Treatment Act',
                value: 'Prohibits discrimination based on race, ethnic origin, gender, religion, disability, age, and sexual orientation',
              },
            ],
          },
          {
            heading: 'Data Privacy',
            items: [
              {
                label: 'GDPR compliance',
                value: 'Employer must comply with GDPR in handling employee data',
              },
              {
                label: 'Personnel file',
                value: 'Right to access your own personnel file',
              },
              {
                label: 'Monitoring',
                value: 'Monitoring of work devices must be disclosed and be proportionate',
              },
            ],
          },
        ],
      },
      {
        id: 'immigrant',
        title: 'Immigrant-Specific Rights',
        icon: '🌍',
        sections: [
          {
            heading: 'Work Permit Rights',
            items: [
              {
                label: 'Equal rights',
                value: 'Third-country nationals with a valid work permit have identical labor law rights to German citizens',
              },
              {
                label: 'No exploitation',
                value: 'Employer cannot use permit dependency to deny statutory rights or underpay',
              },
            ],
          },
          {
            heading: 'Language & Integration',
            items: [
              {
                label: 'Language requirements',
                value: 'Employer cannot discriminate based on German language skills if fluency is not required for the role',
              },
              {
                label: 'Interpreter',
                value: 'Right to an interpreter in serious disciplinary proceedings if needed',
              },
            ],
          },
          {
            heading: 'Sozialversicherung (Social Insurance)',
            items: [
              {
                label: 'Automatic enrollment',
                value: 'All employees — including work permit holders — are enrolled in statutory health, pension, unemployment, and long-term care insurance',
              },
              {
                label: 'Contributions',
                value: 'Contributions are split equally between employer and employee',
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: {
      name: 'Bundesagentur fur Arbeit (Federal Employment Agency)',
      url: 'https://www.arbeitsagentur.de',
    },
    immigrantNote:
      'All workers with valid employment authorization in Germany have identical rights under German labor law as German citizens. Your employer cannot use your visa or permit status to deny rights, underpay, or threaten you.',
  },

  // ── United Kingdom ─────────────────────────────────────────────────────────
  {
    country: 'UK',
    flag: '🇬🇧',
    name: 'United Kingdom',
    keyNumbers: [
      {
        label: 'National Living Wage (21+)',
        value: '£11.44/hr',
        sub: 'April 2024; lower rates apply to younger workers and apprentices',
      },
      {
        label: 'Maximum Work Week',
        value: '48 hours',
        sub: 'Averaged over 17 weeks; can opt out in writing',
      },
      {
        label: 'Paid Annual Leave',
        value: '28 days',
        sub: 'Statutory minimum including bank holidays',
      },
      {
        label: 'Notice Period',
        value: '1 week minimum',
        sub: 'Statutory minimum; increases with tenure',
      },
      {
        label: 'Overtime Rate',
        value: 'No statutory rate',
        sub: 'Usually set by employment contract',
      },
      {
        label: 'Statutory Sick Pay',
        value: '£116.75/week',
        sub: 'For up to 28 weeks after 3 qualifying days',
      },
    ],
    categories: [
      {
        id: 'pay',
        title: 'Pay & Hours',
        icon: '💰',
        sections: [
          {
            heading: 'National Minimum/Living Wage',
            items: [
              {
                label: 'Age 21+',
                value: '£11.44/hr (National Living Wage)',
              },
              {
                label: 'Ages 18–20',
                value: '£8.60/hr',
              },
              {
                label: 'Under 18 / apprentices',
                value: '£6.40/hr',
              },
              {
                label: 'Scope',
                value: 'Legal minimums applying to all workers with valid UK work entitlement',
              },
            ],
          },
          {
            heading: 'Working Time',
            items: [
              {
                label: 'Maximum week',
                value: '48-hour average working week measured over 17 weeks; voluntary opt-out possible in writing',
              },
              {
                label: 'Night workers',
                value: 'Maximum 8 hours average per 24-hour period',
              },
              {
                label: 'Breaks',
                value: '20-minute break for shifts over 6 hours; 11-hour rest required between shifts',
              },
            ],
          },
          {
            heading: 'Pay Slips',
            items: [
              {
                label: 'Legal right',
                value: 'Itemised pay slip showing gross and net pay and all deductions',
              },
              {
                label: 'Deductions',
                value: 'Right to query deductions; employers cannot make unlawful deductions from wages',
              },
            ],
          },
        ],
      },
      {
        id: 'leave',
        title: 'Leave & Time Off',
        icon: '🏖️',
        sections: [
          {
            heading: 'Annual Leave',
            items: [
              {
                label: 'Statutory minimum',
                value: '5.6 weeks (28 days) including bank holidays',
              },
              {
                label: 'Part-time workers',
                value: 'Proportional entitlement',
              },
              {
                label: 'Accrual',
                value: 'Begins accruing from day one of employment',
              },
              {
                label: 'Carry-over',
                value: 'Cannot carry over more than 4 weeks unless agreed with employer',
              },
            ],
          },
          {
            heading: 'Sick Leave',
            items: [
              {
                label: 'Statutory Sick Pay (SSP)',
                value: '£116.75/week for up to 28 weeks; kicks in after 4 qualifying days of illness',
              },
              {
                label: 'Enhanced sick pay',
                value: 'Many employers offer more — check your contract',
              },
            ],
          },
          {
            heading: 'Family Leave',
            items: [
              {
                label: 'Maternity leave',
                value: '52 weeks total (26 ordinary + 26 additional)',
              },
              {
                label: 'Statutory Maternity Pay',
                value: '90% of average earnings for 6 weeks; then £184.03/week (or 90% if lower) for 33 weeks',
              },
              {
                label: 'Paternity leave',
                value: '2 weeks statutory paternity leave',
              },
              {
                label: 'Shared Parental Leave',
                value: 'Up to 50 weeks can be shared between eligible parents',
              },
            ],
          },
        ],
      },
      {
        id: 'protection',
        title: 'Job Protection',
        icon: '🛡️',
        sections: [
          {
            heading: 'Unfair Dismissal',
            items: [
              {
                label: 'Qualifying period',
                value: 'Right not to be unfairly dismissed after 2 years of continuous service',
              },
              {
                label: 'Fair reasons',
                value: 'Capability, conduct, redundancy, statutory bar, or other substantial reason',
              },
              {
                label: 'Procedure',
                value: 'Fair dismissal procedure must be followed regardless of reason',
              },
            ],
          },
          {
            heading: 'Redundancy',
            items: [
              {
                label: 'Statutory Redundancy Pay',
                value: 'Available after 2 years service: 1.5 weeks pay per year aged 41+; 1 week per year aged 22–40; 0.5 week per year under 22',
                note: 'Weekly pay capped at £643 (2024).',
              },
            ],
          },
          {
            heading: 'Whistleblowing',
            items: [
              {
                label: 'PIDA protection',
                value: 'Protected disclosure rights under the Public Interest Disclosure Act',
              },
              {
                label: 'Anti-retaliation',
                value: 'Cannot be dismissed or subjected to any detriment for reporting serious wrongdoing',
              },
            ],
          },
        ],
      },
      {
        id: 'rights',
        title: 'Workplace Rights',
        icon: '⚖️',
        sections: [
          {
            heading: 'Equality Act 2010',
            items: [
              {
                label: 'Protected characteristics',
                value: '9 characteristics including race, religion, sex, disability, and national origin',
              },
              {
                label: 'Scope',
                value: 'Applies to recruitment, terms of employment, and dismissal',
              },
            ],
          },
          {
            heading: 'Trade Unions',
            items: [
              {
                label: 'Right to join',
                value: 'Cannot be dismissed or disadvantaged for trade union membership',
              },
              {
                label: 'Time off',
                value: 'Right to reasonable unpaid time off for union activities if belonging to a certified union',
              },
            ],
          },
          {
            heading: 'Health & Safety',
            items: [
              {
                label: 'Safe workplace',
                value: 'Health and Safety at Work Act requires a safe working environment',
              },
              {
                label: 'Refusal',
                value: 'Right to refuse genuinely unsafe work without detriment',
              },
              {
                label: 'Information',
                value: 'Right to be informed of workplace risks; employers must conduct risk assessments',
              },
            ],
          },
        ],
      },
      {
        id: 'immigrant',
        title: 'Immigrant-Specific Rights',
        icon: '🌍',
        sections: [
          {
            heading: 'Right to Work',
            items: [
              {
                label: 'Employer check',
                value: 'Employer must verify right to work before employment begins',
              },
              {
                label: 'No effect on rights',
                value: 'This check does not reduce your entitlement to NMW, leave, or other statutory rights once employed',
              },
            ],
          },
          {
            heading: 'EEA Workers Post-Brexit',
            items: [
              {
                label: 'EU Settlement Scheme',
                value: 'EU/EEA citizens needed to apply by June 2021; pre-settled and settled status holders have full employment rights',
              },
            ],
          },
          {
            heading: 'No Recourse to Public Funds (NRPF)',
            items: [
              {
                label: 'NRPF explained',
                value: 'NRPF visa condition affects benefits only — it does not affect your employment rights',
              },
              {
                label: 'Tribunal access',
                value: 'You can still work and access employment tribunals regardless of NRPF status',
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: {
      name: 'UK Employment Tribunal / ACAS',
      url: 'https://www.acas.org.uk',
    },
    immigrantNote:
      'All workers legally entitled to work in the UK have full employment rights from day one of employment, regardless of visa type. Your employer cannot use your immigration status to deny NMW, leave, or other statutory rights.',
  },

  // ── Canada ─────────────────────────────────────────────────────────────────
  {
    country: 'CA',
    flag: '🇨🇦',
    name: 'Canada',
    keyNumbers: [
      {
        label: 'Federal Minimum Wage',
        value: 'C$17.30/hr',
        sub: '2024; provinces set their own (ON C$17.20, BC C$17.40, AB C$15.00)',
      },
      {
        label: 'Standard Work Week',
        value: '40 hours',
        sub: 'Canada Labour Code; max 48 hrs/week',
      },
      {
        label: 'Paid Vacation',
        value: '2 weeks',
        sub: 'After 1 year; rises to 3 weeks after 5 years',
      },
      {
        label: 'Notice Period',
        value: 'Varies with service',
        sub: '2 weeks common; common law may require more',
      },
      {
        label: 'Overtime Rate',
        value: '1.5x pay',
        sub: 'After 8 hrs/day or 40 hrs/week (federally regulated workers)',
      },
      {
        label: 'Sick Leave',
        value: '10 days paid',
        sub: 'Per year under Canada Labour Code (federally regulated)',
      },
    ],
    categories: [
      {
        id: 'pay',
        title: 'Pay & Hours',
        icon: '💰',
        sections: [
          {
            heading: 'Minimum Wage',
            items: [
              {
                label: 'Federal rate',
                value: 'C$17.30/hr (2024) for federally regulated industries',
              },
              {
                label: 'Provincial rates',
                value: 'Ontario C$17.20; BC C$17.40; Alberta C$15.00 — provincial rules apply to most workers',
              },
              {
                label: 'Scope',
                value: 'Applies to all employees regardless of immigration status',
              },
            ],
          },
          {
            heading: 'Working Hours',
            items: [
              {
                label: 'Standard hours',
                value: '8 hours/day; 40 hours/week',
              },
              {
                label: 'Maximum',
                value: '48 hours/week under Canada Labour Code',
              },
              {
                label: 'Overtime',
                value: '1.5x after 8 hours/day or 40 hours/week for federally regulated workers',
              },
            ],
          },
          {
            heading: 'Pay Frequency',
            items: [
              {
                label: 'Frequency',
                value: 'Must be paid at least semi-monthly',
              },
              {
                label: 'Pay stubs',
                value: 'Required showing earnings and all deductions',
              },
              {
                label: 'Deductions',
                value: 'Employers cannot make unauthorized deductions from wages',
              },
            ],
          },
        ],
      },
      {
        id: 'leave',
        title: 'Leave & Time Off',
        icon: '🏖️',
        sections: [
          {
            heading: 'Vacation Leave',
            items: [
              {
                label: 'Year 1–4',
                value: '2 weeks paid vacation (or 4% vacation pay accrued)',
              },
              {
                label: 'Year 5+',
                value: '3 weeks paid vacation',
                note: 'Provincial rules may be more generous.',
              },
            ],
          },
          {
            heading: 'Sick Leave',
            items: [
              {
                label: 'Federal (Canada Labour Code)',
                value: '10 days paid personal leave/year',
              },
              {
                label: 'Provincial',
                value: 'Ontario: 3 days; BC: 5 days — varies by province',
              },
              {
                label: 'EI sickness benefits',
                value: 'Up to 15 weeks at 55% of insurable earnings through Employment Insurance',
              },
            ],
          },
          {
            heading: 'Family Leave',
            items: [
              {
                label: 'EI maternity',
                value: '15 weeks maternity benefits',
              },
              {
                label: 'EI parental',
                value: '35 weeks standard or 61 weeks extended parental benefits; shared between parents',
              },
              {
                label: 'Other EI benefits',
                value: 'Family caregiver and compassionate care benefits available under EI',
              },
            ],
          },
          {
            heading: 'Statutory Holidays',
            items: [
              {
                label: 'Federal holidays',
                value: '10 federal statutory holidays; provinces may add more',
              },
              {
                label: 'Entitlement',
                value: 'Day off with regular pay, or premium pay if required to work (varies by province)',
              },
            ],
          },
        ],
      },
      {
        id: 'protection',
        title: 'Job Protection',
        icon: '🛡️',
        sections: [
          {
            heading: 'Unjust Dismissal',
            items: [
              {
                label: 'Federal workers',
                value: 'After 12 months service, can file an unjust dismissal complaint under the Canada Labour Code',
              },
              {
                label: 'Provinces',
                value: 'Most provinces require just cause for dismissal or reasonable notice',
              },
              {
                label: 'Severance',
                value: '2 days per year of service under Canada Labour Code',
              },
            ],
          },
          {
            heading: 'Notice & Severance',
            items: [
              {
                label: 'Minimum notice (CLC)',
                value: '2 weeks after 1 year of service; varies by province',
              },
              {
                label: 'Common law',
                value: 'Common law reasonable notice can be substantially longer than statutory minimums',
              },
            ],
          },
          {
            heading: 'Human Rights',
            items: [
              {
                label: 'Canadian Human Rights Act',
                value: 'Prohibits discrimination on 13 grounds including race, national/ethnic origin, religion, age, sex, sexual orientation, and disability',
                note: 'Applies in federally regulated workplaces; provinces have equivalent legislation.',
              },
            ],
          },
        ],
      },
      {
        id: 'rights',
        title: 'Workplace Rights',
        icon: '⚖️',
        sections: [
          {
            heading: 'Unions',
            items: [
              {
                label: 'Right to organise',
                value: 'Right to organise and join a union under the Canada Labour Code',
              },
              {
                label: 'Anti-discrimination',
                value: 'Protected from anti-union discrimination by employer',
              },
              {
                label: 'Collective bargaining',
                value: 'Right to collective bargaining once a union is certified',
              },
            ],
          },
          {
            heading: 'Occupational Health & Safety',
            items: [
              {
                label: 'Right to refuse',
                value: 'Canada Labour Code Part II: right to refuse dangerous work',
              },
              {
                label: 'Right to know',
                value: 'Right to be informed about workplace hazards',
              },
              {
                label: 'Joint committees',
                value: 'Joint health and safety committees required in workplaces with 20 or more employees',
              },
            ],
          },
          {
            heading: 'Pay Equity',
            items: [
              {
                label: 'Pay equity legislation',
                value: 'Requires equal pay for work of equal value regardless of gender in the federally regulated sector',
              },
            ],
          },
        ],
      },
      {
        id: 'immigrant',
        title: 'Immigrant-Specific Rights',
        icon: '🌍',
        sections: [
          {
            heading: 'Work Permit Holders',
            items: [
              {
                label: 'Equal rights',
                value: 'All workers with valid work authorization have the same employment rights under federal and provincial standards',
              },
              {
                label: 'No exploitation',
                value: 'Immigration status cannot be used by an employer to avoid paying wages or deny rights',
              },
            ],
          },
          {
            heading: 'Open vs. Closed Work Permits',
            items: [
              {
                label: 'Open permit',
                value: 'Open work permit holders can work for any employer',
              },
              {
                label: 'Closed permit',
                value: 'Closed permit holders are tied to a specific employer — but the same labor rights still apply',
              },
              {
                label: 'Reporting violations',
                value: 'Can report employer violations without losing immigration status',
              },
            ],
          },
          {
            heading: 'Temporary Foreign Worker Program (TFWP)',
            items: [
              {
                label: 'Standards apply',
                value: 'Same provincial employment standards apply to all TFWP workers',
              },
              {
                label: 'Federal conditions',
                value: 'Employers who recruit temporary foreign workers must comply with specific federal conditions',
              },
              {
                label: 'Helpline',
                value: 'Can contact Employment and Social Development Canada helpline for assistance',
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: {
      name: 'Employment and Social Development Canada',
      url: 'https://www.canada.ca/en/employment-social-development.html',
    },
    immigrantNote:
      'All employees with valid Canadian work authorization — including those on temporary work permits — have the same rights under federal and provincial employment standards as Canadian citizens. Employers who use immigration status to underpay or threaten workers are violating the law.',
  },

  // ── Australia ──────────────────────────────────────────────────────────────
  {
    country: 'AU',
    flag: '🇦🇺',
    name: 'Australia',
    keyNumbers: [
      {
        label: 'National Minimum Wage',
        value: 'A$23.23/hr',
        sub: 'Or A$882.80/week — July 2024; award rates may be higher',
      },
      {
        label: 'Standard Work Week',
        value: '38 ordinary hours',
      },
      {
        label: 'Paid Annual Leave',
        value: '4 weeks (20 days)',
        sub: '17.5% leave loading applies in many awards',
      },
      {
        label: 'Notice Period',
        value: '1–4 weeks',
        sub: 'Varies with tenure; over 45s with 2+ years get an extra week',
      },
      {
        label: 'Overtime / Penalty Rates',
        value: '1.5x to 2.5x',
        sub: 'Overtime, weekends, and public holidays attract penalty rates',
      },
      {
        label: "Personal/Carer's Leave",
        value: '10 days paid',
        sub: 'Per year under National Employment Standards',
      },
    ],
    categories: [
      {
        id: 'pay',
        title: 'Pay & Hours',
        icon: '💰',
        sections: [
          {
            heading: 'National Minimum Wage',
            items: [
              {
                label: 'Rate',
                value: 'A$23.23/hr or A$882.80/week (July 2024)',
              },
              {
                label: 'Awards',
                value: 'Modern award rates may be higher for specific industries; those apply instead',
              },
              {
                label: 'Scope',
                value: 'Applies to all workers including visa holders; cannot be undercut by any individual agreement',
              },
            ],
          },
          {
            heading: 'Penalty Rates',
            items: [
              {
                label: 'Overtime / Saturday',
                value: '1.5x ordinary time (common; check your award)',
              },
              {
                label: 'Sunday',
                value: '2x ordinary time (common; check your award)',
              },
              {
                label: 'Public holidays',
                value: '2.5x ordinary time (common; check your award)',
              },
              {
                label: 'Shift work',
                value: 'Higher rates apply; exact amounts set in the relevant modern award',
              },
            ],
          },
          {
            heading: 'Pay Slips',
            items: [
              {
                label: 'Timing',
                value: 'Must receive payslip within 1 working day of pay day',
              },
              {
                label: 'Content',
                value: 'Must show pay rate, hours worked, tax withheld, and superannuation',
              },
              {
                label: 'Errors',
                value: 'Contact the Fair Work Ombudsman if pay is incorrect',
              },
            ],
          },
        ],
      },
      {
        id: 'leave',
        title: 'Leave & Time Off',
        icon: '🏖️',
        sections: [
          {
            heading: 'Annual Leave',
            items: [
              {
                label: 'Entitlement',
                value: '4 weeks (20 days) paid annual leave per year under the Fair Work Act',
              },
              {
                label: 'Accrual',
                value: 'Accrues progressively throughout the year',
              },
              {
                label: 'Leave loading',
                value: '17.5% annual leave loading applies in many awards',
              },
              {
                label: 'Cash-out restriction',
                value: 'Leave cannot be cashed out if the balance would fall below 4 weeks',
              },
            ],
          },
          {
            heading: "Personal/Carer's Leave",
            items: [
              {
                label: 'Entitlement',
                value: "10 days paid personal leave per year (covers sick leave and carer's leave)",
              },
              {
                label: 'Evidence',
                value: 'Employer may request reasonable evidence',
              },
              {
                label: "Unpaid carer's leave",
                value: 'Available once paid entitlement is exhausted',
              },
            ],
          },
          {
            heading: 'Parental Leave',
            items: [
              {
                label: 'Government-funded pay',
                value: 'Up to 22 weeks Parental Leave Pay at NMW rate',
              },
              {
                label: 'Unpaid leave',
                value: 'Up to 12 months unpaid parental leave, extendable to 24 months; both parents eligible',
              },
            ],
          },
          {
            heading: 'Other Leave',
            items: [
              {
                label: 'Compassionate leave',
                value: '2 days paid (or unpaid where not yet accrued) per occasion',
              },
              {
                label: 'Family and domestic violence leave',
                value: '10 days paid leave per year',
              },
              {
                label: 'Community service leave',
                value: 'Unpaid leave for jury service and voluntary emergency management',
              },
            ],
          },
        ],
      },
      {
        id: 'protection',
        title: 'Job Protection',
        icon: '🛡️',
        sections: [
          {
            heading: 'Unfair Dismissal',
            items: [
              {
                label: 'Qualifying period',
                value: '6 months for large employers; 1 year for small employers (fewer than 15 employees)',
              },
              {
                label: 'Test',
                value: 'Dismissal must not be harsh, unjust, or unreasonable',
              },
              {
                label: 'Forum',
                value: 'Apply to the Fair Work Commission',
              },
            ],
          },
          {
            heading: 'General Protections',
            items: [
              {
                label: 'Day-one protection',
                value: 'Cannot be dismissed or adversely treated for exercising a workplace right, union membership, or a protected attribute',
                note: 'No minimum employment period required for general protections claims.',
              },
              {
                label: 'Protected attributes',
                value: 'Includes illness, discrimination grounds, and engaging in industrial activity',
              },
            ],
          },
          {
            heading: 'Notice of Termination',
            items: [
              {
                label: 'Up to 1 year',
                value: '1 week notice',
              },
              {
                label: '1–3 years',
                value: '2 weeks notice',
              },
              {
                label: '3–5 years',
                value: '3 weeks notice',
              },
              {
                label: '5+ years',
                value: '4 weeks notice',
                note: 'Workers over 45 with 2 or more years service receive an extra 1 week.',
              },
            ],
          },
        ],
      },
      {
        id: 'rights',
        title: 'Workplace Rights',
        icon: '⚖️',
        sections: [
          {
            heading: 'Fair Work Act',
            items: [
              {
                label: 'National Employment Standards (NES)',
                value: 'Set 11 minimum entitlements that apply to all national system employees',
              },
              {
                label: 'Modern awards',
                value: 'Add industry or occupation-specific conditions on top of the NES',
              },
              {
                label: 'Enterprise agreements',
                value: 'May provide additional benefits but cannot undercut the NES or award',
              },
            ],
          },
          {
            heading: 'Unions',
            items: [
              {
                label: 'Right to join',
                value: 'Right to join a union and participate in lawful industrial action',
              },
              {
                label: 'Access',
                value: 'Employers cannot prevent union officials from accessing the workplace in accordance with the law',
              },
            ],
          },
          {
            heading: 'Superannuation',
            items: [
              {
                label: 'Employer contribution',
                value: 'Employer must contribute 11% of ordinary time earnings to super (2024; rising to 12% by 2025)',
              },
              {
                label: 'Scope',
                value: 'Applies to all eligible workers including most visa holders',
              },
            ],
          },
          {
            heading: 'Workplace Safety',
            items: [
              {
                label: 'WHS laws',
                value: 'Work Health and Safety legislation in each state and territory',
              },
              {
                label: 'Refusal',
                value: 'Right to refuse unsafe work',
              },
              {
                label: "Workers' compensation",
                value: "Mandatory workers' compensation insurance in all jurisdictions",
              },
            ],
          },
        ],
      },
      {
        id: 'immigrant',
        title: 'Immigrant-Specific Rights',
        icon: '🌍',
        sections: [
          {
            heading: 'Visa Holder Rights',
            items: [
              {
                label: 'Full NES entitlements',
                value: 'All visa holders with work rights have the same National Employment Standards as Australian citizens',
              },
              {
                label: 'Minimum wage',
                value: 'Cannot be paid below the minimum wage regardless of visa type or any agreement',
              },
            ],
          },
          {
            heading: 'Working Holiday Makers',
            items: [
              {
                label: 'Full protections',
                value: '417 and 462 visa holders have full Fair Work Act protections',
              },
              {
                label: 'Exploitation is illegal',
                value: 'Report to the Fair Work Ombudsman; employer exploitation can attract significant fines',
              },
              {
                label: '88-day requirement',
                value: 'Regional work requirement for visa extensions must be for approved work; does not reduce your employment rights',
              },
            ],
          },
          {
            heading: 'Migration Status & Reporting',
            items: [
              {
                label: 'Safe reporting',
                value: 'Fair Work Ombudsman assists visa holders without risk to their visa in most cases',
              },
              {
                label: 'Anonymous tip-off',
                value: 'Anonymous tip-off line available for reporting workplace breaches',
              },
            ],
          },
          {
            heading: 'Departing Australia Superannuation Payment (DASP)',
            items: [
              {
                label: 'Claiming back super',
                value: 'Temporary residents can claim accumulated super when they leave Australia permanently',
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: {
      name: 'Fair Work Ombudsman',
      url: 'https://www.fairwork.gov.au',
    },
    immigrantNote:
      'All workers in Australia — regardless of visa type — are entitled to the same minimum conditions under the Fair Work Act. Employers who exploit workers on visas can face significant fines. The Fair Work Ombudsman helps visa holders enforce rights without risk to their visa.',
  },
]

// ── Helper ────────────────────────────────────────────────────────────────────

export function getWorkerRights(country: CountryCode): WorkerRightsData | undefined {
  return WORKER_RIGHTS.find((d) => d.country === country)
}
