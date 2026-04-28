"use client";

import Image from "next/image";
import Link from "next/link";

// Mock Data: 4 Core Categories + 2 Extras
const categories = [
    {
        id: 'stationery',
        title: "Stationery",
        image: "/category/stationery.jpg"
    },
    {
        id: 'digital-supplies',
        title: "Digital Supplies",
        image: "/category/Digital Supplies.jpg"
    },
    {
        id: 'office-machines',
        title: "Office Machines",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 'office-furniture',
        title: "Office Furniture",
        image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 'breakroom',
        title: "Breakroom",
        image: "/category/Breakroom.jpg"
    },
    {
        id: 'packing-materials',
        title: "Packing Materials",
        image: "/category/packing supplies.jpg"
    },
];

interface CoreCategoriesProps {
    hideTitle?: boolean;
}

export default function CoreCategories({ hideTitle = false }: CoreCategoriesProps) {
    return (
        // Reduced vertical padding from py-20 to py-10 md:py-12
        <section className="py-10 md:py-12 relative overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white border-b border-slate-100">
            {/* The "Studio Glow" */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* --- CONDITIONAL Header --- */}
                {!hideTitle && (
                    // Reduced bottom margin from mb-16 to mb-8
                    <div className="text-center mb-8 relative px-6 lg:px-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="w-8 h-[1px] bg-brand/60"></span>
                            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-brand">Our Departments</span>
                            <span className="w-8 h-[1px] bg-brand/60"></span>
                        </div>
                        <h2 className="font-serif text-xl md:text-3xl text-slate-900 font-medium tracking-tight">
                            Explore by Category
                        </h2>
                    </div>
                )}

                {/* --- Horizontally Scrolling Flex Row --- */}
                <div className="flex flex-nowrap overflow-x-auto gap-6 md:gap-10 px-6 lg:px-12 pb-8 pt-4 snap-x snap-mandatory justify-start lg:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products/category/${category.id}`}
                            // Added flex-shrink-0 to prevent squishing, and snap-start for clean mobile swiping
                            className="group flex flex-col items-center w-[110px] md:w-[140px] flex-shrink-0 snap-start outline-none"
                        >
                            {/* Image Container */}
                            <div className="w-full aspect-square bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative mb-4 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-brand/20 group-hover:border-brand/40 transition-all duration-500">
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 110px, 140px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Category Title */}
                            <h3 className="text-sm md:text-base font-semibold text-slate-800 text-center group-hover:text-brand transition-colors duration-300">
                                {category.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}