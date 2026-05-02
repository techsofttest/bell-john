"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ChevronDown,
    Heart,
    ShoppingCart,
    Search,
    User,
    PenTool,
    Monitor,
    Printer,
    Armchair,
    TrendingUp
} from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";

// Categories with Icons for the Dropdown
const categories = [
    {
        title: "Stationery",
        slug: "stationery",
        icon: PenTool,
        links: [
            { title: "Paper & Notebooks", slug: "paper-notebooks" },
            { title: "Writing Instruments", slug: "writing-instruments" },
            { title: "Filing & Folders", slug: "filing-folders" },
            { title: "Desk Accessories", slug: "desk-accessories" }
        ],
    },
    {
        title: "Digital Supplies",
        slug: "digital-supplies",
        icon: Monitor,
        links: [
            { title: "Data Storage", slug: "data-storage" },
            { title: "Computer Accessories", slug: "computer-accessories" },
            { title: "Networking", slug: "networking" },
            { title: "Software", slug: "software" }
        ],
    },
    {
        title: "Office Machines",
        slug: "office-machines",
        icon: Printer,
        links: [
            { title: "Printers & Scanners", slug: "printers-scanners" },
            { title: "Shredders", slug: "shredders" },
            { title: "Laminators", slug: "laminators" },
            { title: "Binding Machines", slug: "binding-machines" }
        ],
    },
    {
        title: "Office Furniture",
        slug: "office-furniture",
        icon: Armchair,
        links: [
            { title: "Ergonomic Chairs", slug: "ergonomic-chairs" },
            { title: "Desks & Workstations", slug: "desks-workstations" },
            { title: "Storage Cabinets", slug: "storage-cabinets" },
            { title: "Meeting Tables", slug: "meeting-tables" }
        ],
    },
];

const popularSearches = [
    "A4 Copy Paper",
    "Ergonomic Office Chairs",
    "HP LaserJet Toner",
    "Presentation Folders"
];

export default function Header() {
    const { wishlist } = useWishlist();
    const { cartItems, openCart } = useCart();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Mock Auth State (Change to true to see "View Profile")
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    // Add a subtle shadow only when scrolling down
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close search when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 flex flex-col w-full bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : "border-b border-slate-100"}`}>

            {/* --- Tier 1: Utility Bar (Top) --- */}
            <div className="bg-[#F8FAFC]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-9 flex justify-between items-center text-[11px] uppercase tracking-wider font-semibold text-slate-500">

                    <div className="hidden md:block">
                        Over two decades of trust across the GCC
                    </div>

                    <div className="flex items-center space-x-6 h-full ml-auto">
                        <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                        <Link href="/products" className="hover:text-brand transition-colors">All Products</Link>
                        <Link href="/about" className="hover:text-brand transition-colors">About Us</Link>
                        <Link href="/contact" className="hover:text-brand transition-colors">Contact</Link>

                        {/* Region Dropdown */}
                        <div className="relative group z-50 h-full flex items-center cursor-pointer ml-2">
                            <div className="flex items-center gap-1.5 hover:text-brand transition-colors h-full">
                                <Image src="https://flagcdn.com/w20/kw.png" width={16} height={11} alt="Kuwait Flag" className="shadow-sm" style={{ width: "auto", height: "auto" }} />
                                <span>Kuwait</span>
                                <ChevronDown className="w-3 h-3" />
                            </div>

                            <div className="absolute top-9 right-0 w-36 bg-white border border-slate-100 shadow-xl p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 text-slate-700 transition-colors text-left font-sans normal-case tracking-normal text-sm">
                                    <Image src="https://flagcdn.com/w20/kw.png" width={16} height={11} alt="Kuwait Flag" className="shadow-sm" style={{ width: "auto", height: "auto" }} />
                                    Kuwait
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 text-slate-700 transition-colors text-left font-sans normal-case tracking-normal text-sm">
                                    <Image src="https://flagcdn.com/w20/ae.png" width={16} height={11} alt="UAE Flag" className="shadow-sm" style={{ width: "auto", height: "auto" }} />
                                    UAE
                                </button>
                            </div>
                        </div>

                        {/* Conditional Auth Button */}
                        <Link href={isLoggedIn ? "/profile" : "/login"} className="flex items-center gap-1.5 hover:text-brand transition-colors ml-2">
                            <User className="w-3.5 h-3.5" />
                            <span>{isLoggedIn ? "View Profile" : "Sign In"}</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- Tier 2: Main Navigation --- */}
            <div className="relative">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">

                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <div className="relative w-44 h-14">
                                <Image
                                    src="/logo/logo.png"
                                    alt="Bell & John Logo"
                                    fill
                                    sizes="176px"
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Center: Category Navigation */}
                    <nav className="hidden lg:flex items-center h-full space-x-10">
                        {categories.map((category, index) => (
                            <div key={index} className="group h-full flex items-center relative">
                                {/* Text Trigger with Down Arrow */}
                                <Link
                                    href={`/products/category/${category.slug}`}
                                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 hover:text-brand transition-colors relative py-2"
                                >
                                    {category.title}
                                    <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-300" />

                                    {/* Animated Underline */}
                                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-brand transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                </Link>

                                {/* Elevated Dropdown Panel */}
                                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-white border border-slate-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 p-6">
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-50">
                                        <category.icon className="w-5 h-5 text-brand" strokeWidth={1.5} stroke="currentColor" />
                                        <Link href={`/products/category/${category.slug}`} className="font-bold text-slate-900 tracking-tight hover:text-brand transition-colors">
                                            {category.title}
                                        </Link>
                                    </div>
                                    <ul className="space-y-2">
                                        {category.links.map((link, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    href={`/products/category/${category.slug}/${link.slug}`}
                                                    className="block py-1.5 text-sm text-slate-500 hover:text-brand hover:translate-x-1 transition-all duration-200"
                                                >
                                                    {link.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* Right: Search, Favorites, Cart */}
                    <div className="flex items-center space-x-7">

                        {/* Search Box with Suggestions */}
                        <div className="hidden xl:block relative" ref={searchRef}>
                            <div className="relative flex items-center z-10">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    onFocus={() => setIsSearchFocused(true)}
                                    className={`pl-4 pr-10 py-2.5 bg-white border-2 text-sm font-medium transition-all duration-300 outline-none rounded-md
                    ${isSearchFocused
                                            ? "w-80 border-slate-300 text-slate-900 placeholder:text-slate-400"
                                            : "w-64 border-slate-300 hover:border-slate-400 text-slate-700 placeholder:text-slate-500"
                                        }
                  `}
                                />
                                <button className={`absolute right-3 transition-colors ${isSearchFocused ? "text-slate-700 hover:text-brand" : "text-slate-400 hover:text-brand"}`}>
                                    <Search className="h-4 w-4" strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Restored Search Suggestions Dropdown */}
                            <div className={`absolute top-14 left-0 w-full bg-white border border-slate-200 shadow-xl rounded-md overflow-hidden transition-all duration-200 origin-top ${isSearchFocused ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                                <div className="p-3">
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2 flex items-center gap-1.5">
                                        <TrendingUp className="w-3.5 h-3.5" /> Popular Searches
                                    </h4>
                                    <ul className="space-y-0.5">
                                        {popularSearches.map((term, idx) => (
                                            <li key={idx}>
                                                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:text-brand hover:bg-slate-50 rounded-md transition-colors flex items-center gap-2">
                                                    <Search className="w-3.5 h-3.5 text-slate-400" />
                                                    {term}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Premium Icons */}
                        <div className="flex items-center space-x-6">
                            <Link href="/wishlist" className="group relative text-slate-800 hover:text-brand transition-colors flex items-center justify-center">
                                <Heart className="w-[22px] h-[22px]" strokeWidth={1.5} />
                                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center z-10 border-2 border-white">
                                    {wishlist?.length || 0}
                                </span>
                                {/* Tooltip */}
                                <span className="absolute top-full mt-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-800 text-white text-[10px] uppercase font-bold tracking-wider py-1.5 px-2.5 rounded shadow-lg pointer-events-none whitespace-nowrap z-50 translate-y-1 group-hover:translate-y-0">
                                    Favorites
                                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 rounded-sm"></span>
                                </span>
                            </Link>

                            <Link href="/cart" className="group relative text-slate-800 hover:text-brand transition-colors flex items-center justify-center">
                                <ShoppingCart className="w-[22px] h-[22px]" strokeWidth={1.5} />
                                <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center z-10 border-2 border-white">
                                    {cartItems?.length || 0}
                                </span>
                                {/* Tooltip */}
                                <span className="absolute top-full mt-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-800 text-white text-[10px] uppercase font-bold tracking-wider py-1.5 px-2.5 rounded shadow-lg pointer-events-none whitespace-nowrap z-50 translate-y-1 group-hover:translate-y-0">
                                    Shopping Cart
                                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 rounded-sm"></span>
                                </span>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
}