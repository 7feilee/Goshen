import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Goshen — Free tools for every immigrant',
  description:
    'Free tools for every immigrant — visa pathways, letter decoder, citizenship tests, and more. 15 languages. 5 countries.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
