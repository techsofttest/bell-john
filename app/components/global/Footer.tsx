"use client";

import Link from "next/link";
import Image from "next/image";

// Inline SVGs — lucide-react no longer exports brand/social icons
const IconInstagram = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
);
const IconFacebook = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);
const IconLinkedin = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);
const IconX = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#F8FAFC] pt-20 text-[#333333]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Top Section: Logo + Columns + Socials */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-20">

                    {/* 1. Logo Column */}
                    <div className="lg:col-span-1 self-start">
                        <Link href="/">
                            <div className="relative w-44 h-14">
                                <Image src="/logo/logo.png" alt="Bell & John" fill sizes="176px" className="object-contain object-left" />
                            </div>
                        </Link>
                    </div>

                    {/* 2. Brand/Company */}
                    <div className="space-y-4">
                        <h4 className="text-[13px] font-bold tracking-tight">Bell & John</h4>
                        <ul className="space-y-2 text-[13px] text-[#666666]">
                            <li><Link href="/about" className="hover:underline">About Us</Link></li>
                            <li><Link href="/careers" className="hover:underline">Careers</Link></li>
                            <li><Link href="/values" className="hover:underline">Our Values</Link></li>
                            <li><Link href="/press" className="hover:underline">Press</Link></li>
                            <li><Link href="/timeline" className="hover:underline">Timeline</Link></li>
                        </ul>
                    </div>

                    {/* 3. Solutions */}
                    <div className="space-y-4">
                        <h4 className="text-[13px] font-bold tracking-tight">Solutions</h4>
                        <ul className="space-y-2 text-[13px] text-[#666666]">
                            <li><Link href="#" className="hover:underline">Stationery</Link></li>
                            <li><Link href="#" className="hover:underline">Digital Supplies</Link></li>
                            <li><Link href="#" className="hover:underline">Office Machines</Link></li>
                            <li><Link href="#" className="hover:underline">Office Furniture</Link></li>
                            <li><Link href="#" className="hover:underline">Educational Materials</Link></li>
                        </ul>
                    </div>

                    {/* 4. Support */}
                    <div className="space-y-4">
                        <h4 className="text-[13px] font-bold tracking-tight">Get Help</h4>
                        <ul className="space-y-2 text-[13px] text-[#666666]">
                            <li><Link href="/contact" className="hover:underline">Customer Service</Link></li>
                            <li><Link href="/quote" className="hover:underline">Request a Quote</Link></li>
                            <li><Link href="/shipping" className="hover:underline">Delivery Info</Link></li>
                            <li><Link href="/faq" className="hover:underline">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* 5. Contacts (Regional Focus) */}
                    <div className="space-y-4">
                        <h4 className="text-[13px] font-bold tracking-tight">Contacts</h4>
                        <ul className="space-y-2 text-[13px] text-[#666666]">
                            <li><Link href="#" className="hover:underline">Kuwait Office</Link></li>
                            <li><Link href="#" className="hover:underline">Dubai Office</Link></li>
                            <li><Link href="#" className="hover:underline">Media Relations</Link></li>
                        </ul>
                    </div>

                    {/* 6. Newsletter & Socials */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="space-y-4">
                            <h4 className="text-[13px] font-bold tracking-tight">Sign up for our newsletter</h4>
                            <button className="w-full py-2.5 rounded-md border border-black text-[12px] font-bold hover:bg-black hover:text-white transition-all duration-300">
                                Email sign up
                            </button>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[13px] font-bold tracking-tight">Follow Us</h4>
                            <div className="flex gap-5 text-black">
                                <Link href="#" className="hover:opacity-60 transition-opacity"><IconInstagram size={20} /></Link>
                                <Link href="#" className="hover:opacity-60 transition-opacity"><IconFacebook size={20} /></Link>
                                <Link href="#" className="hover:opacity-60 transition-opacity"><IconLinkedin size={20} /></Link>
                                <Link href="#" className="hover:opacity-60 transition-opacity"><IconX size={20} /></Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Region & Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center py-10 gap-6">
                    <div className="flex items-center gap-2 text-[12px] font-medium">
                        <Image src="https://flagcdn.com/w20/kw.png" width={18} height={12} alt="KW" className="rounded-[1px]" />
                        <span>Kuwait</span>
                    </div>

                    <p className="text-[12px] text-[#666666]">
                        © {currentYear} Bell & John General Trading, Inc.
                    </p>

                    <div className="flex gap-6 text-[12px] font-medium">
                        <Link href="#" className="hover:underline">Privacy Notice</Link>
                        <Link href="#" className="hover:underline">Cookie Notice</Link>
                        <Link href="#" className="hover:underline">Terms</Link>
                        <Link href="#" className="hover:underline">Sitemap</Link>
                    </div>
                </div>
            </div>

            {/* The Final Bottom Strip */}
            <div className="bg-[#D9D9D9] py-4 text-center">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#333333]">
                    Delivering Excellence Across the GCC
                </p>
            </div>
        </footer>
    );
}