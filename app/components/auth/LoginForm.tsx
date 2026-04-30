"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle your authentication logic here
        console.log("Logging in with:", email);
    };

    return (
        <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-bold text-slate-800">
                    Email address
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    className="w-full h-11 px-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm text-slate-900 transition-all"
                />
            </div>

            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-bold text-slate-800">
                        Password
                    </label>
                    <Link href="/auth/forgot-password" className="text-xs text-brand font-medium hover:underline">
                        Forgot password?
                    </Link>
                </div>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-11 px-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm text-slate-900 transition-all"
                />
            </div>

            <button
                type="submit"
                className="w-full h-11 bg-brand text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-brand/90 hover:shadow transition-all"
            >
                Sign in
            </button>
        </form>
    );
}