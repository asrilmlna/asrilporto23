import { useState } from 'react'
import {
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Globe,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUpRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { profileData } from '../../data/profileData'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: `https://instagram.com/${profileData.contact.instagram?.replace('@', '') || ''}`, label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Dribbble, href: '#', label: 'Dribbble' },
    { icon: Globe, href: '#', label: 'Website' },
    { icon: Github, href: `https://${profileData.contact.github}`, label: 'GitHub' },
    { icon: Linkedin, href: `https://${profileData.contact.linkedin}`, label: 'LinkedIn' }
  ]

  return (
    <footer id="contact-section" className="relative w-full bg-[#050814] text-slate-300 overflow-hidden border-t border-slate-800/60 transition-all selection:bg-sky-500/20 selection:text-sky-200">
      {/* Subtle blue radial ambient glow at the bottom/center */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(14, 165, 233, 0.15) 0%, rgba(161, 171, 219, 0) 70%)'
        }}
      />

      {/* Top 4-Column Grid Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 group-hover:border-sky-400/50 transition-all">
                <Heart className="w-4 h-4 text-sky-400 fill-sky-400 transition-transform group-hover:scale-110" />
              </span>
              <span className="text-2xl font-bold text-white tracking-tight">
                Asril<span className="text-sky-400 font-light">/ui</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-normal">
              Modern digital space & personal portfolio of Asril Maulana — crafting visually stunning, responsive, and performance-driven web interfaces.
            </p>
          </div>

          {/* Column 2: About Us */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-[15px] tracking-tight">
              About Us
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors inline-block">
                  Company History
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors inline-block">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-white transition-colors inline-block">
                  Employee Handbook
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="text-slate-400 hover:text-white transition-colors inline-block">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Helpful Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-[15px] tracking-tight">
              Helpful Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors inline-block">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors inline-block">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2">
                  <span>Live Chat</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400 shadow-[0_0_8px_#38bdf8]"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-[15px] tracking-tight">
              Contact Us
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="flex items-center gap-3 text-slate-400 hover:text-sky-300 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-sky-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{profileData.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-3 text-slate-400 hover:text-sky-300 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-sky-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+62 812 3456 7890</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Jakarta, Indonesia</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Horizontal Divider Line with Social Icons & Copyright */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="border-t border-slate-800/80 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Social Icons row */}
            <div className="flex items-center gap-4 sm:gap-5 text-slate-400">
              {socialLinks.slice(0, 5).map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-400 transition-colors duration-200 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Copyright text */}
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              © {currentYear} Asril. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Giant Bottom Outline Typography: "ASRIL" */}
      <div className="relative w-full -mt-6 sm:-mt-10 md:-mt-16 lg:-mt-22 pb-2 md:pb-6 flex justify-center items-center overflow-hidden pointer-events-none select-none">
        <span
          className="footer-outline-text font-black uppercase text-[19vw] tracking-wider text-center pointer-events-auto cursor-default block"
        >
          ASRIL
        </span>
      </div>
    </footer>
  )
}

export default Footer

