"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const portfolio = [
    { num: "01", title: "Stationery & Supplies", image: "/category/stationery.jpg" },
    { num: "02", title: "Copier Consumables", image: "/products/Canon imageRUNNER ADVANCE DX.webp" },
    { num: "03", title: "Educational Materials", image: "/category/Digital Supplies.jpg" },
    { num: "04", title: "Workspace Solutions", image: "/products/Epson EcoTank L15150 A3 Wi-Fi Duplex.jpg" }
];

export default function ValueProposition() {
    const [activeItem, setActiveItem] = useState<number | null>(null);

    return (
        <section className="bg-[#020617] py-20 relative overflow-hidden text-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">

                    {/* Left Side: Title & Shortened Description */}
                    <div className="w-full lg:w-5/12 text-center lg:text-left pt-4">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                            <span className="w-8 h-[1px] bg-white/30"></span>
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50">Our Portfolio</span>
                        </div>

                        <h2 className="font-serif text-2xl md:text-4xl leading-[1.1] mb-6 font-medium tracking-tight">
                            A Single Source for <br />Business Excellence.
                        </h2>

                        <p className="text-white/60 text-sm md:text-base font-light max-w-md mx-auto lg:mx-0 leading-relaxed">
                            Consistently supporting GCC businesses for over two decades with reliable procurement and timely delivery.
                        </p>
                    </div>

                    {/* Right Side: Services List - Aligned Vertically */}
                    <div className="w-full lg:w-7/12 flex flex-col relative">
                        {portfolio.map((item, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setActiveItem(index)}
                                onMouseLeave={() => setActiveItem(null)}
                                className={`group flex items-center py-8 border-white/5 transition-all duration-300 cursor-pointer relative
                                    ${index === 0 ? "border-t" : ""} 
                                    border-b hover:bg-white/[0.02] px-4
                                `}
                            >
                                {/* Fixed width number for perfect vertical alignment */}
                                <span className="w-12 text-[10px] font-sans tracking-widest text-white/30 group-hover:text-white transition-colors relative z-20">
                                    {item.num}
                                </span>

                                <h3 className="flex-grow text-lg md:text-xl font-medium text-white/40 group-hover:text-white transition-all duration-300 flex items-center justify-between relative z-20">
                                    {item.title}
                                    <ArrowUpRight className="w-5 h-5 text-white opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                                </h3>

                                {/* Floating Image relative to the list item */}
                                <div
                                    className={`absolute top-1/2 left-[40%] -translate-y-1/2 w-48 h-32 rounded-xl overflow-hidden pointer-events-none z-10 shadow-2xl transition-all duration-500 ease-out border border-white/10 origin-center
                                        ${activeItem === index ? "opacity-100 scale-100 rotate-2 translate-x-0" : "opacity-0 scale-90 -rotate-2 -translate-x-8"}
                                    `}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 192px, 192px"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}