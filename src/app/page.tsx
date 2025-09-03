import Navigation from '@/components/layout/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}