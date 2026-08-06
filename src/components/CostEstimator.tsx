import React, { useState, useMemo } from 'react';
import { PRICE_CALCULATOR_SPECS } from '../data';
import { Calculator, Hammer, Paintbrush, Calendar, MessageSquare, ShieldCheck, Sparkles, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

export default function CostEstimator() {
  const [area, setArea] = useState<number>(1200); // default sft
  const [spaceType, setSpaceType] = useState<'residential' | 'commercial' | 'office'>('residential');
  const [serviceTier, setServiceTier] = useState<'design' | 'turnkey' | 'bespoke'>('turnkey');
  const [timberType, setTimberType] = useState<'premium_walnut' | 'standard_oak' | 'budget_mdf'>('premium_walnut');

  const estimates = useMemo(() => {
    // Determine base rate per sft
    let baseRate = 180;
    if (spaceType === 'residential') {
      baseRate = serviceTier === 'design' ? PRICE_CALCULATOR_SPECS.baseRates.residential_design : PRICE_CALCULATOR_SPECS.baseRates.residential_turnkey;
    } else if (spaceType === 'commercial') {
      baseRate = serviceTier === 'design' ? PRICE_CALCULATOR_SPECS.baseRates.commercial_design : PRICE_CALCULATOR_SPECS.baseRates.commercial_turnkey;
    } else {
      baseRate = serviceTier === 'design' ? PRICE_CALCULATOR_SPECS.baseRates.office_design : PRICE_CALCULATOR_SPECS.baseRates.office_turnkey;
    }

    // Multiply if Bespoke Tier
    if (serviceTier === 'bespoke') {
      baseRate = baseRate * 1.4; // 40% premium for ultra luxury
    }

    // Apply material premium (walnut vs oak)
    const multiplier = PRICE_CALCULATOR_SPECS.materialMultipliers[timberType];
    const rawTotal = area * baseRate * multiplier;

    // Itemized percentages
    const designFee = Math.round(rawTotal * 0.08); // 8% design & blueprints
    const woodwork = Math.round(rawTotal * 0.45);  // 45% wardrobes, fluted wall panels, custom tables
    const electrical = Math.round(rawTotal * 0.15); // 15% smart spotlights, recessed LED strips
    const finishes = Math.round(rawTotal * 0.22);   // 22% travertine, plaster, paint, wallpaper
    const oversight = Math.round(rawTotal * 0.10);  // 10% turnkey management & execution

    const total = designFee + woodwork + electrical + finishes + oversight;

    // Convert to readable PKR formatting
    const formatPKR = (num: number) => {
      return 'Rs. ' + num.toLocaleString('en-PK');
    };

    return {
      total: formatPKR(total),
      rawTotal: total,
      designFee: formatPKR(designFee),
      woodwork: formatPKR(woodwork),
      electrical: formatPKR(electrical),
      finishes: formatPKR(finishes),
      oversight: formatPKR(oversight),
      pkrPerSft: formatPKR(Math.round(total / area)),
      timeline: Math.ceil(area < 1000 ? 5 : area < 3000 ? 10 : 16) + " Weeks"
    };
  }, [area, spaceType, serviceTier, timberType]);

  // Handle WhatsApp Link formatting
  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Asalam-o-Alaikum Al-Hammad Interiors! I used your online Cost Estimator and would like a consultation.\n\n` +
      `- Space Type: ${spaceType.toUpperCase()}\n` +
      `- Area: ${area.toLocaleString()} sq. ft.\n` +
      `- Service Level: ${serviceTier.toUpperCase()}\n` +
      `- Preferred Material: ${timberType.toUpperCase()}\n` +
      `- Estimated Budget: ${estimates.total}\n` +
      `- Scope: Design & Execution in Karachi`
    );
    return `https://wa.me/923028212429?text=${text}`;
  };

  return (
    <div className="bg-white/90 border-2 border-[#E8DFD8] rounded-3xl p-6 md:p-8 shadow-2xl shadow-stone-200/40 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input sliders and parameters */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="px-3.5 py-2 bg-[#F5EBE6] rounded-xl border border-[#E0D0C5] inline-flex items-center gap-2 mb-2">
              <Calculator className="w-4 h-4 text-[#5D4037]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5D4037]">Space & Budget Calculator</span>
            </div>
            <h3 className="text-3xl font-serif text-[#3E2723] font-bold">Project <span className="italic text-[#8D6E63]">Cost Estimator</span></h3>
            <p className="text-[#8D7B70] text-xs mt-2 leading-relaxed">
              Select your space attributes to calculate realistic turnkey design, material sourcing, and onsite installation costs in Karachi.
            </p>
          </div>

          {/* Area Slider */}
          <div className="space-y-3 bg-[#FCF9F6] p-5 rounded-2xl border border-[#F3E7DF] shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#3E2723] uppercase tracking-wider">Project Area (Square Feet)</span>
              <span className="text-xs font-bold text-[#3E2723] bg-[#FAF0E6] px-3.5 py-1.5 rounded-lg border border-[#EEDAD0] font-mono shadow-inner">
                {area.toLocaleString()} sft
              </span>
            </div>
            <input 
              type="range" 
              min="200" 
              max="8000" 
              step="50"
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full accent-[#5D4037] bg-stone-100 h-2 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8D7B70] font-bold tracking-tight">
              <span>Small Room (200 sft)</span>
              <span>Villa / Corporate Space (8,000 sft)</span>
            </div>
          </div>

          {/* Space Type Selection */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-[#3E2723] uppercase tracking-wider block">Space Category</span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'residential', label: 'Residential', desc: 'Home / Villa' },
                { id: 'commercial', label: 'Commercial', desc: 'Shop / Showroom' },
                { id: 'office', label: 'Corporate Office', desc: 'Workspace' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSpaceType(t.id as any)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    spaceType === t.id
                      ? 'bg-[#3E2723] border-[#3E2723] text-white shadow-md scale-[1.02]'
                      : 'bg-white border-[#F0E4DC] text-[#5D4037] hover:border-[#D7C4B7] hover:bg-[#FCF9F6]'
                  }`}
                >
                  <span className="text-sm font-serif font-bold block leading-none">{t.label}</span>
                  <span className={`text-[10px] block mt-1.5 ${spaceType === t.id ? 'text-stone-300' : 'text-[#8D7B70]'}`}>
                    {t.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Service Level Selection */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-[#3E2723] uppercase tracking-wider block">Service Depth</span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'design', label: 'Design Only', desc: '3D & Blueprints' },
                { id: 'turnkey', label: 'Full Turnkey', desc: 'Design + Execution' },
                { id: 'bespoke', label: 'Ultra Bespoke', desc: 'Premium Walnut + Brass' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setServiceTier(t.id as any)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    serviceTier === t.id
                      ? 'bg-[#3E2723] border-[#3E2723] text-white shadow-md scale-[1.02]'
                      : 'bg-white border-[#F0E4DC] text-[#5D4037] hover:border-[#D7C4B7] hover:bg-[#FCF9F6]'
                  }`}
                >
                  <span className="text-sm font-serif font-bold block leading-none">{t.label}</span>
                  <span className={`text-[10px] block mt-1.5 ${serviceTier === t.id ? 'text-stone-300' : 'text-[#8D7B70]'}`}>
                    {t.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Material Grade Selection */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-[#3E2723] uppercase tracking-wider block">Primary Timber Selection</span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'premium_walnut', label: 'Rich Walnut', desc: 'Supreme Polish' },
                { id: 'standard_oak', label: 'Earthy Oak', desc: 'Modern Textured' },
                { id: 'budget_mdf', label: 'Laminated MDF', desc: 'Clean Economical' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTimberType(t.id as any)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    timberType === t.id
                      ? 'bg-[#3E2723] border-[#3E2723] text-white shadow-md scale-[1.02]'
                      : 'bg-white border-[#F0E4DC] text-[#5D4037] hover:border-[#D7C4B7] hover:bg-[#FCF9F6]'
                  }`}
                >
                  <span className="text-sm font-serif font-bold block leading-none">{t.label}</span>
                  <span className={`text-[10px] block mt-1.5 ${timberType === t.id ? 'text-stone-300' : 'text-[#8D7B70]'}`}>
                    {t.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Calculated Outputs and Itemization */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#FAF5F1] border-2 border-[#E5D2C7] rounded-2xl p-6 md:p-8 relative overflow-hidden space-y-5 shadow-inner">
            <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
              <Calculator className="w-48 h-48 text-[#3E2723]" />
            </div>

            <div className="text-center space-y-1 relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#8D7B70] font-bold block">Estimated Budget Outlay</span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#3E2723] font-black tracking-tight mt-1">
                {estimates.total}
              </h2>
              <p className="text-xs text-amber-800 font-bold font-serif uppercase tracking-wider mt-1.5">
                Averages to {estimates.pkrPerSft} per sft (incl. materials & fitting)
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 border-y border-[#E5D2C7] py-4 relative z-10">
              <div className="text-center">
                <span className="text-[10px] uppercase text-[#8D7B70] font-bold tracking-wider block">Target Timeline</span>
                <span className="text-base font-serif font-bold text-[#3E2723] flex items-center justify-center gap-1.5 mt-1">
                  <Calendar className="w-4 h-4 text-amber-700" /> {estimates.timeline}
                </span>
              </div>
              <div className="text-center">
                <span className="text-[10px] uppercase text-[#8D7B70] font-bold tracking-wider block">Fabrication Quality</span>
                <span className="text-base font-serif font-bold text-[#3E2723] flex items-center justify-center gap-1.5 mt-1">
                  <Hammer className="w-4 h-4 text-amber-700" /> Premium Polish
                </span>
              </div>
            </div>

            {/* Itemized Progress Charts */}
            <div className="space-y-4 relative z-10">
              <h4 className="text-xs font-bold text-[#3E2723] uppercase tracking-widest">Itemized Cost Structure</h4>
              
              <div className="space-y-3.5 text-xs text-[#5D4037]">
                {/* Custom Woodwork */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-[11px] uppercase tracking-wide">
                    <span>Premium Woodwork & Veneers (45%)</span>
                    <span className="text-[#3E2723]">{estimates.woodwork}</span>
                  </div>
                  <div className="w-full bg-[#EFE7E2] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#5D4037] h-full rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>

                {/* Travertine, Plasters, Finishes */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-[11px] uppercase tracking-wide">
                    <span>Wall Finishes, Travertine & Slabs (22%)</span>
                    <span className="text-[#3E2723]">{estimates.finishes}</span>
                  </div>
                  <div className="w-full bg-[#EFE7E2] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#8D6E63] h-full rounded-full" style={{ width: '22%' }} />
                  </div>
                </div>

                {/* Electrical / Light Grid */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-[11px] uppercase tracking-wide">
                    <span>Acoustic Grid & Smart Spotlighting (15%)</span>
                    <span className="text-[#3E2723]">{estimates.electrical}</span>
                  </div>
                  <div className="w-full bg-[#EFE7E2] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C7A75C] h-full rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>

                {/* Site Supervision */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-[11px] uppercase tracking-wide">
                    <span>Turnkey Oversight & Sourcing Labor (10%)</span>
                    <span className="text-[#3E2723]">{estimates.oversight}</span>
                  </div>
                  <div className="w-full bg-[#EFE7E2] h-2 rounded-full overflow-hidden">
                    <div className="bg-stone-500 h-full rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>

                {/* Blueprints / Design Fee */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-[11px] uppercase tracking-wide">
                    <span>3D Rendering & Architectural Blueprints (8%)</span>
                    <span className="text-[#3E2723]">{estimates.designFee}</span>
                  </div>
                  <div className="w-full bg-[#EFE7E2] h-2 rounded-full overflow-hidden">
                    <div className="bg-stone-400 h-full rounded-full" style={{ width: '8%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sourcing and Credibility banner */}
          <div className="bg-white border-2 border-[#E8DFD8] p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-[#FAF0E6] text-amber-800 border border-[#EEDAD0] rounded-full flex items-center justify-center shrink-0">
              <Paintbrush className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-bold text-[#3E2723]">Direct Showroom Sourcing</h5>
              <p className="text-xs text-[#8D7B70] leading-relaxed">
                Avoid middleman commissions. Custom cabinetry and metal trim are manufactured directly in our Karachi Gulshan-e-Iqbal workshop, assuring supreme quality.
              </p>
            </div>
          </div>

          {/* WhatsApp Direct Inquiry */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#128C7E] hover:bg-[#075E54] text-white py-4 px-6 rounded-xl font-bold text-center flex items-center justify-center gap-2.5 transition-all uppercase tracking-widest text-xs shadow-lg shadow-[#128C7E]/20 hover:scale-[1.01] active:scale-[0.99]"
          >
            <MessageSquare className="w-4 h-4" />
            Submit Estimate via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
