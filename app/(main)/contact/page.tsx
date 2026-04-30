import ContactHero from "../../components/contact/ContactHero";
import ContactSection from "../../components/global/ContactSection";
import MarqueeStrip from "../../components/global/MarqueeStrip";


export default function ContactPage() {
    return (
        // REMOVED 'pb-12' from the class list below
        <div className="bg-white min-h-screen">

            {/* 1. The Tilted Dark Hero */}
            <ContactHero />

            {/* 2. Your Existing Two-Column Contact Form & Info Panel */}
            <div className="relative -mt-8 z-20">
                <ContactSection region="Kuwait" />
            </div>

            {/* 3. Marquee Strip */}
            <MarqueeStrip />

        </div>
    );
}