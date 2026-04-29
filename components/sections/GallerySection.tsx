'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Heart, Quote, Tag } from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────────────────────
const MEMORIES = [
  {
    iid: 1,
    date: 'April 30',
    title: 'The day we went to T.Nagar',
    type: 'photo',
    emoji: '🏯',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #3d1500 100%)',
    tags: ['Travel', 'Confessed'],
  },
  {
    id: 2,
    type: 'quote',
    quote: '"I knew from the moment you take care for Me."',
    author: '— Year One',
  },
  {
    id: 3, date: 'Chetta Shop', title: 'Our ritual',
    type: 'photo' as const, emoji: '☕',
    gradient: 'linear-gradient(135deg, #2d1a0a 0%, #1a0a00 100%)',
    tags: ['Everyday'],
  },
  {
    id: 4, date: 'May 2023', title: 'First Movie Together',
    type: 'photo' as const, emoji: '🌅',
    gradient: 'linear-gradient(135deg, #1a0a1a 0%, #2d0014 100%)',
    tags: ['Outing'],
  },
  {
    id: 5, type: 'quote' as const,
    quote: '"Home is wherever you are."',
    author: '— Year Three',
  },
  {
    id: 6, date: 'july 2023', title: 'Your Birthday with Me',
    type: 'photo' as const, emoji: '🎄',
    gradient: 'linear-gradient(135deg, #0a1a0a 0%, #002d00 100%)',
    tags: ['You', 'Home'],
  },
]

const FILTER_TAGS = ['All', 'Travel', 'Everyday', 'You', 'Outing']

// ── Memory card ───────────────────────────────────────────────────────────────
function QuoteCard({ memory }: { memory: typeof MEMORIES[1] }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-between h-full min-h-52"
      style={{ background: 'linear-gradient(135deg, #5c0a14 0%, #3d0000 100%)', border: '1px solid rgba(212,175,55,0.15)' }}
    >
      <Quote size={24} className="text-[#d4af37] mb-4 opacity-60" />
      <p className="font-serif text-xl italic text-[#f5d580] leading-relaxed flex-1">{memory.quote}</p>
      <p className="text-xs text-[#c084a0] mt-4 font-sans tracking-wider">{memory.author}</p>
    </div>
  )
}

function PhotoCard({ memory }: { memory: Extract<typeof MEMORIES[0], { type: 'photo' }> }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      className="rounded-2xl overflow-hidden cursor-pointer card-glow transition-all duration-500"
      style={{ border: '1px solid rgba(212,175,55,0.1)' }}
    >
      <div className="aspect-video flex items-center justify-center relative" style={{ background: memory.gradient }}>
        <div className="text-5xl">{memory.emoji}</div>
        {memory.date && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] tracking-wider uppercase font-sans bg-black/40 text-[#d4af37] px-3 py-1 rounded-full backdrop-blur-sm">
              {memory.date}
            </span>
          </div>
        )}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <Heart size={32} className="text-[#d4af37] fill-[#d4af37]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-4" style={{ background: '#1a0005' }}>
        <h3 className="font-display text-base text-[#f5d580] mb-2">{memory.title}</h3>
        {memory.tags && (
          <div className="flex gap-2 flex-wrap">
            {memory.tags.map((t) => (
              <span key={t} className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-sans"
                style={{ background: 'rgba(212,175,55,0.1)', color: '#d4af37' }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function MemoryCard({ memory, index }: { memory: typeof MEMORIES[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.08}>
      {memory.type === 'quote'
        ? <QuoteCard memory={memory as any} />
        : <PhotoCard memory={memory as any} />
      }
    </ScrollReveal>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function GallerySection() {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = MEMORIES.filter((m) => {
    if (activeTag === 'All') return true
    if (m.type === 'quote') return true
    return (m as any).tags?.includes(activeTag)
  })

  return (
    <section
      id="gallery"
      className="min-h-screen py-24"
      style={{ background: 'linear-gradient(180deg, #1a0005 0%, #2d000a 50%, #1a0005 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="inline-block border border-[rgba(212,175,55,0.3)] rounded-full px-5 py-1.5 mb-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-sans">Collected</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 leading-tight" style={{ color: '#f5d580' }}>
              Whispers &amp; Memories
            </h2>
            <p className="font-serif text-base text-[#c084a0] italic">
              A collection of our quiet moments, loud laughs, and the words we&apos;ve shared along the way.
            </p>
          </ScrollReveal>
        </div>

        {/* Filter tags */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-3 items-center mb-10">
            <span className="text-xs text-[#7a3040] font-sans tracking-wider flex items-center gap-1">
              <Tag size={12} /> Fragments of Us
            </span>
            {FILTER_TAGS.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setActiveTag(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="text-xs px-3 py-1 rounded-full font-sans transition-all duration-200"
                style={{
                  border: `1px solid ${activeTag === tag ? '#d4af37' : 'rgba(212,175,55,0.2)'}`,
                  color: activeTag === tag ? '#d4af37' : '#c084a0',
                  background: activeTag === tag ? 'rgba(212,175,55,0.1)' : 'transparent',
                }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Row 1: wide + quote */}
          <div className="md:col-span-2">
            <MemoryCard memory={filtered[0] ?? MEMORIES[0]} index={0} />
          </div>
          <div>
            <MemoryCard memory={filtered[1] ?? MEMORIES[1]} index={1} />
          </div>
          {/* Row 2: single + two */}
          {filtered.slice(2).map((m, i) => (
            <MemoryCard key={m.id} memory={m} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
