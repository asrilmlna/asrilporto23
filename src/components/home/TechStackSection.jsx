import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Boxes } from 'lucide-react'

// SVG Icons untuk Tech Stack dengan warna otentik masing-masing tools (Langsung aktif di Mobile, hover di Desktop)
const TechIcons = {
  CSS3: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3zm15.1 4.5l-.2 2.3h-9l.2 2.3h8.6l-.6 6.3-5.1 1.4-5.1-1.4-.3-3.6h2.3l.2 1.8 2.9.8 2.9-.8.3-3.4H6.5L5.8 6.5h12.3z" />
    </svg>
  ),
  HTML5: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.6 5.6H5.4l.4 4.5h12.5l-.5 5.5-5.4 1.5-5.4-1.5-.3-3H4.4l.5 5.5 7.1 2 7.1-2 .9-10h.2z" />
    </svg>
  ),
  JS: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect width="24" height="24" rx="3.5" className="text-[#F7DF1E] md:text-gray-800 md:group-hover:text-[#F7DF1E] transition-colors duration-300" fill="currentColor" />
      <path
        d="M13.5 16.5c0 1.2.8 2 2.2 2 1.3 0 2.1-.7 2.1-1.7 0-1.2-.8-1.7-2.1-2.2l-.7-.3c-1.8-.7-3-1.6-3-3.5 0-1.9 1.5-3.3 3.7-3.3 2.1 0 3.5 1.2 3.6 3h-2.2c-.1-.8-.7-1.3-1.5-1.3-.9 0-1.4.5-1.4 1.2 0 .8.6 1.3 1.8 1.8l.7.3c2.2.9 3.3 1.8 3.3 3.8 0 2.2-1.7 3.5-4.3 3.5-2.5 0-4.1-1.3-4.3-3.5h2.1zm-6.2.2c.4.7.9 1.2 1.7 1.2.7 0 1.2-.4 1.2-1.4V9h2.3v7.4c0 2.2-1.3 3.4-3.4 3.4-1.8 0-3-1-3.6-2.4l1.8-1.1z"
        className="text-black md:text-white md:group-hover:text-black transition-colors duration-300"
        fill="currentColor"
      />
    </svg>
  ),
  Framer: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect width="24" height="24" rx="3.5" className="text-[#3178C6] md:text-gray-800 md:group-hover:text-[#3178C6] transition-colors duration-300" fill="currentColor" />
      <path
        d="M12.24 13.43h-2.73v7.35H7.13v-7.35H4.4v-2.22h7.84v2.22zm4.19 4.31c.77.4 1.64.62 2.51.62 1.42 0 2.25-.63 2.25-1.65 0-1.06-.8-1.54-2.19-2.06l-.75-.29c-2.13-.81-3.13-1.92-3.13-3.66 0-2.34 1.83-3.95 4.7-3.95 1.13 0 2.22.27 3.12.78l-.77 2.11a5.6 5.6 0 0 0-2.39-.58c-1.3 0-2.06.63-2.06 1.52 0 .97.67 1.43 2.05 1.95l.75.29c2.37.9 3.28 2.02 3.28 3.82 0 2.45-1.93 4.09-4.99 4.09-1.39 0-2.67-.36-3.65-.96l.87-2.08z"
        fill="#ffffff"
      />
    </svg>
  ),
  Nextjs: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <circle cx="12" cy="12" r="12" className="text-black md:text-gray-800 md:group-hover:text-black transition-colors duration-300" fill="currentColor" />
      <path d="M17.666 18.59L8.358 6.786h1.968l8.36 10.518-.02.286zm-.888-9.155v5.823h-1.615V8.163l.23-.217 1.385 1.489z" fill="#ffffff" />
    </svg>
  ),
  Figma: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" className="text-[#F24E1E] md:text-gray-800 md:group-hover:text-[#F24E1E] transition-colors duration-300" fill="currentColor" />
      <path d="M12 0h4a4 4 0 1 1 0 8h-4V0z" className="text-[#FF7262] md:text-gray-800 md:group-hover:text-[#FF7262] transition-colors duration-300" fill="currentColor" />
      <path d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" className="text-[#A259FF] md:text-gray-800 md:group-hover:text-[#A259FF] transition-colors duration-300" fill="currentColor" />
      <path d="M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0z" className="text-[#1ABCFE] md:text-gray-800 md:group-hover:text-[#1ABCFE] transition-colors duration-300" fill="currentColor" />
      <path d="M4 20a4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4z" className="text-[#0ACF83] md:text-gray-800 md:group-hover:text-[#0ACF83] transition-colors duration-300" fill="currentColor" />
    </svg>
  ),
  Nodejs: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2zm0 2.3L4.5 8.7v8.6L12 21.7l7.5-4.4V8.7L12 4.3z" />
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M2.6 10.6l8.8-8.8c.8-.8 2.1-.8 2.9 0l8.8 8.8c.8.8.8 2.1 0 2.9l-8.8 8.8c-.8.8-2.1.8-2.9 0l-8.8-8.8c-.8-.8-.8-2.1 0-2.9zm10.2 6.7v-2.2c-.7-.2-1.2-.6-1.5-1.2l-2.4 1.4c.1.3.1.5.1.8 0 1.2-1 2.1-2.1 2.1s-2.1-1-2.1-2.1 1-2.1 2.1-2.1c.3 0 .7.1 1 .2l2.4-1.4c-.2-.5-.3-1-.2-1.5l-2.4-1.4c-.3.2-.6.3-1 .3-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1c0 .3-.1.6-.2.9l2.4 1.4c.5-.3 1.1-.4 1.7-.2v-2.2c-.6-.3-1-1-1-1.8 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1-1 2.1-2.1 2.1c-.6 0-1.1-.3-1.5-.7v2.2c.6.3 1 1 1 1.8 0 .8-.4 1.5-1 1.8v2.2c.6.3 1 1 1 1.8 0 1.2-1 2.1-2.1 2.1s-2.1-1-2.1-2.1c0-.8.4-1.5 1-1.8z" />
    </svg>
  ),
  Vite: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M21.5 3.6L12.9 22.8c-.3.6-1.1.7-1.5.2L1.7 10.3c-.5-.6-.2-1.6.6-1.7l14-2.1 4-3.5c.6-.5 1.5-.1 1.2.6z" />
    </svg>
  ),
  PHP: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5.5 12.5H5l1.2-5h2c1.1 0 1.8.6 1.8 1.6 0 1.3-.9 2.1-2 2.1h-.9l-.6 2.3zm1.1-3.2h.5c.5 0 .9-.3.9-.8 0-.4-.3-.7-.7-.7h-.4l-.3 1.5zm5.7 3.2h-1.5l.6-2.4h-1.8l-.6 2.4H8.4l1.2-5h1.5l-.6 2.1h1.8l.6-2.1h1.5l-1.2 5zm5.2-1.9c0 1.3-.9 2.1-2 2.1h-1.5l1.2-5h2c1.1 0 1.8.6 1.8 1.6l-.1.3h-1.4l.1-.3c0-.4-.3-.7-.7-.7h-.4l-.4 1.7h.5c.5 0 .9.4.9.9zm-2-.6h.5c.5 0 .8-.3.8-.7 0-.3-.3-.6-.7-.6h-.3l-.3 1.3z" />
    </svg>
  ),
  MySQL: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.97 0 8 1.49 8 2s-3.03 2-8 2-8-1.49-8-2 3.03-2 8-2zm-8 4.73c1.47.78 4.38 1.27 8 1.27s6.53-.49 8-1.27V10c0 .51-3.03 2-8 2s-8-1.49-8-2V8.73zM4 14.73C5.47 15.51 8.38 16 12 16s6.53-.49 8-1.27V16c0 .51-3.03 2-8 2s-8-1.49-8-2v-1.27z" />
    </svg>
  ),
  Laravel: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M21.2 6.8L12.7 2 4.2 6.8v9.6l8.5 4.8 8.5-4.8V6.8zm-8.5-3.3l6.5 3.7-6.5 3.7-6.5-3.7 6.5-3.7zM5.7 8l6.1 3.5v7.2L5.7 15.2V8zm7.9 10.7V11.5l6.1-3.5v7.2l-6.1 3.5z" />
    </svg>
  )
}

// Staggered Tech Rows: Khusus 9 Keahlian Utama (Html, CSS, Java Script, Php, MySQL, React, Figma, Laravel, TailwindCss)
const row1 = [
  {
    name: 'Html',
    category: 'Markup',
    icon: TechIcons.HTML5,
    brandColor: '#E34F26',
    brandBg: 'rgba(227, 79, 38, 0.14)'
  },
  {
    name: 'CSS',
    category: 'Styling',
    icon: TechIcons.CSS3,
    brandColor: '#1572B6',
    brandBg: 'rgba(21, 114, 182, 0.14)'
  },
  {
    name: 'Java Script',
    category: 'Language',
    icon: TechIcons.JS,
    brandColor: '#EAB308',
    textHoverColor: '#CA8A04',
    brandBg: 'rgba(234, 179, 8, 0.18)'
  },
  {
    name: 'TailwindCss',
    category: 'Styling',
    icon: TechIcons.Tailwind,
    brandColor: '#06B6D4',
    brandBg: 'rgba(6, 182, 212, 0.14)'
  },
  {
    name: 'React',
    category: 'Library',
    icon: TechIcons.React,
    brandColor: '#00D8FF',
    textHoverColor: '#0891B2',
    brandBg: 'rgba(0, 216, 255, 0.14)'
  }
]

const row2 = [
  {
    name: 'Php',
    category: 'Backend',
    icon: TechIcons.PHP,
    brandColor: '#777BB4',
    brandBg: 'rgba(119, 123, 180, 0.16)'
  },
  {
    name: 'MySQL',
    category: 'Database',
    icon: TechIcons.MySQL,
    brandColor: '#4479A1',
    brandBg: 'rgba(68, 121, 161, 0.14)'
  },
  {
    name: 'Laravel',
    category: 'Framework',
    icon: TechIcons.Laravel,
    brandColor: '#FF2D20',
    brandBg: 'rgba(255, 45, 32, 0.14)'
  },
  {
    name: 'Figma',
    category: 'UI/UX Design',
    icon: TechIcons.Figma,
    brandColor: '#F24E1E',
    brandBg: 'rgba(242, 78, 30, 0.14)'
  }
]

// Glassmorphic Tech Card Component dengan warna brand otentik (Row 1 & Row 2)
// Di Mobile: Warna brand langsung aktif bersinar secara visual
// Di Desktop: Default netral, berubah ke warna brand saat kursor diarahkan (hover)
const TechCard = ({ item }) => {
  const IconComponent = item.icon
  const brandColor = item.brandColor
  const brandBg = item.brandBg || `${brandColor}18`
  const textColor = item.textHoverColor || brandColor

  return (
    <div
      className="flex items-center gap-3.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] md:hover:shadow-[0_14px_35px_var(--brand-shadow)] transition-all duration-300 md:hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0 group"
      style={{
        '--brand-color': brandColor,
        '--brand-bg': brandBg,
        '--brand-shadow': `${brandColor}40`,
        '--brand-text': textColor
      }}
      title={item.name}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 md:group-hover:scale-110 bg-[var(--brand-bg)] md:bg-orange-50/80 md:group-hover:bg-[var(--brand-bg)]"
      >
        <span className="flex items-center justify-center transition-colors duration-300 text-[var(--brand-color)] md:text-gray-800 md:group-hover:text-[var(--brand-color)]">
          <IconComponent />
        </span>
      </div>
      <div className="flex flex-col text-left">
        <span
          className="text-sm font-bold tracking-tight transition-colors duration-300 whitespace-nowrap text-[var(--brand-text)] md:text-gray-900 md:group-hover:text-[var(--brand-text)]"
        >
          {item.name}
        </span>
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
          {item.category}
        </span>
      </div>
    </div>
  )
}

const TechStackSection = () => {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.25, 0.85])

  return (
    <section
      ref={sectionRef}
      id="tech-stack-section"
      className="w-full bg-[#FFFBF7] py-16 md:py-24 relative overflow-hidden group select-none"
    >
      {/* Background Soft Glow with Parallax Breathing */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFFBF7] via-[#FCE7F3]/40 to-[#F3E8FF]/30 pointer-events-none" />
      <motion.div
        style={{ scale: glowScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-40 bg-gradient-to-r from-pink-300/20 via-purple-300/25 to-blue-300/20 blur-3xl pointer-events-none"
      />

      {/* Section Header */}
      <div className="text-center space-y-2 mb-8 md:mb-12 z-20 relative px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0047FF]/10 text-[#0047FF] text-xs font-bold tracking-wider uppercase">
          <Boxes className="w-3.5 h-3.5" />
          <span>Keahlian & Toolkit</span>
        </div>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          Teknologi & <span className="text-[#0047FF]">Tools Andalan</span>
        </h2>
      </div>

      {/* 3D Perspective Marquee Container */}
      <div className="relative w-full overflow-hidden py-8 md:py-12 [perspective:1200px]">
        {/* Tilted Isometric Plane in 3D Space */}
        <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 [transform-style:preserve-3d] [transform:rotateX(16deg)_rotateZ(-4deg)_skewX(4deg)] origin-center">
          {/* Row 1: Leftward Scrolling Track */}
          <div className="flex overflow-hidden w-full select-none">
            <motion.div
              className="flex items-center gap-5 sm:gap-6 flex-nowrap will-change-transform"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 26,
                repeat: Infinity
              }}
            >
              {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
                <TechCard key={`row1-${idx}`} item={item} />
              ))}
            </motion.div>
          </div>

          {/* Row 2: Rightward Scrolling Track (Counter-Directional) */}
          <div className="flex overflow-hidden w-full select-none">
            <motion.div
              className="flex items-center gap-5 sm:gap-6 flex-nowrap will-change-transform"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                ease: "linear",
                duration: 30,
                repeat: Infinity
              }}
            >
              {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
                <TechCard key={`row2-${idx}`} item={item} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Soft Edge Gradient Masks for Seamless 3D Depth */}
        <div className="absolute inset-y-0 left-0 w-20 sm:w-32 md:w-52 bg-gradient-to-r from-[#FFFBF7] via-[#FFFBF7]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 md:w-52 bg-gradient-to-l from-[#FFFBF7] via-[#FFFBF7]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-12 md:h-16 bg-gradient-to-b from-[#FFFBF7] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-12 md:h-16 bg-gradient-to-t from-[#FFFBF7] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}

export default TechStackSection
