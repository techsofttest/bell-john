"use client";

interface EmailStepProps {
    email: string;
    setEmail: (email: string) => void;
    onNext: () => void;
}

export default function EmailStep({ email, setEmail, onNext }: EmailStepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) onNext();
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h1 className="text-2xl font-serif font-medium text-slate-900 mb-3">
                Password assistance
            </h1>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Enter the email address or mobile phone number associated with your Bell & John account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-bold text-slate-800">
                        Email or mobile phone number
                    </label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                        className="w-full h-11 px-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-sm text-slate-900 transition-all"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full h-11 bg-brand text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-brand/90 hover:shadow transition-all"
                >
                    Continue
                </button>
            </form>
        </div>
    );
}