"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function ChangePasswordPage() {
    const router = useRouter();
    const { isLoggedIn, changePassword } = useAuth();
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if not logged in
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
                <div className="text-center max-w-md">
                    <h2 className="text-2xl font-serif font-medium text-slate-900 mb-3">
                        Access Denied
                    </h2>
                    <p className="text-slate-600 mb-6">
                        You need to be logged in to change your password.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/auth/login"
                            className="px-6 py-2.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand/90 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/"
                            className="px-6 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Back Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        // Validation
        if (!currentPassword) {
            setError("Current password is required.");
            return;
        }

        if (!newPassword || newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (currentPassword === newPassword) {
            setError("New password must be different from your current password.");
            return;
        }

        setIsLoading(true);
        try {
            const result = await changePassword(currentPassword, newPassword);
            
            if (result.success) {
                setSuccess(true);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                setError(result.message);
            }
        } catch (e) {
            setError("An error occurred. Please try again.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white py-16 lg:py-20">
            <div className="max-w-[400px] mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-medium text-slate-900 mb-2">
                        Change Password
                    </h1>
                    <p className="text-slate-600">
                        Update your account password securely.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                    {success && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-emerald-900 text-sm">
                                    Password Changed Successfully
                                </h3>
                                <p className="text-emerald-800 text-sm mt-1">
                                    Your password has been updated. Redirecting to home...
                                </p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-red-900 text-sm">
                                    Error
                                </h3>
                                <p className="text-red-800 text-sm mt-1">
                                    {error}
                                </p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Current Password */}
                        <div>
                            <label htmlFor="current-password" className="block text-sm font-semibold text-slate-900 mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    id="current-password"
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter your current password"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg font-medium text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-brand/30 focus:ring-2 focus:ring-brand/10 transition-all"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label htmlFor="new-password" className="block text-sm font-semibold text-slate-900 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="new-password"
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter your new password (min 6 characters)"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg font-medium text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-brand/30 focus:ring-2 focus:ring-brand/10 transition-all"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-semibold text-slate-900 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your new password"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg font-medium text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-brand/30 focus:ring-2 focus:ring-brand/10 transition-all"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-7"
                        >
                            {isLoading ? "Changing Password..." : "Change Password"}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <p className="text-center text-sm text-slate-600">
                            <Link href="/" className="text-brand font-semibold hover:underline">
                                Back to Home
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
