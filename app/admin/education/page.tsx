import { getEducations } from "@/lib/database/tables/education";
import EducationClient from "./EducationClient";

export default async function EducationPage() {
  const initialEducations = await getEducations();

  return <EducationClient initialEducations={initialEducations} />;
}
