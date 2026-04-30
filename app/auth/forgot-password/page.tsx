"use client";

import { useState } from "react";
import Link from "next/link";
import EmailStep from "../../components/auth/recovery/EmailStep";
import VerificationStep from "../../components/auth/recovery/VerificationStep";
import NewPasswordStep from "../../components/auth/recovery/NewPasswordStep";

type RecoveryStep = 'email' | 'verification' | 'new_password';

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<RecoveryStep>('email');
    const [email, setEmail] = useState('');

    return (
        <div className="w-full max-w-[400px] mx-auto">

            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
                {step === 'email' && (
                    <EmailStep
                        email={email}
                        setEmail={setEmail}
                        onNext={() => setStep('verification')}
                    />
                )}

                {step === 'verification' && (
                    <VerificationStep
                        email={email}
                        onNext={() => setStep('new_password')}
                    />
                )}

                {step === 'new_password' && (
                    <NewPasswordStep />
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