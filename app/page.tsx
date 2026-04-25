import HeroSlider from "./components/global/HeroSlider";
import FeaturedProducts from "./components/global/FeaturedProducts";
import CoreCategories from "./components/global/CoreCategories";
import PromoBanner from "./components/global/PromoBanner";
import CategorySpotlight from "./components/global/CategorySpotlight";
import VisionMission from "./components/global/VisionMission";
import ValueProposition from "./components/global/ValueProposition";
import ContactSection from "./components/global/ContactSection";
import MarqueeStrip from "./components/global/MarqueeStrip";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />
      <FeaturedProducts />
      <CoreCategories />
      <PromoBanner />
      <CategorySpotlight />

      <VisionMission />

      <ValueProposition />

      <ContactSection />

      <MarqueeStrip />



    </div>
  );
}