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
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 block">Select Size</span>
                    <div className="flex flex-wrap gap-2">
                        {variants.sizes.map(s => (
                            <button 
                                key={s} 
                                onClick={() => setSize(s)} 
                                className={`px-4 py-2 text-xs rounded-xl border transition-all duration-200 ${
                                    size === s 
                                        ? 'border-brand bg-brand text-white font-bold shadow-md shadow-brand/15 scale-[1.01]' 
                                        : 'border-slate-300 bg-white text-slate-800 font-semibold hover:border-slate-400 hover:bg-slate-50'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Color Variant */}
            {variants?.colors && variants.colors.length > 0 && (
                <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 block">Select Color</span>
                    <div className="flex flex-wrap gap-2">
                        {variants.colors.map(c => (
                            <button 
                                key={c} 
                                onClick={() => setColor(c)} 
                                className={`px-4 py-2 text-xs rounded-xl border transition-all duration-200 ${
                                    color === c 
                                        ? 'border-brand bg-brand text-white font-bold shadow-md shadow-brand/15 scale-[1.01]' 
                                        : 'border-slate-300 bg-white text-slate-800 font-semibold hover:border-slate-400 hover:bg-slate-50'
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Packaging Variant */}
            {variants?.packaging && variants.packaging.length > 0 && (
                <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 block">Packaging Type</span>
                    <div className="flex flex-wrap gap-2">
                        {variants.packaging.map(p => (
                            <button 
                                key={p} 
                                onClick={() => setPackaging(p)} 
                                className={`px-4 py-2 text-xs rounded-xl border transition-all duration-200 ${
                                    packaging === p 
                                        ? 'border-brand bg-brand text-white font-bold shadow-md shadow-brand/15 scale-[1.01]' 
                                        : 'border-slate-300 bg-white text-slate-800 font-semibold hover:border-slate-400 hover:bg-slate-50'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
