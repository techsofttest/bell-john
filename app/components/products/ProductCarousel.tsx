"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductCard, { ProductTag } from "./ProductCard";

interface Product {
    id: string | number;
    title: string;
    category: string;
    image: string;
    tag?: ProductTag;
}

interface ProductCarouselProps {
    title: string;
    categorySlug: string;
    products: Product[];
}

export default function ProductCarousel({ title, categorySlug, products }: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <div className="py-10 border-b border-slate-100 last:border-none">

            {/* Header & Controls (Cleaned up, Link removed) */}
            <div className="flex justify-between items-end mb-6 gap-4">
                <h3 className="font-serif text-xl md:text-3xl text-slate-900 font-medium mb-0">
                    {title}
                </h3>

                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="w-9 h-9 rounded-md border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all active:scale-95 shadow-sm"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-9 h-9 rounded-md border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all active:scale-95 shadow-sm"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* The Carousel */}
            <div
                ref={scrollRef}
                className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth 
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-4"
            >
                {products.map((product) => (
                    <div key={product.id} className="snap-start">
                        <ProductCard {...product} />
                    </div>
                ))}
            </div>

            {/* Bottom Centered CTA */}
            <div className="mt-10 flex justify-center">
                <Link
                    href={`/products/category/${categorySlug}`}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:text-brand hover:border-brand/30 hover:shadow-sm transition-all duration-300 group active:scale-95"
                >
                    View All {title}
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>

        </div>
    );
}