"use client";

import { useBpm, useReading, useMode, statusFor } from "@/lib/vitals";

/** Live heart-rate number (jitters ~8×/s, calm when reduced-motion). */
export function LiveBpm() {
  return <>{useBpm()}</>;
}

/** Live cortisol reading in nmol/L. */
export function LiveReading() {
  return <>{useReading()}</>;
}

/** RESTING / SPIKING, tracks the cortisol mode. */
export function LiveStatus() {
  return <>{statusFor(useMode())}</>;
}
