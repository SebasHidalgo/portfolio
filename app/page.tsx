import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AdminFloatingButton from "./components/AdminFloatingButton";
import { getProjects } from "@/lib/database/tables/project";
import { getExperiences } from "@/lib/database/tables/experience";
import { getSkills } from "@/lib/database/tables/skills";
import { getEducations } from "@/lib/database/tables/education";
import type { Project, Experience, Education, Skill } from "@/types";

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
      githubUrls: p.githubUrls ?? null,
      displayOrder: p.displayOrder,
    }));

    experiences = dbExperiences.map((e) => ({
      id: e.id,
      company: e.company,
      position: e.position,
      ubication: e.ubication,
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
      <Navbar />

      <div className="pt-14 lg:pt-0 lg:pl-14">
        <main
          id="main"
          className="mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-12"
        >
          <HeroSection skills={skills} />
          <AboutSection skills={skills} />
          <ProjectsSection projects={projects} />
          <ExperienceSection experiences={experiences} educations={educations} />
          <ContactSection />
        </main>
        <Footer />
      </div>

      <AdminFloatingButton />
    </>
  );
}
