"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    ChevronDown,
    Heart,
    ShoppingCart,
    Search,
    User,
    TrendingUp,
    Loader2
} from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { useRegion } from "@/app/context/RegionContext";
import { useAuth } from "@/app/context/AuthContext";

import MobileTopNav from "./MobileTopNav";
import MobileBottomNav from "./MobileBottomNav";
import MobileSearchOverlay from "./MobileSearchOverlay";
import MobileSideMenu from "./MobileSideMenu";
import MobileMoreModal from "./MobileMoreModal";

import { STORAGE_URL, API_URL } from "@/app/data/products";

// Add helper to encode images
const encodeImageUrl = (imagePath: string | null | undefined): string => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600';
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
    const segments = imagePath.split('/').map(segment => encodeURIComponent(segment));
    return `${STORAGE_URL}/${segments.join('/')}`;
};

const popularSearches = [
    "A4 Copy Paper",
    "Ergonomic Office Chairs",
    "HP LaserJet Toner",
    "Presentation Folders"
];

export default function Header({ categories = [] }: { categories?: any[] }) {
    const router = useRouter();
    const { wishlist } = useWishlist();
    const { cartItems, openCart } = useCart();
    const { selectedCountry, countries, selectCountry, logoUrl } = useRegion();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

    // Mobile States
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isMobileSideMenuOpen, setIsMobileSideMenuOpen] = useState(false);
    const [isMobileMoreModalOpen, setIsMobileMoreModalOpen] = useState(false);

    // Real Auth State from Context
    const { isLoggedIn, customer, logout } = useAuth();

    const searchRef = useRef<HTMLDivElement>(null);

    // Hydration check to prevent SSR mismatches
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounced suggestions fetch
    useEffect(() => {
        if (searchQuery.trim().length < 2) {
            setSuggestions([]);
            setIsLoadingSuggestions(false);
            return;
        }
        
        setIsLoadingSuggestions(true);
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(
                    `${API_URL}/products/suggestions?q=${encodeURIComponent(searchQuery.trim())}`,
                    { 
                        cache: 'no-store',
                        headers: {
                            'Accept': 'application/json',
                        }
                    }
                );
                
                if (!res.ok) {
                    console.error(`Search failed with status ${res.status}`);
                    setSuggestions([]);
                    return;
                }
                
                const json = await res.json();
                
                // Validate response structure
                if (json.status === 'success' && Array.isArray(json.data)) {
                    setSuggestions(json.data);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Search error:', error);
                setSuggestions([]);
            } finally {
                setIsLoadingSuggestions(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim().length >= 2) {
            e.preventDefault();
            setIsSearchFocused(false);
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 flex flex-col w-full bg-white transition-all duration-300 ${isScrolled ? "shadow-md" : "border-b border-slate-100"}`}>
                
                {/* --- Mobile Top Navigation --- */}
                <MobileTopNav onOpenSideMenu={() => setIsMobileSideMenuOpen(true)} />

                {/* --- Tier 1: Main Navigation (Desktop) --- */}
                <div className="relative bg-white border-b border-slate-50 z-30 hidden lg:block">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex justify-between items-center gap-8">

                        {/* Left: Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center">
                                <div className="relative w-40 h-12 md:w-48 md:h-16 transition-all">
                                    <Image
                                        src={logoUrl}
                                        alt="Bell & John Logo"
                                        fill
                                        sizes="(max-width: 768px) 160px, 192px"
                                        className="object-contain object-left"
                                        priority
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* Center: Main Links */}
                        <nav className="hidden lg:flex items-center space-x-7">
                            {[
                                { title: "Home", href: "/" },
                                { title: "All Products", href: "/products" },
                                { title: "About Us", href: "/about" },
                                { title: "Contact", href: "/contact" }
                            ].map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className="text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-700 hover:text-brand transition-colors relative group py-2"
                                >
                                    {link.title}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>

                        {/* Right: Actions */}
                        <div className="flex items-center space-x-6">
                            {/* Search */}
                            <div className="hidden xl:block relative z-40" ref={searchRef}>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsSearchFocused(true)}
                                        onKeyDown={handleSearchKeyDown}
                                        className={`pl-4 pr-10 py-2 bg-white border border-slate-200 text-sm font-medium transition-all duration-300 outline-none rounded-lg focus:border-brand/30
                                            ${isSearchFocused ? "w-72 shadow-sm" : "w-48"}
                                        `}
                                    />
                                    {isLoadingSuggestions
                                        ? <Loader2 className="absolute right-3 h-4 w-4 text-slate-400 animate-spin" />
                                        : <Search className="absolute right-3 h-4 w-4 text-slate-400" strokeWidth={2} />
                                    }
                                </div>

                                {/* Search Suggestions Dropdown */}
                                <div className={`absolute top-[calc(100%+8px)] left-0 w-80 bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden transition-all duration-200 origin-top z-[100] ${isSearchFocused ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                                    {searchQuery.trim().length < 2 ? (
                                        // Empty state: popular searches
                                        <div className="p-4">
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 px-2 flex items-center gap-2">
                                                <TrendingUp className="w-3.5 h-3.5" /> Popular
                                            </h4>
                                            <div className="flex flex-col gap-1">
                                                {popularSearches.map((term, idx) => (
                                                    <button
                                                        key={idx}
                                                        onMouseDown={() => {
                                                            setSearchQuery(term);
                                                        }}
                                                        className="text-left px-3 py-2 text-sm text-slate-600 hover:text-brand hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-3"
                                                    >
                                                        <Search className="w-3.5 h-3.5 text-slate-300" />
                                                        {term}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : suggestions.length > 0 ? (
                                        // Results
                                        <div className="py-2">
                                            {suggestions.map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/products/${product.slug}`}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        setIsSearchFocused(false);
                                                        router.push(`/products/${product.slug}`);
                                                    }}
                                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                                                >
                                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50 flex items-center justify-center">
                                                        <Image
                                                            src={product.image_url || 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600'}
                                                            alt={product.name}
                                                            fill
                                                            className="object-contain p-1"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600';
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-slate-700 group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                                                        {product.name}
                                                    </span>
                                                </Link>
                                            ))}
                                            <div className="border-t border-slate-100 mt-1 pt-1 px-2 pb-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setIsSearchFocused(false);
                                                        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                                                    }}
                                                    className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold text-brand hover:underline hover:bg-slate-50 rounded transition-colors"
                                                >
                                                    See all results for &ldquo;{searchQuery}&rdquo; →
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // No results
                                        <div className="px-4 py-8 text-center">
                                            <Search className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                            <p className="text-sm text-slate-500">No products found for <span className="font-semibold text-slate-800">&ldquo;{searchQuery}&rdquo;</span></p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Icons & User Actions */}
                            <div className="flex items-center space-x-4">
                                <Link href="/wishlist" className="relative p-2 text-slate-600 hover:text-brand transition-colors">
                                    <Heart className="w-[22px] h-[22px]" strokeWidth={1.5} />
                                    {wishlist.length > 0 && (
                                        <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                                            {wishlist.length}
                                        </span>
                                    )}
                                </Link>
                                <Link href="/cart" className="relative p-2 text-slate-600 hover:text-brand transition-colors">
                                    <ShoppingCart className="w-[22px] h-[22px]" strokeWidth={1.5} />
                                    {cartItems.length > 0 && (
                                        <span className="absolute top-1 right-1 bg-brand text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </Link>

                                {/* Divider */}
                                <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

                                {/* Region Dropdown */}
                                {selectedCountry && countries.length > 0 && (
                                    <div className="relative group cursor-pointer">
                                        <div className="flex items-center gap-2.5 hover:bg-slate-50 px-3 py-2 rounded-lg transition-all">
                                            <Image src={`${STORAGE_URL}/countries/${selectedCountry.name.toLowerCase()}.png`} width={22} height={15} alt={`${selectedCountry.name} Flag`} className="rounded-sm shadow-sm" />
                                            <span className="text-xs font-bold text-slate-700">
                                                {{
                                                    kw: "KWD",
                                                    ae: "AED",
                                                    sa: "SAR",
                                                    qa: "QAR",
                                                    bh: "BHD",
                                                    om: "OMR"
                                                }[selectedCountry.code.toLowerCase()] || selectedCountry.code.toUpperCase()}
                                            </span>
                                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                                        </div>
                                        <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-slate-100 shadow-2xl rounded-xl p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[120]">
                                            {countries.map((c) => (
                                                <button
                                                    key={c.id}
                                                    onClick={() => selectCountry(c.code)}
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 transition-colors text-left font-semibold text-xs rounded-lg"
                                                >
                                                    <Image src={`${STORAGE_URL}/countries/${c.name.toLowerCase()}.png`} width={20} height={14} alt={`${c.name} Flag`} />
                                                    {c.name} ({{
                                                        kw: "KWD",
                                                        ae: "AED",
                                                        sa: "SAR",
                                                        qa: "QAR",
                                                        bh: "BHD",
                                                        om: "OMR"
                                                    }[c.code.toLowerCase()] || c.code.toUpperCase()})
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Profile Dropdown */}
                                <div className="relative group cursor-pointer">
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700">
                                            <User className="w-4 h-4" strokeWidth={2} />
                                        </div>
                                        {mounted && isLoggedIn && customer && (
                                            <span className="text-xs font-bold text-slate-700 max-w-[80px] truncate">
                                                {customer.name.split(" ")[0]}
                                            </span>
                                        )}
                                    </div>

                                    {/* Dropdown Menu */}
                                    <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-slate-100 shadow-2xl rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[120]">
                                        <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                {mounted && isLoggedIn && customer ? `Hello, ${customer.name}` : "Account"}
                                            </p>
                                        </div>
                                        
                                        {(!mounted || !isLoggedIn) ? (
                                            <>
                                                <Link href="/auth/login" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand transition-colors text-sm font-medium rounded-lg">
                                                    Sign In
                                                </Link>
                                                <Link href="/auth/register" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand transition-colors text-sm font-medium rounded-lg">
                                                    Register
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand transition-colors text-sm font-medium rounded-lg">
                                                    Profile
                                                </Link>
                                                <Link href="/my-requests" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand transition-colors text-sm font-medium rounded-lg">
                                                    My Quotes
                                                </Link>
                                                <button 
                                                    onClick={() => logout()}
                                                    className="w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors text-sm font-medium rounded-lg"
                                                >
                                                    Sign Out
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Tier 3: Category Bar with Mega Menu (Desktop) --- */}
                <div
                    className="bg-white border-b border-slate-100 hidden lg:block relative z-20"
                    onMouseLeave={() => setActiveCategory(null)}
                >
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-center">
                        <div className="flex items-center space-x-12 h-full">
                            {categories.map((category, idx) => (
                                <div
                                    key={idx}
                                    className="h-full flex items-center"
                                    onMouseEnter={() => {
                                        setActiveCategory(idx);
                                        setIsSearchFocused(false); // Hide search suggestions when category is hovered
                                    }}
                                >
                                    <Link
                                        href={`/products/category/${category.slug || category.id}`}
                                        className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest h-full transition-all border-b-2 
                                            ${activeCategory === idx ? "border-brand text-brand scale-110" : "border-transparent text-slate-600 hover:text-brand"}
                                        `}
                                    >
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-100 shadow-sm">
                                            <Image src={encodeImageUrl(category.image)} alt={category.name || category.title} fill className="object-cover" />
                                        </div>
                                        {category.name || category.title}
                                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeCategory === idx ? "rotate-180" : ""}`} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mega Menu Dropdown */}
                    <div className={`absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl transition-all duration-300 origin-top z-[110] overflow-hidden
                        ${activeCategory !== null ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"}
                    `}>
                        <div className="max-w-[1400px] mx-auto px-12 py-12">
                            {activeCategory !== null && (
                                <div className="grid grid-cols-5 gap-12">
                                    {/* Category Header */}
                                    <div className="col-span-1 border-r border-slate-100 pr-10 flex flex-col">
                                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-md">
                                            <Image src={encodeImageUrl(categories[activeCategory].image)} alt={categories[activeCategory].name || categories[activeCategory].title} fill className="object-cover" />
                                        </div>
                                        <h3 className="font-serif text-3xl font-medium tracking-tight text-slate-900 mb-4">
                                            {categories[activeCategory].name || categories[activeCategory].title}
                                        </h3>
                                        <p className="text-sm text-slate-500 font-light leading-relaxed mb-8">
                                            Explore our comprehensive range of high-quality {(categories[activeCategory].name || categories[activeCategory].title)?.toLowerCase()} tailored for your business needs.
                                        </p>
                                        <Link
                                            href={`/products/category/${categories[activeCategory].slug || categories[activeCategory].id}`}
                                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-brand transition-colors"
                                        >
                                            View All Products <ChevronDown className="-rotate-90 w-3 h-3" />
                                        </Link>
                                    </div>

                                    {/* Sub Categories & Items */}
                                    <div className="col-span-4">
                                        <div className="grid grid-cols-4 gap-10">
                                            {(categories[activeCategory].children || categories[activeCategory].subCategories || []).map((sub: any, sIdx: number) => (
                                                <div key={sIdx} className="flex flex-col">
                                                    <Link
                                                        href={`/products/category/${categories[activeCategory].slug || categories[activeCategory].id}/${sub.slug || sub.id}`}
                                                        className="font-bold text-slate-900 text-[13px] uppercase tracking-wider mb-6 pb-2 border-b border-slate-100 hover:text-brand transition-colors"
                                                    >
                                                        {sub.name || sub.title}
                                                    </Link>
                                                    <ul className="space-y-3">
                                                        {(sub.children || sub.items || []).map((item: any, iIdx: number) => (
                                                            <li key={iIdx}>
                                                                <Link
                                                                    href={`/products/category/${categories[activeCategory].slug || categories[activeCategory].id}/${sub.slug || sub.id}/${item.slug || item.id}`}
                                                                    className="text-sm text-slate-500 hover:text-brand transition-all flex items-center group/item"
                                                                >
                                                                    <span className="w-0 h-0.5 bg-brand mr-0 transition-all group-hover/item:w-3 group-hover/item:mr-2"></span>
                                                                    {item.name || item.title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* --- Mobile Navigation Overlays & Bars --- */}
            <MobileBottomNav 
                onOpenSearch={() => setIsMobileSearchOpen(true)}
                onOpenMore={() => setIsMobileMoreModalOpen(true)}
            />

            <MobileSearchOverlay 
                isOpen={isMobileSearchOpen} 
                onClose={() => setIsMobileSearchOpen(false)} 
                popularSearches={popularSearches}
            />

            <MobileSideMenu 
                isOpen={isMobileSideMenuOpen} 
                onClose={() => setIsMobileSideMenuOpen(false)} 
                categories={categories}
            />

            <MobileMoreModal 
                isOpen={isMobileMoreModalOpen} 
                onClose={() => setIsMobileMoreModalOpen(false)} 
            />
        </>
    );
}