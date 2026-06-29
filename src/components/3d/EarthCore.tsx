import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props { layer: { radius: number; color: string }; index: number; visible: boolean }

export default function EarthCore({ layer, index, visible }: Props) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    if (!ref.current) return
    const target = visible ? layer.radius : 0.01
    const current = ref.current.scale.x * layer.radius
    const next = current + (target - current) * 0.05
    ref.current.scale.setScalar(Math.abs(next) / layer.radius)
  })
  return (
    <mesh ref={ref} scale={[0.01,0.01,0.01]}>
      <sphereGeometry args={[layer.radius,48,48]} />
      <meshPhysicalMaterial color={layer.color} transparent opacity={visible ? (index===3 ? 1 : 0.7+index*0.08) : 0} roughness={0.3} metalness={0.4} wireframe={index===0} side={THREE.DoubleSide} />
    </mesh>
  )
}
