import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'

const navItems = [
  { name: 'Home', targetId: 'hero' },
  { name: 'About', targetId: 'about-section' },
  { name: 'Projects', targetId: 'projects-section' },
  { name: 'Certificates', targetId: 'certificates-section' },
  { name: 'Contact', targetId: 'contact-section' }
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [hoveredNav, setHoveredNav] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  // Ensure clean default theme
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  // Smooth scroll to a target section on the same page
  const scrollToTarget = (targetId) => {
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection('hero')
      return
    }

    const element = document.getElementById(targetId)
    if (element) {
      const yOffset = -75 // Offset so the floating pill doesn't obscure the section heading
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveSection(targetId)
    }
  }

  // Handle nav clicks - strictly stays on the same page and scrolls
  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setIsMenuOpen(false)

    // If user is currently on a different route, navigate back to '/' first
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        scrollToTarget(targetId)
      }, 150)
      return
    }

    scrollToTarget(targetId)
  }

  // Scroll listener for sticky pill styling and active section spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)

      // When near the top, always keep 'hero' active
      if (scrollY < 120) {
        setActiveSection('hero')
        return
      }

      // If near bottom of the document and user has actually scrolled down
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      if (scrollY > 300 && scrollY + windowHeight >= docHeight - 80) {
        setActiveSection('contact-section')
        return
      }

      const sections = ['hero', 'about-section', 'projects-section', 'certificates-section', 'contact-section']
      const scrollPosition = scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const top = el.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(sections[i])
            return
          }
        }
      }
      setActiveSection('hero')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      {/* Floating Pill Capsule */}
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`pointer-events-auto relative flex items-center p-1 sm:p-1.5 rounded-full transition-all duration-300 backdrop-blur-xl ${
          isScrolled
            ? 'bg-white/92 shadow-[0_12px_36px_rgba(0,71,255,0.14)] border border-[#0047FF]/25 ring-1 ring-[#0047FF]/10'
            : 'bg-white/85 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#0047FF]/15'
        }`}
      >
        {/* Desktop Animated Pill Navigation (Pure Same-Page Scroll) */}
        <nav
          className="hidden md:flex items-center gap-0.5 relative"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navItems.map((item) => {
            const active = activeSection === item.targetId
            const hovered = hoveredNav === item.name

            return (
              <a
                key={item.name}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
                onMouseEnter={() => setHoveredNav(item.name)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-200 z-10 select-none cursor-pointer ${
                  active
                    ? 'text-white'
                    : 'text-gray-700 hover:text-[#0047FF]'
                }`}
              >
                {/* Active Pill Animation (Spring Gliding Highlight) */}
                {active && (
                  <motion.div
                    layoutId="pillActiveIndicator"
                    className="absolute inset-0 bg-[#0047FF] rounded-full shadow-[0_4px_16px_rgba(0,71,255,0.35)] -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}

                {/* Hover Pill Animation */}
                {hovered && !active && (
                  <motion.div
                    layoutId="pillHoverIndicator"
                    className="absolute inset-0 bg-[#0047FF]/10 rounded-full -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32
                    }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  {item.name}
                </span>
              </a>
            )
          })}
        </nav>

        {/* Mobile View with Current Section Name & Toggle */}
        <div className="md:hidden flex items-center justify-between gap-3 px-3 py-1 min-w-[140px]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047FF]">
            {navItems.find(item => item.targetId === activeSection)?.name || 'Menu'}
          </span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-full text-gray-700 hover:text-[#0047FF] hover:bg-gray-100 transition-colors cursor-pointer border-0 bg-transparent"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-[#0047FF]" />}
          </button>
        </div>

        {/* Mobile Dropdown Pill Card */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 mt-2 p-2 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-[#0047FF]/20 flex flex-col gap-1 md:hidden overflow-hidden"
            >
              {navItems.map((item) => {
                const active = activeSection === item.targetId
                return (
                  <a
                    key={item.name}
                    href={`#${item.targetId}`}
                    onClick={(e) => handleNavClick(e, item.targetId)}
                    className={`relative px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-between cursor-pointer ${
                      active
                        ? 'bg-[#0047FF] text-white shadow-md shadow-[#0047FF]/25'
                        : 'text-gray-700 hover:bg-[#0047FF]/10 hover:text-[#0047FF]'
                    }`}
                  >
                    <span>{item.name}</span>
                    {active && <Sparkles className="w-3.5 h-3.5 text-white/90" />}
                  </a>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}

export default Header
