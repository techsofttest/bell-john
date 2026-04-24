"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

interface ProductCardProps {
    id: string | number;
    title: string;
    category: string;
    image: string;
}

export default function ProductCard({ id, title, category, image }: ProductCardProps) {
    return (
        <Link
            href={`/products/${id}`}
            className="group relative flex flex-col bg-white border border-slate-100 rounded-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 w-[300px] flex-shrink-0"
        >
            {/* 1. Image Area */}
            <div className="relative h-[220px] w-full bg-slate-50 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Wishlist Button */}
                <button
                    onClick={(e) => { e.preventDefault(); }}
                    className="absolute top-3 right-3 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-md text-slate-400 hover:text-accent transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                >
                    <Heart className="w-4 h-4" />
                </button>
            </div>

            {/* 2. Content Area */}
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-2">
                    {category}
                </span>

                <h3 className="text-base font-medium text-slate-800 leading-snug mb-5 min-h-[44px] line-clamp-2 group-hover:text-brand transition-colors">
                    {title}
                </h3>

                <div className="mt-auto">
                    {/* Ask a Quote button with Sliding Icon Effect */}
                    <Button
                        variant="primary"
                        className="group/btn w-full h-[44px] text-xs uppercase tracking-widest flex items-center justify-center overflow-hidden"
                    >
                        <span className="transform transition-transform duration-300 group-hover/btn:-translate-x-1">
                            Ask a Quote
                        </span>
                        <ArrowRight
                            className="w-0 opacity-0 transition-all duration-300 group-hover/btn:w-4 group-hover/btn:opacity-100 group-hover/btn:ml-2"
                            strokeWidth={2.5}
                        />
                    </Button>
                </div>
            </div>
        </Link>
    );
}