"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
    title: string;
    selectedImage: string;
    onSelectImage: (img: string) => void;
    galleryImages: string[];
    displayTag?: { label: string; scheme?: any };
    schemeClasses?: string;
}

export default function ProductGallery({
    title,
    selectedImage,
    onSelectImage,
    galleryImages,
    displayTag,
    schemeClasses
}: ProductGalleryProps) {
    const currentIndex = galleryImages.indexOf(selectedImage);

    const handlePrev = () => {
        if (galleryImages.length <= 1) return;
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        onSelectImage(galleryImages[prevIndex]);
    };

    const handleNext = () => {
        if (galleryImages.length <= 1) return;
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        onSelectImage(galleryImages[nextIndex]);
    };

    return (
        <div className="space-y-4">
            <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 group flex items-center justify-center p-4">
                <Image 
                    src={selectedImage} 
                    alt={title} 
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />

                {/* Dynamic Tag - FLAT with NO shadow */}
                {displayTag && (
                    <div className={`absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border font-semibold text-xs uppercase tracking-widest ${schemeClasses}`}>
                        {displayTag.label}
                    </div>
                )}

                {/* Carousel Controls - FLAT with border, NO shadow */}
                {galleryImages.length > 1 && (
                    <>
                        <button 
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-slate-300 hover:border-brand hover:bg-brand hover:text-white text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-slate-300 hover:border-brand hover:bg-brand hover:text-white text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                            aria-label="Next image"
                        >
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail selector - FLAT with border, NO shadow */}
            {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {galleryImages.map((img, index) => (
                        <button 
                            key={index}
                            onClick={() => onSelectImage(img)}
                            className={`relative w-16 h-16 rounded-xl overflow-hidden bg-white border-2 transition-all shrink-0 ${
                                selectedImage === img 
                                    ? 'border-brand scale-95' 
                                    : 'border-slate-200 hover:border-slate-400'
                            }`}
                        >
                            <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
