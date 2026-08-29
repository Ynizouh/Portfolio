import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.message || 'Identifiants incorrects.')
        setLoading(false)
        return
      }

      localStorage.setItem('token', result.token)
      navigate('/admin')
    } catch {
      setError('Erreur de connexion au serveur.')
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="border border-white/10 p-8 sm:p-12 bg-[#050505]">
          {/* Header */}
          <div className="mb-10">
            <span className="editorial-section-label">AUTHENTIFICATION</span>
            <div className="editorial-label-bar" />
            <h1 className="editorial-title text-4xl sm:text-5xl">ADMIN</h1>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 border border-red-500/40 text-red-400 text-xs font-mono">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-sans uppercase tracking-widest text-zinc-400 mb-2"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="admin@portfolio.com"
                {...register('email', {
                  required: "L'email est requis",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Format email invalide',
                  },
                })}
                className="w-full px-4 py-3 bg-black border border-white/15 text-white placeholder-zinc-700 font-sans text-sm focus:border-white focus:outline-none transition-colors"
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1 font-mono">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-sans uppercase tracking-widest text-zinc-400 mb-2"
              >
                Mot de passe
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Le mot de passe est requis',
                  minLength: {
                    value: 4,
                    message: 'Minimum 4 caractères',
                  },
                })}
                className="w-full px-4 py-3 bg-black border border-white/15 text-white placeholder-zinc-700 font-sans text-sm focus:border-white focus:outline-none transition-colors"
              />
              {errors.password && (
                <p className="text-xs text-red-400 mt-1 font-mono">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-editorial justify-center cursor-pointer mt-4"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Back link */}
          <p className="text-center mt-8">
            <a
              href="/"
              className="text-xs font-sans uppercase tracking-widest text-zinc-500 hover:text-white transition-colors no-underline"
            >
              ← Retour au portfolio
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  )
}
