import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { profileData } from '../../data/profileData'

const AboutSection = () => {
  return (
    <section
      id="about-section"
      className="w-full bg-[#FFF7F2] text-[#1E2029] py-20 md:py-24 px-6 md:px-12 lg:px-20 border-l-[18px] md:border-l-[28px] border-[#0047FF] relative overflow-hidden"
    >
      {/* Subtle background decorative shapes */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#FCE2D2] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0047FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0047FF]/10 text-[#0047FF] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tentang Saya</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Mengenal Lebih Dekat{' '}
            <span className="text-[#0047FF]">
              {profileData.shortName}
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {profileData.about.headline}
          </p>
        </div>

        {/* Narrative Story / Penjelasan Tentang Pengguna */}
        <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
          {profileData.about.paragraphs.map((para, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-7 md:p-8 rounded-2xl border border-orange-100/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <p>{para}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
