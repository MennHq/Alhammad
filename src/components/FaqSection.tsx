import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Phone, HelpCircle } from 'lucide-react';
import { FAQS, STUDIO_INFO } from '../data';

export default function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs-section" className="py-6 sm:py-12 space-y-8 sm:space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#8D6E63] font-bold block">
          Clear Answers & Guidelines
        </span>
        <h2 className="font-hand text-3xl sm:text-5xl text-[#2B1A14] font-bold leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[#8D6E63] font-light leading-relaxed">
          Transparent information about our project pricing, Gulshan joinery workshop, timelines, and 10-year timber warranties in Karachi.
        </p>
      </div>

      {/* Accordion Questions List - Clean, direct, high contrast */}
      <div className="max-w-3xl mx-auto space-y-3 px-2">
        {FAQS.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white border border-[#EBE3DB] rounded-[20px] overflow-hidden transition-all duration-300 shadow-sm hover:border-[#C5A880]/60"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block">
                    {faq.category}
                  </span>
                  <h3 className="font-hand text-base sm:text-lg text-[#2B1A14] font-bold">
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
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#8D6E63] font-light leading-relaxed border-t border-[#F3EBE3]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Direct WhatsApp CTA Box */}
      <div className="max-w-2xl mx-auto bg-[#FAF6F0] border border-[#EBE3DB] rounded-[24px] p-6 text-center space-y-3">
        <h3 className="font-hand text-2xl font-bold text-[#2B1A14]">
          Have a specific project question?
        </h3>
        <p className="text-xs text-[#8D6E63] max-w-md mx-auto leading-relaxed">
          Our senior interior architects are available on WhatsApp to discuss your exact floor plans or site requirements.
        </p>
        <a
          href={`https://wa.me/${STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello! I have a question regarding my interior project in Karachi.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#24140E] hover:bg-[#382017] text-[#FAF6F0] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
        >
          <Phone className="w-4 h-4 text-[#C5A880]" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
