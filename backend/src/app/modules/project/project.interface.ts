export interface IProject {
  title: string;
  description: string;
  images: { url: string; publicId: string }[];
  techStack: string[];
  liveUrl?: string;
  frontendGithub?: string;
  backendGithub?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}


