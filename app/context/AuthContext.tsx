"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
}

interface AuthContextType {
    customer: Customer | null;
    token: string | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<{ success: boolean; message: string; otp?: string }>;
    verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; message: string }>;
    resetPassword: (email: string, otp: string, password: string) => Promise<{ success: boolean; message: string }>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://bellnjohn.test:90/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Hydrate state from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("bnj_customer_token");
            const savedCustomer = localStorage.getItem("bnj_customer_profile");
            
            if (savedToken && savedCustomer) {
                setToken(savedToken);
                try {
                    setCustomer(JSON.parse(savedCustomer));
                } catch (e) {
                    console.error("Error parsing saved customer profile", e);
                }
            }
            setIsLoading(false);
        }
    }, []);

    // Perform login
    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(`${API_URL}/customer/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.status === "success") {
                setToken(data.token);
                setCustomer(data.customer);
                localStorage.setItem("bnj_customer_token", data.token);
                localStorage.setItem("bnj_customer_profile", JSON.stringify(data.customer));
                return { success: true, message: data.message || "Logged in successfully" };
            }

            return { success: false, message: data.message || "Invalid email or password" };
        } catch (e) {
            console.error("Login request failed:", e);
            return { success: false, message: "Server connection failed. Please try again." };
        }
    };

    // Perform registration
    const register = async (name: string, email: string, phone: string, password: string) => {
        try {
            const res = await fetch(`${API_URL}/customer/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ name, email, phone, password })
            });

            const data = await res.json();

            if (res.ok && data.status === "success") {
                setToken(data.token);
                setCustomer(data.customer);
                localStorage.setItem("bnj_customer_token", data.token);
                localStorage.setItem("bnj_customer_profile", JSON.stringify(data.customer));
                return { success: true, message: data.message || "Registration successful" };
            }

            return { success: false, message: data.message || "Registration failed" };
        } catch (e) {
            console.error("Registration request failed:", e);
            return { success: false, message: "Server connection failed. Please try again." };
        }
    };

    // Perform logout
    const logout = async () => {
        try {
            if (token) {
                await fetch(`${API_URL}/customer/logout`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json"
                    }
                });
            }
        } catch (e) {
            console.error("Logout request failed:", e);
        } finally {
            setToken(null);
            setCustomer(null);
            localStorage.removeItem("bnj_customer_token");
            localStorage.removeItem("bnj_customer_profile");
        }
    };

    // Forgot password request
    const forgotPassword = async (email: string) => {
        try {
            const res = await fetch(`${API_URL}/customer/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (res.ok && data.status === "success") {
                return { 
                    success: true, 
                    message: data.message, 
                    otp: data.otp ? String(data.otp) : undefined 
                };
            }

            return { success: false, message: data.message || "Failed to initiate password reset." };
        } catch (e) {
            console.error("Forgot password request failed:", e);
            return { success: false, message: "Server connection failed. Please try again." };
        }
    };

    // Verify OTP code
    const verifyOtp = async (email: string, otp: string) => {
        try {
            const res = await fetch(`${API_URL}/customer/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email, otp })
            });

            const data = await res.json();

            if (res.ok && data.status === "success") {
                return { success: true, message: data.message };
            }

            return { success: false, message: data.message || "Invalid or expired verification code." };
        } catch (e) {
            console.error("OTP verification request failed:", e);
            return { success: false, message: "Server connection failed. Please try again." };
        }
    };

    // Reset password
    const resetPassword = async (email: string, otp: string, password: string) => {
        try {
            const res = await fetch(`${API_URL}/customer/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email, otp, password })
            });

            const data = await res.json();

            if (res.ok && data.status === "success") {
                return { success: true, message: data.message };
            }

            return { success: false, message: data.message || "Failed to reset password." };
        } catch (e) {
            console.error("Reset password request failed:", e);
            return { success: false, message: "Server connection failed. Please try again." };
        }
    };

    // Change password (authenticated)
    const changePassword = async (currentPassword: string, newPassword: string) => {
        try {
            const res = await fetch(`${API_URL}/customer/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    current_password: currentPassword, 
                    new_password: newPassword,
                    new_password_confirmation: newPassword
                })
            });

            const data = await res.json();

            if (res.ok && data.status === "success") {
                return { success: true, message: data.message };
            }

            return { success: false, message: data.message || "Failed to change password." };
        } catch (e) {
            console.error("Change password request failed:", e);
            return { success: false, message: "Server connection failed. Please try again." };
        }
    };

    const isLoggedIn = !!token && !!customer;

    return (
        <AuthContext.Provider
            value={{
                customer,
                token,
                isLoggedIn,
                isLoading,
                login,
                register,
                logout,
                forgotPassword,
                verifyOtp,
                resetPassword,
                changePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
