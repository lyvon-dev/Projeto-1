import KnowledgeCard from '../components/science/KnowledgeCard'
import { getKnowledge } from '../services/geologyData'

export default function KnowledgeScene() {
  const cards = getKnowledge()

  return (
    <section className="relative w-full bg-black overflow-hidden py-20">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize:'60px 60px' }} />
      <div className="relative z-10">
        <div className="text-center mb-12 px-5">
          <h2 className="text-3xl sm:text-5xl font-playfair italic text-white/90">Conhecimento & Engenharia</h2>
          <p className="text-white/40 text-sm mt-2">Ciência dos materiais da Terra · Engenharia inspirada em alta performance</p>
        </div>
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c,i) => <KnowledgeCard key={i} {...c} />)}
        </div>
        <div className="max-w-3xl mx-auto mt-12 px-5">
          <div className="bg-gradient-to-r from-[#e8702a]/10 via-transparent to-transparent border-l-2 border-[#e8702a] rounded-r-xl p-5">
            <p className="text-sm text-white/60 italic leading-relaxed">&ldquo;Assim como a Ferrari projeta cada componente para máxima performance, a Terra desenvolveu materiais com propriedades extraordinárias.&rdquo;</p>
            <p className="text-xs text-white/30 mt-3 font-playfair italic">— LITHOS, Engenharia Inspirada na Terra</p>
          </div>
        </div>
      </div>
    </section>
  )
}
