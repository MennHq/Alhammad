import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Compass, Sliders, Building, Check, Clock, ChevronRight, Phone } from 'lucide-react';
import { PROCESS_STEPS, STUDIO_INFO } from '../data';

export default function ProcessWorkflow() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-[#C5A880]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#C5A880]" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-[#C5A880]" />;
      case 'Building':
        return <Building className="w-5 h-5 text-[#C5A880]" />;
      default:
        return <Check className="w-5 h-5 text-[#C5A880]" />;
    }
  };

  return (
    <section id="process-workflow" className="py-10 sm:py-16 space-y-8 sm:space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#8D6E63] font-bold block">
          How We Work
        </span>
        <h2 className="font-hand text-3xl sm:text-5xl text-[#2B1A14] font-medium leading-tight">
          Our 5-Step Turnkey Process
        </h2>
        <p className="text-xs sm:text-sm text-[#8D6E63] font-light leading-relaxed">
          From your initial idea to the final lacquer polish, our structured roadmap keeps your timeline predictable and your budget 100% transparent.
        </p>
      </div>

      {/* Timeline Steps Stack / Grid */}
      <div className="space-y-6 sm:space-y-8 relative max-w-4xl mx-auto">
        {/* Connecting Vertical Line for large screens */}
        <div className="hidden lg:block absolute top-12 bottom-12 left-10 w-0.5 bg-gradient-to-b from-[#C5A880] via-[#EBE3DB] to-[#C5A880]" />

        {PROCESS_STEPS.map((step, idx) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white border border-[#EBE3DB] rounded-[24px] p-5 sm:p-8 hover:shadow-xl transition-all duration-300 relative z-10 flex flex-col md:flex-row items-start gap-6 group"
          >
            {/* Step Number Circle */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#24140E] text-[#C5A880] flex items-center justify-center font-hand text-xl sm:text-2xl font-bold shadow-md group-hover:scale-105 transition-transform">
                0{step.step}
              </div>
              <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-[#EBE3DB] md:hidden">
                {getIcon(step.icon)}
              </div>
            </div>

            {/* Step Main Info */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F3EBE3] pb-2">
                <div>
                  <h3 className="font-hand text-xl sm:text-2xl text-[#2B1A14] font-bold group-hover:text-[#8D6E63] transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-[11px] text-[#8D6E63] font-medium block">
                    {step.subtitle}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#2B1A14] text-[11px] font-bold border border-[#EBE3DB]">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{step.duration}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#8D6E63] font-light leading-relaxed">
                {step.description}
              </p>

              {/* Key Deliverables Pills */}
              <div className="pt-2 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#2B1A14] block">
                  Key Deliverables:
                </span>
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] bg-[#FAF6F0] text-[#2B1A14] px-3 py-1 rounded-full border border-[#EBE3DB] font-medium"
                    >
                      <Check className="w-3 h-3 text-[#C5A880]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Start Process CTA */}
      <div className="text-center pt-4">
        <a
          href={`https://wa.me/${STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello! I would like to start Step 1: Free Site Audit & Consultation.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#24140E] hover:bg-[#382017] text-[#FAF6F0] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-xl hover:scale-105 cursor-pointer border border-[#3D2318]"
        >
          <Phone className="w-4 h-4 text-[#C5A880]" />
          <span>Start Step 1: Book Free Site Survey</span>
        </a>
      </div>
    </section>
  );
}
