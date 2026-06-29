import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import EarthCore from '../components/3d/EarthCore'
import { getLayers } from '../services/geologyData'

export default function GeoLayersScene() {
  const [active, setActive] = useState<number|null>(null)
  const [visible, setVisible] = useState<boolean[]>([false,false,false,false])
  const layers = getLayers()
  const reveal = () => setVisible(p => { const n = [...p]; const f = n.findIndex(v => !v); if(f!==-1) n[f]=true; return n })

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute top-8 left-0 right-0 z-10 text-center">
        <h2 className="text-3xl sm:text-5xl font-playfair italic text-white/90">Camadas da Terra</h2>
        <p className="text-white/50 text-sm mt-2">Clique para revelar cada camada</p>
      </div>
      <button onClick={reveal} className="absolute top-24 left-1/2 -translate-x-1/2 z-20 px-6 py-2 bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm rounded-full transition-all hover:scale-105 active:scale-95">
        {visible.every(Boolean) ? '🔬 Todas reveladas' : '⬇ Revelar camada'}
      </button>
      <Canvas camera={{ position:[0,2,5], fov:45 }}>
        <ambientLight intensity={0.4} /><pointLight position={[5,5,5]} intensity={1} /><pointLight position={[-5,-5,-5]} intensity={0.5} />
        {layers.map((l,i) => <EarthCore key={i} layer={l} index={i} visible={visible[i]} />)}
        <OrbitControls enablePan={false} minDistance={2} maxDistance={8} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      {active !== null && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 max-w-md w-[90%] bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-5">
          <h3 className="text-lg font-playfair italic text-white">{layers[active].name}</h3>
          <p className="text-xs text-white/40 mt-1">{layers[active].depth}</p>
          <p className="text-sm text-white/70 mt-2">{layers[active].desc}</p>
        </div>
      )}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-3 flex-wrap px-4">
        {layers.map((l,i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${visible[i] ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20' : 'bg-white/5 text-white/30 cursor-default'}`}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />{l.name}
          </button>
        ))}
      </div>
    </section>
  )
}
