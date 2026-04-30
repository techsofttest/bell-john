"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Heart, ShoppingBag, Trash2 } from "lucide-react";
import ProductCard from "../../components/products/ProductCard";

// Mock data
const INITIAL_WISHLIST = [
    { id: 1, title: "Premium A4 Copy Paper - 500 Sheets", category: "Stationery", image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600", tag: { label: "Best Seller", scheme: "bestSeller" as const } },
    { id: 2, title: "Pilot G2 Premium Gel Pens (Pack of 12)", category: "Writing Instruments", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600" },
    { id: 3, title: "Leitz 180° Hardboard Lever Arch Files", category: "Filing & Folders", image: "https://images.unsplash.com/photo-1568227451240-b6f79ccba53b?q=80&w=600", tag: { label: "New", scheme: "new" as const } },
    { id: 4, title: "Double A Paper A4 80GSM - 5 Reams", category: "Stationery", image: "https://images.unsplash.com/photo-1589982456636-cfb938f92d47?q=80&w=600" },
    { id: 5, title: "Deli Mesh Desk Organizer (Black)", category: "Desk Accessories", image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=600" },
    { id: 6, title: "Premium A4 Copy Paper - 500 Sheets", category: "Stationery", image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600", tag: { label: "Best Seller", scheme: "bestSeller" as const } },
    { id: 7, title: "Pilot G2 Premium Gel Pens (Pack of 12)", category: "Writing Instruments", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600" },
];

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

    const removeFromWishlist = (id: string | number) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="bg-[#F4F5F7] min-h-screen pb-24 font-sans">

            {/* ── THE HERO STRIP (Moglix Style) ── */}
            <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-2">
                        <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-800">Wishlist</span>
                    </nav>

                    {/* Title Area */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl md:text-2xl text-slate-900 font-bold">
                            Your Wishlist <span className="text-sm font-normal text-slate-500 ml-2">({wishlist.length} Items)</span>
                        </h1>

                        {/* Clear Wishlist Button (Optional addition for UX) */}
                        {wishlist.length > 0 && (
                            <button
                                onClick={() => setWishlist([])}
                                className="flex items-center gap-2 px-3 py-1.5 text-slate-400 hover:text-red-600 transition-colors text-[10px] uppercase tracking-widest font-bold"
                            >
                                <Trash2 size={14} /> Clear List
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-8">
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                        {wishlist.map((item) => (
                            <ProductCard
                                key={item.id}
                                {...item}
                                isWishlistPage={true}
                                onRemove={removeFromWishlist}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty State - Maintained for UX */
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 text-slate-300">
                            <Heart className="w-10 h-10" />
                        </div>
                        <h2 className="text-xl font-serif text-slate-800 mb-3">Your wishlist is empty</h2>
                        <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto font-light leading-relaxed">
                            No items saved yet. Start browsing to curate your next order.
                        </p>
                        <Link href="/products" className="inline-flex items-center gap-2 bg-[#020617] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand transition-all shadow-lg shadow-slate-200">
                            <ShoppingBag className="w-4 h-4" />
                            Return to Catalog
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}