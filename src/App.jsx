import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home'

// Lazy-load secondary pages to keep the initial page bundle lean and fast
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Certificates = lazy(() => import('./pages/Certificates'))
const Contact = lazy(() => import('./pages/Contact'))

// Minimal, zero-overhead page fallback
const PageFallback = () => (
  <div className="w-full min-h-screen bg-[#FCE2D2] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-[#0047FF] border-t-transparent animate-spin" />
  </div>
)

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </motion.div>
      </Layout>
    </Router>
  )
}

export default App
