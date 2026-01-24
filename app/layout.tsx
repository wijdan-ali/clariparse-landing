import type { Metadata } from 'next'
import { Antic } from 'next/font/google'
import './globals.css'

const antic = Antic({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-antic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Clariparse - Turn Clutter into Clarity',
  description: 'Extract Data From Documents Into Clean Spreadsheets With AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={antic.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
