interface Props {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function Button({ children, onClick, variant = 'primary', className = '' }: Props) {
  const base = 'text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95'
  const colors = variant === 'primary'
    ? 'bg-[#e8702a] hover:bg-[#d2611f] text-white hover:shadow-lg hover:shadow-[#e8702a]/30'
    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'

  return (
    <button onClick={onClick} className={`${base} ${colors} ${className}`}>
      {children}
    </button>
  )
}
