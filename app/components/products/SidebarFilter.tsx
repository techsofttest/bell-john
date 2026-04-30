"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, SlidersHorizontal, Search } from "lucide-react";

interface SubCategory {
    title: string;
    slug: string;
    count: number;
}

interface CategoryGroup {
    title: string;
    slug: string;
    count: number;
    children: SubCategory[];
}

interface SidebarFilterProps {
    categoryTree: {
        title: string;
        slug: string;
        subCategories: CategoryGroup[];
    };
    currentSlug: string;
}

export default function SidebarFilter({ categoryTree, currentSlug }: SidebarFilterProps) {
    const [openCategories, setOpenCategories] = useState<string[]>(['paper-notebooks']);

    const toggleCategory = (slug: string) => {
        setOpenCategories(prev =>
            prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
        );
    };

    return (
        <aside className="hidden lg:block w-[260px] flex-shrink-0 bg-white border border-slate-200 rounded-xl p-4 self-start sticky top-24">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-200">
                <SlidersHorizontal className="w-4 h-4 text-brand" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800">Filters</h2>
            </div>

            {/* Quick Search */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search in category..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Categories</h3>
            <ul className="space-y-1">
                {categoryTree.subCategories.map((subCat) => {
                    const isOpen = openCategories.includes(subCat.slug);
                    const hasChildren = subCat.children.length > 0;

                    return (
                        <li key={subCat.slug} className="flex flex-col border-b border-slate-100 last:border-0 pb-1 mb-1">
                            <button
                                onClick={() => hasChildren && toggleCategory(subCat.slug)}
                                className="flex items-center justify-between w-full text-left py-2 transition-colors group"
                            >
                                <span className={`text-sm font-medium ${isOpen ? "text-brand" : "text-slate-700 group-hover:text-brand"}`}>
                                    {subCat.title}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-slate-400 font-medium bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded-md">
                                        {subCat.count}
                                    </span>
                                    {hasChildren && (
                                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand" : ""}`} />
                                    )}
                                </div>
                            </button>

                            {hasChildren && (
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-64 opacity-100 mb-2" : "max-h-0 opacity-0"}`}>
                                    <ul className="pl-2 border-l-2 border-slate-100 ml-2 space-y-1 mt-1">
                                        {subCat.children.map(child => (
                                            <li key={child.slug}>
                                                <Link href={`/products/category/${categoryTree.slug}?sub=${child.slug}`}
                                                    className="flex items-center justify-between px-3 py-1.5 text-[13px] text-slate-500 hover:text-brand hover:bg-slate-50 rounded-md transition-colors"
                                                >
                                                    <span>{child.title}</span>
                                                    <span className="text-[10px] text-slate-400">{child.count}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}