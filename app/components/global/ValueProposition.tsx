"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRegion } from "@/app/context/RegionContext";
import { API_URL, STORAGE_URL } from "@/app/data/products";

export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
}

export default function ValueProposition() {
    const { selectedCountry } = useRegion();
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                setIsLoading(true);
                const countryParam = selectedCountry ? `?country=${selectedCountry.code}` : '';
                const res = await fetch(`${API_URL}/categories${countryParam}`);
                if (res.ok) {
                    const json = await res.json();
                    if (json.status === "success" && json.data) {
                        // Display the first 6 main parent categories for a balanced visual grid
                        setCategories(json.data.slice(0, 6));
                    }
                }
            } catch (e) {
                console.error("Failed to load categories for portfolio:", e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCategories();
    }, [selectedCountry]);

    if (isLoading) {
        return (
            <section className="bg-[#020617] py-28 relative overflow-hidden text-white text-center">
                <div className="inline-block w-8 h-8 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                <p className="text-xs text-white/40 mt-2 font-medium">Loading Portfolio...</p>
            </section>
        );
    }

    if (categories.length === 0) {
        return null;
    }

    return (
        <section className="bg-[#020617] py-20 relative overflow-hidden text-white border-t border-white/5">
            {/* Soft decorative glow background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">

                    {/* Left Side: Title & Description */}
                    <div className="w-full lg:w-5/12 text-center lg:text-left pt-4">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                            <span className="w-8 h-[1px] bg-white/30"></span>
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50">Our Portfolio</span>
                        </div>

                        <h2 className="font-serif text-2xl md:text-4xl leading-[1.1] mb-6 font-medium tracking-tight">
                            A Single Source for <br />Business Excellence.
                        </h2>

                        <p className="text-white/60 text-sm md:text-base font-light max-w-md mx-auto lg:mx-0 leading-relaxed">
                            Consistently supporting GCC businesses for over two decades with reliable procurement and timely regional delivery.
                        </p>
                    </div>

                    {/* Right Side: Dynamic Categories List */}
                    <div className="w-full lg:w-7/12 flex flex-col relative">
                        {categories.map((c, index) => {
                            const formattedNum = (index + 1).toString().padStart(2, "0");
                            const categoryImage = c.image 
                                ? encodeImageUrl(c.image, STORAGE_URL)
                                : "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600";

                            return (
                                <Link
                                    key={c.id}
                                    href={`/products?category=${c.slug}`}
                                    onMouseEnter={() => setActiveItem(index)}
                                    onMouseLeave={() => setActiveItem(null)}
                                    className={`group flex items-center py-8 border-white/5 transition-all duration-300 cursor-pointer relative
                                        ${index === 0 ? "border-t" : ""} 
                                        border-b hover:bg-white/[0.02] px-4
                                    `}
                                >
                                    {/* Number label */}
                                    <span className="w-12 text-[10px] font-sans tracking-widest text-white/30 group-hover:text-white transition-colors relative z-20">
                                        {formattedNum}
                                    </span>

                                    {/* Category Title & Arrow */}
                                    <h3 className="flex-grow text-lg md:text-xl font-medium text-white/40 group-hover:text-white transition-all duration-300 flex items-center justify-between relative z-20">
                                        {c.name}
                                        <ArrowUpRight className="w-5 h-5 text-white opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                                    </h3>

                                    {/* Floating Perspective Image */}
                                    <div
                                        className={`absolute top-1/2 left-[40%] -translate-y-1/2 w-48 h-32 rounded-xl overflow-hidden pointer-events-none z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out border border-white/10 origin-center
                                            ${activeItem === index ? "opacity-100 scale-100 rotate-2 translate-x-0" : "opacity-0 scale-90 -rotate-2 -translate-x-8"}
                                        `}
                                    >
                                        <Image
                                            src={categoryImage}
                                            alt={c.name}
                                            fill
                                            sizes="192px"
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/20"></div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}