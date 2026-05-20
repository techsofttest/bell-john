import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";
import ProductCard from "@/app/components/products/ProductCard";
import SidebarFilter from "@/app/components/products/SidebarFilter";
import SortDropdown from "@/app/components/products/SortDropdown";
import HighlightBanner from "@/app/components/products/HighlightBanner"; // Added Import

import { notFound } from "next/navigation";
import { getCategoryDetails, getProducts } from "@/app/data/products";
import { cookies } from "next/headers";


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

    // Fetch Category Details and Products from API
    const categoryData = await getCategoryDetails(currentSlug);
    if (!categoryData) {
        notFound();
    }

    // Map API category details to Sidebar category tree structure
    const categoryInfo = {
        title: categoryData.name,
        slug: categoryData.slug,
        subCategories: (categoryData.children || []).map((sub: any) => ({
            title: sub.name,
            slug: sub.slug,
            count: sub.count || 0,
            children: (sub.children || []).map((child: any) => ({
                title: child.name,
                slug: child.slug,
                count: child.count || 0
            }))
        }))
    };

    const cookieStore = await cookies();
    const currentCountry = cookieStore.get("bj_selected_country")?.value || "";

    // Build API query parameters
    const paramsMap: Record<string, string> = {
        category: currentSlug,
        per_page: "100",
        sort: sortBy
    };

    if (currentCountry) {
        paramsMap.country = currentCountry;
    }

    if (activeSub) {
        // If activeSub matches a sub-category slug, filter by sub_category, otherwise sub_sub_category
        const isSubCategory = categoryData.children?.some((sub: any) => sub.slug === activeSub);
        if (isSubCategory) {
            paramsMap.sub_category = activeSub;
        } else {
            paramsMap.sub_sub_category = activeSub;
        }
    }

    // Fetch products
    const { products } = await getProducts(paramsMap);

    // Helper to find sub-category title from slug for filtering indicator
    const getSubTitle = (slug: string) => {
        for (const cat of categoryInfo.subCategories) {
            if (cat.slug === slug) return cat.title;
            const child = cat.children.find((c: any) => c.slug === slug);
            if (child) return child.title;
        }
        return slug;
    };

    return (
        <div className="bg-[#F4F5F7] min-h-screen pb-24 font-sans">

            {/* Breadcrumbs & Header Strip */}
            <div className="bg-white border-b border-slate-200 pt-6 pb-4 lg:pt-8 lg:pb-6 shadow-sm">
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
                        categoryInfo.subCategories.map((subCategory: any, index: number) => {
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