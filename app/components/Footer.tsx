import { PROFILE } from "@/lib/profile";

export default function Footer() {
  const now = new Date();
  const revision = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}`;

  return (
    <footer className="border-t border-ink">
      <div className="label mx-auto grid max-w-[80rem] gap-2 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:px-12">
        <p>
          {PROFILE.name} · {PROFILE.role}
        </p>
        <p className="sm:text-center">{PROFILE.location}</p>
        <p className="sm:text-right">Rev. {revision} · Sheet 1/1</p>
      </div>
    </footer>
  );
}
