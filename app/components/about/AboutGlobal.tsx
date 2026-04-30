"use client";

import React from "react";
import { Phone, ArrowRight } from "lucide-react";

export default function AboutGlobal() {
    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-10 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 border-b border-slate-200 pb-4 gap-4">
                <h2 className="font-serif text-2xl md:text-3xl text-slate-900 font-medium">
                    Global Reach
                </h2>
                <p className="text-sm text-slate-500 max-w-md md:text-right font-light">
                    Our strategic location in Dubai gives us an operational advantage to operate across GCC, Middle East, Africa, CIS, and North America.
                </p>
            </div>

            {/* Office Locations Grid - Amazon Card Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                {/* Dubai Head Office */}
                <div className="group cursor-pointer flex flex-col h-full bg-white p-6 rounded-xl border border-slate-100 hover:shadow-lg transition-all shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand bg-brand/5 border border-brand/10 px-2 py-1 rounded-sm mb-4 w-max">
                        Head Office
                    </span>
                    <h3 className="font-serif text-2xl text-slate-900 font-medium mb-2 group-hover:text-brand transition-colors">Dubai, UAE</h3>
                    <p className="text-sm font-semibold text-slate-700 mb-2">Bell & John General Trading Co. LLC</p>
                    <p className="text-xs text-slate-500 mb-6 font-light leading-relaxed flex-grow">
                        Office No. 25A, Zommorodah Building<br />
                        Karama, Dubai, United Arab Emirates
                    </p>

                    <div className="mb-6 pt-4 border-t border-slate-100">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-2">Sister Divisions</p>
                        <p className="text-xs text-slate-600 mb-1">• Bell & John Shipping Co. LLC - Dubai</p>
                        <p className="text-xs text-slate-600">• Bell & John Shipping Co. LLC - Abu Dhabi</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                            <Phone className="w-3.5 h-3.5 text-brand" />
                            +(971) 4 396-5023
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand transition-colors" />
                    </div>
                </div>

                {/* Kuwait Office */}
                <div className="group cursor-pointer flex flex-col h-full bg-white p-6 rounded-xl border border-slate-100 hover:shadow-lg transition-all shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-sm mb-4 w-max">
                        Regional Office
                    </span>
                    <h3 className="font-serif text-2xl text-slate-900 font-medium mb-2 group-hover:text-brand transition-colors">Kuwait</h3>
                    <p className="text-sm font-semibold text-slate-700 mb-2">Bell & John Trading Co. W.L.L</p>
                    <p className="text-xs text-slate-500 mb-6 font-light leading-relaxed flex-grow">
                        Office No. 210, Lulu Masseel Building<br />
                        Mirqab, Kuwait
                    </p>

                    <div className="mb-6 pt-4 border-t border-slate-100">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-2">Sister Divisions</p>
                        <p className="text-xs text-slate-600 mb-1">• Bell & John Shipping Co. W.L.L</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                            <Phone className="w-3.5 h-3.5 text-brand" />
                            +(965) 22459082
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand transition-colors" />
                    </div>
                </div>

                {/* Canada Office */}
                <div className="group cursor-pointer flex flex-col h-full bg-white p-6 rounded-xl border border-slate-100 hover:shadow-lg transition-all shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-sm mb-4 w-max">
                        North America
                    </span>
                    <h3 className="font-serif text-2xl text-slate-900 font-medium mb-2 group-hover:text-brand transition-colors">Ontario, Canada</h3>
                    <p className="text-sm font-semibold text-slate-700 mb-2">Bell & John Trading MNC INC</p>
                    <p className="text-xs text-slate-500 mb-6 font-light leading-relaxed flex-grow">
                        40 Albright Road, Brampton<br />
                        L6X 5Q8, Ontario, Canada
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                            <Phone className="w-3.5 h-3.5 text-brand" />
                            +(1) 647-513-8154
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand transition-colors" />
                    </div>
                </div>

            </div>

            {/* Export / Import Partners Tags - Kept at bottom to act as a closing footer for this section */}
            <div className="bg-slate-50 rounded-2xl p-8 md:p-10 text-center border border-slate-100">
                <h3 className="text-base font-serif text-slate-800 mb-6">Our Export & Import Partners</h3>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                    {['UAE', 'Kuwait', 'Saudi Arabia', 'Qatar', 'Oman', 'Bahrain', 'Iraq', 'Jordan', 'Egypt', 'Tanzania', 'Kenya', 'Djibouti', 'Tunisia', 'Algeria', 'Morocco', 'Nigeria', 'Ghana'].map((country, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-600 font-medium shadow-sm hover:border-brand hover:text-brand transition-colors cursor-default">
                            {country}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
}