"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

const promos = [
    {
        id: 1,
        tagline: "Workspace Upgrade",
        title: "Ergonomic Seating Solutions",
        description: "Discover our premium range of executive and task chairs designed for 24/7 corporate comfort and posture support.",
        buttonText: "Explore Chairs",
        link: "/products/category/office-furniture",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 2,
        tagline: "Enterprise Tech",
        title: "High-Volume Printing",
        description: "Secure, fast, and highly efficient multifunction printers and copiers built for the demands of semi-government and oil sector operations.",
        buttonText: "View Machines",
        link: "/products/category/office-machines",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 3,
        tagline: "Executive Suites",
        title: "Architectural Desking",
        description: "From collaborative workstations to premium executive tables, elevate your office aesthetics with uncompromised build quality.",
        buttonText: "Browse Tables",
        link: "/products/category/office-furniture",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 4,
        tagline: "Digital Infrastructure",
        title: "Corporate Workstations",
        description: "Deploy reliable, high-performance desktop computers and networking essentials to keep your workforce connected and secure.",
        buttonText: "Shop Computers",
        link: "/products/category/digital-supplies",
        image: "/products/Canon imageRUNNER ADVANCE DX.webp",
    }
];

export default function PromoBanner() {
    const [current, setCurrent] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
    }, []);

    useEffect(() => {
        const interval = setInterval(nextSlide, 6000); // Rotates every 6 seconds
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <section className="w-full bg-white py-12">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* The Banner Container */}
                <div className="relative h-[450px] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-2xl flex">

                    {promos.map((promo, index) => {
                        const isActive = index === current;

                        return (
                            <div
                                key={promo.id}
                                className={`absolute inset-0 w-full h-full flex flex-col md:flex-row transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                                    }`}
                            >

                                {/* Left Side: Typography & Call to Action */}
                                <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-10 md:p-16 lg:p-20 relative z-20">
                                    <div
                                        className={`transition-all duration-1000 delay-200 transform ${isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-8 h-[1px] bg-brand"></span>
                                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">
                                                {promo.tagline}
                                            </span>
                                        </div>

                                        <h2 className="font-serif text-3xl lg:text-4xl text-white mb-4 leading-tight">
                                            {promo.title}
                                        </h2>

                                        <p className="text-slate-300 text-sm lg:text-base leading-relaxed mb-8 max-w-md font-light">
                                            {promo.description}
                                        </p>

                                        <Link href={promo.link}>
                                            {/* Reusing your custom Button component */}
                                            <Button variant="primary" className="border-none">
                                                {promo.buttonText}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Right Side: Image with smooth scale effect */}
                                <div className="hidden md:block w-1/2 h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent z-10 w-32"></div>
                                    <Image
                                        src={promo.image}
                                        alt={promo.title}
                                        fill
                                        sizes="(max-width: 768px) 0px, 50vw"
                                        className={`object-cover transition-transform duration-[10000ms] ease-out ${isActive ? "scale-105" : "scale-100"
                                            }`}
                                        priority={index === 0}
                                    />
                                </div>

                            </div>
                        );
                    })}

                    {/* Minimalist Progress Indicators */}
                    <div className="absolute bottom-6 left-10 md:left-16 lg:left-20 z-30 flex gap-3">
                        {promos.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className="group py-2"
                                aria-label={`Go to promo ${index + 1}`}
                            >
                                <div
                                    className={`h-[2px] transition-all duration-500 rounded-full ${current === index ? "w-8 bg-white" : "w-4 bg-slate-600 group-hover:bg-slate-400"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}