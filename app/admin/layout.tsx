import Providers from "./components/Providers";
import AdminSidebar from "./components/AdminSidebar";
import CustomCursor from "@/app/components/CustomCursor";
import ParticleCanvasWrapper from "@/app/components/ParticleCanvasWrapper";

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
      <CustomCursor />
      <ParticleCanvasWrapper />
      {/* Google Material Icons */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .msym { font-family: 'Material Symbols Outlined'; font-style: normal; line-height: 1; display: inline-block; }
        .adm-glass {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .adm-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: border 0.2s;
          font-family: inherit;
        }
        .adm-input:focus { border-color: #00f2ff; box-shadow: 0 0 0 2px rgba(0,242,255,0.1); }
        .adm-input-purple:focus { border-color: #bc13fe; box-shadow: 0 0 0 2px rgba(188,19,254,0.1); }
        .adm-input-indigo:focus { border-color: #5050f7; box-shadow: 0 0 0 2px rgba(80,80,247,0.1); }
        .adm-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px;
          transition: border-color 0.25s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }
        .adm-card:hover { border-color: rgba(255,255,255,0.16); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .adm-btn-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 18px;
          background: rgba(255,255,255,0.05);
        }
        select.adm-input { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          paddingTop: "80px",
          background: "#0a0a0f",
          display: "flex",
        }}
      >
        <AdminSidebar />
        <main style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
        </main>
      </div>
    </Providers>
  );
}
