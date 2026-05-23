"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import { STORAGE_URL, encodeImageUrl } from "@/app/data/products";

interface MenuItem {
    id?: number | string;
    name?: string;
    title?: string;
    slug?: string;
    children?: MenuItem[];
    items?: MenuItem[];
}

interface Category {
    id?: number | string;
    title?: string;
    name?: string;
    slug?: string;
    image?: string | null;
    subCategories?: MenuItem[];
    children?: MenuItem[];
}

interface MobileSideMenuProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
}

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=600";

export default function MobileSideMenu({
    isOpen,
    onClose,
    categories,
}: MobileSideMenuProps) {
    const [expandedCat, setExpandedCat] = useState<number | null>(null);

    const getImageSrc = (
        image: string | null | undefined
    ): string => {
        if (typeof image !== "string" || image.trim() === "") {
            return FALLBACK_IMAGE;
        }

        try {
            return image.startsWith("http")
                ? image
                : encodeImageUrl(image, STORAGE_URL);
        } catch (error) {
            console.error("Image URL error:", error);
            return FALLBACK_IMAGE;
        }
    };

    const toggleCategory = (index: number) => {
        setExpandedCat((prev) => (prev === index ? null : index));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200,
                        }}
                        className="fixed top-0 left-0 bottom-0 z-[210] flex w-[85%] max-w-[400px] flex-col bg-white shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 p-6">
                            <div>
                                <h3 className="font-serif text-xl font-medium text-slate-900">
                                    Categories
                                </h3>

                                <p className="text-xs text-slate-400">
                                    Browse our product catalog
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="rounded-full bg-slate-50 p-2 text-slate-400 transition-colors hover:text-brand"
                                aria-label="Close menu"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-grow overflow-y-auto py-4">
                            <div className="space-y-4 px-6">
                                {categories.map((cat, idx) => {
                                    const categoryName =
                                        cat.name ||
                                        cat.title ||
                                        "Category";

                                    const categoryChildren =
                                        cat.children ||
                                        cat.subCategories ||
                                        [];

                                    const imageSrc = getImageSrc(
                                        cat.image
                                    );

                                    const isExpanded =
                                        expandedCat === idx;

                                    return (
                                        <div
                                            key={`${cat.id ?? idx}`}
                                            className="border-b border-slate-50 pb-4 last:border-none last:pb-0"
                                        >
                                            {/* Category Button */}
                                            <button
                                                onClick={() =>
                                                    toggleCategory(idx)
                                                }
                                                className="group flex w-full items-center justify-between py-2"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="relative h-12 w-12 overflow-hidden rounded-xl shadow-sm">
                                                        <Image
                                                            src={imageSrc}
                                                            alt={categoryName}
                                                            fill
                                                            sizes="48px"
                                                            className="object-cover"
                                                        />
                                                    </div>

                                                    <span
                                                        className={`font-bold transition-colors ${
                                                            isExpanded
                                                                ? "text-brand"
                                                                : "text-slate-700"
                                                        }`}
                                                    >
                                                        {categoryName}
                                                    </span>
                                                </div>

                                                <ChevronRight
                                                    className={`h-5 w-5 transition-transform duration-300 ${
                                                        isExpanded
                                                            ? "rotate-90 text-brand"
                                                            : "text-slate-300"
                                                    }`}
                                                />
                                            </button>

                                            {/* Subcategories */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            height: "auto",
                                                            opacity: 1,
                                                        }}
                                                        exit={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="space-y-6 py-4 pl-16 pr-2">
                                                            {categoryChildren.map(
                                                                (
                                                                    sub,
                                                                    sIdx
                                                                ) => {
                                                                    const subName =
                                                                        sub.name ||
                                                                        sub.title ||
                                                                        "Subcategory";

                                                                    const subChildren =
                                                                        sub.children ||
                                                                        sub.items ||
                                                                        [];

                                                                    return (
                                                                        <div
                                                                            key={`${sub.id ?? sIdx}`}
                                                                        >
                                                                            <Link
                                                                                href={`/products/category/${
                                                                                    cat.slug ||
                                                                                    cat.id
                                                                                }/${
                                                                                    sub.slug ||
                                                                                    sub.id
                                                                                }`}
                                                                                onClick={
                                                                                    onClose
                                                                                }
                                                                                className="mb-3 block text-[11px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-brand"
                                                                            >
                                                                                {
                                                                                    subName
                                                                                }
                                                                            </Link>

                                                                            <ul className="space-y-3">
                                                                                {subChildren.map(
                                                                                    (
                                                                                        item,
                                                                                        iIdx
                                                                                    ) => {
                                                                                        const itemName =
                                                                                            item.name ||
                                                                                            item.title ||
                                                                                            "Item";

                                                                                        return (
                                                                                            <li
                                                                                                key={`${item.id ?? iIdx}`}
                                                                                            >
                                                                                                <Link
                                                                                                    href={`/products/category/${
                                                                                                        cat.slug ||
                                                                                                        cat.id
                                                                                                    }/${
                                                                                                        sub.slug ||
                                                                                                        sub.id
                                                                                                    }/${
                                                                                                        item.slug ||
                                                                                                        item.id
                                                                                                    }`}
                                                                                                    onClick={
                                                                                                        onClose
                                                                                                    }
                                                                                                    className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-brand"
                                                                                                >
                                                                                                    <Package className="h-3.5 w-3.5 text-slate-200" />

                                                                                                    {
                                                                                                        itemName
                                                                                                    }
                                                                                                </Link>
                                                                                            </li>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-slate-50 p-6">
                            <Link
                                href="/products"
                                onClick={onClose}
                                className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white py-4 text-sm font-bold text-slate-700 transition-all hover:border-brand hover:bg-brand hover:text-white"
                            >
                                View All Products
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}