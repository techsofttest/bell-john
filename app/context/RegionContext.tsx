"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "@/app/data/products";

export interface Country {
    id: number;
    name: string;
    code: string;
    is_default: boolean;
    address: string | null;
    phone_numbers: { number: string }[];
    email_address: string | null;
    working_hours: string | null;
    map_code: string | null;
}

interface RegionContextType {
    selectedCountry: Country | null;
    countries: Country[];
    logoUrl: string;
    clients: any[];
    selectCountry: (countryCode: string) => void;
    isLoading: boolean;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: React.ReactNode }) {
    const [countries, setCountries] = useState<Country[]>([]);
    const [logoUrl, setLogoUrl] = useState<string>("/logo/logo.png");
    const [clients, setClients] = useState<any[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadSettings() {
            try {
                const res = await fetch(`${API_URL}/settings`);
                if (res.ok) {
                    const json = await res.json();
                    if (json.status === "success" && json.data) {
                        const rawCountries: any[] = json.data.countries || [];
                        const rawClients: any[] = json.data.clients || [];
                        setClients(rawClients);

                        // Normalize phone_numbers: Laravel may return the JSON
                        // column as a raw string instead of a parsed array.
                        const fetchedCountries: Country[] = rawCountries.map((c) => ({
                            ...c,
                            phone_numbers: (() => {
                                if (Array.isArray(c.phone_numbers)) return c.phone_numbers;
                                if (typeof c.phone_numbers === "string") {
                                    try { return JSON.parse(c.phone_numbers); } catch { return []; }
                                }
                                return [];
                            })(),
                        }));
                        setCountries(fetchedCountries);
                        // Keep logoUrl pointing to local Next.js static asset `/logo/logo.png`

                        // Determine current country
                        // 1. Check cookie or localStorage
                        let savedCode = "";
                        if (typeof document !== "undefined") {
                            const match = document.cookie.match(/(?:^|; )bj_selected_country=([^;]*)/);
                            savedCode = match ? decodeURIComponent(match[1]) : "";
                        }
                        if (!savedCode && typeof window !== "undefined") {
                            savedCode = localStorage.getItem("bj_selected_country") || "";
                        }

                        let active = fetchedCountries.find((c: Country) => c.code.toLowerCase() === savedCode.toLowerCase());

                        if (active) {
                            setSelectedCountry(active);
                            // Ensure cookie & localstorage are in sync
                            document.cookie = `bj_selected_country=${active.code}; path=/; max-age=31536000; SameSite=Lax`;
                            localStorage.setItem("bj_selected_country", active.code);
                        }
                    }
                }
            } catch (e) {
                console.error("Failed to load settings:", e);
            } finally {
                setIsLoading(false);
            }
        }
        loadSettings();
    }, []);

    const selectCountry = (countryCode: string) => {
        const country = countries.find(c => c.code.toLowerCase() === countryCode.toLowerCase());
        if (country) {
            setSelectedCountry(country);
            document.cookie = `bj_selected_country=${country.code}; path=/; max-age=31536000; SameSite=Lax`;
            localStorage.setItem("bj_selected_country", country.code);
            sessionStorage.setItem("justSelectedCountry", "true");
            // Refresh page to reload products for new country
            window.location.reload();
        }
    };

    return (
        <RegionContext.Provider value={{ selectedCountry, countries, logoUrl, clients, selectCountry, isLoading }}>
            {children}
        </RegionContext.Provider>
    );
}

export function useRegion() {
    const context = useContext(RegionContext);
    if (!context) {
        throw new Error("useRegion must be used within a RegionProvider");
    }
    return context;
}
