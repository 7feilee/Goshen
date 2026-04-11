/**
 * Client-side remittance comparison engine.
 *
 * All data is static and bundled at build time — no API calls, no server.
 * Data reflects 2024-25 service offerings. Fees and rates are approximate
 * and subject to change; always verify on the official service website.
 */

import type { CountryCode } from '@/types'

// ── Public interfaces ─────────────────────────────────────────────────────────

export interface RemittanceService {
  id: string
  name: string
  icon: string           // emoji
  description: string
  feeStructure: string   // e.g. "0-$3.99 fixed + 0.4-1.5% margin"
  exchangeMargin: 'excellent' | 'good' | 'fair' | 'high'  // vs mid-market rate
  marginPct: string      // e.g. "0.3-0.6%"
  typicalFeeUSD: number  // typical fee for $500 transfer (approx)
  speed: 'instant' | 'minutes' | 'hours' | 'days'
  speedLabel: string     // e.g. "Instant-24 hours"
  bestFor: string        // e.g. "Low fees, tech-savvy users"
  corridors: string[]    // top corridors e.g. ["US->MX", "US->IN", "US->PH"]
  minAmount: number      // USD
  maxAmount: number      // USD (-1 = unlimited / high)
  appRating: string      // e.g. "4.7★ App Store"
  officialUrl: string
  pros: string[]
  cons: string[]
}

export interface SendingCorridor {
  from: CountryCode
  to: string             // destination country code ISO2
  toName: string
  toFlag: string
  popularServices: string[]  // service ids, ranked by popularity for this corridor
}

// ── Service data ──────────────────────────────────────────────────────────────

export const REMITTANCE_SERVICES: RemittanceService[] = [
  {
    id: 'wise',
    name: 'Wise',
    icon: '💚',
    description: 'Formerly TransferWise. Offers best-in-class exchange rates by using the mid-market rate with a small transparent fee, making it ideal for regular international transfers.',
    feeStructure: '0.4-1.5% of transfer amount (varies by corridor)',
    exchangeMargin: 'excellent',
    marginPct: '0.3-0.8%',
    typicalFeeUSD: 3.50,
    speed: 'instant',
    speedLabel: 'Instant-1 business day',
    bestFor: 'Tech-savvy users, regular transfers, best rates',
    corridors: ['US->IN', 'US->GB', 'DE->TR', 'DE->PL', 'UK->IN', 'AU->IN'],
    minAmount: 1,
    maxAmount: -1,
    appRating: '4.7★ App Store',
    officialUrl: 'https://wise.com',
    pros: [
      'Transparent pricing with real mid-market rate',
      'Multi-currency account with debit card',
      'One of the lowest margins available',
      'Strong mobile app and web interface',
    ],
    cons: [
      'Higher fees for cash pickup or home delivery',
      'Not ideal for very large transfers (OFX may be better)',
    ],
  },
  {
    id: 'remitly',
    name: 'Remitly',
    icon: '🔵',
    description: 'Offers two transfer tiers: Economy (3-5 days, very low fee) and Express (instant, slightly higher fee). Strong promos for first-time users. Dominant in US-to-LatAm and US-to-Asia corridors.',
    feeStructure: '$0-$0.99 Economy, ~$3.99 Express fixed fee',
    exchangeMargin: 'fair',
    marginPct: '1.0-2.0%',
    typicalFeeUSD: 2.99,
    speed: 'instant',
    speedLabel: 'Instant (Express) or 3-5 days (Economy)',
    bestFor: 'US to Mexico, India, Philippines; reliable and easy app',
    corridors: ['US->MX', 'US->IN', 'US->PH', 'US->SV', 'US->VN', 'UK->PK'],
    minAmount: 1,
    maxAmount: 30000,
    appRating: '4.9★ App Store',
    officialUrl: 'https://www.remitly.com',
    pros: [
      'Strong promotional rates for new users',
      'Reliable and highly rated mobile app',
      'Two-tier system lets you choose speed vs cost',
      'Broad coverage across LatAm and Asia',
    ],
    cons: [
      'Express tier exchange rates are slightly worse than Economy',
      'Margin higher than Wise for equivalent speed',
    ],
  },
  {
    id: 'western-union',
    name: 'Western Union',
    icon: '🟡',
    description: 'The original global money transfer network with over 500,000 agent locations worldwide. Best suited for cash pickup in rural or underbanked areas where digital services are unavailable.',
    feeStructure: '$5-$25+ for bank-funded; often $0 for card-to-cash pickup',
    exchangeMargin: 'high',
    marginPct: '1.5-4.0%',
    typicalFeeUSD: 10,
    speed: 'instant',
    speedLabel: 'Instant (cash pickup)',
    bestFor: 'Cash pickup, rural areas, emergency transfers',
    corridors: ['US->MX', 'US->PH', 'US->IN', 'UK->NG', 'DE->TR', 'AU->IN'],
    minAmount: 1,
    maxAmount: 50000,
    appRating: '4.5★ App Store',
    officialUrl: 'https://www.westernunion.com',
    pros: [
      'Massive global agent network (500,000+ locations)',
      'Trusted brand with decades of history',
      'Instant cash pickup at agent locations',
      'Available in many countries with limited banking infrastructure',
    ],
    cons: [
      'High fees compared to online-only competitors',
      'Poor exchange rates (high margin vs mid-market)',
    ],
  },
  {
    id: 'worldremit',
    name: 'WorldRemit',
    icon: '🌐',
    description: 'Strong coverage across Africa and Asia with multiple payout options including bank deposit, mobile money, cash pickup, and airtime top-up. Competitive for corridors where mobile money is dominant.',
    feeStructure: '$0.99-$4.99 fixed + ~1% exchange margin',
    exchangeMargin: 'good',
    marginPct: '0.8-1.5%',
    typicalFeeUSD: 3.99,
    speed: 'minutes',
    speedLabel: 'Minutes to hours',
    bestFor: 'Africa and Asia corridors, mobile money delivery',
    corridors: ['UK->NG', 'US->PH', 'UK->BD', 'DE->MA', 'CA->PH', 'AU->PH'],
    minAmount: 1,
    maxAmount: 20000,
    appRating: '4.6★ App Store',
    officialUrl: 'https://www.worldremit.com',
    pros: [
      'Mobile money delivery in 30+ countries',
      'Wide African coverage including Nigeria, Kenya, Ghana',
      'Multiple payout options: bank, mobile money, cash, airtime',
      'Transparent fee structure',
    ],
    cons: [
      'Not always the cheapest for major Western corridors',
      'Exchange rates slightly worse than Wise',
    ],
  },
  {
    id: 'xoom',
    name: 'Xoom (PayPal)',
    icon: '🅿️',
    description: 'PayPal subsidiary focused on international remittances. Free when funded from PayPal balance; fast delivery with doorstep cash delivery available in select countries. Strong for Latin America.',
    feeStructure: '$4.99 bank-funded; $0 PayPal-funded (+ exchange margin)',
    exchangeMargin: 'fair',
    marginPct: '1.0-2.0%',
    typicalFeeUSD: 4.99,
    speed: 'minutes',
    speedLabel: 'Minutes (PayPal-funded)',
    bestFor: 'US senders with PayPal accounts, Latin America',
    corridors: ['US->MX', 'US->IN', 'US->PH', 'US->SV', 'CA->IN', 'CA->MX'],
    minAmount: 10,
    maxAmount: 50000,
    appRating: '4.8★ App Store',
    officialUrl: 'https://www.xoom.com',
    pros: [
      'Integrates seamlessly with existing PayPal accounts',
      'Fast transfers when funded from PayPal balance',
      'Doorstep cash delivery in select countries',
      'Well-established brand with strong customer support',
    ],
    cons: [
      'PayPal balance funding workflow can be confusing',
      'Exchange rates not as competitive as Wise',
    ],
  },
  {
    id: 'revolut',
    name: 'Revolut',
    icon: '🔷',
    description: 'UK-based fintech offering multi-currency accounts with near-mid-market exchange rates. Free transfers up to monthly plan limits. Weekend markup applies. Best suited for UK and EU-based senders.',
    feeStructure: 'Free up to plan limit (Standard: ~$1,000/mo); ~0.5% above limit',
    exchangeMargin: 'excellent',
    marginPct: '0.0-0.5% weekdays; 1% weekends',
    typicalFeeUSD: 0,
    speed: 'instant',
    speedLabel: 'Instant to hours',
    bestFor: 'UK/EU users, frequent small transfers, multi-currency needs',
    corridors: ['DE->PL', 'DE->RO', 'UK->PL', 'AU->GB', 'DE->TR'],
    minAmount: 1,
    maxAmount: -1,
    appRating: '4.7★ App Store',
    officialUrl: 'https://www.revolut.com',
    pros: [
      'Best exchange rates in the EU for weekday transfers',
      'Multi-currency account with no fee on small amounts',
      'Premium and Metal plans offer more free transfer volume',
      'Feature-rich app with budgeting and crypto tools',
    ],
    cons: [
      '1% weekend markup on currency exchange',
      'Monthly limits on free Standard plan',
      'Less suitable for large single transfers',
    ],
  },
  {
    id: 'ofx',
    name: 'OFX',
    icon: '🏦',
    description: 'Specialist in large international transfers with no fixed transfer fee. The margin shrinks at higher amounts and rates can often be negotiated. Preferred for property purchases, migrating savings, and business payments.',
    feeStructure: 'No fixed fee; exchange margin 0.4-1.5% (lower for larger amounts)',
    exchangeMargin: 'good',
    marginPct: '0.4-1.5%',
    typicalFeeUSD: 5,
    speed: 'hours',
    speedLabel: '1-2 business days',
    bestFor: 'Large transfers over $5,000, property purchases, business',
    corridors: ['US->IN', 'AU->IN', 'AU->CN', 'CA->IN', 'UK->IN', 'CA->CN'],
    minAmount: 1000,
    maxAmount: -1,
    appRating: '4.3★ App Store',
    officialUrl: 'https://www.ofx.com',
    pros: [
      'No fixed transfer fee on any amount',
      'Rates improve significantly at higher amounts',
      '24/7 telephone support with currency specialists',
      'Rate negotiation available for large transfers',
    ],
    cons: [
      'Not cost-effective for small transfers (high effective %) ',
      'Slower than instant-transfer services',
      '$1,000 minimum transfer',
    ],
  },
  {
    id: 'moneygram',
    name: 'MoneyGram',
    icon: '🟠',
    description: 'Global money transfer network with over 350,000 agent locations in 200 countries. Similar to Western Union but with slightly lower fees in some corridors. Suits cash pickup and countries with limited banking.',
    feeStructure: '$2-$20 depending on corridor and funding method',
    exchangeMargin: 'high',
    marginPct: '1.5-3.5%',
    typicalFeeUSD: 8,
    speed: 'minutes',
    speedLabel: 'Minutes (cash pickup)',
    bestFor: 'Cash pickup, countries with limited banking infrastructure',
    corridors: ['US->PH', 'US->VN', 'UK->NG', 'US->SV', 'AU->PH', 'CA->PH'],
    minAmount: 1,
    maxAmount: 10000,
    appRating: '4.5★ App Store',
    officialUrl: 'https://www.moneygram.com',
    pros: [
      'Wide global agent network (350,000+ locations in 200 countries)',
      'Instant cash pickup at agent locations',
      'Competitive in some emerging-market corridors',
    ],
    cons: [
      'High fees compared to digital-first services',
      'Poor exchange rates vs mid-market',
    ],
  },
  {
    id: 'paysend',
    name: 'Paysend',
    icon: '💳',
    description: 'Card-to-card transfer service with a low flat fee model. Very transparent pricing: one fixed fee per transfer regardless of amount. Popular in UK and EU for sending to Eastern Europe.',
    feeStructure: '£1 / €1 / $2 flat fee per transfer + ~1% exchange margin',
    exchangeMargin: 'good',
    marginPct: '0.8-1.2%',
    typicalFeeUSD: 2,
    speed: 'minutes',
    speedLabel: 'Minutes',
    bestFor: 'UK/EU to Eastern Europe, regular card-to-card transfers',
    corridors: ['DE->TR', 'DE->PL', 'DE->RO', 'UK->PL'],
    minAmount: 1,
    maxAmount: 5000,
    appRating: '4.6★ App Store',
    officialUrl: 'https://paysend.com',
    pros: [
      'Very low flat fee regardless of transfer amount',
      'Simple and transparent pricing model',
      'Fast card-to-card delivery in minutes',
    ],
    cons: [
      'Card-to-card only — no bank deposit or cash pickup',
      'Limited supported corridors vs larger services',
      'Lower transfer limits than major competitors',
    ],
  },
  {
    id: 'ria',
    name: 'Ria Money Transfer',
    icon: '🔴',
    description: 'One of the largest money transfer companies globally with 490,000+ agent locations in 165 countries. Particularly strong in Latin American corridors and popular among diaspora communities.',
    feeStructure: '$1.99-$9.99 fixed fee depending on corridor and payout method',
    exchangeMargin: 'fair',
    marginPct: '1.5-3.0%',
    typicalFeeUSD: 5,
    speed: 'minutes',
    speedLabel: 'Minutes (cash pickup)',
    bestFor: 'Latin America, cash pickup, diaspora communities',
    corridors: ['US->MX', 'US->SV', 'UK->NG', 'UK->PK', 'CA->MX'],
    minAmount: 1,
    maxAmount: 7000,
    appRating: '4.5★ App Store',
    officialUrl: 'https://www.riamoneytransfer.com',
    pros: [
      'Extensive Latin American agent network',
      'Competitive fees for cash pickup in LatAm',
      'Popular and trusted in diaspora communities',
      '490,000+ locations in 165 countries',
    ],
    cons: [
      'Exchange rates not as good as Wise for bank transfers',
      'Higher margin than digital-first competitors',
    ],
  },
]

// ── Corridor data ─────────────────────────────────────────────────────────────

export const SENDING_CORRIDORS: SendingCorridor[] = [
  // ── US corridors ────────────────────────────────────────────────────────────
  {
    from: 'US',
    to: 'MX',
    toName: 'Mexico',
    toFlag: '🇲🇽',
    popularServices: ['remitly', 'xoom', 'ria', 'western-union', 'wise', 'worldremit'],
  },
  {
    from: 'US',
    to: 'IN',
    toName: 'India',
    toFlag: '🇮🇳',
    popularServices: ['remitly', 'wise', 'xoom', 'western-union', 'worldremit', 'ofx'],
  },
  {
    from: 'US',
    to: 'PH',
    toName: 'Philippines',
    toFlag: '🇵🇭',
    popularServices: ['remitly', 'worldremit', 'western-union', 'xoom', 'wise', 'moneygram'],
  },
  {
    from: 'US',
    to: 'CN',
    toName: 'China',
    toFlag: '🇨🇳',
    popularServices: ['wise', 'western-union', 'worldremit', 'remitly', 'xoom', 'ofx'],
  },
  {
    from: 'US',
    to: 'SV',
    toName: 'El Salvador',
    toFlag: '🇸🇻',
    popularServices: ['remitly', 'ria', 'western-union', 'moneygram', 'xoom', 'worldremit'],
  },
  {
    from: 'US',
    to: 'VN',
    toName: 'Vietnam',
    toFlag: '🇻🇳',
    popularServices: ['remitly', 'wise', 'worldremit', 'western-union', 'xoom', 'moneygram'],
  },

  // ── DE corridors ────────────────────────────────────────────────────────────
  {
    from: 'DE',
    to: 'TR',
    toName: 'Turkey',
    toFlag: '🇹🇷',
    popularServices: ['wise', 'paysend', 'western-union', 'moneygram', 'revolut', 'remitly'],
  },
  {
    from: 'DE',
    to: 'PL',
    toName: 'Poland',
    toFlag: '🇵🇱',
    popularServices: ['wise', 'revolut', 'paysend', 'western-union', 'ofx', 'moneygram'],
  },
  {
    from: 'DE',
    to: 'RO',
    toName: 'Romania',
    toFlag: '🇷🇴',
    popularServices: ['wise', 'revolut', 'paysend', 'western-union', 'moneygram', 'worldremit'],
  },
  {
    from: 'DE',
    to: 'IN',
    toName: 'India',
    toFlag: '🇮🇳',
    popularServices: ['wise', 'remitly', 'western-union', 'worldremit', 'ofx', 'moneygram'],
  },
  {
    from: 'DE',
    to: 'MA',
    toName: 'Morocco',
    toFlag: '🇲🇦',
    popularServices: ['wise', 'western-union', 'worldremit', 'moneygram', 'ria', 'paysend'],
  },
  {
    from: 'DE',
    to: 'VN',
    toName: 'Vietnam',
    toFlag: '🇻🇳',
    popularServices: ['wise', 'worldremit', 'western-union', 'moneygram', 'remitly', 'ofx'],
  },

  // ── UK corridors ────────────────────────────────────────────────────────────
  {
    from: 'UK',
    to: 'IN',
    toName: 'India',
    toFlag: '🇮🇳',
    popularServices: ['wise', 'remitly', 'worldremit', 'western-union', 'ofx', 'moneygram'],
  },
  {
    from: 'UK',
    to: 'PK',
    toName: 'Pakistan',
    toFlag: '🇵🇰',
    popularServices: ['remitly', 'worldremit', 'wise', 'western-union', 'moneygram', 'ria'],
  },
  {
    from: 'UK',
    to: 'NG',
    toName: 'Nigeria',
    toFlag: '🇳🇬',
    popularServices: ['worldremit', 'remitly', 'wise', 'western-union', 'moneygram', 'ria'],
  },
  {
    from: 'UK',
    to: 'PL',
    toName: 'Poland',
    toFlag: '🇵🇱',
    popularServices: ['wise', 'revolut', 'paysend', 'western-union', 'ofx', 'moneygram'],
  },
  {
    from: 'UK',
    to: 'PH',
    toName: 'Philippines',
    toFlag: '🇵🇭',
    popularServices: ['remitly', 'worldremit', 'wise', 'western-union', 'moneygram', 'ofx'],
  },
  {
    from: 'UK',
    to: 'BD',
    toName: 'Bangladesh',
    toFlag: '🇧🇩',
    popularServices: ['worldremit', 'remitly', 'western-union', 'wise', 'moneygram', 'ria'],
  },

  // ── CA corridors ────────────────────────────────────────────────────────────
  {
    from: 'CA',
    to: 'IN',
    toName: 'India',
    toFlag: '🇮🇳',
    popularServices: ['wise', 'remitly', 'western-union', 'worldremit', 'ofx', 'xoom'],
  },
  {
    from: 'CA',
    to: 'PH',
    toName: 'Philippines',
    toFlag: '🇵🇭',
    popularServices: ['remitly', 'worldremit', 'wise', 'western-union', 'moneygram', 'ofx'],
  },
  {
    from: 'CA',
    to: 'CN',
    toName: 'China',
    toFlag: '🇨🇳',
    popularServices: ['wise', 'ofx', 'western-union', 'worldremit', 'remitly', 'moneygram'],
  },
  {
    from: 'CA',
    to: 'MX',
    toName: 'Mexico',
    toFlag: '🇲🇽',
    popularServices: ['remitly', 'western-union', 'xoom', 'ria', 'wise', 'worldremit'],
  },
  {
    from: 'CA',
    to: 'PK',
    toName: 'Pakistan',
    toFlag: '🇵🇰',
    popularServices: ['remitly', 'worldremit', 'wise', 'western-union', 'moneygram', 'ofx'],
  },
  {
    from: 'CA',
    to: 'VN',
    toName: 'Vietnam',
    toFlag: '🇻🇳',
    popularServices: ['wise', 'worldremit', 'remitly', 'western-union', 'ofx', 'moneygram'],
  },

  // ── AU corridors ────────────────────────────────────────────────────────────
  {
    from: 'AU',
    to: 'IN',
    toName: 'India',
    toFlag: '🇮🇳',
    popularServices: ['wise', 'ofx', 'remitly', 'western-union', 'worldremit', 'moneygram'],
  },
  {
    from: 'AU',
    to: 'CN',
    toName: 'China',
    toFlag: '🇨🇳',
    popularServices: ['wise', 'ofx', 'western-union', 'worldremit', 'moneygram', 'remitly'],
  },
  {
    from: 'AU',
    to: 'PH',
    toName: 'Philippines',
    toFlag: '🇵🇭',
    popularServices: ['remitly', 'worldremit', 'wise', 'western-union', 'moneygram', 'ofx'],
  },
  {
    from: 'AU',
    to: 'VN',
    toName: 'Vietnam',
    toFlag: '🇻🇳',
    popularServices: ['wise', 'worldremit', 'western-union', 'remitly', 'ofx', 'moneygram'],
  },
  {
    from: 'AU',
    to: 'GB',
    toName: 'United Kingdom',
    toFlag: '🇬🇧',
    popularServices: ['wise', 'ofx', 'revolut', 'western-union', 'moneygram', 'remitly'],
  },
  {
    from: 'AU',
    to: 'ID',
    toName: 'Indonesia',
    toFlag: '🇮🇩',
    popularServices: ['wise', 'worldremit', 'western-union', 'remitly', 'ofx', 'moneygram'],
  },
]

// ── Helper functions ──────────────────────────────────────────────────────────

/**
 * Returns all sending corridors for a given source country, sorted by
 * destination country name.
 */
export function getCorridorsFrom(country: CountryCode): SendingCorridor[] {
  return SENDING_CORRIDORS.filter((c) => c.from === country)
}

/**
 * Returns a RemittanceService by its id, or undefined if not found.
 */
export function getServiceById(id: string): RemittanceService | undefined {
  return REMITTANCE_SERVICES.find((s) => s.id === id)
}

/**
 * Returns the ranked list of RemittanceService objects for a specific corridor.
 * Services are ordered by their popularity ranking within the corridor.
 * Services not listed in the corridor's popularServices are appended at the end.
 */
export function rankServicesForCorridor(
  from: CountryCode,
  toCode: string,
): RemittanceService[] {
  const corridor = SENDING_CORRIDORS.find(
    (c) => c.from === from && c.to === toCode,
  )

  if (!corridor) {
    // No corridor data — return all services in default order
    return [...REMITTANCE_SERVICES]
  }

  const ranked: RemittanceService[] = []
  const seen = new Set<string>()

  // Add services in corridor-ranked order first
  for (const id of corridor.popularServices) {
    const service = getServiceById(id)
    if (service) {
      ranked.push(service)
      seen.add(id)
    }
  }

  // Append any remaining services not explicitly ranked for this corridor
  for (const service of REMITTANCE_SERVICES) {
    if (!seen.has(service.id)) {
      ranked.push(service)
    }
  }

  return ranked
}
