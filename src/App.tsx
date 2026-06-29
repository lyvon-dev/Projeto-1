import HeroScene from './scenes/HeroScene'
import GlobeScene from './scenes/GlobeScene'
import GeoLayersScene from './scenes/GeoLayersScene'
import ParticlesScene from './scenes/ParticlesScene'
import TimelineScene from './scenes/TimelineScene'
import DashboardScene from './scenes/DashboardScene'
import KnowledgeScene from './scenes/KnowledgeScene'
import GlobalFooter from './components/layout/GlobalFooter'

export default function App() {
  return (
    <main className="bg-black">
      <HeroScene />
      <GlobeScene />
      <GeoLayersScene />
      <ParticlesScene />
      <TimelineScene />
      <DashboardScene />
      <KnowledgeScene />
      <GlobalFooter />
    </main>
  )
}
