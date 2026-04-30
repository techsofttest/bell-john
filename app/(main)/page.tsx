import HeroSlider from "../components/global/HeroSlider";
import FeaturedProducts from "../components/global/FeaturedProducts";
import CoreCategories from "../components/global/CoreCategories";
import PromoBanner from "../components/global/PromoBanner";
import CategorySpotlight from "../components/global/CategorySpotlight";
import VisionMission from "../components/global/VisionMission";
import ValueProposition from "../components/global/ValueProposition";
import ContactSection from "../components/global/ContactSection";
import MarqueeStrip from "../components/global/MarqueeStrip";

// Mock Offers for the Home Page Promo Banner
const mockOffers = [
  {
    id: 1,
    tagline: "Bulk Discount",
    title: "20% Off Corporate Printer Paper.",
    description: "Order 50+ reams of premium A4 paper this month and receive an automatic 20% discount applied at checkout.",
    link: "/products/category/stationery",
    image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=1200",
  },
  {
    id: 2,
    tagline: "Flash Sale",
    title: "Free Installation on Office Desks.",
    description: "Equip your new office space. Purchase any 3+ executive desks and our team will deliver and install them for free.",
    link: "/products/category/office-furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200",
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />

      <FeaturedProducts />

      <CoreCategories />

      {/* Promo Banner Interruption with Data */}
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 my-10">
        <PromoBanner offers={mockOffers} />
      </div>

      <CategorySpotlight />

      <VisionMission />

      <ValueProposition />

      <ContactSection />

      <MarqueeStrip />

    </div>
  );
}