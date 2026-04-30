import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-10 pb-8 px-4 font-sans">

            {/* Header / Logo */}
            <div className="flex justify-center mb-6">
                <Link href="/" className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight hover:opacity-90 transition-opacity">
                    Bell & John<span className="text-brand">.</span>
                </Link>
            </div>

            {/* Dynamic Content (The Auth Cards) */}
            <main className="flex-1 flex flex-col items-center">
                {children}
            </main>

            {/* Minimalist Legal Footer (Matching Amazon's approach) */}
            <footer className="mt-12 flex flex-col items-center justify-center border-t border-slate-200/80 pt-8 shadow-[0_-20px_20px_-20px_rgba(0,0,0,0.02)]">
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-brand mb-4">
                    <Link href="/conditions" className="hover:text-slate-800 hover:underline transition-all">Conditions of Use</Link>
                    <Link href="/privacy" className="hover:text-slate-800 hover:underline transition-all">Privacy Notice</Link>
                    <Link href="/help" className="hover:text-slate-800 hover:underline transition-all">Help</Link>
                </div>
                <p className="text-[11px] text-slate-500">
                    © {new Date().getFullYear()}, Bell & John Trading Co. W.L.L or its affiliates
                </p>
            </footer>

        </div>
    );
}