import Providers from "./components/Providers";
import AdminSidebar from "./components/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard | Portfolio",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="min-h-screen bg-background flex">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-12">
          <div className="max-w-[1100px] mx-auto">{children}</div>
        </main>
      </div>
    </Providers>
  );
}
