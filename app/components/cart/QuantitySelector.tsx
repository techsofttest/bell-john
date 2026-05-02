"use client";

import { Minus, Plus } from "lucide-react";

interface QuantityProps {
    value: number;
    onChange: (val: number) => void;
}

export default function QuantitySelector({ value, onChange }: QuantityProps) {
    return (
        <div className="flex items-center border border-slate-200 rounded-lg w-fit bg-white shadow-sm overflow-hidden">
            <button
                onClick={() => onChange(Math.max(1, value - 1))}
                className="p-2 hover:bg-slate-50 text-slate-500 transition-colors"
            >
                <Minus size={14} />
            </button>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value) || 1)}
                className="w-10 text-center text-xs font-bold text-slate-800 focus:outline-none bg-transparent"
            />
            <button
                onClick={() => onChange(value + 1)}
                className="p-2 hover:bg-slate-50 text-slate-500 transition-colors"
            >
                <Plus size={14} />
            </button>
        </div>
    );
}