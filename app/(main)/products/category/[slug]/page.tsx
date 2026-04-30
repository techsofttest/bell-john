import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";
import ProductCard from "@/app/components/products/ProductCard";
import SidebarFilter from "@/app/components/products/SidebarFilter";
import TrendingCategories from "@/app/components/products/TrendingCategories";
import FeaturedBrands from "@/app/components/products/FeaturedBrands";

// --- TEMPORARY MOCK DATA ---
const mockCategoryInfo = {
    title: "Office Stationery & Supplies",
    slug: "stationery",
    subCategories: [
        {
            title: "Paper & Notebooks", slug: "paper-notebooks", count: 142,
            children: [
                { title: "A4 Copy Paper", slug: "a4-copy-paper", count: 12 },
                { title: "Executive Notebooks", slug: "executive-notebooks", count: 45 },
            ]
        },
        {
            title: "Writing Instruments", slug: "writing-instruments", count: 89,
            children: [
                { title: "Premium Pens", slug: "premium-pens", count: 24 },
                { title: "Highlighters", slug: "highlighters", count: 15 },
            ]
        },
        { title: "Filing & Folders", slug: "filing-folders", count: 210, children: [] },
        { title: "Desk Accessories", slug: "desk-accessories", count: 56, children: [] }
    ]
};

const mockProducts = [
    { id: 1, title: "Premium A4 Copy Paper - 500 Sheets", category: "Paper & Notebooks", image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600", tag: { label: "Best Seller", scheme: "bestSeller" as const } },
    { id: 2, title: "Pilot G2 Premium Gel Pens (Pack of 12)", category: "Writing Instruments", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600", tag: { label: "Standard", scheme: "standard" as const } },
    { id: 3, title: "Leitz 180° Hardboard Lever Arch Files", category: "Filing & Folders", image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600", tag: { label: "43% OFF", scheme: "price" as const } },
    { id: 4, title: "Moleskine Classic Ruled Notebook Large", category: "Paper & Notebooks", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", tag: { label: "Premium", scheme: "premium" as const } },
];

// Note: Using `any` temporarily for params to bypass TS errors between Next 14 and 15
export default async function CategoryListingPage({ params }: { params: any }) {
    // 1. Safely await the params to ensure compatibility with Next.js 15
    const resolvedParams = await params;
    const currentSlug = resolvedParams?.slug || "unknown";

    // REMOVED the `notFound()` check temporarily so we don't get blocked!

    const categoryInfo = mockCategoryInfo;
    const products = mockProducts;

    return (
        <div className="bg-[#F4F5F7] min-h-screen pb-24 font-sans">

            {/* Breadcrumbs & Header Strip */}
            <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
                    <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-2">
                        <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/products" className="hover:text-brand transition-colors">Categories</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-800">{categoryInfo.title}</span>
                    </nav>
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl md:text-2xl text-slate-900 font-bold">
                            {categoryInfo.title} <span className="text-sm font-normal text-slate-500 ml-2">({products.length} Items)</span>
                        </h1>
                        <button className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 rounded-md text-xs font-bold text-slate-700">
                            <Filter className="w-3 h-3" /> Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-6 flex flex-col lg:flex-row gap-6">

                {/* Left Sidebar Component */}
                <SidebarFilter categoryTree={categoryInfo} currentSlug={currentSlug} />

                {/* Right Content Area */}
                <main className="flex-1 w-full overflow-hidden">

                    {/* Featured Products Grid */}
                    <div className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4 px-2">Featured Products</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                            {products.length > 0 ? (
                                products.map((product: any) => (
                                    <ProductCard key={product.id} {...product} />
                                ))
                            ) : (
                                <p className="text-slate-500 col-span-full py-8 text-center text-sm">No products found in this category.</p>
                            )}
                        </div>
                    </div>

                    <TrendingCategories categories={[
                        { title: "Ink Tank Printers", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=200", slug: "printers", discount: "UP TO 40% OFF" },
                        { title: "Office Chairs", image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=200", slug: "chairs", discount: "UP TO 60% OFF" }
                    ]} />
                    <FeaturedBrands brands={["EPSON", "HP", "CANON"]} />

                </main>
            </div>
        </div>
    );
}