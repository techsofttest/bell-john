"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import QuantitySelector from "./QuantitySelector";

interface ItemProps {
    item: any;
    onRemove: (id: number) => void;
    onUpdateQty: (id: number, qty: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQty }: ItemProps) {

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 mb-4 transition-all hover:shadow-md">
            <div className="flex gap-4 md:gap-6">
                {/* Product Image */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
 
                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm md:text-base font-semibold text-slate-800 line-clamp-2 max-w-md hover:text-brand transition-colors cursor-pointer">
                            {item.title}
                        </h3>
                    </div>


                    {/* Selected Options (Size, Color, Pack, SKU) */}
                    {(item.size || item.color || item.packaging || item.sku) && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                            {item.sku && (
                                <span className="text-[10px] text-slate-800 font-extrabold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                    SKU: <span className="text-brand">{item.sku}</span>
                                </span>
                            )}
                            {item.size && (
                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                    {item.sizeLabel || "Size"}: <span className="text-slate-900">{item.size}</span>
                                </span>
                            )}
                            {item.color && (
                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                    {item.colorLabel || "Color"}: <span className="text-slate-900">{item.color}</span>
                                </span>
                            )}
                            {item.packaging && (
                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                    {item.packagingLabel || "Pack"}: <span className="text-slate-900">{item.packaging}</span>
                                </span>
                            )}
                        </div>
                    )}

                    {/* B2B Specs */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 mb-4">
                        {item.specs?.map((spec: any, i: number) => (
                            <span key={i} className="text-[11px] text-slate-600 font-medium uppercase tracking-wider">
                                {spec.label}: <span className="text-slate-800">{spec.value}</span>
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                            <QuantitySelector 
                                value={item.qty} 
                                onChange={(newQty) => onUpdateQty(item.id, newQty)} 
                            />
                        </div>
 
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => onRemove(item.id)}
                                className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-red-600 uppercase tracking-widest transition-colors"
                            >
                                <Trash2 size={14} /> Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}