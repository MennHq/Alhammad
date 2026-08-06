import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MapPin, Sparkles, ArrowUpRight, Phone, Play, Pause } from 'lucide-react';
import { HERO_SLIDES, STUDIO_INFO } from '../data';
import { LightboxItem } from './ImageLightboxModal';

interface HeroSliderProps {
  onOpenLightbox?: (items: LightboxItem[], index: number) => void;
  onInquire?: (title: string) => void;
}

export default function HeroSlider({ onOpenLightbox, onInquire }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentSlide = HERO_SLIDES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <div 
      className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#EBE3DB] bg-[#1C1311] shadow-2xl group select-none my-6"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Aspect Ratio Container */}
      <div className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlays for High Contrast Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1311] via-[#1C1311]/40 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1311]/80 via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Floating Top Badge & Location Tag */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-2 bg-[#1C1311]/80 backdrop-blur-md text-[#C5A880] px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] border border-[#C5A880]/30 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            {currentSlide.badge}
          </span>

          <div className="hidden sm:flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-stone-300 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{currentSlide.location}</span>
          </div>
        </div>

        {/* Main Content Info Overlay (Bottom Left) */}
        <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 right-4 sm:right-8 z-20 max-w-2xl space-y-3 sm:space-y-4">
          <motion.div
            key={`content-${currentSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2 sm:space-y-3"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A880] font-bold block">
              {currentSlide.tagline}
            </span>

            <h2 className="font-hand text-2xl sm:text-4xl lg:text-5xl text-[#FAF6F0] leading-tight font-bold drop-shadow-md">
              {currentSlide.title}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl leading-relaxed line-clamp-2 sm:line-clamp-none">
              {currentSlide.subtitle}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Al-Hammad Interiors! I am interested in inquiring about "${currentSlide.title}".`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#b0926a] text-[#1C1311] px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Inquire This Look</span>
            </a>

            {onOpenLightbox && (
              <button
                onClick={() => {
                  onOpenLightbox([
                    {
                      id: currentSlide.id,
                      title: currentSlide.title,
                      image: currentSlide.image,
                      category: currentSlide.badge,
                      location: currentSlide.location,
                      description: currentSlide.subtitle
                    }
                  ], 0);
                }}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-[#FAF6F0] backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs font-semibold border border-white/20 transition-all cursor-pointer"
              >
                <span>View Full Screen</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Previous / Next Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-lg opacity-80 group-hover:opacity-100 transition-all cursor-pointer hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A880]" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-lg opacity-80 group-hover:opacity-100 transition-all cursor-pointer hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A880]" />
        </button>

        {/* Slide Indicators & Auto-play Pause Toggle */}
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-30 flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-full bg-black/50 text-stone-300 hover:text-white backdrop-blur-sm border border-white/10 transition-colors mr-1 cursor-pointer"
            title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>

          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-[#C5A880]'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
