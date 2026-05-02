"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import { useWishlist } from "@/app/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import QuickQuoteModal from "./QuickQuoteModal";

export interface ProductTag {
    label: string;
    icon?: ReactNode;
    scheme?: 'new' | 'bestSeller' | 'premium' | 'price' | 'standard' | 'outOfStock';
}

export interface ProductVariants {
    sizes?: string[];
    colors?: string[];
    packaging?: string[];
}

export interface ProductCardProps {
    id: string | number;
    title: string;
    category: string;
    image: string;
    price?: number;
    availability?: 'In Stock' | 'Limited Stock' | 'Out of Stock' | string;
    tag?: ProductTag;
    variants?: ProductVariants;
    isWishlistPage?: boolean;
    onRemove?: (id: string | number) => void;
}

const tagColorSchemes: Record<NonNullable<ProductTag['scheme']>, string> = {
    'new': 'bg-emerald-50 text-emerald-900 border-emerald-100',
    'bestSeller': 'bg-amber-50 text-amber-900 border-amber-100',
    'premium': 'bg-purple-50 text-purple-950 border-purple-100',
    'price': 'bg-red-50 text-red-900 border-red-100',
    'standard': 'bg-slate-100 text-slate-800 border-slate-200',
    'outOfStock': 'bg-slate-100 text-slate-500 border-slate-200 opacity-80',
};

export default function ProductCard({ 
    id, title, category, image, price, availability, tag, variants, isWishlistPage, onRemove 
}: ProductCardProps) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const activeInWishlist = isInWishlist(id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // DETERMINE THE FINAL TAG TO DISPLAY
    // If out of stock, we show that as the primary tag
    const isOutOfStock = availability?.toLowerCase() === 'out of stock';
    const displayTag = isOutOfStock 
        ? { label: "Out of Stock", scheme: 'outOfStock' as const } 
        : tag;

    const schemeClasses = tagColorSchemes[displayTag?.scheme || 'standard'];

    return (
        <div className={`group relative flex flex-col bg-white border border-slate-100 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-200/60 w-full ${isOutOfStock ? 'opacity-90' : ''}`}>
            {/* 1. Image Area */}
            <Link href={`/products/${id}`} className="relative h-[160px] md:h-[220px] w-full bg-slate-50 overflow-hidden block">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 165px, 300px"
                    className={`object-cover transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? 'grayscale-[0.5]' : ''}`}
                />

                {/* DYNAMIC TAG */}
                {displayTag && (
                    <div className={`absolute top-2 left-2 md:top-3 md:left-3 z-20 flex items-center gap-0.5 md:gap-1.5 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full border shadow-sm ${schemeClasses} group-hover:scale-105 transition-transform duration-300 pointer-events-none`}>
                        {displayTag.icon && <div className="shrink-0 opacity-90 scale-75 md:scale-100 origin-left flex items-center">{displayTag.icon}</div>}
                        <span className="text-[7px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-widest whitespace-nowrap">
                            {displayTag.label}
                        </span>
                    </div>
                )}
            </Link>

            {/* ACTION BUTTON (Heart or Remove) */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    if (isWishlistPage && onRemove) {
                        onRemove(id);
                        removeFromWishlist(id);
                    } else {
                        if (activeInWishlist) {
                            removeFromWishlist(id);
                        } else {
                            addToWishlist({ id, title, category, image, tag, price, availability });
                        }
                    }
                }}
                className="absolute top-0 right-0 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center group/fav outline-none"
                aria-label={isWishlistPage ? "Remove from wishlist" : "Add to favorites"}
            >
                <motion.div 
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    className={`flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full transition-all shadow-sm 
                    ${isWishlistPage
                        ? "bg-white text-slate-400 hover:text-red-600 hover:bg-red-50"
                        : activeInWishlist 
                            ? "bg-white text-red-500" 
                            : "bg-white/90 backdrop-blur-sm text-slate-400 group-hover/fav:text-red-500 group-hover/fav:bg-white"}
                    opacity-100 translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 duration-300`}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={isWishlistPage ? 'trash' : activeInWishlist ? 'heart-filled' : 'heart-empty'}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            {isWishlistPage ? (
                                <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            ) : (
                                <Heart 
                                    className={`w-3.5 h-3.5 md:w-4 md:h-4 ${activeInWishlist ? "fill-red-500" : ""}`} 
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </button>

            {/* 2. Content Area */}
            <div className="p-3 md:p-5 flex flex-col flex-grow">
                <Link href={`/products/${id}`}>
                    <div className="flex items-center justify-between mb-1.5 md:mb-2.5">
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-brand">
                            {category}
                        </span>
                    </div>

                    <h3 className="text-xs md:text-base font-semibold text-slate-800 leading-snug mb-2 min-h-[32px] md:min-h-[44px] line-clamp-2 group-hover:text-brand transition-colors">
                        {title}
                    </h3>

                    {/* PRICING AREA */}
                    <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-[10px] md:text-xs font-bold text-slate-400">AED</span>
                        <span className="text-sm md:text-lg font-bold text-slate-900 tracking-tight">
                            {(price || (Math.random() * 200 + 10)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-[8px] md:text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-tighter">per pack</span>
                    </div>
                </Link>

                <div className="mt-auto">
                    <Button
                        variant="primary"
                        disabled={isOutOfStock}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpen(true);
                        }}
                        className={`group/btn w-full h-[44px] bg-brand text-white hover:bg-brand/90 text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-1.5 md:gap-2.5 transition-all duration-500 shadow-lg shadow-brand/10 hover:shadow-brand/25 border-none px-4 rounded-xl ${isOutOfStock ? 'bg-slate-300 cursor-not-allowed shadow-none' : ''}`}
                    >
                        <span>{isOutOfStock ? 'Out of Stock' : 'Ask a Quote'}</span>
                        {!isOutOfStock && <ArrowRight className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 transition-transform duration-500 group-hover/btn:translate-x-2" strokeWidth={3} />}
                    </Button>
                </div>
            </div>

            {isModalOpen && (
                <QuickQuoteModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    product={{ id, title, category, image, variants }} 
                />
            )}
        </div>
    );
}