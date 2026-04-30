"use client";

import { useState } from "react";
import { Info } from "lucide-react";

interface VerificationStepProps {
    email: string;
    onNext: () => void;
}

export default function VerificationStep({ email, onNext }: VerificationStepProps) {
    const [otp, setOtp] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.trim().length === 6) onNext();
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h1 className="text-2xl font-serif font-medium text-slate-900 mb-3">
                Enter verification code
            </h1>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                For your security, we have sent the code to your email <span className="font-semibold text-slate-800">{email}</span>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        autoFocus
                        maxLength={6}
                        className="w-full h-11 px-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm text-center tracking-[0.5em] text-slate-900 transition-all font-mono"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <button type="button" className="text-sm text-brand font-medium hover:underline text-left w-max">
                        Resend code
                    </button>

                    <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-md border border-slate-100">
                        <Info className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Please wait 58 seconds before requesting another code.
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full h-11 bg-brand text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-brand/90 hover:shadow transition-all"
                >
                    Submit code
                </button>
            </form>
        </div>
    );
}