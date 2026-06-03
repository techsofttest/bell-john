"use client";

import { useState } from "react";
import { Product } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import QuantitySelector from "../../cart/QuantitySelector";

// Import broken-down subcomponents
import ProductBreadcrumbs from "./ProductBreadcrumbs";
import ProductGallery from "./ProductGallery";
import ProductVariantsSelector from "./ProductVariantsSelector";
import ProductActions from "./ProductActions";
import ProductSpecsAndOverview from "./ProductSpecsAndOverview";

interface ProductDetailsClientProps {
    product: Product;
}

const tagColorSchemes = {
    'new': 'bg-emerald-100 text-emerald-950 border-emerald-200/80 font-bold',
    'bestSeller': 'bg-amber-100 text-amber-950 border-amber-200/80 font-bold',
    'premium': 'bg-purple-100 text-purple-950 border-purple-200/80 font-bold',
    'standard': 'bg-slate-200 text-slate-900 border-slate-300 font-bold',
    'outOfStock': 'bg-red-100 text-red-950 border-red-200/80 opacity-90 font-bold',
};

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const isWishlisted = isInWishlist(product.id);
    const hasVariants = !!(product.variants?.sizes?.length || product.variants?.colors?.length || product.variants?.packaging?.length);

    // State for interactive features
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [qty, setQty] = useState(1);
    
    const [size, setSize] = useState(product.variants?.sizes?.[0] || "");
    const [color, setColor] = useState(product.variants?.colors?.[0] || "");
    const [packaging, setPackaging] = useState(product.variants?.packaging?.[0] || "");
    const [selectedSku, setSelectedSku] = useState(product.skus?.[0] || "");

    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAskQuote = () => {
        setIsAdding(true);
        setTimeout(() => {
            addToCart({
                id: product.id,
                title: product.title,
                image: product.image,
                qty,
                size: size || undefined,
                color: color || undefined,
                packaging: packaging || undefined,
                sku: selectedSku || undefined
            });
            setIsAdding(false);
            setIsAdded(true);

            setTimeout(() => {
                setIsAdded(false);
            }, 1800);
        }, 500);
    };

    const handleWishlistToggle = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist({
                id: product.id,
                title: product.title,
                category: product.category,
                image: product.image,
                availability: product.availability,
                tag: product.tag
            });
        }
    };

    // Prepare gallery list
    const galleryImages = product.images && product.images.length > 0 
        ? [product.image, ...product.images.filter(img => img !== product.image)]
        : [product.image];

    const displayTag = product.tag;

    const schemeClasses = displayTag ? tagColorSchemes[displayTag.scheme || 'standard'] : '';

    return (
        <div className="bg-[#F1F5F9]/60 min-h-screen pb-4 font-sans">
            {/* 1. Dynamic Breadcrumbs path */}
            <ProductBreadcrumbs category={product.category} title={product.title} />

            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 mt-4">
                {/* 
                  Unified Dashboard Panel card:
                  REMOVED `overflow-hidden` from this wrapper container. 
                  In CSS, `position: sticky` is immediately disabled if any parent element has `overflow: hidden`.
                  To preserve the rounded clipping of the background without `overflow-hidden`, we apply 
                  responsive rounded corners (`rounded-l-3xl` and `rounded-r-3xl`) directly to the column child cells!
                */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md shadow-slate-200/50">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80 items-stretch">
                        
                        {/* ==========================================================
                            LEFT SIDE: PRODUCT MEDIA & TECHNICAL METRICS (7 Columns)
                            ========================================================== */}
                        <div className="lg:col-span-7 p-5 md:p-8 lg:p-10 space-y-8 rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl">
                            
                            {/* Gallery component - natively mounted flat on clean panel background */}
                            <ProductGallery 
                                title={product.title}
                                selectedImage={selectedImage}
                                onSelectImage={setSelectedImage}
                                galleryImages={galleryImages}
                                displayTag={displayTag}
                                schemeClasses={schemeClasses}
                            />

                            {/* Crisp separator line inside left side */}
                            <div className="border-t border-slate-100"></div>

                            {/* Sequentially placed Overview & Technical specifications */}
                            <ProductSpecsAndOverview product={product} />

                        </div>

                        {/* ==========================================================
                            RIGHT SIDE: ACTIONS, SELECTORS & PROCURE PANEL (5 Columns)
                            ========================================================== */}
                        <div className="lg:col-span-5 bg-slate-50/15 h-full relative rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl">
                            
                            {/* Sticky content container nested inside the stretched right column block */}
                            <div className="lg:sticky lg:top-[120px] p-5 md:p-8 lg:p-10 space-y-6">
                                
                                {/* Product Header tags */}
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-md">
                                            {product.category}
                                        </span>
                                        <span className="text-[10px] text-slate-800 font-extrabold uppercase tracking-wider bg-slate-100 border border-slate-200 px-3 py-1 rounded-md inline-flex items-center gap-1">
                                            B2B Item Code: <span className="text-slate-950">#{product.id}</span>
                                        </span>
                                    </div>

                                    {/* Title - Bold high contrast */}
                                    <h1 className="text-xl md:text-3xl font-sans text-slate-950 font-bold tracking-tight leading-tight">
                                        {product.title}
                                    </h1>


                                </div>

                                {/* Option selections */}
                                {hasVariants && (
                                    <div className="border-t border-slate-200 pt-5">
                                        <ProductVariantsSelector 
                                            variants={product.variants}
                                            size={size}
                                            setSize={setSize}
                                            color={color}
                                            setColor={setColor}
                                            packaging={packaging}
                                            setPackaging={setPackaging}
                                        />
                                    </div>
                                )}

                                {/* SKU Selection if multiple */}
                                {product.skus && product.skus.length > 1 && (
                                    <div className="border-t border-slate-200 pt-5">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 block">
                                            Select Item SKU / Model Code
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={selectedSku}
                                                onChange={(e) => setSelectedSku(e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/10 transition-all appearance-none cursor-pointer"
                                            >
                                                {product.skus.map((skuCode) => (
                                                    <option key={skuCode} value={skuCode}>
                                                        {skuCode}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Required Quantity */}
                                <div className="border-t border-slate-200 pt-5">
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3.5 block">
                                        Specify Procurement Quantity
                                    </span>
                                    <QuantitySelector value={qty} onChange={setQty} />
                                </div>

                                {/* Action CTA triggers */}
                                <div className="border-t border-slate-200 pt-5">
                                    <ProductActions 
                                        isAdding={isAdding}
                                        isAdded={isAdded}
                                        isWishlisted={isWishlisted}
                                        onAskQuote={handleAskQuote}
                                        onToggleWishlist={handleWishlistToggle}
                                    />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
