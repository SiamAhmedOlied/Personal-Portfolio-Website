-- Create projects table for portfolio
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Bug Bounty', 'Web3', 'Ethical Hacking')),
  technologies TEXT[] NOT NULL DEFAULT '{}',
  demo_url TEXT,
  repository_url TEXT,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hall_of_fame table for achievements
CREATE TABLE public.hall_of_fame (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  platform TEXT, -- e.g., HackerOne, Bugcrowd, Direct VDP
  vulnerability_type TEXT NOT NULL,
  date_acknowledged DATE NOT NULL,
  description TEXT,
  reference_url TEXT,
  severity TEXT CHECK (severity IN ('Critical', 'High', 'Medium', 'Low', 'Info')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hall_of_fame ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for portfolio)
CREATE POLICY "Projects are publicly readable" 
ON public.projects 
FOR SELECT 
USING (true);

CREATE POLICY "Hall of fame entries are publicly readable" 
ON public.hall_of_fame 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hall_of_fame_updated_at
  BEFORE UPDATE ON public.hall_of_fame
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample projects data
INSERT INTO public.projects (title, description, category, technologies, demo_url, repository_url, featured) VALUES
('DeFi Protocol Security Audit', 'Comprehensive security audit of a decentralized finance protocol, identifying critical vulnerabilities in smart contracts and frontend implementations.', 'Web3', ARRAY['Solidity', 'React', 'Web3.js', 'Hardhat'], 'https://demo.example.com', 'https://github.com/example', true),
('Corporate Network Penetration Test', 'Red team assessment of enterprise infrastructure, exploiting misconfigurations and social engineering vectors to achieve domain admin access.', 'Ethical Hacking', ARRAY['Metasploit', 'Nmap', 'Burp Suite', 'PowerShell'], NULL, NULL, true),
('Bug Bounty Dashboard', 'React-based dashboard for tracking bug bounty submissions, rewards, and vulnerability statistics across multiple platforms.', 'Bug Bounty', ARRAY['React', 'TypeScript', 'Chart.js', 'Supabase'], 'https://dashboard.example.com', 'https://github.com/example', false),
('NFT Marketplace Exploit Analysis', 'Deep dive analysis of common NFT marketplace vulnerabilities including reentrancy attacks and price manipulation techniques.', 'Web3', ARRAY['Solidity', 'Foundry', 'React', 'IPFS'], NULL, 'https://github.com/example', true),
('Automated OSINT Framework', 'Python-based framework for automated open source intelligence gathering and social engineering reconnaissance.', 'Ethical Hacking', ARRAY['Python', 'Scrapy', 'Docker', 'PostgreSQL'], NULL, 'https://github.com/example', false),
('Cross-Chain Bridge Security', 'Security assessment of cross-chain bridge protocols, identifying attack vectors and proposing mitigation strategies.', 'Web3', ARRAY['Solidity', 'Go', 'Rust', 'Docker'], 'https://bridge.example.com', NULL, true);

-- Insert sample hall of fame data
INSERT INTO public.hall_of_fame (company_name, platform, vulnerability_type, date_acknowledged, description, severity) VALUES
('Tesla Inc.', 'Direct VDP', 'Server-Side Request Forgery (SSRF)', '2024-01-15', 'Critical SSRF vulnerability in internal API allowing access to AWS metadata service', 'Critical'),
('Microsoft Corporation', 'HackerOne', 'Cross-Site Scripting (XSS)', '2023-11-22', 'Stored XSS in Office 365 admin panel affecting enterprise customers', 'High'),
('Coinbase', 'Bugcrowd', 'Authentication Bypass', '2023-09-08', 'JWT token validation bypass in mobile API endpoints', 'Critical'),
('Shopify', 'HackerOne', 'SQL Injection', '2023-07-14', 'Blind SQL injection in merchant dashboard search functionality', 'High'),
('Uber Technologies', 'HackerOne', 'Privilege Escalation', '2023-05-03', 'Horizontal privilege escalation allowing access to other driver accounts', 'Medium'),
('Meta Platforms', 'Direct VDP', 'Information Disclosure', '2023-03-18', 'Sensitive user data exposure through GraphQL introspection', 'Medium'),
('Binance', 'Direct VDP', 'Business Logic Flaw', '2023-01-25', 'Trading fee calculation error allowing negative fee exploitation', 'High'),
('Discord Inc.', 'HackerOne', 'Rate Limit Bypass', '2022-12-12', 'Rate limiting bypass in message sending API', 'Low');