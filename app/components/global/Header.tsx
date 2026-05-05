"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ChevronDown,
    Heart,
    ShoppingCart,
    Search,
    User,
    TrendingUp
} from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";

import MobileTopNav from "./MobileTopNav";
import MobileBottomNav from "./MobileBottomNav";
import MobileSearchOverlay from "./MobileSearchOverlay";
import MobileSideMenu from "./MobileSideMenu";
import MobileMoreModal from "./MobileMoreModal";

const categories = [
    {
        title: "Stationery",
        slug: "stationery",
        image: "/category/stationery.jpg",
        subCategories: [
            {
                title: "Paper & Notebooks",
                slug: "paper-notebooks",
                items: [
                    { title: "A4 Copy Paper", slug: "a4-copy-paper" },
                    { title: "Spiral Notebooks", slug: "spiral-notebooks" },
                    { title: "Legal Pads", slug: "legal-pads" },
                    { title: "Memo Pads", slug: "memo-pads" },
                    { title: "Carbonless Forms", slug: "carbonless-forms" }
                ]
            },
            {
                title: "Writing Instruments",
                slug: "writing-instruments",
                items: [
                    { title: "Ballpoint Pens", slug: "ballpoint-pens" },
                    { title: "Gel Pens", slug: "gel-pens" },
                    { title: "Highlighters", slug: "highlighters" },
                    { title: "Permanent Markers", slug: "markers" },
                    { title: "Mechanical Pencils", slug: "pencils" }
                ]
            },
            {
                title: "Filing & Storage",
                slug: "filing-folders",
                items: [
                    { title: "Lever Arch Files", slug: "lever-arch-files" },
                    { title: "Ring Binders", slug: "ring-binders" },
                    { title: "Report Files", slug: "report-files" },
                    { title: "Box Files", slug: "box-files" },
                    { title: "Expanding Files", slug: "expanding-files" }
                ]
            },
            {
                title: "Desk Accessories",
                slug: "desk-accessories",
                items: [
                    { title: "Staplers & Staples", slug: "staplers" },
                    { title: "Paper Clips", slug: "paper-clips" },
                    { title: "Tape Dispensers", slug: "tape-dispensers" },
                    { title: "Desk Organizers", slug: "organizers" }
                ]
            }
        ]
    },
    {
        title: "Digital Supplies",
        slug: "digital-supplies",
        image: "/category/Digital Supplies.jpg",
        subCategories: [
            {
                title: "Data Storage",
                slug: "data-storage",
                items: [
                    { title: "USB Flash Drives", slug: "usb-flash-drives" },
                    { title: "External Hard Drives", slug: "external-hard-drives" },
                    { title: "Memory Cards", slug: "memory-cards" },
                    { title: "Solid State Drives", slug: "ssd" }
                ]
            },
            {
                title: "Computer Accessories",
                slug: "computer-accessories",
                items: [
                    { title: "Mice & Keyboards", slug: "mice-keyboards" },
                    { title: "Webcams", slug: "webcams" },
                    { title: "Laptop Stands", slug: "laptop-stands" },
                    { title: "Monitor Arms", slug: "monitor-arms" }
                ]
            },
            {
                title: "Networking",
                slug: "networking",
                items: [
                    { title: "Ethernet Cables", slug: "cables" },
                    { title: "Wi-Fi Routers", slug: "routers" },
                    { title: "Network Switches", slug: "switches" }
                ]
            }
        ]
    },
    {
        title: "Office Machines",
        slug: "office-machines",
        image: "/category/packing supplies.jpg",
        subCategories: [
            {
                title: "Printers & Scanners",
                slug: "printers-scanners",
                items: [
                    { title: "Laser Printers", slug: "laser-printers" },
                    { title: "Inkjet Printers", slug: "inkjet-printers" },
                    { title: "Document Scanners", slug: "document-scanners" },
                    { title: "Label Printers", slug: "label-printers" }
                ]
            },
            {
                title: "Finishing Machines",
                slug: "finishing-machines",
                items: [
                    { title: "Paper Shredders", slug: "shredders" },
                    { title: "Laminating Machines", slug: "laminators" },
                    { title: "Binding Machines", slug: "binding-machines" },
                    { title: "Paper Cutters", slug: "cutters" }
                ]
            },
            {
                title: "Calculators",
                slug: "calculators",
                items: [
                    { title: "Desktop Calculators", slug: "desktop" },
                    { title: "Scientific Calculators", slug: "scientific" },
                    { title: "Printing Calculators", slug: "printing" }
                ]
            }
        ]
    },
    {
        title: "Office Furniture",
        slug: "office-furniture",
        image: "/category/Breakroom.jpg",
        subCategories: [
            {
                title: "Seating Solutions",
                slug: "seating",
                items: [
                    { title: "Executive Chairs", slug: "executive" },
                    { title: "Task Chairs", slug: "task" },
                    { title: "Guest Seating", slug: "guest" },
                    { title: "Ergonomic Chairs", slug: "ergonomic" }
                ]
            },
            {
                title: "Desks & Tables",
                slug: "desks",
                items: [
                    { title: "Office Desks", slug: "office-desks" },
                    { title: "Meeting Tables", slug: "meeting-tables" },
                    { title: "Reception Desks", slug: "reception" },
                    { title: "Adjustable Desks", slug: "adjustable" }
                ]
            },
            {
                title: "Storage & Cabinets",
                slug: "storage",
                items: [
                    { title: "File Cabinets", slug: "file-cabinets" },
                    { title: "Storage Cupboards", slug: "cupboards" },
                    { title: "Bookcases", slug: "bookcases" }
                ]
            }
        ]
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
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    // Mobile States
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isMobileSideMenuOpen, setIsMobileSideMenuOpen] = useState(false);
    const [isMobileMoreModalOpen, setIsMobileMoreModalOpen] = useState(false);

    // Mock Auth State
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
                                        src="/logo/logo.png"
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
                                        onFocus={() => setIsSearchFocused(true)}
                                        className={`pl-4 pr-10 py-2 bg-white border border-slate-200 text-sm font-medium transition-all duration-300 outline-none rounded-lg focus:border-brand/30
                                            ${isSearchFocused ? "w-64 shadow-sm" : "w-48"}
                                        `}
                                    />
                                    <Search className="absolute right-3 h-4 w-4 text-slate-400" strokeWidth={2} />
                                </div>

                                {/* Search Suggestions */}
                                <div className={`absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden transition-all duration-200 origin-top z-[100] ${isSearchFocused ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                                    <div className="p-4">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 px-2 flex items-center gap-2">
                                            <TrendingUp className="w-3.5 h-3.5" /> Popular
                                        </h4>
                                        <div className="flex flex-col gap-1">
                                            {popularSearches.map((term, idx) => (
                                                <button key={idx} className="text-left px-3 py-2 text-sm text-slate-600 hover:text-brand hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-3">
                                                    <Search className="w-3.5 h-3.5 text-slate-300" />
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
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
                                <div className="relative group cursor-pointer">
                                    <div className="flex items-center gap-2.5 hover:bg-slate-50 px-3 py-2 rounded-lg transition-all">
                                        <Image src="https://flagcdn.com/w20/kw.png" width={22} height={15} alt="Kuwait Flag" className="rounded-sm shadow-sm" />
                                        <span className="text-xs font-bold text-slate-700">KWD</span>
                                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                                    </div>
                                    <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-slate-100 shadow-2xl rounded-xl p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[120]">
                                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 transition-colors text-left font-semibold text-xs rounded-lg">
                                            <Image src="https://flagcdn.com/w20/kw.png" width={20} height={14} alt="Kuwait Flag" />
                                            Kuwait (KWD)
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 transition-colors text-left font-semibold text-xs rounded-lg">
                                            <Image src="https://flagcdn.com/w20/ae.png" width={20} height={14} alt="UAE Flag" />
                                            UAE (AED)
                                        </button>
                                    </div>
                                </div>

                                {/* Profile Dropdown */}
                                <div className="relative group cursor-pointer">
                                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-100 text-slate-700 hover:text-brand hover:bg-brand/5 hover:border-brand/20 transition-all border border-slate-200">
                                        <User className="w-5 h-5" strokeWidth={2} />
                                    </div>

                                    {/* Dropdown Menu */}
                                    <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-slate-100 shadow-2xl rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[120]">
                                        <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Account</p>
                                        </div>
                                        <Link href="/auth/login" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand transition-colors text-sm font-medium rounded-lg">
                                            Sign In
                                        </Link>
                                        <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand transition-colors text-sm font-medium rounded-lg">
                                            Profile
                                        </Link>
                                        <Link href="/my-quotes" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand transition-colors text-sm font-medium rounded-lg">
                                            My Quotes
                                        </Link>
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
                                        href={`/products/category/${category.slug}`}
                                        className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest h-full transition-all border-b-2 
                                            ${activeCategory === idx ? "border-brand text-brand scale-110" : "border-transparent text-slate-600 hover:text-brand"}
                                        `}
                                    >
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-100 shadow-sm">
                                            <Image src={category.image} alt={category.title} fill className="object-cover" />
                                        </div>
                                        {category.title}
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
                                            <Image src={categories[activeCategory].image} alt={categories[activeCategory].title} fill className="object-cover" />
                                        </div>
                                        <h3 className="font-serif text-3xl font-medium tracking-tight text-slate-900 mb-4">
                                            {categories[activeCategory].title}
                                        </h3>
                                        <p className="text-sm text-slate-500 font-light leading-relaxed mb-8">
                                            Explore our comprehensive range of high-quality {categories[activeCategory].title.toLowerCase()} tailored for your business needs.
                                        </p>
                                        <Link
                                            href={`/products/category/${categories[activeCategory].slug}`}
                                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-brand transition-colors"
                                        >
                                            View All Products <ChevronDown className="-rotate-90 w-3 h-3" />
                                        </Link>
                                    </div>

                                    {/* Sub Categories & Items */}
                                    <div className="col-span-4">
                                        <div className="grid grid-cols-4 gap-10">
                                            {categories[activeCategory].subCategories.map((sub, sIdx) => (
                                                <div key={sIdx} className="flex flex-col">
                                                    <Link
                                                        href={`/products/category/${categories[activeCategory].slug}/${sub.slug}`}
                                                        className="font-bold text-slate-900 text-[13px] uppercase tracking-wider mb-6 pb-2 border-b border-slate-100 hover:text-brand transition-colors"
                                                    >
                                                        {sub.title}
                                                    </Link>
                                                    <ul className="space-y-3">
                                                        {sub.items.map((item, iIdx) => (
                                                            <li key={iIdx}>
                                                                <Link
                                                                    href={`/products/category/${categories[activeCategory].slug}/${sub.slug}/${item.slug}`}
                                                                    className="text-sm text-slate-500 hover:text-brand transition-all flex items-center group/item"
                                                                >
                                                                    <span className="w-0 h-0.5 bg-brand mr-0 transition-all group-hover/item:w-3 group-hover/item:mr-2"></span>
                                                                    {item.title}
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