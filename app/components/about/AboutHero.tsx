import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export default function AboutHero() {
    return (
        <div className="w-full bg-white pt-4 lg:pt-8 pb-16">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Bento Grid Hero - Rounded */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border border-slate-200 rounded-3xl overflow-hidden">
                    {/* Main Title Card */}
                    <div className="md:col-span-7 p-8 md:p-16 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-center bg-white">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3 text-slate-400" />
                            <span className="text-slate-950">About Us</span>
                        </nav>
                        
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-900 font-medium mb-6 tracking-tight leading-[0.9]">
                            About <span className="text-brand">Us</span>
                        </h1>
                        <p className="text-brand text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                            Over two decades of trust, built across the GCC.
                        </p>
                    </div>

                    {/* Secondary Content Card */}
                    <div className="md:col-span-5 flex flex-col">
                        <div className="p-8 md:p-12 border-b border-slate-200 bg-slate-50/50 flex-1 flex items-center">
                            <p className="text-slate-700 text-base md:text-xl font-light leading-relaxed">
                                Bell & John Group is a leading GCC-based provider of office solutions, with more than 20 years of experience supporting businesses.
                            </p>
                        </div>
                        <div className="p-8 md:p-12 flex-1 flex items-center bg-white">
                            <p className="text-slate-700 text-sm md:text-base font-normal leading-relaxed">
                                From our roots in Kuwait to our expanding regional presence, our reputation has been built on a simple principle: delivering the right quality.
                            </p>
                        </div>
                    </div>

                    {/* Full Width Image Card */}
                    <div className="md:col-span-12 relative h-[300px] md:h-[500px] border-t border-slate-200 overflow-hidden group">
                        <Image 
                            src="/about-page/Who We Are.jpg" 
                            alt="Bell & John Heritage" 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-10 left-10 text-white">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 text-brand">Heritage & Vision</p>
                            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">Serving the GCC Since 2003</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}