import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Importing Global Components
import CoreCategories from "@/app/components/global/CoreCategories";
import PromoBanner from "@/app/components/global/PromoBanner";

// Importing Product-Specific Components
import HighlightBanner from "@/app/components/products/HighlightBanner";
import ProductCarousel from "@/app/components/products/ProductCarousel";

import { getProductsByCategory, getCategories } from "@/app/data/products";
import { cookies } from "next/headers";

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

export default async function AllProductsPage() {
    const cookieStore = await cookies();
    const currentCountry = cookieStore.get("bj_selected_country")?.value || "";

    // Fetch products for each category in parallel from our Laravel API
    const [stationeryProducts, digitalProducts, furnitureProducts, breakroomProducts, categories] = await Promise.all([
        getProductsByCategory("stationery", 8, currentCountry),
        getProductsByCategory("digital-supplies", 8, currentCountry),
        getProductsByCategory("office-furniture", 8, currentCountry),
        getProductsByCategory("breakroom", 8, currentCountry),
        getCategories(),
    ]);

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
            {categories.length > 0 && (
                <CoreCategories hideTitle={true} categories={categories} />
            )}

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16">

                {/* 4. First Category Carousel */}
                {stationeryProducts.length > 0 && (
                    <ProductCarousel
                        title="Office Stationery"
                        categorySlug="stationery"
                        products={stationeryProducts}
                    />
                )}

                {/* 5. Second Category Carousel */}
                {digitalProducts.length > 0 && (
                    <ProductCarousel
                        title="Digital Supplies & IT"
                        categorySlug="digital-supplies"
                        products={digitalProducts}
                    />
                )}

            </div>

            {/* 6. Promo Banner Interruption */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 my-10">
                <PromoBanner offers={mockOffers} />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* 7. Third Category Carousel */}
                {furnitureProducts.length > 0 && (
                    <ProductCarousel
                        title="Corporate Office Furniture"
                        categorySlug="office-furniture"
                        products={furnitureProducts}
                    />
                )}

                {/* 8. Fourth Category Carousel */}
                {breakroomProducts.length > 0 && (
                    <ProductCarousel
                        title="Breakroom & Janitorial"
                        categorySlug="breakroom"
                        products={breakroomProducts}
                    />
                )}

            </div>
        </div>
    );
}
