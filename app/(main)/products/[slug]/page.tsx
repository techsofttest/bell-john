import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/app/data/products";
import ProductDetailsClient from "@/app/components/products/product-detailed-page/ProductDetailsClient";
import ProductCarousel from "@/app/components/products/ProductCarousel";

import { cookies } from "next/headers";

export default async function ProductDetailsPage({
    params
}: {
    params: any;
}) {
    // In Next.js 15, params is a Promise that must be awaited
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) {
        notFound();
    }

    const cookieStore = await cookies();
    const currentCountry = cookieStore.get("bj_selected_country")?.value || "";

    const product = await getProductById(slug, currentCountry);

    if (!product) {
        notFound();
    }

    const relatedProducts = await getRelatedProducts(product, 4, currentCountry);

    return (
        <div className="bg-[#F8FAFC] pb-4">
            {/* Main Interactive Details Client Component */}
            <ProductDetailsClient product={product} />

            {/* Related Products Carousel */}
            {relatedProducts.length > 0 && (
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 mt-4 pb-4">
                    <div className="border-t border-slate-200/60 pt-4">
                        <ProductCarousel 
                            title="Related Solutions" 
                            categorySlug={product.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")} 
                            products={relatedProducts} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
