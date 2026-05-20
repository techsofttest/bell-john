"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronDown, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface Category {
    id?: number;
    title?: string;
    name?: string;
    slug: string;
    image: string;
    subCategories?: any[];
    children?: any[];
}

interface MobileSideMenuProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
}

export default function MobileSideMenu({ isOpen, onClose, categories }: MobileSideMenuProps) {
    const [expandedCat, setExpandedCat] = useState<number | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
                    />
                    
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[400px] z-[210] bg-white flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div className="flex flex-col">
                                <h3 className="text-xl font-serif font-medium text-slate-900">Categories</h3>
                                <p className="text-xs text-slate-400">Browse our product catalog</p>
                            </div>
                            <button onClick={onClose} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-brand transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-grow overflow-y-auto py-4">
                            <div className="px-6 space-y-4">
                                {categories.map((cat, idx) => (
                                    <div key={idx} className="border-b border-slate-50 last:border-none pb-4 last:pb-0">
                                        <button 
                                            onClick={() => setExpandedCat(expandedCat === idx ? null : idx)}
                                            className="w-full flex items-center justify-between py-2 group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                                                    <Image src={cat.image ? (cat.image.startsWith('http') ? cat.image : `http://bellnjohn.test:90/storage/${cat.image}`) : 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600'} alt={cat.name || cat.title || 'Category'} fill className="object-cover" />
                                                </div>
                                                <span className={`font-bold transition-colors ${expandedCat === idx ? "text-brand" : "text-slate-700"}`}>
                                                    {cat.name || cat.title}
                                                </span>
                                            </div>
                                            <ChevronRight className={`w-5 h-5 text-slate-300 transition-transform duration-300 ${expandedCat === idx ? "rotate-90 text-brand" : ""}`} />
                                        </button>

                                        {/* Subcategories Accordion */}
                                        <AnimatePresence>
                                            {expandedCat === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pl-16 pr-2 py-4 space-y-6">
                                                        {(cat.children || cat.subCategories || []).map((sub: any, sIdx: number) => (
                                                            <div key={sIdx}>
                                                                <Link 
                                                                    href={`/products/category/${cat.slug || cat.id}/${sub.slug || sub.id}`}
                                                                    onClick={onClose}
                                                                    className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-3 hover:text-brand transition-colors"
                                                                >
                                                                    {sub.name || sub.title}
                                                                </Link>
                                                                <ul className="space-y-3">
                                                                    {(sub.children || sub.items || []).map((item: any, iIdx: number) => (
                                                                        <li key={iIdx}>
                                                                            <Link 
                                                                                href={`/products/category/${cat.slug || cat.id}/${sub.slug || sub.id}/${item.slug || item.id}`}
                                                                                onClick={onClose}
                                                                                className="text-sm text-slate-600 hover:text-brand flex items-center gap-2"
                                                                            >
                                                                                <Package className="w-3.5 h-3.5 text-slate-200" />
                                                                                {item.name || item.title}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-slate-50">
                            <Link 
                                href="/products"
                                onClick={onClose}
                                className="w-full flex items-center justify-center py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-brand hover:text-white hover:border-brand transition-all"
                            >
                                View All Products
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
