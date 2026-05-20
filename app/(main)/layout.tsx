import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import { getCategories } from "@/app/data/products";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const categories = await getCategories();

    return (
        <div className="flex flex-col min-h-screen">
            <Header categories={categories} />
            <main className="flex-grow pt-[64px] lg:pt-[144px] pb-20 lg:pb-0">
                {children}
            </main>
            <Footer categories={categories} />
        </div>
    );
}