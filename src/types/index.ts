interface AIProjectData {
  price: string;                    // Project cost
  clientType: string;              // Type of client
  complexity: "بسيط" | "متوسط" | "متقدم" | "معقد";
  teamSize: string;                // Development team size
  keyFeatures: string[];           // Main project features
  clientFeedback: string;          // Client testimonial
  maintenance?: string;            // Maintenance info
  specialRequirements?: string[];  // Special requirements
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  youtubeVideo: string;
  category: string;
  technologies: string[];
  duration: string;
  rating: number;
  reviews: Review[];
  liveUrl?: string;
  githubUrl?: string;
  objectives: string[];
  challenges: string[];
  features: string[];
  aiData?: AIProjectData;
}

export interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  projects: Project[];
}