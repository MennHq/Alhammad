import React, { useState, useMemo } from 'react';
import { MaterialTexture } from '../types';
import { MATERIALS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Plus, Trash2, Sliders, Sun, ShieldCheck, HelpCircle, Inbox } from 'lucide-react';

export default function InteractivePalette({ onBack }: { onBack: () => void }) {
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialTexture[]>([
    MATERIALS[0], // Smoked Walnut
    MATERIALS[1], // Travertine Stone
    MATERIALS[3]  // Brushed Bronze
  ]);
  const [sunAngle, setSunAngle] = useState<number>(45);
  const [stainDepth, setStainDepth] = useState<number>(1); // Stain intensity multiplier
  const [metalSheen, setMetalSheen] = useState<number>(80); // Glossiness %
  const [activeTab, setActiveTab] = useState<'Wood' | 'Stone' | 'Fabric' | 'Metal' | 'All'>('All');
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const [deliveryDetails, setDeliveryDetails] = useState({ name: '', phone: '', address: '' });

  const filteredMaterials = useMemo(() => {
    if (activeTab === 'All') return MATERIALS;
    return MATERIALS.filter(m => m.category === activeTab);
  }, [activeTab]);

  const addMaterial = (m: MaterialTexture) => {
    if (selectedMaterials.some(item => item.id === m.id)) return;
    if (selectedMaterials.length >= 4) {
      // Replace oldest
      setSelectedMaterials([...selectedMaterials.slice(1), m]);
    } else {
      setSelectedMaterials([...selectedMaterials, m]);
    }
  };

  const removeMaterial = (id: string) => {
    setSelectedMaterials(selectedMaterials.filter(m => m.id !== id));
  };

  // Premade luxury presets
  const presets = [
    {
      name: "Walnut Cozy",
      materials: [MATERIALS[0], MATERIALS[2], MATERIALS[3]], // Walnut, Boucle, Bronze
      angle: 60,
      stain: 1.1,
      sheen: 90
    },
    {
      name: "Travertine",
      materials: [MATERIALS[1], MATERIALS[2], MATERIALS[5]], // Travertine, Boucle, Leather
      angle: 120,
      stain: 0.8,
      sheen: 40
    },
    {
      name: "Espresso",
      materials: [MATERIALS[4], MATERIALS[1], MATERIALS[3]], // Chocolate Oak, Travertine, Bronze
      angle: 30,
      stain: 1.3,
      sheen: 85
    }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setSelectedMaterials(preset.materials);
    setSunAngle(preset.angle);
    setStainDepth(preset.stain);
    setMetalSheen(preset.sheen);
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryDetails.name || !deliveryDetails.phone) return;
    setIsOrdered(true);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative bg-[#170F0D]">
      {/* 1st DIV inside wrapper: The Visual Interactive Moodboard Canvas (satisfies CSS selector exactly) */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Ambient Lighting Overlay based on Sun Angle */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-500"
          style={{
            background: `linear-gradient(${sunAngle}deg, rgba(255,253,248,0.1) 0%, rgba(36,24,21,0.55) 85%)`,
          }}
        />

        {/* Empty State Help */}
        {selectedMaterials.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-stone-950/95 z-20">
            <HelpCircle className="w-12 h-12 text-[#C5A880] stroke-[1.5] animate-pulse" />
            <h4 className="font-serif text-white text-lg mt-3 font-semibold">Empty Designer Tray</h4>
            <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
              Add walnut, travertine, or brass samples from the sliding drawer to compose your space.
            </p>
          </div>
        )}

        {/* Layer 1: Background Large Material */}
        {selectedMaterials[0] && (
          <img 
            src={selectedMaterials[0].imageUrl} 
            alt={selectedMaterials[0].name}
            className="w-full h-full object-cover transition-all duration-500"
            style={{
              filter: selectedMaterials[0].category === 'Wood' 
                ? `brightness(${stainDepth * 0.9}) contrast(${stainDepth * 1.05}) saturate(${stainDepth})` 
                : 'none'
            }}
            referrerPolicy="no-referrer"
          />
        )}

        {/* Layer 2: Geometric Angle Overlap */}
        {selectedMaterials[1] && (
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute right-0 top-0 w-2/3 h-full overflow-hidden transition-all duration-500 border-l border-white/10 shadow-2xl z-10"
            style={{
              clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)'
            }}
          >
            <img 
              src={selectedMaterials[1].imageUrl} 
              alt={selectedMaterials[1].name}
              className="w-full h-full object-cover"
              style={{
                filter: selectedMaterials[1].category === 'Wood' 
                  ? `brightness(${stainDepth * 0.9}) contrast(${stainDepth * 1.05}) saturate(${stainDepth})` 
                  : 'none'
              }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}

        {/* Layer 3: Accent Panel Circle / Floating Card */}
        {selectedMaterials[2] && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-64 h-64 rounded-full overflow-hidden transition-all duration-500 border-4 border-white/20 shadow-2xl z-20"
          >
            <img 
              src={selectedMaterials[2].imageUrl} 
              alt={selectedMaterials[2].name}
              className="w-full h-full object-cover"
              style={{
                filter: selectedMaterials[2].category === 'Wood' 
                  ? `brightness(${stainDepth * 0.9}) contrast(${stainDepth * 1.05}) saturate(${stainDepth})` 
                  : 'none'
              }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}

        {/* Layer 4: Linear Metal Trim Accent */}
        {selectedMaterials[3] && (
          <motion.div 
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            className="absolute right-1/3 top-0 w-8 h-full transition-all duration-500 shadow-2xl z-20"
            style={{
              borderColor: 'rgba(255,255,255,0.15)',
              borderLeftWidth: '1px',
              borderRightWidth: '1px'
            }}
          >
            <img 
              src={selectedMaterials[3].imageUrl} 
              alt={selectedMaterials[3].name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-white/10" style={{ opacity: metalSheen / 100 }} />
          </motion.div>
        )}
      </div>

      {/* Floating Header Actions for exit & basic settings */}
      <div className="absolute top-6 left-6 z-30 flex items-center gap-3">
        <button 
          onClick={onBack}
          className="bg-[#1C1311]/95 text-[#FAF8F5] border border-white/10 hover:border-white/20 hover:bg-[#2A1D1A] px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-2xl flex items-center gap-2"
        >
          ← Exit Canvas
        </button>
      </div>

      {/* Floating Tuning Sliders Panel */}
      <div className="absolute left-6 bottom-6 z-30 w-80 bg-[#1C1311]/90 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl space-y-4 text-white">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <h4 className="font-serif text-sm font-bold tracking-wide flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C5A880]" /> Surface Tuning
          </h4>
          <span className="text-[9px] bg-[#C5A880]/10 text-[#C5A880] px-2 py-0.5 rounded uppercase tracking-wider font-bold">Live Shadow</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] text-stone-300">
              <span className="flex items-center gap-1"><Sun className="w-3.5 h-3.5 text-[#C5A880]" /> Light Angle</span>
              <span className="font-bold">{sunAngle}°</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="360" 
              value={sunAngle}
              onChange={(e) => setSunAngle(parseInt(e.target.value))}
              className="w-full accent-[#C5A880] bg-white/15 h-1 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] text-stone-300">
              <span>Wood Stain Depth</span>
              <span className="font-bold">{stainDepth.toFixed(2)}x</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="2.0" 
              step="0.05"
              value={stainDepth}
              onChange={(e) => setStainDepth(parseFloat(e.target.value))}
              className="w-full accent-[#C5A880] bg-white/15 h-1 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] text-stone-300">
              <span>Metal Polish Sheen</span>
              <span className="font-bold">{metalSheen}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={metalSheen}
              onChange={(e) => setMetalSheen(parseInt(e.target.value))}
              className="w-full accent-[#C5A880] bg-white/15 h-1 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Floating Premium Sample Vault Cabinet Drawer (Right Sidebar) */}
      <div className="absolute right-6 top-6 bottom-6 z-30 w-96 bg-[#1C1311]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col justify-between text-white overflow-hidden">
        
        {/* Cabin header & Presets */}
        <div className="p-5 border-b border-white/5 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-serif text-base font-bold tracking-wide">Material Library</h4>
            <span className="text-[9px] uppercase bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded font-bold">Karachi Stock</span>
          </div>
          
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {presets.map((p, i) => (
              <button
                key={i}
                onClick={() => applyPreset(p)}
                className="text-[9px] uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-lg text-stone-300 hover:text-white transition-all duration-300 shrink-0 font-bold"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter subtabs */}
        <div className="px-5 py-2 bg-white/5 flex gap-1 overflow-x-auto border-b border-white/5">
          {(['All', 'Wood', 'Stone', 'Fabric', 'Metal'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[9px] px-2.5 py-1.5 rounded-md uppercase tracking-wider font-bold transition-all ${
                activeTab === tab
                  ? 'bg-[#C5A880] text-[#1C1311]'
                  : 'text-stone-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable list items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 max-h-[calc(100vh-320px)]">
          <div className="grid grid-cols-2 gap-2.5">
            {filteredMaterials.map((m) => {
              const isAdded = selectedMaterials.some(item => item.id === m.id);
              const addedIndex = selectedMaterials.findIndex(item => item.id === m.id);
              return (
                <div
                  key={m.id}
                  className={`p-2 border rounded-xl flex flex-col justify-between transition-all duration-300 bg-white/5 ${
                    isAdded 
                      ? 'border-[#C5A880] bg-[#C5A880]/10' 
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] uppercase text-stone-400 block font-bold leading-none mb-1">{m.category}</span>
                      <span className="text-[10px] font-bold text-white block truncate leading-tight">{m.name}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => addMaterial(m)}
                    disabled={isAdded}
                    className={`w-full mt-2 text-[9px] py-1.5 rounded-lg flex items-center justify-center gap-1 font-bold uppercase tracking-wider transition-all ${
                      isAdded
                        ? 'bg-white/10 text-stone-400'
                        : 'bg-[#C5A880] hover:bg-[#A88E5E] text-[#1C1311]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Layer 0{addedIndex + 1}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Add to Tray</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected layers dock */}
        <div className="p-5 border-t border-white/5 bg-white/5 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-serif font-bold text-[#C5A880]">Active Tray ({selectedMaterials.length}/4)</span>
            {selectedMaterials.length > 0 && (
              <button 
                onClick={() => setSelectedMaterials([])}
                className="text-[9px] uppercase tracking-wider text-red-400 hover:text-red-300 font-bold"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="space-y-2">
            {selectedMaterials.map((m, index) => (
              <div key={m.id} className="flex justify-between items-center bg-[#1C1311]/50 border border-white/5 p-2 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md overflow-hidden shrink-0 border border-white/10">
                    <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-[#C5A880] block font-bold">L0{index + 1} • {m.category}</span>
                    <span className="font-bold text-white text-[10px] truncate max-w-[140px] block">{m.name}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeMaterial(m.id)}
                  className="p-1 hover:bg-red-500/10 text-stone-400 hover:text-red-400 rounded-md transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button 
              onClick={() => {
                const element = document.getElementById('sample-box-modal');
                if (element) element.style.display = 'flex';
              }}
              disabled={selectedMaterials.length === 0}
              className="w-full bg-[#C5A880] hover:bg-[#A88E5E] text-[#1C1311] py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Order Physical Samples
            </button>
          </div>
        </div>
      </div>

      {/* Pop-up Dialog for Physical Shipping Box */}
      <div 
        id="sample-box-modal"
        style={{ display: 'none' }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md items-center justify-center p-4"
      >
        <div className="bg-[#FAF5F1] text-[#3E2723] border-2 border-[#E5D2C7] p-8 rounded-2xl w-full max-w-md space-y-6 relative shadow-2xl">
          <button 
            onClick={() => {
              const element = document.getElementById('sample-box-modal');
              if (element) element.style.display = 'none';
            }}
            className="absolute top-4 right-4 text-[#8D7B70] hover:text-[#3E2723] text-xl font-bold"
          >
            ✕
          </button>

          {!isOrdered ? (
            <form onSubmit={handleOrder} className="space-y-4">
              <div className="flex items-start gap-3">
                <Inbox className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-serif text-lg font-bold">Request Physical Sample Box</h5>
                  <p className="text-xs text-[#8D7B70] mt-1 leading-relaxed">
                    We will package and deliver real wood, travertine, or brass samples straight to your door in Karachi for direct matching.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={deliveryDetails.name}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
                  className="bg-white border-2 border-[#F0E4DC] focus:border-[#8D6E63] rounded-xl p-3 text-xs outline-none text-[#3E2723] font-semibold"
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp No."
                  value={deliveryDetails.phone}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
                  className="bg-white border-2 border-[#F0E4DC] focus:border-[#8D6E63] rounded-xl p-3 text-xs outline-none text-[#3E2723] font-semibold"
                />
              </div>

              <input
                type="text"
                required
                placeholder="Shipping Address (Karachi only)"
                value={deliveryDetails.address}
                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                className="w-full bg-white border-2 border-[#F0E4DC] focus:border-[#8D6E63] rounded-xl p-3 text-xs outline-none text-[#3E2723] font-semibold"
              />

              <button
                type="submit"
                className="w-full bg-[#3E2723] hover:bg-[#201412] text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all uppercase tracking-widest shadow-md"
              >
                Order Physical Sample Box
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h5 className="font-serif text-[#3E2723] font-bold text-lg">Sample Box Ordered!</h5>
                <p className="text-xs text-[#8D7B70] leading-relaxed">
                  Thank you, <strong>{deliveryDetails.name}</strong>. We are custom packing your sample box containing: <strong>{selectedMaterials.map(m => m.name).join(', ')}</strong>. A design architect will reach you on <strong>{deliveryDetails.phone}</strong> to confirm delivery.
                </p>
              </div>
              <button 
                onClick={() => {
                  const element = document.getElementById('sample-box-modal');
                  if (element) element.style.display = 'none';
                  setIsOrdered(false);
                }}
                className="bg-[#3E2723] text-white px-6 py-2 rounded-xl text-xs uppercase tracking-wider font-bold"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
