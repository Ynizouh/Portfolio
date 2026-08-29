import { motion } from 'framer-motion'

export default function About() {
  const skillCols = [
    [
      'React / Front-end Moderne',
      'JavaScript ES6+ / TypeScript',
      'Architecture API REST & JWT',
      'HTML5 / CSS3 / Tailwind',
      'Framer Motion & UI Interactive',
    ],
    [
      'Node.js / Express.js',
      'MongoDB / Mongoose / Cloudinary',
      'Gestion de projet Agile / Scrum',
      'Administration Serveur & Linux',
      'Git / GitHub & Déploiement',
    ],
  ]

  const experiences = [
    {
      role: 'Développeur Web & Logiciel',
      company: 'Projets & Réalisations',
      period: '2023 — PRÉSENT',
      description:
        'Conception et développement d\'applications web full-stack, intégration d\'APIs sécurisées, mise en place de bases de données et optimisation des performances front-end et back-end.',
    },
    {
      role: 'Administration Système & Serveur',
      company: 'Communauté & Infrastructure',
      period: '2021 — 2023',
      description:
        'Gestion d\'infrastructure technique, configuration de serveurs dédiés, coordination d\'équipe et mise en œuvre de solutions d\'automatisation logicielle.',
    },
  ]

  const education = [
    {
      title: 'Formation Développement Web & Logiciel',
      institution: 'Spécialisation Fullstack',
      period: '2024 — EN COURS',
      description:
        'Formation approfondie sur les technologies web modernes, les architectures logicielles, la gestion de bases de données et la conduite de projets en méthodologie Agile.',
    },
  ]

  return (
    <div className="w-full">
      {/* ── Section 1: SKILLS / EXPERTISE (Screenshot 2 style) ──────── */}
      <section id="skills" className="editorial-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="editorial-section-label">EXPERTISE</span>
          <div className="editorial-label-bar" />
          <h2 className="editorial-title mb-16">SKILLS</h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-2">
            {/* Left Column */}
            <div>
              {skillCols[0].map((skill) => (
                <div key={skill} className="editorial-row">
                  <span className="text-white text-lg sm:text-xl font-normal font-sans tracking-wide">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Column */}
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

      {/* ── Section 2: WORK EXPERIENCE (Screenshot 3 style) ──────────── */}
      <section id="work" className="editorial-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="editorial-section-label">CAREER</span>
          <div className="editorial-label-bar" />
          <h2 className="editorial-title mb-16">
            WORK<br />EXPERIENCE
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

      {/* ── Section 3: EDUCATION (Screenshot 4 style) ────────────────── */}
      <section id="education" className="editorial-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="editorial-section-label">PARCOURS</span>
          <div className="editorial-label-bar" />
          <h2 className="editorial-title mb-16">EDUCATION</h2>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Photo */}
            <div className="lg:col-span-5 relative group overflow-hidden border border-white/10">
              <img
                src="/images/education_building.jpg"
                alt="Education Campus"
                className="w-full h-80 sm:h-96 object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="p-3 bg-black border-t border-white/10 flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                <span>CAMPUS // ACADEMIC</span>
                <span>2024 — 2026</span>
              </div>
            </div>

            {/* Right Details */}
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
