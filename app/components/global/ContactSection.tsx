"use client";

import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Button from "../ui/Button";

const contactData: Record<string, {
    address: string[];
    phones: string[];
    email: string;
    hours: { days: string; time: string }[];
}> = {
    Kuwait: {
        address: [
            "Al Tujjar Tower, Tower B, Floor 7, Office # 6",
            "Abdulaziz Hamad Al Saqer St, Kuwait City",
        ],
        phones: ["+965-224-59082", "+965-224-59083", "+965-224-59084"],
        email: "info@bellandjohn.online",
        hours: [
            { days: "Sunday – Thursday", time: "8:00 AM – 5:00 PM" },
            { days: "Saturday", time: "9:00 AM – 1:00 PM" },
        ],
    },
};

interface ContactSectionProps {
    region?: string;
}

export default function ContactSection({ region = "Kuwait" }: ContactSectionProps) {
    const info = contactData[region] || contactData["Kuwait"];

    return (
        <section className="bg-[#F8FAFC] border-t border-slate-200">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* ── Section Header ── */}
                <div className="py-12 border-b border-slate-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-2">Contact Us</p>
                        <h2 className="text-xl md:text-3xl font-semibold text-slate-900 leading-tight">
                            We&apos;re here to help
                        </h2>
                    </div>
                    <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                        Reach out for product inquiries, bulk orders, or office procurement support across the GCC.
                    </p>
                </div>

                {/* ── Two-Column Body ── */}
                <div className="grid lg:grid-cols-5">

                    {/* Left: Info Panel */}
                    <div className="lg:col-span-2 py-12 lg:pr-12 lg:border-r border-slate-200 flex flex-col gap-10">

                        {/* Address */}
                        <div className="flex gap-4 group">
                            <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/5 group-hover:shadow-md">
                                <MapPin size={18} className="text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Visit Us</p>
                                {info.address.map((line, i) => (
                                    <p key={i} className="text-sm text-slate-700 leading-relaxed">{line}</p>
                                ))}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-4 group">
                            <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/5 group-hover:shadow-md">
                                <Phone size={18} className="text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Call Us</p>
                                {info.phones.map((phone, i) => (
                                    <a key={i} href={`tel:${phone}`} className="block text-sm text-slate-700 hover:text-brand font-medium transition-colors">
                                        {phone}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex gap-4 group">
                            <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/5 group-hover:shadow-md">
                                <Mail size={18} className="text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Email</p>
                                <a href={`mailto:${info.email}`} className="text-sm text-brand font-medium hover:underline break-all transition-colors">
                                    {info.email}
                                </a>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="flex gap-4 group">
                            <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/5 group-hover:shadow-md">
                                <Clock size={18} className="text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Working Hours</p>
                                <div className="space-y-2">
                                    {info.hours.map((h, i) => (
                                        <div key={i} className="flex items-center justify-between gap-6 text-sm">
                                            <span className="text-slate-500">{h.days}</span>
                                            <span className="text-slate-800 font-medium">{h.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Divider + Note */}
                        <div className="pt-6 mt-2 border-t border-slate-200/60">
                            <p className="text-[13px] text-slate-500 leading-relaxed">
                                Prefer to call? Our team is available during working hours and typically responds to emails within one business day.
                            </p>
                        </div>
                    </div>

                    {/* Right: Form Panel */}
                    <div className="lg:col-span-3 py-12 lg:pl-12">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-900">Send us a message</h3>
                            <p className="text-sm text-slate-500 mt-1">We'll get back to you as soon as possible.</p>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                    Full Name <span className="text-brand">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                    Email Address <span className="text-brand">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="john@company.com"
                                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enterprise Ltd."
                                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+965 ..."
                                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-400"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                    Your Message <span className="text-brand">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="How can we assist your business today?"
                                    className="w-full p-4 bg-white border border-slate-300 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-400 resize-none"
                                />
                            </div>

                            <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
                                <p className="text-[13px] text-slate-500">
                                    Fields marked <span className="text-brand font-bold">*</span> are required.
                                </p>
                                <Button variant="secondary" className="gap-2 px-8 h-12 rounded-xl shadow-sm hover:shadow-md transition-all font-medium flex items-center justify-center">
                                    Send Message <Send size={16} />
                                </Button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}