import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Showcase from './components/Showcase'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Hero />
      <Services />
      <About />
      <Showcase />
    </div>
  )
}
