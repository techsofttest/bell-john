"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/app/components/ui/Button";

const countries = [
    "Kuwait",
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "Oman",
    "Bahrain",
    "United States",
    "United Kingdom"
];

const states = [
    "Al Asimah (Kuwait City)",
    "Hawalli",
    "Farwaniya",
    "Mubarak Al-Kabeer",
    "Ahmadi",
    "Jahra",
    "Dubai",
    "Abu Dhabi",
    "Riyadh",
    "Eastern Province"
];

interface AddressStepProps {
    formData: {
        country: string;
        address: string;
        city: string;
        state: string;
        zip: string;
    };
    onChange: (fields: Partial<AddressStepProps["formData"]>) => void;
    onNext: (e: React.FormEvent) => void;
    onPrev: () => void;
}

export default function AddressStep({ formData, onChange, onNext, onPrev }: AddressStepProps) {
    return (
        <form onSubmit={onNext} className="space-y-6 pt-2 animate-fade-in">
            <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Shipping address</h2>
                <p className="text-slate-500 text-xs">Enter your delivery address for compile dispatch planning.</p>
            </div>

            <div className="space-y-1.5 relative">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Country/Region *</label>
                <div className="relative">
                    <select 
                        required
                        value={formData.country}
                        onChange={e => onChange({ country: e.target.value })}
                        className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:outline-none text-sm font-medium appearance-none bg-white"
                    >
                        {countries.map((c, i) => (
                            <option key={i} value={c}>{c}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
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
                <div className="space-y-1.5 relative">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">State *</label>
                    <div className="relative">
                        <select 
                            required
                            value={formData.state}
                            onChange={e => onChange({ state: e.target.value })}
                            className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:outline-none text-sm font-medium appearance-none bg-white"
                        >
                            {states.map((s, i) => (
                                <option key={i} value={s}>{s}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
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
