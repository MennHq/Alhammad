import React from 'react';
import { motion } from 'motion/react';
import { Building, Layers, Compass, Award, Calculator, Sparkles, Phone, ShieldCheck } from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS, STUDIO_INFO } from '../data';

export default function WhyChooseUs() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Building':
        return <Building className="w-5 h-5 text-[#C5A880]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#C5A880]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#C5A880]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#C5A880]" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-[#C5A880]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#C5A880]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#C5A880]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-6 sm:py-12 space-y-8">
      {/* Clean Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5 px-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#8D6E63] font-bold block">
          The Al-Hammad Advantage
        </span>
        <h2 className="font-hand text-3xl sm:text-5xl text-[#2B1A14] font-bold leading-tight">
          Why Choose Al-Hammad Interiors?
        </h2>
        <p className="text-xs sm:text-sm text-[#8D6E63] font-light leading-relaxed">
          Direct in-house joinery, transparent itemized BOQs, and end-to-end site supervision across Karachi.
        </p>
      </div>

      {/* Grid of Key Pillars - Clean, minimal cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY_CHOOSE_US_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white border border-[#EBE3DB] rounded-[20px] p-6 hover:shadow-md transition-all duration-300 space-y-3.5 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-[#FAF6F0] border border-[#EBE3DB] rounded-xl group-hover:bg-[#24140E] transition-colors">
                {getIcon(item.iconName)}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                {item.highlight}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-hand text-xl text-[#2B1A14] font-bold group-hover:text-[#8D6E63] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#8D6E63] font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Direct Workshop Visit Banner */}
      <div className="bg-[#24140E] rounded-[24px] p-6 sm:p-8 text-[#FAF6F0] flex flex-col md:flex-row items-center justify-between gap-5 shadow-md border border-[#3D2318]">
        <div className="space-y-1.5 text-center md:text-left max-w-xl">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-bold block">
            Direct Workshop Assurance
          </span>
          <h3 className="font-hand text-2xl sm:text-3xl font-bold">
            Visit Our Gulshan Manufacturing Facility
          </h3>
          <p className="text-xs text-stone-300 font-light leading-relaxed">
            Inspect live timber samples, hardware fittings, lacquer polish finishes, and ongoing custom joinery at Block 13D-1, Gulshan-e-Iqbal.
          </p>
        </div>

        <a
          href={`https://wa.me/${STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello! I would like to schedule a visit to your Gulshan showroom and workshop.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#b0926a] text-[#1C1311] px-5 py-3 rounded-full text-xs font-bold uppercase tracking-[0.12em] transition-all shadow-md shrink-0 cursor-pointer"
        >
          <Phone className="w-4 h-4" />
          <span>Book Workshop Visit</span>
        </a>
      </div>
    </section>
  );
}
