import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Four Years',
  description: 'Four beautiful years of us',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer className="bg-[#0d0000] border-t border-[#3d0000] py-10 text-center">
      <p className="font-display text-[#d4af37] text-xl mb-1">Four Years</p>
      <p className="font-script text-[#c084a0] text-sm">Happy 4th Anniversary ❤️</p>
    </footer>
  )
}
