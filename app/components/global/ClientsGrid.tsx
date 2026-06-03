"use client";

import React from "react";
import Image from "next/image";
import { useRegion } from "@/app/context/RegionContext";

export default function ClientsGrid() {
    const { clients } = useRegion(); // Wait, does useRegion have clients? 

    if (!clients || clients.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-white overflow-hidden border-t border-slate-100">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <span className="w-10 h-[1px] bg-brand mb-4"></span>
                    <h2 className="font-serif text-xl md:text-3xl text-slate-900 font-medium">
                        The Brands We Deal With
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
                    {clients.map((client: any) => (
                        <div key={client.id} className="relative w-full aspect-video flex items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                            {client.logo ? (
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    title={client.name}
                                    fill
                                    className="object-contain p-4"
                                />
                            ) : (
                                <span className="font-semibold text-slate-400" title={client.name}>{client.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
