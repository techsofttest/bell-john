"use client";

import { ProductVariants } from "@/app/data/products";

interface ProductVariantsSelectorProps {
    variants?: ProductVariants;
    size: string;
    setSize: (s: string) => void;
    color: string;
    setColor: (c: string) => void;
    packaging: string;
    setPackaging: (p: string) => void;
}

export default function ProductVariantsSelector({
    variants,
    size,
    setSize,
    color,
    setColor,
    packaging,
    setPackaging
}: ProductVariantsSelectorProps) {
    return (
        <div className="space-y-5 py-2">
            {/* Size Variant */}
            {variants?.sizes && variants.sizes.length > 0 && (
                <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 block">Select Size</label>
                    <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 hover:border-slate-400 cursor-pointer"
                    >
                        {variants.sizes.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Color Variant */}
            {variants?.colors && variants.colors.length > 0 && (
                <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 block">Select Color</label>
                    <select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 hover:border-slate-400 cursor-pointer"
                    >
                        {variants.colors.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Packaging Variant */}
            {variants?.packaging && variants.packaging.length > 0 && (
                <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 block">Packaging Type</label>
                    <select
                        value={packaging}
                        onChange={(e) => setPackaging(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 hover:border-slate-400 cursor-pointer"
                    >
                        {variants.packaging.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}
