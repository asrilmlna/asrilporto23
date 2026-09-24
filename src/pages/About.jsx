import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Mail, Phone, Download, Code, Palette, Zap } from 'lucide-react'
import { profileData } from '../data/profileData'
import { getAssetUrl } from '../utils/imageHelper'

const About = () => {
  const { ref: introRef, inView: introInView } = useInView({ triggerOnce: true })
  const { ref: skillsRef, inView: skillsInView } = useInView({ triggerOnce: true })
  const { ref: timelineRef, inView: timelineInView } = useInView({ triggerOnce: true })

  const skills = [
    { category: 'Frontend', items: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js'], icon: Code },
    { category: 'Design', items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'], icon: Palette },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel', 'Firebase'], icon: Zap }
  ]

  const timeline = [
    {
      year: '2021 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Company Inc.',
      description: 'Leading development of enterprise web applications and mentoring junior developers.'
    },
    {
      year: '2019 - 2021',
      title: 'Frontend Developer',
      company: 'Digital Agency',
      description: 'Built responsive websites and web applications for various clients using modern frameworks.'
    },
    {
      year: '2018 - 2019',
      title: 'Junior Developer',
      company: 'Startup Hub',
      description: 'Developed and maintained multiple client projects while learning best practices.'
    }
  ]

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
              About Me
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate developer with a love for creating beautiful, functional web experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={introRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-100 relative group">
                <img
                  src={getAssetUrl(profileData.profileImage)}
                  alt={profileData.name}
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = getAssetUrl('/images/gallery-1.jpg')
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Crafting Digital Excellence
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Hello! I'm a passionate full-stack developer with over 5 years of experience in creating 
                exceptional web applications. My journey in tech started with a curiosity about how things 
                work on the internet, and has evolved into a career focused on building user-centric solutions.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I specialize in React ecosystem, modern JavaScript frameworks, and creating responsive, 
                accessible designs. When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge through technical writing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">Born: January 1, 1995</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">Location: Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">Email: hello@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">Phone: +62 812-3456-7890</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <skillGroup.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {skillGroup.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My career path and key milestones
            </p>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="md:w-1/4">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {item.year}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {item.company}
                  </div>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
