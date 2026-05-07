"use client";

import { Lock } from "lucide-react";

interface CheckoutFooterProps {
    compact?: boolean;
}

export default function CheckoutFooter({ compact = false }: CheckoutFooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`bg-white border-t border-slate-200 px-6 lg:px-12 flex justify-between items-center text-slate-500 ${compact ? 'py-3 text-[11px] shrink-0' : 'py-6 text-xs mt-12'}`}>
            <p>© {currentYear} Bell & John Group. All GCC Rights Reserved.</p>
            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Secure Checkout
            </div>
        </footer>
    );
}
