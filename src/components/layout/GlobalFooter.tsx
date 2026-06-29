import { Canvas } from '@react-three/fiber'
import MiniGlobe from '../3d/MiniGlobe'

export default function GlobalFooter() {
  return (
    <footer className="relative w-full bg-black border-t border-white/5 overflow-hidden">
      <div className="absolute right-0 top-0 w-48 h-48 opacity-30 pointer-events-none">
        <Canvas camera={{ position:[0,0,2.5], fov:30 }}><ambientLight intensity={0.5} /><MiniGlobe /></Canvas>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-center gap-3 mb-10">
          <svg width="28" height="28" viewBox="0 0 256 256" fill="#e8702a"><path d="M256 256L128 256L0 128L128 128ZM256 128L128 128L0 0L128 0Z"/></svg>
          <div><span className="text-white text-xl font-playfair italic">Lithos</span><p className="text-[10px] text-white/30">Global Geological Intelligence System</p></div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs">
          {['Sobre','Pesquisa','Tecnologia','Equipe','API','Carreiras','Contato'].map(l => <a key={l} href="#" className="text-white/40 hover:text-[#e8702a] transition-colors">{l}</a>)}
        </div>
        <div className="flex justify-center gap-6 mb-8 text-[10px] text-white/20 font-mono">
          <span>USGS</span><span>NASA</span><span>ESA</span><span>UNESCO</span><span>AGU</span>
        </div>
        <div className="text-center border-t border-white/5 pt-6">
          <p className="text-xs text-white/30"><span className="text-[#e8702a]">LITHOS</span> — Global Geological Intelligence System</p>
          <p className="text-[10px] text-white/20 mt-1">Desenvolvido por <span className="text-[#e8702a]">Jonattas</span> — Projeto Escolar Front-End</p>
          <p className="text-[10px] text-white/10 mt-2">© 2025 LITHOS Platform</p>
        </div>
      </div>
    </footer>
  )
}
