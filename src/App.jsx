import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import InvestRegions from './components/InvestRegions.jsx'
import WhyChoose from './components/WhyChoose.jsx'
import FeaturedListings from './components/FeaturedListings.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import GroupServices from './components/GroupServices.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'
import { SearchProvider } from './context/SearchContext.jsx'

export default function App() {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />
          <InvestRegions />
          <WhyChoose />
          <FeaturedListings />
          <HowItWorks />
          <GroupServices />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </SearchProvider>
  )
}
