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
      <div className="flex h-dvh overflow-hidden bg-paper">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-5 pb-12 pt-20 sm:px-8 md:ml-60 md:px-12 md:pt-12">
          <div className="mx-auto max-w-[68.75rem]">{children}</div>
        </main>
      </div>
    </Providers>
  );
}
