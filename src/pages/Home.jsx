import HeroRogers from '../components/home/HeroRogers'
import AboutSection from '../components/home/AboutSection'
import TechStackSection from '../components/home/TechStackSection'
import ProjectsSection from '../components/home/ProjectsSection'
import CertificatesSection from '../components/home/CertificatesSection'

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-[#FCE2D2]">
      {/* 1. Hero Section Persis Sesuai Gambar Referensi */}
      <HeroRogers />

      {/* 2. Penjelasan Tentang Pengguna */}
      <AboutSection />

      {/* 3. Tech Stack & Toolkit (Tepat Setelah About) */}
      <TechStackSection />

      {/* 4. Proyek-Proyek Pilihan */}
      <ProjectsSection />

      {/* 5. Sertifikat & Kredensial */}
      <CertificatesSection />
    </div>
  )
}

export default Home
