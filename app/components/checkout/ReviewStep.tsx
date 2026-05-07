"use client";

import React from "react";
import Button from "@/app/components/ui/Button";

interface ReviewStepProps {
    formData: {
        firstName: string;
        lastName: string;
        phone: string;
        country: string;
        address: string;
        city: string;
        state: string;
        zip: string;
    };
    deliveryMethod: string;
    onPrev: () => void;
    onPlaceOrder: () => void;
    isSubmitting: boolean;
}

export default function ReviewStep({ formData, deliveryMethod, onPrev, onPlaceOrder, isSubmitting }: ReviewStepProps) {
    return (
        <div className="space-y-6 pt-2 animate-fade-in">
            <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Review & submit RFQ</h2>
                <p className="text-slate-500 text-xs">Verify your procurement details before submitting.</p>
            </div>

            {/* Summary card grids */}
            <div className="space-y-4 border border-slate-200 rounded-2xl p-5 bg-slate-50/50 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-slate-200">
                    <div>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Contact Details</span>
                        <p className="font-semibold text-slate-900 mt-1">{formData.firstName} {formData.lastName}</p>
                        <p className="text-slate-600 text-xs mt-0.5">{formData.phone}</p>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Shipping Mode</span>
                        <p className="font-semibold text-slate-900 mt-1">{deliveryMethod}</p>
                        <p className="text-slate-600 text-xs mt-0.5">GCC Dispatch Priority</p>
                    </div>
                </div>
                <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Delivery Target Address</span>
                    <p className="font-semibold text-slate-900 mt-1">{formData.address}</p>
                    <p className="text-slate-600 text-xs mt-0.5">{formData.city}, {formData.state}, {formData.country} ({formData.zip})</p>
                </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
                Your Request For Quote (RFQ) is compilation-ready. No payment details are captured at this step. A sales professional will contact you with regional customized pricing sheet.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4">
                <Button 
                    type="button"
                    onClick={onPrev}
                    variant="primary"
                    className="sm:col-span-4 h-14 uppercase tracking-[0.15em] text-xs font-bold rounded-xl"
                >
                    Back
                </Button>
                <Button 
                    onClick={onPlaceOrder}
                    disabled={isSubmitting}
                    variant="secondary"
                    className="sm:col-span-8 h-14 uppercase tracking-[0.2em] text-xs font-bold rounded-xl bg-brand text-white shadow-lg shadow-brand/20 border-none"
                >
                    {isSubmitting ? "Processing RFQ..." : "Place Quote Request"}
                </Button>
            </div>
        </div>
    );
}
