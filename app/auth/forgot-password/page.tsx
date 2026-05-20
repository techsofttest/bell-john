"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import EmailStep from "../../components/auth/recovery/EmailStep";
import VerificationStep from "../../components/auth/recovery/VerificationStep";
import NewPasswordStep from "../../components/auth/recovery/NewPasswordStep";
import { AlertCircle, CheckCircle2, Key } from "lucide-react";

type RecoveryStep = 'email' | 'verification' | 'new_password';

export default function ForgotPasswordPage() {
    const { forgotPassword, verifyOtp, resetPassword } = useAuth();
    
    const [step, setStep] = useState<RecoveryStep>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Help developer testing in local environment by showing the generated OTP
    const [localOtpHint, setLocalOtpHint] = useState<string | null>(null);

    const handleEmailSubmit = async () => {
        setError(null);
        setSuccessMessage(null);
        setLocalOtpHint(null);
        setIsSubmitting(true);

        try {
            const res = await forgotPassword(email);
            if (res.success) {
                setSuccessMessage(res.message);
                if (res.otp) {
                    setLocalOtpHint(res.otp);
                }
                setStep('verification');
            } else {
                setError(res.message);
            }
        } catch (e) {
            setError("Failed to request password assistance. Please check your connection.");
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerificationSubmit = async (otpCode: string) => {
        setError(null);
        setSuccessMessage(null);
        setIsSubmitting(true);
        setOtp(otpCode);

        try {
            const res = await verifyOtp(email, otpCode);
            if (res.success) {
                setSuccessMessage(res.message);
                setStep('new_password');
            } else {
                setError(res.message);
            }
        } catch (e) {
            setError("Verification failed. Please try again.");
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        setError(null);
        setSuccessMessage(null);
        setLocalOtpHint(null);
        setIsSubmitting(true);

        try {
            const res = await forgotPassword(email);
            if (res.success) {
                setSuccessMessage("A new verification code has been sent!");
                if (res.otp) {
                    setLocalOtpHint(res.otp);
                }
            } else {
                setError(res.message);
            }
        } catch (e) {
            setError("Failed to resend code.");
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewPasswordSubmit = async (newPassword: string) => {
        setError(null);
        setSuccessMessage(null);
        setIsSubmitting(true);

        try {
            const res = await resetPassword(email, otp, newPassword);
            if (res.success) {
                setSuccessMessage("Your password has been successfully reset! Redirecting to login...");
                setTimeout(() => {
                    window.location.href = '/auth/login';
                }, 2000);
            } else {
                setError(res.message);
            }
        } catch (e) {
            setError("Failed to save changes. Please try again.");
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-[400px] mx-auto">

            {localOtpHint && (
                <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl text-xs font-semibold mb-4 animate-bounce">
                    <Key className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold text-blue-900 mb-0.5">[Local Developer Mode]</p>
                        <p>Simulated OTP code: <span className="font-mono text-sm bg-blue-100 px-2 py-0.5 rounded border border-blue-200 select-all font-black">{localOtpHint}</span></p>
                        <p className="mt-1 text-[10px] text-blue-600 font-normal">You can also use fallback code <span className="font-mono font-bold">123456</span>.</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs font-medium mb-4 animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            {successMessage && !error && (
                <div className="flex items-start gap-2 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-xs font-medium mb-4 animate-in fade-in duration-200">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{successMessage}</span>
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
                {step === 'email' && (
                    <EmailStep
                        email={email}
                        setEmail={setEmail}
                        onSubmit={handleEmailSubmit}
                        isSubmitting={isSubmitting}
                    />
                )}

                {step === 'verification' && (
                    <VerificationStep
                        email={email}
                        onSubmit={handleVerificationSubmit}
                        onResend={handleResendOtp}
                        isSubmitting={isSubmitting}
                    />
                )}

                {step === 'new_password' && (
                    <NewPasswordStep
                        onSubmit={handleNewPasswordSubmit}
                        isSubmitting={isSubmitting}
                    />
                )}
            </div>

            {/* Dynamic Footer Links */}
            {step === 'email' ? (
                <p className="text-center text-sm text-slate-600">
                    Remember your password? <Link href="/auth/login" className="text-brand font-semibold hover:underline">Sign in</Link>
                </p>
            ) : (
                <div className="text-center">
                    <p className="text-sm text-slate-600 mb-1">Need help?</p>
                    <p className="text-sm text-slate-500">
                        If you cannot receive the code, <button onClick={() => setStep('email')} className="text-brand font-semibold hover:underline">try a different way</button>.
                    </p>
                </div>
            )}

        </div>
    );
}