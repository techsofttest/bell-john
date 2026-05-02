"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartSlideOver() {
    const { isCartOpen, closeCart, cartItems, removeFromCart } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
                    />

                    {/* Left Slide-Over Panel */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 h-full w-[90%] max-w-[400px] bg-white z-50 flex flex-col shadow-2xl border-r border-slate-200"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-brand" />
                                Request Bag <span className="text-slate-400 font-normal text-sm">({cartItems.length})</span>
                            </h2>
                            <button onClick={closeCart} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="text-center text-slate-500 mt-10">Your bag is empty.</div>
                            ) : (
                                cartItems.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0 border border-slate-200">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight">{item.title}</h4>
                                            <div className="text-[10px] text-slate-500 mt-1 flex flex-wrap gap-x-2 gap-y-0.5 font-medium uppercase tracking-wider">
                                                {item.size && <span>Size: {item.size}</span>}
                                                {item.color && <span>Color: {item.color}</span>}
                                                {item.packaging && <span>Pack: {item.packaging}</span>}
                                                <span>Qty: {item.qty}</span>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer Action */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50">
                            <Link href="/cart" onClick={closeCart} className="w-full h-12 bg-brand hover:bg-brand/90 text-white rounded-xl shadow-lg shadow-brand/20 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all group">
                                View Request Bag
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}