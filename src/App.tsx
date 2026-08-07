import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Star, 
  Award, 
  Compass, 
  Sliders, 
  Calculator, 
  Home, 
  Briefcase, 
  Grid, 
  ChevronRight, 
  ExternalLink, 
  MessageSquare, 
  MessageCircle,
  Clock, 
  ArrowUpRight, 
  Sparkles,
  Layers,
  Map,
  Check,
  Building,
  Menu,
  X,
  Maximize2,
  Eye
} from 'lucide-react';

import { STUDIO_INFO, PROJECTS, REVIEWS } from './data';
import GradualBlur from './components/GradualBlur';
import ImageTrail from './components/ImageTrail';
import FluidCursorTrail from './components/FluidCursorTrail';
import ImageLightboxModal, { LightboxItem } from './components/ImageLightboxModal';

import HeroSlider from './components/HeroSlider';
import WhyChooseUs from './components/WhyChooseUs';
import ProcessWorkflow from './components/ProcessWorkflow';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';

export type TabType = 'home' | 'portfolio' | 'testimonials' | 'faqs' | 'about';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('faq') || hash.includes('faq')) {
        setActiveTab('faqs');
      } else if (path.includes('testimonial') || path.includes('review') || hash.includes('testimonial') || hash.includes('review')) {
        setActiveTab('testimonials');
      } else if (path.includes('portfolio') || hash.includes('portfolio')) {
        setActiveTab('portfolio');
      } else if (path.includes('about') || hash.includes('about')) {
        setActiveTab('about');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);
  const [showHeader, setShowHeader] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState<'All' | 'Residential' | 'Commercial' | 'Office'>('All');
  const [contactFormSubmitted, setContactFormSubmitted] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');
  const catalogRef = useRef<HTMLDivElement>(null);
  const headerTrailRef = useRef<HTMLDivElement>(null);

  // Lightbox Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([]);

  const openLightbox = (items: LightboxItem[], index: number) => {
    setLightboxItems(items);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const PROJECT_LIGHTBOX_ITEMS: LightboxItem[] = PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    image: p.image,
    beforeImage: p.beforeImage,
    category: p.category,
    location: p.location,
    year: p.year,
    description: p.description,
    specs: p.specs,
    highlights: p.highlights
  }));

  const SERVICE_LIGHTBOX_ITEMS: LightboxItem[] = [
    {
      id: 'walnut-fab',
      title: 'In-house Walnut Fabrication',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200',
      category: 'Craftsmanship',
      location: 'Karachi Joinery Workshop',
      description: 'Custom kitchen cabinets, fluted wall screens, and hydraulic bed modules are manufactured under strict timber-humidity monitoring.',
      meta: 'Smoked Veneers • Solid Polish',
      specs: {
        style: 'Solid Polish & Veneer',
        materials: ['Smoked Walnut', 'Moisture-proof MDF', 'Polyurethane Polish']
      }
    },
    {
      id: 'travertine-sourcing',
      title: 'Travertine & Quartz Sourcing',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200',
      category: 'Material Sourcing',
      location: 'Imported Natural Stone',
      description: 'Direct import of architectural limestone, custom travertine fireplaces, and seamless quartz countertops routed beautifully for Clifton & DHA villas.',
      meta: 'Natural Slabs • Smooth Veining',
      specs: {
        style: 'Architectural Stone',
        materials: ['Natural Travertine', 'Quartz Countertops', 'Polished Limestone']
      }
    },
    {
      id: 'turnkey-orchestration',
      title: 'Turnkey Site Orchestration',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
      category: 'Site Execution',
      location: 'On-Site Coordination',
      description: 'We coordinate site supervisors, structural joinery installation, custom electrical routing, ceiling painting, and finishing labor.',
      meta: 'Hassle-free • Direct Execution',
      specs: {
        style: 'Full Turnkey Management',
        materials: ['Structural Steel', 'Hettich Hardware', 'Custom Electrical']
      }
    },
    {
      id: 'architectural-lighting',
      title: 'Architectural Ambient Lighting',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
      category: 'Illumination',
      location: 'Custom Ceiling & Fluting',
      description: 'Precision cove lighting, magnetic track lights, dimmable warm architectural LEDs, and integrated acoustic wooden slat ceilings.',
      meta: '2700K Warm LEDs • Custom Tracks',
      specs: {
        style: 'Integrated Illumination',
        materials: ['2700K Linear LEDs', 'Magnetic Tracks', 'Acoustic Oak Slats']
      }
    }
  ];

  const SHOWROOM_LIGHTBOX_ITEM: LightboxItem = {
    id: 'gulshan-showroom',
    title: 'Al-Hammad In-House Manufacturing & Showroom',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    category: 'Workshop & Showroom',
    location: 'Block 13D-1, Gulshan-e-Iqbal, Karachi',
    description: 'Our physical showroom and manufacturing facility in Gulshan-e-Iqbal. Clients can visit to inspect live timber samples, hardware fittings, lacquer polish finishes, and custom joinery mockups.',
    meta: 'Gulshan Showroom',
    specs: {
      area: 'In-House Facility',
      style: 'Live Material Samples',
      materials: ['Solid Wood', 'Veneers', 'Glass', 'Metal Trim']
    }
  };

  // Filter reviews: keep only 4-5 stars, and exclude any reviewer with first or last name 'hammad' (case-insensitive)
  const filteredReviews = REVIEWS.filter(rev => {
    // Keep only 4 and 5-star reviews
    if (rev.rating < 4) return false;
    
    // Check if any word in the name is 'hammad' (first name, last name, etc.)
    const nameLower = rev.author.toLowerCase();
    const words = nameLower.split(/[\s,.\-_()]+/);
    if (words.includes('hammad')) return false;
    
    return true;
  });
  
  const lenisRef = useRef<Lenis | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // If scrolled down past 50px AND scrolling DOWN -> Hide
    if (latest > previous && latest > 50) {
      setShowHeader(false);
    } 
    // If scrolling UP -> Show immediately
    else if (latest < previous) {
      setShowHeader(true);
    }
  });

  const scrollToTop = () => {
    setShowHeader(true);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', (e: any) => {
      const currentY = typeof e.scroll === 'number' ? e.scroll : window.scrollY;
      if (currentY <= 50) {
        setShowHeader(true);
      } else if (e.direction === 1) {
        setShowHeader(false);
      } else if (e.direction === -1) {
        setShowHeader(true);
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Sync scroll to top on tab change and listen to location changes
  useEffect(() => {
    scrollToTop();
    const t1 = setTimeout(() => scrollToTop(), 50);
    const t2 = setTimeout(() => scrollToTop(), 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeTab]);

  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/portfolio' || hash === '#portfolio') {
        setActiveTab('portfolio');
      } else if (path === '/about' || hash === '#about') {
        setActiveTab('about');
      } else if (path === '/' || path === '') {
        setActiveTab('home');
      }
    };
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;
    setContactFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2B1A14] selection:bg-[#422A1E] selection:text-[#FAF6F0] relative overflow-hidden font-sans">
      
      {/* Dynamic WebGL Fluid Cursor Trail */}
      <FluidCursorTrail />
      
      {/* BACKGROUND GRAPHICS & BLUR PATTERNS */}
      <div className="absolute top-0 inset-x-0 h-[1000px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-250px] left-[-200px] w-[700px] h-[700px] rounded-full bg-[#E5D2C7]/15 blur-[140px]" />
        <div className="absolute top-[350px] right-[-300px] w-[800px] h-[800px] rounded-full bg-[#8D6E63]/8 blur-[160px]" />
      </div>

      {/* GRADUAL BLUR OVERLAY FOR BOTTOM VIEWPORT FLUIDITY */}
      <GradualBlur 
        position="bottom"
        strength={3}
        height="6rem"
        divCount={7}
        curve="bezier"
        target="page"
        zIndex={40}
        className="pointer-events-none"
      />

      {/* FLOATING HEADER NAVIGATION */}
      <motion.header 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        initial="visible"
        animate={showHeader ? "visible" : "hidden"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#EBE3DB] shadow-sm w-full"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 md:py-3 space-y-2">
          
          {/* Header Row: Logo & Quick CTAs */}
          <div className="flex flex-row justify-between items-center gap-4">
            {/* Brand Logo Info */}
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none group shrink-0"
            >
              <img 
                src="https://i.postimg.cc/qqxT1nHB/logo.webp" 
                alt="Al-Hammad Interiors Logo" 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-hand text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#2B1A14] transition-colors group-hover:text-[#8D6E63]">
                  Al-Hammad
                </span>
                <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.3em] text-[#8D6E63] block font-bold font-sans">
                  Interiors & Architecture
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2">
              {[
                { id: 'home', label: 'Explore' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'testimonials', label: 'Testimonials' },
                { id: 'faqs', label: 'FAQs' },
                { id: 'about', label: 'About' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`relative py-2 px-4 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-[#24140E] text-[#FAF6F0] border border-[#3D2318]/50 shadow-[0_10px_20px_-4px_rgba(24,12,6,0.45),_inset_0_2.5px_4px_rgba(255,255,255,0.32),_inset_0_-4.5px_9px_rgba(0,0,0,0.75)]' 
                        : 'text-[#8D6E63] hover:text-[#2B1A14] hover:bg-[#FAF6F0] shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.6),_inset_0_-2px_4px_rgba(180,150,130,0.15)]'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Action Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Al-Hammad Interiors! I would like to request a consultation for my space.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#24140E] hover:bg-[#341e14] text-[#FAF6F0] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 border border-[#3D2318]/50 shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden sm:inline">Consultation</span>
                <span className="sm:hidden">Consult</span>
              </a>
            </div>
          </div>

          {/* Mobile Navigation Tabs Bar (Visible on mobile/tablet) */}
          <div className="flex md:hidden overflow-x-auto no-scrollbar pt-1 pb-1 -mx-2 px-2 items-center gap-1.5 border-t border-[#EBE3DB]/60">
            {[
              { id: 'home', label: 'Explore' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'faqs', label: 'FAQs' },
              { id: 'about', label: 'About' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-1.5 px-3 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'bg-[#24140E] text-[#FAF6F0] border border-[#3D2318]/50 shadow-sm' 
                      : 'bg-white text-[#8D6E63] border border-[#EBE3DB]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>
      </motion.header>

      {/* MASTER CONTENT AREA WITH SMOOTH COMPONENT TRANSITIONS */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-16 z-10 relative">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: IMMERSIVE EXPLORE PAGE */}
          {activeTab === 'home' && (
            <motion.div
              key="explore-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-16 md:space-y-24"
            >
              {/* TOP BANNER / HERO SLIDER */}
              <HeroSlider onOpenLightbox={openLightbox} />

              {/* HERO BLOCK: Elegant, oversized handwritten branding with action pills */}
              <div className="text-center max-w-4xl mx-auto space-y-5 md:space-y-6 pt-2 md:pt-4">
                <h1 id="hero-al-hammad-text" className="font-hand text-5xl sm:text-7xl md:text-[8.5rem] text-[#2B1A14] font-bold tracking-tight leading-none break-words">
                  Al-Hammad
                </h1>
                <p className="font-sans text-xs sm:text-sm md:text-lg text-[#8D6E63] font-light max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                  Handcrafted bespoke spaces and premium modern wood finishes with a warm, welcoming atmosphere. From our first blueprint to your finished home, every detail tells a luxury story.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
                  <a 
                    href={`https://wa.me/${STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Al-Hammad Interiors! I would like to book a site survey for my project.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[48px] bg-[#24140E] hover:bg-[#341e14] text-[#FAF6F0] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 border border-[#3D2318]/50 shadow-[0_16px_32px_-6px_rgba(24,12,6,0.5),_0_6px_12px_-3px_rgba(24,12,6,0.35),_inset_0_3px_5px_rgba(255,255,255,0.3),_inset_0_-5px_10px_rgba(0,0,0,0.75)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <span>Book Site Survey</span>
                  </a>
                  <button 
                    onClick={() => setActiveTab('portfolio')}
                    className="w-full sm:w-auto min-h-[48px] bg-[#FAF6F0] hover:bg-[#F3EBE3] text-[#24140E] border border-[#EBE3DB] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-[0_12px_28px_-6px_rgba(43,26,20,0.18),_0_4px_10px_-2px_rgba(43,26,20,0.1),_inset_0_3px_5px_rgba(255,255,255,0.95),_inset_0_-4px_8px_rgba(180,150,130,0.32)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center"
                  >
                    View Portfolio
                  </button>
                </div>
              </div>

              {/* WHY CHOOSE US SECTION */}
              <WhyChooseUs />

              {/* PROCESS WORKFLOW SECTION */}
              <ProcessWorkflow />

              {/* PORTFOLIO SHOWCASE SECTION */}
              <div id="catalog-section" className="space-y-12 relative overflow-visible" ref={catalogRef}>
                <div className="text-center relative z-10 space-y-3">
                  <span className="text-xs font-bold text-[#8D6E63] uppercase tracking-[0.25em] block">Our Architectural & Interior Projects</span>
                  <h2 className="text-4xl md:text-6xl font-hand text-[#2B1A14] font-bold">Portfolio Showcase</h2>
                  <p className="text-xs md:text-sm text-[#8D6E63] font-light max-w-md mx-auto leading-relaxed">
                    Explore our showcase of bespoke architectural projects, custom joinery, and signature interior spaces.
                  </p>
                </div>

                {/* Portfolio Spaces Grid */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8">
                  {PROJECTS.slice(0, 6).map((project, index) => (
                    <div 
                      key={project.id}
                      onClick={() => openLightbox(PROJECT_LIGHTBOX_ITEMS, index)}
                      className="bg-white border border-[#EBE3DB] rounded-[20px] sm:rounded-[32px] p-2.5 sm:p-4 hover:shadow-xl transition-all duration-500 group flex flex-col justify-between cursor-pointer w-[calc((100%-12px)/2)] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-64px)/3)]"
                    >
                      <div className="space-y-2 sm:space-y-4">
                        <div className="aspect-[4/3] rounded-[14px] sm:rounded-[24px] overflow-hidden relative group/img">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white p-2 rounded-full opacity-80 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all shadow-md">
                            <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          </div>
                        </div>

                        <div className="px-1 sm:px-2 space-y-1 sm:space-y-2 text-center">
                          <h4 className="font-hand text-base sm:text-2xl text-[#2B1A14] leading-tight group-hover:text-[#8D6E63] transition-colors">{project.title}</h4>
                          <p className="text-[11px] sm:text-xs text-[#8D6E63] font-light leading-relaxed line-clamp-2 h-7 sm:h-10">{project.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className="inline-flex items-center gap-2 bg-[#24140E] hover:bg-[#341e14] text-[#FAF6F0] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 border border-[#3D2318]/50 shadow-md cursor-pointer"
                  >
                    <span>View All Projects</span>
                    <ChevronRight className="w-4 h-4 text-[#C5A880]" />
                  </button>
                </div>
              </div>

              {/* TESTIMONIALS SECTION */}
              <TestimonialsSection />

              {/* FAQS SECTION */}
              <FaqSection />

              {/* BEYOND THE BLUEPRINT SECTION */}
              <div className="space-y-12 pt-6">
                <div className="text-center space-y-3">
                  <span className="text-xs font-bold text-[#8D6E63] uppercase tracking-[0.25em] block">In-House Quality</span>
                  <h3 className="text-4xl md:text-6xl font-hand text-[#2B1A14]">Bespoke Beyond Blueprint</h3>
                  <p className="text-xs md:text-sm text-[#8D6E63] font-light max-w-md mx-auto leading-relaxed">
                    Our Karachi workshop custom crafts the core material elements that make your spaces feel deeply warm and structurally eternal.
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                  {SERVICE_LIGHTBOX_ITEMS.map((s, i) => (
                    <div 
                      key={s.id} 
                      onClick={() => openLightbox(SERVICE_LIGHTBOX_ITEMS, i)}
                      className="bg-white border border-[#EBE3DB] rounded-[20px] sm:rounded-[32px] overflow-hidden hover:shadow-xl transition-all duration-500 group flex flex-col justify-between p-2.5 sm:p-4 cursor-pointer"
                    >
                      <div className="space-y-2 sm:space-y-4">
                        <div className="aspect-[4/3] rounded-[14px] sm:rounded-[24px] overflow-hidden relative group/img">
                          <img 
                            src={s.image} 
                            alt={s.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white p-2 rounded-full opacity-80 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all shadow-md">
                            <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          </div>
                        </div>
                        <div className="px-1 sm:px-2 space-y-1 sm:space-y-2">
                          <h4 className="font-hand text-base sm:text-2xl text-[#2B1A14] group-hover:text-[#8D6E63] transition-colors">{s.title}</h4>
                          <p className="text-[11px] sm:text-xs text-[#8D6E63] font-light leading-relaxed line-clamp-3">{s.description}</p>
                        </div>
                      </div>
                      <div className="pt-2 sm:pt-4 px-0.5 sm:px-2 pb-1 sm:pb-2">
                        <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#C5A880] bg-[#2B1A14] py-2 sm:py-3.5 rounded-[14px] sm:rounded-[18px] font-bold block text-center truncate">
                          {s.meta}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: PORTFOLIO SHOWCASE PAGE */}
          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-bold text-[#8D6E63] uppercase tracking-[0.25em] block">Our Accomplishments</span>
                <h2 className="text-4xl md:text-6xl font-hand text-[#2B1A14]">Portfolio Showcase</h2>
                <p className="text-xs md:text-sm text-[#8D6E63] leading-relaxed font-light">
                  Explore our collection of bespoke architectural specifications, custom joinery, and signature interior projects crafted across Karachi.
                </p>
              </div>

              {/* Static Grid showcasing all specifications */}
              <div className="space-y-8">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8">
                  {PROJECTS.map((p, index) => (
                    <div 
                      key={p.id}
                      onClick={() => openLightbox(PROJECT_LIGHTBOX_ITEMS, index)}
                      className="bg-white border border-[#EBE3DB] rounded-[20px] sm:rounded-[32px] overflow-hidden hover:shadow-xl transition-all duration-500 group p-2.5 sm:p-4 flex flex-col justify-between cursor-pointer w-[calc((100%-12px)/2)] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-64px)/3)]"
                    >
                      <div className="space-y-2 sm:space-y-4">
                        <div className="aspect-[4/3] rounded-[14px] sm:rounded-[24px] overflow-hidden relative group/img">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                          <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white p-2 rounded-full opacity-80 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all shadow-md">
                            <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          </div>
                        </div>

                        <div className="p-1 sm:p-2 space-y-1 sm:space-y-2 text-center">
                          <h4 className="font-hand text-base sm:text-2xl text-[#2B1A14] leading-tight group-hover:text-[#8D6E63] transition-colors">{p.title}</h4>
                          <p className="text-[11px] sm:text-xs text-[#8D6E63] font-light leading-relaxed line-clamp-2 h-7 sm:h-10">{p.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: DEDICATED TESTIMONIALS PAGE */}
          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialsSection />
            </motion.div>
          )}

          {/* TAB 4: DEDICATED FAQS PAGE */}
          {activeTab === 'faqs' && (
            <motion.div
              key="faqs-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <FaqSection />
            </motion.div>
          )}

          {/* TAB 5: ABOUT, SHOWROOM DETAILS AND REVIEWS */}
          {activeTab === 'about' && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              
              {/* Profile Card & Info list */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-[#EBE3DB] rounded-[32px] p-6 md:p-12 shadow-xl">
                
                {/* Logo and detailed metadata */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-[#8D6E63] uppercase tracking-[0.25em] block">The Brand Heritage</span>
                    <h2 className="text-4xl md:text-5xl font-hand text-[#2B1A14] leading-tight">
                      Al-Hammad <br /><span className="italic font-normal">Interiors & Architecture</span>
                    </h2>
                    <p className="text-xs text-[#8D6E63] font-bold uppercase tracking-wider font-sans">Established {STUDIO_INFO.established} in Karachi, Pakistan</p>
                  </div>

                  <p className="text-xs text-[#8D6E63] leading-relaxed font-light">
                    Under the creative leadership of Hammad Malik, Al-Hammad Interiors has grown from a specialized wood polishing workshop into one of Gulshan-e-Iqbal's premier full-service turnkey interior and architecture firms. We combine raw spatial mathematics with exquisite modern finishes to engineer homes that tell personal stories.
                  </p>

                  {/* Complete Contacts List */}
                  <div className="space-y-4 pt-6 border-t border-[#FAF6F0]">
                    <h4 className="font-hand text-[#2B1A14] text-3xl font-bold">Official Communications</h4>
                    
                    <div className="grid grid-cols-1 gap-4 text-xs text-[#8D6E63]">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span className="font-light">{STUDIO_INFO.address}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-[#2B1A14]">{STUDIO_INFO.phone} (WhatsApp/Primary)</span>
                          <span className="block text-[10px] text-[#8D6E63] mt-1 font-light">Alt: {STUDIO_INFO.landline} | Mobile: {STUDIO_INFO.altPhone}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span className="font-light">{STUDIO_INFO.email}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span className="font-bold text-[#2B1A14] uppercase tracking-wider text-[10px] bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#EBE3DB]">{STUDIO_INFO.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Handles */}
                  <div className="flex gap-3 pt-4">
                    <a 
                      href="https://www.facebook.com/alhammadinteriors/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3.5 bg-[#FAF6F0] hover:bg-[#2B1A14] hover:text-[#FAF6F0] text-[#2B1A14] rounded-full transition-all duration-300 border border-[#EBE3DB] flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-sans"
                    >
                      <Facebook className="w-4 h-4" />
                      <span>Facebook</span>
                    </a>
                    <a 
                      href="https://www.instagram.com/al_hammad_interior/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3.5 bg-[#FAF6F0] hover:bg-[#2B1A14] hover:text-[#FAF6F0] text-[#2B1A14] rounded-full transition-all duration-300 border border-[#EBE3DB] flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-sans"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>

                {/* Simulated Google Reviews layout */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-[#FAF6F0] rounded-[24px] p-6 md:p-8 border border-[#EBE3DB] space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-[#EBE3DB]">
                      <div>
                        <h4 className="font-hand text-[#2B1A14] text-3xl font-bold">
                          Google Reviews
                        </h4>
                        <span className="text-xs text-[#8D6E63] font-light">Directly from our Al-Hammad Google Profile</span>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-[#2B1A14] text-[#FAF6F0] px-4 py-2 rounded-full text-xs font-bold font-sans">
                        <Star className="w-3.5 h-3.5 text-[#C5A880] fill-current" />
                        <span>{STUDIO_INFO.rating} Out of 5</span>
                      </div>
                    </div>

                    {/* Reviews List in continuous looping marquee */}
                    <div className="relative h-[340px] overflow-hidden select-none">
                      {/* Fade gradients for visual depth */}
                      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#FAF6F0] to-transparent z-10 pointer-events-none" />
                      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#FAF6F0] to-transparent z-10 pointer-events-none" />
                      
                      <div className="flex flex-col gap-4 animate-marquee-up py-4">
                        {/* First set of filtered reviews */}
                        {filteredReviews.map((rev, i) => (
                          <div key={`c1-${i}`} className="bg-white p-5 rounded-[24px] border border-[#EBE3DB] space-y-3 shadow-sm hover:border-[#8D6E63]/30 transition-colors">
                            <div className="flex justify-between text-xs font-bold text-[#2B1A14] font-sans">
                              <span>{rev.author}</span>
                              <span className="text-[#8D6E63] font-normal">{rev.relativeTime}</span>
                            </div>
                            <div className="flex text-[#C5A880]">
                              {[...Array(rev.rating)].map((_, idx) => (
                                <Star key={idx} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                            <p className="text-xs text-[#8D6E63] leading-relaxed italic font-light">
                              "{rev.text}"
                            </p>
                          </div>
                        ))}
                        {/* Duplicate set of filtered reviews to enable perfect, seamless looping */}
                        {filteredReviews.map((rev, i) => (
                          <div key={`c2-${i}`} className="bg-white p-5 rounded-[24px] border border-[#EBE3DB] space-y-3 shadow-sm hover:border-[#8D6E63]/30 transition-colors">
                            <div className="flex justify-between text-xs font-bold text-[#2B1A14] font-sans">
                              <span>{rev.author}</span>
                              <span className="text-[#8D6E63] font-normal">{rev.relativeTime}</span>
                            </div>
                            <div className="flex text-[#C5A880]">
                              {[...Array(rev.rating)].map((_, idx) => (
                                <Star key={idx} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                            <p className="text-xs text-[#8D6E63] leading-relaxed italic font-light">
                              "{rev.text}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* SPEAK WITH ONE OF OUR EXPERTS (DYNAMIC HOTLINES ROW) */}
          <div className="py-16 text-center space-y-10 border-t border-[#EBE3DB] mt-20">
              <div className="space-y-3">
                <h3 className="text-4xl md:text-5xl font-hand text-[#2B1A14]">Speak with one of our experts</h3>
                <p className="text-xs md:text-sm text-[#8D6E63] font-light max-w-md mx-auto leading-relaxed font-sans">
                  Connect directly with our master woodsmiths, project schedulers, or senior designers in Karachi.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 pt-4">
                {/* WhatsApp Chat Circle */}
                <a 
                  href={`https://wa.me/${STUDIO_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group font-sans cursor-pointer"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#24140E] text-white flex items-center justify-center border border-[#3D2318]/50 shadow-[0_24px_48px_-8px_rgba(20,10,5,0.6),_0_8px_16px_-4px_rgba(20,10,5,0.4),_inset_0_4px_8px_rgba(255,255,255,0.38),_inset_0_-8px_16px_rgba(0,0,0,0.85)] group-hover:-translate-y-1 group-hover:shadow-[0_32px_64px_-8px_rgba(20,10,5,0.7),_0_12px_24px_-4px_rgba(20,10,5,0.5),_inset_0_5px_10px_rgba(255,255,255,0.5),_inset_0_-10px_20px_rgba(0,0,0,0.9)] active:translate-y-0.5 transition-all duration-300">
                    <MessageCircle className="w-10 h-10 md:w-12 md:h-12 text-white stroke-[1.5]" />
                  </div>
                  <span className="text-base md:text-lg font-normal text-[#7E6357] mt-3.5 block group-hover:text-[#2B1A14] transition-colors">Whatsapp</span>
                </a>

                {/* Email Inquiries Circle */}
                <a 
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="flex flex-col items-center group font-sans cursor-pointer"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#24140E] text-white flex items-center justify-center border border-[#3D2318]/50 shadow-[0_24px_48px_-8px_rgba(20,10,5,0.6),_0_8px_16px_-4px_rgba(20,10,5,0.4),_inset_0_4px_8px_rgba(255,255,255,0.38),_inset_0_-8px_16px_rgba(0,0,0,0.85)] group-hover:-translate-y-1 group-hover:shadow-[0_32px_64px_-8px_rgba(20,10,5,0.7),_0_12px_24px_-4px_rgba(20,10,5,0.5),_inset_0_5px_10px_rgba(255,255,255,0.5),_inset_0_-10px_20px_rgba(0,0,0,0.9)] active:translate-y-0.5 transition-all duration-300">
                    <Mail className="w-10 h-10 md:w-12 md:h-12 text-white stroke-[1.5]" />
                  </div>
                  <span className="text-base md:text-lg font-normal text-[#7E6357] mt-3.5 block group-hover:text-[#2B1A14] transition-colors">Email</span>
                </a>

                {/* Direct Call / Phone Circle */}
                <a 
                  href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex flex-col items-center group font-sans cursor-pointer"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#24140E] text-white flex items-center justify-center border border-[#3D2318]/50 shadow-[0_24px_48px_-8px_rgba(20,10,5,0.6),_0_8px_16px_-4px_rgba(20,10,5,0.4),_inset_0_4px_8px_rgba(255,255,255,0.38),_inset_0_-8px_16px_rgba(0,0,0,0.85)] group-hover:-translate-y-1 group-hover:shadow-[0_32px_64px_-8px_rgba(20,10,5,0.7),_0_12px_24px_-4px_rgba(20,10,5,0.5),_inset_0_5px_10px_rgba(255,255,255,0.5),_inset_0_-10px_20px_rgba(0,0,0,0.9)] active:translate-y-0.5 transition-all duration-300">
                    <Phone className="w-10 h-10 md:w-12 md:h-12 text-white stroke-[1.5]" />
                  </div>
                  <span className="text-base md:text-lg font-normal text-[#7E6357] mt-3.5 block group-hover:text-[#2B1A14] transition-colors">Number</span>
                </a>
              </div>
            </div>

        </AnimatePresence>
      </main>

      {/* FOOTER AREA */}
      <footer className="bg-[#2B1A14] text-stone-300 border-t border-[#422A1E] relative z-10 font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 relative z-10">
          
          {/* Logo & Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-left">
              <img 
                src="https://i.postimg.cc/qqxT1nHB/logo.webp" 
                alt="Al-Hammad Interiors Logo" 
                className="h-14 md:h-16 w-auto object-contain drop-shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-white">
                  Al-Hammad
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880] block mt-0.5 font-bold">
                  Interiors & Architecture
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Designing bespoke interior ecosystems radiating luxury warm-wood aesthetics. Complete turnkey execution across DHA, Clifton, Gulshan, and PECHS in Karachi.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880]">Navigation</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <button onClick={() => { setActiveTab('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#C5A880] text-stone-300 transition-colors cursor-pointer text-left">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#C5A880] text-stone-300 transition-colors cursor-pointer text-left">
                  About Us & Showroom
                </button>
              </li>
              <li>
                <button onClick={() => { const el = document.getElementById('contact-booking-form'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#C5A880] text-stone-300 transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Gulshan Showroom */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880]">Gulshan Showroom</h4>
            <p className="text-xs text-stone-400 leading-relaxed font-light font-sans">
              {STUDIO_INFO.address}
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#C5A880] bg-[#3B2319] border border-[#523326] px-3 py-1 rounded-full">
                {STUDIO_INFO.status}
              </span>
            </div>
          </div>

          {/* Direct Hotlines & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880]">Get In Touch</h4>
            <div className="text-xs space-y-2.5 font-light">
              <a 
                href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`} 
                className="flex items-center gap-2 text-stone-300 hover:text-[#C5A880] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span>{STUDIO_INFO.phone}</span>
              </a>
              <a 
                href={`https://wa.me/${STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Al-Hammad Interiors! I would like to inquire about a project.")}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-300 hover:text-[#C5A880] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: {STUDIO_INFO.whatsapp}</span>
              </a>
              <a 
                href={`mailto:${STUDIO_INFO.email}`} 
                className="flex items-center gap-2 text-stone-300 hover:text-[#C5A880] transition-colors truncate"
              >
                <Mail className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span className="truncate">{STUDIO_INFO.email}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Ambient Brand Marquee Text */}
        <div className="relative w-full overflow-hidden select-none pointer-events-none opacity-[0.03] py-2">
          <span className="font-serif text-[6rem] sm:text-[10rem] md:text-[14rem] font-bold text-white tracking-tighter leading-none block text-center whitespace-nowrap">
            Al-Hammad
          </span>
        </div>

        {/* Copyright & Social Strip */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-400 gap-4 relative z-10">
          <span>&copy; {new Date().getFullYear()} Al-Hammad Interiors & Architecture. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a 
              href="https://www.facebook.com/alhammadinteriors/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#C5A880] transition-colors"
            >
              Facebook
            </a>
            <a 
              href="https://www.instagram.com/al_hammad_interior/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#C5A880] transition-colors"
            >
              Instagram
            </a>
            <a 
              href={`https://wa.me/${STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-400 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* Universal Image Lightbox Popup View */}
      <ImageLightboxModal 
        isOpen={lightboxOpen} 
        currentIndex={lightboxIndex} 
        items={lightboxItems} 
        onClose={() => setLightboxOpen(false)} 
        onNavigate={(idx) => setLightboxIndex(idx)} 
        onInquire={(item) => {
          setContactMsg(`Hi Al-Hammad team! I am inquiring about "${item.title}". Please contact me back!`);
          const el = document.getElementById('contact-booking-form');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

    </div>
  );
}
