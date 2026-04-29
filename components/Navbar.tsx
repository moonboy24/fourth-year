'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Camera } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'Gallery',   href: '#gallery'   },
  { label: 'Messages',  href: '#messages'  },
]

function scrollTo(id: string) {
  document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [active, setActive] = useState('home')

  // Highlight nav link based on scroll position
  useEffect(() => {
    const sections = ['home', 'our-story', 'gallery', 'messages']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 nav-glass bg-[rgba(20,0,0,0.75)] border-b border-[rgba(212,175,55,0.1)]"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="font-display text-[#d4af37] text-lg tracking-widest hover:text-[#f5d580] transition-colors"
        >
          Four Years
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative text-[10px] tracking-[0.2em] uppercase font-sans transition-colors ${
                  isActive ? 'text-[#d4af37]' : 'text-[#c084a0] hover:text-[#d4af37]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#d4af37]"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Heart
            size={16}
            className="text-[#c084a0] hover:text-[#d4af37] cursor-pointer transition-colors fill-[#c084a0] hover:fill-[#d4af37]"
          />
          <Camera size={16} className="text-[#c084a0] hover:text-[#d4af37] cursor-pointer transition-colors" />
        </div>
      </div>
    </motion.nav>
  )
}
