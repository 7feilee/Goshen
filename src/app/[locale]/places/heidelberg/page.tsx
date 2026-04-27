import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'

// ── Data ──────────────────────────────────────────────────────────────────────

const EVENTS = [
  {
    day: 'Monday',
    dayColor: 'bg-blue-50 border-blue-200 text-blue-700',
    dotColor: 'bg-blue-400',
    activities: [
      {
        name: 'Sweet Home — Co-cooking & Dinner',
        time: '18:30',
        location: 'ZEP',
        address: 'Zeppelinstraße 1, 69121 Heidelberg',
        icon: '🍳',
        note: null,
        link: null,
      },
    ],
  },
  {
    day: 'Tuesday',
    dayColor: 'bg-orange-50 border-orange-200 text-orange-700',
    dotColor: 'bg-orange-400',
    activities: [
      {
        name: 'Mannheim German Speaking Club',
        time: '18:30 – 21:30',
        location: 'Paprika am Ring',
        address: null,
        icon: '🌶️',
        note: null,
        link: { label: 'RSVP on Meetup', url: 'https://www.meetup.com/mannheim-german-speaking-club/events/314182854/' },
      },
    ],
  },
  {
    day: 'Wednesday',
    dayColor: 'bg-sky-50 border-sky-200 text-sky-700',
    dotColor: 'bg-sky-400',
    activities: [
      {
        name: 'Jede Mittwoch — Community Meetup',
        time: '18:00',
        location: 'See map for venue',
        address: null,
        icon: '📍',
        note: null,
        link: { label: 'View on Google Maps', url: 'https://maps.app.goo.gl/iHZVnzsQEF8GmPE88?g_st=iwb' },
      },
    ],
  },
  {
    day: 'Thursday',
    dayColor: 'bg-purple-50 border-purple-200 text-purple-700',
    dotColor: 'bg-purple-400',
    activities: [
      {
        name: 'Café Talk — Cross-cultural Exchange',
        time: '16:00 – 18:00',
        location: 'Haus an der Lutherkirche',
        address: 'Vangerowstraße 3-5, 69115 Heidelberg',
        icon: '☕',
        note: null,
        link: null,
      },
      {
        name: 'Café Connect — International Language Café',
        time: '19:30 – 21:30',
        location: 'Café Connect',
        address: 'Europaplatz 10/11, Heidelberg',
        icon: '🌍',
        note: null,
        link: null,
      },
    ],
  },
  {
    day: 'Friday',
    dayColor: 'bg-green-50 border-green-200 text-green-700',
    dotColor: 'bg-green-400',
    activities: [
      {
        name: 'Sprachcafé Heidelberg',
        time: '19:30 – 22:30',
        location: 'Marstall or ZEP',
        address: 'Marstallhof 3 · or · Zeppelinstraße 1, 69121 Heidelberg',
        icon: '🗣️',
        note: 'The long-established Heidelberg Sprachcafé — check current venue before going.',
        link: null,
      },
    ],
  },
  {
    day: 'Sunday',
    dayColor: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    dotColor: 'bg-yellow-400',
    activities: [
      {
        name: 'German Lessons (B1–C1) & Life Café',
        time: 'German lesson 18:00 · Life Café 19:00',
        location: 'Calvary Chapel',
        address: 'Vangerowstraße 51a, Heidelberg',
        icon: '📖',
        note: null,
        link: null,
      },
    ],
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function HeidelbergPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="min-h-screen px-6 py-12 max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <Link href={`/${locale}`} className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-4 inline-block">
          ← Home
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🇩🇪</span>
          <h1 className="text-2xl font-medium text-gray-900">Heidelberg Sprachcafé</h1>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          Weekly language exchange and social events in Heidelberg — free or donation-based,
          open to everyone regardless of level.
        </p>
      </div>

      {/* Event list */}
      <div className="space-y-4">
        {EVENTS.map((event) => (
          <div
            key={event.day}
            className={`border rounded-2xl p-5 ${event.dayColor}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2 h-2 rounded-full ${event.dotColor}`} />
              <h2 className="text-sm font-bold tracking-wide uppercase">{event.day}</h2>
            </div>

            <div className="space-y-4">
              {event.activities.map((act, i) => (
                <div key={i} className="bg-white/70 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{act.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 leading-snug">{act.name}</p>
                      <p className="text-sm text-gray-500 mt-1">🕐 {act.time}</p>
                      <p className="text-sm text-gray-500">
                        📍 {act.location}
                        {act.address && (
                          <span className="text-gray-400"> — {act.address}</span>
                        )}
                      </p>
                      {act.note && (
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed italic">{act.note}</p>
                      )}
                      {act.link && (
                        <a
                          href={act.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          {act.link.label} ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-10 text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
        ⚠️ Times and venues may change. Verify on local community boards or contact organisers before attending.
      </p>
    </main>
  )
}
