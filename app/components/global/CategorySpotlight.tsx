"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, BarChart3, Briefcase } from "lucide-react"; // Imported briefcase
import ProductCard, { ProductCardProps } from "../products/ProductCard";

// Mock Data specific to a high-value category, with unique dynamic tags
const spotlightProducts: ProductCardProps[] = [
    {
        id: 101,
        title: "HP Color LaserJet Pro Multifunction Printer",
        category: "Office Machines",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600",
        tag: { label: "High Volume", icon: <Sparkles size={12} />, scheme: 'premium' }
    },
    {
        id: 102,
        title: "Fellowes Powershred 99Ci Cross-Cut Shredder",
        category: "Office Machines",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600",
        tag: { label: "Best Selling", icon: <BarChart3 size={12} />, scheme: 'bestSeller' }
    },
    {
        id: 103,
        title: "Epson EcoTank L15150 A3 Wi-Fi Duplex",
        category: "Office Machines",
        image: "/products/Epson EcoTank L15150 A3 Wi-Fi Duplex.jpg"
        // Optional tag: standard scheme used as default if tag object exists without scheme
    },
    {
        id: 104,
        title: "GBC Fusion 5000L A3 Laminator",
        category: "Office Machines",
        image: "/products/GBC Fusion 5000L A3 Laminator.jpg",
        tag: { label: "Speed Lam", icon: <Briefcase size={12} />, scheme: 'price' }
    },
    {
        id: 105,
        title: "Canon imageRUNNER ADVANCE DX",
        category: "Office Machines",
        image: "/products/Canon imageRUNNER ADVANCE DX.webp",
        tag: { label: "Enterprise Ready", icon: <Briefcase size={12} />, scheme: 'standard' }
    },
    {
        id: 106,
        title: "Brother P-Touch Professional Label Maker",
        category: "Office Machines",
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=600"
    },
];

export default function CategorySpotlight() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="py-20 bg-slate-50 overflow-hidden border-t border-slate-100">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- Tiered Title & Controls --- */}
                <div className="flex justify-between items-end mb-12 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-[1px] bg-brand"></span>
                            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-brand">Category Spotlight</span>
                        </div>
                        <h2 className="font-serif text-xl md:text-3xl text-slate-900 font-medium">
                            Office Machines
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Navigation Buttons */}
                        <button
                            onClick={() => scroll("left")}
                            className="w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-900 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all shadow-sm active:scale-95"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-900 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all shadow-sm active:scale-95"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* --- The Seamless Carousel --- */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth 
           [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 pt-4"
                >
                    {spotlightProducts.map((product) => (
                        <div key={product.id} className="snap-start">
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>

                {/* --- Bottom Centered CTA --- */}
                <div className="mt-8 flex justify-center">
                    <Link
                        href="/products/category/office-machines"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:text-brand hover:border-brand/30 hover:shadow-sm transition-all duration-300 group active:scale-95"
                    >
                        View Full Catalog
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>

            </div>
        </section>
    );
}