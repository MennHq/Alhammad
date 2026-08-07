import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { REVIEWS, STUDIO_INFO } from '../data';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter valid reviews
  const filteredReviews = REVIEWS.filter((rev) => {
    const name = rev.author.toLowerCase();
    return rev.rating >= 4 && !name.includes('hammad');
  });

  // Auto-rotate reviews every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredReviews.length]);

  const currentReview = filteredReviews[activeIndex] || filteredReviews[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredReviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  };

  const GOOGLE_MAPS_REVIEW_URL = "https://maps.app.goo.gl/NK2snbfZxH8wer4q8?g_st=ac";

  return (
    <section id="testimonials-section" className="py-6 sm:py-12 space-y-8 sm:space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#8D6E63] font-bold block">
          Client Endorsements & Google Reviews
        </span>
        <h2 className="font-hand text-3xl sm:text-5xl text-[#2B1A14] font-bold leading-tight">
          What Our Clients Say
        </h2>
        <p className="text-xs sm:text-sm text-[#8D6E63] font-light leading-relaxed">
          Genuine feedback from homeowners and commercial clients across DHA, Clifton, Gulshan, and PECHS in Karachi.
        </p>
      </div>

      {/* Top Banner: Rating Summary & Direct Google Maps Review CTA */}
      <div className="bg-white border border-[#EBE3DB] rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#24140E] text-[#C5A880] flex flex-col items-center justify-center font-bold shadow-md shrink-0">
            <span className="text-xl sm:text-2xl font-hand leading-none">{STUDIO_INFO.rating}</span>
            <span className="text-[8px] uppercase tracking-wider text-stone-300">out of 5</span>
          </div>

          <div className="space-y-1">
            <div className="flex text-[#C5A880]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <h3 className="font-hand text-lg font-bold text-[#2B1A14]">
              Verified Google Business Rating
            </h3>
            <p className="text-xs text-[#8D6E63] font-light">
              Based on {STUDIO_INFO.reviewCount}+ verified reviews across Karachi
            </p>
          </div>
        </div>

        {/* Direct Link to Google Maps Review Profile */}
        <a
          href={GOOGLE_MAPS_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-[#C5A880] hover:bg-[#b0926a] text-[#1C1311] rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>Leave a Review on Google</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Auto-Rotating Featured Review Carousel */}
      <div className="bg-[#FAF6F0] border border-[#EBE3DB] rounded-[28px] p-6 sm:p-10 relative overflow-hidden shadow-sm">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <div className="flex justify-center text-[#C5A880]">
            <Quote className="w-10 h-10 text-[#C5A880]/60" />
          </div>

          <div className="min-h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex justify-center text-[#C5A880] gap-1">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-base sm:text-xl font-hand text-[#2B1A14] italic leading-relaxed">
                  "{currentReview.text}"
                </p>

                <div className="pt-2 space-y-0.5">
                  <h4 className="font-sans font-bold text-sm text-[#2B1A14]">
                    {currentReview.author}
                  </h4>
                  <p className="text-[11px] text-[#8D6E63]">
                    {currentReview.relativeTime} &bull; <span className="text-[#C5A880] font-semibold">Verified Client</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation Controls & Dots */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white border border-[#EBE3DB] text-[#2B1A14] hover:bg-[#24140E] hover:text-[#FAF6F0] transition-colors cursor-pointer shadow-sm"
              title="Previous Review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-1.5">
              {filteredReviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx
                      ? 'w-6 bg-[#24140E]'
                      : 'w-2 bg-[#EBE3DB] hover:bg-[#C5A880]'
                  }`}
                  title={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white border border-[#EBE3DB] text-[#2B1A14] hover:bg-[#24140E] hover:text-[#FAF6F0] transition-colors cursor-pointer shadow-sm"
              title="Next Review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
