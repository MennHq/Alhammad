import React, { useState, useRef } from 'react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ArrowRight, Sparkles, Sliders, Maximize2 } from 'lucide-react';

interface PortfolioSliderProps {
  projects: Project[];
  onOpenLightbox?: (project: Project) => void;
}

export default function PortfolioSlider({ projects, onOpenLightbox }: PortfolioSliderProps) {
  const [selectedId, setSelectedId] = useState<string>(projects[0].id);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = projects.find(p => p.id === selectedId) || projects[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Sidebar: Project Navigation */}
      <div className="lg:col-span-4 space-y-4">
        <div className="px-3 py-1.5 bg-[#FAF8F6] rounded-md border border-[#EAE3DB] inline-flex items-center gap-2 mb-1">
          <Sliders className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8C7A6B]">Interactive Showcase</span>
        </div>
        <h3 className="text-2xl font-serif text-[#241815] font-light">Curated <span className="italic">Projects</span></h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 pt-2">
          {projects.map((p) => {
            const isActive = p.id === selectedId;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedId(p.id);
                  setSliderPosition(50); // Reset slider
                }}
                className={`w-full text-left p-5 rounded-xl transition-all duration-500 border ${
                  isActive
                    ? 'bg-[#241815] text-[#FAF8F5] border-[#241815] shadow-lg shadow-[#241815]/10 translate-x-2'
                    : 'bg-white hover:bg-[#FAF8F6] text-[#241815] border-[#EAE3DB] hover:border-[#C5A880]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] uppercase tracking-wider font-bold ${isActive ? 'text-[#C5A880]' : 'text-[#8C7A6B]'}`}>{p.category}</span>
                  <span className="text-xs font-serif opacity-60">{p.year}</span>
                </div>
                <h4 className="font-serif text-lg font-semibold mt-1.5">{p.title}</h4>
                <p className={`text-xs mt-2 line-clamp-1 ${isActive ? 'text-stone-300' : 'text-[#8C7A6B]'}`}>
                  {p.location}
                </p>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="h-[1px] bg-[#C5A880] mt-3 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Before/After Slider & Info */}
      <div className="lg:col-span-8 space-y-8">
        {/* Interactive Before/After Frame */}
        <div className="relative overflow-hidden rounded-xl bg-[#FAF8F6] border border-[#EAE3DB] shadow-lg">
          <div className="absolute top-4 left-4 z-10 bg-[#241815]/90 text-[#C5A880] text-[10px] uppercase tracking-[0.15em] px-3.5 py-2 rounded font-bold backdrop-blur-sm pointer-events-none flex items-center gap-2">
            <Eye className="w-3.5 h-3.5" />
            Drag handle to compare Before & After
          </div>

          {onOpenLightbox && (
            <button
              onClick={() => onOpenLightbox(activeProject)}
              className="absolute top-4 right-4 z-20 bg-[#241815]/90 hover:bg-[#241815] text-[#FAF8F6] text-[10px] uppercase tracking-[0.15em] px-3.5 py-2 rounded font-bold backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 border border-[#C5A880]/30 shadow-md"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Popup View</span>
            </button>
          )}

          <div
            ref={containerRef}
            className="relative h-[480px] w-full select-none overflow-hidden cursor-ew-resize"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            {/* AFTER IMAGE (Background - Full) */}
            <img
              src={activeProject.image}
              alt={`${activeProject.title} After`}
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute right-4 bottom-4 bg-[#241815] text-[#C5A880] text-[10px] uppercase tracking-[0.15em] font-bold px-3.5 py-1.5 rounded z-10 pointer-events-none">
              Modern After
            </div>

            {/* BEFORE IMAGE (Clipped Overlay) */}
            {activeProject.beforeImage && (
              <div
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeProject.beforeImage}
                  alt={`${activeProject.title} Before`}
                  className="absolute inset-0 h-[480px] w-[800px] lg:w-[1200px] object-cover max-w-none"
                  style={{
                    width: containerRef.current?.getBoundingClientRect().width || '100%'
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute left-4 bottom-4 bg-[#1C1311] text-[#FAF8F5] text-[10px] uppercase tracking-[0.15em] font-bold px-3.5 py-1.5 rounded z-10 pointer-events-none">
                  Original Before
                </div>
              </div>
            )}

            {/* SLIDER CONTROLLER HANDLE */}
            <div
              className="absolute inset-y-0 w-[1px] bg-[#C5A880] cursor-ew-resize flex items-center justify-center z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute h-10 w-10 bg-[#FAF8F6] hover:bg-white text-[#241815] rounded-full shadow-lg border border-[#C5A880] flex items-center justify-center -translate-x-1/2 cursor-ew-resize transition-all duration-150">
                <Sliders className="w-4 h-4 text-[#C5A880]" />
              </div>
            </div>
          </div>
        </div>

        {/* Project Technical Specifications */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FAF8F6] rounded-xl p-8 border border-[#EAE3DB] space-y-8"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <span className="px-3.5 py-1.5 bg-[#FAF8F6] text-[#241815] text-[10px] font-bold tracking-wider uppercase rounded border border-[#EAE3DB]">
                  {activeProject.category} Project
                </span>
              </div>
              <h4 className="text-2xl font-serif text-[#241815] font-semibold">{activeProject.title}</h4>
              <p className="text-[#8C7A6B] mt-4 leading-relaxed text-xs">
                {activeProject.description}
              </p>
            </div>

            {/* Tech Specs Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#EAE3DB]">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8C7A6B] block font-bold">Design Vibe</span>
                <span className="text-sm font-serif font-semibold text-[#241815]">{activeProject.specs.style}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8C7A6B] block font-bold">Metal Accent</span>
                <span className="text-sm font-serif font-semibold text-[#241815]">{activeProject.specs.materials.find(m => m.includes('Brass') || m.includes('Copper') || m.includes('Gold') || m.includes('Steel')) || 'Bronze Trim'}</span>
              </div>
            </div>

            {/* Design Highlights List */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#8C7A6B] block font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> Key Craftsmanship Touchpoints
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#8C7A6B]">
                {activeProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-[#EAE3DB]">
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
