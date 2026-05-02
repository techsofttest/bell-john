"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CartItem from "@/app/components/cart/CartItem";
import CartSummary from "@/app/components/cart/CartSummary";

const MOCK_BAG = [
    {
        id: 1,
        title: "Mailing Envelopes - Brown / White, Pack of 500",
        image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600",
        qty: 1,
        price: 45.00,
        specs: [{ label: "Size", value: '3" X 4"' }, { label: "Color", value: "White" }]
    },
    {
        id: 2,
        title: "Atlas 2 Line Price Labeller, 10 Digit PL1000E",
        image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600",
        qty: 2,
        price: 85.50,
        specs: [{ label: "Unit", value: "Pack of 20" }]
    }
];

export default function CartPage() {
    const [items, setItems] = useState(MOCK_BAG);

    const removeItem = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, newQty: number) => {
        setItems(prev => prev.map(item => 
            item.id === id ? { ...item, qty: newQty } : item
        ));
    };

    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

    return (
        <div className="bg-[#F4F5F7] min-h-screen pb-24 font-sans">
            {/* Hero Strip */}
            <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
                    <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-2">
                        <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-800">Request Bag</span>
                    </nav>
                    <h1 className="text-xl md:text-2xl text-slate-900 font-bold">
                        Request Bag <span className="text-sm font-normal text-slate-500 ml-2">({items.length} Items)</span>
                    </h1>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-8">
                {items.length > 0 ? (
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Left Side: Items List */}
                        <div className="lg:col-span-8">
                            <AnimatePresence mode="popLayout">
                                {items.map(item => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                                    >
                                        <CartItem 
                                            item={item} 
                                            onRemove={removeItem} 
                                            onUpdateQty={updateQuantity}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <Link href="/products" className="inline-block mt-4 text-xs font-bold text-brand uppercase tracking-widest hover:underline">
                                ← Continue to add products
                            </Link>
                        </div>

                        {/* Right Side: Summary */}
                        <div className="lg:col-span-4 sticky top-28 self-start">
                            <CartSummary itemCount={items.length} total={totalPrice} />
                        </div>
                    </div>
                ) : (
                    /* Empty State */
                    <div className="py-24 text-center">
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-xl mx-auto flex items-center justify-center mb-6 text-slate-200">
                            <ShoppingBag size={40} />
                        </div>
                        <h2 className="text-xl font-serif text-slate-800 mb-2">Your request bag is empty</h2>
                        <p className="text-slate-500 text-sm mb-8">Add products to your bag to start the quotation process.</p>
                        <Link href="/products" className="bg-slate-900 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand transition-all">
                            Browse Catalog
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}