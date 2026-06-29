interface Props { icon: string; title: string; tag: string; desc: string }

export default function KnowledgeCard({ icon, title, tag, desc }: Props) {
  return (
    <div className="group relative bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:bg-white/[0.06] hover:border-[#e8702a]/30 transition-all duration-500 hover:-translate-y-1">
      <span className="text-3xl block mb-4">{icon}</span>
      <span className="text-[10px] uppercase tracking-widest text-[#e8702a]/60 font-medium">{tag}</span>
      <h3 className="text-lg text-white font-medium mt-1">{title}</h3>
      <p className="text-sm text-white/50 mt-2 leading-relaxed">{desc}</p>
    </div>
  )
}
