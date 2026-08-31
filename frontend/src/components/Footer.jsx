export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 mt-auto bg-black py-16 px-6 sm:px-12 md:px-20 pb-28 sm:pb-16 relative z-10">
      <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-sans tracking-widest uppercase">
        <p className="text-zinc-400 text-center sm:text-left">
          © {year} Mathis Saint-Léger. Développeur Web.
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs font-mono tracking-widest uppercase border border-white/15 px-5 py-2.5 hover:border-white/50 active:scale-95"
        >
          Retour en haut ↑
        </button>
      </div>
    </footer>
  )
}


