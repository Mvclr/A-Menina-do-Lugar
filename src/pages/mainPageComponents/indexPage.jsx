import React from "react";
import HeroSection from "./HeroSection.jsx";
import AboutSection from "./AboutSection.jsx";
import ItemsSection from "./ItemSection.jsx";
import ContactSection from "./ContactSection.jsx";

// Página Principal
const CombinedSections= () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ItemsSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default CombinedSections;
