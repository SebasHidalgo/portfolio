import { Dock, Navbar, Welcome } from "@/src/components";
import { Resume, Terminal } from "@/src/components/windows";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Resume />
    </main>
  );
}
