import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderGit2, ExternalLink, Github, Maximize2, X } from 'lucide-react'
import { profileData } from '../../data/profileData'

const ProjectsSection = () => {
  const [activeImage, setActiveImage] = useState(null)

  return (
    <section
      id="projects-section"
      className="w-full bg-[#FCECE1] text-[#1E2029] py-20 md:py-24 px-6 md:px-12 lg:px-20 border-l-[18px] md:border-l-[28px] border-[#0047FF] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0047FF]/10 text-[#0047FF] text-xs font-bold tracking-wider uppercase">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Karya & Portofolio</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Proyek <span className="text-[#0047FF]">Terpilih</span>
          </h2>

          <p className="text-gray-600 text-sm md:text-base max-w-xl">
            Koleksi aplikasi web, antarmuka interaktif, dan proyek digital yang telah saya bangun dengan fokus pada fungsionalitas dan estetika.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profileData.projects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden border border-orange-100/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Project Image */}
              <div
                className="aspect-video w-full overflow-hidden bg-gray-100 relative cursor-pointer"
                onClick={() => setActiveImage(project)}
                title="Klik untuk memperbesar gambar"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/images/gallery-1.jpg"
                  }}
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-[#0047FF] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  {project.category}
                </div>

                {/* Zoom overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 bg-white rounded-full text-[#0047FF] shadow-lg transform group-hover:scale-110 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 md:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0047FF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-1 bg-blue-50 text-[#0047FF] rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0037CC] px-4 py-2 rounded-lg transition-colors"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="max-h-[65vh] bg-black flex items-center justify-center">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>
              <div className="p-6 space-y-1">
                <div className="text-xs text-[#0047FF] font-bold uppercase">{activeImage.category}</div>
                <h3 className="text-lg font-bold text-gray-900">{activeImage.title}</h3>
                <p className="text-sm text-gray-600">{activeImage.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProjectsSection
