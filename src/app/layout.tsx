import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/global.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Photography Gallery Portfolio',
  description: 'A professional photography gallery showcasing beautiful moments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

