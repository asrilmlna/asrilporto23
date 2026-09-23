import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Calendar, Maximize2, X, CheckCircle2 } from 'lucide-react'
import { profileData } from '../../data/profileData'

const CertificatesSection = () => {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section
      id="certificates-section"
      className="w-full bg-[#FFF7F2] text-[#1E2029] py-20 md:py-24 px-6 md:px-12 lg:px-20 border-l-[18px] md:border-l-[28px] border-[#0047FF] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0047FF]/10 text-[#0047FF] text-xs font-bold tracking-wider uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Sertifikasi & Kredensial</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Sertifikat & <span className="text-[#0047FF]">Pencapaian</span>
          </h2>

          <p className="text-gray-600 text-sm md:text-base max-w-xl">
            Daftar sertifikasi resmi dan kredensial profesional yang telah diraih untuk memvalidasi keterampilan teknologi dan desain.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profileData.certificates.map((cert, idx) => (
            <motion.div
              key={cert.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden border border-orange-100/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Certificate Image Frame */}
              <div
                className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative cursor-pointer"
                onClick={() => setSelectedCert(cert)}
                title="Klik untuk melihat sertifikat"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/images/gallery-1.jpg"
                  }}
                />

                {/* Issuer Badge */}
                <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  <span>{cert.issuer}</span>
                </div>

                {/* Zoom overlay */}
                <div className="absolute inset-0 bg-[#0047FF]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 bg-white rounded-full text-[#0047FF] shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 font-mono">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span>Tahun {cert.issueDate}</span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#0047FF] transition-colors leading-snug line-clamp-2">
                    {cert.title}
                  </h3>
                </div>

                {/* Skills tags */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap gap-1">
                    {cert.skills?.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-gray-50 border border-gray-100 text-gray-600 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="w-full py-2 bg-blue-50 hover:bg-[#0047FF] text-[#0047FF] hover:text-white text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Lihat Sertifikat</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Tampilan Sertifikat Penuh Langsung di Halaman Ini) */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[60vh] bg-black flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-bold text-[#0047FF] bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {selectedCert.issuer}
                  </span>
                  <span className="font-mono">ID: {selectedCert.credentialId}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{selectedCert.title}</h3>
                <p className="text-xs text-gray-500">Diterbitkan: {selectedCert.issueDate}</p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedCert.skills?.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CertificatesSection
