'use client'

import { useState, useCallback, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '@/components/ui/ParticleBackground'

const HeartCanvas = lazy(() => import('@/components/3d/HeartCanvas'))

export default function HomeSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - r.left) / r.width  - 0.5) * 2,
      y: ((e.clientY - r.top)  / r.height - 0.5) * 2,
    })
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={onMouseMove}
      style={{ background: 'radial-gradient(ellipse at 30% 40%, #6b0f1a 0%, #3d0000 40%, #1a0000 70%, #0d0000 100%)' }}
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #8b0000 0%, transparent 70%)', filter: 'blur(60px)', animation: 'pulseGlow 4s ease-in-out infinite' }} />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)', filter: 'blur(80px)', animation: 'pulseGlow 4s ease-in-out infinite 1.5s' }} />

      <ParticleBackground />

      {/* 3D Heart */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Suspense fallback={null}>
          <HeartCanvas mouseX={mouse.x} mouseY={mouse.y} />
        </Suspense>
      </div>

      {/* Hero copy */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          <div className="inline-block border border-[rgba(212,175,55,0.3)] rounded-full px-5 py-1.5 mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-sans">A love story</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl font-bold mb-4 leading-tight"
          style={{ color: '#f5d580' }}
        >
          4 Years of Us{' '}
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >❤️</motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
          className="font-serif text-lg md:text-xl text-[#c9a0b4] mb-10 leading-relaxed italic"
        >
          Every moment with you is a beautiful memory
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }}
          onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
          whileTap={{ scale: 0.97 }}
          className="border border-[#d4af37] text-[#d4af37] rounded-full px-8 py-3 text-xs tracking-[0.25em] uppercase font-sans hover:bg-[rgba(212,175,55,0.1)] transition-all duration-300"
        >
          Explore Memories →
        </motion.button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0d0000, transparent)' }} />
    </section>
  )
}
