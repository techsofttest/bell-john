"use client";

interface EmailStepProps {
    email: string;
    setEmail: (email: string) => void;
    onSubmit: () => void;
    isSubmitting: boolean;
}

export default function EmailStep({ email, setEmail, onSubmit, isSubmitting }: EmailStepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() && !isSubmitting) onSubmit();
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h1 className="text-2xl font-serif font-medium text-slate-900 mb-3">
                Password assistance
            </h1>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Enter the email address associated with your Bell & John account to receive a 6-digit verification code.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                        disabled={isSubmitting}
                        autoFocus
                        className="w-full h-11 px-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm text-slate-900 transition-all disabled:opacity-60"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-brand text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-brand/90 hover:shadow transition-all disabled:opacity-75 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        "Continue"
                    )}
                </button>
            </form>
        </div>
    );
}