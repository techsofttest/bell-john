"use client";

import React from "react";
import Button from "@/app/components/ui/Button";

interface AddressStepProps {
    formData: {
        country: string;
        company: string;
        address: string;
        city: string;
        state: string;
        zip: string;
    };
    onChange: (fields: Partial<AddressStepProps["formData"]>) => void;
    onNext: (e: React.FormEvent) => void;
    onPrev: () => void;
    isLoggedIn: boolean;
    isSubmitting: boolean;
}

export default function AddressStep({ formData, onChange, onNext, onPrev, isLoggedIn, isSubmitting }: AddressStepProps) {
    return (
        <form onSubmit={onNext} className="space-y-6 pt-2 animate-fade-in">
            <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Shipping address</h2>
                <p className="text-slate-500 text-xs">Enter your delivery address for quote dispatch planning.</p>
            </div>

            {/* Read-only Country selection based on regional site state */}
            <div className="space-y-1.5 relative">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Country/Region</label>
                <input 
                    type="text" 
                    readOnly
                    value={formData.country || "Kuwait"}
                    className="w-full h-11 px-4 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg focus:outline-none text-sm font-medium cursor-not-allowed"
                />
                <p className="text-[10px] text-slate-400 mt-0.5">Determined automatically by your selected region setting.</p>
            </div>

            {/* Company Field - Optional */}
            <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Company name (optional)</label>
                <input 
                    type="text" 
                    value={formData.company}
                    onChange={e => onChange({ company: e.target.value })}
                    placeholder="e.g. Acme Corp"
                    className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Address *</label>
                <input 
                    type="text" 
                    required
                    value={formData.address}
                    onChange={e => onChange({ address: e.target.value })}
                    placeholder="Street, building, floor, apartment"
                    className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">City *</label>
                <input 
                    type="text" 
                    required
                    value={formData.city}
                    onChange={e => onChange({ city: e.target.value })}
                    placeholder="e.g. Kuwait City"
                    className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">State *</label>
                    <input 
                        type="text" 
                        required
                        value={formData.state}
                        onChange={e => onChange({ state: e.target.value })}
                        placeholder="e.g. Al Asimah"
                        className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Zip / Postal code *</label>
                    <input 
                        type="text" 
                        required
                        value={formData.zip}
                        onChange={e => onChange({ zip: e.target.value })}
                        placeholder="e.g. 13001"
                        className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Dynamic Buttons - Send Request */}
            {isLoggedIn ? (
                <div className="pt-4">
                    <Button 
                        type="submit"
                        variant="secondary"
                        disabled={isSubmitting}
                        className="w-full h-12 uppercase tracking-[0.15em] text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending Request...
                            </>
                        ) : (
                            "Send request"
                        )}
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button 
                        type="button"
                        onClick={onPrev}
                        disabled={isSubmitting}
                        variant="primary"
                        className="h-12 uppercase tracking-[0.15em] text-xs font-bold rounded-xl"
                    >
                        Back
                    </Button>
                    <Button 
                        type="submit"
                        variant="secondary"
                        disabled={isSubmitting}
                        className="h-12 uppercase tracking-[0.15em] text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            "Send request"
                        )}
                    </Button>
                </div>
            )}
        </form>
    );
}
