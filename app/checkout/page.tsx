"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { User, MapPin, ShoppingBag, AlertCircle } from "lucide-react";
import Button from "@/app/components/ui/Button";
import { useAuth } from "@/app/context/AuthContext";
import { useRegion } from "@/app/context/RegionContext";

// Import modularized components
import CheckoutHeader from "@/app/components/checkout/CheckoutHeader";
import CheckoutFooter from "@/app/components/checkout/CheckoutFooter";
import CheckoutProgressBar from "@/app/components/checkout/CheckoutProgressBar";
import ContactStep from "@/app/components/checkout/ContactStep";
import AddressStep from "@/app/components/checkout/AddressStep";
import CheckoutSummary from "@/app/components/checkout/CheckoutSummary";
import CheckoutSuccess from "@/app/components/checkout/CheckoutSuccess";

export default function CheckoutPage() {
    const { cartItems, clearCart } = useCart();
    const router = useRouter();
    const { isLoggedIn, customer, token } = useAuth();
    const { selectedCountry } = useRegion();

    // Interaction Steps: 
    // 1 = Contact Info, 2 = Shipping Address, 5 = Success Screen
    const [activeStep, setActiveStep] = useState<number>(1);
    const [expandedItem, setExpandedItem] = useState<string | number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        country: "Kuwait",
        address: "",
        city: "",
        state: "",
        zip: ""
    });

    const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    // Dynamic steps (Removed shipping and review steps)
    const steps = [
        { id: 1, label: "Contact", icon: User },
        { id: 2, label: "Address", icon: MapPin }
    ];

    // Autoselect Country based on Regional Context setting
    useEffect(() => {
        if (selectedCountry) {
            setFormData(prev => ({
                ...prev,
                country: selectedCountry.name
            }));
        }
    }, [selectedCountry]);

    // Skip first contact step and autofill details if user is logged in
    useEffect(() => {
        if (isLoggedIn && customer) {
            const names = customer.name.trim().split(" ");
            const first = names[0] || "";
            const last = names.slice(1).join(" ") || "Doe";
            
            setFormData(prev => ({
                ...prev,
                firstName: first,
                lastName: last,
                email: customer.email,
                phone: customer.phone || ""
            }));

            // Direct jump to Step 2
            setActiveStep(2);
        }
    }, [isLoggedIn, customer]);

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (activeStep === 1) {
            setActiveStep(2);
        } else if (activeStep === 2) {
            handlePlaceOrder();
        }
    };

    const handlePrevStep = () => {
        if (activeStep === 2 && !isLoggedIn) {
            setActiveStep(1);
        }
    };

    const handlePlaceOrder = async () => {
        setError(null);
        setIsSubmitting(true);

        const payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            country: formData.country,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            currency: selectedCountry?.code || "INR",
            items: cartItems.map(item => {
                const itemPayload: any = {
                    product_id: item.id,
                    qty: item.qty,
                    variant_id: null,
                    sku: item.sku || null,
                    size: item.size || null,
                    color: item.color || null,
                    packaging: item.packaging || null
                };
                if (item.custom) {
                    Object.entries(item.custom).forEach(([key, val]) => {
                        const cleanKey = key.toLowerCase().replace(/\s+/g, '_');
                        itemPayload[cleanKey] = val;
                    });
                }
                return itemPayload;
            })
        };

        try {
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                "Accept": "application/json",
            };

            // Inject Sanctum Auth token if available
            if (isLoggedIn && token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://bellnjohn.test:90/api';
            const response = await fetch(`${apiUrl}/orders`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok && data.status === "success") {
                // Clear request bag
                clearCart();
                // Successfully saved in the database! Move to success step.
                setActiveStep(5);
            } else {
                setError(data.message || "Failed to place your quote request. Please review your entries.");
            }
        } catch (err) {
            setError("A network error occurred. Please verify your connection and try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
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
                onBack={() => {
                    // Refresh and return to catalog
                    window.location.href = "/products";
                }}
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
                    <div className="flex flex-col gap-6">
                        {error && (
                            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs font-semibold animate-in fade-in duration-200 max-w-[1440px] w-full mx-auto">
                                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                <span>{error}</span>
                            </div>
                        )}

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
                                        isLoggedIn={isLoggedIn}
                                        isSubmitting={isSubmitting}
                                    />
                                )}

                            </div>

                            {/* ── RIGHT COLUMN: BACKGROUND CONTAINER ── */}
                            <CheckoutSummary 
                                cartItems={cartItems}
                                itemsCount={itemsCount}
                                deliveryMethod="Standard Business Procurement Delivery"
                                expandedItem={expandedItem}
                                setExpandedItem={setExpandedItem}
                            />

                        </div>
                    </div>
                )}
            </main>

            {/* ── FOOTER ── */}
            <CheckoutFooter />
        </div>
    );
}
