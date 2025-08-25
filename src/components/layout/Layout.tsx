import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import { Lenis as ReactLenis } from "@studio-freight/react-lenis";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // Add dark class to body
    document.body.classList.add("dark");
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
      </div>
    </ReactLenis>
  );
};

export default Layout;