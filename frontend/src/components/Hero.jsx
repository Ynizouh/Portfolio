import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* Background Editorial B&W Photography */}
      <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
        <div className="relative w-full lg:w-3/4 h-full">
          <img
            src="/images/hero_portrait.jpg"
            alt="Portrait"
            className="w-full h-full object-cover object-center lg:object-right grayscale contrast-125 brightness-90 opacity-60 lg:opacity-75"
          />
          {/* Subtle Film Grain and Gradient Vignettes for seamless blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>
      </div>

      {/* Main Content */}
      <div className="editorial-section min-h-screen flex flex-col justify-between pt-36 md:pt-44 pb-16 md:pb-24 relative z-10 w-full">
        {/* Editorial Giant Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="editorial-title text-white font-display drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            DÉVELOPPEUR<br />
            WEB<br />
            EN FORMATION
          </h1>
        </motion.div>

        {/* Editorial Bottom Subtitle / Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mt-16 sm:mt-24 space-y-5"
        >
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Étudiant en développement web, passionné par la résolution de problèmes techniques et la création d'expériences logicielles fiables, du concept initial jusqu'au déploiement en production.
          </p>
          <div className="flex items-center gap-8 pt-2">
            <a
              href="#projects"
              className="text-xs uppercase tracking-widest text-white hover:text-zinc-400 border-b border-white hover:border-zinc-400 pb-1 transition-colors no-underline font-sans"
            >
              Explorer les projets →
            </a>
            <a
              href="#skills"
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white pb-1 transition-colors no-underline font-sans"
            >
              Voir les compétences
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
