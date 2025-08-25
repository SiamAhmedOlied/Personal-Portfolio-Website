import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, Shield, Calendar, Building } from "lucide-react";
import { HallOfFameEntry } from "@/types/database";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const HallOfFame = () => {
  const [entries, setEntries] = useState<HallOfFameEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<HallOfFameEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHallOfFameEntries();
  }, []);

  useEffect(() => {
    // Animations
    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      searchRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredEntries(entries);
    } else {
      const filtered = entries.filter(
        (entry) =>
          entry.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.vulnerability_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.platform?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEntries(filtered);
    }
  }, [searchTerm, entries]);

  useEffect(() => {
    // Animate entries when they change
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [filteredEntries]);

  const fetchHallOfFameEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('hall_of_fame')
        .select('*')
        .order('date_acknowledged', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load Hall of Fame entries. Please try again later.",
        variant: "destructive",
      });
      console.error("Error fetching hall of fame entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      case "High":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "Low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "Info":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getPlatformIcon = (platform?: string) => {
    if (!platform) return <Building className="h-4 w-4" />;
    
    switch (platform.toLowerCase()) {
      case "hackerone":
        return <Shield className="h-4 w-4 text-primary" />;
      case "bugcrowd":
        return <Shield className="h-4 w-4 text-accent" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          <h1 className="text-5xl md:text-6xl font-rajdhani font-bold mb-6 text-glow-green">
            Hall of Fame
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Recognition and acknowledgments from bug bounty programs, vulnerability disclosure programs, 
            and security companies for responsible disclosure of security vulnerabilities.
          </p>
        </div>

        {/* Search */}
        <div ref={searchRef} className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by company, vulnerability type, or platform..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass border-success/30 focus:border-success"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="glass border-primary/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-rajdhani font-bold text-primary mb-2">
                {entries.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Entries</div>
            </CardContent>
          </Card>
          <Card className="glass border-red-500/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-rajdhani font-bold text-red-400 mb-2">
                {entries.filter(e => e.severity === 'Critical').length}
              </div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </CardContent>
          </Card>
          <Card className="glass border-orange-500/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-rajdhani font-bold text-orange-400 mb-2">
                {entries.filter(e => e.severity === 'High').length}
              </div>
              <div className="text-sm text-muted-foreground">High</div>
            </CardContent>
          </Card>
          <Card className="glass border-accent/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-rajdhani font-bold text-accent mb-2">
                {new Set(entries.map(e => e.company_name)).size}
              </div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </CardContent>
          </Card>
        </div>

        {/* Hall of Fame Entries */}
        <div ref={listRef} className="space-y-6">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="glass border-success/20 hover:border-success/50 transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <CardTitle className="text-xl font-rajdhani text-success flex items-center">
                    {getPlatformIcon(entry.platform)}
                    <span className="ml-2">{entry.company_name}</span>
                    {entry.platform && (
                      <Badge variant="outline" className="ml-3 border-accent text-accent">
                        {entry.platform}
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-2 md:mt-0">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(entry.date_acknowledged)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-primary">Vulnerability Type</h4>
                    <p className="text-muted-foreground">{entry.vulnerability_type}</p>
                  </div>
                  {entry.severity && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-primary">Severity</h4>
                      <Badge className={getSeverityColor(entry.severity)}>
                        {entry.severity}
                      </Badge>
                    </div>
                  )}
                  <div>
                    {entry.reference_url && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-success text-success hover:bg-success hover:text-success-foreground"
                        asChild
                      >
                        <a href={entry.reference_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Details
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                
                {entry.description && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-primary">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">{entry.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No Hall of Fame entries found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HallOfFame;