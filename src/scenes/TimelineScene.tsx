import { useRef, useState } from 'react'
import TimelineEra from '../components/science/TimelineEra'
import { getEras } from '../services/geologyData'

export default function TimelineScene() {
  const scrollRef = useRef<HTMLDivElement>(null!)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const eras = getEras()
  const scrollTo = (i: number) => {
    setActive(i)
    const targets = [0, 0.25, 0.55, 0.78]
    scrollRef.current.scrollTo({ left: targets[i] * (scrollRef.current.scrollWidth - scrollRef.current.clientWidth), behavior: 'smooth' })
  }

  return (
    <section className="relative w-full bg-black overflow-hidden py-20">
      <div className="text-center mb-12 px-5">
        <h2 className="text-3xl sm:text-5xl font-playfair italic text-white/90">Linha do Tempo Geológica</h2>
        <p className="text-white/40 text-sm mt-2">Arraste para explorar 4.6 bilhões de anos</p>
      </div>
      <div className="w-full h-1 bg-white/5 mb-8"><div className="h-full bg-[#e8702a] transition-all duration-200" style={{ width: `${progress*100}%` }} /></div>
      <div className="flex justify-center gap-4 mb-10 px-5">
        {eras.map((e,i) => (
          <button key={i} onClick={() => scrollTo(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm border transition-all ${active===i ? 'border-[#e8702a] bg-[#e8702a]/10 text-white' : 'border-white/10 text-white/50 hover:border-white/30'}`}>
            <span>{e.icon}</span>{e.name}
          </button>
        ))}
      </div>
      <div ref={scrollRef} onScroll={() => { const p = scrollRef.current.scrollLeft / (scrollRef.current.scrollWidth - scrollRef.current.clientWidth); setProgress(Math.min(1, Math.max(0, p))) }}
        className="flex overflow-x-auto gap-0 pb-8 px-8" style={{ scrollbarWidth:'none' }}>
        <div className="flex gap-0 min-w-[200vw] sm:min-w-[150vw]">
          {eras.map((e,i) => <TimelineEra key={i} era={e} active={active===i} />)}
        </div>
      </div>
    </section>
  )
}
