import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image, Plus, Maximize2, X, FolderOpen, Tag, Calendar, Sparkles } from 'lucide-react'
import { profileData } from '../../data/profileData'

const PhotoGallerySection = () => {
  const fileInputRef = useRef(null)
  const [galleryItems, setGalleryItems] = useState(profileData.gallery)
  const [activePhoto, setActivePhoto] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCaption, setNewCaption] = useState('')
  const [newCategory, setNewCategory] = useState('Personal')
  const [previewImage, setPreviewImage] = useState(null)

  // Load custom added gallery items from localStorage
  useEffect(() => {
    const savedGallery = localStorage.getItem('custom_user_gallery_items')
    if (savedGallery) {
      try {
        const parsed = JSON.parse(savedGallery)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setGalleryItems(parsed)
        }
      } catch (err) {
        console.error("Failed to parse gallery from localStorage", err)
      }
    }
  }, [])

  // Handle image upload from computer
  const handleImagePick = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Save new photo into the showcase list
  const handleAddPhoto = (e) => {
    e.preventDefault()
    if (!previewImage) return

    const newItem = {
      id: Date.now(),
      title: newTitle || 'Momen Baru',
      image: previewImage,
      caption: newCaption || 'Foto yang ditambahkan ke galeri saya.',
      category: newCategory,
      date: new Date().getFullYear().toString(),
      rotation: `${(Math.random() * 4 - 2).toFixed(1)}deg`
    }

    const updated = [newItem, ...galleryItems]
    setGalleryItems(updated)
    try {
      localStorage.setItem('custom_user_gallery_items', JSON.stringify(updated))
    } catch (err) {
      console.warn("Storage quota limit reached", err)
    }

    // Reset modal
    setNewTitle('')
    setNewCaption('')
    setPreviewImage(null)
    setIsAddModalOpen(false)
  }

  return (
    <section
      id="gallery-section"
      className="w-full bg-[#FCECE1] text-[#1E2029] py-20 md:py-28 px-6 md:px-12 lg:px-20 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with Title and Add Photo CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0047FF]/10 text-[#0047FF] text-xs font-bold tracking-wider uppercase">
              <Image className="w-3.5 h-3.5" />
              <span>Khusus Tempat Gambar & Galeri</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              Koleksi Foto & <span className="text-[#0047FF]">Momen Pilihan</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-xl">
              Ruang khusus untuk memamerkan foto kegiatan, proyek, hobi, dan momen favorit. Anda bisa menambahkan foto baru kapan saja!
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 bg-[#0047FF] hover:bg-[#0037CC] text-white text-xs md:text-sm font-semibold rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Foto Baru</span>
            </button>
          </div>
        </div>

        {/* Polaroid Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
              style={{ transform: `rotate(${item.rotation || '0deg'})` }}
              className="bg-white p-3.5 pb-5 rounded-sm shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between group border border-gray-100"
              onClick={() => setActivePhoto(item)}
            >
              {/* Photo Frame */}
              <div className="aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-gray-100 rounded-xs relative mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/images/gallery-1.jpg"
                  }}
                />

                {/* Tag on image */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" />
                  <span>{item.category}</span>
                </div>

                <div className="absolute inset-0 bg-[#0047FF]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 bg-white/90 rounded-full text-[#0047FF] shadow">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="space-y-1 px-1">
                <div className="flex justify-between items-center text-[11px] text-gray-500">
                  <span className="font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    {item.date}
                  </span>
                  <span className="text-[#0047FF] font-semibold text-[10px] uppercase">
                    View
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#0047FF] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2 leading-snug">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Helper Info */}
        <div className="mt-14 bg-white/60 border border-orange-200/60 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-gray-700">
            <div className="p-2 bg-blue-100 text-[#0047FF] rounded-lg">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Lokasi Folder Gambar Permanen:</p>
              <p className="text-gray-600 font-mono text-[11px]">
                c:\Aboutmee\public\images\
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center sm:text-right">
            File konfigurasi galeri ada di <code className="bg-white px-2 py-0.5 rounded font-mono text-[#0047FF]">src/data/profileData.js</code>
          </p>
        </div>
      </div>

      {/* Lightbox Modal: Tampilan Foto Penuh */}
      <AnimatePresence>
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-semibold text-[#0047FF] bg-blue-50 px-2 py-0.5 rounded-full">
                    {activePhoto.category}
                  </span>
                  <span>{activePhoto.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{activePhoto.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{activePhoto.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Tambah Foto Baru */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100"
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-[#0047FF]">
                  <Plus className="w-5 h-5" />
                  <h3 className="font-bold text-lg text-gray-900">Tambah Foto ke Galeri</h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddPhoto} className="py-4 space-y-4">
                {/* File picker preview */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Foto / Gambar
                  </label>
                  {previewImage ? (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200 mb-2">
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPreviewImage(null)}
                        className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 hover:border-[#0047FF] rounded-xl p-6 text-center cursor-pointer transition-colors bg-gray-50 hover:bg-blue-50/50"
                    >
                      <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-gray-700">Klik untuk upload foto dari laptop</p>
                      <p className="text-[11px] text-gray-400 mt-1">Mendukung JPG, PNG, WEBP</p>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImagePick}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Judul Foto
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: Eksplorasi Akhir Pekan"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0047FF]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Kategori
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0047FF]"
                  >
                    <option value="Personal">Personal & Momen</option>
                    <option value="Workspace">Workspace & Tech</option>
                    <option value="Project">Proyek & Desain</option>
                    <option value="Adventure">Petualangan</option>
                    <option value="Hobby">Hobi</option>
                  </select>
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Cerita / Keterangan Singkat
                  </label>
                  <textarea
                    rows={2}
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Tuliskan cerita singkat tentang foto ini..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0047FF]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={!previewImage}
                    className="px-5 py-2 bg-[#0047FF] hover:bg-[#0037CC] disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm"
                  >
                    Simpan Foto
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default PhotoGallerySection
