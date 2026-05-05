"use client";

import React from "react";
import Image from "next/image";

export default function AboutContent() {
    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-24">
            {/* Header Section */}
            <div className="border-l-4 border-brand pl-6 mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-medium tracking-tight">Our Journey</h2>
                <p className="text-slate-500 text-sm mt-2 font-light">The evolution of Bell & John across the region.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-200 rounded-3xl overflow-hidden">
                {/* Kuwait Office */}
                <div className="group border-b md:border-b-0 md:border-r border-slate-200 bg-white">
                    <div className="relative h-[350px] overflow-hidden grayscale-[30%] group-hover:grayscale-0 transition-all duration-700">
                        <Image 
                            src="/about-page/Who We Are.jpg" 
                            alt="Bell & John Kuwait" 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute top-8 left-8">
                            <div className="px-5 py-2 bg-white text-[11px] font-bold uppercase tracking-widest text-slate-900 border border-slate-200 rounded-full shadow-sm">
                                Est. 2003
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-10 md:p-14">
                        <h3 className="font-serif text-3xl text-slate-900 font-medium mb-6 group-hover:text-brand transition-colors tracking-tight">
                            Kuwait · Bell & John Trading Co. W.L.L.
                        </h3>
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
                            Our Kuwait operations have earned the long-standing trust of semi-government organizations, oil companies, educational institutions, and the healthcare sector. Here, reliability is not just a promise — it is a proven track record built over two decades.
                        </p>
                    </div>
                </div>

                {/* UAE Office */}
                <div className="group bg-white">
                    <div className="relative h-[350px] overflow-hidden grayscale-[30%] group-hover:grayscale-0 transition-all duration-700">
                        <Image 
                            src="/about-page/warehouse interior.jpg" 
                            alt="Bell & John UAE" 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute top-8 left-8">
                            <div className="px-5 py-2 bg-white text-[11px] font-bold uppercase tracking-widest text-slate-900 border border-slate-200 rounded-full shadow-sm">
                                Est. 2013
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-10 md:p-14">
                        <h3 className="font-serif text-3xl text-slate-900 font-medium mb-6 group-hover:text-brand transition-colors tracking-tight">
                            UAE · Bell & John General Trading Co. L.L.C.
                        </h3>
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
                            Established to expand our regional footprint, our UAE entity drives exports and distribution across the GCC. With competitive sourcing, efficient logistics, and dependable delivery, we ensure our clients receive exactly what they need, when they need it.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}