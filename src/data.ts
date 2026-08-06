import { Project, MaterialTexture, QuizQuestion, Review, HeroSlide, FaqItem, ProcessStep, WhyChooseUsItem } from './types';

export const STUDIO_INFO = {
  name: "Al-Hammad Interiors & Architecture",
  tagline: "Immersive Spaces. Masterful Craftsmanship.",
  established: "2012",
  rating: 4.3,
  reviewCount: 109,
  phone: "0302 8212429",
  whatsapp: "+923028212429",
  landline: "021 36975566",
  altPhone: "0312 8939969",
  email: "hammadinteriors@gmail.com",
  address: "Showroom # R-69, Railway Housing Society Project, Block 13D-1, Gulshan-e-Iqbal, Karachi 75300, Pakistan",
  coords: { lat: 24.9142, lng: 67.0822 },
  status: "Open • Mon to Sat (11:00 AM - 9:00 PM)"
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Bespoke Warm Luxury Bedrooms",
    subtitle: "Custom Upholstery, Fluted Timber Panels & Integrated Ambient Lighting",
    tagline: "Signature Master Suite Architecture",
    location: "DHA Phase VIII, Karachi",
    image: "https://i.postimg.cc/VvY9CQYt/image.webp",
    badge: "Featured Masterwork",
    projectId: "walnut-residence"
  },
  {
    id: "slide-2",
    title: "Gold & Marble Dining Sanctuaries",
    subtitle: "Bookmatched Travertine Walls, Polished Flooring & Warm Metallic Accents",
    tagline: "High-End Entertaining Spaces",
    location: "Clifton Block 4, Karachi",
    image: "https://i.postimg.cc/yxVhZ4VJ/image-(4).webp",
    badge: "Architectural Marvel",
    projectId: "executive-lounge"
  },
  {
    id: "slide-3",
    title: "In-House Walnut Joinery & Cabinetry",
    subtitle: "Smoked Veneers, Solid Wood Polish & Soft-Close Blum Hardware",
    tagline: "Gulshan Workshop Craftsmanship",
    location: "Gulshan-e-Iqbal, Karachi",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400",
    badge: "In-House Workshop",
    projectId: "walnut-residence"
  },
  {
    id: "slide-4",
    title: "Contemporary Fluted Wall Architecture",
    subtitle: "Indirect Vertical Linear LEDs, Accent Mirrors & Custom Floating Vanity",
    tagline: "Refined Modern Elegance",
    location: "PECHS Block 6, Karachi",
    image: "https://i.postimg.cc/RhM1H5Mh/image-(6).webp",
    badge: "Trending 2025",
    projectId: "bronze-oasis-bedroom"
  }
];

export const WHY_CHOOSE_US_ITEMS: WhyChooseUsItem[] = [
  {
    id: "workshop",
    title: "In-House Gulshan Joinery Workshop",
    description: "0% middleman commission. We operate our own state-of-the-art joinery facility in Gulshan-e-Iqbal Block 13D-1, manufacturing custom walnut wardrobes, fluted wall panels, and hydraulic beds.",
    highlight: "Direct Factory Pricing",
    iconName: "Building"
  },
  {
    id: "turnkey",
    title: "Complete Turnkey Orchestration",
    description: "Single-point accountability for civil works, masonry, ceiling framework, electrical routing, plumbing, and final lacquer polish. No supervisor coordination hassle for clients.",
    highlight: "100% Hassle-Free",
    iconName: "Layers"
  },
  {
    id: "blueprints",
    title: "Photorealistic 3D Renders & Blueprints",
    description: "See exact lighting levels, material grains, and spatial circulation before moving a single brick. Every mm is measured to avoid costly on-site surprises.",
    highlight: "Exact Preview First",
    iconName: "Compass"
  },
  {
    id: "warranty",
    title: "10-Year Structural Timber Warranty",
    description: "We use moisture-resistant MDF, kiln-dried solid hardwood, and original Blum/Hettich German hardware fittings built to withstand Karachi's humid coastal climate.",
    highlight: "10-Year Guarantee",
    iconName: "Award"
  },
  {
    id: "boq",
    title: "Transparent PKR Pricing & BOQ",
    description: "Detailed itemized Bill of Quantities with zero hidden fees. Fixed contract pricing ensures your budget stays 100% protected throughout execution.",
    highlight: "No Budget Surprises",
    iconName: "Calculator"
  },
  {
    id: "experience",
    title: "14+ Years Legacy in Karachi",
    description: "Over 250+ completed luxury villa interiors and corporate offices in DHA, Clifton, PECHS, Gulshan, and KDA Scheme 1 since 2012.",
    highlight: "250+ Projects Handed Over",
    iconName: "Sparkles"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Free Site Audit & Spatial Consultation",
    subtitle: "In-Person Inspection & Client Vision Alignment",
    description: "Our senior architect visits your property in Karachi to conduct laser measuring, analyze structural layout, assess lighting orientation, and discuss your lifestyle requirements.",
    duration: "1 - 2 Days",
    deliverables: ["Site Measurement Plan", "Initial Concept Brief", "Budget Outline"],
    icon: "MapPin"
  },
  {
    step: 2,
    title: "Photorealistic 3D Renders & BOQ",
    subtitle: "High-Resolution Visuals & Itemized Costing",
    description: "We craft full 3D visual walkthroughs depicting exact timber finishes, lighting temperature, and custom furniture. We provide a comprehensive itemized Bill of Quantities (BOQ).",
    duration: "5 - 7 Days",
    deliverables: ["High-Res 3D Renders", "Material Selection Board", "Fixed Itemized BOQ"],
    icon: "Compass"
  },
  {
    step: 3,
    title: "Material Sourcing & Client Approval",
    subtitle: "Live Samples Inspection at Gulshan Showroom",
    description: "You visit our Gulshan showroom to touch and inspect live veneer cuts, natural travertine slabs, upholstery fabrics, lacquer polish samples, and German soft-close fittings.",
    duration: "2 - 3 Days",
    deliverables: ["Sample Board Signoff", "Hardware Specifications", "Project Schedule"],
    icon: "Sliders"
  },
  {
    step: 4,
    title: "In-House Workshop Fabrication & On-Site Fitout",
    subtitle: "Precision Joinery & Dedicated Site Supervision",
    description: "Custom wardrobes, kitchens, and fluted screens are fabricated in our Gulshan workshop under strict humidity control, while site supervisors coordinate ceiling, electrical, and civil work.",
    duration: "3 - 8 Weeks",
    deliverables: ["Milestone Updates", "Quality Testing", "Dust-Free Installation"],
    icon: "Building"
  },
  {
    step: 5,
    title: "Final Polish, Inspection & Turnkey Handover",
    subtitle: "Deep Cleaning & 10-Year Warranty Issuance",
    description: "We conduct a detailed 50-point quality audit, fine-tune cabinet alignments, apply final lacquer touchups, perform site deep cleaning, and hand over your ready-to-move sanctuary.",
    duration: "2 - 3 Days",
    deliverables: ["50-Point Audit Signoff", "10-Year Warranty Card", "Care & Maintenance Guide"],
    icon: "Check"
  }
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    category: "Pricing & BOQ",
    question: "How do you calculate interior design costs for Karachi homes?",
    answer: "Costs are calculated based on covered area (sq. ft.) and selected finishes. Design-only consultations start at PKR 150 - 220 per sq. ft., while full turnkey fitouts (including custom joinery, ceilings, lighting, and polish) range from PKR 2,800 to PKR 4,500+ per sq. ft. depending on whether you choose solid walnut, oak veneers, or premium imported marble."
  },
  {
    id: "faq-2",
    category: "Execution & Timeline",
    question: "What is the typical completion timeline for a 3-bedroom apartment vs a villa?",
    answer: "A complete 3-bedroom apartment turnkey project in Karachi typically takes 4 to 6 weeks. Larger 500 sq yd or 1,000 sq yd luxury villas in DHA or Clifton take between 8 to 14 weeks from 3D design approval to final handover."
  },
  {
    id: "faq-3",
    category: "Workshop & Manufacturing",
    question: "Where is your joinery workshop located? Can clients visit?",
    answer: "Yes! Our in-house manufacturing workshop and showroom are located at Block 13D-1, Gulshan-e-Iqbal, Karachi. Clients are welcome to visit Monday to Saturday (11 AM to 9 PM) to see ongoing joinery manufacturing, inspect live timber samples, and verify polish quality."
  },
  {
    id: "faq-4",
    category: "Warranty & Materials",
    question: "What warranty do you provide on custom wardrobes and kitchens?",
    answer: "We provide a 10-Year Structural Timber Warranty against termites and wood warping, and honor original German Blum/Hettich lifetime replacement warranties on soft-close hardware fittings."
  },
  {
    id: "faq-5",
    category: "Design & Renders",
    question: "Do you provide 3D visual renders before starting on-site work?",
    answer: "Absolutely. Before any site work or workshop cutting begins, we present photorealistic 3D visual renders showing exact colors, textures, furniture layouts, and lighting so you can visualize your completed home with 100% confidence."
  },
  {
    id: "faq-6",
    category: "Pricing & BOQ",
    question: "Are there any hidden costs after signing the BOQ?",
    answer: "No. Our Bill of Quantities (BOQ) is fixed and transparent. Unless you explicitly request a scope change or upgraded material mid-project, the price agreed upon at signing is the exact price you pay."
  },
  {
    id: "faq-7",
    category: "Execution & Timeline",
    question: "Do you handle civil, electrical, plumbing, and ceiling works as well?",
    answer: "Yes, as a full turnkey interior design firm, we handle civil alterations, pop false ceilings, electrical rewiring, ambient LED strip channels, plumbing, tile laying, wall panelling, and final painting under a single supervisor team."
  },
  {
    id: "faq-8",
    category: "Warranty & Materials",
    question: "How do you protect wood joinery against Karachi's humid climate?",
    answer: "We use high-density moisture-resistant (HDMR) green board cores, sealed polyurethane lacquer polishes, and moisture barriers behind wall paneling to ensure zero swelling or dampness damage."
  }
];
export const PROJECTS: Project[] = [
  {
    id: "walnut-residence",
    title: "Contemporary Luxury Bedroom",
    category: "Residential",
    location: "DHA Phase VIII, Karachi",
    year: "2025",
    description: "This elegantly designed master bedroom exudes contemporary luxury, blending a serene, warm neutral color palette with sophisticated, clean-lined furnishings. A plush upholstered platform bed styled with chocolate brown and crisp white linens serves as the focal point, complemented by a pair of curved grey velvet armchairs and a sleek dark glass coffee table resting on a textured, marble-patterned rug. The seamless integration of glass-fronted wardrobes and soft wall paneling enhances the spacious, upscale ambiance of the room.",
    image: "https://i.postimg.cc/VvY9CQYt/image.webp",
    beforeImage: "https://i.postimg.cc/sxVPhdVZ/image-(1).webp",
    specs: {
      area: "4,500 sft",
      style: "Contemporary Luxury",
      duration: "16 Weeks",
      materials: ["Warm Neutrals", "Velvet Fabric", "Glass Wardrobes", "Polished Wood"]
    },
    highlights: [
      "Plush upholstered low-profile platform bed",
      "Curved grey velvet barrel-back accent armchairs",
      "Glass-fronted built-in wardrobes with interior lighting",
      "Textured marble-patterned area rug on herringbone floor"
    ]
  },
  {
    id: "gourmet-kitchen",
    title: "Sophisticated Accent Bedroom",
    category: "Residential",
    location: "Clifton Block 4, Karachi",
    year: "2025",
    description: "This elegant bedroom showcases a warm, sophisticated palette of cream, taupe, and beige, anchored by a custom wall-mounted headboard featuring vertical paneling and polished rose gold metallic inserts. Floating nightstands with luxurious marble tops frame the plush, textured bed to maximize visual floor space. Soft, floor-to-ceiling pleated drapery and a subtly patterned area rug complete the serene, high-end sanctuary.",
    image: "https://i.postimg.cc/mkb3Hfbz/image-(2).webp",
    beforeImage: "https://i.postimg.cc/3NKjv5K0/image-(3).webp",
    specs: {
      area: "450 sft",
      style: "Warm Sophisticated",
      duration: "6 Weeks",
      materials: ["Rose Gold Metal", "Marble Tops", "Pleated Drapery", "Textured Linens"]
    },
    highlights: [
      "Custom wall paneling with rose gold inlays",
      "Floating nightstands with premium marble tops",
      "Layered neutral bedding with rich textures",
      "Floor-to-ceiling pleated drapery panels"
    ]
  },
  {
    id: "executive-lounge",
    title: "Gold & Marble Dining Room",
    category: "Residential",
    location: "Shahrah-e-Faisal, Karachi",
    year: "2024",
    description: "This sophisticated dining space exudes modern luxury, anchored by a striking bookmatched marble feature wall and seamless polished marble flooring. A sleek gold-finished dining table is paired with elegantly curved, textured cream chairs featuring matching metallic legs. Tall, flowing drapery and a neutral color palette create a warm, grand, and inviting atmosphere perfect for upscale entertaining.",
    image: "https://i.postimg.cc/yxVhZ4VJ/image-(4).webp",
    beforeImage: "https://i.postimg.cc/j2s670sL/image-(5).webp",
    specs: {
      area: "3,200 sft",
      style: "Modern Dining Luxury",
      duration: "10 Weeks",
      materials: ["Bookmatched Marble", "Gold Finish", "Cream Upholstery", "Polished Flooring"]
    },
    highlights: [
      "Dramatic bookmatched marble accent wall",
      "Sleek dining table with polished gold-finished base",
      "Textured curved cream dining armchairs",
      "Seamless polished marble tile flooring"
    ]
  },
  {
    id: "bronze-oasis-bedroom",
    title: "Modern Fluted Bedroom",
    category: "Residential",
    location: "Gulshan-e-Iqbal, Karachi",
    year: "2025",
    description: "This luxurious contemporary bedroom showcases a sophisticated balance of textures, featuring a plush cream upholstered bed set against an elegant feature wall composed of dark fluted panels and organic line art. Warm, indirect lighting from vertical LED strips, modern gold pendants, and a backlit vanity mirror creates an inviting, serene atmosphere. The space is completed with stylish matching nightstands, a large textured area rug, and a chic round coffee table with brass accents in the foreground.",
    image: "https://i.postimg.cc/RhM1H5Mh/image-(6).webp",
    beforeImage: "https://i.postimg.cc/MHW0Q2WX/image-(7).webp",
    specs: {
      area: "650 sft",
      style: "Contemporary Master Suite",
      duration: "5 Weeks",
      materials: ["Dark Fluted Wood", "Cream Velvet", "Gold Pendants", "Brass Accents"]
    },
    highlights: [
      "Symmetrical dark fluted wall panels with integrated LED lighting",
      "Minimalist organic black line art headboard feature wall",
      "Modern gold pendant lights and matching off-white nightstands",
      "Plush cream upholstered bed frame with luxury neutral bedding"
    ]
  },
  {
    id: "commercial-showroom",
    title: "Organic Nested Coffee Tables",
    category: "Residential",
    location: "Railway Society, Karachi",
    year: "2026",
    description: "This sophisticated living room setup features a pair of organic-shaped nested coffee tables, combining a warm walnut wood surface and a clean white top framed in sleek dark upholstered bases. Resting on a plush, textured abstract-patterned beige rug, the tables are elegantly styled with a decorative wooden tray, a reed diffuser, and a minimalist book stand. In the background, a low-profile floating media console and a soft cream sofa complete the warm, harmonious, and highly refined contemporary atmosphere.",
    image: "https://i.postimg.cc/wM65m86v/image-(8).webp",
    beforeImage: "https://i.postimg.cc/Fz9bL59H/image-(9).webp",
    specs: {
      area: "1,800 sft",
      style: "Organic Modern Living",
      duration: "8 Weeks",
      materials: ["Walnut Wood", "Abstract Pattern Rug", "Upholstered Bases", "Beige Linens"]
    },
    highlights: [
      "Organic-shaped nested coffee tables",
      "Textured abstract-patterned area rug",
      "Low-profile floating walnut media console",
      "Warm neutral color palette with rich wood tones"
    ]
  },
  {
    id: "bespoke-living-lounge",
    title: "Moody Fluted Wood Dining Room",
    category: "Residential",
    location: "Navy Housing Scheme, Karachi",
    year: "2025",
    description: "This sophisticated dining room features a striking accent wall of vertical fluted wood paneling that frames a surrealist portrait, setting a moody and artistic tone. At its center, a polished marble-topped dining table is surrounded by elegant curved dining chairs upholstered in taupe and cream, illuminated by warm recessed and cove lighting. A dramatic black marble accent wall with a sleek console table and round mirror adds depth, completing the luxurious, high-end atmosphere.",
    image: "https://i.postimg.cc/nzKYrctD/image-(10).webp",
    beforeImage: "https://i.postimg.cc/MHW0Q2WX/image-(11).webp",
    specs: {
      area: "2,200 sft",
      style: "Moody Contemporary Dining",
      duration: "12 Weeks",
      materials: ["Fluted Wood", "Polished Marble", "Black Marble", "Taupe Velvet"]
    },
    highlights: [
      "Striking vertical fluted wood accent paneling",
      "Polished marble-topped designer dining table",
      "Curved velvet dining chairs in cream and taupe",
      "Dramatic black marble wall with integrated console"
    ]
  },
  {
    id: "arch-villa-dining",
    title: "Olive & Walnut Master Suite",
    category: "Residential",
    location: "PECHS Block 6, Karachi",
    year: "2025",
    description: "This luxurious master bedroom seamlessly integrates a plush sleeping area with a sophisticated lounge zone, creating an atmosphere of refined comfort. Earthy olive green upholstery and rich walnut wall paneling are balanced by a striking geometric accent wall and elegant herringbone hardwood floors. Warm recessed lighting, designer table lamps, and a marble-based side table add a layer of polished, upscale texture to the space.",
    image: "https://i.postimg.cc/W3m6zbPq/image-(12).webp",
    beforeImage: "https://i.postimg.cc/0jcYGWQd/image-(13).webp",
    specs: {
      area: "1,200 sft",
      style: "Earthy Contemporary Suite",
      duration: "9 Weeks",
      materials: ["Walnut Wood", "Herringbone Hardwood", "Olive Velvet", "Geometric Wallcover"]
    },
    highlights: [
      "Warm herringbone hardwood floor layout",
      "Geometric patterned feature wall behind headboard",
      "Integrated low-profile channel-tufted bed bench",
      "Cohesive modern lounge seating with designer lamps"
    ]
  },
  {
    id: "executive-suite",
    title: "Earth-Toned Master Bedroom",
    category: "Residential",
    location: "Emaar Oceanfront, Karachi",
    year: "2026",
    description: "This elegant master bedroom showcases a sophisticated palette of olive green, warm walnut paneling, and rich herringbone wood flooring. Soft, indirect cove lighting combines with stylish abstract-patterned table lamps to cast a warm, inviting glow across the cohesive layout, which features a plush upholstered bed and coordinating end bench. The harmonious blend of textures, from the vertical fluted wall accents to the layered drapery, establishes a serene and luxurious sanctuary.",
    image: "https://i.postimg.cc/4yB6vLdv/image-(14).webp",
    beforeImage: "https://i.postimg.cc/vT3r7qBt/image-(15).webp",
    specs: {
      area: "1,500 sft",
      style: "Earth-Toned Luxury",
      duration: "7 Weeks",
      materials: ["Walnut Paneling", "Herringbone Flooring", "Fluted Panels", "Olive Upholstery"]
    },
    highlights: [
      "Herringbone hardwood flooring layout",
      "Walnut wood paneling and fluted headboard accents",
      "Olive-toned upholstered platform bed and matching bench",
      "Indirect cove and recessed ceiling architectural lighting"
    ]
  },
  {
    id: "custom-wardrobe-suite",
    title: "Luxury Partition Wall Lounge",
    category: "Residential",
    location: "DHA Phase VI, Karachi",
    year: "2025",
    description: "This luxurious contemporary lounge features a pair of plush, velvet red armchairs set symmetrically before a stunning floor-to-ceiling open-backed partition wall that elegantly divides the space. The design highlights rich warm wood framing, marble-textured panels, and integrated LED accent lighting that bathes the display shelves and corridor baseboards in a soft, welcoming glow. Polished marble flooring, sleek dark wood doors, and curated decorative accents combine to create a sophisticated, highly refined atmosphere.",
    image: "https://i.postimg.cc/tJ23dST3/image-(16).webp",
    beforeImage: "https://i.postimg.cc/J013kV1d/image-(17).webp",
    specs: {
      area: "850 sft",
      style: "Sophisticated Partition Lounge",
      duration: "4 Weeks",
      materials: ["Warm Wood", "Polished Marble", "Velvet Fabric", "Integrated LED"]
    },
    highlights: [
      "Custom backlit floor-to-ceiling partition shelving",
      "Symmetrical plush velvet curved red armchairs",
      "Integrated warm LED accent perimeter lighting",
      "Polished marble tile flooring with rich reflections"
    ]
  },
  {
    id: "travertine-lounge",
    title: "Athletic Teen Bedroom",
    category: "Residential",
    location: "KDA Scheme 1, Karachi",
    year: "2026",
    description: "This contemporary teen bedroom seamlessly balances a playful soccer theme with a sophisticated, modern aesthetic using a refined color palette of slate blue, cool grey, and crisp white. High-end finishes define the space, from the luxurious white marble flooring and geometric-patterned area rug to the plush upholstered platform bed and matching fluted wall paneling. Ambient cove lighting illuminates a striking backlit silhouette of a soccer player on the headboard wall, casting a soft, warm glow that enhances the room's dynamic yet cozy atmosphere.",
    image: "https://i.postimg.cc/Hnp0yDp3/image-(18).webp",
    beforeImage: "https://i.postimg.cc/T1RjDMR9/image-(19).webp",
    specs: {
      area: "2,800 sft",
      style: "Athletic Sophisticated",
      duration: "11 Weeks",
      materials: ["Slate Blue Paint", "White Marble", "Fluted Paneling", "Backlit Art"]
    },
    highlights: [
      "Striking custom backlit sports silhouette wall art",
      "Integrated vertical fluted headboard accent paneling",
      "Polished white marble floor with geometric area rug",
      "Low-profile upholstered platform bed in custom fabric"
    ]
  },
  {
    id: "acoustic-timber-residence",
    title: "Opulent Marble Living Room",
    category: "Residential",
    location: "Bath Island, Karachi",
    year: "2025",
    description: "This luxurious contemporary living room features a sophisticated conversational layout anchored by plush, textured cream sofas, a distinctive houndstooth armchair, and nested brass-based coffee tables. A dramatic dark veined marble feature wall serves as a striking backdrop, beautifully complemented by warm wood paneling, rich terracotta drapery, and a large patterned area rug. Sculptural gold pendant lights and warm recessed cove lighting cast a soft, inviting glow, creating an opulent yet comfortable atmosphere.",
    image: "https://i.postimg.cc/6q9VvJ9M/image-(20).webp",
    beforeImage: "https://i.postimg.cc/XqVKCSVQ/image-(21).webp",
    specs: {
      area: "3,600 sft",
      style: "Opulent Contemporary Living",
      duration: "14 Weeks",
      materials: ["Dark Veined Marble", "Gold Finish", "Terracotta Drapery", "Houndstooth Fabric"]
    },
    highlights: [
      "Dramatic dark veined marble feature fireplace wall",
      "Sculptural gold ribbon pendant lighting installations",
      "Houndstooth pattern accent armchair and cream velvet sofas",
      "Nested coffee tables with gold-finished metallic bases"
    ]
  },
  {
    id: "fluted-vitrine-gallery",
    title: "Opulent Marble & Fluted Bedroom",
    category: "Residential",
    location: "Zamzama Commercial, Karachi",
    year: "2026",
    description: "This opulent bedroom showcases a striking bookmatched marble feature wall framed by polished brass panels, creating a dramatic and elegant focal point behind a plush, curved camel-colored headboard. The sophisticated atmosphere is enhanced by a magnificent cascading crystal chandelier, fluted wall paneling, and a reflective ceiling detail that amplifies the sense of scale and luxury. Tactile elements like the velvet upholstery, textured area rug, and contemporary furnishings blend seamlessly with warm, layered lighting to curate a cozy yet grand sanctuary.",
    image: "https://i.postimg.cc/J013kV1c/image-(22).webp",
    beforeImage: "https://i.postimg.cc/sxVPhdV4/image-(23).webp",
    specs: {
      area: "1,200 sft",
      style: "Opulent Bedchamber",
      duration: "6 Weeks",
      materials: ["Bookmatched Marble", "Polished Brass", "Crystal Chandelier", "Camel Velvet"]
    },
    highlights: [
      "Dramatic bookmatched marble feature wall behind bed",
      "Curved plush channel-tufted camel headboard",
      "Magnificent cascading crystal chandelier installation",
      "Polished vertical brass trim and fluted wall paneling"
    ]
  },
  {
    id: "sculptural-plaster-nook",
    title: "Polished Marble Dining Room",
    category: "Residential",
    location: "Askari IV, Karachi",
    year: "2025",
    description: "This sophisticated dining room seamlessly blends modern luxury with elegant design, featuring a stunning polished marble floor with contrasting borders and a sleek marble-topped dining table. Plush gray upholstered dining chairs provide comfortable seating beneath a striking branching glass-globe chandelier, while a fluted wood accent wall with integrated light strips adds depth and warmth. The space is further elevated by a large abstract painting and reflective mirrored wall panels that enhance the room's bright, open, and polished atmosphere.",
    image: "https://i.postimg.cc/fyw79nw7/image-(24).webp",
    beforeImage: "https://i.postimg.cc/2yzdZRz4/image-(25).webp",
    specs: {
      area: "950 sft",
      style: "Polished Dining Room",
      duration: "5 Weeks",
      materials: ["Polished Marble", "Fluted Wood", "Glass-Globe Chandelier", "Gray Velvet"]
    },
    highlights: [
      "Polished marble floor with inlaid geometric dark borders",
      "Branching glass-globe architectural chandelier",
      "Fluted wood feature wall with integrated LED light strips",
      "Curated custom gray upholstered dining armchairs"
    ]
  },
  {
    id: "geometric-accent-suite",
    title: "Geometric Accent Suite",
    category: "Residential",
    location: "KDA Scheme 1, Karachi",
    year: "2026",
    description: "A masterfully balanced contemporary bedroom featuring a geometric concrete-textured feature wall divided by elegant gold metal inlays. Set between dark grey fluted columns and illuminated by loop-ring brass chandeliers, this space combines organic symmetry with luxury furnishings, including a custom ribbed bedside bench and curved plush velvet seating.",
    image: "https://i.postimg.cc/TPq7KXm4/image.png",
    specs: {
      area: "850 sft",
      style: "Contemporary Luxury",
      duration: "5 Weeks",
      materials: ["Geometric Panels", "Fluted Columns", "Gold Brass Inlays", "Grey Ribbed Velvet"]
    },
    highlights: [
      "Symmetrical geometric wall with concrete textures and gold metal inlays",
      "Sculptural ribbon-like looping brass chandeliers",
      "Elegant bedside pendant light fixtures",
      "Tactile ribbed bed bench paired with a curved accent sofa"
    ]
  },
  {
    id: "classical-boiserie-suite",
    title: "Classical Boiserie Suite",
    category: "Residential",
    location: "DHA Phase VIII, Karachi",
    year: "2026",
    description: "This magnificent master bedchamber fuses neoclassical elegance with rich warm textures. Featuring custom-carved white boiserie wall moldings alongside dark chevron-grained wooden panels, the room is anchored by a massive low-profile marble-slab headboard, spectacular icicle crystal chandeliers, and a grand backlit vanity mirror.",
    image: "https://i.postimg.cc/hGgMW3wP/image-(28).webp",
    specs: {
      area: "1,100 sft",
      style: "Classical Boiserie",
      duration: "7 Weeks",
      materials: ["Carved Boiserie", "Chevron Wood Panels", "Marble Slab", "Icicle Crystals"]
    },
    highlights: [
      "Exquisite custom-carved white boiserie wall panels with elegant carvings",
      "Contrasting vertical dark wood columns with chevron grain detail",
      "Massive solid marble-slab headboard with integrated gold table lamps",
      "Duo of grand glowing icicle crystal chandeliers and backlit arch vanity mirror"
    ]
  }
];

export const MATERIALS: MaterialTexture[] = [
  {
    id: "smoked-walnut",
    name: "Smoked Walnut",
    category: "Wood",
    hex: "#4E3629",
    bgClass: "bg-[#4E3629]",
    description: "Rich, highly figured charcoal-brown hardwood grain perfect for feature panels and bespoke cabinetry.",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400"
  },
  {
    id: "travertine-marble",
    name: "Travertine Stone",
    category: "Stone",
    hex: "#D7CCC8",
    bgClass: "bg-[#D7CCC8]",
    description: "Creamy, naturally pitted architectural limestone adding classic texture and organic luxury to surfaces.",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=400"
  },
  {
    id: "warm-boucle",
    name: "Toasted Bouclé",
    category: "Fabric",
    hex: "#EFEBE9",
    bgClass: "bg-[#EFEBE9]",
    description: "Soft, highly-textured loopy yarn fabric that offers deep comfort and beautiful shadows on seating.",
    imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=400"
  },
  {
    id: "brushed-bronze",
    name: "Brushed Bronze",
    category: "Metal",
    hex: "#8D6E63",
    bgClass: "bg-[#8D6E63]",
    description: "Warm-toned metal plating with fine linear brushing, introducing refined, understated luxury.",
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=400"
  },
  {
    id: "chocolate-oak",
    name: "Chocolate Oak",
    category: "Wood",
    hex: "#3E2723",
    bgClass: "bg-[#3E2723]",
    description: "Deep, chocolate-saturated linear oak veneer presenting a heavy, grounded luxurious vibe.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400"
  },
  {
    id: "vintage-leather",
    name: "Chestnut Leather",
    category: "Fabric",
    hex: "#5D4037",
    bgClass: "bg-[#5D4037]",
    description: "Full-grain, pull-up aniline leather that develops an elegant personal patina over generations.",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Which wood species speaks to your spatial vision?",
    options: [
      {
        value: "walnut",
        label: "Smoked Rich Walnut",
        description: "Dark, swirling, dramatic coffee wood with heavy grain variations and timeless elegance.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400"
      },
      {
        value: "white-oak",
        label: "Natural White Oak",
        description: "Earthy, linear, bright sandy oak that feels organic, serene, and deeply modern.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400"
      },
      {
        value: "ebony",
        label: "Charred Noir Ebony",
        description: "Monochromatic, structural, heavy and stark timber giving deep moody and architectural focus.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400"
      }
    ]
  },
  {
    id: 2,
    text: "How would you describe your ideal sanctuary atmosphere?",
    options: [
      {
        value: "warm-minimalist",
        label: "Warm Minimalist (Beige & Wood)",
        description: "Uncluttered, soft sand walls, plush textured textiles, low-slung lounge elements.",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=400"
      },
      {
        value: "bold-luxury",
        label: "Bold Luxury (Dark Wood & Brass)",
        description: "Moody, contrast-heavy, high polished marble slabs, glowing recessed lights, brass highlights.",
        image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=400"
      },
      {
        value: "organic-wabi",
        label: "Organic Rustic (Wabi-Sabi)",
        description: "Imperfect stone sinks, hand-plastered walls, woven jute, raw timber edges.",
        image: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=400"
      }
    ]
  },
  {
    id: 3,
    text: "What hardware accents resonate with you most?",
    options: [
      {
        value: "satin-brass",
        label: "Satin Brushed Brass",
        description: "Warm, luxury-focused golden metals that stand out elegantly against rich dark brown tones.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400"
      },
      {
        value: "matte-black",
        label: "Matte Black & Iron",
        description: "Minimalist, sleek black oxide steel that brings sharp, clean, geometric modernism.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400"
      },
      {
        value: "satin-copper",
        label: "Warm Brushed Copper",
        description: "Cozy, industrial-luxe orange metallics that blend perfectly with cocoa-toned timber.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400"
      }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    author: "Zainab Raza",
    rating: 5,
    text: "Al-Hammad Interiors converted our DHA Phase VI home into a literal piece of art. Their handling of warm wood accents and fluted panels was outstanding. Extremely professional execution!",
    relativeTime: "1 month ago",
    verified: true
  },
  {
    author: "Kamran Siddiqui",
    rating: 5,
    text: "We hired hammad interiors for our new corporate office space at Shahrah-e-Faisal. The turnkey design saved us massive coordination efforts. The team completed everything on time and inside budget.",
    relativeTime: "3 months ago",
    verified: true
  },
  {
    author: "Dr. Farah Jamil",
    rating: 4,
    text: "Excellent space planning and 3D visualization. We could visualize our bedroom before a single brick was moved. Highly recommend their custom wooden furniture fabrication.",
    relativeTime: "4 weeks ago",
    verified: true
  },
  {
    author: "Hammad Malik",
    rating: 5,
    text: "Outstanding joinery work and customer support! Handled everything with perfection.",
    relativeTime: "1 week ago",
    verified: true
  },
  {
    author: "Syed Hammad Ali",
    rating: 5,
    text: "Very creative modern luxury design. Highly satisfied with my Clifton lounge.",
    relativeTime: "2 weeks ago",
    verified: true
  },
  {
    author: "M. Bilal Abbasi",
    rating: 5,
    text: "Visited their Gulshan showroom, they have fantastic material options. Their craftsmanship on fluted wooden panels and customized wardrobes is second to none in Karachi.",
    relativeTime: "2 months ago",
    verified: true
  },
  {
    author: "Ali Shah",
    rating: 3,
    text: "Decent work, but had some delay in cabinet delivery. The polish finish was good though.",
    relativeTime: "5 weeks ago",
    verified: true
  },
  {
    author: "Siddique Ahmed",
    rating: 5,
    text: "Fantastic modern chocolate luxury designs, absolutely transformed my Clifton apartment.",
    relativeTime: "2 months ago",
    verified: true
  },
  {
    author: "Hammad",
    rating: 5,
    text: "Incredible design concept, our space feels very cozy and high-end now.",
    relativeTime: "3 months ago",
    verified: true
  },
  {
    author: "Fatima Noor",
    rating: 2,
    text: "The initial drafts were too dark. We wanted more bright whites instead of warm browns.",
    relativeTime: "6 months ago",
    verified: true
  }
];

export const PRICE_CALCULATOR_SPECS = {
  // Typical rates in PKR per square foot in premium Karachi interior design
  baseRates: {
    residential_design: 180, // PKR per sft for design layout only
    residential_turnkey: 3500, // PKR per sft for full high-end fitout
    commercial_design: 220,
    commercial_turnkey: 4200,
    office_design: 150,
    office_turnkey: 2900
  },
  materialMultipliers: {
    premium_walnut: 1.35,
    standard_oak: 1.15,
    budget_mdf: 0.90
  }
};
