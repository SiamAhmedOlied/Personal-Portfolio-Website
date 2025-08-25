import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`${className} ${isGlitching ? "glitch" : ""}`}
      data-text={text}
    >
      {text}
    </span>
  );
};

export default GlitchText;