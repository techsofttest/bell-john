"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import Button from "../ui/Button";
import QuantitySelector from "../cart/QuantitySelector";
import { useCart } from "@/app/context/CartContext";

interface QuickQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        id: string | number;
        title: string;
        category: string;
        image: string;
        variants?: {
            sizes?: string[];
            sizesLabel?: string;
            colors?: string[];
            colorsLabel?: string;
            packaging?: string[];
            packagingLabel?: string;
            customGroups?: {
                label: string;
                attributes: string[];
            }[];
        };
    };
}

export default function QuickQuoteModal({ isOpen, onClose, product }: QuickQuoteModalProps) {
    const { addToCart } = useCart();
    const [qty, setQty] = useState(1);

    // Initialize states with the first option if available
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [packaging, setPackaging] = useState("");
    const [customValues, setCustomValues] = useState<Record<string, string>>({});

    const [mounted, setMounted] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsAdded(false);
            setIsAdding(false);
            // Set defaults when opening
            if (product.variants?.sizes?.length) setSize(product.variants.sizes[0]);
            if (product.variants?.colors?.length) setColor(product.variants.colors[0]);
            if (product.variants?.packaging?.length) setPackaging(product.variants.packaging[0]);
            
            const defaults: Record<string, string> = {};
            if (product.variants?.customGroups) {
                product.variants.customGroups.forEach((group: any) => {
                    if (group.attributes?.[0]) {
                        defaults[group.label] = group.attributes[0];
                    }
                });
            }
            setCustomValues(defaults);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, product.variants]);

    const handleAdd = () => {
        setIsAdding(true);

        // Simulate a small delay for the animation
        setTimeout(() => {
            addToCart({
                id: product.id,
                title: product.title,
                image: product.image,
                qty,
                size: size || undefined,
                sizeLabel: product.variants?.sizesLabel || undefined,
                color: color || undefined,
                colorLabel: product.variants?.colorsLabel || undefined,
                packaging: packaging || undefined,
                packagingLabel: product.variants?.packagingLabel || undefined,
                custom: customValues
            });

            setIsAdding(false);
            setIsAdded(true);

            // Wait before closing the modal
            setTimeout(() => {
                setIsAdded(false);
                onClose();
            }, 1200);
        }, 400);
    };

    if (!mounted) return null;

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl h-[90vh] bg-white rounded-3xl shadow-2xl z-10 flex flex-col md:flex-row border border-white/20"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-slate-500 hover:text-slate-900 shadow-sm transition-all border border-slate-100"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Image Left */}
                        <div className="w-full md:w-1/2 h-48 md:h-auto relative bg-slate-50">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-contain transition-transform duration-700"
                            />
                        </div>

                        {/* Configuration Right */}
                        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-brand mb-2">{product.category}</span>
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight mb-8">{product.title}</h3>

                            <div className="space-y-6 flex-1 overflow-y-auto max-h-[400px] pr-2">
                                {/* Variant: Size */}
                                {product.variants?.sizes && product.variants.sizes.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">
                                            {product.variants.sizesLabel || "Select Size"}
                                        </label>
                                        <select
                                            value={size}
                                            onChange={(e) => setSize(e.target.value)}
                                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-300 hover:border-slate-300 cursor-pointer"
                                        >
                                            {product.variants.sizes.map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Variant: Color */}
                                {product.variants?.colors && product.variants.colors.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">
                                            {product.variants.colorsLabel || "Select Color"}
                                        </label>
                                        <select
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-300 hover:border-slate-300 cursor-pointer"
                                        >
                                            {product.variants.colors.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Variant: Packaging */}
                                {product.variants?.packaging && product.variants.packaging.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">
                                            {product.variants.packagingLabel || "Packaging Type"}
                                        </label>
                                        <select
                                            value={packaging}
                                            onChange={(e) => setPackaging(e.target.value)}
                                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-300 hover:border-slate-300 cursor-pointer"
                                        >
                                            {product.variants.packaging.map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Custom/Extra Variants */}
                                {product.variants?.customGroups && product.variants.customGroups.map(group => (
                                    <div key={group.label}>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">
                                            {group.label}
                                        </label>
                                        <select
                                            value={customValues[group.label] || ""}
                                            onChange={(e) => setCustomValues(prev => ({ ...prev, [group.label]: e.target.value }))}
                                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-300 hover:border-slate-300 cursor-pointer"
                                        >
                                            {group.attributes.map(attr => (
                                                <option key={attr} value={attr}>{attr}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}

                                {/* Quantity */}
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Required Quantity</label>
                                    <div className="bg-slate-50 p-1 rounded-xl inline-block border border-slate-100">
                                        <QuantitySelector value={qty} onChange={setQty} />
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleAdd}
                                disabled={isAdding || isAdded}
                                variant="primary"
                                className="w-full mt-10 h-14 bg-brand hover:bg-brand/90 text-white text-xs uppercase font-bold tracking-[0.2em] rounded-2xl shadow-xl shadow-brand/20 transition-all active:scale-[0.98] border-none"
                            >
                                <AnimatePresence mode="wait">
                                    {isAdding ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Adding...
                                        </motion.div>
                                    ) : isAdded ? (
                                        <motion.div
                                            key="added"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <motion.div
                                                initial={{ scale: 0, rotate: -45 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 15,
                                                    delay: 0.1
                                                }}
                                            >
                                                <Check className="w-5 h-5" />
                                            </motion.div>
                                            Added to Bag
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="default"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-center justify-center"
                                        >
                                            Add to Request Bag
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}