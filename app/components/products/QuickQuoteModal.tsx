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
            colors?: string[];
            packaging?: string[];
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
                color: color || undefined,
                packaging: packaging || undefined
            } as any); // Type cast to any for now to handle packaging in context if needed
            
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
                        className="relative w-full max-w-2xl h-screen bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row border border-white/20"
                    >
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-slate-500 hover:text-slate-900 shadow-sm transition-all border border-slate-100"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Image Left */}
                        <div className="w-full md:w-1/2 h-48 md:h-auto relative bg-slate-50 overflow-hidden">
                            <Image 
                                src={product.image} 
                                alt={product.title} 
                                fill 
                                className="object-contain transition-transform duration-700 hover:scale-105" 
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
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Select Size</label>
                                        <div className="flex flex-wrap gap-2">
                                            {product.variants.sizes.map(s => (
                                                <button 
                                                    key={s} 
                                                    onClick={() => setSize(s)} 
                                                    className={`px-4 py-2 text-xs rounded-xl border transition-all duration-300 ${size === s ? 'border-brand bg-brand/5 text-brand font-bold shadow-sm shadow-brand/10' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Variant: Color */}
                                {product.variants?.colors && product.variants.colors.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Select Color</label>
                                        <div className="flex flex-wrap gap-2">
                                            {product.variants.colors.map(c => (
                                                <button 
                                                    key={c} 
                                                    onClick={() => setColor(c)} 
                                                    className={`px-4 py-2 text-xs rounded-xl border transition-all duration-300 ${color === c ? 'border-brand bg-brand/5 text-brand font-bold shadow-sm shadow-brand/10' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Variant: Packaging */}
                                {product.variants?.packaging && product.variants.packaging.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Packaging Type</label>
                                        <div className="flex flex-wrap gap-2">
                                            {product.variants.packaging.map(p => (
                                                <button 
                                                    key={p} 
                                                    onClick={() => setPackaging(p)} 
                                                    className={`px-4 py-2 text-xs rounded-xl border transition-all duration-300 ${packaging === p ? 'border-brand bg-brand/5 text-brand font-bold shadow-sm shadow-brand/10' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

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