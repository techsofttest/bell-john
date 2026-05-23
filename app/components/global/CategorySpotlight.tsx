"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { useRegion } from "@/app/context/RegionContext";
import { API_URL, STORAGE_URL, encodeImageUrl } from "@/app/data/products";

export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
}

export default function CategorySpotlight() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { selectedCountry } = useRegion();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchFeatured() {
            try {
                setIsLoading(true);
                const countryParam = selectedCountry ? `?country=${selectedCountry.code}` : '';
                const res = await fetch(`${API_URL}/categories/featured${countryParam}`);
                if (res.ok) {
                    const json = await res.json();
                    if (json.status === 'success' && json.data) {
                        setCategories(json.data);
                    }
                }
            } catch (e) {
                console.error("Failed to fetch featured categories:", e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchFeatured();
    }, [selectedCountry]);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    if (isLoading) {
        return (
            <section className="py-20 bg-slate-50 overflow-hidden border-t border-slate-100">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center py-10">
                    <div className="inline-block w-8 h-8 border-4 border-slate-200 border-t-brand rounded-full animate-spin"></div>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Loading Spotlight...</p>
                </div>
            </section>
        );
    }

    if (categories.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-slate-50 overflow-hidden border-t border-slate-100">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- Tiered Title & Controls --- */}
                <div className="flex justify-between items-end mb-12 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-[1px] bg-brand"></span>
                            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-brand">Spotlight Showcase</span>
                        </div>
                        <h2 className="font-serif text-xl md:text-3xl text-slate-900 font-medium">
                            Featured Categories
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Navigation Buttons */}
                        <button
                            onClick={() => scroll("left")}
                            className="w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-900 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all shadow-sm active:scale-95 animate-fade-in"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-900 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all shadow-sm active:scale-95 animate-fade-in"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* --- The Seamless Carousel --- */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth 
           [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 pt-4 px-1"
                >
                    {categories.map((c) => (
                        <div key={c.id} className="snap-start shrink-0 w-[70vw] md:w-[360px] lg:w-[calc(25%-24px)] animate-fade-in">
                            <Link 
                                href={`/products?category=${c.slug}`}
                                className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white border border-slate-100 hover:border-brand/20 shadow-sm hover:shadow-xl transition-all duration-500 h-[280px] w-full"
                            >
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10"></div>
                                
                                {/* Category Image */}
                                <div className="relative w-full h-full overflow-hidden">
                                    <Image 
                                        src={c.image ? encodeImageUrl(c.image, STORAGE_URL) : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600'} 
                                        alt={c.name}
                                        fill
                                        sizes="(max-width: 768px) 70vw, 360px"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                </div>

                                {/* Text Info Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end text-white">
                                    <div className="flex items-center gap-2 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Sparkles className="w-3.5 h-3.5 text-brand" />
                                        <span className="text-[9px] uppercase tracking-wider font-bold text-brand">Explore Collection</span>
                                    </div>
                                    <h3 className="font-serif text-lg md:text-xl font-medium tracking-wide group-hover:text-brand transition-colors duration-300">
                                        {c.name}
                                    </h3>
                                    {c.description && (
                                        <p className="text-[11px] text-slate-300 font-normal line-clamp-1 mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-500 ease-out">
                                            {c.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* --- Bottom Centered CTA --- */}
                <div className="mt-8 flex justify-center">
                    <Link
                        href="/products"
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