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
        phones: ["+965-224-59082", "+965-224-59083"],
        email: "info@bellandjohn.online",
        hours: [
            { days: "Sun – Thu", time: "8:00 AM – 5:00 PM" },
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
                        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-tight">
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
                        <div className="flex gap-4">
                            <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                                <MapPin size={16} className="text-brand" strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Visit Us</p>
                                {info.address.map((line, i) => (
                                    <p key={i} className="text-sm text-slate-700 leading-relaxed">{line}</p>
                                ))}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-4">
                            <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                                <Phone size={16} className="text-brand" strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Call Us</p>
                                {info.phones.map((phone, i) => (
                                    <a key={i} href={`tel:${phone}`} className="block text-sm text-slate-700 hover:text-brand transition-colors">
                                        {phone}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex gap-4">
                            <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                                <Mail size={16} className="text-brand" strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email</p>
                                <a href={`mailto:${info.email}`} className="text-sm text-brand hover:underline break-all">
                                    {info.email}
                                </a>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="flex gap-4">
                            <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                                <Clock size={16} className="text-brand" strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Working Hours</p>
                                <div className="space-y-1.5">
                                    {info.hours.map((h, i) => (
                                        <div key={i} className="flex items-center justify-between gap-6 text-sm">
                                            <span className="text-slate-500">{h.days}</span>
                                            <span className="text-slate-700 font-medium">{h.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Divider + Note */}
                        <div className="pt-2 border-t border-slate-200">
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Prefer to call? Our team is available during working hours and typically responds to emails within one business day.
                            </p>
                        </div>
                    </div>

                    {/* Right: Form Panel */}
                    <div className="lg:col-span-3 py-12 lg:pl-12">
                        <h3 className="text-lg font-semibold text-slate-900 mb-8">Send us a message</h3>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    Full Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    className="w-full h-11 px-4 bg-white border border-slate-200 rounded-md focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    Email Address <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="john@company.com"
                                    className="w-full h-11 px-4 bg-white border border-slate-200 rounded-md focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enterprise Ltd."
                                    className="w-full h-11 px-4 bg-white border border-slate-200 rounded-md focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+965 ..."
                                    className="w-full h-11 px-4 bg-white border border-slate-200 rounded-md focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    Your Message <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="How can we assist your business today?"
                                    className="w-full p-4 bg-white border border-slate-200 rounded-md focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all resize-none"
                                />
                            </div>

                            <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                                <p className="text-xs text-slate-400">
                                    Fields marked <span className="text-red-400">*</span> are required.
                                </p>
                                <Button variant="secondary" className="gap-2 px-8">
                                    Send Message <Send size={14} />
                                </Button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}