import { getTranslations, setRequestLocale } from 'next-intl/server'
import { COUNTRY_LIST } from '@/lib/data/countries'
import Link from 'next/link'

// ── Static data ───────────────────────────────────────────────────────────────

const SPRACHCAFE_HIGHLIGHTS = [
  { day: 'Mon', time: '18:30', name: 'Co-cooking & Dinner' },
  { day: 'Thu', time: '16:00', name: 'Café Talk' },
  { day: 'Fri', time: '19:30', name: 'Sprachcafé night' },
  { day: 'Sun', time: '18:00', name: 'German lessons B1–C1' },
]

const DE_TOOLS = [
  {
    icon: '📄',
    title: 'Got a letter from the Ausländerbehörde?',
    desc: 'Paste any German official letter — get a plain-English breakdown of what it means, key deadlines, and exactly what to do.',
    href: '/tools/letter-decoder',
    color: 'bg-teal-50 border-teal-200 hover:border-teal-400',
    cta: 'Decode the letter',
    ctaColor: 'text-teal-700',
  },
  {
    icon: '🛂',
    title: 'Which visa route is right for you?',
    desc: 'Fachkräfte, Chancenkarte, Blue Card, family reunification — find your route with fees, timelines, and the path to permanent residence.',
    href: '/tools/visa-finder',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    cta: 'Find your visa',
    ctaColor: 'text-blue-700',
  },
  {
    icon: '📖',
    title: 'Preparing for Einbürgerung?',
    desc: 'Practise all 460 questions for the German citizenship test — with your Bundesland-specific set and instant feedback.',
    href: '/tools/citizenship-test',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    cta: 'Start practising',
    ctaColor: 'text-purple-700',
  },
  {
    icon: '⚖️',
    title: 'Know your rights at work',
    desc: 'Minimum wage, sick leave, dismissal protection — and the extra rules that apply specifically to immigrants in Germany.',
    href: '/tools/worker-rights',
    color: 'bg-rose-50 border-rose-200 hover:border-rose-400',
    cta: 'Check your rights',
    ctaColor: 'text-rose-700',
  },
  {
    icon: '🏥',
    title: 'GKV or PKV — which health insurance?',
    desc: 'Understand the German health system, what you\'re entitled to, and what changing between schemes actually involves.',
    href: '/tools/healthcare-guide',
    color: 'bg-sky-50 border-sky-200 hover:border-sky-400',
    cta: 'Explore healthcare',
    ctaColor: 'text-sky-700',
  },
  {
    icon: '💸',
    title: 'Sending money home?',
    desc: 'Compare Wise, Remitly, Western Union and 7 more services — real fees, real exchange rates, transfer times side by side.',
    href: '/tools/remittance',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    cta: 'Compare rates',
    ctaColor: 'text-amber-700',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  return (
    <main>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="px-6 pt-16 pb-12 max-w-5xl mx-auto"
      >
        <div className="max-w-2xl">
          {/* Badge */}
          <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 mb-6">
            <span aria-hidden="true">🇩🇪</span>
            Built in Heidelberg · Free &amp; open source
          </p>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-5 leading-tight"
          >
            Moving to Germany?<br className="hidden sm:block" />
            You&apos;re not alone.
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
            Free tools for visas, official letters, work rights, and settling in —
            built by immigrants, for immigrants.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Explore all tools
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="https://chat.whatsapp.com/IeDTMarAKbhBTZzcmi7PDC?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the Germany community WhatsApp group for Heidelberg and Mannheim (opens in new tab)"
              className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors"
            >
              <span aria-hidden="true">🇩🇪</span>
              Join Germany group
            </a>
          </div>

          {/* Trust strip */}
          <ul
            aria-label="Key features"
            className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500 list-none p-0 m-0"
          >
            {['No sign-up required', 'No ads or paywalls', '15 languages', 'Open source'].map((f) => (
              <li key={f} className="flex items-center gap-1">
                <span aria-hidden="true" className="text-green-500">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Germany spotlight ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="de-heading"
        className="bg-gray-50 border-y border-gray-100"
      >
        <div className="px-6 py-12 max-w-5xl mx-auto">
          <div className="mb-8">
            <h2
              id="de-heading"
              className="text-2xl font-bold text-gray-900 mb-1"
            >
              <span aria-hidden="true">🇩🇪 </span>New to Germany? Start here.
            </h2>
            <p className="text-sm text-gray-600">
              The questions every immigrant in Germany asks — answered with free, ready-to-use tools.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DE_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={`/${locale}${tool.href}`}
                className={`group block p-5 bg-white border-2 rounded-2xl transition-all ${tool.color}`}
              >
                <div className="text-2xl mb-3" aria-hidden="true">{tool.icon}</div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">{tool.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">{tool.desc}</p>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${tool.ctaColor} group-hover:gap-2 transition-all`}
                  aria-hidden="true"
                >
                  {tool.cta} →
                </span>
              </Link>
            ))}
          </div>

          {/* Recommended resources for Germany */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-xs text-gray-500 font-medium">Also useful:</span>
            <a
              href="/german-word-roots"
              aria-label="German Word Roots — language reference with 260 root stems"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:border-amber-300 hover:text-amber-700 transition-all"
            >
              <span aria-hidden="true">📖</span>
              German Word Roots
            </a>
            <a
              href="https://sprachkraft.mayfly.wiki/vocab.html"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sprachkraft Vocabulary — German vocab practice (opens in new tab)"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:border-teal-300 hover:text-teal-700 transition-all"
            >
              <span aria-hidden="true">🧠</span>
              Sprachkraft Vocab ↗
            </a>
            <a
              href="https://sprachkraft.mayfly.wiki/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sprachkraft — German language learning tools (opens in new tab)"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:border-green-300 hover:text-green-700 transition-all"
            >
              <span aria-hidden="true">🌱</span>
              Sprachkraft ↗
            </a>
            <a
              href="https://feather-insurance.com?utm_source=goshen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Feather Insurance — English-friendly insurance in Germany (opens in new tab)"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:border-indigo-300 hover:text-indigo-700 transition-all"
            >
              <span aria-hidden="true">🛡️</span>
              Feather Insurance
              <span aria-hidden="true" className="text-gray-400">↗</span>
            </a>
            <a
              href="https://feather-insurance.com/en-eu/professional-liability-insurance?utm_source=goshen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Feather professional liability insurance for EU freelancers (opens in new tab)"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:border-indigo-300 hover:text-indigo-700 transition-all"
            >
              <span aria-hidden="true">📋</span>
              Professional liability (EU)
              <span aria-hidden="true" className="text-gray-400">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Community ─────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="community-heading"
        className="px-6 py-12 max-w-5xl mx-auto"
      >
        <div className="mb-8">
          <h2 id="community-heading" className="text-2xl font-bold text-gray-900 mb-1">
            Join the community
          </h2>
          <p className="text-sm text-gray-600">
            Real people in Heidelberg, Mannheim, and beyond — events, meetups, and honest answers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* WhatsApp Germany */}
          <a
            href="https://chat.whatsapp.com/IeDTMarAKbhBTZzcmi7PDC?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the Germany WhatsApp community group for Heidelberg and Mannheim (opens in new tab)"
            className="group block p-6 bg-green-600 rounded-2xl hover:bg-green-700 transition-colors text-white"
          >
            <div className="text-3xl mb-3" aria-hidden="true">📱</div>
            <h3 className="text-base font-bold mb-1">Germany WhatsApp group</h3>
            <p className="text-sm text-green-100 leading-relaxed mb-5">
              Heidelberg &amp; Mannheim locals — events, questions, and real help
              from people who&apos;ve been there.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" aria-hidden="true">
              Join on WhatsApp →
            </span>
          </a>

          {/* Sprachcafé */}
          <Link
            href={`/${locale}/places/heidelberg`}
            className="group block p-6 bg-orange-50 border-2 border-orange-100 rounded-2xl hover:border-orange-300 transition-all"
          >
            <div className="text-3xl mb-3" aria-hidden="true">☕</div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Heidelberg Sprachcafé</h3>
            <p className="text-sm text-gray-600 mb-3">
              Weekly language exchange — open to all levels. Meet people, practise German or English.
            </p>
            <ul className="space-y-1.5 mb-5" aria-label="Weekly Sprachcafé schedule highlights">
              {SPRACHCAFE_HIGHLIGHTS.map((e) => (
                <li key={e.day} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="w-8 font-bold text-orange-600 shrink-0" aria-label={e.day}>{e.day}</span>
                  <span>{e.time} · {e.name}</span>
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-700 group-hover:gap-2 transition-all" aria-hidden="true">
              See full schedule →
            </span>
          </Link>

          {/* Telegram */}
          <a
            href="https://t.me/+cgks5vGPUSpjMGFi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the global Goshen community on Telegram (opens in new tab)"
            className="group block p-6 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:border-blue-300 transition-all"
          >
            <div className="text-3xl mb-3" aria-hidden="true">💬</div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Global Telegram community</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              Immigrants from 50+ countries sharing visa tips, stories, and answers — in English.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all" aria-hidden="true">
              Join on Telegram →
            </span>
          </a>

        </div>
      </section>

      {/* ── Other countries ───────────────────────────────────────────────── */}
      <section
        aria-labelledby="countries-heading"
        className="px-6 py-10 max-w-5xl mx-auto border-t border-gray-100"
      >
        <h2 id="countries-heading" className="text-base font-semibold text-gray-700 mb-1">
          Also moving to…
        </h2>
        <p className="text-xs text-gray-500 mb-5">Same free tools — tailored for each country.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {COUNTRY_LIST.filter((c) => c.code !== 'DE').map((c) => (
            <Link
              key={c.code}
              href={`/${locale}/country/${c.code.toLowerCase()}`}
              aria-label={`Tools and guide for ${c.name}`}
              className="group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl hover:border-gray-400 hover:shadow-sm transition-all"
            >
              <span className="text-3xl shrink-0" aria-hidden="true">{c.flag}</span>
              <div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{c.name}</p>
                <p className="text-xs text-gray-400">{c.immigrantCount} immigrants</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-gray-500">{t('common.openSource')}</p>
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="https://claude.ai/referral/WkNf2Z_mkw"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Try Claude AI (referral link, opens in new tab)"
            className="text-sm text-violet-600 hover:text-violet-800 transition-colors font-medium"
          >
            <span aria-hidden="true">✦</span> Try Claude AI
          </a>
          <a
            href="https://buymeacoffee.com/7feilee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Support Goshen — Buy me a coffee (opens in new tab)"
            className="text-sm text-yellow-600 hover:text-yellow-800 transition-colors font-medium"
          >
            <span aria-hidden="true">☕</span> Buy me a coffee
          </a>
          <a
            href="https://github.com/7feilee/Goshen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contribute to Goshen on GitHub (opens in new tab)"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            {t('common.contributeOnGitHub')} →
          </a>
        </div>
      </footer>
    </main>
  )
}
