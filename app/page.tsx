import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import AdminFloatingButton from "./components/AdminFloatingButton";
import { getProjects } from "@/lib/database/tables/project";
import { getExperiences } from "@/lib/database/tables/experience";
import { getSkills } from "@/lib/database/tables/skills";
import { getEducations } from "@/lib/database/tables/education";
import type { Project, Experience, Education, Skill } from "@/types";
import ParticleCanvasWrapper from "./components/particles/ParticleCanvasWrapper";

export default async function Home() {
  let projects: Project[] = [];
  let experiences: Experience[] = [];
  let educations: Education[] = [];
  let skills: Skill[] = [];

  try {
    const [dbProjects, dbExperiences, dbEducations, dbSkills] =
      await Promise.all([
        getProjects(),
        getExperiences(),
        getEducations(),
        getSkills(),
      ]);

    // Map Prisma results to serializable types (Date → ISO string)
    projects = dbProjects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      techStack: p.techStack,
      demoUrl: p.demoUrl ?? null,
      githubUrl: p.githubUrl ?? null,
      githubUrls: p.githubUrls ?? null
    }));

    experiences = dbExperiences.map((e) => ({
      id: e.id,
      company: e.company,
      position: e.position,
      ubication: e.ubication,
      color: e.color,
      achievements: e.achievements,
      startDate: e.startDate,
      endDate: e.endDate,
    }));

    educations = dbEducations.map((e) => ({
      id: e.id,
      degree: e.degree,
      institution: e.institution,
      ubication: e.ubication,
      startDate: e.startDate,
      endDate: e.endDate,
    }));

    skills = dbSkills.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
    }));
  } catch (error) {
    console.log(
      "Database not configured yet – rendering with fallback static data.",
    );
  }

  return (
    <>
      <ParticleCanvasWrapper />

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
        <HeroSection skills={skills} />
        <AboutSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} educations={educations} />
        <ContactSection />
      </main>

      <AdminFloatingButton />
    </>
  );
}
