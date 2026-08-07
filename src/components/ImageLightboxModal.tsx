import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Ruler, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  Maximize2, 
  Eye, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { STUDIO_INFO } from '../data';

export interface LightboxItem {
  id?: string;
  title: string;
  image: string;
  beforeImage?: string;
  category?: string;
  location?: string;
  year?: string;
  description?: string;
  specs?: {
    area?: string;
    style?: string;
    duration?: string;
    materials?: string[];
  };
  highlights?: string[];
  meta?: string;
}

interface ImageLightboxModalProps {
  isOpen: boolean;
  currentIndex: number;
  items: LightboxItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
  onInquire?: (item: LightboxItem) => void;
}

export default function ImageLightboxModal({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNavigate,
  onInquire
}: ImageLightboxModalProps) {
  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');
  const [isZoomed, setIsZoomed] = useState(false);

  const currentItem = items[currentIndex];

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset tab when item changes
  useEffect(() => {
    setActiveTab('after');
    setIsZoomed(false);
  }, [currentIndex]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          onNavigate(currentIndex - 1);
        } else {
          onNavigate(items.length - 1); // Loop to end
        }
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < items.length - 1) {
          onNavigate(currentIndex + 1);
        } else {
          onNavigate(0); // Loop to start
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !currentItem) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(items.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  };

  const activeImageUrl = currentItem.image;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Al-Hammad Interiors! I am interested in inquiring about "${currentItem.title}" (${currentItem.image}). Category: ${currentItem.category || 'Interior Design'}. Please contact me back with project details.`
    );
    const whatsappUrl = `https://wa.me/${STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (onInquire) {
      onInquire(currentItem);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 select-none overflow-y-auto"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content Box */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl my-auto bg-[#FAF6F0] rounded-[24px] sm:rounded-[32px] border border-[#EBE3DB] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[92vh] text-[#2B1A14]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* LEFT / TOP: Image Gallery Viewport */}
            <div className="relative flex-1 bg-[#1A120F] flex flex-col items-center justify-center min-h-[300px] sm:min-h-[420px] lg:min-h-[550px] overflow-hidden group">
              
              {/* Image Display */}
              <div 
                className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  key={activeImageUrl}
                  src={activeImageUrl}
                  alt={currentItem.title}
                  className={`max-h-[65vh] lg:max-h-[78vh] w-auto max-w-full object-contain transition-transform duration-300 ${
                    isZoomed ? 'scale-125 cursor-zoom-out' : 'hover:scale-[1.01]'
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Image Counter Badge */}
              <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white/90 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider border border-white/10">
                {currentIndex + 1} / {items.length}
              </div>

              {/* Zoom Button Indicator */}
              <button
                onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/90 border border-white/15 transition-all cursor-pointer"
                title={isZoomed ? "Zoom out" : "Zoom in"}
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Navigation Arrows */}
              {items.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm border border-white/15 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm border border-white/15 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* RIGHT / BOTTOM: Project Meta & Detailed Info */}
            <div className="w-full lg:w-[420px] shrink-0 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[85vh] bg-[#FAF6F0] border-t lg:border-t-0 lg:border-l border-[#EBE3DB]">
              <div className="space-y-5">
                
                {/* Header Category & Title */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.2em] bg-[#EBE3DB]/60 px-2.5 py-1 rounded-full border border-[#EBE3DB]">
                      {currentItem.category || "Signature Interior"}
                    </span>
                    {currentItem.year && (
                      <span className="text-xs text-[#8D6E63] flex items-center gap-1 font-light">
                        <Calendar className="w-3.5 h-3.5" />
                        {currentItem.year}
                      </span>
                    )}
                  </div>

                  <h3 className="font-hand text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1A14] leading-tight">
                    {currentItem.title}
                  </h3>

                  {currentItem.location && (
                    <div className="flex items-center gap-1.5 text-xs text-[#8D6E63] font-medium pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                      <span>{currentItem.location}</span>
                    </div>
                  )}
                </div>

                <hr className="border-[#EBE3DB]" />

                {/* Description */}
                {currentItem.description && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Overview</h4>
                    <p className="text-xs sm:text-sm text-[#2B1A14]/90 font-light leading-relaxed max-h-36 overflow-y-auto pr-1">
                      {currentItem.description}
                    </p>
                  </div>
                )}

                {/* Key Specifications Grid */}
                {currentItem.specs && (
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                      Project Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {currentItem.specs.area && (
                        <div className="bg-white p-2.5 rounded-xl border border-[#EBE3DB]">
                          <span className="text-[10px] text-[#8D6E63] block font-light">Total Area</span>
                          <span className="font-semibold text-[#2B1A14]">{currentItem.specs.area}</span>
                        </div>
                      )}
                      {currentItem.specs.style && (
                        <div className="bg-white p-2.5 rounded-xl border border-[#EBE3DB]">
                          <span className="text-[10px] text-[#8D6E63] block font-light">Design Style</span>
                          <span className="font-semibold text-[#2B1A14]">{currentItem.specs.style}</span>
                        </div>
                      )}
                      {currentItem.specs.duration && (
                        <div className="bg-white p-2.5 rounded-xl border border-[#EBE3DB]">
                          <span className="text-[10px] text-[#8D6E63] block font-light">Timeline</span>
                          <span className="font-semibold text-[#2B1A14]">{currentItem.specs.duration}</span>
                        </div>
                      )}
                      {currentItem.meta && (
                        <div className="bg-white p-2.5 rounded-xl border border-[#EBE3DB]">
                          <span className="text-[10px] text-[#8D6E63] block font-light">Key Feature</span>
                          <span className="font-semibold text-[#2B1A14]">{currentItem.meta}</span>
                        </div>
                      )}
                    </div>

                    {/* Materials tags */}
                    {currentItem.specs.materials && currentItem.specs.materials.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {currentItem.specs.materials.map((mat, idx) => (
                          <span 
                            key={idx}
                            className="text-[10px] bg-white border border-[#EBE3DB] px-2.5 py-1 rounded-full text-[#8D6E63] font-medium"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Highlights List */}
                {currentItem.highlights && currentItem.highlights.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      Craftsmanship Highlights
                    </h4>
                    <ul className="space-y-1.5">
                      {currentItem.highlights.map((h, idx) => (
                        <li key={idx} className="text-xs text-[#2B1A14]/90 flex items-start gap-2 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Footer WhatsApp Inquiry Button */}
              <div className="pt-6 mt-6 border-t border-[#EBE3DB] space-y-2">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full bg-[#24140E] hover:bg-[#341e14] text-[#FAF6F0] py-3.5 px-5 rounded-full font-bold uppercase tracking-[0.15em] text-xs transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer border border-[#3D2318]/50"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  Inquire About This Space
                </button>
                <p className="text-[10px] text-center text-[#8D6E63] font-light">
                  Opens WhatsApp directly with pre-filled project inquiry
                </p>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
