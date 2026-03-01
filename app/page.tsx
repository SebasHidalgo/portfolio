"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import CustomCursor from "./components/CustomCursor"; // Changed from dynamic import
import prisma from "@/lib/database/prisma";

// Load heavy canvas component only on client
const ParticleCanvas = dynamic(() => import("./components/ParticleCanvas"), {
  ssr: false,
});

export default async function Home() {
  // Fetch data with error handling for when the database isn't connected yet
  let dbProjects = [],
    dbExperiences = [],
    dbSkills = [];
  try {
    dbProjects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    dbExperiences = await prisma.experience.findMany({
      orderBy: { createdAt: "desc" },
    });
    dbSkills = await prisma.skill.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.log("Database not configured yet, falling back to empty state.");
  }

  return (
    <>
      <CustomCursor />
      <ParticleCanvas />

      {/* Background gradient overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(79,142,247,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.06) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Navbar />

      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
}
