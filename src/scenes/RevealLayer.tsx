import { useEffect, useRef } from 'react'
import { SPOTLIGHT_R } from '../utils/constants'

interface Props { image: string; cursorX: number; cursorY: number }

export default function RevealLayer({ image, cursorX, cursorY }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const size = useRef({ w: window.innerWidth, h: window.innerHeight })

  useEffect(() => {
    const resize = () => {
      size.current = { w: window.innerWidth, h: window.innerHeight }
      if (canvasRef.current) { canvasRef.current.width = size.current.w; canvasRef.current.height = size.current.h }
    }
    resize(); window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current, reveal = revealRef.current
    if (!canvas || !reveal) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { w, h } = size.current
    ctx.clearRect(0, 0, w, h)
    const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.4, 'rgba(255,255,255,1)')
    grad.addColorStop(0.6, 'rgba(255,255,255,0.75)')
    grad.addColorStop(0.75, 'rgba(255,255,255,0.4)')
    grad.addColorStop(0.88, 'rgba(255,255,255,0.12)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.beginPath(); ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2); ctx.fill()
    const url = canvas.toDataURL()
    reveal.style.maskImage = `url(${url})`
    reveal.style.webkitMaskImage = `url(${url})`
    reveal.style.maskSize = '100% 100%'
    reveal.style.webkitMaskSize = '100% 100%'
  }, [cursorX, cursorY])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }} />
      <div ref={revealRef} className="absolute inset-0 bg-center bg-cover bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${image})`, zIndex: 30, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }} />
    </>
  )
}
