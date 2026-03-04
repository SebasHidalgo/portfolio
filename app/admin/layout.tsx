import { Providers, AdminSidebar } from "@/app/admin/components";

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
      <div className="h-screen bg-background flex overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 md:ml-[240px] overflow-y-auto p-6 md:p-12 pt-20 md:pt-12">
          <div className="max-w-[1100px] mx-auto">{children}</div>
        </main>
      </div>
    </Providers>
  );
}
