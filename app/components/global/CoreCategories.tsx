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

export default function CoreCategories() {
    return (
        <section className="py-16 bg-[#F8FAFC]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- Centered Header --- */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-8 h-[1px] bg-brand"></span>
                        <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-400">Our Departments</span>
                        <span className="w-8 h-[1px] bg-brand"></span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-medium">
                        Explore by Category
                    </h2>
                </div>

                {/* --- Wrapping Flex Grid --- */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products/category/${category.id}`}
                            className="group flex flex-col items-center w-[110px] md:w-[140px] outline-none"
                        >
                            {/* Image Container: Premium Soft Square */}
                            <div className="w-full aspect-square bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative mb-4 group-hover:shadow-md group-hover:border-brand/30 transition-all duration-300">
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 110px, 140px"
                                />
                                {/* Subtle dark gradient to make it feel grounded */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Category Title */}
                            <h3 className="text-sm md:text-base font-semibold text-slate-700 text-center group-hover:text-brand transition-colors">
                                {category.title}
                            </h3>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}