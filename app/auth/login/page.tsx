import Link from "next/link";
import LoginForm from "../../components/auth/LoginForm";
import SocialAuth from "../../components/auth/SocialAuth";

export default function LoginPage() {
    return (
        <div className="w-full max-w-[400px] mx-auto">

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                {/* Title and Sign Up Link Grouped Together */}
                <div className="mb-5">
                    <h1 className="text-2xl font-serif font-medium text-slate-900 mb-1">
                        Sign in
                    </h1>
                    <p className="text-sm text-slate-600">
                        Don't have an account? <Link href="/auth/register" className="text-brand font-semibold hover:underline">Sign up</Link>
                    </p>
                </div>

                <LoginForm />

                {/* Divider - Reduced Margin */}
                <div className="relative my-5 text-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <span className="relative z-10 bg-white px-3 text-[11px] text-slate-500 uppercase tracking-wider font-medium">
                        Or continue with
                    </span>
                </div>

                <SocialAuth />

                <p className="text-[11px] text-slate-600 mt-5 leading-relaxed text-center">
                    By continuing, you agree to Bell & John's <Link href="/conditions" className="text-brand hover:underline">Conditions of Use</Link> and <Link href="/privacy" className="text-brand hover:underline">Privacy Notice</Link>.
                </p>
            </div>

        </div>
    );
}