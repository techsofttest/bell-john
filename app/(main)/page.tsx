import HeroSlider from "../components/global/HeroSlider";
import FeaturedProducts from "../components/global/FeaturedProducts";
import CategorySpotlight from "../components/global/CategorySpotlight";
import ClientsGrid from "../components/global/ClientsGrid";
import VisionMission from "../components/global/VisionMission";
import ValueProposition from "../components/global/ValueProposition";
// import ContactSection from "../components/global/ContactSection";
import MarqueeStrip from "../components/global/MarqueeStrip";
import { getProducts, getCategories } from "@/app/data/products";
import { cookies } from "next/headers";

// Mock Offers for the Home Page Promo Banner
const mockOffers = [
  {
    id: 1,
    tagline: "Corporate Solutions",
    title: "Premium A4 Printer Paper in Bulk.",
    description: "Reliable supply for high-volume corporate needs. Standardize your office with our premium 80GSM paper range.",
    link: "/products/category/stationery",
    image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=1200",
  },
  {   
    id: 2,
    tagline: "Furniture Services",
    title: "Free Installation on Office Desks.",
    description: "Complete your workspace setup. Our expert team provides end-to-end delivery and professional assembly for all executive furniture.",
    link: "/products/category/office-furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200",
  }
];

export default async function Home() {
  const cookieStore = await cookies();
  const currentCountry = cookieStore.get("bj_selected_country")?.value || "";

  // Fetch featured products dynamically from the API
  const { products: featuredProducts } = await getProducts({ featured: "true", per_page: "10", country: currentCountry });

  // Fetch categories dynamically
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />

      {featuredProducts.length > 0 && (
        <FeaturedProducts products={featuredProducts} />
      )}

      <CategorySpotlight />

      <ClientsGrid />

      <ValueProposition />

      {/* <ContactSection /> */}

      <MarqueeStrip />

    </div>
  );
}