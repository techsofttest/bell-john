"use client";

import { Check } from "lucide-react";
import React from "react";

interface Step {
    id: number;
    label: string;
    icon: React.ComponentType<any>;
}

interface CheckoutProgressBarProps {
    activeStep: number;
    steps: Step[];
    setActiveStep: (step: number) => void;
}

export default function CheckoutProgressBar({ activeStep, steps, setActiveStep }: CheckoutProgressBarProps) {
    return (
        <div className="pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between max-w-lg mx-auto relative px-2 z-0 isolate">
                {/* Line connecting circles */}
                <div className="absolute top-[16px] left-8 right-8 h-[3px] bg-slate-100 rounded-full z-0 overflow-hidden">
                    <div 
                        className="h-full bg-brand rounded-full transition-all duration-300"
                        style={{ width: `${((activeStep - 1) / Math.max(1, steps.length - 1)) * 100}%` }}
                    />
                </div>

                {steps.map((step) => {
                    const StepIcon = step.icon;
                    const isCompleted = activeStep > step.id;
                    const isActive = activeStep === step.id;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2 relative z-10 select-none">
                            <button
                                type="button"
                                disabled={step.id > activeStep && !isCompleted}
                                onClick={() => setActiveStep(step.id)}
                                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                    ${isCompleted 
                                        ? "bg-brand border-brand text-white shadow-md shadow-brand/15 cursor-pointer" 
                                        : isActive 
                                            ? "bg-slate-950 border-slate-950 text-white shadow-md shadow-slate-950/15" 
                                            : "bg-white border-slate-200 text-slate-400 cursor-not-allowed"
                                    }`}
                            >
                                {isCompleted ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <StepIcon className="w-4 h-4" />
                                )}
                            </button>
                            <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 
                                ${isActive ? "text-slate-950" : isCompleted ? "text-brand" : "text-slate-400"}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
