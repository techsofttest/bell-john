"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Tag } from "lucide-react";

export interface PromoOffer {
    id: string | number;
    tagline: string;
    title: string;
    description: string;
    link: string;
    image: string;
}

interface PromoBannerProps {
    offers: PromoOffer[];
}

export default function PromoBanner({ offers }: PromoBannerProps) {
    const [current, setCurrent] = useState(0);

    // Auto-play functionality
    useEffect(() => {
        if (!offers || offers.length === 0) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % offers.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [offers]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % offers.length);
    const prevSlide = () => setCurrent((prev) => (prev === 0 ? offers.length - 1 : prev - 1));

    if (!offers || offers.length === 0) return null;

    return (
        <div className="relative w-full h-[250px] md:h-[320px] rounded-xl overflow-hidden shadow-lg group border border-slate-100">

            {/* Crossfading Slides */}
            {offers.map((offer, index) => (
                <div
                    key={offer.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                >
                    {/* Full Bleed Background Image */}
                    <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />

                    {/* Deep Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/70 to-transparent"></div>

                    {/* Content Area */}
                    <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center w-full md:w-2/3 lg:w-1/2">
                        {/* Offer Tag - Now Blue */}
                        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 w-max backdrop-blur-sm mb-3">
                            <Tag className="w-3 h-3" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">
                                {offer.tagline}
                            </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl text-white font-serif font-medium mb-3 leading-tight drop-shadow-md line-clamp-2">
                            {offer.title}
                        </h3>

                        <p className="text-slate-300 text-xs md:text-sm font-light mb-6 max-w-sm leading-relaxed drop-shadow-sm line-clamp-2">
                            {offer.description}
                        </p>

                        <Link
                            href={offer.link}
                            className="inline-flex items-center gap-2 bg-white text-slate-900 w-max px-6 py-2.5 rounded-md text-[11px] uppercase tracking-widest font-bold hover:bg-brand hover:text-white transition-all duration-300 group/btn shadow-md"
                        >
                            Claim Offer
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            ))}

            {/* Manual Controls */}
            {offers.length > 1 && (
                <div className="absolute inset-y-0 right-4 flex flex-col justify-center gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
                    <button onClick={prevSlide} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-brand transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={nextSlide} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-brand transition-colors">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Navigation Dots - Active dot is now Blue */}
            {offers.length > 1 && (
                <div className="absolute bottom-4 left-6 md:left-10 flex gap-2 z-20">
                    {offers.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`transition-all duration-500 rounded-full ${index === current ? "w-6 h-1 bg-blue-500" : "w-1.5 h-1 bg-white/40 hover:bg-white/70"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}