interface Props { era: { name: string; period: string; color: string; icon: string; desc: string }; active: boolean }

export default function TimelineEra({ era, active }: Props) {
  return (
    <div className="relative h-48 rounded-xl mx-2 transition-all duration-500"
      style={{ width: '25%', background: `linear-gradient(180deg, ${era.color}33, transparent)`, border: active ? `1px solid ${era.color}88` : '1px solid rgba(255,255,255,0.05)' }}>
      <div className="absolute top-3 left-4">
        <span className="text-2xl">{era.icon}</span>
        <h3 className="text-white font-medium text-sm mt-1">{era.name}</h3>
        <p className="text-white/40 text-xs">{era.period}</p>
      </div>
      {active && <p className="absolute bottom-3 left-4 text-xs text-white/60 pr-4">{era.desc}</p>}
    </div>
  )
}
