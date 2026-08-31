import { motion } from 'framer-motion'

export default function About() {
  const skillCols = [
    [
      'React.js & Front-end Moderne',
      'JavaScript (ES6+)',
      'Architecture API REST & JWT',
      'HTML5 / CSS3 & Responsive Design',
    ],
    [
      'Node.js & Express.js',
      'MongoDB / Mongoose & Cloudinary',
      'Git / GitHub & Bonnes Pratiques',
      'Méthodes Agiles / Scrum',
    ],
  ]

  const experiences = [
    {
      role: 'Développeur Web en Formation',
      company: 'Projets Pratiques & Cursus',
      period: '2025 — PRÉSENT',
      description:
        'Conception et développement d\'applications web complètes (Front-end & Back-end) à travers des projets concrets : création d\'interfaces dynamiques et responsives, intégration d\'APIs REST, modélisation de bases de données et authentification sécurisée.',
    },
  ]

  const education = [
    {
      title: 'Formation Développeur Web',
      institution: 'Intégration & Développement Web Moderne',
      period: '2025 — 2026',
      description:
        'Formation approfondie aux technologies web actuelles (JavaScript, React, Node.js, Express, bases de données NoSQL), aux architectures logicielles et à la rigueur de code avec Git.',
    },
  ]

  return (
    <div className="w-full">
      {/* ── Section 1: COMPÉTENCES TECHNIQUES ──────────────────────── */}
      <section id="skills" className="editorial-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="editorial-section-label">EXPERTISE TECHNIQUE</span>
          <div className="editorial-label-bar" />
          <h2 className="editorial-title mb-16">COMPÉTENCES</h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-2">
            {/* Colonne gauche */}
            <div>
              {skillCols[0].map((skill) => (
                <div key={skill} className="editorial-row">
                  <span className="text-white text-lg sm:text-xl font-normal font-sans tracking-wide">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            {/* Colonne droite */}
            <div>
              {skillCols[1].map((skill) => (
                <div key={skill} className="editorial-row">
                  <span className="text-white text-lg sm:text-xl font-normal font-sans tracking-wide">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Section 2: PARCOURS & PROJETS ──────────────────────────── */}
      <section id="work" className="editorial-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="editorial-section-label">PARCOURS</span>
          <div className="editorial-label-bar" />
          <h2 className="editorial-title mb-16">
            PARCOURS &<br />PROJETS
          </h2>

          <div className="border-t border-white/10">
            {experiences.map((exp) => (
              <div
                key={exp.role}
                className="editorial-row py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
              >
                <div className="md:col-span-4">
                  <h3 className="text-white text-xl sm:text-2xl font-normal font-sans">
                    {exp.role}
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1">{exp.company}</p>
                </div>
                <div className="md:col-span-3">
                  <span className="text-zinc-400 text-xs sm:text-sm font-mono tracking-wider">
                    {exp.period}
                  </span>
                </div>
                <div className="md:col-span-5">
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans font-light">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Section 3: FORMATION ──────────────────────────────────── */}
      <section id="education" className="editorial-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="editorial-section-label">CURSUS</span>
          <div className="editorial-label-bar" />
          <h2 className="editorial-title mb-16">FORMATION</h2>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Photo gauche */}
            <div className="lg:col-span-5 relative group overflow-hidden border border-white/10">
              <picture>
                <source srcSet="/images/education_building.webp" type="image/webp" />
                <img
                  src="/images/education_building.jpg"
                  alt="Formation et compétences"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                  className="w-full h-80 sm:h-96 object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </picture>
              <div className="p-3 bg-black border-t border-white/10 flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                <span>FORMATION À DISTANCE</span>
                <span>2025 — EN COURS</span>
              </div>
            </div>

            {/* Détails droite */}
            <div className="lg:col-span-7 space-y-6">
              {education.map((edu) => (
                <div key={edu.title} className="space-y-4">
                  <div>
                    <h3 className="text-white text-2xl sm:text-3xl font-normal font-sans">
                      {edu.title}
                    </h3>
                    <p className="text-zinc-400 text-sm font-sans mt-1">
                      {edu.institution}
                    </p>
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed font-sans font-light">
                    {edu.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase border border-white/15 px-3 py-1.5 inline-block">
                      {edu.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

