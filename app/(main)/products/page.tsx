import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Importing Global Components
import CoreCategories from "@/app/components/global/CoreCategories";
import PromoBanner from "@/app/components/global/PromoBanner";

// Importing Product-Specific Components
import HighlightBanner from "@/app/components/products/HighlightBanner";
import ProductCarousel from "@/app/components/products/ProductCarousel";
import ProductCard from "@/app/components/products/ProductCard";

import { getProductsByCategory, getCategories, searchProducts } from "@/app/data/products";
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

interface PageProps {
    searchParams: Promise<{
        search?: string;
    }>;
}

export default async function AllProductsPage({ searchParams }: PageProps) {
    const cookieStore = await cookies();
    const currentCountry = cookieStore.get("bj_selected_country")?.value || "";
    const resolvedSearchParams = await searchParams;
    const searchQuery = resolvedSearchParams?.search || "";

    // If search query exists, fetch search results
    if (searchQuery.trim()) {
        const searchResults = await searchProducts(searchQuery, currentCountry);
        const [categories] = await Promise.all([getCategories()]);

        return (
            <div className="bg-white min-h-screen pb-12">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-8 lg:pt-10">
                    {/* 1. Page Title & Breadcrumbs */}
                    <div className="mb-8">
                        <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/products" className="hover:text-brand transition-colors">All Products</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-slate-800">Search Results</span>
                        </nav>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="font-serif text-3xl md:text-5xl text-slate-900 font-medium">
                                    Search Results
                                </h1>
                                <p className="text-slate-600 mt-2">
                                    Found <span className="font-semibold text-slate-900">{searchResults.length}</span> products for &ldquo;<span className="font-semibold text-slate-900">{searchQuery}</span>&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 2. Search Results Grid */}
                    {searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {searchResults.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    category={product.category}
                                    image={product.image}
                                    availability={product.availability}
                                    tag={product.tag}
                                    variants={product.variants}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
                            <p className="text-slate-600 mb-6">
                                We couldn't find any products matching your search. Try different keywords or browse our categories.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link
                                    href="/products"
                                    className="inline-flex px-6 py-2 bg-brand text-white font-semibold rounded-lg hover:bg-brand/90 transition-colors"
                                >
                                    Browse All Products
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex px-6 py-2 border border-brand text-brand font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

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
                <ProductCarousel
                    title="Office Stationery"
                    categorySlug="stationery"
                    products={stationeryProducts}
                />

                {/* 5. Second Category Carousel */}
                <ProductCarousel
                    title="Digital Supplies & IT"
                    categorySlug="digital-supplies"
                    products={digitalProducts}
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
                    products={furnitureProducts}
                />

                {/* 8. Fourth Category Carousel */}
                <ProductCarousel
                    title="Breakroom & Janitorial"
                    categorySlug="breakroom"
                    products={breakroomProducts}
                />

            </div>
        </div>
    );
}
