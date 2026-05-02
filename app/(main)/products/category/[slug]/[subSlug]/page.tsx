import Link from "next/link";
import { ChevronRight, Filter, ArrowLeft } from "lucide-react";
import ProductCard from "@/app/components/products/ProductCard";
import SidebarFilter from "@/app/components/products/SidebarFilter";
import SortDropdown from "@/app/components/products/SortDropdown";
import { notFound } from "next/navigation";

// --- TEMPORARY MOCK DATA (Ideally fetched from your database) ---
const mockSubCategoryInfo = {
    title: "Writing Instruments",
    slug: "writing-instruments",
    parentCategory: { title: "Office Stationery & Supplies", slug: "stationery" },
    // Notice how the children are now treated as the filterable elements
    subCategories: [
        { title: "Premium Pens", slug: "premium-pens", count: 24, children: [] },
        { title: "Highlighters", slug: "highlighters", count: 15, children: [] },
        { title: "Markers", slug: "markers", count: 50, children: [] },
    ]
};

const mockProducts = [
    { 
        id: 2, 
        title: "Pilot G2 Premium Gel Pens (Pack of 12)", 
        category: "Writing Instruments", 
        subCategory: "premium-pens", 
        image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", 
        tag: { label: "Standard", scheme: "standard" as const }, 
        price: 72.00, 
        availability: "In Stock",
        variants: {
            colors: ["Black", "Blue", "Red", "Green"],
            packaging: ["Standard Box", "Gift Tin"]
        }
    },
    { 
        id: 14, 
        title: "Parker Jotter Ballpoint Pen - Blue", 
        category: "Writing Instruments", 
        subCategory: "premium-pens", 
        image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", 
        tag: { label: "Best Seller", scheme: "bestSeller" as const }, 
        price: 85.00, 
        availability: "In Stock",
        variants: {
            sizes: ["Fine", "Medium", "Broad"],
            colors: ["Silver", "Gold", "Black"]
        }
    },
    { id: 15, title: "Lamy Safari Fountain Pen - Charcoal", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", price: 145.00, availability: "In Stock", variants: { sizes: ["Fine", "Medium"], colors: ["Charcoal", "Red", "Yellow"] } },
    { id: 16, title: "Uni-ball Onyx Rollerball Pens (12pk)", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", price: 38.50, availability: "In Stock" },
    { 
        id: 17, 
        title: "Sharpie Permanent Markers - Fine Point", 
        category: "Writing Instruments", 
        subCategory: "markers", 
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600", 
        tag: { label: "Best Seller", scheme: "bestSeller" as const }, 
        price: 45.00, 
        availability: "In Stock",
        variants: {
            packaging: ["Pack of 5", "Pack of 12", "Bulk 50"]
        }
    },
    { id: 18, title: "Staedtler Triplus Fineliners (20 Colors)", category: "Writing Instruments", subCategory: "highlighters", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600", price: 92.00, availability: "Limited Stock", variants: { packaging: ["Wallet of 20", "Desk Set of 36"] } },
    { id: 19, title: "Pentel EnerGel RTX Retractable Pens", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", price: 58.00, availability: "In Stock", variants: { colors: ["Black", "Blue", "Violet"] } },
    { id: 20, title: "Faber-Castell Grip 2011 Mechanical Pencil", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600", price: 65.00, availability: "In Stock", variants: { sizes: ["0.5mm", "0.7mm"] } },
    { id: 21, title: "Zebra Sarasa Clip 0.5mm Retractable", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600", price: 42.50, availability: "In Stock" },
    { id: 22, title: "Cross Classic Century Medalist Pen", category: "Writing Instruments", subCategory: "premium-pens", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600", price: 285.00, availability: "In Stock" },
];

export default async function SubCategoryListingPage({
    params,
    searchParams
}: {
    params: any;
    searchParams: any;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const currentSlug = resolvedParams?.slug || "unknown";
    const subSlug = resolvedParams?.subSlug || "unknown";
    const sortBy = resolvedSearchParams?.sort || "newest";
    const filterSub = resolvedSearchParams?.sub;

    // 1. Calculate Dynamic Counts for Sidebar
    const subCategoryInfo = {
        ...mockSubCategoryInfo,
        subCategories: mockSubCategoryInfo.subCategories.map((subCat: any) => ({
            ...subCat,
            // In the sub-category page, the top-level items in sidebar are the filters themselves
            count: mockProducts.filter(p => p.subCategory === subCat.slug).length,
            children: (subCat.children || []).map((child: any) => ({
                ...child,
                count: mockProducts.filter(p => p.subCategory === child.slug).length
            }))
        }))
    };

    // 2. Initial Product Selection & Filtering
    let products = [...mockProducts];

    // Filter Logic
    if (filterSub) {
        products = products.filter(p => p.subCategory === filterSub);
    }

    // 3. Sort Logic
    switch (sortBy) {
        case "newest": products.sort((a, b) => Number(b.id) - Number(a.id)); break;
        case "best-seller": products.sort((a, b) => (a.tag?.label === "Best Seller" ? -1 : 1)); break;
        case "a-z": products.sort((a, b) => a.title.localeCompare(b.title)); break;
        case "z-a": products.sort((a, b) => b.title.localeCompare(a.title)); break;
    }

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
                        <Link href={`/products/category/${subCategoryInfo.parentCategory.slug}`} className="hover:text-brand transition-colors">
                            {subCategoryInfo.parentCategory.title}
                        </Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-800">{subCategoryInfo.title}</span>
                    </nav>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href={`/products/category/${subCategoryInfo.parentCategory.slug}`}
                                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                            <h1 className="text-xl md:text-2xl text-slate-900 font-bold">
                                {subCategoryInfo.title} <span className="text-sm font-normal text-slate-500 ml-2">({products.length} Items)</span>
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden lg:block">
                                <SortDropdown />
                            </div>
                            <button className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors">
                                <Filter className="w-3 h-3" /> Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-6 flex flex-col lg:flex-row gap-6">

                {/* Reusing the Sidebar, but passing the sub-category data to act as filters */}
                <SidebarFilter categoryTree={subCategoryInfo} currentSlug={subSlug} />

                {/* Right Content Area - Unified Grid */}
                <main className="flex-1 w-full overflow-hidden">
                    {/* Grid with fallback */}
                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                            {products.map((product: any) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center bg-white rounded-xl border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 text-sm italic">No products match the selected filter.</p>
                            <Link href={subSlug} className="mt-4 inline-block text-brand font-bold text-xs uppercase tracking-widest hover:underline">
                                Clear Filters
                            </Link>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}