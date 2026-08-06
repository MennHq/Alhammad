import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { FAQS, STUDIO_INFO } from '../data';

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const categories = ['All', 'Pricing & BOQ', 'Execution & Timeline', 'Workshop & Manufacturing', 'Warranty & Materials', 'Design & Renders'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs-section" className="py-10 sm:py-16 space-y-8 sm:space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#8D6E63] font-bold block">
          Got Questions? We Have Answers
        </span>
        <h2 className="font-hand text-3xl sm:text-5xl text-[#2B1A14] font-medium leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[#8D6E63] font-light leading-relaxed">
          Clear, transparent answers about our interior design pricing, Gulshan joinery workshop, turnkey execution, and 10-year timber warranties in Karachi.
        </p>
      </div>

      {/* Search Input & Category Pill Filters */}
      <div className="max-w-3xl mx-auto space-y-4 px-2">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. pricing, workshop, warranty, 3D renders...)"
            className="w-full bg-white border border-[#EBE3DB] rounded-full pl-12 pr-6 py-3.5 text-xs text-[#2B1A14] focus:outline-none focus:border-[#C5A880] shadow-sm"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#24140E] text-[#FAF6F0] shadow-md border border-[#3D2318]'
                  : 'bg-white text-[#8D6E63] border border-[#EBE3DB] hover:bg-[#FAF6F0] hover:text-[#2B1A14]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="max-w-3xl mx-auto space-y-3 px-2">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white border border-[#EBE3DB] rounded-[24px] p-8 text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-[#8D6E63] mx-auto" />
            <h3 className="font-hand text-xl font-bold text-[#2B1A14]">No matching questions found</h3>
            <p className="text-xs text-[#8D6E63]">Try searching for something else or contact our WhatsApp support directly.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-[#EBE3DB] rounded-[20px] sm:rounded-[24px] overflow-hidden transition-all shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block">
                      {faq.category}
                    </span>
                    <h3 className="font-hand text-lg sm:text-xl text-[#2B1A14] font-bold">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`p-2 rounded-full bg-[#FAF6F0] border border-[#EBE3DB] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-[#24140E] text-[#C5A880]' : 'text-[#2B1A14]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#8D6E63] font-light leading-relaxed border-t border-[#F3EBE3]/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* WhatsApp Help CTA Box */}
      <div className="max-w-3xl mx-auto bg-[#FAF6F0] border border-[#EBE3DB] rounded-[28px] p-6 text-center space-y-3">
        <h3 className="font-hand text-2xl font-bold text-[#2B1A14]">
          Still Have Questions About Your Space?
        </h3>
        <p className="text-xs text-[#8D6E63] max-w-lg mx-auto">
          Our senior interior architects are available on WhatsApp to answer specific questions regarding your floor plans, site location, or budget estimates.
        </p>
        <a
          href={`https://wa.me/${STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello! I have a question regarding my home interior project in Karachi.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#24140E] hover:bg-[#382017] text-[#FAF6F0] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
        >
          <Phone className="w-4 h-4 text-[#C5A880]" />
          <span>Ask Us On WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
