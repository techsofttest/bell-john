"use client";

import Image from "next/image";
import Link from "next/link";

export default function FeaturedBrands({ brands }: { brands: string[] }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
            <h3 className="font-serif text-xl font-medium text-slate-900 mb-6">Featured Brands</h3>
            <div className="flex flex-wrap gap-4 items-center justify-between opacity-70 hover:opacity-100 transition-opacity">
                {brands.map((brand, i) => (
                    <Link key={i} href={`/brands/${brand.toLowerCase()}`} className="h-12 w-28 relative grayscale hover:grayscale-0 transition-all">
                        {/* Note: Use actual brand logo URLs here */}
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-400 text-xl border border-slate-200 rounded-md bg-slate-50">
                            {brand}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}