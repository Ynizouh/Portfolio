import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const API_URL = '/api/projects'

const emptyForm = {
  title: '',
  description: '',
  stack: '',
  githubUrl: '',
  liveUrl: '',
  isAcademic: false,
  isVisible: true,
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  // ── Form state ─────────────────────────────
  const [form, setForm] = useState({ ...emptyForm })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [editingId, setEditingId] = useState(null) // null = mode ajout, id = mode édition

  // ── Fetch projects (admin = tous) ──────────
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) {
        handleLogout()
        return
      }
      const data = await res.json()
      setProjects(data)
    } catch (err) {
      console.error('Erreur chargement :', err)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // ── Toast helper ───────────────────────────
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // ── Logout ─────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // ── Handle form change ─────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // ── Handle image ───────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // ── Reset form ─────────────────────────────
  const resetForm = () => {
    setForm({ ...emptyForm })
    setImageFile(null)
    setImagePreview(null)
    setEditingId(null)
  }

  // ── Start editing ──────────────────────────
  const startEditing = (project) => {
    setEditingId(project._id)
    setForm({
      title: project.title,
      description: project.description,
      stack: project.stack?.join(', ') || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      isAcademic: project.isAcademic || false,
      isVisible: project.isVisible !== false,
    })
    setImageFile(null)
    setImagePreview(project.imageUrl || null)
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Build FormData ─────────────────────────
  const buildFormData = () => {
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append(
      'stack',
      JSON.stringify(
        form.stack
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      )
    )
    formData.append('githubUrl', form.githubUrl)
    formData.append('liveUrl', form.liveUrl)
    formData.append('isAcademic', form.isAcademic)
    formData.append('isVisible', form.isVisible)
    if (imageFile) formData.append('image', imageFile)
    return formData
  }

  // ── Submit (add or update) ─────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.description) {
      showToast('Titre et description requis.', 'error')
      return
    }

    setSubmitting(true)
    const formData = buildFormData()
    const isEdit = !!editingId

    try {
      const res = await fetch(
        isEdit ? `${API_URL}/${editingId}` : API_URL,
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      )

      if (res.status === 401) {
        handleLogout()
        return
      }

      if (!res.ok) throw new Error('Erreur')

      showToast(isEdit ? 'Projet modifié !' : 'Projet ajouté !')
      resetForm()
      fetchProjects()
    } catch {
      showToast("Erreur lors de l'opération.", 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Toggle visibility ─────────────────────
  const toggleVisibility = async (project) => {
    try {
      const formData = new FormData()
      formData.append('isVisible', !project.isVisible)

      const res = await fetch(`${API_URL}/${project._id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (res.status === 401) {
        handleLogout()
        return
      }

      if (!res.ok) throw new Error('Erreur')

      showToast(
        project.isVisible
          ? `"${project.title}" masqué du site`
          : `"${project.title}" visible sur le site`
      )
      fetchProjects()
    } catch {
      showToast('Erreur lors du changement de visibilité.', 'error')
    }
  }

  // ── Delete project ─────────────────────────
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Supprimer le projet "${title}" ?`)) return

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.status === 401) {
        handleLogout()
        return
      }

      if (!res.ok) throw new Error('Erreur suppression')

      showToast('Projet supprimé.')
      if (editingId === id) resetForm()
      fetchProjects()
    } catch {
      showToast('Erreur lors de la suppression.', 'error')
    }
  }

  return (
    <section className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
              Dashboard <span className="gradient-text">Admin</span>
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Gère tes projets portfolio
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl text-sm border border-[var(--color-danger)]/30 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all"
          >
            Déconnexion
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Add / Edit Form ───────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      editingId ? 'bg-amber-400' : 'bg-[var(--color-accent)]'
                    }`}
                  />
                  {editingId ? 'Modifier le projet' : 'Ajouter un projet'}
                </h2>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    ✕ Annuler
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label
                    htmlFor="admin-title"
                    className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
                  >
                    Titre *
                  </label>
                  <input
                    id="admin-title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Nom du projet"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="admin-desc"
                    className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
                  >
                    Description *
                  </label>
                  <textarea
                    id="admin-desc"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Décris le projet..."
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Stack */}
                <div>
                  <label
                    htmlFor="admin-stack"
                    className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
                  >
                    Stack (séparées par des virgules)
                  </label>
                  <input
                    id="admin-stack"
                    name="stack"
                    value={form.stack}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-all"
                  />
                </div>

                {/* URLs */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="admin-github"
                      className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
                    >
                      GitHub URL
                    </label>
                    <input
                      id="admin-github"
                      name="githubUrl"
                      value={form.githubUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="admin-live"
                      className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
                    >
                      Démo URL
                    </label>
                    <input
                      id="admin-live"
                      name="liveUrl"
                      value={form.liveUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Image upload */}
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Image du projet
                  </label>
                  <label
                    htmlFor="admin-image"
                    className="flex flex-col items-center justify-center py-6 rounded-xl border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-accent)]/40 cursor-pointer transition-all group"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <svg
                          className="w-8 h-8 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors mb-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>
                        <span className="text-xs text-[var(--color-text-muted)]">
                          Cliquer pour uploader
                        </span>
                      </>
                    )}
                    <input
                      id="admin-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      name="isAcademic"
                      checked={form.isAcademic}
                      onChange={handleChange}
                      className="w-4 h-4 rounded accent-[var(--color-accent)]"
                    />
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      🎓 Projet académique
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      name="isVisible"
                      checked={form.isVisible}
                      onChange={handleChange}
                      className="w-4 h-4 rounded accent-[var(--color-success)]"
                    />
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      👁️ Visible sur le site
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 ${
                    editingId
                      ? 'bg-amber-500 hover:bg-amber-400'
                      : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] glow'
                  }`}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {editingId ? 'Mise à jour...' : 'Envoi...'}
                    </span>
                  ) : editingId ? (
                    '✏️ Modifier le projet'
                  ) : (
                    '+ Ajouter le projet'
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* ── Projects Table ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
                <h2 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
                  Projets ({projects.length})
                </h2>
              </div>

              {loading ? (
                <div className="flex justify-center py-16">
                  <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-16 text-[var(--color-text-muted)]">
                  Aucun projet. Ajoutes-en un !
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-border)]">
                  <AnimatePresence>
                    {projects.map((project) => (
                      <motion.div
                        key={project._id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        className={`px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group ${
                          !project.isVisible ? 'opacity-50' : ''
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-primary)] overflow-hidden shrink-0 relative">
                          {project.imageUrl ? (
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg">
                              📁
                            </div>
                          )}
                          {!project.isVisible && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-xs">🚫</span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[var(--color-text-primary)] truncate flex items-center gap-2">
                            {project.title}
                            {project.isAcademic && (
                              <span className="text-xs text-[var(--color-accent-light)]">
                                🎓
                              </span>
                            )}
                            {!project.isVisible && (
                              <span className="text-[0.65rem] px-1.5 py-0.5 rounded bg-[var(--color-text-muted)]/20 text-[var(--color-text-muted)]">
                                Masqué
                              </span>
                            )}
                          </h3>
                          <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                            {project.description}
                          </p>
                          <div className="flex gap-1 mt-1.5">
                            {project.stack?.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="text-[0.65rem] px-1.5 py-0.5 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent-light)]"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.stack?.length > 3 && (
                              <span className="text-[0.65rem] text-[var(--color-text-muted)]">
                                +{project.stack.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* Visibility toggle */}
                          <button
                            onClick={() => toggleVisibility(project)}
                            className={`p-2.5 rounded-xl transition-all ${
                              project.isVisible
                                ? 'text-[var(--color-success)] hover:bg-[var(--color-success)]/10'
                                : 'text-[var(--color-text-muted)] hover:bg-white/5'
                            }`}
                            title={
                              project.isVisible
                                ? 'Masquer du site'
                                : 'Rendre visible'
                            }
                          >
                            {project.isVisible ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                              </svg>
                            )}
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => startEditing(project)}
                            className="p-2.5 rounded-xl text-[var(--color-text-muted)] hover:text-amber-400 hover:bg-amber-400/10 transition-all"
                            title="Modifier"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() =>
                              handleDelete(project._id, project.title)
                            }
                            className="p-2.5 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all"
                            title="Supprimer"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Toast ──────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-8 left-1/2 px-6 py-3 rounded-2xl text-sm font-medium shadow-2xl ${
              toast.type === 'error'
                ? 'bg-[var(--color-danger)] text-white'
                : 'bg-[var(--color-success)] text-white'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
