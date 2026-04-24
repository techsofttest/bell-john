import { ReactNode, ButtonHTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge tailwind classes safely
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary";
    children: ReactNode;
    className?: string;
}

export default function Button({
    variant = "primary",
    children,
    className,
    ...props
}: ButtonProps) {

    // Base styles: 44px height, 6px radius, medium font, smooth transitions
    const baseStyles = "inline-flex items-center justify-center h-[44px] px-6 text-sm font-semibold rounded-md transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none tracking-tight";

    const variants = {
        // 1. PRIMARY: White, clean border, minimalist lift effect
        primary: "bg-white text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-md",

        // 2. SECONDARY: Brand Blue, used for emphasis
        secondary: "bg-brand text-white hover:bg-brand-hover shadow-lg shadow-brand/10 hover:shadow-brand/20 hover:-translate-y-0.5",

        // 3. TERTIARY: Ghost/Minimalist, for secondary actions
        tertiary: "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
}