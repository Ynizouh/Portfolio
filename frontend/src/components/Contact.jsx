import { useState } from 'react'
import { motion } from 'framer-motion'

const CONTACT_EMAIL = 'mathissaint-leger@laposte.net'

const contactInfo = [
  {
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    label: 'GitHub',
    value: 'github.com/mxtihs',
    href: 'https://github.com/MathisSaintLeger',
  },
  {
    label: 'Localisation',
    value: 'France — Remote',
    href: null,
  },
  {
    label: 'Disponibilité',
    value: 'Ouvert aux alternances & stages',
    href: null,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error('Erreur API')

      setStatus('success')
      setForm({ name: '', email: '', message: '' }) // Reset du formulaire

      // Remet le bouton à zéro après 5s
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="editorial-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Editorial Header */}
        <span className="editorial-section-label">GET IN TOUCH</span>
        <div className="editorial-label-bar" />
        <h2 className="editorial-title mb-16">CONTACT</h2>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

          {/* ── Left — Info ─────────────────────────────────────────── */}
          <div className="lg:col-span-5 space-y-12">
            <p className="text-zinc-300 text-base leading-relaxed font-sans font-light">
              Une opportunité, une question ou un retour sur mon travail ?
              Écrivez-moi directement — je réponds sous 48 h.
            </p>

            {/* Contact details */}
            <ul className="space-y-0 border-t border-white/10">
              {contactInfo.map((item) => (
                <li
                  key={item.label}
                  className="editorial-row flex items-start justify-between gap-4"
                >
                  <span className="text-zinc-400 text-xs font-mono tracking-widest uppercase shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-white text-sm font-sans hover:text-zinc-400 transition-colors no-underline text-right"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white text-sm font-sans text-right">
                      {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA links */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="btn-editorial"
              >
                Écrire un email ↗
              </a>
              <a
                href="https://github.com/MathisSaintLeger"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-ghost"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* ── Right — Form ────────────────────────────────────────── */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-0 border border-white/10"
            >
              {/* Name */}
              <div className="border-b border-white/10 p-6 group focus-within:border-white/40 transition-colors">
                <label
                  htmlFor="contact-name"
                  className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-3"
                >
                  Nom complet *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="w-full bg-transparent text-white text-base font-sans font-light placeholder:text-zinc-700 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div className="border-b border-white/10 p-6 focus-within:border-white/40 transition-colors">
                <label
                  htmlFor="contact-email"
                  className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-3"
                >
                  Adresse email *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="vous@exemple.com"
                  className="w-full bg-transparent text-white text-base font-sans font-light placeholder:text-zinc-700 focus:outline-none"
                />
              </div>

              {/* Message */}
              <div className="border-b border-white/10 p-6 focus-within:border-white/40 transition-colors">
                <label
                  htmlFor="contact-message"
                  className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-3"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Votre message…"
                  className="w-full bg-transparent text-white text-base font-sans font-light placeholder:text-zinc-700 focus:outline-none resize-none"
                />
              </div>

              {/* Footer row */}
              <div className="p-6 flex items-center justify-between gap-4 flex-wrap">
                {status === 'success' ? (
                  <p
                    role="status"
                    className="text-xs font-mono tracking-widest text-emerald-400 uppercase"
                  >
                    ✓ Message envoyé !
                  </p>
                ) : status === 'error' ? (
                  <p
                    role="status"
                    className="text-xs font-mono tracking-widest text-red-400 uppercase"
                  >
                    ✕ Erreur lors de l'envoi
                  </p>
                ) : (
                  <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                    Connecté à l'API Node.js
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-editorial shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Envoi...' : 'Envoyer →'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
