import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about')
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'work', 'education', 'projects', 'contact']
      const scrollPos = window.scrollY + 250

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    if (isHome && href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      {/* Top Header - Minimalist Links Top-Right */}
      <header className="fixed top-0 left-0 right-0 z-50 px-10 sm:px-16 md:px-24 lg:px-32 py-12 sm:py-14 md:py-16 flex items-center justify-between pointer-events-none">
        {/* Left identity logo / title */}
        <Link
          to="/"
          aria-label="Retour à l'accueil"
          className="flex items-center gap-3 font-mono text-xs tracking-widest text-white uppercase pointer-events-auto no-underline group"
        >
          <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/20 flex items-center justify-center font-bold text-sm text-white group-hover:border-white transition-all shadow-sm">
            M<span className="text-zinc-500">.</span>
          </span>
          <span className="font-sans font-medium tracking-widest hidden sm:inline-block text-zinc-300 group-hover:text-white transition-colors">
            MATHIS // DEV
          </span>
        </Link>

        {/* Right Top Links */}
        <nav className="flex items-center gap-8 sm:gap-12 pointer-events-auto font-sans text-xs sm:text-sm text-white">
          <a
            href="mailto:mathissaint-leger@laposte.net"
            className="text-white hover:text-zinc-400 transition-colors no-underline tracking-wide"
          >
            Mail
          </a>
          <a
            href="https://github.com/Ynizouh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-zinc-400 transition-colors no-underline tracking-wide"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-zinc-400 transition-colors no-underline tracking-wide"
          >
            LinkedIn
          </a>
          <Link
            to="/login"
            className="text-zinc-400 hover:text-white transition-colors no-underline tracking-wide"
          >
            Admin
          </Link>
        </nav>
      </header>

      {/* Sticky Right Side Navigation Menu (As in Reference Screenshots) */}
      <aside className="sticky-right-nav" aria-label="Page Navigation">
        {navItems.map((item) => {
          const sectionId = item.href.replace('#', '')
          const isActive = activeSection === sectionId

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`sticky-nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </a>
          )
        })}
      </aside>
    </>
  )
}
