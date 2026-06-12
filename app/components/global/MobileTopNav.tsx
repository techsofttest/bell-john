"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, ShoppingCart, User, LogIn, CircleUser } from "lucide-react";
import { useRegion } from "@/app/context/RegionContext";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { STORAGE_URL } from "@/app/data/products";

interface MobileTopNavProps {
    onOpenSideMenu: () => void;
}

export default function MobileTopNav({ onOpenSideMenu }: MobileTopNavProps) {
    const { selectedCountry, countries, selectCountry, logoUrl } = useRegion();
    const { cartItems } = useCart();
    const { isLoggedIn, customer, logout } = useAuth();
	
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const userMenuRef = useRef<HTMLDivElement>(null);

    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const regionRef = useRef<HTMLDivElement>(null);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
                setIsRegionOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
	
	
	useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (
            userMenuRef.current &&
            !userMenuRef.current.contains(event.target as Node)
        ) {
            setIsUserMenuOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);
	
	

    return (
        <div className="lg:hidden bg-white border-b border-slate-100 px-4 h-16 flex items-center justify-between sticky top-0 z-[150]">


            {/* Hamburger */}
            <button
                onClick={onOpenSideMenu}
                className="p-2.5 bg-slate-50 rounded-xl text-slate-700 hover:text-brand hover:bg-brand/5 transition-all active:scale-95"
            >
                <Menu className="w-6 h-6" />
            </button>



            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
                <div className="relative w-32 h-10">
                    <Image
                        src={logoUrl}
                        alt="Bell & John Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </div>
            </Link>



            <div className="flex items-center gap-2">


                {/* Region Dropdown */}
                {selectedCountry && countries.length > 0 && (
                    <div className="relative cursor-pointer" ref={regionRef}>
                        <button
                            onClick={() => setIsRegionOpen(!isRegionOpen)}
                            className="flex items-center gap-2 hover:bg-slate-50 px-3 py-2 rounded-lg transition-all focus:outline-none"
                        >
                            <Image src={`${STORAGE_URL}/countries/${selectedCountry.name.toLowerCase()}.png`} width={22} height={15} alt={`${selectedCountry.name} Flag`} className="rounded-sm shadow-sm" />

                            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isRegionOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isRegionOpen && (
                            <div className="absolute top-[calc(100%+4px)] right-0 w-44 bg-white border border-slate-100 shadow-2xl rounded-xl p-1 z-[160] animate-fade-in">
                                {countries.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => {
                                            selectCountry(c.code);
                                            setIsRegionOpen(false);
                                        }}
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
                        )}
                    </div>
                )}



                {/* User Menu */}
{mounted && (
    <div className="relative" ref={userMenuRef}>
        {isLoggedIn ? (
            <>
                <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-2 text-slate-700 hover:text-brand transition-colors active:scale-95"
                >
                    <CircleUser className="w-5 h-5" />
                </button>

                {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-[200] overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100">
                            <p className="font-semibold text-slate-900 text-sm">
                                {customer?.name || "Customer"}
                            </p>

                            {customer?.email && (
                                <p className="text-xs text-slate-500 truncate mt-1">
                                    {customer.email}
                                </p>
                            )}
                        </div>

                        
                        <Link
                            href="/my-requests"
                            className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                            onClick={() => setIsUserMenuOpen(false)}
                        >
                            My Quotes
                        </Link>

                        <Link
                            href="/auth/change-password"
                            className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                            onClick={() => setIsUserMenuOpen(false)}
                        >
                            Change Password
                        </Link>

                        <button
                            onClick={() => {
                                logout();
                                setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t border-slate-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </>
        ) : (
            <Link
                href="/auth/login"
                className="p-2 text-slate-700 hover:text-brand transition-colors active:scale-95"
            >
                <CircleUser className="w-5 h-5" />
            </Link>
        )}
    </div>
)}




                {/* Cart Icon */}
                {mounted && (
                    <Link href="/cart" className="p-2 text-slate-700 hover:text-brand transition-colors relative active:scale-95">
                        <ShoppingCart className="w-5 h-5" />
                        {cartItems.length > 0 && (
                            <span className="absolute top-1 right-0.5 bg-brand text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                )}


            </div>
        </div>
    );
}
