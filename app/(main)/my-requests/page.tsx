"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { API_URL } from "@/app/data/products";
import Button from "@/app/components/ui/Button";
import Link from "next/link";
import { 
    FileText, 
    Calendar, 
    ShoppingBag, 
    ArrowRight, 
    Search, 
    Mail, 
    CheckCircle2, 
    Clock, 
    MapPin, 
    ChevronDown, 
    ChevronUp,
    ShieldAlert
} from "lucide-react";

interface RequestItem {
    id: number;
    title: string;
    quantity: number;
    price: number;
    subtotal: number;
    variant_id: number | null;
    product?: {
        image: string;
    };
}

interface QuoteRequest {
    id: number;
    order_number: string;
    placed_at: string;
    status: string;
    total: number;
    currency: string;
    billing_address: {
        first_name?: string;
        last_name?: string;
        name?: string;
        email: string;
        phone: string;
        company?: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    items: RequestItem[];
}

export default function MyRequestsPage() {
    const { isLoggedIn, customer, token } = useAuth();
    
    // Core state
    const [requests, setRequests] = useState<QuoteRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [expandedId, setExpandedId] = useState<number | null>(null);
    
    // Hydration check to prevent SSR mismatch
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    // Automatically fetch requests when logged in status changes
    useEffect(() => {
        if (isLoggedIn && customer?.email) {
            fetchRequests(customer.email);
        }
    }, [isLoggedIn, customer]);

    const fetchRequests = async (email: string) => {
        setLoading(true);
        setError("");
        try {
            const headers: Record<string, string> = {
                "Accept": "application/json",
            };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}/my-requests?email=${encodeURIComponent(email)}`, {
                method: "GET",
                headers
            });

            const data = await response.json();
            if (response.ok && data.status === "success") {
                setRequests(data.data || []);
            } else {
                setError(data.message || "Failed to load requests.");
            }
        } catch (err) {
            console.error("Fetch requests error:", err);
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    // Helper for beautiful, readable date formats
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // Helper to return style pills depending on status
    const getStatusStyle = (status: string) => {
        const lower = status.toLowerCase();
        if (lower === "completed" || lower === "approved") {
            return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
        }
        if (lower === "cancelled" || lower === "rejected") {
            return "bg-rose-50 text-rose-700 border-rose-200/60";
        }
        if (lower === "processing") {
            return "bg-blue-50 text-blue-700 border-blue-200/60";
        }
        return "bg-amber-50 text-amber-700 border-amber-200/60";
    };

    if (mounted && !isLoggedIn) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
                <div className="text-center max-w-md">
                    <h2 className="text-2xl font-serif font-medium text-slate-900 mb-3">
                        Access Denied
                    </h2>
                    <p className="text-slate-600 mb-6">
                        You need to be logged in to view your quotes.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/auth/login"
                            className="px-6 py-2.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand/90 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/"
                            className="px-6 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Back Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F8FAFC] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Title Section */}
                <div className="text-center md:text-left mb-8">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-md">
                        B2B Procurement portal
                    </span>
                    <h1 className="text-3xl md:text-4xl font-serif text-slate-900 font-bold tracking-tight mt-3 mb-2">
                        My Inquiries & Requests
                    </h1>
                </div>

                {/* ERROR STATE */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex items-start gap-3 mb-8 animate-fade-in">
                        <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold text-sm block mb-0.5">Lookup Error</span>
                            <span className="text-xs">{error}</span>
                        </div>
                    </div>
                )}

                {/* LOADING SHIMMER STATE */}
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 animate-pulse">
                                <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
                                <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
                                <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* NO REQUESTS RETURNED */}
                        {requests.length === 0 && (
                            <div className="bg-white border border-slate-200/90 rounded-3xl p-10 text-center flex flex-col items-center justify-center shadow-sm animate-fade-in">
                                <div className="w-16 h-16 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-5">
                                    <FileText className="w-7 h-7" />
                                </div>
                                <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                                    No Quote Requests Found
                                </h3>
                                <p className="text-slate-500 text-xs md:text-sm max-w-sm mb-6">
                                    We couldn't find any quote enquiries matching your account email.
                                </p>
                                <Link href="/products">
                                    <Button variant="secondary" className="px-6 h-11 uppercase text-xs tracking-wider font-bold rounded-xl flex items-center gap-2">
                                        Browse Products
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* LIST OF REQUESTS */}
                        {requests.length > 0 && (
                            <div className="space-y-4">
                                {requests.map((req) => {
                                    const isExpanded = expandedId === req.id;
                                    const totalItemsCount = req.items.reduce((sum, item) => sum + item.quantity, 0);

                                    return (
                                        <div 
                                            key={req.id} 
                                            className={`bg-white border transition-all duration-300 rounded-3xl shadow-sm ${
                                                isExpanded ? 'border-slate-300 ring-2 ring-slate-900/5' : 'border-slate-200/80 hover:border-slate-300'
                                            }`}
                                        >
                                            {/* Accordion Trigger Header */}
                                            <div 
                                                onClick={() => toggleExpand(req.id)}
                                                className="p-5 md:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                                            >
                                                <div className="space-y-2">
                                                    <div className="flex flex-wrap items-center gap-2.5">
                                                        <span className="font-mono text-sm font-bold text-slate-900">
                                                            {req.order_number}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 text-xs">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {formatDate(req.placed_at)}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <ShoppingBag className="w-3.5 h-3.5" />
                                                            {totalItemsCount} Solutions / Items
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-none border-slate-100">
                                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
                                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expandable Details Pane */}
                                            {isExpanded && (
                                                <div className="px-5 pb-6 border-t border-slate-100 pt-5 space-y-6 animate-fade-in">
                                                    
                                                    {/* Target Address Card */}
                                                    <div className="bg-slate-50/70 border border-slate-200/50 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-6">
                                                        <div className="flex-1 space-y-2">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Delivery Destination</span>
                                                            <div className="text-xs md:text-sm text-slate-800 space-y-0.5">
                                                                <p className="font-bold text-slate-900">
                                                                    {req.billing_address.first_name || req.billing_address.name} {req.billing_address.last_name || ""}
                                                                </p>
                                                                {req.billing_address.company && (
                                                                    <p className="font-semibold text-brand text-xs">
                                                                        Company: {req.billing_address.company}
                                                                    </p>
                                                                )}
                                                                <p className="flex items-center gap-1.5 mt-1 text-slate-600">
                                                                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                                    {req.billing_address.address}, {req.billing_address.city}, {req.billing_address.state}
                                                                </p>
                                                                <p className="text-slate-600 pl-5">
                                                                    {req.billing_address.country} - {req.billing_address.zip}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="w-px bg-slate-200 hidden md:block"></div>

                                                        <div className="md:w-1/3 space-y-2">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Procurement Contact</span>
                                                            <div className="text-xs text-slate-600 space-y-1">
                                                                <p className="flex items-center gap-1.5">
                                                                    <span className="font-semibold text-slate-800">Email:</span>
                                                                    {req.billing_address.email}
                                                                </p>
                                                                <p className="flex items-center gap-1.5">
                                                                    <span className="font-semibold text-slate-800">Phone:</span>
                                                                    {req.billing_address.phone}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Solutions Inquiry List */}
                                                    <div className="space-y-3">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Items Requested</span>
                                                        <div className="border border-slate-200/80 rounded-2xl overflow-hidden divide-y divide-slate-100">
                                                            {req.items.map((item) => (
                                                                <div key={item.id} className="p-3.5 md:p-4 flex items-center justify-between gap-4 bg-white hover:bg-slate-50/40 transition-colors">
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="font-bold text-slate-900 text-xs md:text-sm truncate">
                                                                            {item.title}
                                                                        </h4>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <span className="font-bold text-slate-900 text-xs md:text-sm">
                                                                            Qty: {item.quantity}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Success Notice / Process Flow */}
                                                    <div className="bg-brand/5 border border-brand/10 rounded-2xl p-3.5 flex items-start gap-2.5">
                                                        <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                                                        <p className="text-[11px] text-brand/90 leading-relaxed">
                                                            Your request is currently being processed by our regional Sales desk. A representative will contact you with specific lead times and shipping plans shortly.
                                                        </p>
                                                    </div>

                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    );
}
