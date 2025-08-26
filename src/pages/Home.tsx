import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, ExternalLink, ArrowRight, Facebook } from "lucide-react";
import GlitchText from "@/components/ui/glitch-text";

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero animations
    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        buttonsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        socialRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, []);

  const socialLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://www.facebook.com/SeyamAhmedOlied",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/siamahmedolied",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://x.com/SiamAhmedOlied",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/siamahmedolied07",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-black"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div ref={heroRef} className="container mx-auto px-4 text-center z-10 relative">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-rajdhani font-bold mb-6"
        >
          <GlitchText
            text="Siam Ahmed Olied"
            className="text-glow-blue bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent"
          />
        </h1>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="text-xl md:text-2xl font-rajdhani mb-8 space-y-2"
        >
          <div className="text-primary text-glow-blue">Bug Bounty Hunter</div>
          <div className="text-accent text-glow-purple">Web3 Frontend Developer</div>
          <div className="text-success text-glow-green">Ethical Hacker (Red Teamer)</div>
        </div>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Over 3 years of experience in cybersecurity, blockchain development, and ethical hacking.
          Specialized in vulnerability research, smart contract auditing, and penetration testing
          for private companies and VDP programs.
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/80 text-primary-foreground glow-blue font-rajdhani text-lg"
          >
            <Link to="/portfolio">
              View Portfolio <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground glow-purple font-rajdhani text-lg"
          >
            <Link to="/hall-of-fame">
              Hall of Fame <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-success text-success hover:bg-success hover:text-success-foreground glow-green font-rajdhani text-lg"
          >
            <Link to="/contact">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Social Links */}
        <div ref={socialRef} className="flex justify-center space-x-6">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-muted rounded-lg hover:border-primary hover:glow-blue transition-all duration-300 group"
              aria-label={label}
            >
              <Icon className="h-6 w-6 group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
