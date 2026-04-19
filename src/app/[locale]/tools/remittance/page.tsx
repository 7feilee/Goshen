'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  REMITTANCE_SERVICES,
  SENDING_CORRIDORS,
  getCorridorsFrom,
  rankServicesForCorridor,
} from '@/lib/engines/remittance'
import type { CountryCode } from '@/types'
import type { RemittanceService } from '@/lib/engines/remittance'

// ── Constants ─────────────────────────────────────────────────────────────────

const COUNTRIES: { code: CountryCode; flag: string; name: string }[] = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
]

const MARGIN_META = {
  excellent: { label: 'Excellent rate', stars: '⭐⭐⭐⭐⭐', color: 'text-green-700 bg-green-50' },
  good:      { label: 'Good rate',      stars: '⭐⭐⭐⭐',   color: 'text-blue-700 bg-blue-50' },
  fair:      { label: 'Fair rate',      stars: '⭐⭐⭐',     color: 'text-amber-700 bg-amber-50' },
  high:      { label: 'High fees',      stars: '⭐⭐',       color: 'text-red-600 bg-red-50' },
}

const SPEED_META: Record<string, { color: string; label: string }> = {
  instant: { color: 'bg-green-100 text-green-800', label: 'Instant' },
  minutes: { color: 'bg-green-100 text-green-800', label: 'Minutes' },
  hours:   { color: 'bg-amber-100 text-amber-800', label: 'Hours' },
  days:    { color: 'bg-gray-100 text-gray-600',   label: '1–2 days' },
}

const AMOUNT_OPTIONS = [
  { label: '$100', value: 100 },
  { label: '$500', value: 500 },
  { label: '$1,000', value: 1000 },
  { label: '$2,500', value: 2500 },
  { label: '$5,000', value: 5000 },
]

// ── Service card ───────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  rank,
  amount,
}: {
  service: RemittanceService
  rank: number
  amount: number
}) {
  const [open, setOpen] = useState(false)
  const marginMeta = MARGIN_META[service.exchangeMargin]
  const speedMeta  = SPEED_META[service.speed]

  // Estimate fee for the given amount
  const estimatedFee = service.typicalFeeUSD * (amount / 500)
  const feeDisplay   = estimatedFee < 1 ? '<$1' : `~$${estimatedFee.toFixed(2)}`

  return (
    <div className={`border-2 rounded-2xl overflow-hidden transition-all ${
      rank === 1 ? 'border-blue-300' : 'border-gray-100'
    }`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors ${
          rank === 1 ? 'bg-blue-50' : 'bg-white'
        }`}
      >
        {/* Rank badge */}
        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
          rank === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
        }`}>
          {rank}
        </span>

        {/* Icon + name */}
        <div className="flex items-center gap-2 w-28 shrink-0">
          <span className="text-2xl">{service.icon}</span>
          <span className="text-sm font-bold text-gray-900 leading-snug">{service.name}</span>
        </div>

        {/* Key stats */}
        <div className="flex-1 flex items-center gap-4 flex-wrap">
          <div>
            <p className="text-xs text-gray-400">Est. fee</p>
            <p className="text-sm font-bold text-gray-900">{feeDisplay}</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${marginMeta.color}`}>
            {marginMeta.stars}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${speedMeta.color}`}>
            {service.speedLabel}
          </span>
        </div>

        <span className="text-gray-400 shrink-0">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="bg-white border-t border-gray-100 px-5 pb-5 pt-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Details</p>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-400">Fee structure:</span> <span className="text-gray-700">{service.feeStructure}</span></p>
                <p><span className="text-gray-400">Rate margin:</span> <span className="text-gray-700">{service.marginPct} over mid-market</span></p>
                <p><span className="text-gray-400">Exchange quality:</span> <span className="text-gray-700">{marginMeta.label}</span></p>
                <p><span className="text-gray-400">App rating:</span> <span className="text-gray-700">{service.appRating}</span></p>
                <p><span className="text-gray-400">Best for:</span> <span className="text-gray-700">{service.bestFor}</span></p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">✅ Pros</p>
              <ul className="space-y-1">
                {service.pros.map((p, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                    <span className="text-green-500 shrink-0">+</span>{p}
                  </li>
                ))}
              </ul>
              <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2 mt-3">⚠️ Cons</p>
              <ul className="space-y-1">
                {service.cons.map((c, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                    <span className="text-red-400 shrink-0">−</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a
            href={service.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            Go to {service.name} ↗
          </a>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RemittancePage() {
  const pathname = usePathname()
  const locale   = pathname.split('/')[1] || 'en'

  const [fromCountry, setFromCountry] = useState<CountryCode>('US')
  const [toCode,      setToCode]      = useState<string>('MX')
  const [amount,      setAmount]      = useState(500)

  const corridors = useMemo(() => getCorridorsFrom(fromCountry), [fromCountry])
  const services  = useMemo(() => rankServicesForCorridor(fromCountry, toCode), [fromCountry, toCode])

  const selectedCorridor = corridors.find((c) => c.to === toCode) ?? corridors[0]

  function handleFromChange(code: CountryCode) {
    setFromCountry(code)
    const newCorridors = getCorridorsFrom(code)
    if (newCorridors.length > 0) setToCode(newCorridors[0].to)
  }

  // Also show all services (sorted by margin quality) when no corridor matches
  const displayServices = services.length > 0 ? services : REMITTANCE_SERVICES

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
          💸 Remittance Finder
        </h1>
        <p className="text-base text-gray-500 leading-relaxed">
          Compare money transfer services for your corridor. Find the best exchange
          rate and lowest fees for sending money home.
        </p>
      </div>

      {/* Sending from */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Sending from
        </h2>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleFromChange(c.code)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                fromCountry === c.code
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sending to */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Sending to
        </h2>
        <div className="flex flex-wrap gap-2">
          {corridors.map((c) => (
            <button
              key={c.to}
              type="button"
              onClick={() => setToCode(c.to)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                toCode === c.to
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              <span className="text-lg">{c.toFlag}</span>
              <span>{c.toName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amount selector */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-5">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Amount to send (estimated in USD)
        </h2>
        <div className="flex flex-wrap gap-2">
          {AMOUNT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAmount(opt.value)}
              className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                amount === opt.value
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Fee estimates are approximate — actual fees depend on payment method and exact corridor.
        </p>
      </div>

      {/* Corridor summary */}
      {selectedCorridor && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 mb-5 flex items-center gap-3">
          <span className="text-xl">📍</span>
          <p className="text-sm text-blue-800">
            Showing services for{' '}
            <strong>
              {COUNTRIES.find(c => c.code === fromCountry)?.flag}{' '}
              {COUNTRIES.find(c => c.code === fromCountry)?.name}
              {' → '}{selectedCorridor.toFlag} {selectedCorridor.toName}
            </strong>
            {' '}· ranked by corridor popularity
          </p>
        </div>
      )}

      {/* Service list */}
      <div className="space-y-3 mb-6">
        {displayServices.map((service, i) => (
          <ServiceCard
            key={service.id}
            service={service}
            rank={i + 1}
            amount={amount}
          />
        ))}
      </div>

      {/* Tips */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-5">
        <h2 className="text-base font-bold text-gray-900 mb-4">💡 Tips for saving money on transfers</h2>
        <ul className="space-y-3">
          {[
            { icon: '📊', tip: 'Always compare the total cost — a zero-fee service may have a worse exchange rate that costs more overall.' },
            { icon: '⏰', tip: 'Weekend transfers often have worse rates. Transfer on a weekday for better mid-market rates (especially Revolut, Wise).' },
            { icon: '💳', tip: 'Bank debit funding is usually cheaper than credit card funding. Credit card transfers often incur a cash advance fee.' },
            { icon: '📦', tip: 'For large amounts (>$5,000), contact OFX or Wise directly to negotiate a better rate.' },
            { icon: '🔔', tip: 'Set up rate alerts on Wise or XE.com to transfer when rates are favorable for your currency pair.' },
            { icon: '🎁', tip: 'New customer promotions: Wise, Remitly, and WorldRemit frequently offer fee-free first transfers.' },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-xl shrink-0">{item.icon}</span>
              <p className="text-sm text-gray-600 leading-relaxed">{item.tip}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Rate comparison resource */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
        <span className="text-3xl">🔍</span>
        <div>
          <p className="text-sm font-bold text-gray-800 mb-0.5">For live rate comparison</p>
          <p className="text-sm text-gray-500 mb-3">
            This tool uses static data. For real-time rates, use an independent comparison site.
          </p>
          <div className="flex flex-wrap gap-2">
            <a href="https://www.xe.com/send-money/" target="_blank" rel="noopener noreferrer"
               className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-blue-600 hover:border-blue-300 transition-colors font-medium">
              XE.com ↗
            </a>
            <a href="https://www.moneytransfercomparison.com/" target="_blank" rel="noopener noreferrer"
               className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-blue-600 hover:border-blue-300 transition-colors font-medium">
              MoneyTransferComparison ↗
            </a>
            <a href="https://wise.com/tools/exchange-rate-alerts/" target="_blank" rel="noopener noreferrer"
               className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-blue-600 hover:border-blue-300 transition-colors font-medium">
              Wise Rate Alerts ↗
            </a>
            <a href="https://wise.com/invite/dic/qifeil2" target="_blank" rel="noopener noreferrer"
               className="text-xs px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-green-700 hover:border-green-400 transition-colors font-medium">
              🎁 Open Wise (referral) ↗
            </a>
          </div>
        </div>
      </div>

      <p className="mt-10 text-sm text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
        ⚠️ <strong className="font-medium text-gray-600">Static data — rates change daily.</strong>{' '}
        Fee estimates are indicative only based on 2024–25 typical rates.
        Always verify current rates on the service&apos;s official website before transferring.
      </p>
    </main>
  )
}
