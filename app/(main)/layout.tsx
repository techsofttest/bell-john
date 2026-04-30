import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-[116px]">
                {children}
            </main>
            <Footer />
        </div>
    );
}