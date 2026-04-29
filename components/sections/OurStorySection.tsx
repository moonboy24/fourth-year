'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { MapPin, Coffee, Home, Star } from 'lucide-react'

const milestones = [
  {
    id: 1,
    date: 'Febraury 2023',
    title: 'Our First Conversation',
    description:
      'A quiet night and a conversation that seemed to never want to end. Neither of us knew that night would change everything forever.',
    icon: Coffee,
    side: 'left',
    accentColor: '#d4af37',
    imageEmoji: '🎈',
  },
  {
    id: 2,
    date: 'Febraury 2023',
    title: 'That School Afternoon',
    description:
      'That School afternoon , looking for each other in that noisy road. Looking behind if you are Gazing me',
    icon: Star,
    side: 'right',
    accentColor: '#c1002a',
    imageEmoji: '🌙',
  },
  {
    id: 3,
    date: 'April 2023',
    title: 'Confession',
    description:
      'Walking through T.Nagar, hands almost touching, hearts absolutely racing. The awkward silences that somehow felt perfect, and the laughter that made it all effortless.',
    icon: Home,
    side: 'left',
    accentColor: '#d4af37',
    imageEmoji: '🏠',
  },
  {
    id: 4,
    date: 'Now',
    title: 'Four Beautiful Years',
    description:
      "Looking back, it's not just the grand moments that made us — it's the inside jokes, the fights and the quiet evenings. Four years of choosing each other, every single day.",
    icon: MapPin,
    side: 'right',
    accentColor: '#f5d580',
    imageEmoji: '💫',
  },
]

function TimelineDot({ color }: { color: string }) {
  return (
    <div className="relative flex-shrink-0">
      <div className="w-4 h-4 rounded-full border-2 border-[#d4af37] bg-[#3d0000]" />
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{ background: color, animationDuration: '3s' }}
      />
    </div>
  )
}

function TimelineCard({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const isLeft = milestone.side === 'left'
  const Icon = milestone.icon

  // The bottom half of this section sits on a cream (#f8f0e3) background,
  // so we use dark, high-contrast colors for all text in the card.
  const descriptionColor = '#4a1a28'   // deep wine — clearly readable on cream
  const chapterColor     = '#7b2d3e'   // muted wine — readable secondary text
  const dateBg           = milestone.accentColor === '#d4af37'
    ? 'rgba(180,130,10,0.15)'          // slightly darker gold tint on cream
    : 'rgba(193,0,42,0.12)'

  return (
    <div className="relative flex items-center gap-0 md:gap-8">

      {/* Visual / image side */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:order-last md:pl-12'}`}>
        <ScrollReveal direction={isLeft ? 'left' : 'right'} delay={index * 0.1}>
          <div
            className="w-full aspect-video rounded-2xl flex items-center justify-center mb-4 md:mb-0 overflow-hidden card-glow transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, #2d0a14 0%, #1a0000 50%, #0d0000 100%)',
              border: '1px solid rgba(212,175,55,0.15)',
            }}
          >
            <div className="text-center">
              <div className="text-6xl mb-3">{milestone.imageEmoji}</div>
              <div className="text-[10px] tracking-widest uppercase text-[#a06070] font-sans">
                {milestone.date}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Center dot — desktop only */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <TimelineDot color={milestone.accentColor} />
      </div>

      {/* Text side */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:order-last md:pl-12' : 'md:pr-12'}`}>
        <ScrollReveal direction={isLeft ? 'right' : 'left'} delay={index * 0.1 + 0.15}>

          {/* Date pill */}
          <div className="inline-block mb-3">
            <span
              className="text-[10px] tracking-[0.25em] uppercase font-sans px-3 py-1 rounded-full"
              style={{
                background: dateBg,
                color: milestone.accentColor === '#f5d580' ? '#b8860b' : milestone.accentColor,
                border: `1px solid ${milestone.accentColor}50`,
              }}
            >
              {milestone.date}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-display text-2xl md:text-3xl font-bold mb-3"
            style={{
              color: milestone.accentColor === '#f5d580' ? '#b8860b' : milestone.accentColor,
            }}
          >
            {milestone.title}
          </h3>

          {/* Description — dark on cream, fully readable */}
          <p className="font-serif text-base leading-relaxed italic" style={{ color: descriptionColor }}>
            {milestone.description}
          </p>

          {/* Chapter label */}
          <div className="mt-4 flex items-center gap-2">
            <Icon size={14} style={{ color: chapterColor }} />
            <span className="text-xs font-sans tracking-wider" style={{ color: chapterColor }}>
              Chapter {index + 1}
            </span>
          </div>

        </ScrollReveal>
      </div>
    </div>
  )
}

export default function OurStorySection() {
  return (
    <section
      id="our-story"
      style={{ background: 'linear-gradient(180deg, #0d0000 0%, #1a0005 30%, #f8f0e3 60%, #f8f0e3 100%)' }}
    >
      <div className="pt-24 pb-24">

        {/* Section header */}
        <div className="text-center mb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block border border-[rgba(212,175,55,0.3)] rounded-full px-5 py-1.5 mb-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-sans">
                Our Journey
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold mb-4"
            style={{ color: '#c1002a' }}
          >
            Our Story
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-serif text-lg max-w-xl mx-auto italic"
            style={{ color: '#8b4560' }}
          >
            Two lives, one extraordinary journey, and the moments that shaped who we are. Every chapter
            written together, every memory treasured forever.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto px-6 relative">
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px timeline-line transform -translate-x-1/2" />

          <div className="flex flex-col gap-20 md:gap-24">
            {milestones.map((milestone, index) => (
              <TimelineCard key={milestone.id} milestone={milestone} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
