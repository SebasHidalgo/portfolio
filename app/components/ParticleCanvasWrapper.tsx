"use client";

import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(
  () => import("@/app/components/ParticleCanvas"),
  { ssr: false },
);

export default function ParticleCanvasWrapper() {
  return <ParticleCanvas />;
}
