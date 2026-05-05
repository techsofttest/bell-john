import Link from "next/link";
import { ChevronRight, Sparkles, BarChart3, Tag, Package, Coffee } from "lucide-react";

// Importing Global Components
import CoreCategories from "@/app/components/global/CoreCategories";
import PromoBanner from "@/app/components/global/PromoBanner";

// Importing Product-Specific Components
import HighlightBanner from "@/app/components/products/HighlightBanner";
import ProductCarousel from "@/app/components/products/ProductCarousel";

// --- EXPANDED MOCK DATA --- 
const mockStationery = [
    { id: 1, title: "Premium A4 Copy Paper - 500 Sheets", category: "Stationery", image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600", tag: { label: "Best Seller", icon: <BarChart3 size={12} />, scheme: "bestSeller" as const } },
    { id: 2, title: "Leitz 180° Hardboard F/S Lever Arch Files", category: "Stationery", image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600", tag: { label: "New", icon: <Sparkles size={12} />, scheme: "new" as const } },
    { id: 3, title: "Pilot G2 Premium Gel Pens (Pack of 12)", category: "Stationery", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600" },
    { id: 4, title: "3M Post-it Canary Yellow Sticky Notes", category: "Stationery", image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600" },
    { id: 5, title: "Moleskine Classic Ruled Notebook Large", category: "Stationery", image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600", tag: { label: "Premium", icon: <Sparkles size={12} />, scheme: "premium" as const } },
    { id: 101, title: "Staedtler Lumocolor Whiteboard Marker", category: "Stationery", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600" },
    { id: 102, title: "Double A Copy Paper A4 80GSM", category: "Stationery", image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600", tag: { label: "Best Seller", scheme: "bestSeller" as const } },
];

const mockDigital = [
    { id: 6, title: "HP V241ib FHD 23.8-inch Monitor", category: "Digital Supplies", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600", tag: { label: "Top Rated", icon: <Tag size={12} />, scheme: "standard" as const } },
    { id: 7, title: "Logitech MX Master 3S Wireless Mouse", category: "Digital Supplies", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600", tag: { label: "Top Rated", icon: <Sparkles size={12} />, scheme: "new" as const } },
    { id: 8, title: "SanDisk 1TB Extreme Portable SSD", category: "Digital Supplies", image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=6000" },
    { id: 9, title: "APC Back-UPS Battery Backup & Surge Protector", category: "Digital Supplies", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600" },
    { id: 103, title: "Samsung 980 Pro 2TB NVMe SSD", category: "Digital Supplies", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600" },
    { id: 104, title: "Dell UltraSharp 27 4K USB-C Hub Monitor", category: "Digital Supplies", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600", tag: { label: "Professional", scheme: "premium" as const } },
];

const mockFurniture = [
    { id: 10, title: "Herman Miller Aeron Ergonomic Chair", category: "Office Furniture", image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600", tag: { label: "Premium", icon: <Sparkles size={12} />, scheme: "premium" as const } },
    { id: 11, title: "Steelcase Series 1 Office Chair", category: "Office Furniture", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=600" },
    { id: 12, title: "Vari Electric Standing Desk 60x30", category: "Office Furniture", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600", tag: { label: "Best Seller", icon: <BarChart3 size={12} />, scheme: "bestSeller" as const } },
    { id: 13, title: "Maharam Design Studio Acoustic Panels", category: "Office Furniture", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600" },
    { id: 105, title: "Fully Jarvis Bamboo Standing Desk", category: "Office Furniture", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600", tag: { label: "Eco Friendly", scheme: "new" as const } },
    { id: 106, title: "Humanscale Freedom Headrest Chair", category: "Office Furniture", image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600", tag: { label: "Premium", scheme: "premium" as const } },
];

const mockBreakroom = [
    { id: 14, title: "Nespresso Momento Coffee Machine", category: "Breakroom", image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600", tag: { label: "Essentials", icon: <Coffee size={12} />, scheme: "standard" as const } },
    { id: 15, title: "Eco-Friendly Compostable Paper Cups (1000ct)", category: "Breakroom", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600" },
    { id: 16, title: "Purell Advanced Hand Sanitizer Dispenser", category: "Breakroom", image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=600", tag: { label: "Safety", icon: <Sparkles size={12} />, scheme: "new" as const } },
    { id: 17, title: "Bounty Select-A-Size Paper Towels (12 Rolls)", category: "Breakroom", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=600" },
    { id: 107, title: "Keurig K-2500 Commercial Coffee Maker", category: "Breakroom", image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600", tag: { label: "Best Seller", scheme: "bestSeller" as const } },
    { id: 108, title: "Clorox Disinfecting Wipes Bulk Pack", category: "Breakroom", image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=600" },
];


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



// -----------------

export default function AllProductsPage() {
    return (
        <div className="bg-white min-h-screen pb-12">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-8 lg:pt-10">

                {/* 1. Page Title & Breadcrumbs */}
                <div className="mb-6">
                    <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                        <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-800">All Products</span>
                    </nav>
                    <h1 className="font-serif text-3xl md:text-5xl text-slate-900 font-medium">
                        Product Catalog
                    </h1>
                </div>

                {/* 2. Highlight Slider Banner */}
                <HighlightBanner />

            </div>

            {/* 3. Core Categories (Title hidden as requested) */}
            <CoreCategories hideTitle={true} />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16">

                {/* 4. First Category Carousel */}
                <ProductCarousel
                    title="Office Stationery"
                    categorySlug="stationery"
                    products={mockStationery}
                />

                {/* 5. Second Category Carousel */}
                <ProductCarousel
                    title="Digital Supplies & IT"
                    categorySlug="digital-supplies"
                    products={mockDigital}
                />

            </div>

            {/* 6. Promo Banner Interruption */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 my-10">
                <PromoBanner offers={mockOffers} />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* 7. Third Category Carousel */}
                <ProductCarousel
                    title="Corporate Office Furniture"
                    categorySlug="office-furniture"
                    products={mockFurniture}
                />

                {/* 8. Fourth Category Carousel */}
                <ProductCarousel
                    title="Breakroom & Janitorial"
                    categorySlug="breakroom"
                    products={mockBreakroom}
                />

            </div>
        </div>
    );
}
