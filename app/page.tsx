import { Dock, Navbar, Welcome } from "@/src/components";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
    </main>
  );
}
