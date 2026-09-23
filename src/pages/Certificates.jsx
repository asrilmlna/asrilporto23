import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Calendar, ExternalLink, Filter, Search, Star } from 'lucide-react'

const Certificates = () => {
  const { ref: certificatesRef, inView: certificatesInView } = useInView({ triggerOnce: true })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['all', 'development', 'design', 'cloud', 'security', 'management']

  const certificates = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: 'March 2024',
      expiryDate: 'March 2027',
      category: 'cloud',
      credentialId: 'AWS-ASA-123456',
      credentialUrl: '#',
      image: '/api/placeholder/300/200',
      description: 'Demonstrated expertise in designing distributed systems on AWS platform',
      featured: true,
      rating: 5
    },
    {
      id: 2,
      title: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      issueDate: 'January 2024',
      expiryDate: 'January 2027',
      category: 'cloud',
      credentialId: 'GCP-PD-789012',
      credentialUrl: '#',
      image: '/api/placeholder/300/200',
      description: 'Professional-level certification for developing applications on Google Cloud',
      featured: true,
      rating: 5
    },
    {
      id: 3,
      title: 'Meta React Developer Certificate',
      issuer: 'Meta',
      issueDate: 'November 2023',
      expiryDate: 'No expiry',
      category: 'development',
      credentialId: 'META-REACT-345678',
      credentialUrl: '#',
      image: '/api/placeholder/300/200',
      description: 'Advanced React development skills including hooks, context, and performance optimization',
      featured: true,
      rating: 5
    },
    {
      id: 4,
      title: 'Certified Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      issueDate: 'September 2023',
      expiryDate: 'September 2026',
      category: 'cloud',
      credentialId: 'CKA-901234',
      credentialUrl: '#',
      image: '/api/placeholder/300/200',
      description: 'Kubernetes cluster administration, networking, storage, and security',
      featured: false,
      rating: 4
    },
    {
      id: 5,
      title: 'Adobe Certified Professional - Photoshop',
      issuer: 'Adobe',
      issueDate: 'July 2023',
      expiryDate: 'July 2025',
      category: 'design',
      credentialId: 'ADOBE-PS-567890',
      credentialUrl: '#',
      image: '/api/placeholder/300/200',
      description: 'Professional image editing and graphic design skills using Adobe Photoshop',
      featured: false,
      rating: 4
    },
    {
      id: 6,
      title: 'Certified Ethical Hacker',
      issuer: 'EC-Council',
      issueDate: 'May 2023',
      expiryDate: 'May 2026',
      category: 'security',
      credentialId: 'CEH-234567',
      credentialUrl: '#',
      image: '/api/placeholder/300/200',
      description: 'Ethical hacking techniques, penetration testing, and security assessment',
      featured: true,
      rating: 5
    },
    {
      id: 7,
      title: 'Project Management Professional',
      issuer: 'Project Management Institute',
      issueDate: 'February 2023',
      expiryDate: 'February 2026',
      category: 'management',
      credentialId: 'PMP-890123',
      credentialUrl: '#',
      image: '/api/placeholder/300/200',
      description: 'Project management methodologies, leadership, and stakeholder management',
      featured: false,
      rating: 4
    },
    {
      id: 8,
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB',
      issueDate: 'December 2022',
      expiryDate: 'No expiry',
      category: 'development',
      credentialId: 'MDB-DEV-456789',
      credentialUrl: '#',
      image: '/api/placeholder/300/200',
      description: 'MongoDB database design, optimization, and application development',
      featured: false,
      rating: 4
    }
  ]

  const filteredCertificates = certificates.filter(certificate => {
    const matchesCategory = selectedCategory === 'all' || certificate.category === selectedCategory
    const matchesSearch = certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredCertificates = filteredCertificates.filter(cert => cert.featured)
  const otherCertificates = filteredCertificates.filter(cert => !cert.featured)

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Certificates & Credentials
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional certifications and achievements that validate my expertise
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-8 bg-white dark:bg-gray-900 sticky top-16 z-40 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Certificates */}
      {featuredCertificates.length > 0 && (
        <section ref={certificatesRef} className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={certificatesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Certifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Key professional certifications that highlight my expertise
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={certificatesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-square md:aspect-auto bg-gradient-to-br from-blue-400 to-purple-600 relative">
                      <Award className="absolute inset-0 m-auto w-16 h-16 text-white" />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {certificate.title}
                        </h3>
                        <div className="flex">
                          {renderStars(certificate.rating)}
                        </div>
                      </div>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                        {certificate.issuer}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {certificate.description}
                      </p>
                      <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Issued: {certificate.issueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>ID: {certificate.credentialId}</span>
                        </div>
                        {certificate.expiryDate !== 'No expiry' && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Expires: {certificate.expiryDate}</span>
                          </div>
                        )}
                      </div>
                      <a
                        href={certificate.credentialUrl}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
                      >
                        View Credential
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Certificates */}
      {otherCertificates.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={certificatesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Other Certifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Additional professional development and achievements
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={certificatesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex">
                      {renderStars(certificate.rating)}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {certificate.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">
                    {certificate.issuer}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {certificate.description}
                  </p>
                  <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div>Issued: {certificate.issueDate}</div>
                    {certificate.expiryDate !== 'No expiry' && (
                      <div>Expires: {certificate.expiryDate}</div>
                    )}
                  </div>
                  <a
                    href={certificate.credentialUrl}
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
                  >
                    View
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredCertificates.length === 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              <p className="text-xl mb-2">No certificates found</p>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Certificates
