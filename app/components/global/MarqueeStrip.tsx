"use client";

const items = [
    "Premium Office Supplies",
    "Bulk Orders Welcome",
    "GCC-Wide Delivery",
    "Trusted Since 2000",
    "Office Furniture",
    "Digital Supplies",
    "Office Machines",
    "Stationery & Paper",
    "Professional Grade Products",
    "Request a Quote Today",
];

// Separator between items
const Dot = () => (
    <span className="mx-6 text-brand text-lg leading-none select-none">✦</span>
);

export default function MarqueeStrip() {
    return (
        <div className="w-full bg-slate-900 border-t border-white/5 overflow-hidden py-4 select-none">
            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                .marquee-track {
                    display: flex;
                    width: max-content;
                    animation: marquee 30s linear infinite;
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="marquee-track">
                {/* Render twice for seamless loop */}
                {[0, 1].map((pass) => (
                    <div key={pass} className="flex items-center">
                        {items.map((item, i) => (
                            <span key={i} className="flex items-center whitespace-nowrap">
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300">
                                    {item}
                                </span>
                                <Dot />
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
