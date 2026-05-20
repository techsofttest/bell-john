import { ReactNode } from "react";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import { getCategories } from "@/app/data/products";

export default async function AuthLayout({ children }: { children: ReactNode }) {
    const categories = await getCategories();

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Main Application Header */}
            <Header categories={categories} />
            
            {/* Centered Auth Card Container with spacing to clear fixed Header */}
            <main className="flex-grow pt-[100px] lg:pt-[180px] pb-16 flex items-center justify-center px-4 font-sans">
                {children}
            </main>
            
            {/* Main Application Footer */}
            <Footer categories={categories} />
        </div>
    );
}