import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profileData } from '../../data/profileData'
import FallingText from '../ui/FallingText'
import { getAssetUrl } from '../../utils/imageHelper'

// SVG Doodle: Asterisk / 8-pointed Starburst (Pojok Kanan Atas Foto)
const AsteriskDoodle = ({ className = "" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* 4 crossed lines through center */}
    <line x1="50" y1="5" x2="50" y2="95" stroke="#0047FF" strokeWidth="5.5" strokeLinecap="round" />
    <line x1="5" y1="50" x2="95" y2="50" stroke="#0047FF" strokeWidth="5.5" strokeLinecap="round" />
    <line x1="18" y1="18" x2="82" y2="82" stroke="#0047FF" strokeWidth="5.5" strokeLinecap="round" />
    <line x1="82" y1="18" x2="18" y2="82" stroke="#0047FF" strokeWidth="5.5" strokeLinecap="round" />
  </svg>
)

// SVG Doodle: Stylized Eye with Lashes (Pojok Kiri Bawah Foto)
const EyeDoodle = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Eyelashes radiating from upper lid */}
    <line x1="60" y1="20" x2="60" y2="6" stroke="#0047FF" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="43" y1="24" x2="35" y2="12" stroke="#0047FF" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="77" y1="24" x2="85" y2="12" stroke="#0047FF" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="28" y1="33" x2="16" y2="24" stroke="#0047FF" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="92" y1="33" x2="104" y2="24" stroke="#0047FF" strokeWidth="4.5" strokeLinecap="round" />
    
    {/* Eye outline */}
    <path
      d="M10 46 C 30 18, 90 18, 110 46 C 90 74, 30 74, 10 46 Z"
      stroke="#0047FF"
      strokeWidth="5"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    
    {/* Iris & pupil */}
    <circle cx="60" cy="46" r="14" stroke="#0047FF" strokeWidth="4.5" fill="none" />
    <circle cx="60" cy="46" r="6" fill="#0047FF" />
  </svg>
)

const HeroRogers = () => {
  const [animationKey, setAnimationKey] = useState(0)
  const photoSrc = getAssetUrl(profileData.profileImage)
  const heroRef = useRef(null)

  // Track scroll position across the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Smooth Hardware-Accelerated Parallax Values
  const textY = useTransform(scrollYProgress, [0, 1], [0, -45])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6])
  
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 75])
  const photoRotate = useTransform(scrollYProgress, [0, 1], [2.8, -2])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])

  const asteriskY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const asteriskRotate = useTransform(scrollYProgress, [0, 1], [0, 240])

  const eyeY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const eyeX = useTransform(scrollYProgress, [0, 1], [0, -45])

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"])
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.10, 0.20, 0.15])

  return (
    <div
      ref={heroRef}
      id="hero"
      className="relative w-full bg-[#FCE2D2] text-[#0047FF] overflow-hidden min-h-0 md:min-h-[86vh] flex flex-col justify-start md:justify-between transition-all pt-14 sm:pt-18 md:pt-24 pb-7 sm:pb-9 md:pb-10"
    >
      {/* Background Parallax Typography Ribbon (Only FRONTEND DEVELOPER) */}
      <motion.div
        style={{ x: marqueeX, opacity: marqueeOpacity }}
        className="absolute top-1/4 sm:top-1/3 left-0 whitespace-nowrap pointer-events-none select-none z-0 text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-widest text-[#0047FF] will-change-transform gpu-layer"
      >
        FRONTEND DEVELOPER • FRONTEND DEVELOPER • FRONTEND DEVELOPER • FRONTEND DEVELOPER • FRONTEND DEVELOPER •
      </motion.div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start md:justify-center px-4 md:px-8 py-2 md:py-6 z-10">
        {/* Title & Subtitle Container with Falling Text Animation & Parallax */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="text-center max-w-4xl mx-auto space-y-2 md:space-y-4 mb-4 sm:mb-6 md:mb-8 cursor-pointer group will-change-transform"
          onClick={() => setAnimationKey((prev) => prev + 1)}
          title="Klik untuk memutar ulang animasi falling text"
        >
          <FallingText
            as="h1"
            text={`${profileData.greetingPrefix} ${profileData.name}`}
            splitBy="letters"
            delay={0.15}
            stagger={0.035}
            triggerKey={animationKey}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#0047FF] leading-none"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          />

          {profileData.subtitle && (
            <FallingText
              as="p"
              text={profileData.subtitle}
              splitBy="words"
              delay={0.8}
              stagger={0.045}
              triggerKey={animationKey}
              className="text-sm sm:text-lg md:text-xl font-light text-[#0047FF]/90 max-w-2xl mx-auto leading-relaxed px-4"
            />
          )}
        </motion.div>

        {/* Hero Photo with Tilted Polaroid Card, Corner Doodles, & Parallax Physics */}
        <motion.div
          style={{ y: photoY }}
          className="relative mt-6 sm:mt-8 md:mt-12 mb-4 sm:mb-6 md:mb-8 will-change-transform"
        >
          {/* Asterisk Doodle at Top Right with Parallax Spin & Lift */}
          <motion.div
            style={{ y: asteriskY, rotate: asteriskRotate }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -top-5 -right-5 sm:-top-7 sm:-right-7 md:-top-9 md:-right-12 w-11 h-11 sm:w-15 sm:h-15 md:w-20 md:h-20 pointer-events-none z-20 will-change-transform"
          >
            <AsteriskDoodle className="w-full h-full drop-shadow-sm" />
          </motion.div>

          {/* Eye Doodle at Bottom Left with Parallax Drift */}
          <motion.div
            style={{ y: eyeY, x: eyeX }}
            initial={{ scale: 0, rotate: 20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-6 -left-7 sm:-bottom-8 sm:-left-10 md:-bottom-10 md:-left-16 w-16 h-12 sm:w-20 sm:h-16 md:w-28 md:h-20 pointer-events-none z-20 will-change-transform"
          >
            <EyeDoodle className="w-full h-full drop-shadow-sm" />
          </motion.div>

          {/* Tilted Photo Card with Interactive Hover & Scroll Tilt */}
          <motion.div
            style={{ rotate: photoRotate, scale: photoScale }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-white p-2 sm:p-3 md:p-4 rounded-sm shadow-lg md:shadow-2xl will-change-transform transform-gpu"
          >
            {/* Inner photo container */}
            <div className="w-[200px] sm:w-[250px] md:w-[320px] lg:w-[340px] h-[260px] sm:h-[330px] md:h-[410px] lg:h-[440px] overflow-hidden bg-gray-100 relative">
              <img
                src={photoSrc}
                alt={profileData.name}
                width="340"
                height="440"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-[center_22%] transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.src = getAssetUrl('/images/gallery-1.jpg')
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Explore link leading to the bio below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-3 sm:mt-4 md:mt-5 text-center"
        >
          <a
            href="#about-section"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold tracking-widest text-[#0047FF] hover:translate-y-1 transition-transform uppercase py-1.5 px-3 sm:py-2 sm:px-4 rounded-full hover:bg-white/40"
          >
            <span>Selengkapnya Tentang Saya</span>
            <span>↓</span>
          </a>
        </motion.div>
      </main>
    </div>
  )
}

export default HeroRogers
