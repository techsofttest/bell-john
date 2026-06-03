"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Check, Globe } from "lucide-react";
import { useRegion } from "@/app/context/RegionContext";
import { STORAGE_URL } from "@/app/data/products";

export default function RegionSelectorModal() {
    const { countries, selectedCountry, selectCountry, isLoading, logoUrl } = useRegion();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && countries.length > 0) {
            // Only show the popup for first-time users (no saved country).
            // Once they select a region it's persisted in localStorage + cookie,
            // so selectedCountry will be hydrated on subsequent visits and
            // the popup won't appear again.
            if (!selectedCountry) {
                setIsOpen(true);
            }
        }
    }, [isLoading, selectedCountry, countries]);

    if (isLoading || !isOpen || countries.length === 0) return null;

    return (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[999] flex items-center justify-center p-4 font-sans select-none animate-fade-in">
            {/* Ambient background glows for high-fidelity luxury effect */}
            <div className="absolute w-[450px] h-[450px] bg-brand/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse duration-[6000ms]"></div>
            <div className="absolute w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none -z-10 translate-x-20 -translate-y-20"></div>

            {/* Modal Dialog Frame */}
            <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] max-w-[440px] w-full p-8 border border-white/50 shadow-[0_32px_80px_-16px_rgba(0,128,200,0.12),_0_0_1px_rgba(0,128,200,0.15)] relative overflow-hidden animate-scale-up">
                
                {/* Decorative glowing header background border element */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand/20 via-accent/30 to-brand/20"></div>

                {/* Close Button */}
                {selectedCountry && (
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="absolute right-5 top-5 p-2 rounded-full hover:bg-slate-100/80 text-slate-400 hover:text-slate-800 transition-all duration-300 active:scale-90"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                {/* Brand Logo Header with custom glowing illustration wrapper */}
                <div className="flex flex-col items-center text-center mt-2">
                    <div className="relative mb-6">
                        {/* Soft glowing badge behind globe icon */}
                        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner relative group-hover:scale-110 transition-transform duration-500">
                            <Globe className="w-8 h-8 text-brand animate-spin-slow" strokeWidth={1.2} />
                            <div className="absolute inset-0 rounded-full bg-brand/5 blur-sm opacity-50"></div>
                        </div>
                    </div>

                    <div className="relative w-32 h-8 mb-3">
                        <Image
                            src={logoUrl}
                            alt="Bell & John Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-serif font-semibold text-slate-900 tracking-tight">
                        Select Your Region
                    </h2>
                    <p className="text-slate-500 text-xs mt-2 mb-8 max-w-[280px] leading-relaxed font-normal">
                        Welcome to Bell & John. Please choose your logistics market region to enable customized localized sourcing.
                    </p>
                </div>

                {/* Region Options Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {countries.map((country) => {
                        const isSelected = selectedCountry?.code.toLowerCase() === country.code.toLowerCase();
                        // Flag URL from backend storage
                        const flagUrl = `${STORAGE_URL}/countries/${country.name.toLowerCase()}.png`;

                        return (
                            <button
                                key={country.id}
                                onClick={() => {
                                    selectCountry(country.code);
                                    setIsOpen(false);
                                }}
                                className={`group border-2 p-5 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 relative text-center h-[155px] hover:scale-[1.03] hover:-translate-y-0.5 focus:outline-none
                                    ${isSelected 
                                        ? "border-brand bg-brand/[0.02] shadow-lg shadow-brand/5" 
                                        : "border-slate-100 hover:border-slate-300 hover:bg-slate-50/20"
                                    }`}
                            >
                                {/* Flag with custom shadowed capsule */}
                                <div className="relative w-14 h-9 rounded-lg overflow-hidden shadow-md border border-slate-150 transition-transform duration-300 group-hover:scale-105 shrink-0">
                                    <Image 
                                        src={flagUrl} 
                                        alt={`${country.name} Flag`} 
                                        fill 
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900 group-hover:text-brand transition-colors">
                                        {country.name}
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                                        {country.code.toUpperCase()} Market
                                    </p>
                                </div>

                                {isSelected ? (
                                    <div className="absolute top-3 right-3 w-5 h-5 bg-brand text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg shadow-brand/20 z-10 animate-bounce-once">
                                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                    </div>
                                ) : (
                                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Subtitle Footer info bar */}
                <div className="mt-8 pt-5 border-t border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-[280px] mx-auto">
                        Your sourcing catalog and shipping options will adapt to your selected country. Adjust settings dynamically in the header menu anytime.
                    </p>
                </div>
            </div>
        </div>
    );
}
