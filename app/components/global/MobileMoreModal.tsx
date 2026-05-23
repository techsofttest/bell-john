"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Info, PhoneCall, ChevronRight, FileText, Lock, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";

interface MobileMoreModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMoreModal({ isOpen, onClose }: MobileMoreModalProps) {
    const { isLoggedIn, logout } = useAuth();
    
    // Hydration check to prevent SSR mismatch
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const menuLinks = [
        { title: "My Quotes", href: "/my-requests", icon: FileText, desc: "View and track your quotes" },
        ...(mounted && isLoggedIn 
            ? [
                { title: "Change Password", href: "/auth/change-password", icon: Lock, desc: "Update your account security" },
                { title: "Logout", onClick: () => { logout(); onClose(); }, icon: LogOut, desc: "Sign out of your account" }
              ] 
            : []),
        { title: "About Us", href: "/about", icon: Info, desc: "Our journey and mission" },
        { title: "Contact Us", href: "/contact", icon: PhoneCall, desc: "Get in touch with us" },
    ];

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
                        className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
                    />
                    
                    {/* Modal */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-[210] bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl"
                    >
                        {/* Handle */}
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
                        
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-serif font-medium text-slate-900">Explore Menu</h3>
                            <button onClick={onClose} className="p-2 bg-slate-50 rounded-full text-slate-400">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {menuLinks.map((link, idx) => {
                                const isLogout = link.title === "Logout";
                                const className = `w-full text-left flex items-center gap-4 p-4 rounded-2xl border transition-all group ${
                                    isLogout 
                                        ? "border-red-50/30 hover:border-red-200/50 hover:bg-red-50/40" 
                                        : "border-slate-50 hover:border-brand/20 hover:bg-brand/5"
                                }`;

                                const content = (
                                    <>
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 transition-colors border border-transparent ${
                                            isLogout 
                                                ? "text-red-500 group-hover:bg-white group-hover:text-red-600 group-hover:border-red-100" 
                                                : "text-slate-500 group-hover:bg-white group-hover:text-brand group-hover:border-brand/10"
                                        }`}>
                                            <link.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className={`text-sm font-bold transition-colors ${
                                                isLogout ? "text-red-600 group-hover:text-red-700" : "text-slate-900 group-hover:text-brand"
                                            }`}>{link.title}</p>
                                            <p className="text-xs text-slate-400">{link.desc}</p>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 transition-colors ${
                                            isLogout ? "text-red-200 group-hover:text-red-500" : "text-slate-200 group-hover:text-brand"
                                        }`} />
                                    </>
                                );

                                if (link.onClick) {
                                    return (
                                        <button 
                                            key={idx}
                                            onClick={link.onClick}
                                            className={className}
                                        >
                                            {content}
                                        </button>
                                    );
                                }

                                return (
                                    <Link 
                                        key={idx}
                                        href={link.href || "/"}
                                        onClick={onClose}
                                        className={className}
                                    >
                                        {content}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
