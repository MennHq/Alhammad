import React, { useState, useMemo } from 'react';
import { QUIZ_QUESTIONS, PROJECTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';

interface QuizResult {
  title: string;
  subtitle: string;
  description: string;
  palette: string[];
  paletteNames: string[];
  recommendedProjectIds: string[];
}

const RESULTS: Record<string, QuizResult> = {
  minimalist: {
    title: "Warm Organic Minimalist",
    subtitle: "Sanctuary of Light & Earth",
    description: "Your taste leans towards peaceful, warm, and quiet environments. You prefer natural white oak, soft textured boucle, linen draperies, and gentle, shadow-free plaster wall treatments. Your spaces prioritize slow living, negative space, and deep spiritual serenity.",
    palette: ["#FAF8F5", "#EFEBE9", "#D7CCC8", "#C5A880", "#241815"],
    paletteNames: ["Satin Chalk", "Oat Fluff", "Soft Travertine", "Warm Ochre", "Burnt Cocoa"],
    recommendedProjectIds: ["gourmet-kitchen", "commercial-showroom"]
  },
  luxury: {
    title: "High-End Moody Luxury",
    subtitle: "A Masterpiece of High Contrast",
    description: "You appreciate deep drama, architectural weight, and rich, sensory-driven luxury. You favor dark smoked walnut veneers, deep black ebony, highly polished brass or bronze fixtures, and spectacular focused spotlighting grids that elevate functional zones into fine-art spaces.",
    palette: ["#1C1917", "#241815", "#8C7A6B", "#C5A880", "#FAF8F5"],
    paletteNames: ["Charcoal Slate", "Espresso Wood", "Nutmeg Leather", "Polished Gold", "Linen Highlight"],
    recommendedProjectIds: ["walnut-residence", "bronze-oasis-bedroom"]
  },
  classic: {
    title: "Warm Walnut Contemporary",
    subtitle: "Timeless Dialogue with Wood",
    description: "You love rich, classic modern spaces that feel balanced, sturdy, and highly detailed. You gravitate towards swirling smoked walnut patterns, rich chestnut leathers, warm copper finishes, and floating fluted wood walls that give visual depth and functional storage.",
    palette: ["#4E3629", "#8C7A6B", "#FAF8F6", "#C5A880", "#FAF8F5"],
    paletteNames: ["Smoked Walnut", "Muted Leather", "Sand Dune", "Brushed Bronze", "Alabaster White"],
    recommendedProjectIds: ["walnut-residence", "executive-lounge"]
  }
};

export default function StyleQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');

  const handleSelect = (optionValue: string) => {
    setAnswers({ ...answers, [currentStep]: optionValue });
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsFinished(false);
    setIsBooked(false);
    setBookingName('');
    setBookingPhone('');
  };

  // Determine result based on selected options
  const result: QuizResult = useMemo(() => {
    const counts = { minimalist: 0, luxury: 0, classic: 0 };
    Object.values(answers).forEach(val => {
      if (val === 'white-oak' || val === 'warm-minimalist' || val === 'matte-black') {
        counts.minimalist += 1;
      } else if (val === 'ebony' || val === 'bold-luxury' || val === 'satin-brass') {
        counts.luxury += 1;
      } else {
        counts.classic += 1;
      }
    });

    if (counts.luxury >= counts.minimalist && counts.luxury >= counts.classic) {
      return RESULTS.luxury;
    } else if (counts.minimalist >= counts.classic) {
      return RESULTS.minimalist;
    } else {
      return RESULTS.classic;
    }
  }, [answers]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone) return;
    setIsBooked(true);
  };

  return (
    <div className="bg-[#FAF8F6] border border-[#EAE3DB] rounded-2xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="quiz-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Header / Progress */}
            <div className="flex justify-between items-center border-b border-[#FAF4EE] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-[0.2em] block">Space Persona Quiz</span>
                <h3 className="text-2xl font-serif text-[#241815] font-light">Discover Your <span className="italic">Design Aura</span></h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F5EFEB] text-[#241815] px-3.5 py-1.5 rounded border border-[#EAE3DB]">
                Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question Text */}
            <h4 className="text-lg md:text-xl font-serif text-[#241815] font-light leading-snug">
              {QUIZ_QUESTIONS[currentStep].text}
            </h4>

            {/* Options List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {QUIZ_QUESTIONS[currentStep].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className="group text-left bg-white hover:bg-[#FAF8F6] border border-[#EAE3DB] hover:border-[#C5A880] rounded-xl p-4 transition-all duration-500 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 relative"
                >
                  <div className="space-y-3">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100">
                      <img 
                        src={opt.image} 
                        alt={opt.label} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h5 className="font-serif font-semibold text-base text-[#241815] group-hover:text-[#C5A880] transition-colors">
                        {opt.label}
                      </h5>
                      <p className="text-xs text-[#8C7A6B] mt-1 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-full mt-4 flex items-center justify-end">
                    <span className="w-7 h-7 rounded-full bg-[#F5EFEB] group-hover:bg-[#241815] group-hover:text-[#FAF8F5] text-[#241815] flex items-center justify-center transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#FAF4EE] h-[2px] rounded-full overflow-hidden border border-[#EAE3DB]/30">
              <div 
                className="bg-[#C5A880] h-full transition-all duration-300"
                style={{ width: `${((currentStep) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-3 pb-6 border-b border-[#EAE3DB]">
              <div className="w-12 h-12 bg-[#F5EFEB] text-[#C5A880] rounded-full flex items-center justify-center mx-auto border border-[#EAE3DB]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#8C7A6B] font-bold">Your Spatial Identity</h3>
              <h2 className="text-3xl font-serif text-[#241815] font-light">{result.title}</h2>
              <p className="text-xs tracking-wider uppercase font-serif text-[#C5A880] font-bold">{result.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column: Result description and dynamic palette */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-serif font-semibold text-lg text-[#241815]">Design Ethos</h4>
                  <p className="text-xs text-[#8C7A6B] leading-relaxed">
                    {result.description}
                  </p>
                </div>

                {/* Color Palette */}
                <div className="space-y-3">
                  <h4 className="font-serif font-semibold text-xs text-[#241815] uppercase tracking-[0.15em]">Coded Material Palette</h4>
                  <div className="grid grid-cols-5 gap-3">
                    {result.palette.map((color, idx) => (
                      <div key={idx} className="space-y-2 text-center">
                        <div 
                          className="h-12 w-full rounded-lg border border-[#EAE3DB] shadow-inner"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[9px] block text-[#8C7A6B] truncate leading-none font-bold uppercase tracking-wider">
                          {result.paletteNames[idx]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={resetQuiz}
                  className="flex items-center gap-2 text-xs text-[#8C7A6B] hover:text-[#241815] font-bold uppercase tracking-wider transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake style quiz</span>
                </button>
              </div>

              {/* Right Column: Recommended Portfolios & Quick Consultation Booking */}
              <div className="space-y-6 bg-white border border-[#EAE3DB] p-6 rounded-xl shadow-md">
                <div>
                  <h4 className="font-serif font-semibold text-base text-[#241815] mb-3">Matching Studio Project</h4>
                  <div className="space-y-3">
                    {PROJECTS.filter(p => result.recommendedProjectIds.includes(p.id)).map((proj) => (
                      <div key={proj.id} className="flex gap-4 bg-[#FAF8F6] p-2.5 rounded-lg border border-[#EAE3DB] items-center">
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          className="w-14 h-14 object-cover rounded-md shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-wider text-[#C5A880] block font-bold">{proj.category}</span>
                          <h5 className="font-serif text-xs font-semibold text-[#241815] truncate">{proj.title}</h5>
                          <p className="text-[10px] text-[#8C7A6B] truncate">{proj.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro Consultation Form */}
                <div className="border-t border-[#EAE3DB] pt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-serif text-sm font-semibold text-[#241815]">Book Style Consultation</h5>
                      <p className="text-[10px] text-[#8C7A6B] mt-1 leading-relaxed">
                        Reserve a 30-minute workspace design preview in Karachi based on your <strong>{result.title}</strong> results.
                      </p>
                    </div>
                  </div>

                  {!isBooked ? (
                    <form onSubmit={handleBookingSubmit} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          required
                          placeholder="Your Name"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="bg-[#FAF8F6] border border-[#EAE3DB] focus:border-[#C5A880] rounded-lg p-3 text-xs text-[#241815] font-semibold outline-none transition-colors"
                        />
                        <input 
                          type="tel" 
                          required
                          placeholder="WhatsApp / Phone"
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          className="bg-[#FAF8F6] border border-[#EAE3DB] focus:border-[#C5A880] rounded-lg p-3 text-xs text-[#241815] font-semibold outline-none transition-colors"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#241815] hover:bg-[#1C1311] text-[#FAF8F5] text-[10px] font-bold py-3 px-4 rounded-lg uppercase tracking-[0.15em] transition-all"
                      >
                        Secure Priority Call
                      </button>
                    </form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-lg p-4 text-center space-y-2 shadow-sm"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                      <h5 className="font-serif text-xs font-semibold text-emerald-950">Inquiry Logged Successfully!</h5>
                      <p className="text-[10px] text-emerald-800 leading-relaxed">
                        We have logged your preference for <strong>{result.title}</strong>. Our senior consultant will call <strong>{bookingPhone}</strong> within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
