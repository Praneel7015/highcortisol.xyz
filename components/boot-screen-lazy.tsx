"use client";

import dynamic from "next/dynamic";

const BootScreen = dynamic(
  () => import("@/components/boot-screen").then((m) => ({ default: m.BootScreen })),
  { ssr: false }
);

export function BootScreenLazy() {
  return <BootScreen />;
}
