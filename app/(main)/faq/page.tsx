import React from 'react';
import { API_URL } from '../../data/products';

async function getFaqs() {
    try {
        const res = await fetch(`${API_URL}/faqs`, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        const json = await res.json();
        if (json.status === 'success' && Array.isArray(json.data)) {
            return json.data;
        }
    } catch (e) {
        console.error('Error fetching FAQs:', e);
    }
    return [];
}

export default async function FaqPage() {
    const faqs = await getFaqs();

    return (
        <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">Frequently Asked Questions</h1>
                    <p className="text-lg text-[#6B7280]">
                        Find answers to the most common questions about our products and services.
                    </p>
                </div>

                {faqs.length > 0 ? (
                    <div className="space-y-6">
                        {faqs.map((faq: any) => (
                            <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-semibold text-[#111827] mb-3">{faq.question}</h3>
                                <div className="text-[#4B5563] leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-[#6B7280] bg-white p-12 rounded-xl shadow-sm border border-[#E5E7EB]">
                        <p>No FAQs available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
