import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function MiniGlobe() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, d) => { ref.current.rotation.y += d * 0.3 })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.8,32,32]} />
      <meshPhysicalMaterial color="#2a6b8a" emissive="#1a3a5c" emissiveIntensity={0.3} wireframe transparent opacity={0.6} />
    </mesh>
  )
}
