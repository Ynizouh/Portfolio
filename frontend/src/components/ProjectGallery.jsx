import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import DemoModal from './DemoModal'

const API_URL = '/api/projects'

export default function ProjectGallery() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedDemoProject, setSelectedDemoProject] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('API status: ' + res.status)
        return res.json()
      })
      .then((data) => {
        setProjects(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Erreur chargement projets :', err)
        setProjects([])
        setLoading(false)
      })
  }, [])

  const filtered = projects.filter((p) => {
    if (filter === 'academic') return p.isAcademic
    if (filter === 'personal') return !p.isAcademic
    return true
  })

  const filters = [
    { key: 'all', label: 'All Projects', count: projects.length },
    { key: 'academic', label: 'Academic', count: projects.filter((p) => p.isAcademic).length },
    { key: 'personal', label: 'Personal & Labs', count: projects.filter((p) => !p.isAcademic).length },
  ]

  return (
    <section id="projects" className="editorial-section">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <span className="editorial-section-label">PORTFOLIO</span>
        <div className="editorial-label-bar" />
        <h2 className="editorial-title mb-8">PROJECTS</h2>

        {/* Minimalist Filter Bar */}
        <div className="flex flex-wrap items-center gap-8 mb-16 border-b border-white/10 pb-4">
          {filters.map((f) => {
            const isActive = filter === f.key

            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-sm font-sans tracking-wider uppercase transition-colors cursor-pointer relative pb-2 ${
                  isActive
                    ? 'text-white border-b-2 border-white font-medium'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span>{f.label}</span>
                <span className="ml-2 text-xs text-zinc-500">({f.count})</span>
              </button>
            )
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              Loading Projects...
            </span>
          </div>
        )}

        {/* Grid of Projects */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={i}
                onOpenDemo={(p) => setSelectedDemoProject(p)}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="py-16 text-center border border-white/10">
            <p className="text-zinc-500 text-sm font-sans">
              Aucun projet dans cette catégorie.
            </p>
          </div>
        )}
      </motion.div>

      {/* Embedded Live Demo Modal */}
      <DemoModal
        project={selectedDemoProject}
        isOpen={Boolean(selectedDemoProject)}
        onClose={() => setSelectedDemoProject(null)}
      />
    </section>
  )
}
