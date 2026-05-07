"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutFooter from "./CheckoutFooter";
import Button from "@/app/components/ui/Button";

interface CheckoutSuccessProps {
    formData: {
        firstName: string;
        phone: string;
        country: string;
        address: string;
        city: string;
    };
    itemsCount: number;
    onBack: () => void;
}

export default function CheckoutSuccess({ formData, itemsCount, onBack }: CheckoutSuccessProps) {
    const [rfqNumber, setRfqNumber] = useState<string>("");

    useEffect(() => {
        // Generate RFQ number on mount to avoid Next.js hydration mismatches
        const num = Math.floor(100000 + Math.random() * 900000);
        setRfqNumber(`#BJ-${num}`);
    }, []);

    return (
        <div className="bg-[#F8FAFC] h-screen max-h-screen flex flex-col justify-between overflow-hidden font-sans">
            {/* Clean Checkout Header */}
            <CheckoutHeader compact={true} />

            {/* Success Content (Streamlined to 100vh) */}
            <main className="max-w-xl mx-auto px-6 py-4 flex-grow flex flex-col justify-center items-center w-full">
                <div className="w-14 h-14 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-4 shadow-inner animate-bounce">
                    <CheckCircle className="w-7 h-7" strokeWidth={1.5} />
                </div>
                
                <h1 className="font-serif text-2xl md:text-3xl text-slate-900 font-semibold mb-2 leading-tight tracking-tight text-center">
                    Quote Request Placed!
                </h1>
                
                <p className="text-slate-600 text-xs md:text-sm font-normal mb-5 leading-relaxed max-w-md text-center">
                    Thank you, <span className="font-semibold text-slate-900">{formData.firstName || "techsoftmvp"}</span>. Your RFQ has been successfully sent to our GCC sales team. We will contact you with a customized pricing list within 1 business day.
                </p>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 w-full text-left space-y-3 mb-5 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-950 uppercase tracking-widest border-b border-slate-100 pb-2">
                        RFQ Summary Details
                    </h3>
                    <div className="grid grid-cols-2 gap-y-2 text-xs md:text-sm">
                        <span className="text-slate-600">RFQ Ref Number:</span>
                        <span className="font-semibold text-slate-900 text-right">{rfqNumber || "Generating..."}</span>

                        <span className="text-slate-600">Delivery Target:</span>
                        <span className="font-semibold text-slate-900 text-right line-clamp-1">{formData.address}, {formData.city}, {formData.country}</span>

                        <span className="text-slate-600">Contact Phone:</span>
                        <span className="font-semibold text-slate-900 text-right">{formData.phone}</span>

                        <span className="text-slate-600">Items Count:</span>
                        <span className="font-semibold text-slate-900 text-right">{itemsCount} Solutions</span>

                        <span className="text-slate-600">Inquiry Status:</span>
                        <span className="font-semibold text-brand text-right uppercase tracking-wider text-xs">Processing RFQ</span>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <Button 
                        onClick={onBack}
                        variant="secondary"
                        className="px-8 h-11 uppercase tracking-[0.15em] text-xs font-bold rounded-xl bg-brand text-white shadow-md shadow-brand/15 border-none"
                    >
                        Back to Storefront
                    </Button>
                </div>
            </main>

            {/* Clean Footer */}
            <CheckoutFooter compact={true} />
        </div>
    );
}
