"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/data/products";

interface MobileSearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    popularSearches: string[];
}

export default function MobileSearchOverlay({ isOpen, onClose, popularSearches }: MobileSearchOverlayProps) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Reset state when overlay closes
    useEffect(() => {
        if (!isOpen) {
            setQuery("");
            setSuggestions([]);
        }
    }, [isOpen]);

    // Debounced fetch
    useEffect(() => {
        if (query.trim().length < 2) {
            setSuggestions([]);
            return;
        }
        setIsLoading(true);
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`${API_URL}/products/suggestions?q=${encodeURIComponent(query.trim())}`, { cache: "no-store" });
                const json = await res.json();
                setSuggestions(json.status === "success" ? json.data : []);
            } catch {
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const handleSubmit = () => {
        if (query.trim()) {
            onClose();
            router.push(`/products?search=${encodeURIComponent(query.trim())}`);
        }
    };

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
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand/20 outline-none"
                            />
                            {isLoading && (
                                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 animate-spin" />
                            )}
                        </div>
                        <button onClick={onClose} className="p-2 text-slate-500 hover:text-brand">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-grow overflow-y-auto">
                        {query.trim().length < 2 ? (
                            // Empty state
                            <div className="p-6 space-y-8">
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
                                            { title: "Featured Products", href: "/products?featured=true" }
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
                        ) : suggestions.length > 0 ? (
                            // Results
                            <div className="py-2">
                                {suggestions.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.slug}`}
                                        onClick={onClose}
                                        className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
                                            <Image
                                                src={product.image_url || "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600"}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug">{product.name}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                                    </Link>
                                ))}
                                <div className="px-6 py-4 border-t border-slate-100 mt-2">
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full py-3 bg-brand text-white text-sm font-bold rounded-xl hover:bg-brand/90 transition-colors"
                                    >
                                        See all results for &ldquo;{query}&rdquo;
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // No results
                            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                                <Search className="w-14 h-14 text-slate-200 mb-4" />
                                <p className="text-slate-600 text-sm">
                                    No products found for{" "}
                                    <span className="font-bold text-slate-900">&ldquo;{query}&rdquo;</span>
                                </p>
                                <p className="text-slate-400 text-xs mt-1">Try a different keyword</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
