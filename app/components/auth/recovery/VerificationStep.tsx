"use client";

import { useState, useEffect } from "react";
import { Info } from "lucide-react";

interface VerificationStepProps {
    email: string;
    onSubmit: (otp: string) => void;
    onResend: () => void;
    isSubmitting: boolean;
}

export default function VerificationStep({ email, onSubmit, onResend, isSubmitting }: VerificationStepProps) {
    const [otp, setOtp] = useState('');
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.trim().length === 6 && !isSubmitting) {
            onSubmit(otp);
        }
    };

    const handleResendClick = () => {
        if (countdown === 0) {
            onResend();
            setCountdown(60);
        }
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
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        required
                        disabled={isSubmitting}
                        autoFocus
                        maxLength={6}
                        className="w-full h-11 px-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm text-center tracking-[0.5em] text-slate-900 transition-all font-mono disabled:opacity-60"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                        type="button" 
                        disabled={countdown > 0 || isSubmitting}
                        onClick={handleResendClick}
                        className="text-sm text-brand font-medium hover:underline text-left w-max disabled:opacity-50 disabled:no-underline"
                    >
                        Resend code {countdown > 0 && `(${countdown}s)`}
                    </button>

                    <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-md border border-slate-100">
                        <Info className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 leading-relaxed">
                            {countdown > 0 
                                ? `Please wait ${countdown} seconds before requesting another code.`
                                : "You can now request another verification code if you haven't received it."}
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={otp.length !== 6 || isSubmitting}
                    className="w-full h-11 bg-brand text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-brand/90 hover:shadow transition-all disabled:opacity-75 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                        </>
                    ) : (
                        "Submit code"
                    )}
                </button>
            </form>
        </div>
    );
}