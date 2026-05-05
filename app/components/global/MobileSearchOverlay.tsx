"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface MobileSearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    popularSearches: string[];
}

export default function MobileSearchOverlay({ isOpen, onClose, popularSearches }: MobileSearchOverlayProps) {
    const [query, setQuery] = useState("");

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed inset-0 z-[200] bg-white flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center gap-4 p-4 border-b border-slate-100">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search for products..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand/20 outline-none"
                            />
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 text-slate-500 hover:text-brand"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-grow overflow-y-auto p-6">
                        {query.length === 0 ? (
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" /> Popular Searches
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {popularSearches.map((term, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => setQuery(term)}
                                                className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm text-slate-600 hover:bg-brand hover:text-white hover:border-brand transition-all"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Quick Links</h4>
                                    <div className="space-y-1">
                                        {[
                                            { title: "New Arrivals", href: "/products?sort=new" },
                                            { title: "Best Sellers", href: "/products?sort=popular" },
                                            { title: "Featured Solutions", href: "/products?featured=true" }
                                        ].map((link, idx) => (
                                            <Link 
                                                key={idx}
                                                href={link.href}
                                                onClick={onClose}
                                                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors"
                                            >
                                                <span className="text-sm font-medium">{link.title}</span>
                                                <ArrowRight className="w-4 h-4 text-slate-300" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-500 text-sm">Searching for <span className="font-bold text-slate-900">"{query}"</span>...</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
