export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 mt-auto bg-black py-16 px-6 sm:px-12">
      <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-400 font-sans tracking-widest uppercase">
        <p>© {year} Mathis Saint-Léger. Tous droits réservés.</p>
        <div className="flex items-center gap-8">
          <a
            href="mailto:mathissaint-leger@laposte.net"
            className="text-zinc-400 hover:text-white transition-colors no-underline"
          >
            Email
          </a>
          <a
            href="https://github.com/MathisSaintLeger"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors no-underline"
          >
            GitHub
          </a>
          <a
            href="#about"
            className="text-zinc-400 hover:text-white transition-colors no-underline"
          >
            Haut de page ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
