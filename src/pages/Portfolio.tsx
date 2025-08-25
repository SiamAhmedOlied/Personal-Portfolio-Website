import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Project } from "@/types/database";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filters = ["All", "Bug Bounty", "Web3", "Ethical Hacking"];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    // Animations
    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      filtersRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter, projects]);

  useEffect(() => {
    // Animate project cards when they change
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [filteredProjects]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again later.",
        variant: "destructive",
      });
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Bug Bounty":
        return "border-primary text-primary hover:bg-primary hover:text-primary-foreground";
      case "Web3":
        return "border-accent text-accent hover:bg-accent hover:text-accent-foreground";
      case "Ethical Hacking":
        return "border-success text-success hover:bg-success hover:text-success-foreground";
      default:
        return "border-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-rajdhani font-bold mb-6 text-glow-purple">
            Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my work in cybersecurity, blockchain development, and ethical hacking. 
            Each project represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`font-rajdhani ${
                activeFilter === filter
                  ? "bg-accent text-accent-foreground glow-purple"
                  : "border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Filter className="mr-2 h-4 w-4" />
              {filter}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="glass border-muted/20 hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-rajdhani text-primary group-hover:text-glow-blue transition-all">
                    {project.title}
                    {project.featured && (
                      <Badge className="ml-2 bg-accent text-accent-foreground">Featured</Badge>
                    )}
                  </CardTitle>
                </div>
                <Badge variant="outline" className={getCategoryColor(project.category)}>
                  {project.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2 text-success">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.demo_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.repository_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-muted text-muted-foreground hover:bg-muted hover:text-foreground"
                      asChild
                    >
                      <a href={project.repository_url} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No projects found for the selected category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;