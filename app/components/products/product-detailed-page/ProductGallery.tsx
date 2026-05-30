"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { useRef, useState, useCallback } from "react";

interface ProductGalleryProps {
    title: string;
    selectedImage: string;
    onSelectImage: (img: string) => void;
    galleryImages: string[];
    displayTag?: { label: string; scheme?: any };
    schemeClasses?: string;
}

const ZOOM_FACTOR = 2.8;   // magnification level
const ZOOM_PANEL_SIZE = 300; // px — compact fixed size, no scrollbar risk
const LENS_SIZE_PX = 100;   // px — lens square on the source image

export default function ProductGallery({
    title,
    selectedImage,
    onSelectImage,
    galleryImages,
    displayTag,
    schemeClasses,
}: ProductGalleryProps) {
    const currentIndex = galleryImages.indexOf(selectedImage);
    const containerRef = useRef<HTMLDivElement>(null);

    // ── Magnifier state ──────────────────────────────────────────────────────
    const [isZooming, setIsZooming] = useState(false);
    // Raw pixel position inside the image container (for the lens)
    const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
    // Fraction 0-1 of image container (for zoom computation)
    const [lensFrac, setLensFrac] = useState({ x: 0, y: 0 });
    // Fixed-position coords for the floating zoom panel
    const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });
    // Source image natural dimensions captured once per mount (for bg-size)
    const [imgNaturalSize, setImgNaturalSize] = useState({ w: 0, h: 0 });
    const [mobileZoomOpen, setMobileZoomOpen] = useState(false);
    

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const rawX = e.clientX - rect.left;
        const rawY = e.clientY - rect.top;

        const halfLens = LENS_SIZE_PX / 2;
        const clampedX = Math.min(Math.max(rawX, halfLens), rect.width - halfLens);
        const clampedY = Math.min(Math.max(rawY, halfLens), rect.height - halfLens);

        const fracX = clampedX / rect.width;
        const fracY = clampedY / rect.height;

        setLensPos({ x: clampedX, y: clampedY });
        setLensFrac({ x: fracX, y: fracY });

        // ── Smart fixed positioning: right of image, or left if no space ──
        const GAP = 12;
        const rightEdge = rect.right + GAP;
        const fitsRight = rightEdge + ZOOM_PANEL_SIZE <= window.innerWidth - 8;
        const panelLeft = fitsRight
            ? rightEdge
            : rect.left - GAP - ZOOM_PANEL_SIZE;

        // vertically centre the panel on cursor, clamped inside viewport
        let panelTop = e.clientY - ZOOM_PANEL_SIZE / 2;
        panelTop = Math.max(8, Math.min(panelTop, window.innerHeight - ZOOM_PANEL_SIZE - 8));

        setPanelPos({ top: panelTop, left: panelLeft });
    }, []);

    const handleMouseEnter = () => {
        // capture natural size of the displayed image element
        const img = containerRef.current?.querySelector("img");
        if (img) setImgNaturalSize({ w: img.naturalWidth || 800, h: img.naturalHeight || 800 });
        setIsZooming(true);
    };

    // ── Carousel controls ────────────────────────────────────────────────────
    const handlePrev = () => {
        if (galleryImages.length <= 1) return;
        onSelectImage(galleryImages[(currentIndex - 1 + galleryImages.length) % galleryImages.length]);
    };
    const handleNext = () => {
        if (galleryImages.length <= 1) return;
        onSelectImage(galleryImages[(currentIndex + 1) % galleryImages.length]);
    };

    // ── Zoom panel background-position calculation ────────────────────────────
    // The panel shows the image at ZOOM_PANEL_SIZE * ZOOM_FACTOR dimensions.
    // We shift so the hovered fraction maps to the panel centre.
    const bgW = ZOOM_PANEL_SIZE * ZOOM_FACTOR;
    const bgH = ZOOM_PANEL_SIZE * ZOOM_FACTOR;
    const bgX = -(lensFrac.x * bgW - ZOOM_PANEL_SIZE / 2);
    const bgY = -(lensFrac.y * bgH - ZOOM_PANEL_SIZE / 2);

    return (
        <div className="space-y-4">
            {/* ── Main image wrapper ─────────────────────────────────────── */}
            <div
                ref={containerRef}
                className="relative h-[320px] md:h-[480px] w-full rounded-2xl overflow-hidden bg-white border border-slate-200 group flex items-center justify-center cursor-crosshair"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                onClick={() => {
                    if (window.innerWidth < 1024) {
                        setMobileZoomOpen(true);
                    }
                }}
            >
                <Image
                    src={selectedImage}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-contain transition-opacity duration-300"
                    priority
                />

                {/* Lens square that follows the cursor */}
                {isZooming && (
                    <div
                        className="absolute pointer-events-none border-2 border-brand/50 bg-brand/[0.08] rounded-lg z-20"
                        style={{
                            width: LENS_SIZE_PX,
                            height: LENS_SIZE_PX,
                            left: lensPos.x - LENS_SIZE_PX / 2,
                            top:  lensPos.y - LENS_SIZE_PX / 2,
                        }}
                    />
                )}

                {/* "Hover to zoom" pill – fades when zooming */}
                <div
                    className={`absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-500 text-[11px] font-semibold px-2.5 py-1.5 rounded-full transition-all duration-200 pointer-events-none ${
                        isZooming ? "opacity-0 scale-90" : "opacity-0 group-hover:opacity-100 scale-100"
                    }`}
                >
                    <ZoomIn size={13} />

                     <span className="hidden lg:inline">
                        Hover to zoom
                    </span>

                    <span className="lg:hidden">
                        Tap to zoom
                    </span>

                </div>

                {/* Dynamic Tag */}
                {displayTag && (
                    <div className={`absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border font-semibold text-xs uppercase tracking-widest ${schemeClasses}`}>
                        {displayTag.label}
                    </div>
                )}

                {/* Carousel prev/next */}
                {galleryImages.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-slate-300 hover:border-brand hover:bg-brand hover:text-white text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-slate-300 hover:border-brand hover:bg-brand hover:text-white text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                            aria-label="Next image"
                        >
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </button>
                    </>
                )}
            </div>

            {/* ── Zoom panel — fixed to viewport, never affects layout ─────── */}
            {isZooming && (
                <div
                    className="hidden lg:block fixed z-[9999] rounded-2xl overflow-hidden border-2 border-brand/25 shadow-2xl shadow-slate-400/30 pointer-events-none"
                    style={{
                        width:  ZOOM_PANEL_SIZE,
                        height: ZOOM_PANEL_SIZE,
                        top:    panelPos.top,
                        left:   panelPos.left,
                        backgroundImage:    `url(${selectedImage})`,
                        backgroundRepeat:   "no-repeat",
                        backgroundSize:     `${bgW}px ${bgH}px`,
                        backgroundPosition: `${bgX}px ${bgY}px`,
                    }}
                />

            )}



            {mobileZoomOpen && (
    <div className="lg:hidden fixed inset-0 z-[99999] bg-black">
        <button
            onClick={() => setMobileZoomOpen(false)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center"
        >
            <X size={20} />
        </button>

        <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
                src={selectedImage}
                alt={title}
                fill
                priority
                className="object-contain"
                sizes="100vw"
            />
        </div>


    </div>
)}


            {/* ── Thumbnail strip ───────────────────────────────────────────── */}
            {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {galleryImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => onSelectImage(img)}
                            className={`relative w-16 h-16 rounded-xl overflow-hidden bg-white border-2 transition-all shrink-0 ${
                                selectedImage === img
                                    ? "border-brand scale-95"
                                    : "border-slate-200 hover:border-slate-400"
                            }`}
                        >
                            <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-contain" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
