"use client";

import { useState } from "react";

export default function NewPasswordStep() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            console.log("Password successfully reset!");
            window.location.href = '/auth/login';
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h1 className="text-2xl font-serif font-medium text-slate-900 mb-3">
                Create new password
            </h1>
            <p className="text-sm text-slate-600 mb-6">
                We'll ask for this password whenever you sign in.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label htmlFor="new_password" className="text-sm font-bold text-slate-800">
                        New password
                    </label>
                    <input
                        id="new_password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        autoFocus
                        className="w-full h-11 px-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm text-slate-900 transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="confirm_password" className="text-sm font-bold text-slate-800">
                        Password again
                    </label>
                    <input
                        id="confirm_password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full h-11 px-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm text-slate-900 transition-all"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full h-11 bg-brand text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-brand/90 hover:shadow transition-all"
                >
                    Save changes and sign in
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Secure password tips:</h3>
                <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 marker:text-slate-300">
                    <li>Use at least 8 characters, a combination of numbers and letters is best.</li>
                    <li>Do not use the same password you have used with us previously.</li>
                    <li>Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information.</li>
                    <li>Do not use the same password for multiple online accounts.</li>
                </ul>
            </div>
        </div>
    );
}