import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Code, Bug, Target, Zap, Lock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Section animations with ScrollTrigger
    gsap.fromTo(
      summaryRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: summaryRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      timelineRef.current?.children || [],
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      skillsRef.current?.children || [],
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const experiences = [
    {
      title: "Senior Security Researcher",
      company: "Independent",
      period: "2022 - Present",
      description: "Leading bug bounty research and vulnerability disclosure across Fortune 500 companies. Specialized in web application security, smart contract auditing, and red team operations.",
      achievements: ["50+ critical vulnerabilities discovered", "Hall of Fame in 8+ companies", "$25K+ in bug bounty rewards"]
    },
    {
      title: "Web3 Frontend Developer",
      company: "DeFi Protocols",
      period: "2021 - Present",
      description: "Developing secure frontend interfaces for decentralized applications. Focus on wallet integration, smart contract interaction, and user experience optimization.",
      achievements: ["Built 10+ DeFi applications", "Zero security incidents", "React/TypeScript expert"]
    },
    {
      title: "Penetration Testing Consultant",
      company: "Various Enterprises",
      period: "2020 - Present",
      description: "Conducting comprehensive security assessments for enterprise networks, web applications, and cloud infrastructure. Specialized in Advanced Persistent Threat (APT) simulation.",
      achievements: ["Assessed 30+ enterprise networks", "Achieved domain admin in 90% of engagements", "OSCP certified"]
    }
  ];

  const skillCategories = [
    {
      title: "Bug Bounty & OSINT",
      icon: Bug,
      skills: ["Burp Suite Professional", "OWASP Testing", "Subdomain Enumeration", "Social Engineering", "Report Writing", "Nuclei", "Gobuster", "Amass"]
    },
    {
      title: "Web3 & Blockchain",
      icon: Code,
      skills: ["Solidity", "React", "Web3.js", "Ethers.js", "Hardhat", "Foundry", "Smart Contract Auditing", "DeFi Protocols"]
    },
    {
      title: "Ethical Hacking & Red Team",
      icon: Shield,
      skills: ["Metasploit", "Cobalt Strike", "PowerShell Empire", "Nmap", "Wireshark", "Bloodhound", "Mimikatz", "C2 Frameworks"]
    },
    {
      title: "Programming & Tools",
      icon: Target,
      skills: ["Python", "JavaScript", "TypeScript", "Bash", "Go", "Docker", "Git", "Linux Administration"]
    },
    {
      title: "Cloud Security",
      icon: Zap,
      skills: ["AWS Security", "Azure AD", "Google Cloud", "Kubernetes Security", "Container Scanning", "IAM Auditing"]
    },
    {
      title: "Compliance & Frameworks",
      icon: Lock,
      skills: ["OWASP Top 10", "NIST Framework", "ISO 27001", "PCI DSS", "GDPR", "SOC 2", "Threat Modeling"]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-rajdhani font-bold mb-6 text-glow-blue">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cybersecurity professional with a passion for ethical hacking, blockchain security, and building secure digital experiences.
          </p>
        </div>

        {/* Professional Summary */}
        <div ref={summaryRef} className="mb-20">
          <Card className="glass border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-rajdhani font-semibold mb-6 text-primary">Professional Summary</h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  I'm a cybersecurity professional with over 3 years of hands-on experience in bug bounty hunting, 
                  Web3 frontend development, and ethical hacking. My journey began with a curiosity about how systems 
                  work and evolved into a passion for securing the digital world.
                </p>
                <p>
                  As a bug bounty hunter, I've discovered critical vulnerabilities in major platforms and earned 
                  recognition in multiple Hall of Fame programs. My approach combines automated tools with manual 
                  testing to uncover complex security flaws that others might miss.
                </p>
                <p>
                  In the Web3 space, I specialize in building secure frontend interfaces for decentralized applications 
                  while conducting smart contract security reviews. This dual perspective allows me to understand both 
                  the development and security sides of blockchain technology.
                </p>
                <p>
                  My red team experience includes simulating advanced persistent threats against enterprise environments, 
                  helping organizations understand their security posture from an attacker's perspective.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experience Timeline */}
        <div className="mb-20">
          <h2 className="text-4xl font-rajdhani font-semibold mb-12 text-center text-accent">Experience</h2>
          <div ref={timelineRef} className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="glass border-accent/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-rajdhani font-semibold text-primary">{exp.title}</h3>
                      <p className="text-accent">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-success">Key Achievements:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-muted-foreground">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-4xl font-rajdhani font-semibold mb-12 text-center text-success">Skills & Expertise</h2>
          <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card key={index} className="glass border-success/20 hover:glow-green transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <category.icon className="h-8 w-8 text-success mr-3" />
                    <h3 className="text-xl font-rajdhani font-semibold text-success">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="border-muted text-muted-foreground hover:border-success hover:text-success transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;