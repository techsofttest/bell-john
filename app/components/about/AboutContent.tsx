"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutContent() {
    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-20">
            <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-4">
                <h2 className="font-serif text-2xl md:text-3xl text-slate-900 font-medium">Who We Are & What We Do</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Large Featured Card (Who We Are) */}
                <div className="lg:col-span-8 group cursor-pointer bg-slate-50/50 rounded-xl p-4 md:p-6 border border-slate-100 hover:shadow-md transition-all">
                    <div className="relative h-[250px] md:h-[350px] rounded-lg overflow-hidden mb-6 bg-slate-200">
                        <Image src="/about-page/Who We Are.jpg" alt="Office" width={800} height={600} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-sm mb-3 w-max inline-block">
                        Who We Are
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-slate-900 font-medium mb-4 group-hover:text-brand transition-colors">
                        A leading office solution provider rooted in Kuwait.
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-light mb-4">
                        Bell & John Trading Co. W.L.L is recognized as one of the region's leading office solution providers, originating in the state of Kuwait. We help our customers build precise and effective working environments.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed font-light mb-6">
                        Our company stands proud among industry peers as we provide premium office supplies that perfectly blend with customer satisfaction. Whether our customer needs quality office furniture, daily stationery essentials, or the latest technology supplies, we have got it all covered under one roof.
                    </p>
                    {/* <div className="flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:text-brand transition-colors">
                        Read more <ArrowRight className="w-4 h-4" />
                    </div> */}
                </div>

                {/* Small Side Cards (What We Do) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Top Side Card */}
                    <div className="group cursor-pointer bg-slate-50/50 rounded-xl p-4 border border-slate-100 hover:shadow-md transition-all flex-grow">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-sm mb-3 w-max inline-block">
                            Supply
                        </span>
                        <h3 className="font-serif text-lg text-slate-900 font-medium mb-3 group-hover:text-brand transition-colors leading-snug">
                            Comprehensive Corporate Sourcing
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed font-light mb-4">
                            Our supply ranges from office consumable stationery, automation machines and equipment, and printing supplies to a wide variety of corporate office furniture.
                        </p>
                        {/* <div className="flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:text-brand transition-colors mt-auto">
                            Explore Catalog <ArrowRight className="w-3 h-3" />
                        </div> */}
                    </div>

                    {/* Bottom Side Card */}
                    <div className="group cursor-pointer bg-slate-50/50 rounded-xl p-4 border border-slate-100 hover:shadow-md transition-all flex-grow">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-sm mb-3 w-max inline-block">
                            Logistics
                        </span>
                        <h3 className="font-serif text-lg text-slate-900 font-medium mb-3 group-hover:text-brand transition-colors leading-snug">
                            Round-The-Clock Services
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed font-light mb-4">
                            We fuel our customers' dreams by anticipating their needs. We are committed to making life simple round the clock, availing specialized logistics services through our dedicated shipping division.
                        </p>
                        <ul className="grid grid-cols-1 gap-2 mb-4">
                            {['Air, Sea & Land Freight', 'Warehousing', 'Packing & Re-packing', 'Palletization & Crafting', 'Insurance Works', 'Consultancy Service'].map((service, i) => (
                                <li key={i} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                                    <CheckCircle2 className="w-3 h-3 text-brand" />
                                    {service}
                                </li>
                            ))}
                        </ul>
                        {/* <div className="flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:text-brand transition-colors mt-auto">
                            View Services <ArrowRight className="w-3 h-3" />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}