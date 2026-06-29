import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 1500

export default function ParticleField({ mouse }: { mouse: React.MutableRefObject<{x:number;y:number}> }) {
  const ref = useRef<THREE.Points>(null!)
  const [pos, vel, off] = useMemo(() => {
    const p = new Float32Array(COUNT*3), v: {x:number;y:number;z:number}[] = [], o: number[] = []
    for(let i=0; i<COUNT; i++){ const r=2+Math.random()*4, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1)
      p[i*3]=r*Math.sin(ph)*Math.cos(th); p[i*3+1]=r*Math.sin(ph)*Math.sin(th); p[i*3+2]=r*Math.cos(ph)
      v.push({x:(Math.random()-.5)*.005,y:(Math.random()-.5)*.005,z:(Math.random()-.5)*.005}); o.push(Math.random()*Math.PI*2)}
    return [p,v,o]
  }, [])
  let t = 0
  useFrame((_, delta) => {
    t += delta
    const arr = ref.current.geometry.attributes.position.array as Float32Array
    const mx = (mouse.current.x/window.innerWidth)*2-1, my = -(mouse.current.y/window.innerHeight)*2+1
    for(let i=0; i<COUNT; i++){ const i3=i*3
      arr[i3] += vel[i].x + Math.sin(t*.3+off[i])*.008
      arr[i3+1] += vel[i].y + Math.cos(t*.2+off[i]*1.7)*.006
      arr[i3+2] += vel[i].z + Math.sin(t*.15+off[i]*2.3)*.004
      const dx=arr[i3]-mx*4, dy=arr[i3+1]-my*3, d=Math.sqrt(dx*dx+dy*dy)+.001, f=Math.min(.03/(d*1.5),.02)
      arr[i3] -= dx*f; arr[i3+1] -= dy*f
      const dc = Math.sqrt(arr[i3]**2+arr[i3+1]**2+arr[i3+2]**2)
      if(dc>6){ const n=6/dc; arr[i3]*=n; arr[i3+1]*=n; arr[i3+2]*=n }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={COUNT} array={pos} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.04} color="#e8702a" transparent opacity={0.8} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  )
}
