"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard, { ProductTag } from "../products/ProductCard";

interface Product {
    id: string | number;
    title: string;
    category: string;
    image: string;
    tag?: ProductTag;
}

interface FeaturedProductsProps {
    products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isHoveringRef = useRef(false);
    const offsetRef = useRef(0);

    const setTrackOffset = (offset: number) => {
        const track = trackRef.current;
        if (!track) {
            return;
        }

        offsetRef.current = offset;
        track.style.transform = `translateX(${-offset}px)`;
    };

    const scroll = (direction: "left" | "right") => {
        const track = trackRef.current;
        if (!track) {
            return;
        }

        const halfWidth = track.scrollWidth / 2;
        if (halfWidth <= 0) {
            return;
        }

        const viewportWidth = viewportRef.current?.clientWidth || halfWidth;
        const step = Math.min(viewportWidth, halfWidth);
        const nextOffset = direction === "left"
            ? (offsetRef.current - step + halfWidth) % halfWidth
            : (offsetRef.current + step) % halfWidth;

        setTrackOffset(nextOffset);
    };

    useEffect(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;

        if (!viewport || !track || products.length === 0) {
            return;
        }

        let rafId = 0;
        let lastTime = 0;
        const speed = 24; // px per second

        const tick = (time: number) => {
            if (!lastTime) {
                lastTime = time;
            }

            const deltaSeconds = (time - lastTime) / 1000;
            lastTime = time;

            if (!isHoveringRef.current) {
                const halfWidth = track.scrollWidth / 2;

                if (halfWidth > 0) {
                    const nextOffset = (offsetRef.current + speed * deltaSeconds) % halfWidth;
                    setTrackOffset(nextOffset);
                }
            }

            rafId = window.requestAnimationFrame(tick);
        };

        rafId = window.requestAnimationFrame(tick);

        return () => {
            window.cancelAnimationFrame(rafId);
        };
    }, [products.length]);

    const duplicatedProducts = [...products, ...products];

    return (
        <section
            className="py-16 bg-white overflow-hidden"
            onMouseEnter={() => {
                isHoveringRef.current = true;
            }}
            onMouseLeave={() => {
                isHoveringRef.current = false;
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- Tiered  Title --- */}
                <div className="flex justify-between items-end mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-[1px] bg-brand"></span>
                            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-brand">Industry Standards</span>
                        </div>
                        <h2 className="font-serif text-xl md:text-3xl text-slate-900 font-medium">Featured Solutions</h2>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-900 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-900 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all active:scale-95"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* --- The Seamless Carousel --- */}
                <div
                    ref={viewportRef}
                    className="overflow-hidden"
                >
                    <div ref={trackRef} className="flex gap-6 xl:gap-8 will-change-transform">
                        {duplicatedProducts.map((product, index) => (
                            <div
                                key={`${product.id}-${index}`}
                                className="py-4 flex-none sm:w-[45vw] md:w-[31vw] lg:w-[240px] xl:w-[280px]">
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
