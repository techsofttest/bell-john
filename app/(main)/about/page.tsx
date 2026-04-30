import AboutHero from "@/app/components/about/AboutHero";
import AboutContent from "@/app/components/about/AboutContent";
import AboutBenefits from "@/app/components/about/AboutBenefits";
import AboutGlobal from "@/app/components/about/AboutGlobal";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen pb-24">
            <AboutHero />
            <AboutContent />
            <AboutBenefits />
            <AboutGlobal />
        </div>
    );
}