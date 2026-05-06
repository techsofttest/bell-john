"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { 
    ChevronDown, 
    Lock, 
    Pencil, 
    ShoppingBag, 
    CheckCircle, 
    ChevronUp, 
    Printer,
    ArrowLeft,
    Check,
    Truck,
    MapPin,
    User,
    Eye
} from "lucide-react";
import Button from "@/app/components/ui/Button";

// Country list tailored for GCC and others as shown in image
const countries = [
    "Kuwait",
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "Oman",
    "Bahrain",
    "United States",
    "United Kingdom"
];

// Kuwait governorates and GCC states
const states = [
    "Al Asimah (Kuwait City)",
    "Hawalli",
    "Farwaniya",
    "Mubarak Al-Kabeer",
    "Ahmadi",
    "Jahra",
    "Dubai",
    "Abu Dhabi",
    "Riyadh",
    "Eastern Province"
];

export default function CheckoutPage() {
    const { cartItems } = useCart();
    const router = useRouter();

    // Interaction Steps: 
    // 1 = Contact Info, 2 = Shipping Address, 3 = Delivery Method, 4 = Review & Place Order, 5 = Success Screen
    const [activeStep, setActiveStep] = useState<number>(1);
    const [expandedItem, setExpandedItem] = useState<string | number | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        country: "Kuwait",
        address: "",
        city: "",
        state: "Al Asimah (Kuwait City)",
        zip: ""
    });

    const [deliveryMethod, setDeliveryMethod] = useState("Standard Free Business Delivery");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const steps = [
        { id: 1, label: "Contact", icon: User },
        { id: 2, label: "Address", icon: MapPin },
        { id: 3, label: "Shipping", icon: Truck },
        { id: 4, label: "Review", icon: Eye }
    ];

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (activeStep < 4) {
            setActiveStep(activeStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (activeStep > 1) {
            setActiveStep(activeStep - 1);
        }
    };

    const handlePlaceOrder = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setActiveStep(5); // Success screen!
        }, 1200);
    };

    // Render Success Screen (No Price parameters shown - Fits 100vh)
    if (activeStep === 5) {
        return (
            <div className="bg-[#F8FAFC] h-screen max-h-screen flex flex-col justify-between overflow-hidden font-sans">
                {/* Clean Checkout Header */}
                <header className="bg-white border-b border-slate-200 px-6 md:px-12 lg:px-16 py-3 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="relative w-24 h-7 lg:w-28 lg:h-8">
                            <Image
                                src="/logo/logo.png"
                                alt="Bell & John Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </Link>
                        <div className="h-5 w-[1px] bg-slate-200"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                            Checkout
                        </span>
                    </div>
                    <Link href="/products" className="text-xs font-semibold text-slate-700 hover:text-brand hover:underline">
                        Continue Browsing
                    </Link>
                </header>

                {/* Success Content (Streamlined to 100vh) */}
                <main className="max-w-xl mx-auto px-6 py-4 flex-grow flex flex-col justify-center items-center w-full">
                    <div className="w-14 h-14 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-4 shadow-inner animate-bounce">
                        <CheckCircle className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    
                    <h1 className="font-serif text-2xl md:text-3xl text-slate-900 font-semibold mb-2 leading-tight tracking-tight text-center">
                        Quote Request Placed!
                    </h1>
                    
                    <p className="text-slate-600 text-xs md:text-sm font-normal mb-5 leading-relaxed max-w-md text-center">
                        Thank you, <span className="font-semibold text-slate-900">{formData.firstName || "techsoftmvp"}</span>. Your RFQ has been successfully sent to our GCC sales team. We will contact you with a customized pricing list within 1 business day.
                    </p>

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 w-full text-left space-y-3 mb-5 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-950 uppercase tracking-widest border-b border-slate-100 pb-2">
                            RFQ Summary Details
                        </h3>
                        <div className="grid grid-cols-2 gap-y-2 text-xs md:text-sm">
                            <span className="text-slate-600">RFQ Ref Number:</span>
                            <span className="font-semibold text-slate-900 text-right">#BJ-{Math.floor(100000 + Math.random() * 900000)}</span>

                            <span className="text-slate-600">Delivery Target:</span>
                            <span className="font-semibold text-slate-900 text-right line-clamp-1">{formData.address}, {formData.city}, {formData.country}</span>

                            <span className="text-slate-600">Contact Phone:</span>
                            <span className="font-semibold text-slate-900 text-right">{formData.phone}</span>

                            <span className="text-slate-600">Items Count:</span>
                            <span className="font-semibold text-slate-900 text-right">{itemsCount} Solutions</span>

                            <span className="text-slate-600">Inquiry Status:</span>
                            <span className="font-semibold text-brand text-right uppercase tracking-wider text-xs">Processing RFQ</span>
                        </div>
                    </div>

                    <div className="flex w-full justify-center">
                        <Button 
                            onClick={() => router.push("/products")}
                            variant="secondary"
                            className="px-8 h-11 uppercase tracking-[0.15em] text-xs font-bold rounded-xl bg-brand text-white shadow-md shadow-brand/15 border-none"
                        >
                            Back to Storefront
                        </Button>
                    </div>
                </main>

                {/* Clean Footer */}
                <footer className="bg-white border-t border-slate-200 py-3 px-6 lg:px-12 flex justify-between items-center text-[11px] text-slate-500 shrink-0">
                    <p>© {new Date().getFullYear()} Bell & John Group. All GCC Rights Reserved.</p>
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        Secure Checkout
                    </div>
                </footer>
            </div>
        );
    }

    return (
        <div className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-sans text-slate-800">
            {/* ── HEADER ── */}
            <header className="bg-white border-b border-slate-200 px-6 md:px-12 lg:px-16 py-5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/" className="relative w-28 h-8 lg:w-36 lg:h-10">
                        <Image
                            src="/logo/logo.png"
                            alt="Bell & John Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </Link>
                    <div className="h-6 w-[1px] bg-slate-200"></div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                        Checkout
                    </span>
                </div>
                <Link href="/products" className="text-xs font-semibold text-slate-700 hover:text-brand hover:underline">
                    Continue Browsing
                </Link>
            </header>

            {/* ── MAIN CONTENT ── */}
            <main className="max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-16 py-8 lg:py-12 flex-grow">
                {cartItems.length === 0 ? (
                    <div className="py-24 text-center max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <ShoppingBag className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Checkout Empty</h2>
                        <p className="text-slate-600 text-sm mb-6">You have no items in your request bag. Please select products to ask a quote.</p>
                        <Button 
                            onClick={() => router.push("/products")}
                            variant="secondary"
                            className="px-8 h-12 rounded-xl"
                        >
                            Browse Products
                        </Button>
                    </div>
                ) : (
                    /* Welded Grid layout */
                    <div className="grid grid-cols-1 lg:grid-cols-12 border border-slate-200/90 rounded-3xl bg-white shadow-md shadow-slate-200/40 items-stretch overflow-hidden">
                        
                        {/* ── LEFT COLUMN: CHECKOUT DETAILS & WIZARD ── */}
                        <div className="lg:col-span-7 p-6 md:p-10 space-y-8 bg-white">
                            
                            {/* ── PROGRESS BAR ── */}
                            <div className="pb-4 border-b border-slate-100">
                                <div className="flex items-center justify-between max-w-lg mx-auto relative px-2 z-0 isolate">
                                    {/* Line connecting circles */}
                                    <div className="absolute top-[16px] left-8 right-8 h-[3px] bg-slate-100 rounded-full z-0 overflow-hidden">
                                        <div 
                                            className="h-full bg-brand rounded-full transition-all duration-300"
                                            style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
                                        />
                                    </div>

                                    {steps.map((step) => {
                                        const StepIcon = step.icon;
                                        const isCompleted = activeStep > step.id;
                                        const isActive = activeStep === step.id;

                                        return (
                                            <div key={step.id} className="flex flex-col items-center gap-2 relative z-10 select-none">
                                                <button
                                                    type="button"
                                                    disabled={step.id > activeStep && !isCompleted}
                                                    onClick={() => setActiveStep(step.id)}
                                                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                                        ${isCompleted 
                                                            ? "bg-brand border-brand text-white shadow-md shadow-brand/15 cursor-pointer" 
                                                            : isActive 
                                                                ? "bg-slate-950 border-slate-950 text-white shadow-md shadow-slate-950/15" 
                                                                : "bg-white border-slate-200 text-slate-400 cursor-not-allowed"
                                                        }`}
                                                >
                                                    {isCompleted ? (
                                                        <Check className="w-4 h-4" />
                                                    ) : (
                                                        <StepIcon className="w-4 h-4" />
                                                    )}
                                                </button>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 
                                                    ${isActive ? "text-slate-950" : isCompleted ? "text-brand" : "text-slate-400"}`}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ── CONTACT DETAILS STEP (STEP 1) ── */}
                            {activeStep === 1 && (
                                <form onSubmit={handleNextStep} className="space-y-6 pt-2 animate-fade-in">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Contact information</h2>
                                        <p className="text-slate-500 text-xs">Enter your details so our GCC regional team can contact you.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">First name *</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={formData.firstName}
                                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                                placeholder="e.g. John"
                                                className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Last name *</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={formData.lastName}
                                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                                placeholder="e.g. Doe"
                                                className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Phone *</label>
                                        <input 
                                            type="tel" 
                                            required
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="e.g. +965 9000 0000"
                                            className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <Button 
                                            type="submit"
                                            variant="secondary"
                                            className="w-full h-12 uppercase tracking-[0.15em] text-xs font-bold rounded-xl"
                                        >
                                            Continue to Address
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {/* ── SHIPPING ADDRESS STEP (STEP 2) ── */}
                            {activeStep === 2 && (
                                <form onSubmit={handleNextStep} className="space-y-6 pt-2 animate-fade-in">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Shipping address</h2>
                                        <p className="text-slate-500 text-xs">Enter your delivery address for compile dispatch planning.</p>
                                    </div>

                                    <div className="space-y-1.5 relative">
                                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Country/Region *</label>
                                        <div className="relative">
                                            <select 
                                                required
                                                value={formData.country}
                                                onChange={e => setFormData({ ...formData, country: e.target.value })}
                                                className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:outline-none text-sm font-medium appearance-none bg-white"
                                            >
                                                {countries.map((c, i) => (
                                                    <option key={i} value={c}>{c}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Address *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.address}
                                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="Street, building, floor, apartment"
                                            className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">City *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.city}
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                            placeholder="e.g. Kuwait City"
                                            className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5 relative">
                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">State *</label>
                                            <div className="relative">
                                                <select 
                                                    required
                                                    value={formData.state}
                                                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                                                    className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:outline-none text-sm font-medium appearance-none bg-white"
                                                >
                                                    {states.map((s, i) => (
                                                        <option key={i} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Zip / Postal code *</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={formData.zip}
                                                onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                                placeholder="e.g. 13001"
                                                className="w-full h-11 px-4 border border-slate-250 rounded-lg focus:border-slate-900 focus:ring-1 focus:ring-slate-900/5 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <Button 
                                            type="button"
                                            onClick={handlePrevStep}
                                            variant="primary"
                                            className="h-12 uppercase tracking-[0.15em] text-xs font-bold rounded-xl"
                                        >
                                            Back
                                        </Button>
                                        <Button 
                                            type="submit"
                                            variant="secondary"
                                            className="h-12 uppercase tracking-[0.15em] text-xs font-bold rounded-xl"
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {/* ── DELIVERY METHOD STEP (STEP 3) ── */}
                            {activeStep === 3 && (
                                <form onSubmit={handleNextStep} className="space-y-6 pt-2 animate-fade-in">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Delivery method</h2>
                                        <p className="text-slate-500 text-xs">Choose how you want your corporate solutions dispatched.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === "Standard Free Business Delivery" ? "border-slate-900 bg-slate-50/50" : "border-slate-200 hover:border-slate-300"}`}>
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="radio" 
                                                    name="deliveryMethod" 
                                                    value="Standard Free Business Delivery"
                                                    checked={deliveryMethod === "Standard Free Business Delivery"}
                                                    onChange={() => setDeliveryMethod("Standard Free Business Delivery")}
                                                    className="w-4 h-4 accent-slate-900"
                                                />
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900">Standard Free Business Delivery</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">Delivery in 2 - 4 business days across the GCC.</p>
                                                </div>
                                            </div>
                                        </label>

                                        <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === "Express GCC Shipping" ? "border-slate-900 bg-slate-50/50" : "border-slate-200 hover:border-slate-300"}`}>
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="radio" 
                                                    name="deliveryMethod" 
                                                    value="Express GCC Shipping"
                                                    checked={deliveryMethod === "Express GCC Shipping"}
                                                    onChange={() => setDeliveryMethod("Express GCC Shipping")}
                                                    className="w-4 h-4 accent-slate-900"
                                                />
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900">Express GCC Shipping</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">High priority courier dispatch. 1 - 2 days target delivery.</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <Button 
                                            type="button"
                                            onClick={handlePrevStep}
                                            variant="primary"
                                            className="h-12 uppercase tracking-[0.15em] text-xs font-bold rounded-xl"
                                        >
                                            Back
                                        </Button>
                                        <Button 
                                            type="submit"
                                            variant="secondary"
                                            className="h-12 uppercase tracking-[0.15em] text-xs font-bold rounded-xl"
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {/* ── REVIEW & PLACE RFQ (STEP 4) ── */}
                            {activeStep === 4 && (
                                <div className="space-y-6 pt-2 animate-fade-in">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Review & submit RFQ</h2>
                                        <p className="text-slate-500 text-xs">Verify your procurement details before submitting.</p>
                                    </div>

                                    {/* Summary card grids */}
                                    <div className="space-y-4 border border-slate-200 rounded-2xl p-5 bg-slate-50/50 text-sm">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-slate-200">
                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Contact Details</span>
                                                <p className="font-semibold text-slate-900 mt-1">{formData.firstName} {formData.lastName}</p>
                                                <p className="text-slate-600 text-xs mt-0.5">{formData.phone}</p>
                                            </div>
                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Shipping Mode</span>
                                                <p className="font-semibold text-slate-900 mt-1">{deliveryMethod}</p>
                                                <p className="text-slate-600 text-xs mt-0.5">GCC Dispatch Priority</p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Delivery Target Address</span>
                                            <p className="font-semibold text-slate-900 mt-1">{formData.address}</p>
                                            <p className="text-slate-600 text-xs mt-0.5">{formData.city}, {formData.state}, {formData.country} ({formData.zip})</p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Your Request For Quote (RFQ) is compilation-ready. No payment details are captured at this step. A sales professional will contact you with regional customized pricing sheet.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4">
                                        <Button 
                                            type="button"
                                            onClick={handlePrevStep}
                                            variant="primary"
                                            className="sm:col-span-4 h-14 uppercase tracking-[0.15em] text-xs font-bold rounded-xl"
                                        >
                                            Back
                                        </Button>
                                        <Button 
                                            onClick={handlePlaceOrder}
                                            disabled={isSubmitting}
                                            variant="secondary"
                                            className="sm:col-span-8 h-14 uppercase tracking-[0.2em] text-xs font-bold rounded-xl bg-brand text-white shadow-lg shadow-brand/20 border-none"
                                        >
                                            {isSubmitting ? "Processing RFQ..." : "Place Quote Request"}
                                        </Button>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* ── RIGHT COLUMN: BACKGROUND CONTAINER ── */}
                        <div className="lg:col-span-5 bg-slate-50/50 border-t lg:border-t-0 lg:border-l border-slate-200 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none lg:rounded-tl-none h-full relative">
                            {/* Inner wrapper that is actually sticky */}
                            <div className="lg:sticky lg:top-8 p-6 md:p-10 space-y-6">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-900">
                                        Order summary <span className="font-normal text-slate-500">({itemsCount} items)</span>
                                    </h2>
                                    <Link href="/cart" className="p-2 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                </div>

                                {/* Dynamic items list */}
                                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                                    {cartItems.map((item, index) => {
                                        const isExpanded = expandedItem === item.id;
                                        return (
                                            <div key={index} className="flex gap-4 border-b border-slate-200/40 pb-4 last:border-b-0 last:pb-0 group">
                                                {/* Image container with exact round item count circle badge overlay */}
                                                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-slate-200 flex-shrink-0">
                                                    <Image 
                                                        src={item.image} 
                                                        alt={item.title} 
                                                        fill 
                                                        className="object-cover" 
                                                    />
                                                    <div className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
                                                        {item.qty}
                                                    </div>
                                                </div>

                                                {/* Center Details */}
                                                <div className="flex-grow flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-brand transition-colors line-clamp-2">
                                                            {item.title}
                                                        </h4>
                                                        
                                                        {/* Variant Specifications */}
                                                        <div className="text-[10px] text-slate-500 mt-1 space-y-0.5 font-semibold uppercase tracking-wider">
                                                            {item.size && <p>Size: <span className="text-slate-800">{item.size}</span></p>}
                                                            {item.color && <p>Color: <span className="text-slate-800">{item.color}</span></p>}
                                                            {item.packaging && <p>Packaging: <span className="text-slate-800">{item.packaging}</span></p>}
                                                        </div>
                                                    </div>

                                                    {/* Accordion toggle for details */}
                                                    {(item.size || item.color || item.packaging) && (
                                                        <button 
                                                            onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                                                            className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 mt-1 hover:text-slate-900"
                                                        >
                                                            {isExpanded ? (
                                                                <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                                                            ) : (
                                                                <>Show More <ChevronDown className="w-3.5 h-3.5" /></>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Spacing & Pricing summary - Fully Refined with NO PRICING (Pure B2B Quote Model) */}
                                <div className="pt-6 border-t border-slate-200 space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Request Items</span>
                                        <span className="font-bold text-slate-900">{itemsCount} Solutions</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Delivery Type</span>
                                        <span className="font-semibold text-slate-800">{deliveryMethod}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Inquiry Status</span>
                                        <span className="font-semibold text-brand uppercase tracking-wider text-[11px]">Quote compilation</span>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                )}
            </main>

            {/* ── FOOTER ── */}
            <footer className="bg-white border-t border-slate-200 py-6 px-6 lg:px-12 flex justify-between items-center text-xs text-slate-500 mt-12">
                <p>© {new Date().getFullYear()} Bell & John Group. All GCC Rights Reserved.</p>
                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    Secure Checkout
                </div>
            </footer>
        </div>
    );
}
