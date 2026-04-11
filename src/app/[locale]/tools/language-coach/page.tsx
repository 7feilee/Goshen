'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Phrase {
  phrase: string
  meaning: string
  pronunciation?: string
  context?: string
}

interface PhraseCategory {
  id: string
  label: string
  icon: string
  phrases: Phrase[]
}

interface LanguageData {
  language: string
  languageNative: string
  flag: string
  country: string
  categories: PhraseCategory[]
}

// ── Phrase banks ──────────────────────────────────────────────────────────────

const PHRASE_BANKS: Record<string, LanguageData> = {
  DE: {
    language: 'German',
    languageNative: 'Deutsch',
    flag: '🇩🇪',
    country: 'Germany',
    categories: [
      {
        id: 'greetings',
        label: 'Greetings',
        icon: '👋',
        phrases: [
          { phrase: 'Guten Morgen / Guten Tag / Guten Abend', meaning: 'Good morning / Good day / Good evening', pronunciation: 'GOO-ten MOR-gen / GOO-ten TAHK / GOO-ten AH-bent' },
          { phrase: 'Wie geht es Ihnen? / Wie geht\'s?', meaning: 'How are you? (formal) / How\'s it going? (informal)', pronunciation: 'Vee GAYT es EE-nen / Vee GAYTS' },
          { phrase: 'Danke schon / Bitte', meaning: 'Thank you / Please / You\'re welcome', pronunciation: 'DANK-uh SHURN / BIT-uh' },
          { phrase: 'Entschuldigung', meaning: 'Excuse me / I\'m sorry', pronunciation: 'Ent-SHOOL-dee-goong', context: 'Use to get attention or apologize' },
          { phrase: 'Ich verstehe nicht', meaning: 'I don\'t understand', pronunciation: 'Ikh fair-SHTAY-uh nikht', context: 'Ask someone to repeat or slow down' },
          { phrase: 'Konnten Sie das bitte wiederholen?', meaning: 'Could you please repeat that?', pronunciation: 'KONN-ten zee das BIT-uh VEE-der-hoh-len', context: 'Polite request to repeat' },
        ],
      },
      {
        id: 'emergency',
        label: 'Emergency',
        icon: '🚨',
        phrases: [
          { phrase: 'Hilfe! / Notruf!', meaning: 'Help! / Emergency!', pronunciation: 'HIL-fuh / NOHT-roof' },
          { phrase: 'Bitte rufen Sie die Polizei an', meaning: 'Please call the police', pronunciation: 'BIT-uh ROO-fen zee dee po-li-TSAY an' },
          { phrase: 'Ich brauche einen Arzt', meaning: 'I need a doctor', pronunciation: 'Ikh BROW-khuh EYE-nen ARTST' },
          { phrase: 'Bitte rufen Sie den Krankenwagen', meaning: 'Please call an ambulance', pronunciation: 'BIT-uh ROO-fen zee den KRANK-en-vah-gen' },
          { phrase: 'Wo ist das nachste Krankenhaus?', meaning: 'Where is the nearest hospital?', pronunciation: 'Voh ist das NEKH-stuh KRANK-en-howz' },
          { phrase: 'Ich bin allergisch gegen...', meaning: 'I am allergic to...', pronunciation: 'Ikh bin al-LAIR-gish GAY-gen', context: 'Follow with the allergen' },
        ],
      },
      {
        id: 'work',
        label: 'Work & Office',
        icon: '💼',
        phrases: [
          { phrase: 'Ich habe einen Termin bei...', meaning: 'I have an appointment with...', pronunciation: 'Ikh HAH-buh EYE-nen tair-MEEN by' },
          { phrase: 'Konnen Sie das bitte erklaren?', meaning: 'Could you explain that please?', pronunciation: 'KONN-en zee das BIT-uh air-KLAIR-en' },
          { phrase: 'Wie lautet Ihre E-Mail-Adresse?', meaning: 'What is your email address?', pronunciation: 'Vee LOW-tet EE-ruh ee-MAL ah-DRESS-uh' },
          { phrase: 'Ich bin auf der Suche nach Arbeit', meaning: 'I am looking for work', pronunciation: 'Ikh bin owf dair ZOO-khuh nakh AR-byte' },
          { phrase: 'Was sind meine Aufgaben?', meaning: 'What are my duties/tasks?', pronunciation: 'Vas zint MY-nuh OWF-gah-ben' },
          { phrase: 'Konnen wir das Gesprach verschieben?', meaning: 'Can we reschedule this meeting?', pronunciation: 'KONN-en veer das guh-SHPREKH fair-SHEE-ben' },
        ],
      },
      {
        id: 'transport',
        label: 'Transport',
        icon: '🚇',
        phrases: [
          { phrase: 'Wo ist der Bahnhof / Busbahnhof?', meaning: 'Where is the train station / bus station?', pronunciation: 'Voh ist dair BAHN-hof / BOOS-bahn-hof' },
          { phrase: 'Einen Fahrschein nach [Stadt] bitte', meaning: 'A ticket to [city], please', pronunciation: 'EYE-nen FAR-shyne nakh [shtaht] BIT-uh' },
          { phrase: 'Wann fahrt der nachste Zug nach...?', meaning: 'When does the next train to... depart?', pronunciation: 'Van fairt dair NEKH-stuh tsook nakh' },
          { phrase: 'Bitte halten Sie hier an', meaning: 'Please stop here', pronunciation: 'BIT-uh HAL-ten zee heer an', context: 'In a taxi' },
          { phrase: 'Ich habe mich verfahren / verlaufen', meaning: 'I am lost (by car / on foot)', pronunciation: 'Ikh HAH-buh mikh fair-FAR-en / fair-LOW-fen' },
          { phrase: 'Wie lange dauert die Fahrt?', meaning: 'How long does the journey take?', pronunciation: 'Vee LANG-uh DOW-ert dee fahrt' },
        ],
      },
      {
        id: 'housing',
        label: 'Housing & Admin',
        icon: '🏠',
        phrases: [
          { phrase: 'Ich mochte eine Wohnung mieten', meaning: 'I would like to rent an apartment', pronunciation: 'Ikh MUKH-tuh EYE-nuh VOH-noong MEE-ten' },
          { phrase: 'Ich muss mich anmelden', meaning: 'I need to register my address (Anmeldung)', pronunciation: 'Ikh moos mikh AN-mel-den', context: 'Mandatory within 14 days of moving' },
          { phrase: 'Wo ist das Burgeramt?', meaning: 'Where is the citizens\' registration office?', pronunciation: 'Voh ist das BUR-ger-amt' },
          { phrase: 'Ich benotige einen Dolmetscher', meaning: 'I need an interpreter', pronunciation: 'Ikh buh-NUE-ti-guh EYE-nen DOHL-met-sher' },
          { phrase: 'Kann ich einen Termin machen?', meaning: 'Can I make an appointment?', pronunciation: 'Kan ikh EYE-nen tair-MEEN MAH-khen' },
          { phrase: 'Was sind die Betriebskosten?', meaning: 'What are the utility costs?', pronunciation: 'Vas zint dee buh-TREEPS-koss-ten', context: 'Important to ask when renting' },
        ],
      },
    ],
  },

  // US/UK/CA/AU — Survival English for immigrants
  US: {
    language: 'English',
    languageNative: 'English',
    flag: '🇺🇸',
    country: 'United States',
    categories: [
      {
        id: 'greetings',
        label: 'Greetings & Small Talk',
        icon: '👋',
        phrases: [
          { phrase: 'Nice to meet you', meaning: 'Greeting when meeting someone for the first time', context: 'Formal and informal — always polite to say this' },
          { phrase: 'Could you speak more slowly, please?', meaning: 'Asking someone to slow down', context: 'Completely normal and respectful to say' },
          { phrase: 'I\'m still learning English, please be patient', meaning: 'Setting expectations politely', context: 'People are generally very understanding' },
          { phrase: 'Could you write that down?', meaning: 'Asking for written confirmation', context: 'Very useful for addresses, names, numbers' },
          { phrase: 'I beg your pardon? / Could you repeat that?', meaning: 'Asking someone to repeat themselves', context: '"Pardon?" alone also works' },
          { phrase: 'What does ___ mean?', meaning: 'Asking for a word definition', context: 'Never feel embarrassed to ask' },
        ],
      },
      {
        id: 'emergency',
        label: 'Emergency',
        icon: '🚨',
        phrases: [
          { phrase: 'Call 911!', meaning: 'Emergency number for police, fire, ambulance', context: 'Say your address immediately after connecting' },
          { phrase: 'I need a doctor / I need an ambulance', meaning: 'Medical emergency', context: 'Keep your insurance card accessible' },
          { phrase: 'I have a medical emergency', meaning: 'Urgent medical situation', context: 'Say this at any hospital or urgent care' },
          { phrase: 'I am allergic to ___', meaning: 'Important medical allergy information', context: 'Fill in: penicillin, nuts, latex, etc.' },
          { phrase: 'Please call the police', meaning: 'Request police assistance', context: 'You have the right to call police regardless of immigration status' },
          { phrase: 'I need a translator', meaning: 'Request language assistance', context: 'Hospitals and courts must provide interpreters' },
        ],
      },
      {
        id: 'work',
        label: 'Work & Office',
        icon: '💼',
        phrases: [
          { phrase: 'I have a question about my paycheck / schedule', meaning: 'Asking HR or manager about pay or hours', context: 'Your right to ask — employers must explain' },
          { phrase: 'Could I take a sick day?', meaning: 'Requesting a day off for illness', context: 'Follow your employer\'s procedure — email is often required' },
          { phrase: 'I\'d like to discuss my responsibilities', meaning: 'Initiating a conversation about your role', context: 'Professional way to clarify or expand your duties' },
          { phrase: 'When is the deadline for this?', meaning: 'Asking about due dates', context: 'Always good to confirm in writing' },
          { phrase: 'I\'d like to request feedback on my performance', meaning: 'Asking for a performance review', context: 'Proactive phrase that shows initiative' },
          { phrase: 'Is this overtime pay?', meaning: 'Asking about compensation for extra hours', context: 'Know your rights: 1.5x pay after 40 hrs/week (federal)' },
        ],
      },
      {
        id: 'healthcare',
        label: 'Healthcare',
        icon: '🏥',
        phrases: [
          { phrase: 'I need to see a doctor', meaning: 'Basic request for medical care', context: 'Say this at urgent care, clinic, or ER' },
          { phrase: 'I\'m insured through [employer/Medicaid/etc.]', meaning: 'Stating your insurance coverage', context: 'Always bring your insurance card' },
          { phrase: 'What is my copay / deductible?', meaning: 'Asking about your out-of-pocket cost', context: 'Always ask before treatment if possible' },
          { phrase: 'Can I get a prescription for this?', meaning: 'Asking the doctor for medication', context: 'Prescriptions are needed for most medications' },
          { phrase: 'Do you have an interpreter service?', meaning: 'Requesting language assistance', context: 'Federally funded providers must offer this for free' },
          { phrase: 'Can I see my medical records?', meaning: 'Requesting access to your health files', context: 'HIPAA right — providers must give these to you' },
        ],
      },
      {
        id: 'rights',
        label: 'Know Your Rights',
        icon: '⚖️',
        phrases: [
          { phrase: 'I do not consent to a search', meaning: 'Asserting Fourth Amendment rights', context: 'Remain calm, say clearly, do not physically resist' },
          { phrase: 'Am I being detained or am I free to go?', meaning: 'Clarifying your legal status during police stop', context: 'Must be answered by the officer' },
          { phrase: 'I want to speak with a lawyer', meaning: 'Invoking your right to legal counsel', context: 'Do not answer questions until you have a lawyer' },
          { phrase: 'I need to see your warrant', meaning: 'Requesting documentation for a search', context: 'Officers must have a warrant to enter your home' },
          { phrase: 'I will remain silent', meaning: 'Invoking your Fifth Amendment right', context: 'You cannot be penalized for staying silent' },
          { phrase: 'I need to contact my consulate', meaning: 'Right to contact home country consulate', context: 'Vienna Convention right — must be granted on request' },
        ],
      },
    ],
  },
  UK: {
    language: 'British English',
    languageNative: 'English',
    flag: '🇬🇧',
    country: 'United Kingdom',
    categories: [
      {
        id: 'greetings',
        label: 'Greetings & Etiquette',
        icon: '👋',
        phrases: [
          { phrase: 'How do you do? / How are you?', meaning: 'Formal / informal greeting', context: '"How do you do?" is very formal — respond with the same phrase' },
          { phrase: 'Cheers / Ta', meaning: 'Thank you (informal)', context: 'Very common in everyday British speech' },
          { phrase: 'Excuse me, could you help me?', meaning: 'Politely getting someone\'s attention', context: 'British people value politeness — always use "excuse me"' },
          { phrase: 'I\'m sorry, I didn\'t catch that', meaning: 'Asking someone to repeat themselves', context: 'More natural than "pardon?" in everyday speech' },
          { phrase: 'Could you speak a bit more slowly, please?', meaning: 'Asking someone to slow down', context: 'Perfectly acceptable — accents vary widely across the UK' },
          { phrase: 'I\'m still getting used to the accent here', meaning: 'Light, friendly explanation', context: 'British people will often slow down and be very helpful' },
        ],
      },
      {
        id: 'emergency',
        label: 'Emergency',
        icon: '🚨',
        phrases: [
          { phrase: 'Call 999 / 112!', meaning: 'UK emergency number (police, fire, ambulance)', context: '112 is the EU standard that also works in UK' },
          { phrase: 'I need an ambulance, please', meaning: 'Requesting emergency medical help', context: 'Give your address immediately' },
          { phrase: 'Ring 111 for non-emergency NHS', meaning: 'Non-emergency medical advice line', context: '111 is free, 24/7, for urgent but not life-threatening issues' },
          { phrase: 'I need to go to A&E', meaning: 'Accident & Emergency (ER equivalent)', context: 'A&E = Emergency Room. All hospitals have one.' },
          { phrase: 'I have a severe allergy to ___', meaning: 'Medical allergy alert', context: 'Wear a medical bracelet if you have severe allergies' },
          { phrase: 'I need a duty solicitor', meaning: 'Requesting a free emergency lawyer', context: 'If arrested, you have the right to a free duty solicitor' },
        ],
      },
      {
        id: 'nhs',
        label: 'NHS & Healthcare',
        icon: '🏥',
        phrases: [
          { phrase: 'I\'d like to register with a GP', meaning: 'Registering with a local doctor', context: 'Find your local surgery at nhs.uk. Free for those with right to work.' },
          { phrase: 'I need to make an appointment with my GP', meaning: 'Booking a doctor\'s appointment', context: 'Ring your surgery or book online through NHS App' },
          { phrase: 'I\'m entitled to free NHS treatment', meaning: 'Confirming your NHS entitlement', context: 'Most migrants on long-term visas pay the Immigration Health Surcharge' },
          { phrase: 'I need an NHS interpreter', meaning: 'Requesting language support', context: 'NHS must provide free interpreting services' },
          { phrase: 'Could I have a fit note please?', meaning: 'Requesting a sick note for your employer', context: 'Formerly called a sick note — needed for Statutory Sick Pay' },
          { phrase: 'What\'s my prescription charge?', meaning: 'Asking about medication cost', context: 'Flat fee £9.90/item (2024), free in Scotland/Wales and for exempt groups' },
        ],
      },
      {
        id: 'work',
        label: 'Work',
        icon: '💼',
        phrases: [
          { phrase: 'Could I have a payslip, please?', meaning: 'Requesting your pay record', context: 'Legal right — employer must provide itemised payslip' },
          { phrase: 'What is the company\'s holiday policy?', meaning: 'Asking about annual leave', context: 'Legal minimum 28 days including bank holidays' },
          { phrase: 'I\'d like to raise a concern about ___ ', meaning: 'Starting a workplace complaint', context: 'Can use ACAS helpline if issue unresolved: 0300 123 1100' },
          { phrase: 'Am I on the correct minimum wage rate?', meaning: 'Checking your pay is lawful', context: 'National Living Wage £11.44/hr (25+), April 2024' },
          { phrase: 'I would like to request a reference letter', meaning: 'Asking for a work reference', context: 'Useful for future job applications and tenancy checks' },
          { phrase: 'I\'d like to report a health and safety issue', meaning: 'Raising a workplace safety concern', context: 'Cannot be dismissed for raising H&S concerns' },
        ],
      },
      {
        id: 'housing',
        label: 'Housing',
        icon: '🏠',
        phrases: [
          { phrase: 'Could I see the tenancy agreement before signing?', meaning: 'Requesting to review the contract', context: 'Always read the full AST (Assured Shorthold Tenancy) before signing' },
          { phrase: 'What is included in the rent?', meaning: 'Asking about bills and utilities', context: 'Clarify: council tax, gas, electricity, internet' },
          { phrase: 'I need to report a repair', meaning: 'Notifying landlord of a maintenance issue', context: 'Do this in writing (text or email) for your protection' },
          { phrase: 'Is my deposit in a protected scheme?', meaning: 'Checking legal deposit protection', context: 'Landlords must protect deposits in DPS, MyDeposits, or TDS' },
          { phrase: 'I\'d like a receipt for my rent payment', meaning: 'Requesting payment confirmation', context: 'Good practice — especially for cash payments' },
          { phrase: 'Can you recommend a local letting agent?', meaning: 'Asking for estate agent referral', context: 'Local councils also have housing advice teams' },
        ],
      },
    ],
  },
  CA: {
    language: 'Canadian English / French',
    languageNative: 'English / Francais',
    flag: '🇨🇦',
    country: 'Canada',
    categories: [
      {
        id: 'greetings',
        label: 'Greetings',
        icon: '👋',
        phrases: [
          { phrase: 'Hey / Hi there / How\'s it going?', meaning: 'Common casual Canadian greetings', context: 'Canadians are typically warm and informal' },
          { phrase: 'Pardon? / Sorry?', meaning: 'Asking for repetition', context: '"Sorry" is used very commonly in Canada — even to ask for a repeat' },
          { phrase: 'Could you say that again, please?', meaning: 'Polite request to repeat', context: 'French-speaking Canadians: "Pouvez-vous repeter, s\'il vous plait?"' },
          { phrase: 'I\'m new to Canada / I just landed', meaning: 'Introducing yourself as a newcomer', context: 'Canadians are generally very welcoming to newcomers' },
          { phrase: 'I\'m originally from ___', meaning: 'Explaining your background', context: 'Multiculturalism is core to Canadian identity — people are interested' },
          { phrase: 'Have a good one!', meaning: 'Very common Canadian farewell', context: 'Equivalent to "have a nice day" — you\'ll hear this constantly' },
        ],
      },
      {
        id: 'emergency',
        label: 'Emergency',
        icon: '🚨',
        phrases: [
          { phrase: 'Call 911!', meaning: 'Canadian emergency number', context: 'For police, fire, and ambulance across all provinces' },
          { phrase: 'I need medical attention right away', meaning: 'Urgent healthcare request', context: 'Go to any hospital Emergency Department — covered by provincial health cards' },
          { phrase: 'I need to speak with the police', meaning: 'Requesting police assistance', context: 'Non-emergency police: call local police number, not 911' },
          { phrase: 'I need an interpreter at the hospital', meaning: 'Requesting language support', context: 'Hospitals in major cities typically offer interpretation services' },
          { phrase: 'Please contact my embassy / consulate', meaning: 'Requesting consular support', context: 'You have the right to contact your country\'s consulate' },
          { phrase: 'I need crisis support', meaning: 'Mental health emergency', context: 'Crisis Services Canada: 1-833-456-4566 or text 45645' },
        ],
      },
      {
        id: 'services',
        label: 'Government Services',
        icon: '🏛️',
        phrases: [
          { phrase: 'I\'d like to apply for a health card', meaning: 'Registering for provincial health insurance', context: 'Apply at your province\'s health authority — usually 3-month waiting period' },
          { phrase: 'I need to get a SIN (Social Insurance Number)', meaning: 'Applying for tax/work ID number', context: 'Service Canada office or online at canada.ca — needed to work' },
          { phrase: 'Where can I settle status documents be verified?', meaning: 'Immigration document services', context: 'Service Canada and IRCC offices handle this' },
          { phrase: 'How do I register my children for school?', meaning: 'School enrollment question', context: 'Contact your local school board — publicly funded and free' },
          { phrase: 'I need to file my taxes', meaning: 'Tax return preparation', context: 'CRA: community volunteers help newcomers file for free (CVITP program)' },
          { phrase: 'Where can I take free language classes?', meaning: 'LINC (Language Instruction for Newcomers)', context: 'Free English/French classes for eligible permanent residents — find at cclb.ca' },
        ],
      },
      {
        id: 'work',
        label: 'Work',
        icon: '💼',
        phrases: [
          { phrase: 'I have an open work permit', meaning: 'Stating your work authorization type', context: 'Open permit = work for any employer. Employer-specific = one employer only.' },
          { phrase: 'What are my vacation entitlements?', meaning: 'Asking about paid time off', context: 'Federal minimum 2 weeks (10 days) paid vacation after 1 year' },
          { phrase: 'I\'d like to understand my pay stub', meaning: 'Understanding your paycheck deductions', context: 'CPP, EI, and income tax are the main deductions' },
          { phrase: 'Is there a union for this workplace?', meaning: 'Asking about union membership', context: 'Right to join is protected under Canadian Labour Code' },
          { phrase: 'I\'d like to file a complaint with the Labour Standards', meaning: 'Workplace complaint initiation', context: 'Contact your provincial employment standards office' },
          { phrase: 'Can my credentials be assessed here?', meaning: 'Foreign credential recognition', context: 'See World Education Services (wes.org) or provincial licensing bodies' },
        ],
      },
      {
        id: 'culture',
        label: 'Culture & Community',
        icon: '🍁',
        phrases: [
          { phrase: 'Where is the nearest settlement agency?', meaning: 'Finding newcomer support services', context: 'Settlement agencies provide free help with housing, jobs, language' },
          { phrase: 'Is there a community centre nearby?', meaning: 'Finding local community resources', context: 'Community centres often have ESL, cultural programs, job fairs' },
          { phrase: 'Can I volunteer here?', meaning: 'Offering to volunteer (great for networking)', context: 'Volunteering builds Canadian experience — very valued on resumes' },
          { phrase: 'What are the recycling rules here?', meaning: 'Asking about waste disposal', context: 'Recycling rules vary by city — ask your municipality' },
          { phrase: 'Where is the nearest food bank?', meaning: 'Finding emergency food support', context: 'Food banks are available to everyone — no status check required' },
          { phrase: 'How do I get a library card?', meaning: 'Accessing free public library', context: 'Libraries offer free internet, job boards, language classes, and more' },
        ],
      },
    ],
  },
  AU: {
    language: 'Australian English',
    languageNative: 'English',
    flag: '🇦🇺',
    country: 'Australia',
    categories: [
      {
        id: 'greetings',
        label: 'G\'day — Greetings',
        icon: '👋',
        phrases: [
          { phrase: 'G\'day! / G\'day mate!', meaning: 'Hello! (very Australian informal greeting)', context: '"Mate" is used for everyone — not just male friends' },
          { phrase: 'How ya going? / How are you going?', meaning: 'How are you? (Australian casual)', context: 'Answer: "Good thanks, you?" — don\'t give a long answer' },
          { phrase: 'No worries / She\'ll be right', meaning: 'No problem / It\'ll be fine', context: 'Core phrases of Australian culture — very common' },
          { phrase: 'Could you say that again, please?', meaning: 'Polite request to repeat', context: 'Australian accents vary — don\'t hesitate to ask' },
          { phrase: 'I\'m still getting used to the Australian accent', meaning: 'Friendly explanation', context: 'Australians find this charming — they\'ll help' },
          { phrase: 'Cheers / Ta', meaning: 'Thank you (informal)', context: 'Borrowed from British English — very common in Australia' },
        ],
      },
      {
        id: 'emergency',
        label: 'Emergency',
        icon: '🚨',
        phrases: [
          { phrase: 'Call 000!', meaning: 'Australia\'s emergency number (triple zero)', context: 'For police, fire, ambulance. Also try 112 from mobile.' },
          { phrase: 'I need an ambulance right away', meaning: 'Medical emergency', context: 'Give your exact address immediately' },
          { phrase: 'Ring 13 HEALTH (13 43 25 84)', meaning: 'Non-emergency health advice line (QLD)', context: 'Each state has a nurse-on-call line — varies by state' },
          { phrase: 'Where is the nearest Emergency Department?', meaning: 'Finding the hospital ER', context: 'Called "ED" or "casualty" in Australia' },
          { phrase: 'I need to contact my consulate', meaning: 'Consular assistance request', context: 'Right under Vienna Convention — request should be granted' },
          { phrase: 'Beyond Blue: 1300 22 4636', meaning: 'Mental health support line', context: '24/7 support for depression, anxiety, mental health crisis' },
        ],
      },
      {
        id: 'work',
        label: 'Work & Fair Work',
        icon: '💼',
        phrases: [
          { phrase: 'Am I on the right award rate?', meaning: 'Checking you\'re paid correctly under your Modern Award', context: 'Fair Work Ombudsman has a Pay Calculator at fairwork.gov.au' },
          { phrase: 'I\'d like to see my roster in advance', meaning: 'Requesting your work schedule ahead of time', context: 'Some awards require notice of rosters — check yours' },
          { phrase: 'Do I get paid super on these hours?', meaning: 'Asking about superannuation contributions', context: 'Employer must pay 11% super on eligible earnings' },
          { phrase: 'I want to lodge a complaint with Fair Work', meaning: 'Initiating a workplace complaint', context: 'Call 13 13 94 or visit fairwork.gov.au — all visa holders protected' },
          { phrase: 'Can I see my employment contract?', meaning: 'Requesting your written employment agreement', context: 'You have a right to a copy of your contract' },
          { phrase: 'What notice period do I need to give?', meaning: 'Asking about resignation requirements', context: 'Usually 2–4 weeks — check your contract or Modern Award' },
        ],
      },
      {
        id: 'services',
        label: 'Services & Admin',
        icon: '🏛️',
        phrases: [
          { phrase: 'I need to get a TFN (Tax File Number)', meaning: 'Applying for your tax identifier', context: 'Apply online at ato.gov.au — needed to work and avoid extra tax' },
          { phrase: 'Where can I open a bank account?', meaning: 'Setting up banking', context: 'Most banks allow account opening before you arrive — Commonwealth, ANZ, NAB, Westpac' },
          { phrase: 'How do I register for Medicare?', meaning: 'Enrolling in the public health system', context: 'Citizens, PRs, and some visa holders eligible — visit Services Australia office' },
          { phrase: 'I need to transfer my overseas license to an Australian one', meaning: 'Driving licence conversion', context: 'Varies by state and origin country — check your state\'s transport authority' },
          { phrase: 'Where is the nearest Centrelink office?', meaning: 'Finding government welfare services', context: 'Centrelink administers welfare payments — most newcomers not immediately eligible' },
          { phrase: 'How do I enrol my child in school?', meaning: 'School registration question', context: 'Contact your state\'s education department — free for PR and eligible visa holders' },
        ],
      },
      {
        id: 'culture',
        label: 'Culture & Slang',
        icon: '🦘',
        phrases: [
          { phrase: 'Arvo / Servo / Bottle-o', meaning: 'Afternoon / Service station (petrol) / Bottle shop (liquor)', context: 'Australians shorten almost every word and add -o or -y' },
          { phrase: 'I\'ll shout you a coffee', meaning: 'I\'ll pay for your coffee', context: '"Shouting" a round = paying for a round of drinks/food for friends' },
          { phrase: 'She\'s a bit rough', meaning: 'Something is not going well / low quality', context: 'Common expression for when something is below par' },
          { phrase: 'Can I bring something to the barbie?', meaning: 'Asking what to bring to a barbecue', context: 'BBQs are a huge part of Australian culture — offer to bring something' },
          { phrase: 'I\'m knackered', meaning: 'I\'m exhausted', context: 'Very British/Australian expression for being very tired' },
          { phrase: 'Yeah, nah / Nah, yeah', meaning: '"No" / "Yes" (confusingly!)', context: '"Yeah, nah" = no. "Nah, yeah" = yes. Context matters!' },
        ],
      },
    ],
  },
}

// US phrases also apply to UK/CA/AU with minor adjustments
PHRASE_BANKS.UK = { ...PHRASE_BANKS.UK }

// ── Community & Resources ─────────────────────────────────────────────────────

const LANGUAGE_EXCHANGE = [
  {
    name: 'HelloTalk',
    description: 'Chat with native speakers worldwide. Text, voice, and video in 150+ languages.',
    icon: '💬',
    url: 'https://www.hellotalk.com',
    tag: 'Free · 150+ languages',
  },
  {
    name: 'Tandem',
    description: 'Find language exchange partners matched by language goals and interests.',
    icon: '🤝',
    url: 'https://www.tandem.net',
    tag: 'Free · 300+ languages',
  },
  {
    name: 'Speaky',
    description: 'Video and text exchanges with native speakers. Simple and focused.',
    icon: '🗣️',
    url: 'https://www.speaky.com',
    tag: 'Free · Web & App',
  },
  {
    name: 'italki',
    description: 'Book 1-on-1 lessons with professional teachers or community tutors.',
    icon: '📚',
    url: 'https://www.italki.com',
    tag: 'Paid · Professional teachers',
  },
  {
    name: 'Conversation Exchange',
    description: 'Classic pen-pal platform for finding language partners by email or chat.',
    icon: '✉️',
    url: 'https://www.conversationexchange.com',
    tag: 'Free · Simple',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

type CountryKey = 'US' | 'DE' | 'UK' | 'CA' | 'AU'

const COUNTRY_META: { code: CountryKey; flag: string; name: string; learning: string }[] = [
  { code: 'DE', flag: '🇩🇪', name: 'Germany',        learning: 'Learning German' },
  { code: 'US', flag: '🇺🇸', name: 'United States', learning: 'Survival English (US)' },
  { code: 'UK', flag: '🇬🇧', name: 'UK',            learning: 'British English' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada',        learning: 'Canadian English' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia',     learning: 'Australian English' },
]

export default function LanguageCoachPage() {
  const pathname = usePathname()
  const locale   = pathname.split('/')[1] || 'en'

  const [country,    setCountry]    = useState<CountryKey>('DE')
  const [activeCategory, setActiveCategory] = useState('greetings')

  const data      = PHRASE_BANKS[country]
  const category  = data.categories.find((c) => c.id === activeCategory) ?? data.categories[0]

  return (
    <main className="min-h-screen px-4 sm:px-6 py-12 max-w-3xl mx-auto">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-400" aria-label="Breadcrumb">
        <Link href={`/${locale}/tools`} className="hover:text-gray-700 transition-colors">
          ← All tools
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight">
          🗣️ Language Coach
        </h1>
        <p className="text-base text-gray-500 leading-relaxed">
          Survival phrases for your new country, AI conversation practice, and language exchange partners.
        </p>
      </div>

      {/* Country selector */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-5">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Destination country
        </h2>
        <div className="flex flex-wrap gap-2">
          {COUNTRY_META.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => { setCountry(c.code); setActiveCategory('greetings') }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                country === c.code
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-400">
          {data.flag} Learning: <strong className="text-gray-600">{data.language}</strong>
        </p>
      </div>

      {/* AI Practice — Gemini Live CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-5 text-white">
        <div className="flex items-start gap-4">
          <span className="text-4xl">✨</span>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-1">Practice speaking with AI</h2>
            <p className="text-sm text-blue-100 mb-4 leading-relaxed">
              Use Gemini Live to practice real conversations in {data.language}.
              Just open the app, switch to voice, and speak naturally — the AI will
              respond, correct you, and help you improve.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://gemini.google.com/app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors"
              >
                Open Gemini Live ↗
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.google.android.apps.bard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                Android App ↗
              </a>
              <a
                href="https://apps.apple.com/us/app/google-gemini/id6477489729"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                iOS App ↗
              </a>
            </div>
            <p className="mt-3 text-xs text-blue-200">
              Tip: Ask Gemini to "act as a native {data.language} speaker and correct my grammar"
            </p>
          </div>
        </div>
      </div>

      {/* Phrase bank */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-5">
        {/* Category tabs */}
        <div className="flex overflow-x-auto border-b border-gray-100 px-2 pt-2 gap-1">
          {data.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeCategory === cat.id
                  ? 'border-blue-500 text-blue-700 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Phrases */}
        <div className="divide-y divide-gray-50">
          {category.phrases.map((phrase, i) => (
            <div key={i} className="px-6 py-5">
              <p className="text-base font-bold text-gray-900 mb-1 leading-snug">{phrase.phrase}</p>
              <p className="text-sm text-blue-700 font-medium mb-1">{phrase.meaning}</p>
              {phrase.pronunciation && (
                <p className="text-xs text-gray-400 font-mono mb-1">
                  🔊 {phrase.pronunciation}
                </p>
              )}
              {phrase.context && (
                <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1.5 mt-1.5 leading-relaxed">
                  💡 {phrase.context}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Find language partner */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-5">
        <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
          🤝 Find a language exchange partner
        </h2>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          Practise with native speakers who want to learn your language.
          One of the fastest ways to improve — and you make friends doing it.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {LANGUAGE_EXCHANGE.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all group"
            >
              <span className="text-2xl shrink-0">{app.icon}</span>
              <div>
                <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700">
                  {app.name}
                  <span className="ml-2 text-xs font-normal text-gray-400">{app.tag}</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{app.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Join Goshen community */}
      <div className="bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-200 rounded-2xl p-6 mb-5">
        <div className="flex items-start gap-4">
          <span className="text-4xl">💬</span>
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-1">
              Join the Goshen community
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Chat with other immigrants, share language tips, ask questions,
              and find people from your home country or learning the same language as you.
            </p>
            <a
              href="https://t.me/+cgks5vGPUSpjMGFi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
            >
              💬 Join on Telegram ↗
            </a>
          </div>
        </div>
      </div>

      {/* More learning resources */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          📚 More learning resources
        </h2>
        <div className="space-y-3">
          {country === 'DE' && (
            <>
              <ResourceLink icon="🎓" name="Deutsch lernen (Deutsche Welle)" desc="Free online German courses from beginner to advanced" url="https://learngerman.dw.com" />
              <ResourceLink icon="📖" name="Goethe-Institut" desc="Official German language institute — exams, courses, materials" url="https://www.goethe.de" />
              <ResourceLink icon="🎧" name="Coffee Break German (podcast)" desc="Popular podcast for learning German on the go" url="https://coffeebreaklanguages.com/coffeebreakgerman/" />
            </>
          )}
          {(country === 'US' || country === 'UK' || country === 'CA' || country === 'AU') && (
            <>
              <ResourceLink icon="🎓" name="British Council — Learn English" desc="Free English lessons, grammar, vocabulary, and skills" url="https://learnenglish.britishcouncil.org" />
              <ResourceLink icon="📺" name="BBC Learning English" desc="Videos, audio, and exercises for all levels" url="https://www.bbc.co.uk/learningenglish" />
              <ResourceLink icon="🎧" name="6 Minute English (BBC podcast)" desc="Short, engaging topics with vocabulary explanations" url="https://www.bbc.co.uk/learningenglish/podcasts" />
            </>
          )}
          {country === 'CA' && (
            <ResourceLink icon="🏫" name="LINC classes" desc="Free Language Instruction for Newcomers to Canada — government funded" url="https://www.canada.ca/en/immigration-refugees-citizenship/services/settle-canada/language-skills/classes.html" />
          )}
          <ResourceLink icon="📱" name="Duolingo" desc="Gamified language learning app — great for building vocabulary daily" url="https://www.duolingo.com" />
          <ResourceLink icon="🃏" name="Anki" desc="Free spaced-repetition flashcard app — the most efficient vocabulary tool" url="https://apps.ankiweb.net" />
        </div>
      </div>

      <p className="mt-10 text-sm text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
        Language learning takes time — every phrase you practise counts. Consistency beats perfection.
      </p>
    </main>
  )
}

function ResourceLink({
  icon, name, desc, url,
}: {
  icon: string; name: string; desc: string; url: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
    >
      <span className="text-xl shrink-0">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">{name} ↗</p>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
    </a>
  )
}
