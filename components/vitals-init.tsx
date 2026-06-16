"use client";

import { useEffect } from "react";
import { initVitals } from "@/lib/vitals";

/** Mounts once in the root layout to boot the shared vitals store. */
export function VitalsInit() {
  useEffect(() => {
    initVitals();
  }, []);
  return null;
}
