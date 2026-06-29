import { useAnimatedValue } from '../../hooks/useAnimatedValue'

export default function AnimatedValue({ target, suffix = '' }: { target: number; suffix?: string }) {
  const display = useAnimatedValue(target)
  return <>{display.toFixed(1)}{suffix}</>
}
