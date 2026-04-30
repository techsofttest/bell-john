import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="bg-[#F4F5F7] min-h-[100vh] flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-serif text-slate-900 font-medium mb-4">Page Not Found</h1>
            <p className="text-slate-500 mb-8 max-w-md leading-relaxed">
                We couldn't find the category or product you are looking for. It might have been moved or removed.
            </p>
            <Link
                href="/products"
                className="bg-brand text-white px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-md"
            >
                Browse All Categories
            </Link>
        </div>
    );
}