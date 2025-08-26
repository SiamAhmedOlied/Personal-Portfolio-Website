import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";
import DOMPurify from "dompurify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Github, Twitter, Linkedin, Facebook, Send } from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { toast } = useToast();
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize EmailJS (you'll need to add your credentials)
    emailjs.init("QCSgwx2fCX4UQEebZ"); // Replace with your EmailJS public key

    // Animations
    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      [formRef.current, contactInfoRef.current],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Sanitize input to prevent XSS
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name is required.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Email is required.",
        variant: "destructive",
      });
      return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.message.trim().length < 10) {
      toast({
        title: "Validation Error",
        description: "Message must be at least 10 characters long.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    await emailjs.send(
      "service_8n0aac5",  // your service ID
      "template_2j1hurk", // your template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || "New Contact Form Submission",
        message: formData.message,
      },
      "QCSgwx2fCX4UQEebZ" // your public key
    );

    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
  } catch (error) {
    console.error("EmailJS error:", error);
    toast({
      title: "Error",
      description: "Failed to send message. Please try again or contact me directly.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "siamahmedolied@gmail.com",
      href: "mailto:siamahmedolied@gmail.com",
      color: "text-primary"
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "SeyamAhmed",
      href: "https://www.facebook.com/SeyamAhmedOlied",
      color: "text-muted-foreground"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@SiamAhmedOlied",
      href: "https://github.com/siamahmedolied",
      color: "text-muted-foreground"
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@siamolied",
      href: "https://x.com/SiamAhmedOlied",
      color: "text-blue-400"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Siam Ahmed Olied",
      href: "https://linkedin.com/in/siamahmedolied07",
      color: "text-blue-500"
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-rajdhani font-bold mb-6 text-glow-blue">
            Contact Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? Want to discuss cybersecurity, Web3 development, or ethical hacking? 
            I'd love to hear from you. Let's connect and build something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card ref={formRef} className="glass border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-rajdhani text-primary">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="glass border-primary/30 focus:border-primary"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="glass border-primary/30 focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="glass border-primary/30 focus:border-primary"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="glass border-primary/30 focus:border-primary resize-none"
                    placeholder="Tell me about your project, question, or how I can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/80 text-primary-foreground glow-blue font-rajdhani text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl font-rajdhani text-accent">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I'm always open to discussing new opportunities, collaborations, or just having 
                  a conversation about cybersecurity and technology. Feel free to reach out through 
                  any of the following channels:
                </p>
                
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <a
                      key={index}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 rounded-lg border border-muted/20 hover:border-primary/50 transition-all duration-300 group"
                    >
                      <method.icon className={`h-5 w-5 mr-4 ${method.color} group-hover:glow-blue transition-all`} />
                      <div>
                        <div className="font-medium text-foreground">{method.label}</div>
                        <div className="text-sm text-muted-foreground">{method.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-success/20">
              <CardHeader>
                <CardTitle className="text-2xl font-rajdhani text-success">Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  I'm particularly interested in:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                    Security consulting and penetration testing
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                    Web3 and DeFi project development
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                    Bug bounty program management
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                    Speaking at security conferences
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                    Open source security tools
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
