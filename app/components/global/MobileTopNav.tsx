"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";

interface MobileTopNavProps {
    onOpenSideMenu: () => void;
}

export default function MobileTopNav({ onOpenSideMenu }: MobileTopNavProps) {
    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const regionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
                setIsRegionOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="lg:hidden bg-white border-b border-slate-100 px-4 h-16 flex items-center justify-between sticky top-0 z-[150]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
                <div className="relative w-32 h-10">
                    <Image
                        src="/logo/logo.png"
                        alt="Bell & John Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </div>
            </Link>

            <div className="flex items-center gap-2">
                {/* Region Dropdown */}
                <div className="relative cursor-pointer" ref={regionRef}>
                    <button 
                        onClick={() => setIsRegionOpen(!isRegionOpen)}
                        className="flex items-center gap-2 hover:bg-slate-50 px-3 py-2 rounded-lg transition-all focus:outline-none"
                    >
                        <Image src="https://flagcdn.com/w20/kw.png" width={22} height={15} alt="Kuwait Flag" className="rounded-sm shadow-sm" />
                        <span className="text-xs font-bold text-slate-700">KWD</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isRegionOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    {isRegionOpen && (
                        <div className="absolute top-[calc(100%+4px)] right-0 w-44 bg-white border border-slate-100 shadow-2xl rounded-xl p-1 z-[160] animate-fade-in">
                            <button 
                                onClick={() => setIsRegionOpen(false)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 transition-colors text-left font-semibold text-xs rounded-lg"
                            >
                                <Image src="https://flagcdn.com/w20/kw.png" width={20} height={14} alt="Kuwait Flag" />
                                Kuwait (KWD)
                            </button>
                            <button 
                                onClick={() => setIsRegionOpen(false)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 transition-colors text-left font-semibold text-xs rounded-lg"
                            >
                                <Image src="https://flagcdn.com/w20/ae.png" width={20} height={14} alt="UAE Flag" />
                                UAE (AED)
                            </button>
                        </div>
                    )}
                </div>

                {/* Hamburger */}
                <button
                    onClick={onOpenSideMenu}
                    className="p-2.5 bg-slate-50 rounded-xl text-slate-700 hover:text-brand hover:bg-brand/5 transition-all active:scale-95"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
