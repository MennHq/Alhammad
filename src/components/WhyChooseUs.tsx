import React from 'react';
import { motion } from 'motion/react';
import { Building, Layers, Compass, Award, Calculator, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS, STUDIO_INFO } from '../data';

export default function WhyChooseUs() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Building':
        return <Building className="w-6 h-6 text-[#C5A880]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#C5A880]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#C5A880]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#C5A880]" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-[#C5A880]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#C5A880]" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-[#C5A880]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-10 sm:py-16 space-y-8 sm:space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#8D6E63] font-bold block">
          The Al-Hammad Advantage
        </span>
        <h2 className="font-hand text-3xl sm:text-5xl text-[#2B1A14] font-medium leading-tight">
          Why Choose Our Studio?
        </h2>
        <p className="text-xs sm:text-sm text-[#8D6E63] font-light leading-relaxed">
          Unlike ordinary contractors, we combine an in-house joinery workshop in Gulshan with architectural 3D planning and 100% turnkey execution across Karachi.
        </p>
      </div>

      {/* Grid of 6 Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {WHY_CHOOSE_US_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white border border-[#EBE3DB] rounded-[24px] p-6 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Accent Line on Hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-[#FAF6F0] border border-[#EBE3DB] rounded-2xl group-hover:bg-[#24140E] transition-colors">
                  {getIcon(item.iconName)}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#FAF6F0] text-[#8D6E63] border border-[#EBE3DB]">
                  {item.highlight}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-hand text-xl sm:text-2xl text-[#2B1A14] font-bold group-hover:text-[#8D6E63] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8D6E63] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F3EBE3] flex items-center gap-2 text-[11px] font-semibold text-[#C5A880]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Studio Standard</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Callout Banner */}
      <div className="bg-[#24140E] rounded-[28px] p-6 sm:p-10 text-[#FAF6F0] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#3D2318]">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-bold block">
            Direct Workshop Assurance
          </span>
          <h3 className="font-hand text-2xl sm:text-3xl font-bold">
            Visit Our Gulshan Manufacturing Facility
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
            Inspect live timber samples, hardware fittings, lacquer polish finishes, and ongoing custom joinery mockups at Block 13D-1, Gulshan-e-Iqbal.
          </p>
        </div>

        <a
          href={`https://wa.me/${STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello! I would like to schedule a visit to your Gulshan showroom and workshop.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#b0926a] text-[#1C1311] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-lg hover:scale-105 shrink-0 cursor-pointer"
        >
          <Phone className="w-4 h-4" />
          <span>Book Workshop Visit</span>
        </a>
      </div>
    </section>
  );
}
