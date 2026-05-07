"use client";

import React from "react";
import Button from "@/app/components/ui/Button";

interface DeliveryStepProps {
    deliveryMethod: string;
    onChangeDelivery: (method: string) => void;
    onNext: (e: React.FormEvent) => void;
    onPrev: () => void;
}

export default function DeliveryStep({ deliveryMethod, onChangeDelivery, onNext, onPrev }: DeliveryStepProps) {
    return (
        <form onSubmit={onNext} className="space-y-6 pt-2 animate-fade-in">
            <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Delivery method</h2>
                <p className="text-slate-500 text-xs">Choose how you want your corporate solutions dispatched.</p>
            </div>

            <div className="space-y-4">
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === "Standard Free Business Delivery" ? "border-slate-900 bg-slate-50/50" : "border-slate-200 hover:border-slate-300"}`}>
                    <div className="flex items-center gap-3">
                        <input 
                            type="radio" 
                            name="deliveryMethod" 
                            value="Standard Free Business Delivery"
                            checked={deliveryMethod === "Standard Free Business Delivery"}
                            onChange={() => onChangeDelivery("Standard Free Business Delivery")}
                            className="w-4 h-4 accent-slate-900"
                        />
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Standard Free Business Delivery</p>
                            <p className="text-xs text-slate-500 mt-0.5">Delivery in 2 - 4 business days across the GCC.</p>
                        </div>
                    </div>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === "Express GCC Shipping" ? "border-slate-900 bg-slate-50/50" : "border-slate-200 hover:border-slate-300"}`}>
                    <div className="flex items-center gap-3">
                        <input 
                            type="radio" 
                            name="deliveryMethod" 
                            value="Express GCC Shipping"
                            checked={deliveryMethod === "Express GCC Shipping"}
                            onChange={() => onChangeDelivery("Express GCC Shipping")}
                            className="w-4 h-4 accent-slate-900"
                        />
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Express GCC Shipping</p>
                            <p className="text-xs text-slate-500 mt-0.5">High priority courier dispatch. 1 - 2 days target delivery.</p>
                        </div>
                    </div>
                </label>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
                <Button 
                    type="button"
                    onClick={onPrev}
                    variant="primary"
                    className="h-12 uppercase tracking-[0.15em] text-xs font-bold rounded-xl"
                >
                    Back
                </Button>
                <Button 
                    type="submit"
                    variant="secondary"
                    className="h-12 uppercase tracking-[0.15em] text-xs font-bold rounded-xl"
                >
                    Continue
                </Button>
            </div>
        </form>
    );
}
