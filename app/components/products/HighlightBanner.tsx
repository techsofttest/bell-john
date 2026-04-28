"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const highlightSlides = [
    {
        id: 1,
        tag: "Highlighted Solution",
        title: "Ergonomic Excellence.",
        description: "Upgrade your corporate office with our new line of Herman Miller-inspired seating.",
        image: "/banner-products/meeting-table.png",
        link: "/products/category/office-furniture"
    },
    {
        id: 2,
        tag: "New Arrival",
        title: "Next-Gen Enterprise Printing.",
        description: "Experience ultra-fast, high-volume printing with the latest Canon imageRUNNER series.",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1600",
        link: "/products/category/office-machines"
    },
    {
        id: 3,
        tag: "Best Seller",
        title: "Premium Sustainable Stationery.",
        description: "Switch to our eco-friendly line of recycled paper and biodegradable accessories.",
        image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=1600",
        link: "/products/category/stationery"
    }
];

export default function HighlightBanner() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % highlightSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % highlightSlides.length);
    const prevSlide = () => setCurrent((prev) => (prev === 0 ? highlightSlides.length - 1 : prev - 1));

    return (
        // Standard E-commerce Heights: h-[250px] on mobile, h-[320px] on desktop
        <div className="relative w-full h-[250px] md:h-[320px] rounded-xl overflow-hidden mt-6 mb-12 shadow-lg group border border-slate-100">

            {/* Crossfading Slides */}
            {highlightSlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />

                    {/* Slightly tighter gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/70 to-transparent"></div>

                    {/* Tighter Content Area */}
                    <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center w-full md:w-2/3 lg:w-1/2">
                        <span className="inline-block py-1 px-3 rounded-full bg-brand/20 text-brand text-[10px] uppercase tracking-widest font-bold mb-3 w-max backdrop-blur-sm">
                            {slide.tag}
                        </span>

                        <h3 className="text-2xl md:text-3xl text-white font-serif font-medium mb-3 leading-tight drop-shadow-md line-clamp-2">
                            {slide.title}
                        </h3>

                        <p className="text-slate-300 text-xs md:text-sm font-light mb-6 max-w-sm leading-relaxed drop-shadow-sm line-clamp-2">
                            {slide.description}
                        </p>

                        <Link
                            href={slide.link}
                            className="inline-flex items-center gap-2 bg-brand text-white w-max px-6 py-2.5 rounded-md text-[11px] uppercase tracking-widest font-bold hover:bg-white hover:text-brand transition-all duration-300 group/btn shadow-md"
                        >
                            View Collection
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            ))}

            {/* Manual Controls */}
            <div className="absolute inset-y-0 right-4 flex flex-col justify-center gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
                <button onClick={prevSlide} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-brand transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextSlide} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-brand transition-colors">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Navigation Dots (Moved tighter to the bottom) */}
            <div className="absolute bottom-4 left-6 md:left-10 flex gap-2 z-20">
                {highlightSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`transition-all duration-500 rounded-full ${index === current ? "w-6 h-1 bg-brand" : "w-1.5 h-1 bg-white/40 hover:bg-white/70"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}