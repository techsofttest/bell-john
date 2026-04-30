"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Heart, ArrowRight, X, Trash2 } from "lucide-react";
import Button from "../ui/Button";

export interface ProductTag {
    label: string;
    icon?: ReactNode;
    scheme?: 'new' | 'bestSeller' | 'premium' | 'price' | 'standard';
}

export interface ProductCardProps {
    id: string | number;
    title: string;
    category: string;
    image: string;
    tag?: ProductTag;
    isWishlistPage?: boolean; // New Prop
    onRemove?: (id: string | number) => void; // New Prop
}

const tagColorSchemes: Record<NonNullable<ProductTag['scheme']>, string> = {
    'new': 'bg-emerald-50 text-emerald-900 border-emerald-100',
    'bestSeller': 'bg-amber-50 text-amber-900 border-amber-100',
    'premium': 'bg-purple-50 text-purple-950 border-purple-100',
    'price': 'bg-red-50 text-red-900 border-red-100',
    'standard': 'bg-slate-100 text-slate-800 border-slate-200',
};

export default function ProductCard({ id, title, category, image, tag, isWishlistPage, onRemove }: ProductCardProps) {
    const schemeClasses = tagColorSchemes[tag?.scheme || 'standard'];

    return (
        <div className="group relative flex flex-col bg-white border border-slate-100 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-200/60 w-full">
            {/* 1. Image Area */}
            <Link href={`/products/${id}`} className="relative h-[160px] md:h-[220px] w-full bg-slate-50 overflow-hidden block">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 165px, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* DYNAMIC TAG */}
                {tag && (
                    <div className={`absolute top-2 left-2 md:top-3 md:left-3 z-20 flex items-center gap-0.5 md:gap-1.5 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full border shadow-sm ${schemeClasses} group-hover:scale-105 transition-transform duration-300 pointer-events-none`}>
                        {tag.icon && <div className="shrink-0 opacity-90 scale-75 md:scale-100 origin-left flex items-center">{tag.icon}</div>}
                        <span className="text-[7px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-widest whitespace-nowrap">
                            {tag.label}
                        </span>
                    </div>
                )}
            </Link>

            {/* ACTION BUTTON (Heart or Remove) */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    if (isWishlistPage && onRemove) onRemove(id);
                }}
                className="absolute top-0 right-0 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center group/fav outline-none"
                aria-label={isWishlistPage ? "Remove from wishlist" : "Add to favorites"}
            >
                <div className={`flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full transition-all shadow-sm 
                    ${isWishlistPage
                        ? "bg-white text-slate-400 hover:text-red-600 hover:bg-red-50"
                        : "bg-white/90 backdrop-blur-sm text-slate-400 group-hover/fav:text-red-500 group-hover/fav:bg-white"}
                    opacity-100 translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 duration-300`}
                >
                    {isWishlistPage ? <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                </div>
            </button>

            {/* 2. Content Area */}
            <div className="p-3 md:p-5 flex flex-col flex-grow">
                <Link href={`/products/${id}`}>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-brand mb-1 md:mb-2 block">
                        {category}
                    </span>

                    <h3 className="text-xs md:text-base font-semibold text-slate-800 leading-snug mb-3 md:mb-5 min-h-[32px] md:min-h-[44px] line-clamp-2 group-hover:text-brand transition-colors">
                        {title}
                    </h3>
                </Link>

                <div className="mt-auto">
                    <Button
                        variant="primary"
                        className="group/btn w-full h-[36px] md:h-[44px] bg-brand text-white hover:bg-brand/90 text-[9px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-1 md:gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand/20 border-none px-2"
                    >
                        <span>Ask a Quote</span>
                        <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" strokeWidth={2.5} />
                    </Button>
                </div>
            </div>
        </div>
    );
}