"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
    id: string | number;
    title: string;
    image: string;
    qty: number;
    size?: string;
    color?: string;
    packaging?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    isCartOpen: boolean;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string | number) => void;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => 
                i.id === item.id && 
                i.size === item.size && 
                i.color === item.color &&
                i.packaging === item.packaging
            );
            if (existing) {
                return prev.map((i) => (
                    i.id === item.id && 
                    i.size === item.size && 
                    i.color === item.color &&
                    i.packaging === item.packaging
                ) ? { ...i, qty: i.qty + item.qty } : i);
            }
            return [...prev, item];
        });
        setIsCartOpen(true); // Automatically open slide-over when adding
    };

    const removeFromCart = (id: string | number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{
            cartItems, isCartOpen, addToCart, removeFromCart, openCart: () => setIsCartOpen(true), closeCart: () => setIsCartOpen(false)
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};