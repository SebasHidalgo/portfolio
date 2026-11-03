import type { Metadata } from "next";
import { Archivo, B612_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const b612Mono = B612_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-b612-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guillermo Hidalgo | Full Stack Developer",
  description:
    "Full Stack Developer based in San José, Costa Rica. Projects, experience and skills in React, Next.js, Node.js, TypeScript and PostgreSQL.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Guillermo Hidalgo" }],
  openGraph: {
    title: "Guillermo Hidalgo | Full Stack Developer",
    description:
      "Projects, experience and skills of a Full Stack Developer based in Costa Rica.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${b612Mono.variable}`}>
      <body className="min-h-dvh">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--color-ink)",
              color: "var(--color-paper)",
              borderRadius: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: {
                primary: "var(--color-ok)",
                secondary: "var(--color-paper)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--color-signal)",
                secondary: "var(--color-paper)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
