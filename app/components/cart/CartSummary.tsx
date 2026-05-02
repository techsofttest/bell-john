"use client";

import { Tag, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../ui/Button";

export default function CartSummary({ itemCount, total }: { itemCount: number; total: number }) {
    const vat = total * 0.05;
    const finalTotal = total + vat;

    return (
        <div className="space-y-4">
            {/* Summary Section */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">
                    Request Summary
                </h2>
                
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 font-medium">Subtotal</span>
                        <span className="font-bold text-slate-900">
                            <span className="text-[10px] md:text-xs font-bold text-slate-400 mr-1">AED</span>
                            {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 font-medium">VAT (5%)</span>
                        <span className="font-bold text-slate-900">
                            <span className="text-[10px] md:text-xs font-bold text-slate-400 mr-1">AED</span>
                            {vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="w-full h-[1px] bg-slate-100 my-2"></div>
                    <div className="flex justify-between text-base">
                        <span className="text-slate-900 font-bold uppercase tracking-wider">Total Est.</span>
                        <span className="font-black text-brand text-lg tracking-tight">
                            <span className="text-[10px] md:text-xs font-bold text-slate-400 mr-1">AED</span>
                            {finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                        <span className="text-slate-400 italic">* Final quote may vary based on quantity and location.</span>
                    </div>
                </div>

                <Button 
                    variant="primary" 
                    className="w-full h-14 bg-brand hover:bg-brand/90 text-white rounded-xl shadow-lg shadow-brand/20 flex items-center justify-center gap-3 group border-none"
                >
                    <span className="text-xs uppercase font-bold tracking-[0.2em]">Proceed to ask a quote</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <div className="mt-6 flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <ShieldCheck className="w-5 h-5 text-brand shrink-0" />
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium uppercase tracking-tight">
                        Safe and Secure procurement. Status updates will be sent to your registered email.
                    </p>
                </div>
            </div>
        </div>
    );
}