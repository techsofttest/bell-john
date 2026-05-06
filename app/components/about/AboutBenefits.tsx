"use client";

import React from "react";
import Image from "next/image";
import { StickyNote, Printer, GraduationCap, Briefcase } from "lucide-react";

export default function AboutBenefits() {
    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-24">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-slate-200 pb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-[1px] bg-brand"></div>
                    <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-medium tracking-tight">What We Offer</h2>
                </div>
                <p className="text-slate-800 text-sm md:text-base font-normal max-w-lg">
                    We provide a comprehensive range of everyday business essentials, serving as a single, dependable source for our clients.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-3xl overflow-hidden shadow-sm bg-white">
                {[
                    { 
                        title: "Office Stationery & Supplies", 
                        icon: <StickyNote className="w-8 h-8 text-brand" />,
                        image: "/category/stationery.jpg"
                    },
                    { 
                        title: "Printing & Copier Consumables", 
                        icon: <Printer className="w-8 h-8 text-brand" />,
                        image: "/products/Canon imageRUNNER ADVANCE DX.webp"
                    },
                    { 
                        title: "School & Educational Materials", 
                        icon: <GraduationCap className="w-8 h-8 text-brand" />,
                        image: "/category/Digital Supplies.jpg"
                    },
                    { 
                        title: "Corporate Workspace Solutions", 
                        icon: <Briefcase className="w-8 h-8 text-brand" />,
                        image: "/products/Epson EcoTank L15150 A3 Wi-Fi Duplex.jpg"
                    }
                ].map((item, i) => (
                    <div key={i} className="group flex flex-col h-full bg-white border-r last:border-r-0 border-b sm:border-b-0 border-slate-200 hover:bg-slate-50 transition-all duration-500 overflow-hidden">
                        <div className="h-64 w-full relative overflow-hidden grayscale-[50%] group-hover:grayscale-0 transition-all duration-700">
                            <Image 
                                src={item.image} 
                                alt={item.title} 
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div className="p-8 md:p-10">
                            <div className="mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 w-max origin-left">{item.icon}</div>
                            <h3 className="font-serif text-xl md:text-2xl text-slate-900 font-medium group-hover:text-brand transition-colors leading-tight tracking-tight">
                                {item.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 p-12 border border-slate-200 rounded-3xl text-center relative overflow-hidden group bg-slate-50/50">
                <div className="absolute left-0 top-0 w-2 h-full bg-brand"></div>
                <p className="text-slate-800 text-xl md:text-2xl font-medium italic relative z-10 leading-relaxed max-w-4xl mx-auto">
                    "Everything we supply is selected to keep businesses running smoothly and efficiently."
                </p>
            </div>
        </div>
    );
}