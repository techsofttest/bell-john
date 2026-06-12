"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Button from "../ui/Button";
import { useRegion } from "@/app/context/RegionContext";
import { API_URL } from "@/app/data/products";

export default function ContactSection() {
    const { selectedCountry } = useRegion();
    const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const phones = selectedCountry?.phone_numbers ?? [];
    const email = selectedCountry?.email_address ?? null;
    const address = selectedCountry?.address ?? null;      // HTML string from RichEditor
    const workingHours = selectedCountry?.working_hours ?? null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);
        
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const res = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (res.ok && json.status === 'success') {
                setStatus({ type: 'success', message: json.message || 'Message sent successfully!' });
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus({ type: 'error', message: json.message || 'Failed to send message.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="bg-[#F8FAFC] border-t border-slate-200">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* ── Section Header ── */}
                <div className="py-12 border-b border-slate-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-2">Contact Us</p>
                        <h2 className="text-xl md:text-3xl font-semibold text-slate-900 leading-tight">
                            We&apos;re here to help
                            {selectedCountry && (
                                <span className="text-brand"> — {selectedCountry.name}</span>
                            )}
                        </h2>
                    </div>
                    <p className="text-sm text-slate-750 max-w-sm leading-relaxed font-normal">
                        Reach out for product inquiries, bulk orders, or office procurement support across the GCC.
                    </p>
                </div>

                {/* ── Two-Column Body ── */}
                <div className="grid lg:grid-cols-5">

                    {/* Left: Info Panel */}
                    <div className="lg:col-span-2 py-12 lg:pr-12 lg:border-r border-slate-200 flex flex-col gap-10">

                        {/* Address */}
                        {address && (
                            <div className="flex gap-4 group">
                                <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/5 group-hover:shadow-md">
                                    <MapPin size={18} className="text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600 mb-2">Visit Us</p>
                                    {/* Rich text from Filament RichEditor — preserves line breaks & formatting */}
                                    <div
                                        className="text-sm text-slate-800 leading-relaxed font-normal prose prose-sm max-w-none prose-p:my-1"
                                        dangerouslySetInnerHTML={{ __html: address }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Phone */}
                        {phones.length > 0 && (
                            <div className="flex gap-4 group">
                                <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/5 group-hover:shadow-md">
                                    <Phone size={18} className="text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600 mb-2">Call Us</p>
                                    {phones.map((p, i) => (
                                        <a key={i} href={`tel:${p.number}`} className="block text-sm text-slate-800 hover:text-brand font-semibold transition-colors">
                                            {p.number}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        {email && (
                            <div className="flex gap-4 group">
                                <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/5 group-hover:shadow-md">
                                    <Mail size={18} className="text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600 mb-2">Email</p>
                                    <a href={`mailto:${email}`} className="text-sm text-brand font-semibold hover:underline break-all transition-colors">
                                        {email}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Working Hours */}
                        {workingHours && (
                            <div className="flex gap-4 group">
                                <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/5 group-hover:shadow-md">
                                    <Clock size={18} className="text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600 mb-2">Working Hours</p>
                                    <div
                                        className="text-sm text-slate-800 leading-relaxed font-normal prose prose-sm max-w-none prose-p:my-1"
                                        dangerouslySetInnerHTML={{ __html: workingHours }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Divider + Note */}
                        <div className="pt-6 mt-2 border-t border-slate-200/60">
                            <p className="text-[13px] text-slate-700 leading-relaxed font-normal">
                                Prefer to call? Our team is available during working hours and typically responds to emails within one business day.
                            </p>
                        </div>
                    </div>

                    {/* Right: Form Panel */}
                    <div className="lg:col-span-3 py-12 lg:pl-12">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-950">Send us a message</h3>
                            <p className="text-sm text-slate-700 mt-1 font-normal">We'll get back to you as soon as possible.</p>
                        </div>

                        {status && (
                            <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                {status.message}
                            </div>
                        )}

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-1">
                                    Full Name <span className="text-brand font-semibold">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    disabled={isLoading}
                                    placeholder="John Doe"
                                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-400 disabled:opacity-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-1">
                                    Email Address <span className="text-brand font-semibold">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    disabled={isLoading}
                                    placeholder="john@company.com"
                                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-400 disabled:opacity-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-1">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    disabled={isLoading}
                                    placeholder="Enterprise Ltd."
                                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-400 disabled:opacity-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    disabled={isLoading}
                                    placeholder="+965 ..."
                                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-400 disabled:opacity-50"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-1">
                                    Your Message <span className="text-brand font-semibold">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    disabled={isLoading}
                                    rows={5}
                                    placeholder="How can we assist your business today?"
                                    className="w-full p-4 bg-white border border-slate-300 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-400 resize-none disabled:opacity-50"
                                />
                            </div>

                            <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
                                <p className="text-[13px] text-slate-700 font-normal">
                                    Fields marked <span className="text-brand font-semibold">*</span> are required.
                                </p>
                                <Button type="submit" disabled={isLoading} variant="secondary" className="gap-2 px-8 h-12 rounded-xl shadow-sm hover:shadow-md transition-all font-medium flex items-center justify-center disabled:opacity-50">
                                    {isLoading ? 'Sending...' : 'Send Message'} <Send size={16} />
                                </Button>
                            </div>
                        </form>
                    </div>

                </div>

                {/* ── Map ── */}
                {selectedCountry?.map_code && (
                    <div className="w-full mt-12 border-t border-slate-200 pt-12">
                        <iframe 
                            src={selectedCountry.map_code} 
                            width="100%" 
                            height="450" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                )}
            </div>
        </section>
    );
}