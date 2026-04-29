'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Heart, Mail } from 'lucide-react'

function LoveLetter() {
  const [revealed, setRevealed] = useState(false)

  return (
    <ScrollReveal>
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: '1px solid rgba(212,175,55,0.2)',
          background: 'linear-gradient(135deg, #2d0010 0%, #1a0005 50%, #2d0010 100%)',
        }}
      >
        {/* Corner ornaments */}
        <div className="absolute top-4 left-4  text-[#d4af37] opacity-30 text-2xl">✦</div>
        <div className="absolute top-4 right-4 text-[#d4af37] opacity-30 text-2xl">✦</div>
        <div className="absolute bottom-4 left-4  text-[#d4af37] opacity-30 text-2xl">✦</div>
        <div className="absolute bottom-4 right-4 text-[#d4af37] opacity-30 text-2xl">✦</div>

        <div className="p-10 md:p-16 text-center">
          <Heart size={24} className="text-[#d4af37] fill-[#d4af37] mx-auto mb-6 opacity-80" />

          <p className="font-script text-3xl md:text-4xl text-[#f5d580] mb-8">My Dearest Harshitha,</p>

          <div className="max-w-2xl mx-auto letter-paper rounded-xl p-2">
            <div className="font-serif text-base md:text-lg text-[#c9a0b4] leading-loose italic space-y-4">
              <p>
                Four years feels like both a lifetime and a single, breathless moment. When I look
                back at the proof of our years, it&apos;s not just the grand milestones that stand out, but
                the quiet seasons in between. The way the light catches your profile in the
                morning, the silent language we&apos;ve built across a thousand shared rooms.
              </p>

              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.8 }}
                  >
                    <p>
                      These years haven&apos;t just been about the places we&apos;ve gone, but the home we&apos;ve
                      built in each other. You are my comfort, my calm, and my greatest adventure.
                      In every laugh, every argument we&apos;ve grown through, every quiet moment — I&apos;d
                      choose you a thousand times again.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <p className="font-script text-2xl text-[#f5d580] mt-8 mb-8">Forever Yours,</p>

          <motion.button
            onClick={() => setRevealed(!revealed)}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.25)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-[#d4af37] text-[#d4af37] rounded-full px-7 py-3 text-xs tracking-[0.25em] uppercase font-sans hover:bg-[rgba(212,175,55,0.1)] transition-all duration-300"
          >
            <Mail size={14} />
            {revealed ? 'Close Letter' : 'Read Letter'}
          </motion.button>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function MessagesSection() {
  return (
    <section
      id="messages"
      className="min-h-screen py-24"
      style={{ background: 'linear-gradient(180deg, #1a0005 0%, #2d000a 50%, #1a0005 100%)' }}
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="inline-block border border-[rgba(212,175,55,0.3)] rounded-full px-5 py-1.5 mb-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-sans">For You</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4" style={{ color: '#f5d580' }}>
              Messages
            </h2>
            <p className="font-serif text-base text-[#c084a0] italic">
              Words that live between us — saved, sealed, and always yours.
            </p>
          </ScrollReveal>
        </div>

        <LoveLetter />
      </div>
    </section>
  )
}
