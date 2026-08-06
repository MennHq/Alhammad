import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Check, MessageSquare, Quote, Filter, Send, X } from 'lucide-react';
import { REVIEWS, STUDIO_INFO } from '../data';
import { Review } from '../types';

export default function TestimonialsSection() {
  const [starFilter, setStarFilter] = useState<number | 'All'>('All');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [userReviews, setUserReviews] = useState<Review[]>(REVIEWS);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Filter out any reviewer with name "hammad" or low rating if needed, and apply star filter
  const filtered = userReviews
    .filter((rev) => {
      const name = rev.author.toLowerCase();
      return rev.rating >= 4 && !name.includes('hammad');
    })
    .filter((rev) => {
      if (starFilter === 'All') return true;
      return rev.rating === starFilter;
    });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;

    const added: Review = {
      author: newReviewAuthor,
      rating: newReviewRating,
      text: newReviewText,
      relativeTime: 'Just now',
      verified: true
    };

    setUserReviews([added, ...userReviews]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowReviewModal(false);
      setNewReviewAuthor('');
      setNewReviewText('');
    }, 1800);
  };

  return (
    <section id="testimonials-section" className="py-10 sm:py-16 space-y-8 sm:space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#8D6E63] font-bold block">
          Client Endorsements & Google Reviews
        </span>
        <h2 className="font-hand text-3xl sm:text-5xl text-[#2B1A14] font-medium leading-tight">
          What Our Clients Say
        </h2>
        <p className="text-xs sm:text-sm text-[#8D6E63] font-light leading-relaxed">
          Read genuine feedback from homeowners and corporate clients across DHA, Clifton, Gulshan, and PECHS in Karachi.
        </p>
      </div>

      {/* Overview Stat Card & Filter Controls */}
      <div className="bg-white border border-[#EBE3DB] rounded-[28px] p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#24140E] text-[#C5A880] flex flex-col items-center justify-center font-bold shadow-lg">
            <span className="text-2xl sm:text-3xl font-hand leading-none">{STUDIO_INFO.rating}</span>
            <span className="text-[9px] uppercase tracking-wider text-stone-300">out of 5</span>
          </div>

          <div className="space-y-1">
            <div className="flex text-[#C5A880]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <h3 className="font-hand text-xl font-bold text-[#2B1A14]">
              Verified Google Rating
            </h3>
            <p className="text-xs text-[#8D6E63] font-light">
              Based on {STUDIO_INFO.reviewCount}+ verified reviews across Karachi
            </p>
          </div>
        </div>

        {/* Filter Buttons & Write Review CTA */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-[#FAF6F0] p-1 rounded-full border border-[#EBE3DB]">
            <button
              onClick={() => setStarFilter('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                starFilter === 'All'
                  ? 'bg-[#24140E] text-[#FAF6F0] shadow-sm'
                  : 'text-[#8D6E63] hover:text-[#2B1A14]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStarFilter(5)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                starFilter === 5
                  ? 'bg-[#24140E] text-[#FAF6F0] shadow-sm'
                  : 'text-[#8D6E63] hover:text-[#2B1A14]'
              }`}
            >
              <span>5 Stars</span>
              <Star className="w-3 h-3 text-[#C5A880] fill-current" />
            </button>
            <button
              onClick={() => setStarFilter(4)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                starFilter === 4
                  ? 'bg-[#24140E] text-[#FAF6F0] shadow-sm'
                  : 'text-[#8D6E63] hover:text-[#2B1A14]'
              }`}
            >
              <span>4 Stars</span>
              <Star className="w-3 h-3 text-[#C5A880] fill-current" />
            </button>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-4 py-2 bg-[#C5A880] hover:bg-[#b0926a] text-[#1C1311] rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Leave Review</span>
          </button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-white border border-[#EBE3DB] rounded-[24px] p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-[#C5A880]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#EBE3DB] group-hover:text-[#C5A880]/40 transition-colors" />
              </div>

              <p className="text-xs sm:text-sm text-[#2B1A14] font-light leading-relaxed italic">
                "{review.text}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#F3EBE3] flex items-center justify-between">
              <div>
                <h4 className="font-hand text-base font-bold text-[#2B1A14]">
                  {review.author}
                </h4>
                <span className="text-[10px] text-[#8D6E63] block font-light">
                  {review.relativeTime}
                </span>
              </div>

              {review.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-[#FAF6F0] text-[#8D6E63] px-2.5 py-1 rounded-full border border-[#EBE3DB] font-semibold">
                  <Check className="w-3 h-3 text-[#C5A880]" />
                  Verified
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Write Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#FAF6F0] border border-[#EBE3DB] rounded-[28px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-5 text-[#2B1A14]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#EBE3DB]">
                <h3 className="font-hand text-2xl font-bold">Write Your Review</h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 rounded-full hover:bg-[#EBE3DB] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-[#8D6E63]" />
                </button>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-hand text-xl font-bold">Thank You!</h4>
                  <p className="text-xs text-[#8D6E63]">Your feedback has been submitted successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] block">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full bg-white border border-[#EBE3DB] rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] block">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setNewReviewRating(num)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            newReviewRating >= num
                              ? 'bg-[#24140E] border-[#3D2318] text-[#C5A880]'
                              : 'bg-white border-[#EBE3DB] text-stone-300'
                          }`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] block">
                      Your Feedback / Experience
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Tell us about your experience with Al-Hammad Interiors..."
                      className="w-full bg-white border border-[#EBE3DB] rounded-2xl p-3 text-xs focus:outline-none focus:border-[#C5A880] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#24140E] hover:bg-[#382017] text-[#FAF6F0] py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#C5A880]" />
                    <span>Submit Review</span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
