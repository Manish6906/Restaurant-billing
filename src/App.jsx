import React, { useEffect, useRef, useState } from "react";
import HeroSection from "./Copmponent/HeroSection";
import SectionOne from "./Copmponent/SectionOne";
import SectionTwo from "./Copmponent/SectionTwo";
import SectionThree from "./Copmponent/SectionThree";
import PremiumSection from "./Copmponent/PremiumSection";
import TextSection from "./Copmponent/TextSection";
import IconSection from "./Copmponent/IconSection";
import Navbar from "./Copmponent/Navbar";

function App() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // 🔥 Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;

      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total); // 0 → 1
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Smooth easing function
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  // 🔥 Dynamic translate function
  const getTranslate = (start, end) => {
    if (progress < start) return 100;
    if (progress > end) return 0;

    const raw = (progress - start) / (end - start);
    const eased = easeOut(raw);

    return 100 - eased * 100;
  };

  return (
    <>
    <Navbar />
      {/* <HeroSection />
      <TextSection />
      <IconSection /> */}

      {/* 🔥 SCROLL ANIMATION SECTION */}
     
    </>
  );
}

export default App;