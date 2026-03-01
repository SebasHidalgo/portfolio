import { getSkills } from "@/lib/database/tables/skills";
import SkillsClient from "./SkillsClient";

export default async function SkillsPage() {
  const initialSkills = await getSkills();

  return <SkillsClient initialSkills={initialSkills} />;
}
