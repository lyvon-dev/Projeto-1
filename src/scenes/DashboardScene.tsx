import { useState, useEffect } from 'react'
import AnimatedValue from '../components/ui/AnimatedValue'
import { getMetrics } from '../services/geologyData'

export default function DashboardScene() {
  const [bars, setBars] = useState(() => Array.from({length:24}, () => Math.random()*80+10))
  useEffect(() => { const t = setInterval(() => setBars(p => [...p.slice(1), Math.random()*80+10]), 2000); return () => clearInterval(t) }, [])
  const metrics = getMetrics()

  return (
    <section className="relative w-full bg-black overflow-hidden py-20">
      <div className="text-center mb-8 px-5">
        <h2 className="text-3xl sm:text-5xl font-playfair italic text-white/90">Centro de Controle</h2>
        <p className="text-white/40 text-sm mt-2">Dados científicos simulados · NASA-style Control Center</p>
      </div>
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((m,i) => (
          <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:bg-white/[0.06] transition-all hover:border-white/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg">{m.icon}</span>
              <span className={`text-xs font-mono ${m.trend==='up'?'text-red-400':m.trend==='down'?'text-blue-400':'text-yellow-400'}`}>
                {m.trend==='up'?'↑':m.trend==='down'?'↓':'→'}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono" style={{color:m.color}}>
              <AnimatedValue target={m.value} /><span className="text-sm text-white/40 ml-1">{m.unit}</span>
            </div>
            <p className="text-xs text-white/50 mt-1">{m.label}</p>
            <div className="mt-3 w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{width:`${Math.min(100, m.value/5)}%`, backgroundColor:m.color}} />
            </div>
          </div>
        ))}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 col-span-2 sm:col-span-3">
          <h3 className="text-sm font-medium text-white/70 mb-4">📊 Atividade Sísmica (últimas 24h)</h3>
          <div className="flex items-end gap-1 h-32">
            {bars.map((h,i) => <div key={i} className="flex-1 rounded-t transition-all duration-500" style={{height:`${h}%`, background:'linear-gradient(to top, #e8702a, #ef4444)', opacity:0.4+(h/100)*0.6}} />)}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-white/30"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div>
        </div>
      </div>
      <div className="text-center mt-8"><span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/30 font-mono">SISTEMA LITHOS v2.0</span></div>
    </section>
  )
}
