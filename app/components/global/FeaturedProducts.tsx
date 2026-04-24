"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../products/ProductCard";

const featuredProducts = [
    { id: 1, title: "Target Printable Computer Labels - 100 Sheets", category: "Stationery", image: "/products/printer.jpg" },
    { id: 2, title: "Leitz 180° Hardboard F/S Lever Arch Files", category: "Office Stationery", image: "/products/Arch Files.jpg" },
    { id: 3, title: "HP V241ib FHD 23.8-inch Monitor", category: "Digital Supplies", image: "/products/HP V241ib FHD 23.8-inch Monitor.png" },
    { id: 4, title: "3M Post-it Canary Yellow Sticky Notes", category: "Office Stationery", image: "/products/3M Post-it Canary Yellow Sticky Notes.avif" },
    { id: 5, title: "Ergonomic Corporate Workspace Chair", category: "Office Furniture", image: "/banner-products/meeting-table.png" },
];

export default function FeaturedProducts() {
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
                            <span className="text-[14px] uppercase tracking-[0.3em] font-bold text-brand">Industry Standards</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-medium">Featured Solutions</h2>
                    </div>

                    {/* Navigation - Matching HeroSlider Style */}
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
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="snap-start">
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}