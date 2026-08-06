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
