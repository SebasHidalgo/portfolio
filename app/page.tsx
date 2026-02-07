import { Dock, Navbar, Welcome } from "@/src/components";
import { Terminal } from "@/src/components/windows";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
    </main>
  );
}
