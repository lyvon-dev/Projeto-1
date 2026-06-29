import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export function Earth() {
  const ref = useRef<THREE.Mesh>(null!)
  const uniforms = useMemo(() => ({ time: { value: 0 } }), [])
  useFrame((_, d) => { ref.current.rotation.y += d * 0.15; uniforms.time.value += d })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2,64,64]} />
      <shaderMaterial uniforms={uniforms}
        vertexShader={`varying vec2 vUv;varying vec3 vNormal;void main(){vUv=uv;vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`}
        fragmentShader={`uniform float time;varying vec2 vUv;varying vec3 vNormal;float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}void main(){vec2 uv=vUv*4.;float n=noise(uv),n2=noise(uv*2.+1.5);vec3 o=vec3(.02,.06,.18),l=vec3(.12,.35,.08),d=vec3(.55,.42,.18),i=vec3(.85,.9,.95);float m=smoothstep(.35,.65,n+n2*.3),dm=smoothstep(.55,.7,n2),im=smoothstep(.7,.85,n+n2*.2);vec3 c=mix(o,l,m);c=mix(c,d,dm*m*.5);c=mix(c,i,im*.6);float rim=1.-max(0.,dot(vNormal,vec3(0.,0.,1.)));c+=vec3(.3,.6,1.)*pow(rim,3.)*.15;float li=smoothstep(.7,.9,noise(uv*3.+time*.05));c=mix(c,vec3(1.,.8,.3),li*(1.-m)*.08);gl_FragColor=vec4(c,1.);}`} />
    </mesh>
  )
}

export function Hotspot({ pos, label }: { pos: [number,number,number]; label: string }) {
  const g = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => { const s = 1 + Math.sin(clock.getElapsedTime()*2)*0.3; g.current.scale.setScalar(s) })
  return (
    <group ref={g} position={pos}>
      <mesh><sphereGeometry args={[0.06,16,16]} /><meshBasicMaterial color="#e8702a" /></mesh>
      <Html distanceFactor={4} center><div className="px-2 py-1 bg-black/70 backdrop-blur-sm border border-white/20 rounded text-xs text-white whitespace-nowrap pointer-events-none">{label}</div></Html>
    </group>
  )
}

export function Stars() {
  const p = useMemo(() => { const a = new Float32Array(3000*3); for(let i=0;i<3000;i++){a[i*3]=(Math.random()-.5)*200;a[i*3+1]=(Math.random()-.5)*200;a[i*3+2]=(Math.random()-.5)*200} return a }, [])
  return (<points><bufferGeometry><bufferAttribute attach="attributes-position" count={3000} array={p} itemSize={3} /></bufferGeometry><pointsMaterial size={0.15} color="#fff" transparent opacity={0.8} /></points>)
}
