
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  priceRange: string;
}

export interface ProjectRequest {
  id: string;
  customerName: string;
  email: string;
  serviceType: 'Website' | 'App' | 'Logo';
  quality: 'Standard' | 'Premium' | 'Enterprise';
  budget: string;
  description: string;
  timestamp: number;
  status: 'New' | 'Contacted' | 'Completed';
}

export interface AIResponse {
  projectName: string;
  summary: string;
  features: string[];
  estimatedTimeline: string;
  recommendedStack: string[];
  complexity: 'Low' | 'Medium' | 'High';
}

// Added PortfolioItem interface to fix "Module '"../types"' has no exported member 'PortfolioItem'" error.
export interface PortfolioItem {
  id: number;
  title: string;
  category: 'Web' | 'App' | 'Logo';
  image: string;
}
