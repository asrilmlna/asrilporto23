import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Download } from 'lucide-react'
import { profileData } from '../../data/profileData'
import { getAssetUrl } from '../../utils/imageHelper'

// High-performance text highlighter with zero scroll re-render overhead
const HighlightedParagraph = ({ text, highlightWords = [] }) => {
  const parts = useMemo(() => {
    if (!highlightWords.length) return [text]
    const regex = new RegExp(`(${highlightWords.join('|')})`, 'gi')
    return text.split(regex)
  }, [text, highlightWords])

  return (
    <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-800 font-normal">
      {parts.map((part, i) => {
        const isHighlight = highlightWords.some(
          (h) => h.toLowerCase() === part.toLowerCase()
        )
        return isHighlight ? (
          <span key={i} className="text-[#0047FF] font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      })}
    </p>
  )
}

const AboutSection = () => {
  const sectionRef = useRef(null)

  const paragraphHighlights = [
    ["Siswa", "SMKN 1 CIOMAS", "SMKN", "CIOMAS", "PPLG", "teknologi", "motivasi"],
    ["keterampilan", "menganalisis", "website", "Administrasi", "Mendesain"],
    ["tim", "teknis", "IT", "tantangan", "beradaptasi"]
  ]

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="w-full bg-[#FFF7F2] text-[#1E2029] pt-10 pb-14 sm:pt-14 sm:pb-18 md:py-24 px-5 md:px-12 lg:px-20 relative overflow-hidden scroll-mt-6"
    >
      {/* Background Subtle Typography Watermark */}
      <div
        className="absolute top-1/4 left-0 whitespace-nowrap pointer-events-none select-none z-0 opacity-[0.035] text-7xl sm:text-8xl md:text-9xl font-black uppercase tracking-widest text-[#0047FF] gpu-layer"
      >
        ABOUT ME • STORY • PASSION • CRAFT • JOURNEY •
      </div>

      {/* Static ambient glow shapes (No expensive scroll re-rasterization) */}
      <div
        className="absolute top-10 right-10 w-72 h-72 rounded-full pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle, #FCE2D2 0%, rgba(252,226,210,0) 70%)'
        }}
      />
      <div
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(0,71,255,0.12) 0%, rgba(0,71,255,0) 70%)'
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
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

        {/* Narrative Story with Smooth Paragraph Fade-in */}
        <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
          {profileData.about.paragraphs.map((para, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
            >
              <HighlightedParagraph
                text={para}
                highlightWords={paragraphHighlights[idx] || []}
              />
            </motion.div>
          ))}
        </div>

        {/* Download CV Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.15 }}
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
