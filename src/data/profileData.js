// Konfigurasi Data Profil, Proyek, dan Sertifikat
// Anda bisa dengan mudah mengedit nama, bio, proyek, dan sertifikat di sini!

export const profileData = {
  // Informasi Utama (Hero Section)
  name: "Asril Maulana",
  shortName: "Asril",
  greetingPrefix: "Hey! I'm",
  subtitle: "A college student, lifelong learner and emerging life adventurer.",
  
  // Foto Profil Utama
  profileImage: "/images/profile.jpg?v=2",

  // Penjelasan Singkat & Detail Tentang Diri
  about: {
    headline: "Menciptakan karya digital dengan perpaduan visual estetik dan kode yang solutif.",
    paragraphs: [
      "Halo! Gua adalah seorang mahasiswa dan tech enthusiast yang senang menjelajahi dunia kreatif web. Bagi gua, website bukan cuma sekadar baris kode, tapi juga media ekspresi untuk menyampaikan identitas dan menghadirkan pengalaman visual yang berkesan.",
      "Gua selalu bersemangat untuk belajar hal-hal baru — mulai dari interaksi mikro, desain antarmuka modern, hingga membangun aplikasi yang rapi dan responsif. Setiap tantangan adalah petualangan baru untuk berkembang."
    ]
  },

  // 1. DAFTAR PROYEK (Tempat Menampilkan Hasil Karya & Gambar Proyek)
  projects: [
    {
      id: 1,
      title: "E-Commerce & Digital Store",
      description: "Platform toko digital dengan katalog produk interaktif, checkout mulus, dan dashboard analitik modern.",
      image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
      category: "Fullstack",
      technologies: ["React", "Tailwind CSS", "Node.js", "Stripe"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Interactive Studio Portfolio",
      description: "Website portofolio kreatif dengan animasi mikro, transisi halaman dinamis, dan tipografi ekspresif.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      category: "Web & UI",
      technologies: ["React", "Framer Motion", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "TaskFlow Workspace App",
      description: "Aplikasi manajemen tugas tim kolaboratif dengan visual Kanban board, drag & drop, dan sinkronisasi real-time.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
      category: "Productivity",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Weather & Climate Intelligence",
      description: "Dashboard cuaca presisi dengan peta interaktif, radar cuaca, dan prediksi cuaca harian.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
      category: "Web App",
      technologies: ["React", "Chart.js", "OpenWeather API"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ],

  // 2. DAFTAR SERTIFIKAT (Tempat Menampilkan Sertifikat & Kredensial)
  certificates: [
    {
      id: 1,
      title: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta (Facebook)",
      issueDate: "2025",
      credentialId: "META-FED-884920",
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80",
      category: "Development",
      skills: ["React", "JavaScript", "Responsive UI", "Web Performance"],
      credentialUrl: "#"
    },
    {
      id: 2,
      title: "Google UX Design Professional Certificate",
      issuer: "Google",
      issueDate: "2024",
      credentialId: "GOOG-UXD-391044",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      category: "UI/UX Design",
      skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
      credentialUrl: "#"
    },
    {
      id: 3,
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      issueDate: "2024",
      credentialId: "AWS-CCP-719302",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      category: "Cloud",
      skills: ["Cloud Architecture", "AWS Core Services", "Cloud Security"],
      credentialUrl: "#"
    },
    {
      id: 4,
      title: "Fullstack Web Development Bootcamp",
      issuer: "Dicoding Academy",
      issueDate: "2023",
      credentialId: "DICODING-FS-55129",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      category: "Bootcamp",
      skills: ["Node.js", "Express", "REST APIs", "PostgreSQL"],
      credentialUrl: "#"
    }
  ],

  // Kontak & Sosial
  contact: {
    email: "asril.contact@example.com",
    instagram: "@asril.creative",
    github: "github.com/asril",
    linkedin: "linkedin.com/in/asril",
    status: "Open for Collaborations & Creative Projects"
  }
}
