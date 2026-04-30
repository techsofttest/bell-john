"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AboutBenefits() {
    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-20 pt-10">
            <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-4">
                <h2 className="font-serif text-2xl md:text-3xl text-slate-900 font-medium">How You Benefit From Us</h2>
                {/* <div className="text-sm font-semibold text-brand flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer">
                    Explore benefits <ArrowRight className="w-4 h-4" />
                </div> */}
            </div>

            <p className="text-slate-500 mb-8 font-light">We streamline your procurement process from global manufacturing to final delivery.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { 
                        tag: "Partnerships", 
                        title: "Direct from Manufacturers", 
                        text: "Professional, mutually profitable partnerships bringing products directly from reputed global manufacturers to wholesalers.",
                        image: "/about-page/Direct from Manufacturers.jpg"
                    },
                    { 
                        tag: "Inventory", 
                        title: "Jebel Ali Central Hub", 
                        text: "Stock is always available in our central warehouse in Jebel Ali Freezone, Dubai. Order as per product movement to avoid dead stock and storage charges.",
                        image: "/about-page/warehouse interior.jpg"
                    },
                    { 
                        tag: "Shipping", 
                        title: "In-House Logistics", 
                        text: "Our division, Bell & John Shipping Co. LLC, is an added advantage ensuring quick and affordable deliveries around the world.",
                        image: "/about-page/In-House Logistics.jpg"
                    },
                    { 
                        tag: "Procurement", 
                        title: "Hassle-Free Ordering", 
                        text: "Choose products online, request quotes, and enjoy quantity discount offers. We happily accept small orders with low Minimum Order Quantities (MOQ).",
                        image: "/about-page/manager's hands using a modern tablet or laptop.jpg"
                    }
                ].map((item, i) => (
                    <div key={i} className="group cursor-pointer flex flex-col h-full bg-white p-4 rounded-xl border border-slate-100 hover:shadow-lg transition-all shadow-sm">
                        <div className="h-40 w-full bg-slate-200 rounded-lg mb-4 relative overflow-hidden">
                            <Image 
                                src={item.image} 
                                alt={item.title} 
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-sm mb-3 w-max relative z-10">
                            {item.tag}
                        </span>
                        <h3 className="font-serif text-lg text-slate-900 font-medium mb-2 group-hover:text-brand transition-colors leading-tight">
                            {item.title}
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed font-light mb-4 flex-grow">
                            {item.text}
                        </p>
                        {/* <div className="flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:text-brand transition-colors mt-auto">
                            Read more <ArrowRight className="w-3 h-3" />
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
}