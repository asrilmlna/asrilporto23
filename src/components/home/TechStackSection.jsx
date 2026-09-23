import { motion } from 'framer-motion'

// SVG Icons untuk Tech Stack yang presisi
const TechIcons = {
  // CSS3
  CSS3: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-14 md:h-14" fill="currentColor">
      <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3zm15.1 4.5l-.2 2.3h-9l.2 2.3h8.6l-.6 6.3-5.1 1.4-5.1-1.4-.3-3.6h2.3l.2 1.8 2.9.8 2.9-.8.3-3.4H6.5L5.8 6.5h12.3z" />
    </svg>
  ),
  // JavaScript
  JS: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-14 md:h-14" fill="currentColor">
      <path d="M3 3h18v18H3V3zm10.5 13.5c0 1.2.8 2 2.2 2 1.3 0 2.1-.7 2.1-1.7 0-1.2-.8-1.7-2.1-2.2l-.7-.3c-1.8-.7-3-1.6-3-3.5 0-1.9 1.5-3.3 3.7-3.3 2.1 0 3.5 1.2 3.6 3h-2.2c-.1-.8-.7-1.3-1.5-1.3-.9 0-1.4.5-1.4 1.2 0 .8.6 1.3 1.8 1.8l.7.3c2.2.9 3.3 1.8 3.3 3.8 0 2.2-1.7 3.5-4.3 3.5-2.5 0-4.1-1.3-4.3-3.5h2.1zm-6.2.2c.4.7.9 1.2 1.7 1.2.7 0 1.2-.4 1.2-1.4V9h2.3v7.4c0 2.2-1.3 3.4-3.4 3.4-1.8 0-3-1-3.6-2.4l1.8-1.1z" />
    </svg>
  ),
  // Framer
  Framer: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-14 md:h-14" fill="currentColor">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  ),
  // React
  React: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-14 md:h-14" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  ),
  // Tailwind CSS
  Tailwind: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-14 md:h-14" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  // TypeScript
  TypeScript: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-14 md:h-14" fill="currentColor">
      <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.74 13.43h-2.73v7.35H7.13v-7.35H4.4v-2.22h7.84v2.22zm4.19 4.31c.77.4 1.64.62 2.51.62 1.42 0 2.25-.63 2.25-1.65 0-1.06-.8-1.54-2.19-2.06l-.75-.29c-2.13-.81-3.13-1.92-3.13-3.66 0-2.34 1.83-3.95 4.7-3.95 1.13 0 2.22.27 3.12.78l-.77 2.11a5.6 5.6 0 0 0-2.39-.58c-1.3 0-2.06.63-2.06 1.52 0 .97.67 1.43 2.05 1.95l.75.29c2.37.9 3.28 2.02 3.28 3.82 0 2.45-1.93 4.09-4.99 4.09-1.39 0-2.67-.36-3.65-.96l.87-2.08z" />
    </svg>
  ),
  // Next.js
  Nextjs: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-14 md:h-14" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 18.59L8.358 6.786h1.968l8.36 10.518-.02.286zm-.888-9.155v5.823h-1.615V8.163l.23-.217 1.385 1.489z" />
    </svg>
  ),
  // Figma
  Figma: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-14 md:h-14" fill="currentColor">
      <path d="M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm-8 8a4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4zm0-8a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zm0-8a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zm8-4h4a4 4 0 1 1 0 8h-4V0z" />
    </svg>
  )
}

const techList = [
  { name: 'CSS3', icon: TechIcons.CSS3 },
  { name: 'JavaScript', icon: TechIcons.JS },
  { name: 'Framer', icon: TechIcons.Framer },
  { name: 'React', icon: TechIcons.React },
  { name: 'Tailwind CSS', icon: TechIcons.Tailwind },
  { name: 'TypeScript', icon: TechIcons.TypeScript },
  { name: 'Next.js', icon: TechIcons.Nextjs },
  { name: 'Figma', icon: TechIcons.Figma }
]

const TechStackSection = () => {
  return (
    <section
      id="tech-stack-section"
      className="w-full bg-[#FFFBF7] py-10 md:py-14 border-l-[18px] md:border-l-[28px] border-[#0047FF] relative overflow-hidden group"
    >
      {/* Background Soft Glow matching user image: white to soft pastel pink/lavender to white */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFFBF7] via-[#FCE7F3]/50 to-[#F3E8FF]/40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-28 bg-gradient-to-r from-pink-300/20 via-purple-300/30 to-blue-300/20 blur-3xl pointer-events-none" />

      {/* Left & Right gradient fades for smooth marquee entrance & exit */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-[#FFFBF7] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-[#FFFBF7] to-transparent z-10 pointer-events-none" />

      {/* Pure Marquee Row without borders or boxes */}
      <div className="relative w-full overflow-hidden flex items-center">
        <motion.div
          className="flex items-center gap-14 sm:gap-20 md:gap-24 whitespace-nowrap will-change-transform"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 20,
            repeat: Infinity
          }}
        >
          {/* Double items for an uninterrupted seamless infinite loop */}
          {[...techList, ...techList].map((item, index) => {
            const IconComponent = item.icon
            return (
              <div
                key={`${item.name}-${index}`}
                className="flex flex-col items-center gap-2.5 text-gray-700 hover:text-[#0047FF] transition-all duration-300 hover:scale-110 cursor-pointer flex-shrink-0"
                title={item.name}
              >
                <div className="transition-transform duration-300">
                  <IconComponent />
                </div>
                <span className="text-xs font-semibold tracking-wider text-gray-600 hover:text-[#0047FF] transition-colors">
                  {item.name}
                </span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default TechStackSection
