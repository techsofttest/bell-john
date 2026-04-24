"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock Data: 4 Core Categories + 2 Extras to demonstrate the carousel scaling
const categories = [
    {
        id: 'stationery',
        title: "Stationery",
        image: "/category/stationery.jpg"
    },
    {
        id: 'digital-supplies',
        title: "Digital Supplies",
        image: "/category/Digital Supplies.jpg"
    },
    {
        id: 'office-machines',
        title: "Office Machines",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 'office-furniture',
        title: "Office Furniture",
        image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 'breakroom',
        title: "Breakroom",
        image: "/category/Breakroom.jpg"
    },
    {
        id: 'packing-materials',
        title: "Packing Materials",
        image: "/category/packing supplies.jpg"
    },
];

export default function CoreCategories() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            // Scroll by 2-3 items at a time
            const scrollTo = direction === "left" ? scrollLeft - (clientWidth / 2) : scrollLeft + (clientWidth / 2);
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="py-16 bg-[#F8FAFC]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- Header & Controls --- */}
                <div className="flex justify-between items-center mb-10">
                    <h2 className="font-serif text-2xl md:text-3xl text-slate-900 font-medium">
                        Explore by Category
                    </h2>

                    {/* Minimal Carousel Controls */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="w-9 h-9 rounded-md bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all shadow-sm active:scale-95"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-9 h-9 rounded-md bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all shadow-sm active:scale-95"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* --- The Category Carousel --- */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory scroll-smooth 
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                     pb-4"
                >
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products/category/${category.id}`}
                            className="group flex flex-col items-center w-[140px] md:w-[180px] flex-shrink-0 snap-start outline-none"
                        >
                            {/* Image Container: Premium Soft Square */}
                            <div className="w-full aspect-square bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative mb-4 group-hover:shadow-md group-hover:border-brand/30 transition-all duration-300">
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 140px, 180px"
                                />
                                {/* Subtle dark gradient to make it feel grounded */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Category Title */}
                            <h3 className="text-sm md:text-base font-semibold text-slate-700 text-center group-hover:text-brand transition-colors">
                                {category.title}
                            </h3>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}