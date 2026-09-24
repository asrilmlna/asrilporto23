import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { profileData } from '../../data/profileData'

// Individual Word component that reveals dynamically based on scroll progression
const RevealWord = ({ children, progress, range, isHighlight }) => {
  const opacity = useTransform(progress, range, [0.18, 1])
  const y = useTransform(progress, range, [3, 0])

  return (
    <span className="relative inline-block mr-[0.28em] my-[0.05em]">
      {/* Ghost text for layout stability (zero jump or shift) */}
      <span className="opacity-20 text-gray-400 select-none pointer-events-none">
        {children}
      </span>
      {/* Foreground illuminated word */}
      <motion.span
        style={{ opacity, y }}
        className={`absolute inset-0 select-text ${
          isHighlight ? "text-[#0047FF] font-semibold" : "text-gray-900"
        }`}
      >
        {children}
      </motion.span>
    </span>
  )
}

// Container that tracks scroll progress and maps each word sequentially
const ScrollWordReveal = ({
  text,
  className = "",
  highlightWords = [],
  offset = ["start 0.88", "start 0.38"]
}) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset
  })

  const words = text.split(" ")

  return (
    <div ref={containerRef} className={`flex flex-wrap leading-relaxed ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = Math.min(1, start + (1.2 / words.length))
        const isHighlight = highlightWords.some((h) =>
          word.toLowerCase().includes(h.toLowerCase())
        )

        return (
          <RevealWord
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            isHighlight={isHighlight}
          >
            {word}
          </RevealWord>
        )
      })}
    </div>
  )
}

const AboutSection = () => {
  const sectionRef = useRef(null)

  // Track overall scroll position through the section for background parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Parallax transforms for background decorative layers
  const blob1Y = useTransform(scrollYProgress, [0, 1], [-80, 90])
  const blob2Y = useTransform(scrollYProgress, [0, 1], [90, -80])
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["-12%", "15%"])
  const headerY = useTransform(scrollYProgress, [0, 0.5], [30, 0])

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="w-full bg-[#FFF7F2] text-[#1E2029] py-20 md:py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Background Parallax Typography Watermark */}
      <motion.div
        style={{ x: watermarkX }}
        className="absolute top-1/4 left-0 whitespace-nowrap pointer-events-none select-none z-0 opacity-[0.04] text-8xl md:text-9xl font-black uppercase tracking-widest text-[#0047FF]"
      >
        ABOUT ME • STORY • PASSION • CRAFT • JOURNEY •
      </motion.div>

      {/* Parallax ambient glow shapes */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute top-10 right-10 w-80 h-80 bg-[#FCE2D2] rounded-full blur-3xl opacity-70 pointer-events-none"
      />
      <motion.div
        style={{ y: blob2Y }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-[#0047FF]/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header with Parallax Entrance */}
        <motion.div
          style={{ y: headerY }}
          className="text-center space-y-3 mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0047FF]/10 text-[#0047FF] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tentang Saya</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Mengenal Lebih Dekat{' '}
            <span className="text-[#0047FF] font-bold">
              {profileData.shortName}
            </span>
          </h2>

          {/* Scroll Word Reveal Headline */}
          <div className="pt-2 max-w-2xl mx-auto">
            <ScrollWordReveal
              text={profileData.about.headline}
              className="text-lg sm:text-xl md:text-2xl font-medium justify-center text-center text-gray-700"
              highlightWords={["visual", "estetik", "solutif"]}
              offset={["start 0.90", "start 0.50"]}
            />
          </div>
        </motion.div>

        {/* Narrative Story Cards with Scroll Word Reveal */}
        <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
          {profileData.about.paragraphs.map((para, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white p-7 md:p-8 rounded-2xl border border-orange-100/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0047FF]/10 group-hover:bg-[#0047FF] transition-colors" />
              <ScrollWordReveal
                text={para}
                className="text-base md:text-lg leading-relaxed"
                highlightWords={
                  idx === 0
                    ? ["mahasiswa", "kreatif", "identitas", "berkesan"]
                    : ["antarmuka", "responsif", "berkembang", "tantangan"]
                }
                offset={["start 0.88", "start 0.38"]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
