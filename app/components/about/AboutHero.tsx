import React from 'react';
import Link from 'next/link';
import { ChevronRight, Truck, Laptop, Briefcase, Globe } from 'lucide-react';

export default function AboutHero() {
    return (
        <div className="w-full relative overflow-hidden mb-16 bg-slate-50 flex flex-col justify-center min-h-[40vh] max-h-[70vh]">

            {/* Background Graphic Elements - Tilted Rectangles & Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* The main tilted background shape - adjusted for shorter height */}
                <div className="absolute top-[-30%] left-[-10%] w-[120%] h-[160%] bg-[#020617] transform -skew-y-2 origin-top-left z-0"></div>

                {/* Decorative glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 z-0"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand/10 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4 z-0"></div>

                {/* Faint Floating Graphics for B2B theme - Scaled down for 70vh */}
                <div className="absolute top-12 left-[10%] text-white/5 transform -rotate-12 blur-[1px]">
                    <Briefcase size={80} strokeWidth={1} />
                </div>
                <div className="absolute top-24 right-[15%] text-white/5 transform rotate-12 blur-[1px]">
                    <Truck size={100} strokeWidth={1} />
                </div>
                <div className="absolute bottom-12 left-[20%] text-white/5 transform rotate-6 blur-[1px]">
                    <Laptop size={70} strokeWidth={1} />
                </div>
                <div className="absolute bottom-8 right-[25%] text-white/5 transform -rotate-6 blur-[1px]">
                    <Globe size={110} strokeWidth={1} />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12 py-12 md:py-16 flex flex-col items-center text-center">

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                    <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span className="text-white">About Us</span>
                </nav>

                {/* <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-brand border-brand/30 text-[10px] uppercase tracking-widest font-bold mb-5 border backdrop-blur-sm shadow-sm">
                    We Are Bell & John
                </span> */}

                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-medium mb-5 leading-tight max-w-4xl drop-shadow-lg">
                    Connecting quality products with global businesses.
                </h1>

                <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed max-w-3xl drop-shadow-sm">
                    We solve the procurement challenges of small and medium businesses by connecting them directly with global manufacturers and delivering right to their doorstep.
                </p>

            </div>
        </div>
    );
}