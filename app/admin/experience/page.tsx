import { getExperiences } from "@/lib/database/tables/experience";
import ExperienceClient from "./ExperienceClient";

export default async function ExperiencePage() {
  const initialExperiences = await getExperiences();

  return <ExperienceClient initialExperiences={initialExperiences} />;
}
