"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";

interface CartItem {
    id: string | number;
    title: string;
    image: string;
    qty: number;
    size?: string;
    color?: string;
    packaging?: string;
}

interface CheckoutSummaryProps {
    cartItems: CartItem[];
    itemsCount: number;
    deliveryMethod: string;
    expandedItem: string | number | null;
    setExpandedItem: (id: string | number | null) => void;
}

export default function CheckoutSummary({
    cartItems,
    itemsCount,
    deliveryMethod,
    expandedItem,
    setExpandedItem
}: CheckoutSummaryProps) {
    return (
        <div className="lg:col-span-5 bg-slate-50/50 border-t lg:border-t-0 lg:border-l border-slate-200 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none lg:rounded-tl-none h-full relative">
            {/* Inner wrapper that is actually sticky */}
            <div className="lg:sticky lg:top-8 p-6 md:p-10 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900">
                        Order summary <span className="font-normal text-slate-500">({itemsCount} items)</span>
                    </h2>
                    <Link href="/cart" className="p-2 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
                        <Pencil className="w-4 h-4" />
                    </Link>
                </div>

                {/* Dynamic items list */}
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                    {cartItems.map((item, index) => {
                        const isExpanded = expandedItem === item.id;
                        return (
                            <div key={index} className="flex gap-4 border-b border-slate-200/40 pb-4 last:border-b-0 last:pb-0 group">
                                {/* Image container with exact round item count circle badge overlay */}
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-slate-200 flex-shrink-0">
                                    <Image 
                                        src={item.image} 
                                        alt={item.title} 
                                        fill 
                                        className="object-cover" 
                                    />
                                    <div className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
                                        {item.qty}
                                    </div>
                                </div>

                                {/* Center Details */}
                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-brand transition-colors line-clamp-2">
                                            {item.title}
                                        </h4>
                                        
                                        {/* Variant Specifications */}
                                        <div className="text-[10px] text-slate-500 mt-1 space-y-0.5 font-semibold uppercase tracking-wider">
                                            {item.size && <p>Size: <span className="text-slate-800">{item.size}</span></p>}
                                            {item.color && <p>Color: <span className="text-slate-800">{item.color}</span></p>}
                                            {item.packaging && <p>Packaging: <span className="text-slate-800">{item.packaging}</span></p>}
                                        </div>
                                    </div>

                                    {/* Accordion toggle for details */}
                                    {(item.size || item.color || item.packaging) && (
                                        <button 
                                            onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                                            className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 mt-1 hover:text-slate-900"
                                        >
                                            {isExpanded ? (
                                                <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                                            ) : (
                                                <>Show More <ChevronDown className="w-3.5 h-3.5" /></>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Spacing & Pricing summary - Fully Refined with NO PRICING (Pure B2B Quote Model) */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Request Items</span>
                        <span className="font-bold text-slate-900">{itemsCount} Solutions</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Delivery Type</span>
                        <span className="font-semibold text-slate-800">{deliveryMethod}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Inquiry Status</span>
                        <span className="font-semibold text-brand uppercase tracking-wider text-[11px]">Quote compilation</span>
                    </div>
                </div>

            </div>

        </div>
    );
}
