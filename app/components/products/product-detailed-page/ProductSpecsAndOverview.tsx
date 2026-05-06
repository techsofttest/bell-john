"use client";

import { 
    Clock, 
    RefreshCw, 
    Tag, 
    Ruler, 
    Scale, 
    Gauge, 
    Layers, 
    ShieldCheck, 
    Paintbrush, 
    Cpu, 
    Battery, 
    Sparkles, 
    Info,
    CheckCircle2,
    Truck
} from "lucide-react";
import { Product } from "@/app/data/products";

interface ProductSpecsAndOverviewProps {
    product: Product;
}

// Dynamic spec icon resolver (vibrant brand-standard colors)
function getSpecIcon(key: string) {
    const k = key.toLowerCase();
    
    if (k.includes("brand")) {
        return <Tag className="w-4 h-4 text-brand" />;
    }
    if (k.includes("size") || k.includes("dimension") || k.includes("width") || k.includes("height") || k.includes("format")) {
        return <Ruler className="w-4 h-4 text-blue-600" />;
    }
    if (k.includes("weight") || k.includes("gsm") || k.includes("opacity") || k.includes("whiteness") || k.includes("density")) {
        return <Scale className="w-4 h-4 text-indigo-600" />;
    }
    if (k.includes("speed") || k.includes("print") || k.includes("read") || k.includes("write") || k.includes("processor") || k.includes("lift") || k.includes("response")) {
        return <Gauge className="w-4 h-4 text-amber-600" />;
    }
    if (k.includes("material") || k.includes("ply count")) {
        return <Layers className="w-4 h-4 text-emerald-600" />;
    }
    if (k.includes("warranty") || k.includes("certified") || k.includes("encryption")) {
        return <ShieldCheck className="w-4 h-4 text-rose-600" />;
    }
    if (k.includes("designer")) {
        return <Paintbrush className="w-4 h-4 text-violet-600" />;
    }
    if (k.includes("power") || k.includes("battery") || k.includes("outlet") || k.includes("ports") || k.includes("charging")) {
        return <Battery className="w-4 h-4 text-cyan-600" />;
    }
    if (k.includes("interface") || k.includes("connectivity") || k.includes("sensor") || k.includes("resolution") || k.includes("adhesive")) {
        return <Cpu className="w-4 h-4 text-teal-600" />;
    }
    if (k.includes("sheets") || k.includes("capacity") || k.includes("volume") || k.includes("page count") || k.includes("quantity") || k.includes("pouch") || k.includes("pack")) {
        return <Sparkles className="w-4 h-4 text-yellow-600" />;
    }

    return <Info className="w-4 h-4 text-slate-500" />;
}

export default function ProductSpecsAndOverview({ product }: ProductSpecsAndOverviewProps) {
    return (
        <div className="space-y-8 pt-2">
            
            {/* --- 1. OVERVIEW SECTION --- */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-brand"></span>
                    <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-slate-900">
                        Product Overview
                    </h3>
                </div>
                
                <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
                    <p className="font-bold text-slate-900 text-base">
                        {product.title}
                    </p>
                    <p className="text-slate-600 leading-relaxed font-normal">
                        {product.description}
                    </p>
                    
                    {/* Compact Trust Factor Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 pt-2">
                        <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-slate-100/70 transition-colors duration-200">
                            <Clock className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                            <div>
                                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Regional Dispatch</h5>
                                <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">Dispatches within 24 to 48 hours for standard orders across GCC hubs.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-slate-100/70 transition-colors duration-200">
                            <RefreshCw className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                            <div>
                                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Flexible Return Support</h5>
                                <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">Responsive corporate exchange policy for damaged regional shipments.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-slate-100/70 transition-colors duration-200">
                            <Truck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                            <div>
                                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Fast GCC Shipping</h5>
                                <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">Dedicated courier lines covering UAE, KSA, Qatar, Oman, and Bahrain.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-slate-100/70 transition-colors duration-200">
                            <ShieldCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                            <div>
                                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Secure B2B Invoicing</h5>
                                <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">Fully compliant business accounting, tax-compliant invoicing support.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. SPECIFICATIONS SECTION --- */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-slate-900">
                        Technical Specifications
                    </h3>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-700 w-1/3">Attribute</th>
                                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-700 w-2/3">Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {Object.entries(product.specifications).map(([key, val]) => (
                                    <tr key={key} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-5 py-3 text-xs font-bold text-slate-800 flex items-center gap-3">
                                            <span className="p-1.5 rounded-md bg-[#F1F5F9] group-hover:bg-white border border-slate-200/60 shrink-0 flex items-center justify-center transition-colors">
                                                {getSpecIcon(key)}
                                            </span>
                                            <span className="truncate">{key}</span>
                                        </td>
                                        <td className="px-5 py-3 text-xs font-semibold text-slate-900">{val}</td>
                                    </tr>
                                ))}
                                <tr className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-5 py-3 text-xs font-bold text-slate-800 flex items-center gap-3">
                                        <span className="p-1.5 rounded-md bg-[#F1F5F9] group-hover:bg-white border border-slate-200/60 shrink-0 flex items-center justify-center transition-colors">
                                            <CheckCircle2 className="w-4 h-4 text-slate-600" />
                                        </span>
                                        <span>Category</span>
                                    </td>
                                    <td className="px-5 py-3 text-xs font-semibold text-slate-900">{product.category}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </div>
    );
}
