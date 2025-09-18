import Header from "../Landing/header"
import HeroSection from "../Landing/hero-section"
import HowItWorksSection from "../Landing/how-it-works-section"
import CommunityMapSection from "../Landing/community-map-section"
import RewardsSection from "../Landing/rewards-section"
import Footer from "../Landing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <CommunityMapSection />
        <RewardsSection />
      </main>
      <Footer />
    </div>
  )
}
