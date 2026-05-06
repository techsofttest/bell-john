"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
    category: string;
    title: string;
}

export default function ProductBreadcrumbs({ category, title }: BreadcrumbsProps) {
    return (
        <div className="bg-white border-b border-slate-100 py-4 mb-8">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between text-xs font-semibold text-slate-500">
                <nav className="flex items-center gap-2 uppercase tracking-widest text-[10px] md:text-xs">
                    <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link href="/products" className="hover:text-brand transition-colors">Catalog</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-slate-400 font-medium">{category}</span>
                    <ChevronRight className="w-3.5 h-3.5 hidden md:inline" />
                    <span className="text-slate-800 font-semibold truncate max-w-[200px] hidden md:inline">{title}</span>
                </nav>
            </div>
        </div>
    );
}
