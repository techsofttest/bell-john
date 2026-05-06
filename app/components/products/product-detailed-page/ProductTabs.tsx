"use client";

import { Clock, RefreshCw } from "lucide-react";
import { Product } from "@/app/data/products";

interface ProductTabsProps {
    product: Product;
    activeTab: "description" | "specifications";
    setActiveTab: (tab: "description" | "specifications") => void;
}

export default function ProductTabs({
    product,
    activeTab,
    setActiveTab
}: ProductTabsProps) {
    return (
        <div className="mt-12 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/30 overflow-hidden">
            <div className="flex border-b border-slate-100">
                <button 
                    onClick={() => setActiveTab("description")}
                    className={`px-8 py-5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all relative ${
                        activeTab === "description" ? 'text-brand border-brand font-black' : 'text-slate-400 border-transparent hover:text-slate-600'
                    }`}
                >
                    Overview
                </button>
                <button 
                    onClick={() => setActiveTab("specifications")}
                    className={`px-8 py-5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all relative ${
                        activeTab === "specifications" ? 'text-brand border-brand font-black' : 'text-slate-400 border-transparent hover:text-slate-600'
                    }`}
                >
                    Specifications
                </button>
            </div>

            <div className="p-8 md:p-12">
                {activeTab === "description" ? (
                    <div className="prose max-w-3xl text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                        <p className="font-semibold text-slate-800 text-base">{product.title}</p>
                        <p>{product.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-slate-100">
                            <div className="flex gap-3">
                                <Clock className="w-5 h-5 text-brand shrink-0" />
                                <div>
                                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">Standard Dispatch</h5>
                                    <p className="text-xs text-slate-500">Usually dispatches within 24 to 48 hours for standard orders across regional fulfillment depots.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <RefreshCw className="w-5 h-5 text-brand shrink-0" />
                                <div>
                                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">Return / Exchange Policies</h5>
                                    <p className="text-xs text-slate-500">Corporate order support for damaged shipments. Dedicated support representatives assigned to every account.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl">
                        <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 w-1/3">Technical Attribute</th>
                                        <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 w-2/3">Value / Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {Object.entries(product.specifications).map(([key, val]) => (
                                        <tr key={key} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-xs font-bold text-slate-500">{key}</td>
                                            <td className="px-6 py-4 text-xs font-semibold text-slate-800">{val}</td>
                                        </tr>
                                    ))}
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-xs font-bold text-slate-500">Category</td>
                                        <td className="px-6 py-4 text-xs font-semibold text-slate-800">{product.category}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
