"use client";

import { useState } from "react";

interface NewPasswordStepProps {
    onSubmit: (password: string) => void;
    isSubmitting: boolean;
}

export default function NewPasswordStep({ onSubmit, isSubmitting }: NewPasswordStepProps) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (newPassword.length < 6) {
            setLocalError("Password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setLocalError("Passwords do not match.");
            return;
        }

        if (!isSubmitting) {
            onSubmit(newPassword);
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
                {localError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs font-medium animate-in fade-in duration-200">
                        {localError}
                    </div>
                )}

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
                        disabled={isSubmitting}
                        autoFocus
                        className="w-full h-11 px-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm text-slate-900 transition-all disabled:opacity-60"
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
                        disabled={isSubmitting}
                        className="w-full h-11 px-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm text-slate-900 transition-all disabled:opacity-60"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !newPassword || !confirmPassword}
                    className="w-full h-11 bg-brand text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-brand/90 hover:shadow transition-all disabled:opacity-75 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        "Save changes and sign in"
                    )}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Secure password tips:</h3>
                <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 marker:text-slate-300">
                    <li>Use at least 6 characters, a combination of numbers and letters is best.</li>
                    <li>Do not use the same password you have used with us previously.</li>
                    <li>Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information.</li>
                    <li>Do not use the same password for multiple online accounts.</li>
                </ul>
            </div>
        </div>
    );
}