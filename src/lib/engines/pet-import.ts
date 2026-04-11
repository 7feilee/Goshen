/**
 * Pet import guide engine for the Goshen immigration platform.
 *
 * Covers bringing cats and dogs when relocating to US, DE, UK, CA, AU.
 * Fully static — no server or API required.
 * Last verified: 2025.
 */

import type { CountryCode } from "@/types"

// ── Types ─────────────────────────────────────────────────────────────────────

export type PetType = "dog" | "cat" | "both"

export interface RequirementItem {
  label: string
  detail: string
  mandatory: boolean
  timing?: string
  note?: string
}

export interface KeyNumber {
  label: string
  value: string
  sub?: string
}

export interface PetItem {
  label: string
  value: string
  note?: string
}

export interface PetSection {
  heading: string
  items: PetItem[]
}

export interface PetCategory {
  id: string
  title: string
  icon: string
  sections: PetSection[]
}

export interface PetData {
  country: CountryCode
  flag: string
  name: string
  difficultyLevel: "easy" | "moderate" | "strict"
  difficultyNote: string
  immigrantNote: string
  keyNumbers: KeyNumber[]
  requirements: RequirementItem[]
  categories: PetCategory[]
  officialAuthority: { name: string; url: string }
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const PET_DATA: PetData[] = [
  // ── United States ──────────────────────────────────────────────────────────
  {
    country: "US",
    flag: "🇺🇸",
    name: "United States",
    difficultyLevel: "easy",
    difficultyNote: "No federal quarantine for vaccinated pets from most countries; paperwork is straightforward.",
    immigrantNote: "Start with your origin-country vet 4-6 weeks before travel. The 10-day health certificate window is strict — book the vet appointment close to your flight date.",
    keyNumbers: [
      {
        label: "Health Certificate Window",
        value: "10 days",
        sub: "Must be issued within 10 days of arrival",
      },
      {
        label: "Quarantine",
        value: "None",
        sub: "For vaccinated pets from most countries",
      },
      {
        label: "Vet Health Cert Cost",
        value: "$50-$150",
        sub: "USDA-accredited vet required",
      },
      {
        label: "Airline Pet Fee",
        value: "$100-$500",
        sub: "Cabin vs. cargo varies by airline and pet size",
      },
      {
        label: "Microchip",
        value: "ISO Required",
        sub: "ISO 11784/11785 standard",
      },
    ],
    requirements: [
      {
        label: "ISO Microchip",
        detail: "Pet must be implanted with an ISO 11784/11785 compliant microchip (15-digit). If your pet has a non-ISO chip, bring a compatible reader.",
        mandatory: true,
        note: "Microchip must be implanted before or at the same time as the rabies vaccination to count.",
      },
      {
        label: "Valid Rabies Vaccination",
        detail: "Dogs must have a current rabies vaccination administered by a licensed vet. For dogs vaccinated outside the US, the vaccine must be a USDA-licensed product OR the dog must have a USDA-accredited vet certificate, OR a serologic titer test result.",
        mandatory: true,
        timing: "Vaccination must be current at time of entry",
        note: "Dogs from CDC-defined high-risk countries face stricter documentation. Check CDC dog import page before travel.",
      },
      {
        label: "USDA-Accredited Vet Health Certificate",
        detail: "A health certificate signed by a USDA-accredited veterinarian confirming the pet is healthy and free of signs of communicable disease. For cats, this is required by USDA APHIS. For dogs, it satisfies CDC documentation requirements.",
        mandatory: true,
        timing: "Issued within 10 days of arrival in the US",
      },
      {
        label: "Rabies Titer Test (high-risk countries only)",
        detail: "Dogs arriving from countries not on the CDC approved list must show a valid serologic rabies titer test (FAVN or RFFIT) with a result of 0.5 IU/mL or greater, performed at a CDC-approved laboratory.",
        mandatory: false,
        timing: "Test must be performed at least 30 days after rabies vaccination",
        note: "Check CDC website for the current list of high-risk countries. This requirement does not apply to cats.",
      },
      {
        label: "No Import Permit Required",
        detail: "Personal pet dogs and cats do not require an import permit from USDA APHIS. Commercial imports and certain breeds have different rules.",
        mandatory: false,
        note: "Pets for resale or research require USDA import permits.",
      },
    ],
    categories: [
      {
        id: "requirements",
        title: "Entry Requirements",
        icon: "📋",
        sections: [
          {
            heading: "Microchip and Identification",
            items: [
              {
                label: "ISO Microchip",
                value: "ISO 11784/11785 standard (15-digit); implanted before rabies vaccination",
                note: "Bring a compatible scanner if chip is non-ISO",
              },
              {
                label: "Chip Placement Timing",
                value: "Must be implanted before or simultaneously with the first rabies vaccination",
              },
              {
                label: "Chip Registration",
                value: "Register microchip with a national database (AKC Reunite, HomeAgain, or similar) after arrival",
              },
            ],
          },
          {
            heading: "Vaccination Requirements",
            items: [
              {
                label: "Rabies (dogs)",
                value: "Current rabies vaccination required; USDA-licensed vaccine preferred; titer test if from high-risk country",
              },
              {
                label: "Rabies (cats)",
                value: "Strongly recommended; required by most states post-entry; no federal import requirement for cats",
              },
              {
                label: "Other Core Vaccines",
                value: "Not federally required for entry, but recommended (DHPP for dogs, FVRCP for cats) and needed for boarding/kennels",
              },
              {
                label: "High-Risk Country Dogs",
                value: "Additional CDC documentation required: US-issued rabies cert, US-accredited vet attestation, or titer test",
                note: "Applies to dogs vaccinated outside the US in countries on the CDC high-risk list",
              },
            ],
          },
          {
            heading: "Health Certificate",
            items: [
              {
                label: "USDA-Accredited Vet Certificate",
                value: "Must be issued by a USDA-accredited vet within 10 days of arrival",
                note: "Find accredited vets at the USDA APHIS vet locator",
              },
              {
                label: "Certificate Contents",
                value: "Confirms pet is healthy, lists microchip number, rabies vaccination details, and owner information",
              },
              {
                label: "State Endorsement",
                value: "Some airlines and entry ports require the health certificate to be endorsed by the USDA APHIS State Veterinarian office",
                note: "Allow 3-5 business days for USDA endorsement",
              },
            ],
          },
        ],
      },
      {
        id: "process",
        title: "Import Process",
        icon: "🔄",
        sections: [
          {
            heading: "Timeline (Weeks Before Travel)",
            items: [
              {
                label: "8+ weeks before",
                value: "Check your pet is microchipped (ISO); ensure rabies vaccination is current; identify a USDA-accredited vet in your origin country",
              },
              {
                label: "4-6 weeks before",
                value: "If from a high-risk country, begin titer test process (must be done 30+ days after vaccination); book airline pet reservation",
              },
              {
                label: "Within 10 days of flight",
                value: "Visit USDA-accredited vet for health certificate; get USDA State Vet endorsement if required by airline",
              },
              {
                label: "Day of travel",
                value: "Carry all documents in carry-on; present at USDA/CBP inspection at port of entry",
              },
            ],
          },
          {
            heading: "At the Port of Entry",
            items: [
              {
                label: "CBP Inspection",
                value: "US Customs and Border Protection (CBP) officers inspect pets on arrival; present health certificate and vaccination records",
              },
              {
                label: "Approved Ports",
                value: "Most international airports accept pets; dogs may face additional USDA APHIS inspection at some ports",
              },
              {
                label: "What to Carry",
                value: "Original health certificate, rabies certificate, microchip documentation, and titer test results if applicable",
              },
              {
                label: "Cats",
                value: "Cats typically pass through with minimal inspection if documentation is in order; no federal quarantine",
              },
            ],
          },
          {
            heading: "Airline and Carrier Rules",
            items: [
              {
                label: "Cabin (small pets)",
                value: "Pets under ~20 lbs (in-carrier) allowed in cabin on most US airlines; carrier must fit under seat; book in advance",
                note: "Each airline sets its own weight and breed restrictions",
              },
              {
                label: "Cargo/Checked Baggage",
                value: "Larger pets travel as checked baggage or manifest cargo; IATA-approved crate required; climate restrictions apply in summer/winter",
              },
              {
                label: "Breed Restrictions",
                value: "Brachycephalic (snub-nosed) breeds often banned in cargo due to breathing risks; check airline policy",
              },
            ],
          },
        ],
      },
      {
        id: "regulations",
        title: "Ongoing Regulations",
        icon: "📜",
        sections: [
          {
            heading: "Licensing and Registration",
            items: [
              {
                label: "Dog License",
                value: "Required by most US municipalities; register within 30-90 days of establishing residency; annual renewal",
                note: "Fees typically $10-30/yr; lower for spayed/neutered pets",
              },
              {
                label: "Cat Registration",
                value: "Required in some cities (e.g., New York City, Los Angeles); check local ordinances",
              },
              {
                label: "Where to Register",
                value: "City or county animal control office; often can be done online; rabies cert required at time of registration",
              },
            ],
          },
          {
            heading: "Vaccination and Health",
            items: [
              {
                label: "Rabies Vaccination",
                value: "Required by law in all 50 states; frequency varies: 1-year or 3-year vaccine depending on state and product",
              },
              {
                label: "Annual Vet Visit",
                value: "Not legally required but necessary for renewing health records, flea/tick prevention, and heartworm testing",
              },
              {
                label: "Core Vaccines",
                value: "DHPP (distemper, hepatitis, parvo, parainfluenza) and FVRCP (feline viral rhinotracheitis, calicivirus, panleukopenia) recommended annually or every 3 years per vet guidance",
              },
            ],
          },
          {
            heading: "Leash Laws and Breed Restrictions",
            items: [
              {
                label: "Leash Laws",
                value: "Required in virtually all public spaces in US cities; off-leash areas exist in designated dog parks",
              },
              {
                label: "Breed-Specific Legislation (BSL)",
                value: "Pit bulls, Rottweilers, and other breeds are banned or restricted in some cities and counties (e.g., Miami-Dade, Denver)",
                note: "Check local BSL before relocating; HOAs may also impose breed restrictions",
              },
              {
                label: "Apartment and Rental Rules",
                value: "Landlords can restrict pets; HUD rules allow emotional support animals with documentation; always check lease terms",
              },
              {
                label: "Public Transport",
                value: "Only service animals (ADA-defined) are permitted on most public transit; small pets in carriers allowed on some systems (BART, Amtrak)",
              },
            ],
          },
        ],
      },
      {
        id: "quarantine",
        title: "Quarantine Rules",
        icon: "🔒",
        sections: [
          {
            heading: "Federal Quarantine Policy",
            items: [
              {
                label: "No Mandatory Quarantine",
                value: "Vaccinated dogs and cats from most countries enter the US without mandatory quarantine",
              },
              {
                label: "High-Risk Country Dogs",
                value: "Dogs from high-risk countries without proper documentation may be denied entry or required to be returned to origin; no in-country quarantine facility",
              },
              {
                label: "Quarantine at Port",
                value: "CBP may hold a pet at the port of entry for up to 14 days if documentation is incomplete; owner bears cost",
              },
            ],
          },
          {
            heading: "State-Level Quarantine",
            items: [
              {
                label: "Hawaii Special Rules",
                value: "Hawaii has a separate state quarantine program (5-day or 120-day) as it is rabies-free; plan at least 3-6 months in advance for 5-day program",
                note: "Hawaii is NOT part of the continental US entry rules",
              },
              {
                label: "Rabies Exposure",
                value: "A pet that bites someone or is exposed to a rabies suspect animal may be quarantined by local health authorities for 10 days",
              },
              {
                label: "No Home Quarantine",
                value: "There is no standard home quarantine requirement for pets entering the contiguous US from most countries",
              },
            ],
          },
          {
            heading: "Listed and Approved Countries",
            items: [
              {
                label: "CDC Approved Countries",
                value: "Dogs vaccinated in a CDC-approved country with a USDA-licensed vaccine can enter with standard health certificate",
              },
              {
                label: "Non-Approved Country Process",
                value: "Requires US-accredited vet attestation, titer test, or US-issued rabies vaccination before departure",
              },
              {
                label: "Cats",
                value: "No country-based quarantine distinction for cats entering the US; standard health cert sufficient",
              },
            ],
          },
        ],
      },
      {
        id: "costs",
        title: "Cost Overview",
        icon: "💰",
        sections: [
          {
            heading: "Pre-Travel Vet Costs",
            items: [
              {
                label: "Microchip Implant",
                value: "$45-$75 if not already chipped",
              },
              {
                label: "Rabies Vaccination",
                value: "$15-$50 at a vet; free at some municipal clinics",
              },
              {
                label: "Rabies Titer Test (if required)",
                value: "$150-$300 at a USDA-approved laboratory; only needed for high-risk country dogs",
              },
              {
                label: "USDA-Accredited Vet Health Certificate",
                value: "$50-$150; USDA State Vet endorsement adds $38 (USDA fee) plus vet handling fee",
              },
            ],
          },
          {
            heading: "Travel Costs",
            items: [
              {
                label: "Airline Cabin Fee",
                value: "$100-$200 each way; small pets only (carrier fits under seat)",
              },
              {
                label: "Airline Cargo Fee",
                value: "$200-$500 each way; required for larger dogs; IATA crate purchase $50-$200",
              },
              {
                label: "Pet Relocation Service",
                value: "$1,000-$5,000+ for full-service pet relocation agent; handles all paperwork and logistics",
              },
            ],
          },
          {
            heading: "Ongoing Costs in the US",
            items: [
              {
                label: "Dog License",
                value: "$10-$30/yr depending on municipality; spayed/neutered pets often cheaper",
              },
              {
                label: "Annual Rabies Booster",
                value: "$15-$50; required by most states every 1 or 3 years",
              },
              {
                label: "Annual Wellness Visit",
                value: "$50-$250/yr depending on location and services; includes core vaccine boosters",
              },
              {
                label: "Pet Health Insurance",
                value: "$30-$80/month; not required but highly recommended given high US vet costs",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: {
      name: "USDA APHIS / CDC Dog Import",
      url: "https://www.aphis.usda.gov/pet-travel",
    },
  },

  // ── Germany (EU) ───────────────────────────────────────────────────────────
  {
    country: "DE",
    flag: "🇩🇪",
    name: "Germany",
    difficultyLevel: "moderate",
    difficultyNote: "EU pet travel scheme is well-structured but non-EU arrivals may need a rabies titer test 3 months before travel.",
    immigrantNote: "Register your dog with the Gemeinde (local municipality) for Hundesteuer within weeks of arrival. Liability insurance (Haftpflichtversicherung) is mandatory for dogs in several German states.",
    keyNumbers: [
      {
        label: "Quarantine",
        value: "None",
        sub: "For pets meeting EU requirements from listed countries",
      },
      {
        label: "RNAT Titer Test",
        value: "3 months",
        sub: "Wait after titer test before traveling from non-listed countries",
      },
      {
        label: "Hundesteuer",
        value: "EUR 100-200/yr",
        sub: "Dog tax; varies by municipality",
      },
      {
        label: "EU Pet Passport",
        value: "EUR 30-50",
        sub: "Issued by an official vet after microchip and vaccination",
      },
      {
        label: "Rabies Titer Test",
        value: "EUR 150-300",
        sub: "Only required if coming from non-listed (non-approved) country",
      },
    ],
    requirements: [
      {
        label: "ISO Microchip",
        detail: "Pet must be implanted with an ISO 11784/11785 compliant microchip before the rabies vaccination. This is an EU-wide legal requirement.",
        mandatory: true,
      },
      {
        label: "Rabies Vaccination",
        detail: "A valid anti-rabies vaccination administered after microchipping. The vaccine must be at least 21 days old at the time of entry into Germany/EU.",
        mandatory: true,
        timing: "At least 21 days before travel",
        note: "Initial primary vaccination: must wait 21 days. Booster vaccinations given in time: no waiting period required.",
      },
      {
        label: "EU Pet Passport or Third-Country Health Certificate",
        detail: "Pets from within the EU carry an EU Pet Passport issued by an official vet. Pets from non-EU countries require a third-country health certificate in the official EU format, endorsed by the national authority of the origin country.",
        mandatory: true,
        note: "The certificate format is defined by EU Regulation No 577/2013 (or successor regulations).",
      },
      {
        label: "Rabies Neutralising Antibody Test (RNAT)",
        detail: "Required if traveling from a non-listed (non-EU-approved) country. The RNAT must show a result of 0.5 IU/mL or greater. The test must be performed at an EU-approved laboratory at least 30 days after vaccination.",
        mandatory: false,
        timing: "Test at least 30 days after vaccination; then wait 3 months before entering the EU",
        note: "Applies to dogs and cats. Check if your origin country is on the EU approved (listed) country list at the European Commission website.",
      },
      {
        label: "Tapeworm Treatment (dogs from UK/Belarus/Russia)",
        detail: "Dogs entering Germany from the UK, Belarus, or Russia must have tapeworm (Echinococcus) treatment administered by a vet, recorded in the health certificate, given 1-5 days before arrival.",
        mandatory: false,
        timing: "1-5 days before arrival",
        note: "This does not apply to cats or to dogs from other countries.",
      },
    ],
    categories: [
      {
        id: "requirements",
        title: "Entry Requirements",
        icon: "📋",
        sections: [
          {
            heading: "Microchip and Documentation",
            items: [
              {
                label: "ISO Microchip",
                value: "ISO 11784/11785 (15-digit); must be implanted before first rabies vaccination",
              },
              {
                label: "EU Pet Passport",
                value: "Issued by an official vet; contains microchip number, vaccination records, and owner details; valid across all EU/EEA countries",
                note: "Non-EU pets need a third-country health certificate instead",
              },
              {
                label: "Third-Country Health Certificate",
                value: "For pets arriving from outside the EU; must be in the official EU format and endorsed by the national veterinary authority of the origin country",
              },
            ],
          },
          {
            heading: "Vaccination Requirements",
            items: [
              {
                label: "Rabies Vaccination",
                value: "Mandatory; must be at least 21 days old at time of entry; booster vaccinations are valid immediately if administered on time",
              },
              {
                label: "Other Core Vaccines",
                value: "Not required for entry but recommended: distemper, hepatitis, parvovirus, parainfluenza for dogs; herpesvirus, calicivirus, panleukopenia for cats",
              },
              {
                label: "RNAT Titer Test",
                value: "Required for pets from non-listed countries; minimum result 0.5 IU/mL; must be done at an EU-approved laboratory",
                note: "After a passing titer test result, the pet must wait 3 months before entering the EU",
              },
            ],
          },
          {
            heading: "Listed vs. Non-Listed Countries",
            items: [
              {
                label: "Listed (Part 1) Countries",
                value: "Countries recognized as equivalent to EU standards (e.g., UK, US, Canada, Australia, Switzerland, Norway); no titer test required",
              },
              {
                label: "Listed (Part 2) Countries",
                value: "Countries with lower rabies risk; titer test not required but a waiting period may apply",
              },
              {
                label: "Non-Listed Countries",
                value: "All other countries; RNAT titer test required with 3-month wait; certificate endorsed by national authority required",
              },
            ],
          },
        ],
      },
      {
        id: "process",
        title: "Import Process",
        icon: "🔄",
        sections: [
          {
            heading: "Timeline Before Travel",
            items: [
              {
                label: "6+ months before (non-listed countries)",
                value: "Get microchip implanted; administer rabies vaccination; wait 30 days; perform RNAT titer test at EU-approved lab; then wait 3 months",
              },
              {
                label: "4-8 weeks before (listed countries)",
                value: "Confirm microchip and rabies vaccination are current; arrange EU health certificate with official vet in origin country; obtain national authority endorsement",
              },
              {
                label: "Final week",
                value: "Collect endorsed health certificate; check airline pet requirements; confirm EU-approved carrier and entry route",
              },
            ],
          },
          {
            heading: "Documentation Flow",
            items: [
              {
                label: "Step 1: Official Vet in Origin Country",
                value: "Vet completes the EU-format health certificate, records microchip number, vaccination dates, and any test results",
              },
              {
                label: "Step 2: National Authority Endorsement",
                value: "The certificate must be signed and stamped by the national veterinary authority of the origin country (e.g., USDA APHIS in the US, CFIA in Canada)",
              },
              {
                label: "Step 3: Entry at Approved BIP",
                value: "Pets must enter Germany through an approved Border Inspection Post (BIP); not all entry points accept animals",
                note: "Frankfurt, Munich, Hamburg, Berlin airports have approved BIPs for personal pets",
              },
              {
                label: "Step 4: Document Check at BIP",
                value: "Official vet at the BIP checks microchip, certificate, and vaccination records; fee may apply (~EUR 30-60)",
              },
            ],
          },
          {
            heading: "Approved Laboratories",
            items: [
              {
                label: "EU-Approved RNAT Labs",
                value: "Titer tests must be performed at an EU-approved laboratory; list published by European Commission; examples include Friedrich-Loeffler-Institut (Germany), ANSES (France)",
              },
              {
                label: "Results Timeline",
                value: "RNAT results typically take 2-4 weeks; plan accordingly in the 3-month waiting period",
              },
              {
                label: "Lab Accreditation",
                value: "Only EU-approved labs are accepted; US labs (KSU, Auburn) are also on the approved list for tests performed before departure from the US",
              },
            ],
          },
        ],
      },
      {
        id: "regulations",
        title: "Ongoing Regulations",
        icon: "📜",
        sections: [
          {
            heading: "Dog Tax and Registration",
            items: [
              {
                label: "Hundesteuer (Dog Tax)",
                value: "Register your dog with the local Gemeinde (municipality) within weeks of arrival; annual fee EUR 100-200 for first dog, EUR 200-400 for second dog",
                note: "Munich: ~EUR 100/yr; Berlin: ~EUR 120/yr; rates vary significantly by city",
              },
              {
                label: "Dog Tag",
                value: "After paying Hundesteuer, you receive a metal dog tag (Hundesteuermarke) that must be worn by your dog at all times in public",
              },
              {
                label: "Cats",
                value: "Cats are not subject to Hundesteuer; some states (e.g., Niedersachsen) require cat registration to manage feral cat populations",
              },
            ],
          },
          {
            heading: "Liability Insurance (Haftpflichtversicherung)",
            items: [
              {
                label: "Mandatory States",
                value: "Dog liability insurance is legally required in Bavaria, Hamburg, Berlin, Lower Saxony, Schleswig-Holstein, Thuringia, and Saxony-Anhalt",
              },
              {
                label: "Recommended Everywhere",
                value: "Even where not mandatory, dog liability insurance is strongly recommended; covers damage your dog causes to people or property",
              },
              {
                label: "Cost",
                value: "EUR 40-100/yr depending on dog breed, size, and insurer; higher for listed breeds",
              },
            ],
          },
          {
            heading: "Breed-Specific Legislation (BSL)",
            items: [
              {
                label: "Bundesland (State) Bans",
                value: "BSL varies by state: Bavaria and North Rhine-Westphalia have lists of restricted breeds (Pit Bull, American Staffordshire Terrier, Rottweiler in some contexts)",
                note: "Check the specific Gefahrhundeverordnung of your Bundesland",
              },
              {
                label: "Wesenstest (Temperament Test)",
                value: "Several states require a temperament test for breeds on the restricted list before they are allowed in public without a muzzle",
              },
              {
                label: "Muzzle and Leash Rules",
                value: "Restricted breeds must wear a muzzle and be on a short leash in public areas in many states; confirm local rules",
              },
              {
                label: "Public Transport",
                value: "Dogs allowed on most German public transport (U-Bahn, S-Bahn, buses) with a ticket (half-price or child ticket); must be on a leash or in a carrier; muzzle often required",
              },
            ],
          },
        ],
      },
      {
        id: "quarantine",
        title: "Quarantine Rules",
        icon: "🔒",
        sections: [
          {
            heading: "EU-Listed Country Pets",
            items: [
              {
                label: "No Quarantine",
                value: "Pets arriving from EU-listed countries meeting all requirements (microchip, vaccination, certificate) face no quarantine in Germany",
              },
              {
                label: "Document Verification Only",
                value: "BIP official vet checks documents and microchip; if all in order, pet is released immediately",
              },
              {
                label: "Conditional Release",
                value: "If minor documentation issues arise (e.g., certificate irregularity), pet may be held briefly at the BIP; owner bears cost",
              },
            ],
          },
          {
            heading: "Non-Listed Country Pets",
            items: [
              {
                label: "RNAT Waiting Period",
                value: "Pets from non-listed countries must complete the 3-month RNAT waiting period before travel; this is managed in the origin country, not in Germany",
              },
              {
                label: "Refusal of Entry",
                value: "Pets without proper RNAT documentation from non-listed countries will be refused entry and must return to the origin country",
              },
              {
                label: "No German Quarantine Facilities",
                value: "Germany does not operate pet quarantine facilities for import purposes; non-compliant pets are returned, not held",
              },
            ],
          },
          {
            heading: "Rabies-Free Status",
            items: [
              {
                label: "Germany Rabies Status",
                value: "Germany is officially rabies-free (in domestic animals) since 2008; strict entry requirements protect this status",
              },
              {
                label: "EU Approved Country List",
                value: "Pets from EU approved countries (listed Part 1 and Part 2) can enter without titer testing; list includes US, Canada, Australia, and most developed nations",
              },
              {
                label: "Post-Entry Rules",
                value: "No post-entry isolation or home quarantine required for pets meeting all entry conditions",
              },
            ],
          },
        ],
      },
      {
        id: "costs",
        title: "Cost Overview",
        icon: "💰",
        sections: [
          {
            heading: "Pre-Travel Costs",
            items: [
              {
                label: "EU Pet Passport",
                value: "EUR 30-50; issued by official vet in origin country or upon arrival if EU-based",
              },
              {
                label: "RNAT Titer Test",
                value: "EUR 150-300 (test fee); lab fees vary; only required for non-listed country pets",
              },
              {
                label: "Third-Country Health Certificate",
                value: "EUR 50-150 (vet fee) + national authority endorsement fee (e.g., USDA fee ~$38 in the US)",
              },
              {
                label: "Tapeworm Treatment",
                value: "EUR 20-50; only for dogs from UK, Belarus, and Russia",
              },
            ],
          },
          {
            heading: "Travel Costs",
            items: [
              {
                label: "Airline Cabin Fee",
                value: "EUR 50-150 each way; small pets in cabin (carrier under seat); book early as spots are limited",
              },
              {
                label: "Airline Cargo/Hold",
                value: "EUR 200-500 each way for larger pets traveling in the hold; IATA crate required",
              },
              {
                label: "BIP Inspection Fee",
                value: "EUR 30-60 at the border inspection post; varies by airport",
              },
            ],
          },
          {
            heading: "Ongoing Annual Costs in Germany",
            items: [
              {
                label: "Hundesteuer",
                value: "EUR 100-200/yr for first dog; EUR 200-400/yr for second dog; varies by municipality",
              },
              {
                label: "Dog Liability Insurance",
                value: "EUR 40-100/yr; mandatory in several states",
              },
              {
                label: "Annual Vaccinations and Vet",
                value: "EUR 80-200/yr for annual wellness visit and booster vaccines",
              },
              {
                label: "Pet Health Insurance",
                value: "EUR 20-80/month optional but recommended; covers surgery and serious illness",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: {
      name: "BMEL (Bundesministerium fuer Ernaehrung und Landwirtschaft)",
      url: "https://www.bmel.de/EN/topics/animals/pets/pets_node.html",
    },
  },

  // ── United Kingdom ─────────────────────────────────────────────────────────
  {
    country: "UK",
    flag: "🇬🇧",
    name: "United Kingdom",
    difficultyLevel: "moderate",
    difficultyNote: "Post-Brexit the UK runs its own pet travel scheme; tapeworm treatment for dogs and an Animal Health Certificate are required, and only approved routes and carriers may be used.",
    immigrantNote: "Book with an approved carrier well in advance as not all routes are approved. Dogs need tapeworm treatment 1-5 days before arrival — timing this precisely around your flight is critical.",
    keyNumbers: [
      {
        label: "Tapeworm Treatment",
        value: "1-5 days",
        sub: "Before arrival; dogs only; administered by a vet",
      },
      {
        label: "Quarantine (unlisted countries)",
        value: "4 months",
        sub: "OR blood test 30 days post-vaccine then 3-month wait",
      },
      {
        label: "AHC Certificate Cost",
        value: "GBP 150-300",
        sub: "Animal Health Certificate from official vet",
      },
      {
        label: "Tapeworm Treatment Cost",
        value: "GBP 30-50",
        sub: "Vet-administered praziquantel treatment",
      },
      {
        label: "Rabies Vaccination Wait",
        value: "21 days",
        sub: "Minimum before entry into UK",
      },
    ],
    requirements: [
      {
        label: "ISO Microchip",
        detail: "All dogs and cats must have an ISO 11784/11785 compliant microchip implanted before the rabies vaccination. Microchipping is a legal requirement for all dogs in England, Scotland, and Wales (since 2016) and all cats (since June 2024).",
        mandatory: true,
      },
      {
        label: "Rabies Vaccination",
        detail: "A valid rabies vaccination administered after microchipping. The vaccine must be at least 21 days old at time of entry.",
        mandatory: true,
        timing: "At least 21 days before travel to the UK",
      },
      {
        label: "Animal Health Certificate (AHC)",
        detail: "An Animal Health Certificate issued by an Official Veterinarian (OV) in the origin country. The UK no longer accepts EU pet passports. The AHC is valid for 10 days for entry, 4 months for onward travel within the UK, and for return to the issuing country.",
        mandatory: true,
        note: "The AHC must be issued by an approved Official Veterinarian; the UK publishes a list of recognised third-country OVs.",
      },
      {
        label: "Tapeworm Treatment (dogs only)",
        detail: "Dogs must be treated against Echinococcus multilocularis tapeworm by a licensed vet. The treatment must be recorded in the AHC with the product name, date, and time of treatment.",
        mandatory: true,
        timing: "Administered by a vet no less than 24 hours and no more than 5 days before scheduled arrival in the UK",
        note: "Cats do not require tapeworm treatment. The timing window is strict — coordinate carefully with your flight schedule.",
      },
      {
        label: "Approved Route and Carrier",
        detail: "Pets must travel via an approved route with an approved carrier. Not all ferry services, airlines, or ports accept pets under the UK pet travel scheme.",
        mandatory: true,
        note: "Check the UK government approved carrier and route list before booking; pet spaces are limited on many routes.",
      },
      {
        label: "Rabies Titer Test (unlisted countries only)",
        detail: "Pets from countries not on the UK approved country list must have a rabies antibody blood test at least 30 days after vaccination, then wait 3 months before entering the UK. Alternatively, they must complete 4 months of approved quarantine.",
        mandatory: false,
        timing: "Blood test at least 30 days post-vaccination; then 3-month wait before travel",
        note: "Most common immigrant origin countries (India, Philippines, Nigeria, Pakistan, Mexico, Brazil) are NOT on the UK approved list.",
      },
    ],
    categories: [
      {
        id: "requirements",
        title: "Entry Requirements",
        icon: "📋",
        sections: [
          {
            heading: "Microchip and Identity",
            items: [
              {
                label: "ISO Microchip",
                value: "ISO 11784/11785 (15-digit); legally required for all dogs since 2016 and cats since June 2024",
              },
              {
                label: "Timing",
                value: "Microchip must be implanted before or at the same time as the first rabies vaccination; chip implanted after vaccination means the vaccination does not count",
              },
              {
                label: "EU Pet Passports",
                value: "No longer accepted by the UK since Brexit (January 2021); an AHC is required instead",
              },
            ],
          },
          {
            heading: "Health Certificate (AHC)",
            items: [
              {
                label: "Animal Health Certificate",
                value: "Must be completed by an Official Veterinarian (OV) endorsed by the national authority of the origin country",
              },
              {
                label: "AHC Validity",
                value: "Valid for 10 days for entry into the UK from date of examination; valid 4 months for travel within the UK after entry",
              },
              {
                label: "Contents",
                value: "Microchip number, rabies vaccination details, tapeworm treatment record (dogs), owner details, travel route, and OV signature and endorsement",
              },
            ],
          },
          {
            heading: "Tapeworm Treatment (Dogs)",
            items: [
              {
                label: "Active Ingredient",
                value: "Praziquantel; must be administered at a dose effective against Echinococcus multilocularis",
              },
              {
                label: "Timing Window",
                value: "No less than 24 hours and no more than 5 days (120 hours) before scheduled arrival in Great Britain; not required for Northern Ireland",
                note: "The treatment clock starts when the vet administers it, not when you board the flight",
              },
              {
                label: "Documentation",
                value: "Treatment date and time, product name, dose, and vet signature must be recorded in the AHC",
              },
            ],
          },
        ],
      },
      {
        id: "process",
        title: "Import Process",
        icon: "🔄",
        sections: [
          {
            heading: "Timeline Before Travel",
            items: [
              {
                label: "If from unlisted country: 5+ months before",
                value: "Microchip; rabies vaccination; wait 30 days; rabies blood test at approved lab; wait 3 months; then book travel",
              },
              {
                label: "If from listed country: 4-6 weeks before",
                value: "Confirm microchip and rabies vaccine are current (vaccine must be 21+ days old at entry); identify Official Veterinarian; book approved carrier and route",
              },
              {
                label: "3-5 days before departure",
                value: "OV issues AHC (valid 10 days); dogs must have tapeworm treatment timed within 1-5 days before UK arrival",
              },
              {
                label: "At departure",
                value: "Check in pet with carrier; carry AHC and all supporting documents in hand luggage",
              },
            ],
          },
          {
            heading: "Approved Routes and Ports",
            items: [
              {
                label: "Approved Ports",
                value: "Heathrow, Gatwick, Manchester, Birmingham airports; Dover, Folkestone (Eurotunnel), Portsmouth, Harwich ferry ports; full list on GOV.UK",
              },
              {
                label: "Approved Carriers",
                value: "Select airlines and ferry operators are approved; verify before booking as unapproved carriers cannot transport pets under the scheme",
              },
              {
                label: "Arrival Inspection",
                value: "APHA officer at the approved port checks documents and microchip; if all correct, pet is released immediately",
              },
            ],
          },
          {
            heading: "Official Veterinarian (OV) Process",
            items: [
              {
                label: "Finding an OV",
                value: "In most countries the OV must be licensed by the national authority; in the US, a USDA-accredited vet acts as OV; the UK publishes country-specific guidance",
              },
              {
                label: "USDA Endorsement (from US)",
                value: "AHC must be endorsed by a USDA State Veterinarian before travel; allow 3-5 business days",
              },
              {
                label: "AHC Copies",
                value: "Carry original plus at least one copy; APHA keeps the original at port of entry",
              },
            ],
          },
        ],
      },
      {
        id: "regulations",
        title: "Ongoing Regulations",
        icon: "📜",
        sections: [
          {
            heading: "Microchipping and Registration",
            items: [
              {
                label: "Dogs",
                value: "All dogs in England, Scotland, and Wales must be microchipped and registered on a compliant database; keepers must keep contact details up to date",
              },
              {
                label: "Cats",
                value: "All cats in England must be microchipped by June 2024 (new law); Scotland and Wales expected to follow",
              },
              {
                label: "No Dog Licensing",
                value: "The UK abolished the dog licence in 1987; there is no annual registration fee for dogs or cats at the national level",
              },
            ],
          },
          {
            heading: "Breed-Specific Legislation",
            items: [
              {
                label: "Prohibited Breeds (Dangerous Dogs Act 1991)",
                value: "Pit Bull Terrier, Japanese Tosa, Dogo Argentino, and Fila Brasileiro are banned in the UK; owning, selling, breeding, or importing is illegal",
              },
              {
                label: "XL Bully",
                value: "XL Bully added to the prohibited list from 1 February 2024; existing XL Bullies must be neutered, microchipped, and kept on a lead and muzzled in public",
              },
              {
                label: "Local PSPOs",
                value: "Some councils issue Public Space Protection Orders (PSPOs) banning dogs from specific public areas such as beaches or parks; check local council rules",
              },
            ],
          },
          {
            heading: "Vaccinations and Public Rules",
            items: [
              {
                label: "Annual Booster Vaccines",
                value: "Not legally required by the state but strongly recommended by vets; required by kennels, doggy day care, and many insurers",
              },
              {
                label: "Leash Rules",
                value: "No national leash law in the UK; local PSPOs and traffic roads legislation require leads near roads; many councils designate off-lead areas",
              },
              {
                label: "Public Transport",
                value: "Small pets in carriers generally accepted on rail, London Underground, and bus with owner discretion; dogs on leads allowed on most National Rail services; some operators charge a fee",
              },
              {
                label: "Rental Accommodation",
                value: "Landlords can restrict pets; Renters (Reform) Bill (2024) aims to make it harder to blanket-ban pets; always confirm before signing lease",
              },
            ],
          },
        ],
      },
      {
        id: "quarantine",
        title: "Quarantine Rules",
        icon: "🔒",
        sections: [
          {
            heading: "Listed Country Pets (No Quarantine)",
            items: [
              {
                label: "Approved Country List",
                value: "Most EU countries, US, Canada, Australia, New Zealand, Japan, Singapore, and others; pets meeting all AHC requirements can enter without quarantine",
              },
              {
                label: "No Quarantine on Arrival",
                value: "Compliant pets from listed countries are cleared at the port of entry after document and microchip check only",
              },
              {
                label: "What Counts as Listed",
                value: "Full list published on GOV.UK under Pet Travel: approved countries; check before travel as the list can be updated",
              },
            ],
          },
          {
            heading: "Unlisted Country Pets (Quarantine Required)",
            items: [
              {
                label: "4-Month Quarantine Option",
                value: "Pets from non-listed countries may enter the UK and complete 4 months in an approved quarantine facility; owner bears cost (approx. GBP 1,500-3,500 depending on species and facility)",
              },
              {
                label: "Alternative Blood Test Route",
                value: "To avoid quarantine: rabies vaccination, then blood test 30 days later at an approved lab, then 3-month wait before entry; no quarantine on arrival if all steps correct",
              },
              {
                label: "Approved Quarantine Facilities",
                value: "APHA-approved facilities in England; list published on GOV.UK; pets must be booked in advance and space is limited",
              },
            ],
          },
          {
            heading: "Common Unlisted Origin Countries",
            items: [
              {
                label: "South Asia (India, Pakistan, Bangladesh)",
                value: "Not on approved list; blood test route is the most practical; begin process 5-6 months before planned travel",
              },
              {
                label: "Africa and Middle East",
                value: "Most countries not listed; same 5-month blood test process or 4-month quarantine applies",
              },
              {
                label: "Latin America",
                value: "Brazil, Mexico, Colombia and most others are not listed; plan well in advance; pet relocation agents recommended",
              },
            ],
          },
        ],
      },
      {
        id: "costs",
        title: "Cost Overview",
        icon: "💰",
        sections: [
          {
            heading: "Pre-Travel Preparation",
            items: [
              {
                label: "Animal Health Certificate (AHC)",
                value: "GBP 150-300; issued by Official Veterinarian; includes examination fee and paperwork",
              },
              {
                label: "Tapeworm Treatment",
                value: "GBP 30-50; vet-administered praziquantel; dogs only",
              },
              {
                label: "Rabies Blood Test (unlisted countries)",
                value: "GBP 100-200 at an approved laboratory; only needed for pets from non-listed countries",
              },
              {
                label: "Rabies Vaccination",
                value: "GBP 30-80 per dose at a vet",
              },
            ],
          },
          {
            heading: "Travel and Quarantine",
            items: [
              {
                label: "Airline Pet Fee",
                value: "GBP 100-500 each way depending on airline, route, and whether in cabin or hold",
              },
              {
                label: "4-Month Quarantine (if applicable)",
                value: "GBP 1,500-3,500; APHA-approved facility; owner provides food; does not include transport to facility",
              },
              {
                label: "Port Inspection Fee",
                value: "No separate fee for the APHA check at the port of entry for personal pets",
              },
            ],
          },
          {
            heading: "Ongoing Costs in the UK",
            items: [
              {
                label: "No Dog Licence Fee",
                value: "No annual government licensing or registration fee for dogs or cats",
              },
              {
                label: "Annual Vaccines and Vet",
                value: "GBP 60-150/yr for annual booster vaccinations and wellness check",
              },
              {
                label: "Pet Insurance",
                value: "GBP 20-80/month depending on breed, age, and coverage level; highly recommended given UK vet costs",
              },
              {
                label: "Microchip Database Registration",
                value: "Usually free or GBP 5-20 one-time fee to register on a UK compliant database",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: {
      name: "APHA (Animal and Plant Health Agency) / GOV.UK Pet Travel",
      url: "https://www.gov.uk/bring-pet-to-great-britain",
    },
  },

  // ── Canada ─────────────────────────────────────────────────────────────────
  {
    country: "CA",
    flag: "🇨🇦",
    name: "Canada",
    difficultyLevel: "easy",
    difficultyNote: "Canada has minimal import requirements for cats and straightforward rabies certificate requirements for dogs; no quarantine for vaccinated personal pets.",
    immigrantNote: "If moving from the US, requirements are minimal. From other countries, ensure your dog has a valid rabies certificate. Cats have virtually no federal import requirements, though local licensing usually applies.",
    keyNumbers: [
      {
        label: "Quarantine",
        value: "None",
        sub: "For vaccinated personal pets",
      },
      {
        label: "Dog Rabies Cert",
        value: "Required",
        sub: "Vaccination given at 12+ weeks and valid at time of entry",
      },
      {
        label: "Cat Requirements",
        value: "Minimal",
        sub: "No federal requirement from most countries; rabies recommended",
      },
      {
        label: "Municipal License",
        value: "C$20-60/yr",
        sub: "Required by most Canadian cities",
      },
      {
        label: "CFIA Endorsement",
        value: "C$30",
        sub: "CFIA health certificate endorsement fee",
      },
    ],
    requirements: [
      {
        label: "ISO Microchip (Recommended)",
        detail: "No federal microchip requirement for import, but microchipping is recommended and required by most municipal licensing authorities in Canada.",
        mandatory: false,
        note: "Get your pet microchipped before arrival to simplify local registration.",
      },
      {
        label: "Rabies Vaccination Certificate (Dogs)",
        detail: "Dogs must have a valid rabies vaccination certificate showing the vaccine was administered when the dog was at least 12 weeks old and the vaccination is still valid at time of entry.",
        mandatory: true,
        note: "Certificate must include: dog description, owner details, vaccine product name, date of administration, and veterinarian signature.",
      },
      {
        label: "Veterinary Health Certificate (from non-US countries)",
        detail: "Dogs (and recommended for cats) arriving from countries other than the US require a health certificate from a licensed veterinarian in the origin country stating the pet is healthy and free of infectious disease.",
        mandatory: false,
        timing: "Issued close to travel date; CFIA does not specify a strict window but within 2 weeks is standard practice",
        note: "The health certificate can be endorsed by CFIA ($30 fee) though this is not required for personal pets.",
      },
      {
        label: "No Import Permit Required",
        detail: "Personal pet dogs and cats do not require an import permit from CFIA. Commercial imports, research animals, and certain endangered species are subject to different rules.",
        mandatory: false,
      },
      {
        label: "Puppies Under 8 Months (complex rules)",
        detail: "Puppies under 8 months from countries where canine rabies is present face additional requirements and may not qualify for the simplified rabies certificate process. Contact CFIA directly for current rules.",
        mandatory: false,
        note: "Puppies under 3 months from non-rabies-free countries cannot be imported without special authorization.",
      },
    ],
    categories: [
      {
        id: "requirements",
        title: "Entry Requirements",
        icon: "📋",
        sections: [
          {
            heading: "Dogs from the United States",
            items: [
              {
                label: "Rabies Certificate",
                value: "A valid rabies vaccination certificate is required; no other federal requirements",
              },
              {
                label: "Health Certificate",
                value: "Not required but airlines may require one; check with your carrier",
              },
              {
                label: "No Import Permit",
                value: "No import permit or advance notification required for personal pets from the US",
              },
            ],
          },
          {
            heading: "Dogs from Other Countries",
            items: [
              {
                label: "Rabies Certificate",
                value: "Valid rabies vaccination certificate required; vaccination must have been given when dog was at least 12 weeks old",
              },
              {
                label: "Vet Health Certificate",
                value: "Recommended (sometimes required by airline or CBSA officer); states pet is healthy and vaccinated",
              },
              {
                label: "From Rabies-Free Countries",
                value: "Dogs from countries recognized as rabies-free (e.g., Australia, NZ, Iceland, Japan, UK) may enter with an official certificate of origin; CFIA should be consulted for specifics",
                note: "Rules can change; always verify with CFIA before travel",
              },
            ],
          },
          {
            heading: "Cats (All Origins)",
            items: [
              {
                label: "From the United States",
                value: "No federal requirements; cats from the US can enter freely with no documentation (though rabies vaccine is recommended and required in most provinces)",
              },
              {
                label: "From Other Countries",
                value: "No federal import requirement for cats; CFIA recommends a health certificate for air travel; airline may require one",
              },
              {
                label: "Microchip",
                value: "Not federally required for entry but needed for municipal licensing in most Canadian cities; implant before travel",
              },
            ],
          },
        ],
      },
      {
        id: "process",
        title: "Import Process",
        icon: "🔄",
        sections: [
          {
            heading: "Timeline Before Travel",
            items: [
              {
                label: "4-6 weeks before",
                value: "Ensure rabies vaccination is current; schedule vet visit for health certificate; confirm airline pet reservation",
              },
              {
                label: "1-2 weeks before",
                value: "Obtain health certificate from vet; get CFIA endorsement if needed; confirm airline pet requirements",
              },
              {
                label: "Day of travel",
                value: "Carry rabies certificate and health certificate in hand luggage; declare pet to CBSA on arrival card",
              },
            ],
          },
          {
            heading: "At the Border",
            items: [
              {
                label: "CBSA Declaration",
                value: "Declare your pet on the CBSA arrival card; CBSA officers may ask to see the rabies certificate",
              },
              {
                label: "Document Check",
                value: "CBSA checks that the rabies certificate is valid; health certificate may also be reviewed; inspection is typically brief",
              },
              {
                label: "No Advance Reservation",
                value: "Unlike some countries, Canada does not require advance notification or booking for pet imports at most ports of entry",
              },
            ],
          },
          {
            heading: "Airline and Carrier Requirements",
            items: [
              {
                label: "Cabin Travel",
                value: "Most Canadian carriers (Air Canada, WestJet) allow small pets in cabin; carrier must fit under seat; weight limits typically 10 kg in-carrier",
              },
              {
                label: "Cargo Travel",
                value: "Larger dogs travel as checked baggage or manifest cargo; IATA-approved crate; temperature restrictions apply",
              },
              {
                label: "International Arrivals",
                value: "Pets on international flights arrive through international terminal; follow CBSA signs for animal inspection",
              },
            ],
          },
        ],
      },
      {
        id: "regulations",
        title: "Ongoing Regulations",
        icon: "📜",
        sections: [
          {
            heading: "Licensing and Registration",
            items: [
              {
                label: "Municipal Dog Licence",
                value: "Required in virtually all Canadian cities and municipalities; must register within 30-90 days of establishing residence; annual renewal",
                note: "Vancouver: ~C$45/yr; Toronto: ~C$50/yr; Calgary: ~C$35/yr",
              },
              {
                label: "Cat Licensing",
                value: "Required in some municipalities (e.g., Edmonton, Winnipeg); check local rules",
              },
              {
                label: "Microchip for Licensing",
                value: "Most cities require microchip registration as part of pet licensing; bring chip number to licence application",
              },
            ],
          },
          {
            heading: "Vaccinations and Health",
            items: [
              {
                label: "Rabies Vaccination",
                value: "Required by law in most provinces (Ontario, BC, Alberta, Quebec, etc.); frequency: 1-year or 3-year vaccine; proof needed for licence renewal",
              },
              {
                label: "Core Vaccines",
                value: "DHPP (dogs) and FVRCP (cats) recommended annually or every 3 years; required by kennels and groomers",
              },
              {
                label: "Annual Vet Visit",
                value: "Not legally required but essential for heartworm testing (endemic in southern Canada), parasite prevention, and vaccine records",
              },
            ],
          },
          {
            heading: "Leash Laws and BSL",
            items: [
              {
                label: "Leash Laws",
                value: "Required in all public spaces in Canadian cities; off-leash parks designated by municipality",
              },
              {
                label: "Pit Bull Ban (Ontario)",
                value: "Ontario bans pit bull terriers, Staffordshire bull terriers, American Staffordshire terriers, and similar dogs under the Dog Owners Liability Act (2005)",
                note: "Existing grandfathered dogs in Ontario must be neutered, muzzled in public, and leashed",
              },
              {
                label: "Municipal BSL",
                value: "Some municipalities have their own breed restrictions beyond provincial law; check local bylaws",
              },
              {
                label: "Condo and Strata Rules",
                value: "Many condo buildings and strata properties restrict pet size or prohibit pets entirely; check with the strata council before signing a lease",
              },
            ],
          },
        ],
      },
      {
        id: "quarantine",
        title: "Quarantine Rules",
        icon: "🔒",
        sections: [
          {
            heading: "No Mandatory Quarantine",
            items: [
              {
                label: "Vaccinated Personal Pets",
                value: "Canada does not impose mandatory quarantine on dogs or cats arriving as personal pets with valid rabies certification",
              },
              {
                label: "Cats with No Certificate",
                value: "Cats from most countries have no federal documentation requirement; no quarantine applies",
              },
              {
                label: "Short Border Hold",
                value: "CBSA may briefly hold a pet if documentation is missing or questionable; owner bears any costs; pets are not sent to quarantine facilities",
              },
            ],
          },
          {
            heading: "Exceptions and Special Cases",
            items: [
              {
                label: "Puppies Under 3 Months",
                value: "Dogs under 3 months from countries with canine rabies require special authorization from CFIA before travel; contact CFIA well in advance",
              },
              {
                label: "Rabies-Exposed Animals",
                value: "A pet that was potentially exposed to rabies abroad may be subject to a Canadian quarantine order by the Public Health Agency",
              },
              {
                label: "Multiple Pets",
                value: "Imports of 3 or more pets may be treated as commercial imports with stricter CFIA requirements; personal import exemption applies to fewer pets",
              },
            ],
          },
          {
            heading: "Canada as a Transit Country",
            items: [
              {
                label: "Transit to the US",
                value: "Pets transiting through Canada to the US must meet both Canadian entry requirements and US import requirements",
              },
              {
                label: "Internal Travel",
                value: "No quarantine or special permits required when moving provinces with a pet after initial entry",
              },
              {
                label: "Returning Residents",
                value: "Canadian residents returning with a pet they took abroad have the same entry requirements as new imports; keep vaccination records current",
              },
            ],
          },
        ],
      },
      {
        id: "costs",
        title: "Cost Overview",
        icon: "💰",
        sections: [
          {
            heading: "Pre-Travel Costs",
            items: [
              {
                label: "Microchip",
                value: "C$50-80 if not already implanted",
              },
              {
                label: "Rabies Vaccination",
                value: "C$20-60 at a vet",
              },
              {
                label: "Vet Health Certificate",
                value: "C$80-150 from a licensed vet in origin country",
              },
              {
                label: "CFIA Endorsement (optional)",
                value: "C$30 CFIA fee plus vet handling; not required for personal pets but provides extra assurance",
              },
            ],
          },
          {
            heading: "Travel Costs",
            items: [
              {
                label: "Airline Cabin Fee",
                value: "C$50-150 each way for small pets in cabin",
              },
              {
                label: "Airline Cargo Fee",
                value: "C$100-500 each way for larger dogs in hold",
              },
              {
                label: "IATA Crate (if needed)",
                value: "C$80-250 depending on size; one-time purchase",
              },
            ],
          },
          {
            heading: "Ongoing Annual Costs in Canada",
            items: [
              {
                label: "Municipal Dog Licence",
                value: "C$20-60/yr depending on city; lower for spayed/neutered pets",
              },
              {
                label: "Rabies Booster",
                value: "C$20-60 every 1-3 years depending on vaccine and province",
              },
              {
                label: "Annual Wellness Visit",
                value: "C$80-200/yr for vet check, core vaccines, and parasite prevention",
              },
              {
                label: "Pet Insurance",
                value: "C$30-80/month optional; recommended given Canadian vet costs",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: {
      name: "CFIA (Canadian Food Inspection Agency) — Pets and Other Animals",
      url: "https://inspection.canada.ca/en/animals/pets",
    },
  },

  // ── Australia ──────────────────────────────────────────────────────────────
  {
    country: "AU",
    flag: "🇦🇺",
    name: "Australia",
    difficultyLevel: "strict",
    difficultyNote: "Australia is rabies-free and enforces the world's most stringent pet import biosecurity; a mandatory 10-day quarantine, import permit, RNAT titer test, and multi-month preparation process are required for all pets.",
    immigrantNote: "Start the process at least 6 months before your move — longer if your origin country is not Group 2. Only certain Group 1 and Group 2 countries can export pets to Australia directly. Costs can easily exceed A$5,000 in total including quarantine.",
    keyNumbers: [
      {
        label: "Mandatory Quarantine",
        value: "10 days",
        sub: "All pets; AQUIS Post Entry Quarantine facility in Melbourne",
      },
      {
        label: "Quarantine Cost",
        value: "A$2,000-4,000+",
        sub: "Does not include pre-export vet preparation",
      },
      {
        label: "Import Permit",
        value: "A$300",
        sub: "Apply online through BICON; required before travel",
      },
      {
        label: "Total Cost Estimate",
        value: "A$3,000-6,000+",
        sub: "Permit + vet prep + quarantine + airline",
      },
      {
        label: "Minimum Prep Time",
        value: "6+ months",
        sub: "From Group 2 countries; longer for others",
      },
    ],
    requirements: [
      {
        label: "Import Permit",
        detail: "An import permit must be obtained from the Australian Department of Agriculture, Fisheries and Forestry (DAFF) through the BICON database before any other steps are taken. Apply online; fee is approximately A$300.",
        mandatory: true,
        timing: "Apply as early as possible; processing can take weeks",
        note: "The import permit specifies all conditions that must be met; conditions differ based on your origin country group.",
      },
      {
        label: "ISO Microchip",
        detail: "An ISO 11784/11785 compliant microchip (15-digit) must be implanted before any vaccinations. This must be verified by the government-accredited vet.",
        mandatory: true,
      },
      {
        label: "Core Vaccinations",
        detail: "Up-to-date core vaccinations required: for dogs, C5 (distemper, hepatitis, parainfluenza, parvovirus, Bordetella) or equivalent; for cats, F3 (rhinotracheitis, calicivirus, panleukopenia) or equivalent.",
        mandatory: true,
      },
      {
        label: "Rabies Vaccination Series",
        detail: "Two doses of an inactivated rabies vaccine are required: primary vaccination, then a booster administered at least 21-28 days later. Both doses must be given before the RNAT titer test.",
        mandatory: true,
        timing: "Both doses must be completed before the RNAT blood test",
      },
      {
        label: "Rabies Neutralising Antibody Test (RNAT)",
        detail: "A blood test at an approved laboratory demonstrating a rabies antibody titre of at least 0.5 IU/mL. The test must be performed at least 180 days before arrival in Australia (for Group 2 countries). The test is valid for 24 months if the pet remains on schedule with rabies boosters.",
        mandatory: true,
        timing: "At least 180 days before travel to Australia (Group 2); at least 30 days after the second rabies dose",
        note: "The 180-day wait is calculated from the date of blood sample collection, not the test result date.",
      },
      {
        label: "Pre-Export Isolation",
        detail: "For Group 2 country pets, a minimum of 10 days pre-export isolation in an approved facility or at home (under strict conditions specified in the import permit) is required before departure.",
        mandatory: true,
        timing: "Minimum 10 days immediately before departure",
      },
      {
        label: "Parasite Treatments",
        detail: "Flea, tick, and internal parasite treatments must be administered within specified timeframes before travel; exact products and timing are specified in the import permit conditions.",
        mandatory: true,
        timing: "Typically within 14 days before departure; check permit conditions",
      },
      {
        label: "Government-Accredited Vet Health Certificate",
        detail: "A health certificate issued and signed by a government-accredited veterinarian in the origin country, countersigned by the national veterinary authority. Must comply with the Australian import permit conditions exactly.",
        mandatory: true,
        timing: "Issued close to departure; valid for a short period specified in the permit",
      },
    ],
    categories: [
      {
        id: "requirements",
        title: "Entry Requirements",
        icon: "📋",
        sections: [
          {
            heading: "Import Permit and Country Groups",
            items: [
              {
                label: "Import Permit (BICON)",
                value: "Apply at bicon.agriculture.gov.au before anything else; permit lists all conditions specific to your origin country",
                note: "Different permit conditions apply to Group 1, 2, and 3 countries",
              },
              {
                label: "Group 1 Countries",
                value: "New Zealand, UK, Republic of Ireland, Hawaii, Cocos (Keeling) Islands; lowest-risk; 10-day quarantine, minimal pre-export requirements",
              },
              {
                label: "Group 2 Countries",
                value: "Most of Europe, US, Canada, Singapore, Japan, and others; RNAT test + 180-day wait + 10-day pre-export isolation + 10-day quarantine",
              },
              {
                label: "Group 3 and Others",
                value: "Many countries in Asia, Africa, Latin America; may not be permitted for direct import; contact DAFF for country-specific rules",
                note: "Some countries require transit through an approved third country",
              },
            ],
          },
          {
            heading: "Vaccination Requirements",
            items: [
              {
                label: "Rabies Vaccination (2 doses)",
                value: "Primary vaccination followed by booster at least 21-28 days later; only approved inactivated vaccines accepted",
              },
              {
                label: "RNAT Titer Test",
                value: "Blood sample at a DAFF-approved laboratory; result must be 0.5 IU/mL or greater; sample collected at least 30 days after second rabies dose",
                note: "Approved labs include KSU (USA), ANSES (France), and others listed by DAFF",
              },
              {
                label: "Core Vaccines",
                value: "C5 for dogs; F3 for cats; must be current and documented in the health certificate",
              },
            ],
          },
          {
            heading: "Parasite Treatments",
            items: [
              {
                label: "Flea Treatment",
                value: "Approved flea treatment within 14 days before departure; product and dose specified in permit conditions",
              },
              {
                label: "Tick Treatment",
                value: "Approved acaricide treatment; timing and product specified in permit",
              },
              {
                label: "Internal Parasite Treatment",
                value: "Broad-spectrum deworming treatment; must be recorded in health certificate with product name, dose, and date",
              },
            ],
          },
        ],
      },
      {
        id: "process",
        title: "Import Process",
        icon: "🔄",
        sections: [
          {
            heading: "Timeline Before Travel (Group 2 Example)",
            items: [
              {
                label: "9+ months before: Apply for import permit",
                value: "Submit application via BICON; pay A$300 fee; receive permit with specific conditions; engage a government-accredited vet",
              },
              {
                label: "8 months before: Begin vaccination",
                value: "Microchip implanted; primary rabies vaccination; C5 or F3 core vaccines administered",
              },
              {
                label: "7 months before: Booster and RNAT",
                value: "Second (booster) rabies dose at least 21-28 days after primary; then RNAT blood test at approved lab; 180-day clock starts from blood draw",
              },
              {
                label: "1-2 months before: Pre-export preparations",
                value: "Parasite treatments; health certificate from accredited vet; national authority endorsement; book quarantine facility",
              },
              {
                label: "10 days before: Pre-export isolation",
                value: "Pet must be in approved isolation (facility or home isolation per permit conditions) for minimum 10 days before departure",
              },
            ],
          },
          {
            heading: "Approved Routes and Flights",
            items: [
              {
                label: "No Direct Flights from Many Countries",
                value: "Australia does not accept pets arriving on direct flights from most non-Group 1 countries; transit through Singapore, Dubai, Hong Kong, or another approved country is typically required",
                note: "Confirm the transit country is on Australia's approved transit list",
              },
              {
                label: "Approved Airlines",
                value: "Only certain airlines are approved to carry animals to Australia; Singapore Airlines, Qantas, and select others; confirm before booking",
              },
              {
                label: "Pets Travel as Manifest Cargo",
                value: "All pets entering Australia travel as manifest cargo, not checked baggage or in-cabin; owner and pet may not be on the same flight",
              },
            ],
          },
          {
            heading: "Arrival and Quarantine Check-In",
            items: [
              {
                label: "Arrival Port",
                value: "Pets can arrive at approved international airports (Sydney, Melbourne, Brisbane, Perth); must be pre-notified to AQUIS",
              },
              {
                label: "Transfer to Melbourne",
                value: "The only Post Entry Quarantine (PEQ) facility is in Mickleham, Victoria (near Melbourne); pets arriving at other airports must be transferred",
              },
              {
                label: "AQUIS Inspection",
                value: "AQUIS officers check all documentation and microchip on arrival; if all in order, pet is transferred to the quarantine facility",
              },
            ],
          },
        ],
      },
      {
        id: "regulations",
        title: "Ongoing Regulations",
        icon: "📜",
        sections: [
          {
            heading: "Registration and Microchipping",
            items: [
              {
                label: "Council Registration",
                value: "Mandatory in all states and territories; register within 30 days of establishing residence; annual fee A$50-200 depending on council and whether desexed",
              },
              {
                label: "Compulsory Microchipping",
                value: "Legally required in all Australian states; microchip number registered on the national PetAddress or state database",
              },
              {
                label: "Desexing",
                value: "Compulsory desexing for certain breeds or ages in some states (e.g., Western Australia requires pets to be desexed unless the owner has a breeder permit); lower registration fee for desexed pets everywhere",
              },
            ],
          },
          {
            heading: "Vaccinations and Vet Care",
            items: [
              {
                label: "Annual C5 (Dogs)",
                value: "Annual core vaccination (C5: distemper, hepatitis, parainfluenza, parvovirus, Bordetella) required for kennels and recommended by all vets",
              },
              {
                label: "Annual F3 (Cats)",
                value: "Annual F3 vaccination (rhinotracheitis, calicivirus, panleukopenia) recommended; required by catteries",
              },
              {
                label: "Heartworm and Parasite Prevention",
                value: "Monthly heartworm prevention recommended in most of Australia; flea and tick prevention essential in Queensland and northern regions",
              },
            ],
          },
          {
            heading: "Leash Laws and BSL",
            items: [
              {
                label: "Leash Laws",
                value: "Required in all public areas; off-leash areas designated by council; penalties apply for dogs at large",
              },
              {
                label: "Dangerous Dog Laws",
                value: "Each state has dangerous dog legislation; restricted breeds include American Pit Bull Terrier, Japanese Tosa, Dogo Argentino, Fila Brasileiro, and Perro de Presa Canario",
              },
              {
                label: "Public Transport",
                value: "Small pets in enclosed carriers generally permitted on trains and buses in major cities; dogs on leads not typically allowed on public transport except in carriers or as service dogs",
              },
              {
                label: "National Parks",
                value: "Dogs are prohibited in most Australian national parks; some state forests and reserves allow leashed dogs; check local rules",
              },
            ],
          },
        ],
      },
      {
        id: "quarantine",
        title: "Quarantine Rules",
        icon: "🔒",
        sections: [
          {
            heading: "Mandatory 10-Day Quarantine",
            items: [
              {
                label: "No Exceptions",
                value: "ALL cats and dogs entering Australia must complete 10 days of post-entry quarantine at the AQUIS facility in Mickleham, Victoria; no home quarantine option exists",
              },
              {
                label: "AQUIS Facility",
                value: "Australian Quarantine and Inspection Service (AQUIS) Post Entry Quarantine facility; purpose-built; animals housed individually in climate-controlled kennels",
              },
              {
                label: "During Quarantine",
                value: "AQUIS vets and staff care for the pet; owners can visit by appointment; owner is responsible for feed costs if special diet is required",
              },
            ],
          },
          {
            heading: "Quarantine Costs and Booking",
            items: [
              {
                label: "Facility Fee",
                value: "A$2,000-4,000 for a single dog or cat for 10 days; fee covers accommodation and standard care; paid in advance",
              },
              {
                label: "Advance Booking Required",
                value: "Quarantine spaces must be booked in advance through DAFF; spaces are limited and fill up; book as soon as import permit is granted",
              },
              {
                label: "Transfer to Melbourne",
                value: "If the pet arrives in Sydney, Brisbane, or Perth, a connecting flight to Melbourne adds to the total cost (A$300-600 for cargo transfer)",
              },
            ],
          },
          {
            heading: "Country Groups and Quarantine",
            items: [
              {
                label: "Group 1 (NZ, UK, Ireland, Hawaii)",
                value: "10-day quarantine with minimal pre-export requirements; simplest process; approximately 6-8 weeks of preparation",
              },
              {
                label: "Group 2 (US, Canada, EU, Singapore, Japan)",
                value: "10-day quarantine plus RNAT test with 180-day wait and 10-day pre-export isolation; total process approximately 7-9 months minimum",
              },
              {
                label: "Non-Approved Origins",
                value: "Pets from countries not in Group 1 or 2 may need to first move to an approved country and complete a residency period before qualifying for Group 2 import",
              },
            ],
          },
        ],
      },
      {
        id: "costs",
        title: "Cost Overview",
        icon: "💰",
        sections: [
          {
            heading: "Pre-Travel Preparation",
            items: [
              {
                label: "Import Permit",
                value: "A$300; paid to DAFF via BICON; non-refundable",
              },
              {
                label: "Rabies Vaccination Series",
                value: "A$100-200; two doses including vet consultation",
              },
              {
                label: "RNAT Titer Test",
                value: "A$150-250 at a DAFF-approved laboratory; sample collection vet fee additional",
              },
              {
                label: "Government-Accredited Vet Preparation",
                value: "A$500-1,000; covers examinations, parasite treatments, health certificate preparation, and national authority endorsement",
              },
            ],
          },
          {
            heading: "Transport and Quarantine",
            items: [
              {
                label: "International Air Cargo",
                value: "A$1,000-3,000 depending on airline, route, and pet size; pets travel as manifest cargo",
              },
              {
                label: "AQUIS Quarantine Facility",
                value: "A$2,000-4,000 for 10 days; must be paid in advance; includes standard care",
              },
              {
                label: "Melbourne Transfer (if needed)",
                value: "A$300-600 for internal cargo transfer if pet arrives at a non-Melbourne airport",
              },
              {
                label: "Pet Relocation Agent",
                value: "A$500-2,000 for a professional pet relocation agent to manage paperwork and logistics; highly recommended given complexity",
              },
            ],
          },
          {
            heading: "Ongoing Annual Costs in Australia",
            items: [
              {
                label: "Council Registration",
                value: "A$50-200/yr depending on council and whether pet is desexed; desexed pets typically pay half",
              },
              {
                label: "Annual Vaccinations",
                value: "A$80-180/yr for C5 (dogs) or F3 (cats) plus vet consultation",
              },
              {
                label: "Parasite Prevention",
                value: "A$200-400/yr for year-round flea, tick, heartworm, and worm prevention",
              },
              {
                label: "Pet Insurance",
                value: "A$30-100/month depending on breed, age, and coverage; recommended given high Australian vet costs",
              },
            ],
          },
        ],
      },
    ],
    officialAuthority: {
      name: "DAFF / BICON (Biosecurity Import Conditions database)",
      url: "https://bicon.agriculture.gov.au",
    },
  },
]

// ── Lookup helpers ─────────────────────────────────────────────────────────────

export function getPetData(country: CountryCode): PetData | undefined {
  return PET_DATA.find((d) => d.country === country)
}
