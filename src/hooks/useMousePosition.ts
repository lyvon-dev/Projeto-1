import { useEffect, useRef, useState } from 'react'

export function useMousePosition(smoothFactor = 0.1) {
  const [pos, setPos] = useState({ x: -999, y: -999 })
  const raw = useRef({ x: -999, y: -999 })
  const smooth = useRef({ x: -999, y: -999 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const handle = (e: MouseEvent) => { raw.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', handle)
    const loop = () => {
      smooth.current.x += (raw.current.x - smooth.current.x) * smoothFactor
      smooth.current.y += (raw.current.y - smooth.current.y) * smoothFactor
      setPos({ x: Math.round(smooth.current.x), y: Math.round(smooth.current.y) })
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', handle); cancelAnimationFrame(raf.current) }
  }, [smoothFactor])

  return pos
        }
