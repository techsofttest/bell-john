"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, ShoppingBag, Search, Heart, Grid, Info, PhoneCall } from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";

interface MobileBottomNavProps {
    onOpenSearch: () => void;
    onOpenMore: () => void;
}

export default function MobileBottomNav({ onOpenSearch, onOpenMore }: MobileBottomNavProps) {
    const pathname = usePathname();
    const { wishlist } = useWishlist();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems: Array<{
        title: string;
        icon: any;
        href?: string;
        onClick?: () => void;
        badge?: number;
    }> = [
            { title: "Home", icon: Home, href: "/" },
            { title: "Search", icon: Search, onClick: onOpenSearch },
            { title: "Wishlist", icon: Heart, href: "/wishlist", badge: mounted ? wishlist.length : 0 },
            { title: "About", icon: Info, href: "/about" },
            { title: "Contact", icon: PhoneCall, href: "/contact" },
            
            /*{ title: "More", icon: Grid, onClick: onOpenMore },*/
        ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[150] bg-white border-t border-slate-100 px-2 pb-safe">
            <div className="flex items-center justify-around h-16 max-w-md mx-auto">
                {navItems.map((item, idx) => {
                    const isActive = item.href ? pathname === item.href : false;

                    const content = (
                        <div className="flex flex-col items-center gap-1 relative px-3 py-1">
                            <item.icon
                                className={`w-5 h-5 transition-colors ${isActive ? "text-brand" : "text-slate-400 group-hover:text-slate-600"}`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className={`text-[10px] font-bold transition-colors ${isActive ? "text-brand" : "text-slate-400 group-hover:text-slate-600"}`}>
                                {item.title}
                            </span>
                            {item.badge && item.badge > 0 ? (
                                <span className="absolute top-0 right-2 bg-brand text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                                    {item.badge}
                                </span>
                            ) : null}
                            {isActive && (
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand rounded-full" />
                            )}
                        </div>
                    );

                    if (item.onClick) {
                        return (
                            <button key={idx} onClick={item.onClick} className="group outline-none">
                                {content}
                            </button>
                        );
                    }

                    if (!item.href) {
                        return (
                            <div key={idx} className="group cursor-default">
                                {content}
                            </div>
                        );
                    }

                    return (
                        <Link key={idx} href={item.href} className="group">
                            {content}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
