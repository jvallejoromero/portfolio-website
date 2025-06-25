import React from "react";
import AboutSection from "@/components/main-page/AboutSection";
import HeroSection from "@/components/main-page/HeroSection";
import ProjectsSection from "@/components/main-page/ProjectsSection";
import SkillsSection from "@/components/main-page/SkillsSection";
import ContactSection from "@/components/main-page/ContactSection";
import Footer from "@/components/navigation/Footer";

export default function Home() {
  return (
      <div>
          <HeroSection />
          <AboutSection />
          <ProjectsSection/>
          <SkillsSection />
          <ContactSection />
          <Footer />
      </div>
  );
}
