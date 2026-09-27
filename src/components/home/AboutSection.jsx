import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Download } from 'lucide-react'
import { profileData } from '../../data/profileData'
import { getAssetUrl } from '../../utils/imageHelper'

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
      className="w-full bg-[#FFF7F2] text-[#1E2029] pt-10 pb-14 sm:pt-14 sm:pb-18 md:py-24 px-5 md:px-12 lg:px-20 relative overflow-hidden scroll-mt-6"
    >
      {/* Background Parallax Typography Watermark */}
      <motion.div
        style={{ x: watermarkX }}
        className="absolute top-1/4 left-0 whitespace-nowrap pointer-events-none select-none z-0 opacity-[0.04] text-7xl sm:text-8xl md:text-9xl font-black uppercase tracking-widest text-[#0047FF]"
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
          className="text-center space-y-2 md:space-y-3 mb-6 md:mb-14"
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
        </motion.div>

        {/* Narrative Story with Scroll Word Reveal - Text Only (No Border / Box) */}
        <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
          {profileData.about.paragraphs.map((para, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              <ScrollWordReveal
                text={para}
                className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-800 font-normal"
                highlightWords={
                  idx === 0
                    ? ["Siswa", "SMKN", "CIOMAS", "PPLG", "teknologi", "motivasi"]
                    : idx === 1
                    ? ["keterampilan", "menganalisis", "website", "Administrasi", "Mendesain"]
                    : ["tim", "teknis", "IT", "tantangan", "beradaptasi"]
                }
                offset={["start 0.88", "start 0.38"]}
              />
            </motion.div>
          ))}
        </div>

        {/* Download CV Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-12 flex justify-center"
        >
          <a
            href={
              profileData.cvUrl?.startsWith('http')
                ? profileData.cvUrl
                : getAssetUrl(profileData.cvUrl || '/files/CV_Asril_Maulana.pdf')
            }
            download={!profileData.cvUrl?.startsWith('http') ? 'CV_Asril_Maulana.pdf' : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0047FF] hover:bg-[#003ad1] text-white font-medium text-sm sm:text-base tracking-wide shadow-md shadow-[#0047FF]/20 hover:shadow-lg hover:shadow-[#0047FF]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span>Unduh CV</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
