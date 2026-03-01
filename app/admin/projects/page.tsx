import { getProjects } from "@/lib/database/tables/project";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const initialProjects = await getProjects();

  return <ProjectsClient initialProjects={initialProjects} />;
}
