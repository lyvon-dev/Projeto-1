import { useEffect, useState } from 'react'

export function useAnimatedValue(target: number, duration = 1500) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const inc = target / (duration / 16)
    const t = setInterval(() => {
      start += inc
      if (start >= target) { setDisplay(target); clearInterval(t) }
      else setDisplay(start)
    }, 16)
    return () => clearInterval(t)
  }, [target, duration])
  return display
}
