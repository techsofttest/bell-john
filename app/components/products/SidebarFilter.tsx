"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeSub = searchParams.get("sub");

    // Auto-open the category that contains the active sub, or default to first
    const [openCategories, setOpenCategories] = useState<string[]>(
        categoryTree.subCategories
            .filter(cat => cat.children.some(child => child.slug === activeSub))
            .map(cat => cat.slug)
    );

    const toggleCategory = (slug: string) => {
        setOpenCategories(prev =>
            prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
        );
    };

    return (
        <aside className="hidden lg:block w-[260px] flex-shrink-0 bg-white border border-slate-300 rounded-xl p-4 self-start sticky top-24 shadow-sm">
            <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-300">
                <SlidersHorizontal className="w-4 h-4 text-brand" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800">Filters</h2>
            </div>

            {/* Quick Search */}
            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="Search in category..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-100/50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 px-1">Categories</h3>
                    <ul className="space-y-1">
                        {categoryTree.subCategories.map((subCat) => {
                            const isOpen = openCategories.includes(subCat.slug);
                            const hasChildren = subCat.children.length > 0;
                            const isParentActive = activeSub === subCat.slug;

                            return (
                                <li key={subCat.slug} className="flex flex-col">
                                    {hasChildren ? (
                                        <button
                                            onClick={() => toggleCategory(subCat.slug)}
                                            className="flex items-center justify-between w-full text-left py-2 px-2 hover:bg-slate-50 rounded-lg transition-all group"
                                        >
                                            <span className={`text-[13px] font-semibold ${isOpen ? "text-slate-900" : "text-slate-600 group-hover:text-brand"}`}>
                                                {subCat.title}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-slate-400 font-medium bg-white border border-slate-300 px-2 py-0.5 rounded-full">
                                                    {subCat.count}
                                                </span>
                                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand" : ""}`} />
                                            </div>
                                        </button>
                                    ) : (
                                        <Link
                                            href={`${pathname}?sub=${subCat.slug}`}
                                            className={`flex items-center justify-between w-full text-left py-2 px-2 rounded-lg transition-all group ${isParentActive ? "bg-brand/5 text-brand" : "text-slate-600 hover:bg-slate-50 hover:text-brand"}`}
                                        >
                                            <span className="text-[13px] font-semibold">
                                                {subCat.title}
                                            </span>
                                            <span className={`text-[10px] font-medium border px-2 py-0.5 rounded-full ${isParentActive ? "bg-brand text-white border-brand" : "bg-white text-slate-400 border-slate-300"}`}>
                                                {subCat.count}
                                            </span>
                                        </Link>
                                    )}

                                    {hasChildren && (
                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-64 opacity-100 my-1" : "max-h-0 opacity-0"}`}>
                                            <ul className="pl-3 border-l border-slate-300 ml-4 space-y-0.5 mt-1">
                                                {subCat.children.map(child => {
                                                    const isActive = activeSub === child.slug;
                                                    return (
                                                        <li key={child.slug}>
                                                            <Link href={`${pathname}?sub=${child.slug}`}
                                                                className={`flex items-center justify-between px-3 py-2 text-[13px] rounded-md transition-colors ${isActive ? "bg-brand text-white font-medium" : "text-slate-500 hover:text-brand hover:bg-slate-50"}`}
                                                            >
                                                                <span>{child.title}</span>
                                                                <span className={`text-[10px] ${isActive ? "text-white/80" : "text-slate-400"}`}>{child.count}</span>
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Reset Filter Button */}
                {activeSub && (
                    <Link
                        href={pathname}
                        className="flex items-center justify-center w-full py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        Clear Filters
                    </Link>
                )}
            </div>
        </aside>
    );
}
