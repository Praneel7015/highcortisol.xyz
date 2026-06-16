"use client";

import dynamic from "next/dynamic";

const EcgMonitor = dynamic(
  () => import("@/components/ecg-monitor").then((m) => ({ default: m.EcgMonitor })),
  { ssr: false }
);

export function EcgMonitorLazy() {
  return <EcgMonitor />;
}
