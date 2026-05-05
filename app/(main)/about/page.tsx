import AboutHero from "@/app/components/about/AboutHero";
import AboutContent from "@/app/components/about/AboutContent";
import AboutBenefits from "@/app/components/about/AboutBenefits";
import AboutGlobal from "@/app/components/about/AboutGlobal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen pb-24">
            <AboutHero />
            <AboutContent />
            <AboutBenefits />
            <AboutGlobal />

            {/* Bottom CTA - Amazon Inspired Border Style with Rounded Corners */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-12 mb-12">
                <div className="border-[3px] border-brand p-12 md:p-24 text-center bg-white relative overflow-hidden group hover:bg-slate-50 transition-all duration-700 rounded-3xl">
                    <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-slate-900 mb-8 relative z-10 tracking-tight leading-[0.95]">
                        Ready to streamline your <span className="text-brand italic">procurement?</span>
                    </h2>
                    <p className="text-slate-500 text-lg md:text-2xl font-light mb-12 max-w-4xl mx-auto relative z-10 leading-relaxed">
                        Join hundreds of businesses across the GCC that rely on Bell & John for their daily office essentials.
                    </p>
                    <Link 
                        href="/products" 
                        className="inline-flex items-center gap-4 bg-brand text-white px-12 py-5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-900 transition-all relative z-10 shadow-lg hover:shadow-xl active:scale-95"
                    >
                        Browse Catalog
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}