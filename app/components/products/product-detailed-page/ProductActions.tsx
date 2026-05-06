"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Check, Loader2 } from "lucide-react";
import Button from "../../ui/Button";

interface ProductActionsProps {
    isOutOfStock: boolean;
    isAdding: boolean;
    isAdded: boolean;
    isWishlisted: boolean;
    onAskQuote: () => void;
    onToggleWishlist: () => void;
}

export default function ProductActions({
    isOutOfStock,
    isAdding,
    isAdded,
    isWishlisted,
    onAskQuote,
    onToggleWishlist
}: ProductActionsProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button 
                onClick={onAskQuote} 
                disabled={isAdding || isAdded || isOutOfStock}
                variant="primary" 
                className={`w-full sm:flex-1 h-14 bg-brand hover:bg-brand/90 text-white text-xs uppercase font-semibold tracking-[0.2em] rounded-2xl shadow-xl shadow-brand/20 transition-all active:scale-[0.98] border-none flex items-center justify-center ${
                    isOutOfStock ? "bg-slate-300 hover:bg-slate-300 shadow-none cursor-not-allowed" : ""
                }`}
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
                                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
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
                            {isOutOfStock ? "Out of Stock" : "Ask a Quote"}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>

            {/* Wishlist toggle button */}
            <button 
                onClick={onToggleWishlist}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0 ${
                    isWishlisted 
                        ? 'border-red-100 bg-red-50 text-red-500 shadow-sm' 
                        : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600 bg-white'
                }`}
                aria-label="Add to Wishlist"
            >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
            </button>
        </div>
    );
}
