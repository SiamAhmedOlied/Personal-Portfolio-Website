export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  demo_url?: string | null;
  repository_url?: string | null;
  image_url?: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface HallOfFameEntry {
  id: string;
  company_name: string;
  platform?: string | null;
  vulnerability_type: string;
  date_acknowledged: string;
  description?: string | null;
  reference_url?: string | null;
  severity?: string | null;
  created_at: string;
  updated_at: string;
}