"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { User, MapPin, Truck, Eye, ShoppingBag } from "lucide-react";
import Button from "@/app/components/ui/Button";

// Import modularized components
import CheckoutHeader from "@/app/components/checkout/CheckoutHeader";
import CheckoutFooter from "@/app/components/checkout/CheckoutFooter";
import CheckoutProgressBar from "@/app/components/checkout/CheckoutProgressBar";
import ContactStep from "@/app/components/checkout/ContactStep";
import AddressStep from "@/app/components/checkout/AddressStep";
import DeliveryStep from "@/app/components/checkout/DeliveryStep";
import ReviewStep from "@/app/components/checkout/ReviewStep";
import CheckoutSummary from "@/app/components/checkout/CheckoutSummary";
import CheckoutSuccess from "@/app/components/checkout/CheckoutSuccess";

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

    const handleFormChange = (fields: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    // Render Success Screen (Step 5)
    if (activeStep === 5) {
        return (
            <CheckoutSuccess 
                formData={formData}
                itemsCount={itemsCount}
                onBack={() => router.push("/products")}
            />
        );
    }

    return (
        <div className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-sans text-slate-800">
            {/* ── HEADER ── */}
            <CheckoutHeader />

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
                            <CheckoutProgressBar 
                                activeStep={activeStep}
                                steps={steps}
                                setActiveStep={setActiveStep}
                            />

                            {/* ── STEP RENDERING ── */}
                            {activeStep === 1 && (
                                <ContactStep 
                                    formData={formData}
                                    onChange={handleFormChange}
                                    onNext={handleNextStep}
                                />
                            )}

                            {activeStep === 2 && (
                                <AddressStep 
                                    formData={formData}
                                    onChange={handleFormChange}
                                    onNext={handleNextStep}
                                    onPrev={handlePrevStep}
                                />
                            )}

                            {activeStep === 3 && (
                                <DeliveryStep 
                                    deliveryMethod={deliveryMethod}
                                    onChangeDelivery={setDeliveryMethod}
                                    onNext={handleNextStep}
                                    onPrev={handlePrevStep}
                                />
                            )}

                            {activeStep === 4 && (
                                <ReviewStep 
                                    formData={formData}
                                    deliveryMethod={deliveryMethod}
                                    onPrev={handlePrevStep}
                                    onPlaceOrder={handlePlaceOrder}
                                    isSubmitting={isSubmitting}
                                />
                            )}

                        </div>

                        {/* ── RIGHT COLUMN: BACKGROUND CONTAINER ── */}
                        <CheckoutSummary 
                            cartItems={cartItems}
                            itemsCount={itemsCount}
                            deliveryMethod={deliveryMethod}
                            expandedItem={expandedItem}
                            setExpandedItem={setExpandedItem}
                        />

                    </div>
                )}
            </main>

            {/* ── FOOTER ── */}
            <CheckoutFooter />
        </div>
    );
}
