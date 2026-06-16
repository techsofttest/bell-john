import Link from "next/link";
import { ChevronRight, Filter, ArrowLeft } from "lucide-react";
import ProductCard from "@/app/components/products/ProductCard";
import SidebarFilter from "@/app/components/products/SidebarFilter";
import SortDropdown from "@/app/components/products/SortDropdown";
import { notFound } from "next/navigation";
import { getCategoryDetails, getProducts } from "@/app/data/products";
import { cookies } from "next/headers";

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
    const currentSubSlug = resolvedParams?.subSlug || "unknown";
    const sortBy = resolvedSearchParams?.sort || "newest";
    const filterSub = resolvedSearchParams?.sub;

    const cookieStore = await cookies();
    const currentCountry = cookieStore.get("bj_selected_country")?.value || "";

    // Fetch SubCategory Details
    const categoryData = await getCategoryDetails(currentSubSlug);
    if (!categoryData) {
        notFound();
    }
    
    // Fetch Parent Category for breadcrumb
    const parentCategoryData = await getCategoryDetails(currentSlug);
    if (!parentCategoryData) {
        notFound();
    }

    // Map API category details to Sidebar category tree structure
    const subCategoryInfo = {
        title: categoryData.name,
        slug: categoryData.slug,
        parentCategory: { title: parentCategoryData.name, slug: parentCategoryData.slug },
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

    // Build API query parameters
    const paramsMap: Record<string, string> = {
        sub_category: currentSubSlug,
        per_page: "all",
        sort: sortBy
    };

    if (currentCountry) {
        paramsMap.country = currentCountry;
    }

    if (filterSub) {
        paramsMap.sub_sub_category = filterSub;
    }

    // Fetch products
    const { products, total } = await getProducts(paramsMap);

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
                                {subCategoryInfo.title} <span className="text-sm font-normal text-slate-500 ml-2">({total} Items)</span>
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
                    {/* Mobile Sort Dropdown */}
                    <div className="lg:hidden mt-4 pt-4 border-t border-slate-100">
                        <SortDropdown />
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-6 flex flex-col lg:flex-row gap-6">

                {/* Left Sidebar Component */}
                <SidebarFilter 
                    categoryTree={subCategoryInfo} 
                    currentSlug={`${subCategoryInfo.parentCategory.slug}/${subCategoryInfo.slug}`}
                />

                {/* Right Content Area */}
                <main className="flex-1 w-full overflow-hidden">
                    
                    {/* Render Results */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                        {products.map((product: any) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>

                    {/* Empty State Fallback */}
                    {products.length === 0 && (
                        <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white">
                            <p className="text-slate-400 text-sm italic">No products found matching the criteria.</p>
                            <Link href={`/products/category/${subCategoryInfo.parentCategory.slug}/${subCategoryInfo.slug}`} className="mt-4 inline-block text-brand font-bold text-xs uppercase tracking-widest hover:underline">
                                Reset Filters
                            </Link>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}