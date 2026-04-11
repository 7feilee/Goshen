/**
 * School / education system navigator engine.
 *
 * Provides structured data about the K-12 and higher education systems
 * for US, DE, UK, CA, AU — including enrollment steps, school types,
 * language support programs, costs, and higher education pathways.
 *
 * Fully static, rule-based, client-side — no API required.
 * Last verified: January 2025.
 */

import type { CountryCode } from "@/types"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface EducationStage {
  name: string
  localName?: string
  ageRange: string
  grades?: string
  compulsory: boolean
  note?: string
}

export interface KeyNumber {
  label: string
  value: string
  sub?: string
}

export interface SchoolItem {
  label: string
  value: string
  note?: string
}

export interface SchoolSection {
  heading: string
  items: SchoolItem[]
}

export interface SchoolCategory {
  id: string
  title: string
  icon: string
  sections: SchoolSection[]
}

export interface SchoolData {
  country: CountryCode
  flag: string
  name: string
  systemOverview: string
  academicYear: string
  keyNumbers: KeyNumber[]
  stages: EducationStage[]
  categories: SchoolCategory[]
  immigrantNote: string
  officialAuthority: { name: string; url: string }
}

// ── United States ─────────────────────────────────────────────────────────────

const US_DATA: SchoolData = {
  country: "US",
  flag: "🇺🇸",
  name: "United States",
  systemOverview:
    "The US public school system is administered at the state and local level. K-12 education is free and compulsory. The Supreme Court ruling Plyler v. Doe (1982) guarantees all children the right to enroll in public school regardless of immigration status. Higher education is offered by community colleges, state universities, and private institutions.",
  academicYear: "September – June",
  keyNumbers: [
    { label: "Compulsory age", value: "6–16", sub: "varies by state" },
    { label: "School days/year", value: "180", sub: "minimum" },
    { label: "Public K-12 cost", value: "$0", sub: "all residents" },
    { label: "Avg in-state university", value: "$10,950/yr", sub: "4-year public" },
    { label: "Community college", value: "~$3,800/yr", sub: "2-year associate" },
  ],
  stages: [
    {
      name: "Pre-Kindergarten",
      ageRange: "3–5",
      compulsory: false,
      note: "Optional; Head Start program available for income-eligible families. Some states offer universal pre-K.",
    },
    {
      name: "Elementary School",
      ageRange: "5–11",
      grades: "Kindergarten–Grade 5",
      compulsory: true,
      note: "Kindergarten entry typically requires age 5 by a state-set cutoff date.",
    },
    {
      name: "Middle School",
      ageRange: "11–14",
      grades: "Grades 6–8",
      compulsory: true,
    },
    {
      name: "High School",
      ageRange: "14–18",
      grades: "Grades 9–12",
      compulsory: true,
      note: "Leads to High School Diploma. Some states require attendance to age 18.",
    },
    {
      name: "College / University",
      ageRange: "18+",
      compulsory: false,
      note: "Optional. Includes community college (2-year) and 4-year universities.",
    },
  ],
  categories: [
    {
      id: "enrollment",
      title: "Enrolling Your Child",
      icon: "📋",
      sections: [
        {
          heading: "Legal right to enroll",
          items: [
            {
              label: "Plyler v. Doe",
              value:
                "The 1982 Supreme Court ruling bars schools from denying enrollment based on immigration status. All children, regardless of visa or documentation status, have the right to attend public K-12 school.",
            },
            {
              label: "No documentation of status",
              value:
                "Schools may not ask for Social Security numbers, visa documents, or any proof of legal immigration status as a condition of enrollment.",
            },
            {
              label: "McKinney-Vento Act",
              value:
                "Homeless or housing-unstable children have the right to immediate enrollment and transportation even without the usual documents.",
            },
          ],
        },
        {
          heading: "Required documents",
          items: [
            {
              label: "Proof of age",
              value:
                "Birth certificate, passport, baptismal record, or sworn affidavit if no documents are available.",
            },
            {
              label: "Proof of residency",
              value:
                "Utility bill, lease agreement, or letter from a school district employee confirming the child lives in the district.",
            },
            {
              label: "Immunisation records",
              value:
                "State-required vaccinations (e.g., MMR, polio, varicella). Many states offer exemptions; schools can provide a provisional enrollment period of 30 days to obtain records.",
              note: "Requirements vary by state.",
            },
            {
              label: "Prior school records",
              value:
                "Report cards or transcripts help with grade placement but are not required for enrollment. Schools conduct their own assessments if records are unavailable.",
            },
          ],
        },
        {
          heading: "Process and timeline",
          items: [
            {
              label: "Step 1 — Find your district",
              value:
                "Use the National Center for Education Statistics school finder or contact your local school board to identify your assigned school based on home address.",
            },
            {
              label: "Step 2 — Contact the school",
              value:
                "Call or visit the school office. Many districts have Welcome Centers for immigrant families with multilingual staff.",
            },
            {
              label: "Step 3 — Language assessment",
              value:
                "If the home language is not English, the school will administer an English proficiency screener within 30 days to determine ELL program placement.",
            },
            {
              label: "Timeline",
              value:
                "Enrollment can happen year-round. Mid-year enrollment is common and fully supported. Schools aim to start children within a few days of enrollment.",
            },
          ],
        },
      ],
    },
    {
      id: "types",
      title: "Types of Schools",
      icon: "🏫",
      sections: [
        {
          heading: "Public schools",
          items: [
            {
              label: "Traditional public schools",
              value:
                "Free, funded by federal, state, and local taxes. Assigned by district catchment area. Open to all children regardless of immigration status.",
            },
            {
              label: "Charter schools",
              value:
                "Publicly funded but independently operated. Free to attend; enrollment usually by lottery. Not available in all states.",
              note: "Accountability and quality vary widely.",
            },
            {
              label: "Magnet schools",
              value:
                "Specialized public schools focusing on STEM, arts, or language immersion. Free; competitive admission or lottery. Open to all residents.",
            },
          ],
        },
        {
          heading: "Private schools",
          items: [
            {
              label: "Private / independent schools",
              value:
                "Tuition-based; average $12,000–$57,000/year. Open to immigrant families; no enrollment right tied to residency. No requirement to follow state curriculum standards.",
            },
            {
              label: "Catholic and parochial schools",
              value:
                "Religiously affiliated private schools. Tuition typically $5,000–$12,000/year; some offer sliding-scale assistance.",
            },
            {
              label: "International schools",
              value:
                "Offer IB or home-country curricula. Common in major metro areas. Tuition $15,000–$40,000/year. Useful for children expecting to return abroad.",
            },
          ],
        },
        {
          heading: "Alternative education",
          items: [
            {
              label: "Homeschooling",
              value:
                "Legal in all 50 states with varying notice requirements. Parents or guardians deliver instruction. Immigrant families can homeschool regardless of immigration status.",
            },
            {
              label: "Virtual / online public schools",
              value:
                "State-run or charter online schools that are tuition-free. Quality and availability vary by state.",
            },
          ],
        },
      ],
    },
    {
      id: "support",
      title: "Language Support",
      icon: "🗣️",
      sections: [
        {
          heading: "ELL / EL programs",
          items: [
            {
              label: "English Language Learner (ELL) programs",
              value:
                "Required by federal law (Every Student Succeeds Act) for all students whose home language is not English. Schools must provide meaningful access within a reasonable time after enrollment.",
            },
            {
              label: "Title III funding",
              value:
                "Federal grants support ELL and immigrant student programs. Funded services include supplemental English instruction, bilingual staff, and family engagement activities.",
            },
            {
              label: "Bilingual education",
              value:
                "Available in many districts, especially in areas with large Spanish-speaking populations. Dual-language programs aim for proficiency in both English and the home language.",
            },
            {
              label: "Sheltered Instruction",
              value:
                "Content-area classes taught with simplified English and visual supports so ELL students can access grade-level curriculum while learning the language.",
            },
          ],
        },
        {
          heading: "Family and integration support",
          items: [
            {
              label: "Translation and interpretation",
              value:
                "Schools with 5% or more students of a given language group must communicate with parents in that language. Telephone interpretation services (e.g., Language Line) are widely used.",
            },
            {
              label: "Parent liaisons",
              value:
                "Many districts employ bilingual family liaisons who help newly arrived families navigate enrollment, IEP processes, and community resources.",
            },
            {
              label: "Newcomer programs",
              value:
                "Some large districts run dedicated newcomer centers for recently arrived immigrant students aged 14-21 with little prior formal schooling, offering intensive literacy and English support.",
            },
          ],
        },
        {
          heading: "Adult and out-of-school support",
          items: [
            {
              label: "Adult ESL classes",
              value:
                "Free or low-cost English classes for adults offered through community colleges, libraries, and nonprofits. Federally funded under the Adult Education and Family Literacy Act.",
            },
            {
              label: "Head Start / Early Head Start",
              value:
                "Federal program providing early childhood education, health, and nutrition for income-eligible families including immigrants. Available from birth to age 5.",
            },
          ],
        },
      ],
    },
    {
      id: "higher",
      title: "Higher Education",
      icon: "🎓",
      sections: [
        {
          heading: "Degree types and duration",
          items: [
            {
              label: "Associate degree",
              value:
                "2-year degree from a community college. Leads to entry-level employment or transfer to a 4-year university. Average cost ~$3,800/year.",
            },
            {
              label: "Bachelor's degree",
              value:
                "4-year degree. The most common undergraduate credential. Offered by community college transfers (2+2) or directly by universities.",
            },
            {
              label: "Master's degree",
              value: "1–2 years post-bachelor. Requires undergraduate degree and often GRE/GMAT scores.",
            },
            {
              label: "PhD / Doctoral degree",
              value:
                "3–7 years of research. Many STEM doctoral programs offer tuition waivers and stipends. Requires master's or bachelor's with research experience.",
            },
          ],
        },
        {
          heading: "Admission and immigration considerations",
          items: [
            {
              label: "FAFSA financial aid",
              value:
                "Free Application for Federal Student Aid (FAFSA) requires a Social Security Number or Individual Taxpayer Identification Number (ITIN). Undocumented students may be ineligible for federal aid.",
            },
            {
              label: "DACA and in-state tuition",
              value:
                "19 states allow DACA (Deferred Action for Childhood Arrivals) recipients to pay in-state tuition. Some states offer state-funded financial aid regardless of federal eligibility.",
            },
            {
              label: "F-1 student visa",
              value:
                "International students typically require an F-1 visa. Universities issue SEVIS I-20 forms. Full-time enrollment required. On-campus work permitted (up to 20 hrs/week).",
            },
            {
              label: "International student tuition",
              value:
                "Out-of-state or international fees at public universities average $28,000–$45,000/year. Private universities average $35,000–$60,000/year.",
            },
          ],
        },
        {
          heading: "Pathways and recognition",
          items: [
            {
              label: "Community college transfer",
              value:
                "The 2+2 pathway (2 years community college + 2 years university) is a cost-effective route to a bachelor's degree. Many states have guaranteed transfer agreements.",
            },
            {
              label: "Credential evaluation",
              value:
                "Foreign academic credentials can be evaluated by NACES-member agencies (e.g., World Education Services). Required for graduate school admission and some professional licenses.",
            },
            {
              label: "GED equivalency",
              value:
                "Adults without a US high school diploma can earn a General Educational Development (GED) credential recognized nationwide for college admission and employment.",
            },
          ],
        },
      ],
    },
    {
      id: "costs",
      title: "Costs Overview",
      icon: "💰",
      sections: [
        {
          heading: "K-12 costs",
          items: [
            {
              label: "Public K-12 tuition",
              value: "Free for all children residing in the district regardless of immigration status.",
            },
            {
              label: "School meals",
              value:
                "Free or reduced-price lunch available for income-eligible families via the National School Lunch Program. Eligibility based on household income, not immigration status.",
            },
            {
              label: "Out-of-pocket expenses",
              value:
                "Families may incur costs for school supplies ($100–$300/year), extracurricular activity fees, and field trips. Many schools waive fees for low-income families.",
            },
          ],
        },
        {
          heading: "Early childhood costs",
          items: [
            {
              label: "Head Start",
              value:
                "Free federally funded preschool for families at or below 100% of the federal poverty level. Immigrant children are eligible regardless of status.",
            },
            {
              label: "Private childcare",
              value:
                "Average $1,200–$2,500/month depending on age and location. The Child and Dependent Care Tax Credit (up to $3,000 single / $6,000 for two children) can offset costs.",
            },
            {
              label: "Child Care and Development Fund (CCDF)",
              value:
                "Federal subsidy program for low-income working families. Administered by states. Legal immigrants with qualified immigration status are generally eligible.",
            },
          ],
        },
        {
          heading: "Higher education costs",
          items: [
            {
              label: "In-state public university",
              value: "Average $10,950/year in tuition and fees (2023-24). Plus room and board averages $12,000–$15,000/year.",
            },
            {
              label: "Community college",
              value: "Average $3,800/year. Significantly reduces total degree cost via transfer pathway.",
            },
            {
              label: "Financial aid and scholarships",
              value:
                "FAFSA, institutional grants, and state scholarships available for eligible students. Undocumented students may access private scholarships and, in some states, state aid programs.",
            },
          ],
        },
      ],
    },
  ],
  immigrantNote:
    "All children have the right to enroll in public school regardless of immigration status (Plyler v. Doe). Schools cannot demand Social Security numbers or visa documents. ELL services are federally mandated. Contact your local school district's newcomer or welcome center for assistance.",
  officialAuthority: {
    name: "US Department of Education",
    url: "https://www.ed.gov",
  },
}

// ── Germany ───────────────────────────────────────────────────────────────────

const DE_DATA: SchoolData = {
  country: "DE",
  flag: "🇩🇪",
  name: "Germany",
  systemOverview:
    "Germany's school system (Schulwesen) is administered by each of the 16 federal states (Bundesländer). Compulsory schooling (Schulpflicht) begins at age 6 and lasts 9 years full-time plus 3 years part-time vocational. After Grundschule, students are tracked into different secondary school types. Public universities are largely tuition-free.",
  academicYear: "August/September – June/July (varies by state)",
  keyNumbers: [
    { label: "Schulpflicht begins", value: "Age 6" },
    { label: "Grundschule duration", value: "4 years", sub: "Grades 1–4" },
    { label: "Abitur", value: "Grade 12–13", sub: "university entrance" },
    { label: "Public university tuition", value: "~€0", sub: "plus semester fee €150–400" },
    { label: "Kita fee", value: "Subsidised", sub: "income-based, varies by state" },
  ],
  stages: [
    {
      name: "Nursery / Day Care",
      localName: "Krippe",
      ageRange: "0–3",
      compulsory: false,
      note: "Subsidised childcare. Income-based fees (Kita-Beitrag). Many cities offer free care from age 1 or 2.",
    },
    {
      name: "Kindergarten",
      localName: "Kita / Kindergarten",
      ageRange: "3–6",
      compulsory: false,
      note: "Children are entitled to a Kita place from age 1. Attendance is optional but strongly encouraged.",
    },
    {
      name: "Primary School",
      localName: "Grundschule",
      ageRange: "6–10",
      grades: "Grades 1–4",
      compulsory: true,
      note: "All children attend together. At the end of Grade 4, a recommendation for secondary school track is issued.",
    },
    {
      name: "Lower Secondary",
      localName: "Hauptschule / Realschule / Gesamtschule / Gymnasium",
      ageRange: "10–16",
      grades: "Grades 5–10",
      compulsory: true,
      note: "Students are tracked after Grundschule. Gesamtschule (comprehensive) keeps options open longest. Track determines future education and career pathways.",
    },
    {
      name: "Upper Secondary / Vocational",
      localName: "Gymnasium Oberstufe / Berufsschule",
      ageRange: "16–18/19",
      grades: "Grades 11–12/13",
      compulsory: true,
      note: "Gymnasium leads to Abitur (university entrance). Berufsschule combines vocational training with part-time schooling (dual system).",
    },
    {
      name: "University / Higher Education",
      localName: "Hochschule / Universität",
      ageRange: "18+",
      compulsory: false,
      note: "Requires Abitur or equivalent for university. Fachhochschule (University of Applied Sciences) accepts Fachhochschulreife.",
    },
  ],
  categories: [
    {
      id: "enrollment",
      title: "Enrolling Your Child",
      icon: "📋",
      sections: [
        {
          heading: "Legal basis",
          items: [
            {
              label: "Schulpflicht (compulsory schooling)",
              value:
                "All children residing in Germany are subject to compulsory schooling from age 6, regardless of nationality or residence permit status. This applies to asylum seekers and undocumented children after a short settling-in period (typically 3–6 months).",
            },
            {
              label: "Enrollment authority",
              value:
                "Each Bundesland administers its own enrollment rules. Contact your local Schulamt (school authority) or Bürgeramt (citizen registration office) for guidance.",
            },
          ],
        },
        {
          heading: "Required documents",
          items: [
            {
              label: "Anmeldeformular",
              value: "School registration form, available at the school or Schulamt.",
            },
            {
              label: "Geburtsurkunde",
              value: "Birth certificate or passport for proof of age and identity. Certified German translation may be required.",
            },
            {
              label: "Meldebestätigung",
              value:
                "Official registration certificate (Anmeldebestätigung) from the Bürgeramt confirming the family's address in the school's catchment area.",
            },
            {
              label: "Impfausweis",
              value:
                "Vaccination record (especially measles vaccination now mandatory under the Masernschutzgesetz). Schools may provisionally enroll children while immunisation is arranged.",
            },
            {
              label: "Prior school records",
              value:
                "Previous Zeugnisse (school reports) help with grade placement. A Lernstandserhebung (learning level assessment) may be conducted. Records not strictly required for initial enrollment.",
            },
          ],
        },
        {
          heading: "Language placement and process",
          items: [
            {
              label: "Language assessment",
              value:
                "Schools assess German language proficiency. Children without German are typically placed in Willkommensklassen (welcome / preparatory classes) before mainstreaming.",
            },
            {
              label: "Catchment area",
              value:
                "Children are assigned to the Grundschule in their catchment area (Schulbezirk). Secondary school selection is more flexible but tied to the Grundschule recommendation.",
            },
            {
              label: "Timeline",
              value:
                "Enrollment deadlines vary by state and run February–April for the following school year. Newly arrived families can enroll at any time; schools accommodate mid-year arrivals.",
            },
          ],
        },
      ],
    },
    {
      id: "types",
      title: "Types of Schools",
      icon: "🏫",
      sections: [
        {
          heading: "State schools (public)",
          items: [
            {
              label: "Grundschule",
              value: "Free primary school for all children. No selection. Instruction in German.",
            },
            {
              label: "Gymnasium",
              value:
                "Academic secondary school leading to Abitur. Free. High academic expectations; leads to university.",
            },
            {
              label: "Realschule",
              value:
                "Intermediate secondary school (Grades 5–10). Free. Leads to Realschulabschluss, qualifying for vocational training or Gymnasium upper stage.",
            },
            {
              label: "Hauptschule",
              value:
                "Basic secondary school. Free. Leads to Hauptschulabschluss. Declining in prevalence; many states merging it with Realschule.",
            },
            {
              label: "Gesamtschule",
              value:
                "Comprehensive school combining all tracks under one roof. Free. Keeps academic pathways open the longest and is often preferred for newly arrived children.",
            },
          ],
        },
        {
          heading: "Private and international schools",
          items: [
            {
              label: "Privatschule",
              value:
                "State-approved private schools charge tuition (€300–€1,500/month). Must follow state curriculum standards and employ qualified teachers.",
            },
            {
              label: "International schools",
              value:
                "Offer IB or home-country curricula in English or other languages. Tuition €12,000–€30,000/year. Common in Frankfurt, Munich, Berlin, Hamburg.",
            },
            {
              label: "Deutsche Auslandsschulen (abroad) / Foreign-language schools",
              value:
                "Some cities have bilingual state schools (e.g., French-German or English-German) that are free or low-cost.",
            },
          ],
        },
        {
          heading: "Vocational and alternative",
          items: [
            {
              label: "Berufsschule (dual system)",
              value:
                "Part-time vocational school combined with workplace apprenticeship (Ausbildung). One of the world's strongest vocational training systems. Leads to recognized trade qualification.",
            },
            {
              label: "Fachoberschule",
              value:
                "Vocational upper secondary school leading to Fachhochschulreife, which gives access to Fachhochschule (applied sciences universities).",
            },
          ],
        },
      ],
    },
    {
      id: "support",
      title: "Language Support",
      icon: "🗣️",
      sections: [
        {
          heading: "DaZ and welcome classes",
          items: [
            {
              label: "DaZ — Deutsch als Zweitsprache",
              value:
                "German as a Second Language classes are standard in most schools for non-native speakers. Provided within the regular school day. Intensity and model vary by state.",
            },
            {
              label: "Willkommensklassen",
              value:
                "Welcome classes (also called Vorbereitungsklassen, Aufnahme- or Brückenklassen depending on state) are dedicated preparatory classes for newly arrived children with little to no German. Duration: 6–18 months before mainstreaming.",
            },
            {
              label: "Herkunftssprachlicher Unterricht (HSU)",
              value:
                "Heritage language instruction in students' mother tongue offered in many states for major immigrant languages (Turkish, Arabic, Russian, Polish, Greek). Typically 2–5 hours/week.",
            },
          ],
        },
        {
          heading: "Integration support",
          items: [
            {
              label: "BAMF integration courses (adults)",
              value:
                "Free 700-hour German language and orientation course for legal residents, offered by the Bundesamt für Migration und Flüchtlinge (BAMF). Mandatory for some visa holders; voluntary for others.",
              note: "For parents/adults, not school-age children.",
            },
            {
              label: "Schulsozialarbeit",
              value:
                "School social workers available in many schools to support newly arrived families with administrative processes, referrals, and psychosocial support.",
            },
            {
              label: "Jugendhilfe / Jugendamt",
              value:
                "Youth welfare office provides support for children and families facing integration challenges, including unaccompanied minors.",
            },
          ],
        },
        {
          heading: "Parent communication",
          items: [
            {
              label: "Translation services",
              value:
                "Schools with many immigrant students often have multilingual staff or engage community interpreters for parent meetings, school reports, and IEP equivalent (Förderplan) discussions.",
            },
            {
              label: "Elternabend (parents evening)",
              value:
                "Regular evening meetings for parents. Some schools provide summaries in multiple languages. Schools are legally required to communicate with parents in a way they can understand.",
            },
          ],
        },
      ],
    },
    {
      id: "higher",
      title: "Higher Education",
      icon: "🎓",
      sections: [
        {
          heading: "Degree types and duration",
          items: [
            {
              label: "Bachelor's degree",
              value: "3 years (6 semesters) at Universität or Fachhochschule. Replaced the Diplom/Magister in most fields.",
            },
            {
              label: "Master's degree",
              value: "2 years (4 semesters). Consecutiv (following same-subject bachelor's) or konsekutiv with a different focus. Required for most academic careers.",
            },
            {
              label: "PhD (Promotion)",
              value:
                "3–5 years. Individual supervision model is common; structured PhD programs exist in many fields. Conducted at Universität, not Fachhochschule.",
            },
            {
              label: "Ausbildung (vocational qualification)",
              value:
                "2–3.5 year dual apprenticeship. Not a university degree but a highly respected, nationally recognized qualification that leads directly to employment.",
            },
          ],
        },
        {
          heading: "Admission and language requirements",
          items: [
            {
              label: "Numerus Clausus (NC)",
              value:
                "Many programs have restricted admission based on Abitur grade (NC). Subjects like medicine and law are highly competitive. Application via Hochschulstart.de (previously Stiftung für Hochschulzulassung) or directly to the university.",
            },
            {
              label: "uni-assist",
              value:
                "International students with non-German qualifications apply through uni-assist, which evaluates foreign credentials. Documents required: transcripts, diploma, language certificates.",
            },
            {
              label: "German language requirement",
              value:
                "Most programs require TestDaF (level TDN 4 in all areas) or DSH (level DSH-2). English-taught Master's programs are increasingly common and accept IELTS 6.5 / TOEFL 90.",
            },
          ],
        },
        {
          heading: "Costs and funding",
          items: [
            {
              label: "Tuition at public universities",
              value:
                "Tuition-free at all public universities (except Baden-Württemberg which charges €1,500/semester for non-EU students). Semester contribution of €150–€400 covers admin, student services, and often a transit pass.",
            },
            {
              label: "BAföG (student aid)",
              value:
                "Federal student loan/grant for students with limited means. EU citizens and some non-EU residents with long-term permits are eligible. Half is a grant, half a no-interest loan.",
            },
            {
              label: "DAAD scholarships",
              value:
                "The German Academic Exchange Service (DAAD) offers numerous scholarships for international students and researchers. Apply at daad.de.",
            },
          ],
        },
      ],
    },
    {
      id: "costs",
      title: "Costs Overview",
      icon: "💰",
      sections: [
        {
          heading: "Early childhood costs",
          items: [
            {
              label: "Kita / Krippe fees",
              value:
                "Heavily subsidised in all states. Berlin and Hamburg offer free Kita from age 1. Most states charge income-based fees ranging from €0 to €500/month. All immigrant children with registered residence are entitled to a place.",
            },
            {
              label: "Kindergeld",
              value:
                "Child benefit of €250/month per child (as of 2024), paid to legal residents. Typically begins once the child is born and registered. Available to EU citizens and many non-EU permit holders.",
            },
          ],
        },
        {
          heading: "K-12 school costs",
          items: [
            {
              label: "State school tuition",
              value: "Free. No tuition at any level of state schooling from Grundschule through Gymnasium.",
            },
            {
              label: "Materials and supplies",
              value:
                "Schulranzen (school bag) and supplies cost €200–€500 at start of primary school. Textbooks are loaned by schools in most states. School meals cost €2–€5/day.",
            },
            {
              label: "Bildungs- und Teilhabepaket",
              value:
                "Low-income families receiving Bürgergeld, Wohngeld, or asylum benefits can claim the Education and Participation Package covering school trips, meals, and extracurricular activities.",
            },
          ],
        },
        {
          heading: "Higher education costs",
          items: [
            {
              label: "Public university",
              value: "Tuition-free; semester fee €150–€400. Living costs average €900–€1,200/month (varies greatly by city).",
            },
            {
              label: "Private universities",
              value:
                "Charge €10,000–€30,000/year. Not publicly funded. Examples: WHU, EBS University, ESMT Berlin. Offer more program flexibility but less research prestige.",
            },
            {
              label: "Immigrant fee differences",
              value:
                "EU citizens pay same as Germans. Non-EU students pay a non-EU surcharge only in Baden-Württemberg (€1,500/semester). All other states charge no tuition for international students.",
            },
          ],
        },
      ],
    },
  ],
  immigrantNote:
    "All children living in Germany are subject to Schulpflicht (compulsory schooling) and have the right to attend a state school. Asylum-seeking children must be enrolled within 3-6 months of arrival depending on the state. DaZ classes and Willkommensklassen are available in most schools. Contact your local Schulamt or Jugendamt for support.",
  officialAuthority: {
    name: "Kultusministerkonferenz (KMK)",
    url: "https://www.kmk.org",
  },
}

// ── United Kingdom ─────────────────────────────────────────────────────────────

const UK_DATA: SchoolData = {
  country: "UK",
  flag: "🇬🇧",
  name: "United Kingdom",
  systemOverview:
    "Education in the UK is administered separately by England, Scotland, Wales, and Northern Ireland. State schools are free and funded by the government. Compulsory education runs from age 5 (England/Wales/Scotland) to 16, with England requiring participation in education or training to age 18. The system includes primary, secondary, and sixth form/college stages.",
  academicYear: "September – July (190 school days)",
  keyNumbers: [
    { label: "Compulsory age", value: "5–16", sub: "to 18 in England (education/training)" },
    { label: "School days/year", value: "190" },
    { label: "GCSEs", value: "Age 16", sub: "Years 10–11" },
    { label: "A-levels", value: "Age 18", sub: "Years 12–13" },
    { label: "University tuition (domestic)", value: "£9,250/yr", sub: "England; free in Scotland for Scottish students" },
  ],
  stages: [
    {
      name: "Early Years Foundation Stage",
      localName: "EYFS",
      ageRange: "0–5",
      compulsory: false,
      note: "15 hours/week free childcare from age 3 for all children; 30 hours for working parents. Compulsory from the term after a child's 5th birthday.",
    },
    {
      name: "Primary School",
      ageRange: "5–11",
      grades: "Years 1–6 (Key Stages 1 and 2)",
      compulsory: true,
      note: "Includes Infant School (Years 1-2) and Junior School (Years 3-6) in some areas.",
    },
    {
      name: "Secondary School",
      ageRange: "11–16",
      grades: "Years 7–11 (Key Stages 3 and 4)",
      compulsory: true,
      note: "Year 11 culminates in GCSE examinations (typically 8–10 subjects).",
    },
    {
      name: "Sixth Form / Further Education",
      ageRange: "16–18",
      grades: "Years 12–13",
      compulsory: false,
      note: "A-levels, BTECs, T-levels, or vocational qualifications. Required in England to remain in education or training to 18.",
    },
    {
      name: "University / Higher Education",
      ageRange: "18+",
      compulsory: false,
      note: "Bachelor's 3 years (4 in Scotland). Competitive admission via UCAS.",
    },
  ],
  categories: [
    {
      id: "enrollment",
      title: "Enrolling Your Child",
      icon: "📋",
      sections: [
        {
          heading: "Legal right to education",
          items: [
            {
              label: "Right to a school place",
              value:
                "All children of compulsory school age residing in the UK are entitled to a free state school place. This applies to children of asylum seekers, refugees, and those on most visa types.",
            },
            {
              label: "Local authority responsibility",
              value:
                "Local authorities (councils) are responsible for ensuring every child of school age has a school place. Contact your local council's school admissions team as the first step.",
            },
          ],
        },
        {
          heading: "Required documents",
          items: [
            {
              label: "Proof of address",
              value:
                "A recent utility bill, council tax bill, tenancy agreement, or letter from a local authority confirming residence. Essential for determining catchment area.",
            },
            {
              label: "Child's birth certificate or passport",
              value: "To confirm the child's age and identity.",
            },
            {
              label: "Immunisation record",
              value:
                "Red book (Personal Child Health Record) or vaccination history. Schools encourage up-to-date immunisations but will not refuse enrollment on this basis alone.",
              note: "Vaccinations are not legally required to attend school in the UK.",
            },
            {
              label: "Previous school records",
              value:
                "Helpful for year group placement, particularly for older children transferring mid-way through GCSEs. Not required for enrollment.",
            },
          ],
        },
        {
          heading: "Application process",
          items: [
            {
              label: "In-year admissions",
              value:
                "For families arriving outside the normal September intake, apply for an in-year admission through the local council or directly to the school. Most councils have an online portal.",
            },
            {
              label: "EAL assessment",
              value:
                "Schools assess a child's English proficiency on arrival using an EAL (English as an Additional Language) screening. This determines the level of support needed.",
            },
            {
              label: "Timeline",
              value:
                "Schools aim to place children within 10 school days. If no suitable place exists in the preferred school, the local authority must offer the nearest available place.",
            },
            {
              label: "Fair Access Protocol",
              value:
                "Local authorities operate a Fair Access Protocol to ensure vulnerable children — including newly arrived international pupils — are placed in school even when they are oversubscribed.",
            },
          ],
        },
      ],
    },
    {
      id: "types",
      title: "Types of Schools",
      icon: "🏫",
      sections: [
        {
          heading: "State-funded schools",
          items: [
            {
              label: "Community schools",
              value:
                "Run by the local council. Free; most common type. Curriculum follows the National Curriculum. Catchment-area based admissions.",
            },
            {
              label: "Academy schools",
              value:
                "State-funded but independent of local council control. Free. Can set their own curriculum and admissions policies. Includes converter academies and sponsored academies.",
            },
            {
              label: "Faith schools",
              value:
                "State-funded schools with a religious character (Church of England, Catholic, Jewish, Muslim, etc.). Free. May prioritise admission of children of that faith.",
            },
            {
              label: "Grammar schools",
              value:
                "State-funded selective schools admitting pupils based on the 11-plus exam. Free. Only in certain areas (Kent, parts of London, Buckinghamshire, etc.).",
            },
          ],
        },
        {
          heading: "Independent and alternative",
          items: [
            {
              label: "Independent (private) schools",
              value:
                "Fee-paying; average £15,000–£45,000/year day school (boarding higher). No state funding. Open to immigrant families; no catchment restriction.",
            },
            {
              label: "International schools",
              value:
                "Offer IB, American, or home-country curricula. Tuition typically £15,000–£35,000/year. Concentrated in London and major cities.",
            },
            {
              label: "Home education",
              value:
                "Parents may educate children at home. No legal requirement to follow the National Curriculum or for Ofsted inspection. Must notify local council if withdrawing from school.",
            },
          ],
        },
        {
          heading: "Scottish, Welsh, and NI differences",
          items: [
            {
              label: "Scotland",
              value:
                "Uses Curriculum for Excellence. Standard Grades replaced by National Qualifications (Nationals, Highers, Advanced Highers). No GCSEs or A-levels.",
            },
            {
              label: "Wales",
              value:
                "Has its own Curriculum for Wales (introduced 2022). Welsh-medium schools available. GCSEs and A-levels still used.",
            },
            {
              label: "Northern Ireland",
              value:
                "Retains grammar school selection (Transfer Test). Uses GCSEs and A-levels. Separate Education Authority oversees admissions.",
            },
          ],
        },
      ],
    },
    {
      id: "support",
      title: "Language Support",
      icon: "🗣️",
      sections: [
        {
          heading: "EAL support in schools",
          items: [
            {
              label: "EAL — English as an Additional Language",
              value:
                "Schools with EAL pupils receive additional funding via the Pupil Premium and EAL-linked allocations. Schools are expected to provide tailored support for EAL learners within mainstream classes.",
            },
            {
              label: "EMTAS — Ethnic Minority and Traveller Achievement Service",
              value:
                "Available in many local authorities, EMTAS provides outreach, translated materials, and specialist staff for newly arrived pupils. Contact your council to check availability.",
            },
            {
              label: "Bilingual support assistants",
              value:
                "Some schools employ teaching assistants who speak common home languages (Urdu, Punjabi, Polish, Romanian, Bengali, Somali) to support new arrivals in lessons.",
            },
          ],
        },
        {
          heading: "Refugee and asylum-seeker support",
          items: [
            {
              label: "Virtual School Heads for looked-after children",
              value:
                "Local authorities appoint Virtual School Heads responsible for the educational outcomes of looked-after children, including unaccompanied asylum-seeking children (UASC).",
            },
            {
              label: "Helen Hamlyn Trust and other charities",
              value:
                "Several NGOs offer free supplementary schools, tutoring, and mentoring for refugee children in major cities.",
            },
            {
              label: "Free School Meals",
              value:
                "Families receiving Universal Credit, Income Support, or asylum support (Section 95) are entitled to free school meals. Applies to children with No Recourse to Public Funds in many cases.",
            },
          ],
        },
        {
          heading: "Parent and community support",
          items: [
            {
              label: "Translation of school communications",
              value:
                "Schools are expected to communicate key information to parents in a language they understand. Many use services like Language Line or employ multilingual staff.",
            },
            {
              label: "ESOL courses for adults",
              value:
                "Free or subsidised English for Speakers of Other Languages (ESOL) courses are available at local further education colleges. Eligibility depends on immigration status and benefit receipt.",
            },
          ],
        },
      ],
    },
    {
      id: "higher",
      title: "Higher Education",
      icon: "🎓",
      sections: [
        {
          heading: "Degree types and duration",
          items: [
            {
              label: "Bachelor's degree",
              value:
                "3 years in England, Wales, NI; 4 years in Scotland (with an integrated first year). Entry via UCAS. Admission based on A-level/Higher grades and personal statement.",
            },
            {
              label: "Master's degree",
              value:
                "1 year taught (UK is unique for this); 1–2 years research. Requires bachelor's degree. No uniform application portal — apply directly to universities.",
            },
            {
              label: "PhD",
              value:
                "3–4 years full-time. Self-funded or funded by UKRI/Research Council grants. EU and international students eligible for some funded positions.",
            },
            {
              label: "Foundation year",
              value:
                "1-year preparatory course preceding a bachelor's for students without suitable A-levels or international equivalents. Offered by most universities.",
            },
          ],
        },
        {
          heading: "Immigration and access for international students",
          items: [
            {
              label: "Student visa (Tier 4 / Student route)",
              value:
                "Required for non-UK/Irish citizens studying in the UK for more than 6 months. Must be sponsored by a licensed institution. Allows part-time work of 20 hours/week during term.",
            },
            {
              label: "Graduate Route visa",
              value:
                "Allows international graduates to work in the UK for 2 years (3 for PhD holders) post-graduation without a job offer. Available to graduates of UK universities from 2021 onwards.",
            },
            {
              label: "Settled status and fee eligibility",
              value:
                "Students with Indefinite Leave to Remain (ILR), Settled Status (EU Settlement Scheme), or refugee status qualify for domestic tuition fees (£9,250/yr in England).",
            },
          ],
        },
        {
          heading: "Financial support",
          items: [
            {
              label: "Student Finance England",
              value:
                "Tuition fee loans (up to £9,250/yr) and maintenance loans available for UK nationals, settled-status holders, and refugees. Apply at studentfinance.service.gov.uk.",
            },
            {
              label: "Scottish students in Scotland",
              value:
                "Tuition is free (covered by SAAS — Student Awards Agency Scotland) for eligible Scottish-domiciled students. Maintenance loans available via SAAS.",
            },
            {
              label: "International student fees",
              value:
                "£10,000–£38,000/year depending on course and university. Postgraduate and medical courses at the higher end. Some universities offer partial scholarships for academic excellence.",
            },
          ],
        },
      ],
    },
    {
      id: "costs",
      title: "Costs Overview",
      icon: "💰",
      sections: [
        {
          heading: "Early childhood",
          items: [
            {
              label: "Free childcare entitlement",
              value:
                "15 hours/week free childcare for all 3- and 4-year-olds in England. Expanded to 30 hours for working parents earning above the minimum income floor. Scotland offers 1,140 hours/year from age 3.",
            },
            {
              label: "Private childcare costs",
              value:
                "Average £1,200–£1,800/month full-time (under 2s). Tax-Free Childcare scheme provides up to £2,000/year government top-up for eligible working parents.",
            },
            {
              label: "Eligibility for immigrant families",
              value:
                "Free childcare entitlement is available to children of parents with most visa types including skilled worker, spouse/family, and refugee status. Families with No Recourse to Public Funds may be excluded from 30-hour entitlement.",
            },
          ],
        },
        {
          heading: "State school costs",
          items: [
            {
              label: "Tuition",
              value: "Free for all children in state schools regardless of immigration status.",
            },
            {
              label: "Uniforms and supplies",
              value:
                "Most state schools require a uniform costing £100–£300/year. Some councils and charities offer grants for school uniform costs. No tuition or registration fees.",
            },
            {
              label: "Free School Meals",
              value:
                "Available to families on Universal Credit with net earnings under £7,400/year; Income Support; or NASS asylum support. All children in state-funded infant school (Years 1-2) receive Universal Infant Free School Meals.",
            },
          ],
        },
        {
          heading: "Higher education costs",
          items: [
            {
              label: "Domestic tuition — England",
              value: "£9,250/year. Repayment through income-contingent student loans; repayments only begin when earning above £25,000/year.",
            },
            {
              label: "International student fees",
              value: "£10,000–£38,000/year. No government loan available. Proof of funds required for Student visa application.",
            },
            {
              label: "Maintenance and living costs",
              value:
                "Average living costs £12,000–£18,000/year outside London; higher in London. Student loans cover some of this for eligible domestic students.",
            },
          ],
        },
      ],
    },
  ],
  immigrantNote:
    "All children of compulsory school age residing in the UK are entitled to a free state school place, regardless of immigration status. Contact your local council's school admissions team. EAL support must be provided. Families with refugee or settled status qualify for full student finance in higher education.",
  officialAuthority: {
    name: "Department for Education (England)",
    url: "https://www.gov.uk/government/organisations/department-for-education",
  },
}

// ── Canada ────────────────────────────────────────────────────────────────────

const CA_DATA: SchoolData = {
  country: "CA",
  flag: "🇨🇦",
  name: "Canada",
  systemOverview:
    "Education in Canada is a provincial and territorial responsibility. Each province operates its own public school system. K-12 public schooling is free for all children residing in Canada regardless of immigration status. French-language school boards operate alongside English-language boards in most provinces. Post-secondary education is offered by universities, colleges, and CEGEPs (Quebec).",
  academicYear: "September – June",
  keyNumbers: [
    { label: "Compulsory age", value: "6–16", sub: "Ontario requires to 18" },
    { label: "Grades", value: "JK–Grade 12", sub: "varies by province" },
    { label: "Avg domestic university", value: "C$6,693/yr", sub: "2023-24 average" },
    { label: "Public K-12 cost", value: "$0", sub: "all residents" },
    { label: "Academic year", value: "Sep – Jun" },
  ],
  stages: [
    {
      name: "Licensed Childcare",
      ageRange: "0–4",
      compulsory: false,
      note: "Licensed daycare and home childcare. Average C$1,000–$2,000/month before subsidies. Canada-wide early learning agreements aim to reduce fees to C$10/day by 2025.",
    },
    {
      name: "Kindergarten",
      localName: "JK / SK (Ontario); Maternelle (Quebec)",
      ageRange: "4–6",
      grades: "Junior Kindergarten (JK) and Senior Kindergarten (SK)",
      compulsory: false,
      note: "Full-day kindergarten available in most provinces. Attendance is optional in most jurisdictions but strongly recommended.",
    },
    {
      name: "Elementary School",
      ageRange: "6–12",
      grades: "Grades 1–6",
      compulsory: true,
    },
    {
      name: "Junior High / Middle School",
      ageRange: "12–15",
      grades: "Grades 7–9",
      compulsory: true,
    },
    {
      name: "Secondary School",
      ageRange: "15–18",
      grades: "Grades 10–12",
      compulsory: true,
      note: "Leads to provincial secondary school diploma (e.g., Ontario Secondary School Diploma — OSSD).",
    },
    {
      name: "Post-Secondary",
      ageRange: "18+",
      compulsory: false,
      note: "University (bachelor's and above), college (diplomas and certificates), or CEGEP in Quebec.",
    },
  ],
  categories: [
    {
      id: "enrollment",
      title: "Enrolling Your Child",
      icon: "📋",
      sections: [
        {
          heading: "Right to enrollment",
          items: [
            {
              label: "Universal access",
              value:
                "All children residing in Canada have the right to attend public school free of charge. This includes children of temporary residents, refugee claimants, and undocumented children. No immigration status check is required.",
            },
            {
              label: "School board responsibility",
              value:
                "Public school boards are responsible for enrolling all children in their service area. Contact the local school board's registration office or newcomer welcome centre as the first step.",
            },
          ],
        },
        {
          heading: "Required documents",
          items: [
            {
              label: "Proof of age",
              value:
                "Birth certificate, passport, or statutory declaration. Schools will work with families who lack documentation.",
            },
            {
              label: "Proof of address",
              value:
                "Utility bill, lease agreement, letter from a shelter or resettlement agency, or an affidavit confirming the child lives in the school board area.",
            },
            {
              label: "Immunisation records",
              value:
                "Provincial immunisation schedules apply. Ontario requires a statement of immunisation history under the Immunization of School Pupils Act. Exemptions available for medical or religious reasons.",
            },
            {
              label: "Prior school records",
              value:
                "Report cards or transcripts help with grade placement but are not required. Boards conduct their own assessments. International credential recognition varies.",
            },
          ],
        },
        {
          heading: "Newcomer welcome centres",
          items: [
            {
              label: "Welcome centres",
              value:
                "Major school boards in Toronto, Vancouver, Calgary, and Montreal operate newcomer welcome centres that conduct intake assessments, place children in appropriate grades, and connect families with ESL/EAL support.",
            },
            {
              label: "Settlement Workers in Schools (SWIS)",
              value:
                "SWIS workers (available in major urban centres) assist newly arrived families with school enrollment, understanding the school system, and connecting with community services. Free service.",
            },
            {
              label: "Timeline",
              value:
                "Mid-year enrollment is common and accepted. Most boards aim to place children within a week of the initial contact. Assessment may take a few additional days.",
            },
          ],
        },
      ],
    },
    {
      id: "types",
      title: "Types of Schools",
      icon: "🏫",
      sections: [
        {
          heading: "Public schools",
          items: [
            {
              label: "English public school boards",
              value:
                "Free; largest sector. Curriculum set by each province. Catchment-area based with some choice programs.",
            },
            {
              label: "French-language school boards",
              value:
                "Free public schools delivering instruction in French. Available in all provinces. Admission generally restricted to children who qualify under the Canadian Charter (s.23), though immersion programs are open to all.",
            },
            {
              label: "Catholic school boards",
              value:
                "Publicly funded in Alberta, Ontario, and Saskatchewan. Free. Open to non-Catholic children in most boards. Follow provincial curriculum with added religious education.",
            },
          ],
        },
        {
          heading: "Specialty programs",
          items: [
            {
              label: "French immersion",
              value:
                "Available in public schools across Canada. Children are taught predominantly in French. No French background required. Early (JK/Grade 1) and late (Grade 4/6) entry points.",
            },
            {
              label: "International Baccalaureate (IB) schools",
              value:
                "Some public schools offer IB programs free of charge. Private schools also offer IB; tuition varies.",
            },
            {
              label: "Alternative/independent schools",
              value:
                "Private schools charge C$8,000–$40,000/year. Not publicly funded. International students typically pay higher fees or obtain a study permit for private school.",
            },
          ],
        },
        {
          heading: "Home and online schooling",
          items: [
            {
              label: "Home schooling",
              value:
                "Legal in all provinces with varying registration requirements. Parents must register with the school board or provincial ministry. No immigration status restriction.",
            },
            {
              label: "Online / distributed learning",
              value:
                "Many provinces offer provincially accredited online courses, particularly useful for older students or families in remote areas.",
            },
          ],
        },
      ],
    },
    {
      id: "support",
      title: "Language Support",
      icon: "🗣️",
      sections: [
        {
          heading: "ESL and EAL programs",
          items: [
            {
              label: "ESL / EAL instruction",
              value:
                "English as a Second Language (ESL) or English as an Additional Language (EAL) classes are offered within public schools. Intensity ranges from pull-out support to full-time ESL class before mainstreaming.",
            },
            {
              label: "Reception programs",
              value:
                "Some boards run dedicated reception or newcomer classes (e.g., Ontario's New Canadian Classes) for older students with little English, providing intensive language instruction before integration.",
            },
            {
              label: "Heritage language programs",
              value:
                "Many boards offer International Languages programs in the evening or on weekends, teaching students' home languages (Mandarin, Arabic, Urdu, Spanish, Portuguese, etc.).",
            },
          ],
        },
        {
          heading: "Federal and provincial settlement support",
          items: [
            {
              label: "Settlement Workers in Schools (SWIS)",
              value:
                "Funded by Immigration, Refugees and Citizenship Canada (IRCC). SWIS workers are embedded in schools in major cities and help newcomer families navigate the school system and access community resources.",
            },
            {
              label: "LINC — Language Instruction for Newcomers to Canada",
              value:
                "Free federally funded English (or French) classes for adult newcomers with permanent resident or protected person status. Offered at language schools, libraries, and community centres.",
            },
            {
              label: "School-based support teams",
              value:
                "Many boards have psychologists, social workers, and cultural liaisons who support children experiencing settlement challenges, trauma, or learning difficulties related to interrupted schooling.",
            },
          ],
        },
        {
          heading: "Parent support",
          items: [
            {
              label: "Multilingual school communications",
              value:
                "Large boards translate newsletters, consent forms, and report card explanations into the most common home languages. Interpretation is available for parent-teacher interviews.",
            },
            {
              label: "Parent engagement programs",
              value:
                "Programs like the Toronto District School Board's Parent Engagement Office offer multilingual workshops to help immigrant parents understand the Canadian school system.",
            },
          ],
        },
      ],
    },
    {
      id: "higher",
      title: "Higher Education",
      icon: "🎓",
      sections: [
        {
          heading: "Types of post-secondary institutions",
          items: [
            {
              label: "University",
              value:
                "Offers bachelor's (3–4 years), master's (1–2 years), and doctoral degrees. Research-intensive. Admission based on secondary school grades and English/French proficiency.",
            },
            {
              label: "College",
              value:
                "Offers 1–3 year diplomas and certificates in applied and vocational fields. Many colleges have pathways to university degree completion. Often more accessible admissions.",
            },
            {
              label: "CEGEP (Quebec only)",
              value:
                "General and Vocational Colleges offering 2-year pre-university or 3-year technical programs after secondary school. Free for Quebec residents; fees for others.",
            },
          ],
        },
        {
          heading: "Immigrant and international student access",
          items: [
            {
              label: "Permanent resident access",
              value:
                "PRs pay domestic tuition (average C$6,693/year). Eligible for provincial student loans (OSAP and equivalents) after 12 months of residency in the province.",
            },
            {
              label: "Study permit for international students",
              value:
                "Non-PR/non-citizen students require a study permit. International tuition averages C$22,000–$35,000/year. On-campus work allowed (up to 20 hrs/week); off-campus work eligible with full-time enrollment.",
            },
            {
              label: "Post-Graduation Work Permit (PGWP)",
              value:
                "Graduates of eligible Canadian post-secondary programs can apply for a PGWP of up to 3 years. This is a major pathway toward permanent residence.",
            },
          ],
        },
        {
          heading: "Financial aid",
          items: [
            {
              label: "OSAP (Ontario) and provincial equivalents",
              value:
                "Provincial student aid programs provide grants and loans. Eligibility requires Canadian citizenship, PR, or protected person status and proof of residency in the province.",
            },
            {
              label: "Canada Student Grant",
              value:
                "Federal grants of up to C$4,200/year for low-income full-time students (2023-24 rate). Requires OSAP or provincial loan application.",
            },
            {
              label: "Institutional scholarships",
              value:
                "Universities and colleges offer entrance scholarships, bursaries, and awards. Many are open to international students. Apply directly to the institution.",
            },
          ],
        },
      ],
    },
    {
      id: "costs",
      title: "Costs Overview",
      icon: "💰",
      sections: [
        {
          heading: "Early childhood",
          items: [
            {
              label: "Licensed childcare costs",
              value:
                "Average C$1,000–$2,000/month before subsidies. The federal-provincial early learning agreements aim to reduce median fees to C$10/day. By end of 2023, most provinces had reduced under-5 fees by 50%.",
            },
            {
              label: "Canada Child Benefit (CCB)",
              value:
                "Tax-free monthly payment of up to C$7,437/year for children under 6 (2023-24 rate). Available to PRs, refugees, and citizens. Income-tested. Apply through the CRA after obtaining a SIN.",
            },
            {
              label: "Provincial childcare subsidies",
              value:
                "Income-tested subsidies available in all provinces for licensed childcare. PRs and most temporary residents with work permits are eligible.",
            },
          ],
        },
        {
          heading: "K-12 school costs",
          items: [
            {
              label: "Public school tuition",
              value: "Free for all children regardless of immigration status. International students on study permits may be charged fees at some boards (contact board directly).",
            },
            {
              label: "School supplies",
              value:
                "Families typically spend C$200–$400/year on supplies and optional materials. Hot lunch programs, school trips, and extracurriculars involve small fees. Fee waivers are available.",
            },
            {
              label: "School nutrition programs",
              value:
                "Free or subsidised breakfast and lunch programs available in many schools, particularly those in lower-income areas. Availability varies by province and board.",
            },
          ],
        },
        {
          heading: "Higher education costs",
          items: [
            {
              label: "Domestic university tuition",
              value: "Average C$6,693/year (2023-24). Professional programs (medicine, law, MBA) significantly higher. PRs pay domestic rates.",
            },
            {
              label: "International student fees",
              value: "Average C$22,000–$35,000/year undergraduate. Some programs (engineering, business) exceed C$50,000/year at leading universities.",
            },
            {
              label: "Living costs",
              value:
                "Average C$12,000–$18,000/year for housing, food, and transport. Varies significantly by city — Toronto and Vancouver are the most expensive.",
            },
          ],
        },
      ],
    },
  ],
  immigrantNote:
    "All children residing in Canada are entitled to free public K-12 education regardless of immigration status. Contact the local school board to enroll. Settlement Workers in Schools (SWIS) can assist newcomer families. Canada Child Benefit (CCB) is available to permanent residents and many visa holders.",
  officialAuthority: {
    name: "Immigration, Refugees and Citizenship Canada (IRCC) — Newcomers",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/new-life-canada/education.html",
  },
}

// ── Australia ─────────────────────────────────────────────────────────────────

const AU_DATA: SchoolData = {
  country: "AU",
  flag: "🇦🇺",
  name: "Australia",
  systemOverview:
    "Australian schooling is a state and territory responsibility. The school year runs February to December. Compulsory education runs from approximately age 6 to 17, with variations by state. Government (state) schools are free for permanent residents and citizens. Higher education is primarily through universities, with HECS-HELP deferred loans for domestic students.",
  academicYear: "February – December (200 school days)",
  keyNumbers: [
    { label: "Compulsory age", value: "6–17", sub: "varies by state" },
    { label: "School days/year", value: "200" },
    { label: "Year 12 completion", value: "Age 17–18", sub: "ATAR / state certificate" },
    { label: "Domestic university (avg)", value: "A$9,400/yr", sub: "HECS-HELP eligible" },
    { label: "International university fees", value: "A$20,000–45,000/yr", sub: "per year" },
  ],
  stages: [
    {
      name: "Early Childhood Education and Care",
      localName: "ECEC",
      ageRange: "0–4",
      compulsory: false,
      note: "Subsidised through Child Care Subsidy (CCS). Eligible for permanent residents and some visa holders.",
    },
    {
      name: "Preschool / Prep",
      ageRange: "4–5",
      compulsory: false,
      note: "One year of funded preschool (15+ hours/week) is available in most states. Compulsory in some states.",
    },
    {
      name: "Primary School",
      ageRange: "5–12",
      grades: "Prep / Foundation + Years 1–6",
      compulsory: true,
      note: "Entry age varies: 5 in most states, 5.5 in Western Australia.",
    },
    {
      name: "Secondary School",
      ageRange: "12–18",
      grades: "Years 7–12",
      compulsory: true,
      note: "Years 11–12 are senior secondary leading to state certificate (e.g., VCE, HSC, WACE, QCE) and ATAR score for university entry.",
    },
    {
      name: "Higher Education / VET",
      ageRange: "18+",
      compulsory: false,
      note: "University degree or Vocational Education and Training (VET) via TAFE or private RTOs.",
    },
  ],
  categories: [
    {
      id: "enrollment",
      title: "Enrolling Your Child",
      icon: "📋",
      sections: [
        {
          heading: "Entitlement to schooling",
          items: [
            {
              label: "Permanent residents and citizens",
              value:
                "Children of Australian citizens and permanent residents are entitled to free government schooling. Contact the local state school or Department of Education.",
            },
            {
              label: "Temporary visa holders",
              value:
                "Children on temporary visas (e.g., partner visas, bridging visas, some working visas) may be required to pay school fees at government schools, typically A$4,000–$5,000/year for primary.",
              note: "Exemptions exist for some temporary protection visas and humanitarian visa holders.",
            },
            {
              label: "Asylum seekers and refugees",
              value:
                "Children on bridging visas, temporary protection visas, and humanitarian visas are generally entitled to enrol in government schools. Some states waive fees. Contact the state Department of Education for specific advice.",
            },
          ],
        },
        {
          heading: "Required documents",
          items: [
            {
              label: "Proof of age",
              value: "Birth certificate, passport, or official government identity document showing date of birth.",
            },
            {
              label: "Proof of address",
              value:
                "Utility bill, lease agreement, or statutory declaration confirming the family's address in the school's catchment zone.",
            },
            {
              label: "Immunisation record",
              value:
                "Australian Immunisation Register (AIR) immunisation history statement. Children must be up to date or on a catch-up schedule to enrol. AIR records can be obtained through Medicare.",
            },
            {
              label: "Visa documentation",
              value:
                "Evidence of visa type and conditions, as fee liability varies by visa status. Government schools require this to determine whether fees apply.",
            },
            {
              label: "Previous school records",
              value:
                "Reports and transcripts from previous school helpful for year-level placement. Schools may also conduct an assessment. Records in a foreign language should be translated.",
            },
          ],
        },
        {
          heading: "Enrollment process",
          items: [
            {
              label: "Step 1 — Find your local school",
              value:
                "Contact the state Department of Education or use the school finder on your state's education website to identify the local government school for your address.",
            },
            {
              label: "Step 2 — Enroll at the school",
              value:
                "Complete the enrollment form and submit required documents. Some states require enrollment through a central office first, followed by school placement.",
            },
            {
              label: "Step 3 — Language and needs assessment",
              value:
                "New arrivals with English as an additional language are assessed for EAL/D support. Intensive English Centre (IEC) placement may be recommended for secondary students with low English proficiency.",
            },
            {
              label: "Timeline",
              value:
                "Enrollment is possible at any time during the school year. Schools aim to start children promptly. IEC waitlists may cause short delays in some states.",
            },
          ],
        },
      ],
    },
    {
      id: "types",
      title: "Types of Schools",
      icon: "🏫",
      sections: [
        {
          heading: "Government schools",
          items: [
            {
              label: "Government (state) schools",
              value:
                "Free for permanent residents and citizens. Funded by state/territory and federal governments. Largest sector; approximately 65% of Australian students.",
            },
            {
              label: "Intensive English Centres (IECs)",
              value:
                "Specialist programs within or attached to government schools for newly arrived students with little or no English. Typically 1–2 semesters before transitioning to a mainstream school.",
            },
            {
              label: "TAFE (Technical and Further Education)",
              value:
                "Government vocational colleges offering Certificate, Diploma, and Advanced Diploma qualifications. Heavily subsidised for permanent residents. Pathway to university.",
            },
          ],
        },
        {
          heading: "Non-government schools",
          items: [
            {
              label: "Catholic schools",
              value:
                "Approximately 20% of students. Receive some government funding but charge fees (A$2,000–$8,000/year). Open to non-Catholic families.",
            },
            {
              label: "Independent private schools",
              value:
                "Approximately 15% of students. Fees range from A$5,000 to A$40,000+/year. Includes Anglican, Montessori, Steiner, and secular independent schools.",
            },
            {
              label: "International schools",
              value:
                "Offer IB or home-country curricula (e.g., Singapore, Japanese, German, American). Concentrated in major cities. Fees A$15,000–$40,000/year.",
            },
          ],
        },
        {
          heading: "Distance and alternative",
          items: [
            {
              label: "Distance education",
              value:
                "State-run online and correspondence schools serving rural and remote students. Free for government school-eligible students. Useful for highly mobile families.",
            },
            {
              label: "Home schooling",
              value:
                "Legal in all states with registration required. Parents must meet curriculum standards and have the registration reviewed periodically. No immigration status restriction.",
            },
          ],
        },
      ],
    },
    {
      id: "support",
      title: "Language Support",
      icon: "🗣️",
      sections: [
        {
          heading: "EAL/D programs in schools",
          items: [
            {
              label: "EAL/D — English as an Additional Language or Dialect",
              value:
                "Funded program for students whose first language is not English, including Aboriginal and Torres Strait Islander students with English as a dialect. Provided within mainstream schools and through specialist teachers.",
            },
            {
              label: "Intensive English Centres (IECs) and programs",
              value:
                "Specialist full-time English language programs for newly arrived students aged 5-18. Available in most states for recent arrivals. Duration typically 6–12 months. Transition to mainstream school follows.",
            },
            {
              label: "New Arrivals Programs (NAPs)",
              value:
                "Some states (e.g., South Australia) run dedicated New Arrivals Programs within primary and secondary schools providing intensive English and orientation support.",
            },
          ],
        },
        {
          heading: "Adult migrant English support",
          items: [
            {
              label: "AMEP — Adult Migrant English Program",
              value:
                "Free federal program offering up to 510 hours of English language tuition for eligible migrants and humanitarian entrants. Administered by the Department of Home Affairs. Spouse/partner visas and humanitarian visas are eligible. No expiry from 2021.",
            },
            {
              label: "Skills for Education and Employment (SEE)",
              value:
                "Federal program providing free language, literacy, and numeracy training linked to employment outcomes for job-seekers. Available to PRs and humanitarian visa holders.",
            },
            {
              label: "Community language schools",
              value:
                "Saturday or after-school language schools (e.g., Chinese, Greek, Italian, Arabic, Vietnamese) operating across Australia, partially funded by the state. Help maintain heritage language alongside English acquisition.",
            },
          ],
        },
        {
          heading: "School-based integration support",
          items: [
            {
              label: "School support officers and multicultural aides",
              value:
                "Many schools employ multicultural education aides or school support officers who speak community languages to assist newly arrived families and students.",
            },
            {
              label: "Translating and Interpreting Service (TIS National)",
              value:
                "Free telephone interpreting service available to school staff and families for school-related matters. Available in over 160 languages. Call 131 450.",
            },
          ],
        },
      ],
    },
    {
      id: "higher",
      title: "Higher Education",
      icon: "🎓",
      sections: [
        {
          heading: "Degree types and duration",
          items: [
            {
              label: "Bachelor's degree",
              value:
                "3 years standard (4 years for honours or professional programs like engineering/education). Entry based on ATAR score or mature-age pathways. Apply via QTAC, UAC, VTAC, SATAC, or TISC depending on state.",
            },
            {
              label: "Honours year",
              value:
                "1-year research year added after a bachelor's degree (or embedded in a 4-year degree). Required for PhD entry at many institutions.",
            },
            {
              label: "Master's degree",
              value: "1–2 years coursework or research. No undergraduate thesis required for coursework masters.",
            },
            {
              label: "PhD",
              value:
                "3–4 years research. Many candidates are funded through Research Training Program (RTP) stipends (~A$32,000/year tax-free for domestic and some international students).",
            },
            {
              label: "VET — Certificate to Advanced Diploma",
              value:
                "1–3 year vocational qualifications through TAFE or private Registered Training Organisations (RTOs). The Australian Qualifications Framework (AQF) enables VET-to-university pathways.",
            },
          ],
        },
        {
          heading: "Immigration and access",
          items: [
            {
              label: "Student visa (subclass 500)",
              value:
                "Required for non-citizen/non-PR international students. Allows 48 hours of work per fortnight during study. Must maintain Overseas Student Health Cover (OSHC). Tuition A$20,000–$45,000/year.",
            },
            {
              label: "Domestic fee status",
              value:
                "Australian citizens, PRs, and New Zealand citizens studying at Commonwealth-supported places pay HECS-HELP rates (avg A$9,400/year). Loan is repaid through the tax system once income exceeds A$51,550/year.",
            },
            {
              label: "Temporary Graduate visa (subclass 485)",
              value:
                "Allows international graduates to work in Australia post-graduation for 2–4 years (longer for regional study). Major pathway to skilled migration.",
            },
          ],
        },
        {
          heading: "Scholarships and funding",
          items: [
            {
              label: "Australia Awards",
              value:
                "Prestigious scholarships for students from developing countries (mostly Asia-Pacific and Africa). Full tuition, living allowance, and return airfare. Apply through the Australian government at australiaawards.gov.au.",
            },
            {
              label: "Research Training Program (RTP)",
              value:
                "Federal program funding domestic and select international HDR students. Covers tuition fees and provides a living stipend. Apply through university graduate research offices.",
            },
            {
              label: "University-specific scholarships",
              value:
                "Many universities offer merit-based partial scholarships for high-achieving international students (10–50% tuition reduction). Check individual university scholarship pages.",
            },
          ],
        },
      ],
    },
    {
      id: "costs",
      title: "Costs Overview",
      icon: "💰",
      sections: [
        {
          heading: "Early childhood costs",
          items: [
            {
              label: "Child Care Subsidy (CCS)",
              value:
                "Federal subsidy offsetting childcare costs for families earning up to A$354,305/year. Higher subsidies for lower-income families (up to 90% of fees). Available to permanent residents from the first day of residence.",
            },
            {
              label: "Preschool / kindergarten",
              value:
                "One year of funded preschool (minimum 15 hours/week) is provided for all children the year before starting school. Fees vary by state and provider but are heavily subsidised.",
            },
            {
              label: "Temporary visa holder childcare costs",
              value:
                "Families on certain temporary visas may not be eligible for the full CCS. Check eligibility at servicesaustralia.gov.au. Private childcare without CCS averages A$100–$200/day.",
            },
          ],
        },
        {
          heading: "School fees",
          items: [
            {
              label: "Government school fees — PR/citizen",
              value:
                "Free. Families may be asked for a voluntary contribution (A$100–$400/year) but this is not compulsory.",
            },
            {
              label: "Government school fees — temporary visa",
              value:
                "Approximately A$4,000–$5,500/year for primary; A$5,000–$7,000/year for secondary in most states. Some humanitarian and protection visa holders are exempt.",
            },
            {
              label: "School materials",
              value:
                "Annual school levy covers materials in many government schools (A$200–$500/year). Uniforms required at most schools (A$150–$400). Low-income families can access state assistance programs.",
            },
          ],
        },
        {
          heading: "Higher education costs",
          items: [
            {
              label: "Domestic HECS-HELP",
              value:
                "Commonwealth-supported students pay a band-based contribution (avg A$9,400/year). Repayment begins when taxable income exceeds A$51,550 (2023-24 threshold). No upfront payment required.",
            },
            {
              label: "International student tuition",
              value:
                "A$20,000–$45,000/year for most programs. Medicine, dental, and veterinary programs reach A$70,000+/year. Paid upfront each semester.",
            },
            {
              label: "Austudy / Youth Allowance",
              value:
                "Income support payments for eligible domestic students. Australian citizens and PRs may be eligible. International students are not eligible for these payments.",
            },
          ],
        },
      ],
    },
  ],
  immigrantNote:
    "Permanent residents are entitled to free government schooling and HECS-HELP for higher education. Temporary visa holders may pay school fees (A$4,000-5,000/year for government schools). The AMEP program provides 510 free hours of English for eligible adult migrants. Contact your state's Department of Education to confirm fee status for your visa type.",
  officialAuthority: {
    name: "Australian Department of Education",
    url: "https://www.education.gov.au",
  },
}

// ── Data export ───────────────────────────────────────────────────────────────

export const SCHOOL_DATA: SchoolData[] = [US_DATA, DE_DATA, UK_DATA, CA_DATA, AU_DATA]

export function getSchoolData(country: CountryCode): SchoolData | undefined {
  return SCHOOL_DATA.find((d) => d.country === country)
}
