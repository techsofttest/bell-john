"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button"; // Ensure this path matches your file structure

const slides = [
    {
        id: 1,
        title: "Precision in Every Detail.",
        subtitle: "Architectural office solutions and premium stationery for the modern workspace.",
        ctaPrimary: "View Catalog",
        ctaSecondary: "Our Story",
        image: "/banner-products/printer.png",
    },
    {
        id: 2,
        title: "The Digital Backbone.",
        subtitle: "High-performance storage and networking essentials for seamless enterprise connectivity.",
        ctaPrimary: "Digital Supplies",
        ctaSecondary: "Tech Specs",
        image: "/banner-products/meeting-table.png",
    },
    {
        id: 3,
        title: "Tailored Efficiency.",
        subtitle: "Customized procurement solutions for corporate headquarters across the GCC.",
        ctaPrimary: "Get a Quote",
        ctaSecondary: "Contact Us",
        image: "/banner-products/storage-cab.png",
    }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 7000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-white group">
            {slides.map((slide, index) => {
                const isActive = index === current;

                return (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        {/* Background Image Container */}
                        <div className="absolute inset-0">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                sizes="100vw"
                                className="object-cover transition-transform duration-[8000ms] ease-out scale-100"
                                priority={index === 0}
                            />
                            {/* Sophisticated Minimal Overlay */}
                            <div className="absolute inset-0 bg-black/35"></div>
                        </div>

                        {/* Content Container (Left Aligned) */}
                        <div className="relative z-20 h-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center">
                            <div
                                className={`max-w-xl transition-all duration-1000 delay-300 transform
                                    ${isActive ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}
                                `}
                            >
                                <h1 className="font-serif text-3xl md:text-5xl text-white mb-4 leading-tight font-medium tracking-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-base md:text-lg text-slate-100 mb-8 leading-relaxed font-normal opacity-90 max-w-md">
                                    {slide.subtitle}
                                </p>

                                <div className="flex items-center gap-3">
                                    {/* Primary White Button */}
                                    <Link href="/products">
                                        <Button variant="primary" className="shadow-lg shadow-black/10">
                                            {slide.ctaPrimary}
                                        </Button>
                                    </Link>

                                    {/* Tertiary Ghost Button (White text variant) */}
                                    <Link href="/contact">
                                        <Button variant="tertiary" className="text-white hover:bg-white/10 hover:text-white border border-white/20">
                                            {slide.ctaSecondary}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Navigation - Minimal and Tucked to the Side */}
            <div className="absolute bottom-8 right-12 z-30 flex items-center gap-6">
                <div className="flex space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`transition-all duration-500 h-0.5 rounded-full ${current === index ? "w-10 bg-white" : "w-5 bg-white/20"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={prevSlide}
                        className="w-10 h-10 rounded-md border border-white/60 bg-white/5 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all active:scale-95"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-10 h-10 rounded-md border border-white/60 bg-white/5 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all active:scale-95"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}