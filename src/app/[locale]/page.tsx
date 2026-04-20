import { getTranslations, setRequestLocale } from 'next-intl/server'
import { TOOLS_BY_PILLAR } from '@/lib/data/tools'
import { COUNTRY_LIST } from '@/lib/data/countries'
import Link from 'next/link'

const PILLAR_ORDER = ['visa', 'work', 'language', 'family', 'assets', 'business']

const PILLAR_META: Record<string, { icon: string; label: string; color: string; textColor: string }> = {
  visa:     { icon: '🛂', label: 'Visas & Status',   color: 'bg-blue-50',   textColor: 'text-blue-700' },
  work:     { icon: '⚖️', label: 'Work & Rights',    color: 'bg-rose-50',   textColor: 'text-rose-700' },
  language: { icon: '💬', label: 'Language',          color: 'bg-teal-50',   textColor: 'text-teal-700' },
  family:   { icon: '👨‍👩‍👧', label: 'Family & Kids',   color: 'bg-purple-50', textColor: 'text-purple-700' },
  assets:   { icon: '💰', label: 'Money & Benefits', color: 'bg-amber-50',  textColor: 'text-amber-700' },
  business: { icon: '🏢', label: 'Business',          color: 'bg-green-50',  textColor: 'text-green-700' },
}

const SPRACHCAFE_HIGHLIGHTS = [
  { day: 'Mon', time: '18:30', name: 'Co-cooking & Dinner', place: 'ZEP' },
  { day: 'Thu', time: '16:00', name: 'Café Talk', place: 'Lutherkirche' },
  { day: 'Fri', time: '19:30', name: 'Sprachcafé night', place: 'Marstall / ZEP' },
  { day: 'Sun', time: '18:00', name: 'German lessons B1–C1', place: 'Calvary Chapel' },
]

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  const orderedPillars = PILLAR_ORDER
    .filter((p) => TOOLS_BY_PILLAR[p])
    .map((pillar) => ({ pillar, tools: TOOLS_BY_PILLAR[pillar] }))

  return (
    <main className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:py-28 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
          {t('home.hero.title')}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('home.hero.subtitle')}
        </p>
        <Link
          href={`/${locale}/tools`}
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-700 transition-colors shadow-sm"
        >
          {t('home.hero.cta')}
          <span aria-hidden="true">→</span>
        </Link>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
          {[
            { value: '280M', label: t('home.hero.stats.immigrants') },
            { value: '13+',  label: t('home.hero.stats.tools') },
            { value: '5',    label: t('home.hero.stats.countries') },
            { value: '15',   label: t('home.hero.stats.languages') },
          ].map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-2xl p-5">
              <div className="text-4xl font-bold text-gray-900 mb-1">{s.value}</div>
              <div className="text-sm text-gray-500 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured tools ────────────────────────────────────────────────── */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Start here</h2>
        <p className="text-base text-gray-500 mb-8">
          Free tools that work in your browser — no account, no paywall.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          <Link
            href={`/${locale}/tools/visa-finder`}
            className="group block p-7 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:border-blue-400 hover:bg-blue-100 transition-all"
          >
            <div className="text-4xl mb-4" aria-hidden="true">🛂</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Visa pathway finder</h3>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              Tell us your origin, destination, and purpose. Get every visa route —
              requirements, fees, processing time, and the path to permanent residence.
            </p>
            <div className="flex gap-2 flex-wrap mb-5 text-sm text-blue-600">
              <span>🇺🇸 🇩🇪 🇬🇧 🇨🇦 🇦🇺</span>
              <span>·</span>
              <span>5 countries · 27+ visas</span>
            </div>
            <span className="inline-flex items-center gap-1 text-blue-700 font-semibold text-base group-hover:gap-2 transition-all">
              Find your visa <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link
            href={`/${locale}/tools/letter-decoder`}
            className="group block p-7 bg-teal-50 border-2 border-teal-100 rounded-2xl hover:border-teal-400 hover:bg-teal-100 transition-all"
          >
            <div className="text-4xl mb-4" aria-hidden="true">📄</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Official letter decoder</h3>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              Got a confusing government letter? Paste it in — get a plain-language breakdown:
              what it means, key deadlines, and exactly what to do next.
            </p>
            <span className="inline-flex items-center gap-1 text-teal-700 font-semibold text-base group-hover:gap-2 transition-all">
              Decode a letter <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* ── All tools ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-700">{t('nav.tools')}</h2>
          <Link href={`/${locale}/tools`} className="text-sm text-blue-600 hover:underline">
            View all →
          </Link>
        </div>

        <div className="space-y-8">
          {orderedPillars.map(({ pillar, tools }) => {
            const meta = PILLAR_META[pillar]
            if (!meta) return null
            const liveTools = tools.filter((tool) => tool.status !== 'planned')
            if (liveTools.length === 0) return null
            return (
              <div key={pillar}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${meta.color} ${meta.textColor}`}>
                    {meta.icon} {meta.label}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {tools.map((tool) =>
                    tool.status === 'planned' ? (
                      <div
                        key={tool.id}
                        className="p-4 bg-white border border-gray-100 rounded-xl opacity-50"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium text-gray-700">{t(tool.titleKey)}</span>
                          <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
                            Soon
                          </span>
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={tool.id}
                        href={`/${locale}/tools/${tool.slug}`}
                        className="group block p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                            {t(tool.titleKey)}
                          </span>
                          <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                            tool.status === 'live'
                              ? 'bg-green-50 text-green-700 border border-green-100'
                              : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            {tool.status === 'live' ? 'Live' : 'Beta'}
                          </span>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Countries ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">{t('nav.countries')}</h2>
        <div className="flex flex-wrap gap-3">
          {COUNTRY_LIST.map((c) => (
            <Link
              key={c.code}
              href={`/${locale}/tools?country=${c.code}`}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:border-gray-400 hover:shadow-sm transition-all"
            >
              <span className="text-2xl" aria-hidden="true">{c.flag}</span>
              <span className="text-gray-900">{c.name}</span>
              <span className="text-gray-400 text-xs">{c.immigrantCount}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Community ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Join the community</h2>
        <p className="text-base text-gray-500 mb-8">
          You&apos;re not alone. Connect with other immigrants wherever you are.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Telegram */}
          <a
            href="https://t.me/+cgks5vGPUSpjMGFi"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:border-blue-300 transition-all"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Telegram community</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Questions, stories, and tips from immigrants worldwide.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-blue-600 font-semibold group-hover:gap-2 transition-all">
              Join on Telegram →
            </span>
          </a>

          {/* WhatsApp Germany */}
          <a
            href="https://chat.whatsapp.com/IeDTMarAKbhBTZzcmi7PDC?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 bg-green-50 border-2 border-green-100 rounded-2xl hover:border-green-300 transition-all"
          >
            <div className="text-3xl mb-3">🇩🇪</div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Germany group</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Local community in <strong className="font-medium text-gray-700">Heidelberg & Mannheim</strong> —
              events, meetups, and help settling in.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-green-700 font-semibold group-hover:gap-2 transition-all">
              Join on WhatsApp →
            </span>
          </a>

          {/* Sprachcafé Heidelberg */}
          <Link
            href={`/${locale}/places/heidelberg`}
            className="group block p-6 bg-orange-50 border-2 border-orange-100 rounded-2xl hover:border-orange-300 transition-all sm:col-span-2 lg:col-span-1"
          >
            <div className="text-3xl mb-3">☕</div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Heidelberg Sprachcafé</h3>
            <p className="text-sm text-gray-500 mb-3">
              Weekly language exchange events across the city — open to all levels.
            </p>
            <ul className="space-y-1 mb-4">
              {SPRACHCAFE_HIGHLIGHTS.map((e) => (
                <li key={e.day} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="w-8 font-semibold text-orange-600 shrink-0">{e.day}</span>
                  <span>{e.time} · {e.name}</span>
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-1 text-sm text-orange-700 font-semibold group-hover:gap-2 transition-all">
              See full schedule →
            </span>
          </Link>

        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="px-6 py-14 max-w-5xl mx-auto border-t border-gray-100 mt-6 flex items-center justify-between flex-wrap gap-4">
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
