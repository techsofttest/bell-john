import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";
import ProductCard from "@/app/components/products/ProductCard";
import SidebarFilter from "@/app/components/products/SidebarFilter";
import SortDropdown from "@/app/components/products/SortDropdown";
import HighlightBanner from "@/app/components/products/HighlightBanner"; // Added Import

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
    // --- Paper & Notebooks (10) ---
    { 
        id: 1, 
        title: "Premium A4 Copy Paper - 500 Sheets", 
        category: "Paper & Notebooks", 
        subCategory: "a4-copy-paper", 
        image: "https://plus.unsplash.com/premium_photo-1661761048600-47c32729c628?q=80&w=600", 
        tag: { label: "Best Seller", scheme: "bestSeller" as const }, 
        price: 18.50, 
        availability: "In Stock",
        variants: {
            packaging: ["Single Ream", "Box of 5 Reams", "Pallet (40 Boxes)"]
        }
    },
    { 
        id: 4, 
        title: "Moleskine Classic Ruled Notebook Large", 
        category: "Paper & Notebooks", 
        subCategory: "executive-notebooks", 
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", 
        tag: { label: "Premium", scheme: "premium" as const }, 
        price: 125.00, 
        availability: "In Stock",
        variants: {
            sizes: ["Pocket", "Medium", "Large", "XL"],
            colors: ["Black", "Red", "Navy", "Green"]
        }
    },
    { id: 6, title: "Rhodia DotPad No. 16 - Orange", category: "Paper & Notebooks", subCategory: "executive-notebooks", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 42.00, availability: "In Stock", variants: { packaging: ["Single", "Pack of 5"] } },
    { id: 7, title: "Double A Copy Paper A4 80GSM", category: "Paper & Notebooks", subCategory: "a4-copy-paper", image: "https://plus.unsplash.com/premium_photo-1661761048600-47c32729c628?q=80&w=600", price: 21.75, availability: "Limited Stock", variants: { packaging: ["Box of 5", "Pallet"] } },
    { id: 8, title: "Leuchtturm1917 Hardcover Medium A5", category: "Paper & Notebooks", subCategory: "executive-notebooks", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", tag: { label: "New", scheme: "new" as const }, price: 95.50, availability: "In Stock", variants: { colors: ["Sage", "Stone", "Pacific", "Berry"] } },
    { id: 9, title: "Oxford Black n' Red A4 Wirebound", category: "Paper & Notebooks", subCategory: "executive-notebooks", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 34.25, availability: "In Stock" },
    { id: 10, title: "Navigator Universal A4 80g Paper", category: "Paper & Notebooks", subCategory: "a4-copy-paper", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 19.90, availability: "Out of Stock" },
    { id: 11, title: "Post-it Super Sticky Notes (6 Pads)", category: "Paper & Notebooks", subCategory: "executive-notebooks", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 48.00, availability: "In Stock", variants: { sizes: ["3x3 in", "4x4 in", "4x6 in"] } },
    { id: 12, title: "Clairefontaine Triomphe Stationery", category: "Paper & Notebooks", subCategory: "executive-notebooks", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=600", price: 55.00, availability: "In Stock" },
    { id: 13, title: "Five Star Spiral Notebook 3-Subject", category: "Paper & Notebooks", subCategory: "executive-notebooks", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 28.75, availability: "In Stock" },

    // --- Writing Instruments (10) ---
    { id: 2, title: "Pilot G2 Premium Gel Pens (Pack of 12)", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", tag: { label: "Standard", scheme: "standard" as const }, price: 72.00, availability: "In Stock", variants: { colors: ["Black", "Blue", "Red"], packaging: ["Box of 12", "Bulk 72"] } },
    { id: 14, title: "Parker Jotter Ballpoint Pen - Blue", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", tag: { label: "Classic", scheme: "premium" as const }, price: 85.00, availability: "In Stock", variants: { colors: ["Silver", "Gold", "Black"] } },
    { id: 15, title: "Lamy Safari Fountain Pen - Charcoal", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", price: 145.00, availability: "In Stock", variants: { sizes: ["Fine", "Medium", "Extra Fine"] } },
    { id: 16, title: "Uni-ball Onyx Rollerball Pens (12pk)", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", price: 38.50, availability: "In Stock" },
    { id: 17, title: "Sharpie Permanent Markers - Fine Point", category: "Writing Instruments", subCategory: "markers", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600", tag: { label: "Popular", scheme: "bestSeller" as const }, price: 45.00, availability: "In Stock", variants: { packaging: ["Set of 12", "Set of 24"] } },
    { id: 18, title: "Staedtler Triplus Fineliners (20 Colors)", category: "Writing Instruments", subCategory: "highlighters", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600", price: 92.00, availability: "Limited Stock" },
    { id: 19, title: "Pentel EnerGel RTX Retractable Pens", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", price: 58.00, availability: "In Stock" },
    { id: 20, title: "Faber-Castell Grip 2011 Mechanical Pencil", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", price: 65.00, availability: "In Stock", variants: { sizes: ["0.3mm", "0.5mm", "0.7mm"] } },
    { id: 21, title: "Zebra Sarasa Clip 0.5mm Retractable", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", price: 42.50, availability: "In Stock" },
    { id: 22, title: "Cross Classic Century Medalist Pen", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", price: 285.00, availability: "In Stock" },
 
    // --- Filing & Folders (10) ---
    { id: 3, title: "Leitz 180° Hardboard Lever Arch Files", category: "Filing & Folders", subCategory: "filing-folders", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", tag: { label: "43% OFF", scheme: "price" as const }, price: 14.25, availability: "In Stock", variants: { sizes: ["50mm", "75mm", "80mm"], colors: ["Black", "Blue", "Red", "Green"] } },
    { id: 23, title: "Esselte Vivida Presentation Display Book", category: "Filing & Folders", subCategory: "filing-folders", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 28.50, availability: "In Stock", variants: { sizes: ["20 Pockets", "40 Pockets", "60 Pockets"] } },
    { id: 24, title: "Rexel Crystal Clear Expanding Wallet", category: "Filing & Folders", subCategory: "filing-folders", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 12.00, availability: "In Stock" },
    { id: 25, title: "Snopake Polyfile A4 Clear (5 Pack)", category: "Filing & Folders", subCategory: "filing-folders", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 35.00, availability: "In Stock" },
    { id: 26, title: "Elba Strong-Line Lever Arch File Blue", category: "Filing & Folders", subCategory: "filing-folders", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 16.75, availability: "Limited Stock" },
    { id: 27, title: "Smead Hanging Folders 1/5-Cut Tab", category: "Filing & Folders", subCategory: "filing-folders", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 85.00, availability: "In Stock" },
    { id: 28, title: "Pukka Pad Ring Binder A4 2-Ring", category: "Filing & Folders", subCategory: "filing-folders", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 24.50, availability: "In Stock" },
    { id: 29, title: "Bankers Box Earth Series Storage Box", category: "Filing & Folders", subCategory: "filing-folders", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 115.00, availability: "In Stock", variants: { sizes: ["Standard", "Large", "Maxi"] } },
    { id: 30, title: "Fellowes Bankers Box Transfer File", category: "Filing & Folders", subCategory: "filing-folders", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 95.00, availability: "In Stock" },
    { id: 31, title: "Office Depot L-Shaped Plastic Pockets", category: "Filing & Folders", subCategory: "filing-folders", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 42.00, availability: "In Stock", variants: { packaging: ["Pack of 25", "Pack of 100"] } },
 
    // --- Desk Accessories (10) ---
    { id: 5, title: "Deli Mesh Desk Organizer (Black)", category: "Desk Accessories", subCategory: "desk-accessories", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=600", price: 58.50, availability: "In Stock" },
    { id: 32, title: "Durable Varicolor 5-Drawer Set", category: "Desk Accessories", subCategory: "desk-accessories", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=600", tag: { label: "Premium", scheme: "premium" as const }, price: 425.00, availability: "In Stock" },
    { id: 33, title: "Fellowes I-Spire Document Lift", category: "Desk Accessories", subCategory: "desk-accessories", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=800", price: 85.00, availability: "Limited Stock" },
    { id: 34, title: "Leitz WOW Stapler - Metallic Blue", category: "Desk Accessories", subCategory: "desk-accessories", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=600", price: 68.00, availability: "In Stock", variants: { colors: ["Metallic Blue", "Metallic Red", "Metallic Green"] } },
    { id: 35, title: "Rexel Joy Tape Dispenser - Pink", category: "Desk Accessories", subCategory: "desk-accessories", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=600", price: 32.50, availability: "In Stock" },
    { id: 36, title: "Deli Executive Hole Puncher", category: "Desk Accessories", subCategory: "desk-accessories", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=600", price: 48.00, availability: "In Stock" },
    { id: 37, title: "Post-it Notes Cube 76x76mm Pastel", category: "Desk Accessories", subCategory: "desk-accessories", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", price: 24.00, availability: "In Stock" },
    { id: 38, title: "Maped Sensoft Scissor 16cm Blue", category: "Desk Accessories", subCategory: "desk-accessories", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=600", price: 18.50, availability: "In Stock" },
    { id: 39, title: "Rapid S51 Metal Stapler Chrome", category: "Desk Accessories", subCategory: "desk-accessories", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=600", price: 55.00, availability: "In Stock" },
    { id: 40, title: "Helix Oxford Maths Set (Complete)", category: "Desk Accessories", subCategory: "desk-accessories", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=600", price: 45.00, availability: "In Stock" },
];

export default async function CategoryListingPage({
    params,
    searchParams
}: {
    params: any;
    searchParams: any;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const currentSlug = resolvedParams?.slug || "unknown";
    const sortBy = resolvedSearchParams?.sort || "newest";
    const activeSub = resolvedSearchParams?.sub;

    // 1. Calculate Dynamic Counts for Sidebar
    const categoryInfo = {
        ...mockCategoryInfo,
        subCategories: mockCategoryInfo.subCategories.map(sub => ({
            ...sub,
            // Count products in this main sub-category
            count: mockProducts.filter(p => p.category === sub.title).length,
            // Count products in each child sub-sub-category
            children: sub.children.map(child => ({
                ...child,
                count: mockProducts.filter(p => p.subCategory === child.slug).length
            }))
        }))
    };

    // 2. Initial Product Selection & Filtering
    let products = [...mockProducts];

    // Filter by Sub-Sub-Category if 'sub' param is present
    if (activeSub) {
        products = products.filter(p => p.subCategory === activeSub);
    }

    // 3. Implement Sorting Logic
    switch (sortBy) {
        case "newest":
            products.sort((a, b) => Number(b.id) - Number(a.id));
            break;
        case "best-seller":
            products.sort((a, b) => (a.tag?.label === "Best Seller" ? -1 : 1));
            break;
        case "a-z":
            products.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "z-a":
            products.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            products.sort((a, b) => Number(b.id) - Number(a.id));
    }

    // Helper to find sub-category title from slug
    const getSubTitle = (slug: string) => {
        for (const cat of categoryInfo.subCategories) {
            if (cat.slug === slug) return cat.title;
            const child = cat.children.find(c => c.slug === slug);
            if (child) return child.title;
        }
        return slug;
    };

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
                        <div className="flex items-center gap-3">
                            <div className="hidden lg:block">
                                <SortDropdown />
                            </div>
                            <button className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors">
                                <Filter className="w-3 h-3" /> Filter
                            </button>
                        </div>
                    </div>
                    {/* Mobile Sort Dropdown */}
                    <div className="lg:hidden mt-4 pt-4 border-t border-slate-100">
                        <SortDropdown />
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-6 flex flex-col lg:flex-row gap-6">

                {/* Left Sidebar Component */}
                <SidebarFilter categoryTree={categoryInfo} currentSlug={currentSlug} />

                {/* Right Content Area */}
                <main className="flex-1 w-full overflow-hidden">

                    {/* Promotional Highlight Banner (Visible only when not filtering) */}
                    {!activeSub && (
                        <div className="mb-10">
                            <HighlightBanner
                                bannerTitle="Bulk Offer on Writing Instruments"
                                bannerSubtitle="UP TO 40% OFF"
                                bannerDescription="Stock up your office with premium gel pens, markers, and executive sets. Valid for B2B accounts."
                                bannerButtonText="Shop Offers"
                                bannerLink={`/products/category/${currentSlug}/writing-instruments`}
                                bannerImage="https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800"
                            />
                        </div>
                    )}

                    {/* Active Filter Header */}
                    {activeSub && (
                        <div className="mb-8 flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Filtering:</span>
                                <span className="px-3 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full border border-brand/20">
                                    {getSubTitle(activeSub)}
                                </span>
                            </div>
                            <Link href={`/products/category/${currentSlug}`} className="text-xs font-bold text-slate-500 hover:text-brand transition-colors underline underline-offset-4">
                                Clear All
                            </Link>
                        </div>
                    )}

                    {/* Render Results */}
                    {activeSub ? (
                        /* --- FILTERED VIEW (Single Grid) --- */
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                            {products.map((product: any) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    ) : (
                        /* --- DEFAULT VIEW (Grouped Sub-Categories) --- */
                        categoryInfo.subCategories.map((subCategory, index) => {
                            const subCategoryProducts = products.filter(p => p.category === subCategory.title);
                            if (subCategoryProducts.length === 0) return null;

                            return (
                                <div key={subCategory.slug} className="mb-16">
                                    {index > 0 && <div className="w-full h-[1px] bg-slate-200 mb-12"></div>}
                                    <div className="flex items-center justify-between mb-6 px-2">
                                        <div className="flex flex-col gap-1">
                                            <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                                                {subCategory.title}
                                            </h2>
                                            <div className="w-12 h-1 bg-brand rounded-full"></div>
                                        </div>
                                        <Link
                                            href={`/products/category/${currentSlug}/${subCategory.slug}`}
                                            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-brand hover:text-slate-900 transition-colors"
                                        >
                                            View All <ChevronRight className="w-3 h-3" strokeWidth={3} />
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                                        {subCategoryProducts.slice(0, 4).map((product: any) => (
                                            <ProductCard key={product.id} {...product} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {/* Empty State Fallback */}
                    {products.length === 0 && (
                        <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white">
                            <p className="text-slate-400 text-sm italic">No products found matching the criteria.</p>
                            <Link href={`/products/category/${currentSlug}`} className="mt-4 inline-block text-brand font-bold text-xs uppercase tracking-widest hover:underline">
                                Reset Category
                            </Link>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}