import { motion } from 'framer-motion'

const EDITORIAL_PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380" fill="#000000">
      <rect width="600" height="380" fill="#080808"/>
      <rect x="20" y="20" width="560" height="340" fill="none" stroke="#27272a" stroke-width="1"/>
      <circle cx="300" cy="190" r="30" fill="none" stroke="#52525b" stroke-width="1"/>
      <text x="300" y="195" text-anchor="middle" fill="#71717a" font-family="sans-serif" font-size="11" letter-spacing="2">APERÇU DU PROJET</text>
    </svg>`
  )

function optimizeImageUrl(url, width = 800) {
  if (!url) return EDITORIAL_PLACEHOLDER
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto:eco,w_${width},c_limit/`)
  }
  return url
}

export default function ProjectCard({ project, index, onOpenDemo }) {
  const { title, description, imageUrl, stack, githubUrl, liveUrl, isAcademic } = project
  const optimizedUrl = optimizeImageUrl(imageUrl, 800)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col h-full bg-black border-b border-white/10 pb-8"
    >
      {/* Visual Frame - High Contrast Grayscale / Duotone */}
      <div 
        className="relative h-60 overflow-hidden bg-zinc-950 mb-5 cursor-pointer group/img"
        onClick={() => liveUrl && onOpenDemo && onOpenDemo(project)}
      >
        <img
          src={optimizedUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          crossOrigin="anonymous"
          width="600"
          height="380"
          className="w-full h-full object-cover grayscale contrast-125 group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-black/80 text-white font-mono border border-white/20">
            {isAcademic ? 'FORMATION' : 'PERSONNEL'}
          </span>
        </div>

        {liveUrl && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-4 py-2 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
              ⚡ Aperçu Direct
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-white text-xl sm:text-2xl font-normal font-sans tracking-tight mb-2 group-hover:text-zinc-300 transition-colors">
            {title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-light">
            {description}
          </p>
        </div>

        <div>
          {/* Stack */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500 font-mono mb-6">
            {stack?.map((tech) => (
              <span key={tech}>
                #{tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 pt-3 border-t border-white/10 text-xs font-sans uppercase tracking-widest">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-zinc-400 transition-colors no-underline flex items-center gap-1"
              >
                GitHub ↗
              </a>
            )}
            {liveUrl && (
              <button
                type="button"
                onClick={() => onOpenDemo && onOpenDemo(project)}
                className="text-white hover:text-zinc-400 transition-colors cursor-pointer inline-flex items-center gap-1.5 font-medium"
              >
                Démo en direct <span className="text-emerald-400">●</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

