"use client";

import { Eye, Target } from "lucide-react";

export default function VisionMission() {
    return (
        <section className="bg-white py-24 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">

                    {/* --- Vision Card --- */}
                    <div className="group bg-white rounded-[2rem] p-10 md:p-14 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/20 transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
                        {/* Decorative Background Element */}
                        <div className="absolute -right-12 -top-12 w-64 h-64 bg-brand/5 rounded-full blur-3xl group-hover:bg-brand/10 transition-colors duration-500"></div>

                        {/* Massive faint background letter */}
                        <div className="absolute -bottom-8 -right-4 text-slate-50 text-[16rem] font-serif font-bold opacity-40 select-none group-hover:text-brand/[0.04] group-hover:scale-105 transition-all duration-700 pointer-events-none leading-none z-0">
                            V
                        </div>

                        <div className="relative z-10 mb-12 md:mb-20">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-brand flex items-center justify-center group-hover:scale-110 group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all duration-500 shadow-sm">
                                    <Eye size={26} strokeWidth={1.5} />
                                </div>
                                <span className="text-xs uppercase tracking-[0.25em] font-bold text-slate-400 group-hover:text-brand transition-colors duration-500">Our Vision</span>
                            </div>

                            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-[1.2] font-medium tracking-tight">
                                To be the GCC’s most trusted provider of office solutions.
                            </h3>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <div className="w-12 h-[2px] bg-slate-200 mb-6 group-hover:bg-brand/40 group-hover:w-20 transition-all duration-500"></div>
                            <p className="text-slate-500 font-light leading-relaxed text-lg max-w-md">
                                Recognized for reliability, consistent quality, and long-term partnerships.
                            </p>
                        </div>
                    </div>

                    {/* --- Mission Card --- */}
                    <div className="group bg-white rounded-[2rem] p-10 md:p-14 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/20 transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
                        {/* Decorative Background Element */}
                        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-brand/5 rounded-full blur-3xl group-hover:bg-brand/10 transition-colors duration-500"></div>

                        {/* Massive faint background letter */}
                        <div className="absolute -bottom-8 -right-4 text-slate-50 text-[16rem] font-serif font-bold opacity-40 select-none group-hover:text-brand/[0.04] group-hover:scale-105 transition-all duration-700 pointer-events-none leading-none z-0">
                            M
                        </div>

                        <div className="relative z-10 mb-12 md:mb-20">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-brand flex items-center justify-center group-hover:scale-110 group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all duration-500 shadow-sm">
                                    <Target size={26} strokeWidth={1.5} />
                                </div>
                                <span className="text-xs uppercase tracking-[0.25em] font-bold text-slate-400 group-hover:text-brand transition-colors duration-500">Our Mission</span>
                            </div>

                            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-[1.2] font-medium tracking-tight">
                                To deliver high-quality products and dependable service.
                            </h3>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <div className="w-12 h-[2px] bg-slate-200 mb-6 group-hover:bg-brand/40 group-hover:w-20 transition-all duration-500"></div>
                            <p className="text-slate-500 font-light leading-relaxed text-lg max-w-md">
                                Helping our customers operate more efficiently, every single day.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}