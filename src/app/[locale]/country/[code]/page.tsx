import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { locales } from '@/i18n/request'

export function generateStaticParams() {
  const codes = ['us', 'uk', 'ca', 'au']
  return locales.flatMap((locale) =>
    codes.map((code) => ({ locale, code }))
  )
}

// ── Country data ──────────────────────────────────────────────────────────────

const COUNTRIES: Record<string, {
  flag: string
  name: string
  adjective: string
  authority: string
  authorityShort: string
  headline: string
  sub: string
  accentColor: string
  accentBorder: string
  accentText: string
  bgColor: string
  tools: Array<{ icon: string; title: string; desc: string; href: string; color: string; cta: string; ctaColor: string }>
  tips: string[]
}> = {
  US: {
    flag: '🇺🇸',
    name: 'United States',
    adjective: 'American',
    authority: 'U.S. Citizenship and Immigration Services',
    authorityShort: 'USCIS',
    headline: 'Moving to the United States?',
    sub: 'Free tools for visas, paperwork, work rights, and settling into American life.',
    accentColor: 'bg-blue-600',
    accentBorder: 'border-blue-200',
    accentText: 'text-blue-700',
    bgColor: 'bg-blue-50',
    tips: [
      'Keep copies of all immigration documents — always.',
      'Your visa status is tied to your employer on an H-1B. Plan carefully before changing jobs.',
      'File taxes even on a work visa — the IRS taxes worldwide income for residents.',
    ],
    tools: [
      {
        icon: '📄',
        title: 'Got a letter from USCIS?',
        desc: 'Paste any immigration or government letter — get a plain-English breakdown: what it means, key deadlines, and what to do next.',
        href: '/tools/letter-decoder',
        color: 'bg-teal-50 border-teal-200 hover:border-teal-400',
        cta: 'Decode the letter',
        ctaColor: 'text-teal-700',
      },
      {
        icon: '🛂',
        title: 'Which US visa is right for you?',
        desc: 'H-1B, Green Card, O-1, family sponsorship — find your pathway with fees, timelines, and the route to permanent residence.',
        href: '/tools/visa-finder',
        color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
        cta: 'Find your visa',
        ctaColor: 'text-blue-700',
      },
      {
        icon: '📖',
        title: 'Preparing for the US citizenship test?',
        desc: 'Practice all 100 civics questions for the naturalization interview — with instant feedback and category filters.',
        href: '/tools/citizenship-test',
        color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
        cta: 'Start practising',
        ctaColor: 'text-purple-700',
      },
      {
        icon: '⚖️',
        title: 'Know your rights as a US worker',
        desc: 'Minimum wage, overtime, discrimination protection — and the specific rules that apply to immigrant and visa workers.',
        href: '/tools/worker-rights',
        color: 'bg-rose-50 border-rose-200 hover:border-rose-400',
        cta: 'Check your rights',
        ctaColor: 'text-rose-700',
      },
      {
        icon: '🏥',
        title: 'Healthcare in the US — what you need',
        desc: 'Navigate employer plans, marketplace insurance, Medicaid, and what changes with your visa status.',
        href: '/tools/healthcare-guide',
        color: 'bg-sky-50 border-sky-200 hover:border-sky-400',
        cta: 'Explore healthcare',
        ctaColor: 'text-sky-700',
      },
      {
        icon: '💸',
        title: 'Sending money internationally?',
        desc: 'Compare Wise, Remitly, Western Union and more — real fees and exchange rates side by side.',
        href: '/tools/remittance',
        color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
        cta: 'Compare rates',
        ctaColor: 'text-amber-700',
      },
    ],
  },
  UK: {
    flag: '🇬🇧',
    name: 'United Kingdom',
    adjective: 'British',
    authority: 'UK Visas and Immigration',
    authorityShort: 'UKVI',
    headline: 'Moving to the United Kingdom?',
    sub: 'Free tools for visas, Home Office letters, NHS, work rights, and settling into UK life.',
    accentColor: 'bg-red-700',
    accentBorder: 'border-red-200',
    accentText: 'text-red-700',
    bgColor: 'bg-red-50',
    tips: [
      'Keep your Biometric Residence Permit (BRP) safe — it is your main proof of status.',
      'NHS surcharge is paid upfront with your visa — keep the payment confirmation.',
      'Indefinite Leave to Remain (ILR) requires continuous residence — avoid long absences.',
    ],
    tools: [
      {
        icon: '📄',
        title: 'Got a letter from the Home Office?',
        desc: 'Paste any UK immigration or government letter — get a plain-English breakdown of what it means and exactly what to do.',
        href: '/tools/letter-decoder',
        color: 'bg-teal-50 border-teal-200 hover:border-teal-400',
        cta: 'Decode the letter',
        ctaColor: 'text-teal-700',
      },
      {
        icon: '🛂',
        title: 'Which UK visa is right for you?',
        desc: 'Skilled Worker, Global Talent, family, student — find your route with fees, processing times, and the path to ILR.',
        href: '/tools/visa-finder',
        color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
        cta: 'Find your visa',
        ctaColor: 'text-blue-700',
      },
      {
        icon: '📖',
        title: 'Preparing for Life in the UK test?',
        desc: 'Practice all 24 topic areas for the citizenship test — with instant feedback and category filters.',
        href: '/tools/citizenship-test',
        color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
        cta: 'Start practising',
        ctaColor: 'text-purple-700',
      },
      {
        icon: '⚖️',
        title: 'Your rights as a UK worker',
        desc: 'National Living Wage, holiday entitlement, dismissal rights — and what is different for visa holders.',
        href: '/tools/worker-rights',
        color: 'bg-rose-50 border-rose-200 hover:border-rose-400',
        cta: 'Check your rights',
        ctaColor: 'text-rose-700',
      },
      {
        icon: '🏥',
        title: 'NHS — what immigrants are entitled to',
        desc: 'Understand your NHS access, when you pay the surcharge, GP registration, and prescription charges.',
        href: '/tools/healthcare-guide',
        color: 'bg-sky-50 border-sky-200 hover:border-sky-400',
        cta: 'Explore healthcare',
        ctaColor: 'text-sky-700',
      },
      {
        icon: '💸',
        title: 'Sending money home from the UK?',
        desc: 'Compare Wise, Remitly, and 7 more services — fees, exchange rates, and transfer times side by side.',
        href: '/tools/remittance',
        color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
        cta: 'Compare rates',
        ctaColor: 'text-amber-700',
      },
    ],
  },
  CA: {
    flag: '🇨🇦',
    name: 'Canada',
    adjective: 'Canadian',
    authority: 'Immigration, Refugees and Citizenship Canada',
    authorityShort: 'IRCC',
    headline: 'Moving to Canada?',
    sub: 'Free tools for visas, IRCC letters, healthcare, work rights, and settling into Canadian life.',
    accentColor: 'bg-red-600',
    accentBorder: 'border-red-200',
    accentText: 'text-red-700',
    bgColor: 'bg-red-50',
    tips: [
      'Maintain your Permanent Resident status — you must be in Canada 730 days out of every 5 years.',
      'SIN (Social Insurance Number) is required for work — apply at Service Canada on arrival.',
      'Provincial health insurance (OHIP, MSP, etc.) has a waiting period in most provinces.',
    ],
    tools: [
      {
        icon: '📄',
        title: 'Got a letter from IRCC?',
        desc: 'Paste any Canadian immigration or government letter — get a plain-English breakdown of what it means and what to do next.',
        href: '/tools/letter-decoder',
        color: 'bg-teal-50 border-teal-200 hover:border-teal-400',
        cta: 'Decode the letter',
        ctaColor: 'text-teal-700',
      },
      {
        icon: '🛂',
        title: 'Express Entry or Provincial Nominee?',
        desc: 'Federal Skilled Worker, CEC, PNP — find your Canadian pathway with CRS scores, processing times, and PR routes.',
        href: '/tools/visa-finder',
        color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
        cta: 'Find your pathway',
        ctaColor: 'text-blue-700',
      },
      {
        icon: '📖',
        title: 'Preparing for the Canadian citizenship test?',
        desc: 'Practice questions from "Discover Canada" — the official study guide — with instant feedback.',
        href: '/tools/citizenship-test',
        color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
        cta: 'Start practising',
        ctaColor: 'text-purple-700',
      },
      {
        icon: '⚖️',
        title: 'Your rights as a worker in Canada',
        desc: 'Provincial minimum wages, overtime rules, termination notice, and rights specific to work permit holders.',
        href: '/tools/worker-rights',
        color: 'bg-rose-50 border-rose-200 hover:border-rose-400',
        cta: 'Check your rights',
        ctaColor: 'text-rose-700',
      },
      {
        icon: '🏥',
        title: 'Canadian healthcare for immigrants',
        desc: 'Provincial health insurance, waiting periods, what is and is not covered, and supplemental insurance options.',
        href: '/tools/healthcare-guide',
        color: 'bg-sky-50 border-sky-200 hover:border-sky-400',
        cta: 'Explore healthcare',
        ctaColor: 'text-sky-700',
      },
      {
        icon: '💸',
        title: 'Sending money internationally from Canada?',
        desc: 'Compare Wise, Remitly, Western Union and more — real fees and rates for CAD transfers.',
        href: '/tools/remittance',
        color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
        cta: 'Compare rates',
        ctaColor: 'text-amber-700',
      },
    ],
  },
  AU: {
    flag: '🇦🇺',
    name: 'Australia',
    adjective: 'Australian',
    authority: 'Department of Home Affairs',
    authorityShort: 'Home Affairs',
    headline: 'Moving to Australia?',
    sub: 'Free tools for visas, Home Affairs letters, Medicare, work rights, and settling into Australian life.',
    accentColor: 'bg-yellow-600',
    accentBorder: 'border-yellow-200',
    accentText: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    tips: [
      'Your visa conditions determine your work rights — check your VEVO record online.',
      'Medicare is available to residents from countries with reciprocal agreements — check if yours qualifies.',
      'The skills assessment must be completed before applying for most skilled visas.',
    ],
    tools: [
      {
        icon: '📄',
        title: 'Got a letter from Home Affairs?',
        desc: 'Paste any Australian immigration or government letter — get a plain-English breakdown of what it means and what to do.',
        href: '/tools/letter-decoder',
        color: 'bg-teal-50 border-teal-200 hover:border-teal-400',
        cta: 'Decode the letter',
        ctaColor: 'text-teal-700',
      },
      {
        icon: '🛂',
        title: 'Which Australian visa fits you?',
        desc: 'Skilled Independent (189), Employer Sponsored (482), Partner — find your route with points, costs, and PR pathways.',
        href: '/tools/visa-finder',
        color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
        cta: 'Find your visa',
        ctaColor: 'text-blue-700',
      },
      {
        icon: '📖',
        title: 'Preparing for the Australian citizenship test?',
        desc: 'Practice questions about Australian values, history, and government — with instant feedback.',
        href: '/tools/citizenship-test',
        color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
        cta: 'Start practising',
        ctaColor: 'text-purple-700',
      },
      {
        icon: '⚖️',
        title: 'Your rights as a worker in Australia',
        desc: 'Fair Work Act, minimum wage, unfair dismissal — and the specific protections for visa and migrant workers.',
        href: '/tools/worker-rights',
        color: 'bg-rose-50 border-rose-200 hover:border-rose-400',
        cta: 'Check your rights',
        ctaColor: 'text-rose-700',
      },
      {
        icon: '🏥',
        title: 'Medicare for immigrants — what is covered',
        desc: 'Who qualifies for Medicare, what is covered, private health insurance, and the Lifetime Health Cover loading.',
        href: '/tools/healthcare-guide',
        color: 'bg-sky-50 border-sky-200 hover:border-sky-400',
        cta: 'Explore healthcare',
        ctaColor: 'text-sky-700',
      },
      {
        icon: '💸',
        title: 'Send money home from Australia',
        desc: 'Compare Wise, Remitly, OFX and more — fees, AUD exchange rates, and transfer times side by side.',
        href: '/tools/remittance',
        color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
        cta: 'Compare rates',
        ctaColor: 'text-amber-700',
      },
    ],
  },
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function CountryPage({
  params,
}: {
  params: Promise<{ locale: string; code: string }>
}) {
  const { locale, code } = await params
  setRequestLocale(locale)

  const country = COUNTRIES[code.toUpperCase()]
  if (!country) notFound()

  return (
    <main>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section aria-labelledby="country-heading" className="px-6 pt-14 pb-10 max-w-5xl mx-auto">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6"
        >
          ← Home
        </Link>

        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 mb-6">
            <span aria-hidden="true">{country.flag}</span>
            {country.name} · {country.authorityShort}
          </p>

          <h1 id="country-heading" className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
            {country.headline}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
            {country.sub}
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              href={`/${locale}/tools/visa-finder`}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Find your visa →
            </Link>
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              All tools
            </Link>
          </div>

          <ul aria-label="Key features" className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500 list-none p-0 m-0">
            {['No sign-up required', 'No ads or paywalls', '15 languages', 'Open source'].map((f) => (
              <li key={f} className="flex items-center gap-1">
                <span aria-hidden="true" className="text-green-500">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Tools spotlight ─────────────────────────────────────────────── */}
      <section aria-labelledby="tools-heading" className="bg-gray-50 border-y border-gray-100">
        <div className="px-6 py-12 max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 id="tools-heading" className="text-2xl font-bold text-gray-900 mb-1">
              <span aria-hidden="true">{country.flag} </span>
              Start here — tools for {country.name}
            </h2>
            <p className="text-sm text-gray-600">
              The most common questions immigrants in {country.name} ask — answered with free tools.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {country.tools.map((tool) => (
              <Link
                key={tool.href}
                href={`/${locale}${tool.href}`}
                className={`group block p-5 bg-white border-2 rounded-2xl transition-all ${tool.color}`}
              >
                <div className="text-2xl mb-3" aria-hidden="true">{tool.icon}</div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">{tool.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">{tool.desc}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold ${tool.ctaColor} group-hover:gap-2 transition-all`} aria-hidden="true">
                  {tool.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tips ────────────────────────────────────────────────────────── */}
      <section aria-labelledby="tips-heading" className="px-6 py-10 max-w-5xl mx-auto">
        <h2 id="tips-heading" className="text-base font-semibold text-gray-700 mb-4">
          <span aria-hidden="true">💡 </span>Good to know for {country.name}
        </h2>
        <ul className="space-y-3">
          {country.tips.map((tip) => (
            <li key={tip} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
              <span className="text-green-500 shrink-0 mt-0.5" aria-hidden="true">✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Community ───────────────────────────────────────────────────── */}
      <section aria-labelledby="community-heading" className="px-6 py-10 max-w-5xl mx-auto border-t border-gray-100">
        <h2 id="community-heading" className="text-base font-semibold text-gray-700 mb-4">
          Join the community
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          <a
            href="https://t.me/+cgks5vGPUSpjMGFi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the global Goshen community on Telegram (opens in new tab)"
            className="group block p-5 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:border-blue-300 transition-all"
          >
            <div className="text-2xl mb-2" aria-hidden="true">💬</div>
            <p className="text-sm font-bold text-gray-900 mb-1">Global Telegram community</p>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Immigrants from 50+ countries — tips, visa questions, and honest answers.
            </p>
            <span className="text-xs font-semibold text-blue-600 group-hover:underline" aria-hidden="true">Join on Telegram →</span>
          </a>

          <Link
            href={`/${locale}/tools?country=${code.toUpperCase()}`}
            className="group block p-5 bg-gray-50 border-2 border-gray-200 rounded-2xl hover:border-gray-400 transition-all"
          >
            <div className="text-2xl mb-2" aria-hidden="true">{country.flag}</div>
            <p className="text-sm font-bold text-gray-900 mb-1">All tools for {country.name}</p>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              See every tool filtered for {country.name} — visas, family, money, work, and more.
            </p>
            <span className="text-xs font-semibold text-gray-700 group-hover:underline" aria-hidden="true">View all tools →</span>
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="px-6 py-10 max-w-5xl mx-auto border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-gray-400">Goshen — free tools for every immigrant</p>
        <Link href={`/${locale}`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          ← Back to home
        </Link>
      </footer>

    </main>
  )
}
