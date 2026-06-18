import { Link } from 'react-router-dom'
import MainHero from '../components/LandingPage/MainHero'
import About from '../components/LandingPage/About'
import Adotar from '../components/LandingPage/Adotar'
import Testemunhos from '../components/LandingPage/Testemunhos'
import CTA from '../components/LandingPage/CTA'
import Footer from '../components/Footer/Footer'


function Home() {
  return (
    <>
      <MainHero />
      <About />
      <Adotar />
      <Testemunhos />
      <CTA />
      <Footer />
    </>
  )
}

export default Home
