export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Office' | 'Furniture';
  location: string;
  year: string;
  description: string;
  image: string;
  beforeImage?: string;
  specs: {
    area: string;
    style: string;
    duration: string;
    materials: string[];
  };
  highlights: string[];
}

export interface MaterialTexture {
  id: string;
  name: string;
  category: 'Wood' | 'Stone' | 'Fabric' | 'Metal';
  hex: string;
  bgClass: string;
  description: string;
  imageUrl: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    value: string;
    label: string;
    description: string;
    image: string;
  }[];
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  verified: boolean;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  location: string;
  image: string;
  badge: string;
  projectId?: string;
}

export interface FaqItem {
  id: string;
  category: 'Pricing & BOQ' | 'Execution & Timeline' | 'Workshop & Manufacturing' | 'Warranty & Materials' | 'Design & Renders';
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  deliverables: string[];
  icon: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  highlight: string;
  iconName: string;
}
