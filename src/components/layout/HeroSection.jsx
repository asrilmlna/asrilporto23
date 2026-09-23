import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      
      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top bar with name and availability */}
        <div className="flex justify-between items-center px-6 md:px-8 py-4 md:py-6 border-b border-gray-800">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold tracking-wider">ASRIL_MAULANA</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm text-green-400 font-mono">AVAILABLE_FOR_FREELANCE</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 md:gap-8">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors font-mono text-xs md:text-sm">HOME</Link>
            <Link to="/projects" className="text-white hover:text-gray-300 transition-colors font-mono text-xs md:text-sm">PROJECTS</Link>
            <Link to="/about" className="text-white hover:text-gray-300 transition-colors font-mono text-xs md:text-sm">ABOUT</Link>
            <Link to="/contact" className="text-white hover:text-gray-300 transition-colors font-mono text-xs md:text-sm">LETS_LINK</Link>
          </nav>
        </div>

        {/* Main hero content */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-8 py-8 md:py-12">
          <div className="max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
              {/* Left content */}
              <div className="lg:col-span-8 space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight">
                    Design driven.
                    <br />
                    Logic backed.
                    <br />
                    User{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100">
                      FOCUSED.
                    </span>
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-3 md:gap-4"
                >
                  <Link
                    to="/contact"
                    className="px-6 md:px-8 py-3 md:py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105 text-center font-mono text-sm"
                  >
                    INITIATE_COLLAB
                  </Link>
                  <Link
                    to="/projects"
                    className="px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all transform hover:scale-105 text-center font-mono text-sm"
                  >
                    VIEW_PROJECTS
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-gray-400 text-base md:text-lg max-w-2xl font-mono"
                >
                  Specializing in UI, and CREATIVE_MOTION. Pushing limits of motion while respecting user focus.
                </motion.p>
              </div>

              {/* Right side - DOCK text */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end items-center">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-gray-600 text-xl md:text-2xl lg:text-3xl font-bold tracking-wider"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed'
                  }}
                >
                  DOCK
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 right-4 z-20">
        <button className="p-2 text-white">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default HeroSection
