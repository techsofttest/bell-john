"use client";

import React from "react";
import Button from "@/app/components/ui/Button";

interface ContactStepProps {
    formData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    onChange: (fields: Partial<ContactStepProps["formData"]>) => void;
    onNext: (e: React.FormEvent) => void;
}

export default function ContactStep({ formData, onChange, onNext }: ContactStepProps) {
    return (
        <form onSubmit={onNext} className="space-y-6 pt-2 animate-fade-in">
            <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Contact information</h2>
                <p className="text-slate-500 text-xs">Enter your details so our GCC regional team can contact you.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">First name *</label>
                    <input 
                        type="text" 
                        required
                        value={formData.firstName}
                        onChange={e => onChange({ firstName: e.target.value })}
                        placeholder="e.g. John"
                        className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Last name *</label>
                    <input 
                        type="text" 
                        required
                        value={formData.lastName}
                        onChange={e => onChange({ lastName: e.target.value })}
                        placeholder="e.g. Doe"
                        className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Email address *</label>
                    <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => onChange({ email: e.target.value })}
                        placeholder="e.g. john@example.com"
                        className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Phone *</label>
                    <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => onChange({ phone: e.target.value })}
                        placeholder="e.g. +965 9000 0000"
                        className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="pt-4">
                <Button 
                    type="submit"
                    variant="secondary"
                    className="w-full h-12 uppercase tracking-[0.15em] text-xs font-bold rounded-xl"
                >
                    Continue to Address
                </Button>
            </div>
        </form>
    );
}
