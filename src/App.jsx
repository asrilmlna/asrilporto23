import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Certificates from './pages/Certificates'
import Contact from './pages/Contact'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.div>
      </Layout>
    </Router>
  )
}

export default App
