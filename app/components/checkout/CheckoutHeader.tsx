"use client";

import Link from "next/link";
import Image from "next/image";

interface CheckoutHeaderProps {
    compact?: boolean;
}

export default function CheckoutHeader({ compact = false }: CheckoutHeaderProps) {
    return (
        <header className={`bg-white border-b border-slate-200 px-6 md:px-12 lg:px-16 flex justify-between items-center ${compact ? 'py-3 shrink-0' : 'py-5'}`}>
            <div className="flex items-center gap-4">
                <Link href="/" className={`relative ${compact ? 'w-24 h-7 lg:w-28 lg:h-8' : 'w-28 h-8 lg:w-36 lg:h-10'}`}>
                    <Image
                        src="/logo/logo.png"
                        alt="Bell & John Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </Link>
                <div className={`w-[1px] bg-slate-200 ${compact ? 'h-5' : 'h-6'}`}></div>
                <span className={`font-bold uppercase tracking-[0.25em] text-slate-500 ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
                    Checkout
                </span>
            </div>
            <Link href="/products" className="text-xs font-semibold text-slate-700 hover:text-brand hover:underline">
                Continue Browsing
            </Link>
        </header>
    );
}
