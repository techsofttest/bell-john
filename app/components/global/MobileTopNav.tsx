"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";

interface MobileTopNavProps {
    onOpenSideMenu: () => void;
}

export default function MobileTopNav({ onOpenSideMenu }: MobileTopNavProps) {
    return (
        <div className="lg:hidden bg-white border-b border-slate-100 px-4 h-16 flex items-center justify-between sticky top-0 z-[150]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
                <div className="relative w-32 h-10">
                    <Image
                        src="/logo/logo.png"
                        alt="Bell & John Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </div>
            </Link>

            <div className="flex items-center gap-2">
                {/* Region Selector */}
                <div className="relative group p-2 flex items-center gap-1.5 cursor-pointer">
                    <Image src="https://flagcdn.com/w20/kw.png" width={18} height={12} alt="Kuwait Flag" className="rounded-sm shadow-sm" />
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>

                {/* Hamburger */}
                <button 
                    onClick={onOpenSideMenu}
                    className="p-2.5 bg-slate-50 rounded-xl text-slate-700 hover:text-brand hover:bg-brand/5 transition-all active:scale-95"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
