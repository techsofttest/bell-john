"use client";

import React from "react";

export default function AboutGlobal() {
    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-24">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-slate-200 pb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-[1px] bg-brand"></div>
                    <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-medium tracking-tight">
                        Why Clients Choose Us
                    </h2>
                </div>
                <p className="text-slate-800 text-sm md:text-base font-normal max-w-lg md:text-right">
                    Our clients — from semi-government entities to corporate headquarters — continue to choose us because we simplify procurement.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 border border-slate-200 rounded-3xl overflow-hidden mb-20 bg-white shadow-sm">
                <div className="lg:col-span-8 p-10 md:p-16 lg:border-r border-slate-200">
                    <p className="text-slate-800 text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl">
                        Through our strong wholesale, retail, and export network, we ensure consistency you can rely on.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-100 rounded-2xl overflow-hidden shadow-inner">
                        {[
                            "Product availability at all times",
                            "Competitive pricing",
                            "Timely and reliable delivery"
                        ].map((benefit, i) => (
                            <div key={i} className="flex flex-col p-8 bg-slate-50/50 border-r last:border-r-0 border-slate-100 group hover:bg-white transition-all duration-300">
                                <span className="text-brand text-3xl mb-4 font-serif">0{i+1}</span>
                                <span className="text-slate-900 font-medium text-sm md:text-base leading-snug tracking-tight">{benefit}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-14 pt-10 border-t border-slate-100">
                        <p className="text-slate-800 text-base md:text-lg leading-relaxed font-normal italic pl-10 border-l-2 border-brand/30">
                            "Behind every order is a team committed to quality and deeply aware of the operational needs of our customers. It’s this balance of scale, efficiency, and personal attention that sets us apart."
                        </p>
                    </div>
                </div>
                
                <div className="lg:col-span-4 bg-slate-900 p-10 md:p-16 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className="font-serif text-3xl md:text-4xl mb-10 border-b border-white/10 pb-6 tracking-tight relative z-10">Regional Presence</h3>
                    <div className="space-y-12 relative z-10">
                        <div className="group">
                            <p className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-100">UAE Base</p>
                            <p className="text-slate-200 text-base font-normal leading-relaxed">Direct exports and distribution across the GCC from our Dubai hub.</p>
                        </div>
                        <div className="group border-t border-white/5 pt-10">
                            <p className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-100">Kuwait Base</p>
                            <p className="text-slate-200 text-base font-normal leading-relaxed">Trusted partner for semi-government and industrial sectors since 2003.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-12 md:p-16 border border-slate-200 rounded-3xl group hover:bg-slate-50 transition-all duration-500 bg-white">
                    <span className="inline-block py-1.5 px-5 border-2 border-brand text-brand text-[10px] font-bold uppercase tracking-[0.3em] mb-8 rounded-lg">Vision</span>
                    <h3 className="font-serif text-3xl md:text-5xl text-slate-900 mb-8 tracking-tight leading-[1.1]">To be the GCC’s most trusted provider of office solutions.</h3>
                    <p className="text-slate-800 text-lg md:text-xl font-normal leading-relaxed max-w-md">
                        Recognized for reliability, consistent quality, and long-term partnerships across the region.
                    </p>
                </div>
                <div className="p-12 md:p-16 border border-slate-200 rounded-3xl group hover:bg-slate-50 transition-all duration-500 bg-white">
                    <span className="inline-block py-1.5 px-5 border-2 border-brand text-brand text-[10px] font-bold uppercase tracking-[0.3em] mb-8 rounded-lg">Mission</span>
                    <h3 className="font-serif text-3xl md:text-5xl text-slate-900 mb-8 tracking-tight leading-[1.1]">Delivering high-quality products and dependable service.</h3>
                    <p className="text-slate-800 text-lg md:text-xl font-normal leading-relaxed max-w-md">
                        Helping our customers operate more efficiently every day through excellence in supply and logistics.
                    </p>
                </div>
            </div>
        </div>
    );
}