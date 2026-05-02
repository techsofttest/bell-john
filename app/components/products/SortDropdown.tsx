"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, ArrowUpDown, TrendingUp, Clock, ArrowUp, ArrowDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const sortOptions = [
    { label: "Newest Arrivals", value: "newest", icon: <Clock className="w-3.5 h-3.5" /> },
    { label: "Best Seller", value: "best-seller", icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { label: "A - Z", value: "a-z", icon: <ArrowUp className="w-3.5 h-3.5" /> },
    { label: "Z - A", value: "z-a", icon: <ArrowDown className="w-3.5 h-3.5" /> },
];

export default function SortDropdown() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentSort = searchParams.get("sort") || "newest";
    const currentOption = sortOptions.find(opt => opt.value === currentSort) || sortOptions[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", value);
        router.push(`?${params.toString()}`, { scroll: false });
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-3 px-4 py-2.5 bg-white border rounded-lg text-xs font-bold transition-all duration-300",
                    isOpen 
                        ? "border-brand ring-4 ring-brand/5 shadow-sm text-brand" 
                        : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                )}
            >
                <div className="flex items-center gap-2">
                    <ArrowUpDown className={cn("w-3.5 h-3.5 transition-transform duration-500", isOpen && "rotate-180")} />
                    <span className="text-slate-400 font-normal mr-1">Sort by:</span>
                    <span>{currentOption.label}</span>
                </div>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            <div className={cn(
                "absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-2xl shadow-slate-200/50 overflow-hidden z-50 transition-all duration-300 origin-top-right",
                isOpen 
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            )}>
                <div className="py-2">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSort(option.value)}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-3 text-[13px] font-medium transition-colors group",
                                currentSort === option.value 
                                    ? "bg-brand/5 text-brand" 
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <span className={cn(
                                    "transition-colors",
                                    currentSort === option.value ? "text-brand" : "text-slate-400 group-hover:text-slate-600"
                                )}>
                                    {option.icon}
                                </span>
                                {option.label}
                            </div>
                            {currentSort === option.value && (
                                <Check className="w-4 h-4" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
