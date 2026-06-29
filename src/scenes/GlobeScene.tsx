import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Earth, Hotspot, Stars } from '../components/3d/Globe'

const hotspots = [
  { pos: [1.4,0.8,1.2] as [number,number,number], label: '🌋 Andes' },
  { pos: [-1.1,-0.5,1.6] as [number,number,number], label: '🌊 Fossa Marianas' },
  { pos: [-0.3,1.3,1.5] as [number,number,number], label: '🧊 Calota Polar' },
  { pos: [1.8,-0.6,0.5] as [number,number,number], label: '🔥 Anel de Fogo' },
]

export default function GlobeScene() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute top-8 left-0 right-0 z-10 text-center">
        <h2 className="text-3xl sm:text-5xl font-playfair italic text-white/90">Planeta Interativo</h2>
        <p className="text-white/50 text-sm mt-2">Movimente o globo · Hotspots científicos</p>
      </div>
      <Canvas camera={{ position:[0,0,6], fov:45 }}>
        <ambientLight intensity={0.3} /><pointLight position={[10,10,10]} intensity={1.5} />
        <Stars /><Earth />
        {hotspots.map((h,i) => <Hotspot key={i} pos={h.pos} label={h.label} />)}
        <OrbitControls enablePan={false} enableZoom minDistance={3.5} maxDistance={10} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-4">
        {['Placas Tectônicas','Terremotos','Temperatura Global'].map(item => (
          <div key={item} className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs sm:text-sm text-white/60 hover:text-white hover:border-[#e8702a]/50 transition-all cursor-pointer">{item}</div>
        ))}
      </div>
    </section>
  )
}
