import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Parcours', href: '#work' },
  { label: 'Formation', href: '#education' },
  { label: 'Projets', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about')
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY
      const docHeight = document.documentElement.scrollHeight

      setIsScrolled(window.scrollY > 40)

      // Si on approche du bas de page, activer immédiatement la section contact
      if (scrollBottom >= docHeight - 120) {
        setActiveSection('contact')
        return
      }

      const sections = ['about', 'skills', 'work', 'education', 'projects', 'contact']
      const scrollPos = window.scrollY + 280

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          if (scrollPos >= top) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
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
      {/* Top Header - Responsive, Épuré & Flouté au scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 md:px-20 lg:px-32 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4 sm:py-5 shadow-2xl'
            : 'bg-transparent py-6 sm:py-8 md:py-10'
        }`}
      >
        {/* Logo / Identité */}
        <Link
          to="/"
          aria-label="Retour à l'accueil"
          className="flex items-center gap-3 font-mono text-xs tracking-widest text-white uppercase no-underline group"
        >
          <span className="font-bold text-sm">
            M<span className="text-zinc-500">.</span>
          </span>
          <span className="font-sans font-medium tracking-widest hidden sm:inline-block text-zinc-300 group-hover:text-white transition-colors">
            MATHIS // DEV WEB
          </span>
        </Link>

        {/* Liens en haut à droite */}
        <nav className="flex items-center gap-6 sm:gap-10 font-sans text-xs sm:text-sm text-white">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-white hover:text-zinc-400 transition-colors no-underline tracking-wider uppercase text-xs font-mono cursor-pointer"
          >
            Contact
          </a>
          <a
            href="https://github.com/Ynizouh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors no-underline tracking-wider uppercase text-xs font-mono flex items-center gap-1"
          >
            GitHub ↗
          </a>
        </nav>
      </header>

      {/* Menu latéral droit discret (Desktop) */}
      <aside className="sticky-right-nav" aria-label="Navigation de la page">
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


