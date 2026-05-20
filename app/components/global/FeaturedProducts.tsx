"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, BarChart3, Tag } from "lucide-react"; // Imported different icons
import ProductCard, { ProductTag } from "../products/ProductCard"; // Imported ProductTag interface

// Pre-define tags for clarity/reuse in mock data
const tags: Record<string, ProductTag> = {
    new: { label: "New", icon: <Sparkles size={12} />, scheme: 'new' },
    bestSeller: { label: "Best Selling", icon: <BarChart3 size={12} />, scheme: 'bestSeller' },
    premium: { label: "Premium Solutions", icon: <Sparkles size={12} />, scheme: 'premium' },
    featured: { label: "Featured", icon: <Tag size={12} />, scheme: 'standard' }
};

interface Product {
    id: string | number;
    title: string;
    category: string;
    image: string;
    tag?: ProductTag;
}

interface FeaturedProductsProps {
    products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- Tiered  Title --- */}
                <div className="flex justify-between items-end mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-[1px] bg-brand"></span>
                            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-brand">Industry Standards</span>
                        </div>
                        <h2 className="font-serif text-xl md:text-3xl text-slate-900 font-medium">Featured Solutions</h2>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-900 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-900 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all active:scale-95"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* --- The Seamless Carousel --- */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth 
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                     "
                >
                    {products.map((product) => (
                        <div key={product.id} className="snap-start py-4 shrink-0 w-[60vw] md:w-[320px] lg:w-[calc(20%-25.6px)]"> {/* Vertical padding for hover shadow */}
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}