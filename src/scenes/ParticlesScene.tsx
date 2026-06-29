import { useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import ParticleField from '../components/3d/ParticleField'

export default function ParticlesScene() {
  const mouse = useRef({x:0,y:0})
  const move = useCallback((e: React.MouseEvent) => { mouse.current = {x:e.clientX, y:e.clientY} }, [])
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden" onMouseMove={move}>
      <div className="absolute top-8 left-0 right-0 z-10 text-center pointer-events-none">
        <h2 className="text-3xl sm:text-5xl font-playfair italic text-white/90">Partículas Científicas</h2>
        <p className="text-white/50 text-sm mt-2">Mova o mouse para interagir · Sedimentos em movimento orgânico</p>
      </div>
      <Canvas camera={{ position:[0,0,5], fov:60 }}>
        <ParticleField mouse={mouse} />
        <mesh><sphereGeometry args={[1.8,32,32]} /><meshBasicMaterial color="#1a3a5c" transparent opacity={0.08} wireframe /></mesh>
      </Canvas>
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-6 text-xs text-white/40">
        <span>✦ Sedimentos</span><span>✦ Gravidade leve</span><span>✦ Movimento orgânico</span>
      </div>
    </section>
  )
}
