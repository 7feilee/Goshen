import { getTranslations, setRequestLocale } from 'next-intl/server'
import { COUNTRY_LIST } from '@/lib/data/countries'
import Link from 'next/link'

const SPRACHCAFE_HIGHLIGHTS = [
  { day: 'Mon', time: '18:30', name: 'Co-cooking & Dinner', place: 'ZEP' },
  { day: 'Thu', time: '16:00', name: 'Café Talk', place: 'Lutherkirche' },
  { day: 'Fri', time: '19:30', name: 'Sprachcafé night', place: 'Marstall / ZEP' },
  { day: 'Sun', time: '18:00', name: 'German lessons B1–C1', place: 'Calvary Chapel' },
]

const DE_TOOLS = [
  {
    icon: '📄',
    title: 'Got a letter from Ausländerbehörde?',
    desc: 'Paste any German official letter — get a plain-English breakdown of what it means and what to do.',
    href: '/tools/letter-decoder',
    color: 'bg-teal-50 border-teal-200 hover:border-teal-400',
    cta: 'Decode the letter',
    ctaColor: 'text-teal-700',
  },
  {
    icon: '🛂',
    title: 'Which visa is right for you?',
    desc: 'Fachkräfte, Chancenkarte, Blue Card, family — find your route with fees, timelines, and PR pathways.',
    href: '/tools/visa-finder',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    cta: 'Find your visa',
    ctaColor: 'text-blue-700',
  },
  {
    icon: '📖',
    title: 'Preparing for Einbürgerung?',
    desc: 'Practice all 460 questions for the German citizenship test, including your Bundesland-specific ones.',
    href: '/tools/citizenship-test',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    cta: 'Start practising',
    ctaColor: 'text-purple-700',
  },
  {
    icon: '⚖️',
    title: 'Know your rights at work',
    desc: 'Minimum wage, sick leave, dismissal protection, and immigrant-specific rules — all in plain language.',
    href: '/tools/worker-rights',
    color: 'bg-rose-50 border-rose-200 hover:border-rose-400',
    cta: 'Check your rights',
    ctaColor: 'text-rose-700',
  },
  {
    icon: '🏥',
    title: 'GKV or PKV — which health insurance?',
    desc: 'Understand the German health system, what you\'re entitled to, and how to switch.',
    href: '/tools/healthcare-guide',
    color: 'bg-sky-50 border-sky-200 hover:border-sky-400',
    cta: 'Explore healthcare',
    ctaColor: 'text-sky-700',
  },
  {
    icon: '💰',
    title: 'Sending money home?',
    desc: 'Compare Wise, Remitly, Western Union and more — fees, exchange rates, and transfer times side by side.',
    href: '/tools/remittance',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    cta: 'Compare rates',
    ctaColor: 'text-amber-700',
  },
]

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  return (
    <main className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-6 pt-16 pb-10 max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-500 mb-6">
            🇩🇪 Built in Heidelberg · Free & open source
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-5 leading-tight">
            Navigating life in Germany<br className="hidden sm:block" /> just got easier.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-8">
            Free tools for visas, paperwork, work rights, and settling in —
            no account, no paywall, no jargon.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Explore all tools →
            </Link>
            <a
              href="https://chat.whatsapp.com/IeDTMarAKbhBTZzcmi7PDC?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors"
            >
              🇩🇪 Join Germany group
            </a>
          </div>
        </div>
      </section>

      {/* ── Germany spotlight ─────────────────────────────────────────────── */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🇩🇪</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">New to Germany? Start here.</h2>
            <p className="text-sm text-gray-500">The most common things immigrants need, ready to use.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DE_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={`/${locale}${tool.href}`}
              className={`group block p-5 bg-white border-2 rounded-2xl transition-all ${tool.color}`}
            >
              <div className="text-2xl mb-3">{tool.icon}</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug">{tool.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{tool.desc}</p>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${tool.ctaColor} group-hover:gap-2 transition-all`}>
                {tool.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Community ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Join the community</h2>
        <p className="text-sm text-gray-500 mb-6">
          You&apos;re not alone — connect with others in Heidelberg, Mannheim, and beyond.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* WhatsApp Germany – most prominent */}
          <a
            href="https://chat.whatsapp.com/IeDTMarAKbhBTZzcmi7PDC?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 bg-green-600 rounded-2xl hover:bg-green-700 transition-colors text-white"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-base font-bold mb-1">Germany WhatsApp group</h3>
            <p className="text-sm text-green-100 leading-relaxed mb-4">
              Heidelberg & Mannheim locals — events, questions, and real help from people who&apos;ve been there.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
              Join on WhatsApp →
            </span>
          </a>

          {/* Sprachcafé */}
          <Link
            href={`/${locale}/places/heidelberg`}
            className="group block p-6 bg-orange-50 border-2 border-orange-100 rounded-2xl hover:border-orange-300 transition-all"
          >
            <div className="text-3xl mb-3">☕</div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Heidelberg Sprachcafé</h3>
            <p className="text-sm text-gray-500 mb-3">
              Weekly language exchange — open to all levels. Meet people, practise German or English.
            </p>
            <ul className="space-y-1 mb-4">
              {SPRACHCAFE_HIGHLIGHTS.map((e) => (
                <li key={e.day} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="w-8 font-bold text-orange-600 shrink-0">{e.day}</span>
                  <span>{e.time} · {e.name}</span>
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-700 group-hover:gap-2 transition-all">
              See full schedule →
            </span>
          </Link>

          {/* Telegram */}
          <a
            href="https://t.me/+cgks5vGPUSpjMGFi"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:border-blue-300 transition-all"
          >
            <div className="text-3xl mb-3">✈️</div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Global Telegram community</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Immigrants from 50+ countries sharing tips, stories, and answers. In English.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
              Join on Telegram →
            </span>
          </a>

        </div>
      </section>

      {/* ── Other countries ───────────────────────────────────────────────── */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Tools also available for</h2>
        <div className="flex flex-wrap gap-3">
          {COUNTRY_LIST.filter((c) => c.code !== 'DE').map((c) => (
            <Link
              key={c.code}
              href={`/${locale}/tools?country=${c.code}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:border-gray-400 hover:shadow-sm transition-all"
            >
              <span className="text-xl">{c.flag}</span>
              <span className="text-gray-900">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-100 mt-4 flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-gray-400">{t('common.openSource')}</p>
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="https://buymeacoffee.com/7feilee"
            className="text-sm text-yellow-600 hover:text-yellow-800 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            ☕ Buy me a coffee
          </a>
          <a
            href="https://github.com/7feilee/Goshen"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('common.contributeOnGitHub')} →
          </a>
        </div>
      </footer>
    </main>
  )
}
