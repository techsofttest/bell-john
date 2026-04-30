"use client";

import Image from "next/image";
import Link from "next/link";

interface TrendingCategory {
    title: string;
    image: string;
    slug: string;
    discount: string;
}

export default function TrendingCategories({ categories }: { categories: TrendingCategory[] }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl font-medium text-slate-900">Trending Categories</h3>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden">
                {categories.map((cat, i) => (
                    <Link key={i} href={`/products/category/${cat.slug}`} className="group flex flex-col items-center flex-shrink-0 snap-start w-[100px]">
                        <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-200 overflow-hidden relative mb-3 group-hover:border-brand group-hover:shadow-md transition-all">
                            <Image src={cat.image} alt={cat.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h4 className="text-[11px] font-semibold text-center text-slate-800 leading-tight mb-1 group-hover:text-brand">{cat.title}</h4>
                        <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">{cat.discount}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}