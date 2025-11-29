import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hybrid Music Player',
  description: 'Your personal music library, discovery, and streaming platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-white">{children}</body>
    </html>
  )
}
