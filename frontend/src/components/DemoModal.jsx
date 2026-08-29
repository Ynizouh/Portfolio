import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DemoModal({ project, isOpen, onClose }) {
  const [device, setDevice] = useState('desktop') // 'desktop' | 'tablet' | 'mobile'
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setIsFullscreen(false)
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false)
        } else {
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isFullscreen, onClose])

  if (!project || !project.liveUrl) return null

  const reloadIframe = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  // Device container sizing inside the modal
  const iframeContainerStyles = {
    desktop: 'w-full h-full rounded-none',
    tablet: 'w-[768px] max-w-[95%] h-[92%] rounded-2xl border-4 border-zinc-800 shadow-2xl my-auto',
    mobile: 'w-[380px] max-w-[95%] h-[94%] rounded-3xl border-4 border-zinc-800 shadow-2xl my-auto',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative flex flex-col bg-zinc-950 border border-white/20 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
              isFullscreen
                ? 'w-full h-full fixed inset-0 rounded-none border-none'
                : 'w-full max-w-6xl h-[88vh]'
            }`}
          >
            {/* Top Browser Toolbar (Toujours accessible et lisible) */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-zinc-900/95 border-b border-white/10 select-none z-20">
              {/* Left: Window Controls & Title */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    title="Fermer"
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
                  />
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
                    className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer"
                  />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs font-mono text-zinc-300 font-medium truncate max-w-[140px] sm:max-w-[220px]">
                  {project.title}
                </span>
              </div>

              {/* Center: Device Switcher Toolbar (Toujours affiché) */}
              <div className="flex items-center bg-black/70 border border-white/15 rounded-lg p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setDevice('desktop')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    device === 'desktop'
                      ? 'bg-white text-black font-semibold shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Format Bureau (100%)"
                >
                  <span>🖥️</span>
                  <span className="hidden md:inline">Bureau</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDevice('tablet')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    device === 'tablet'
                      ? 'bg-white text-black font-semibold shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Format Tablette (768px)"
                >
                  <span>📱</span>
                  <span className="hidden md:inline">Tablette</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDevice('mobile')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    device === 'mobile'
                      ? 'bg-white text-black font-semibold shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Format Mobile (380px)"
                >
                  <span>🤳</span>
                  <span className="hidden md:inline">Mobile</span>
                </button>
              </div>

              {/* Right: Actions (Reload, New Tab, Fullscreen, Close) */}
              <div className="flex items-center gap-2 text-xs font-mono">
                {/* Reload */}
                <button
                  type="button"
                  onClick={reloadIframe}
                  title="Recharger la démo"
                  className="p-1.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors cursor-pointer"
                >
                  🔄
                </button>

                {/* Fullscreen Toggle */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? 'Réduire' : 'Plein écran'}
                  className="hidden sm:flex items-center gap-1 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  <span>{isFullscreen ? '🗗' : '⛶'}</span>
                  <span className="hidden lg:inline">{isFullscreen ? 'Réduire' : 'Plein écran'}</span>
                </button>

                {/* External link */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1 no-underline"
                  title="Ouvrir dans un nouvel onglet"
                >
                  <span>↗</span>
                  <span className="hidden sm:inline">Onglet</span>
                </a>

                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  className="text-zinc-400 hover:text-white p-1 text-sm cursor-pointer ml-1"
                  title="Fermer (Échap)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Viewport Workspace */}
            <div className="relative flex-1 bg-zinc-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
              {/* Spinner loader */}
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950/90 text-zinc-400">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mb-3" />
                  <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                    Chargement de la démo...
                  </p>
                </div>
              )}

              {/* Responsive Iframe Container */}
              <div
                className={`relative overflow-hidden bg-white transition-all duration-300 ${iframeContainerStyles[device]}`}
              >
                {/* Mobile / Tablet notch mockup indicator */}
                {device === 'mobile' && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-900 rounded-full z-20 pointer-events-none flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  </div>
                )}

                <iframe
                  key={iframeKey}
                  src={project.liveUrl}
                  title={`Live Demo - ${project.title}`}
                  className="w-full h-full border-0 bg-white"
                  onLoad={() => setIsLoading(false)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
