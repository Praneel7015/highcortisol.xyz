"use client";

// Tiny external store for the live "biometric" state shared across components.
// Mode (low/high) and theme (dark/light) drive CSS via data-attributes on
// <html>; bpm + cortisol reading jitter on a single interval. Components
// subscribe to just the slice they need via useSyncExternalStore, so a bpm
// tick only re-renders the bpm/reading readouts — nothing else.

import { useSyncExternalStore } from "react";

export type Mode = "low" | "high";
export type Theme = "dark" | "light";

let mode: Mode = "low";
// The user's manually-selected mode. `mode` (above) is what's actually shown —
// it can be temporarily overridden by an involuntary cortisol spike below.
let baseMode: Mode = "low";
let theme: Theme = "dark";
let reduce = false;
let bpm = 58;
let reading = "6.2";

const listeners = new Set<() => void>();
function emit() {
  for (const l of listeners) l();
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function setBase() {
  if (mode === "high") {
    bpm = 138;
    reading = "23.8";
  } else {
    bpm = 58;
    reading = "6.2";
  }
}

function jitter() {
  if (mode === "high") {
    bpm = 128 + Math.floor(Math.random() * 20);
    reading = (23.8 + (Math.random() - 0.5) * 1.8).toFixed(1);
  } else {
    bpm = 55 + Math.floor(Math.random() * 9);
    reading = (6.2 + (Math.random() - 0.5) * 0.4).toFixed(1);
  }
  emit();
}

let interval: ReturnType<typeof setInterval> | null = null;
let started = false;

function startInterval() {
  if (interval || reduce) return;
  interval = setInterval(jitter, 130);
}
function stopInterval() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

// Involuntary spike: every so often the whole site jolts into HIGH CORTISOL
// for a few seconds, then settles back — independent of the manual toggle.
const SPIKE_MIN_DELAY = 30_000;
const SPIKE_MAX_DELAY = 55_000;
const SPIKE_DURATION = 5_000;

let spikeScheduleTimer: ReturnType<typeof setTimeout> | null = null;
let spikeRevertTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSpike() {
  if (spikeScheduleTimer) clearTimeout(spikeScheduleTimer);
  const delay = SPIKE_MIN_DELAY + Math.random() * (SPIKE_MAX_DELAY - SPIKE_MIN_DELAY);
  spikeScheduleTimer = setTimeout(runSpike, delay);
}

function runSpike() {
  spikeScheduleTimer = null;
  // nothing to spike to — already high, or motion is reduced. try again later.
  if (reduce || baseMode === "high") {
    scheduleSpike();
    return;
  }
  mode = "high";
  try {
    document.documentElement.dataset.mode = mode;
  } catch {}
  setBase();
  emit();
  spikeRevertTimer = setTimeout(() => {
    spikeRevertTimer = null;
    mode = baseMode;
    try {
      document.documentElement.dataset.mode = mode;
    } catch {}
    setBase();
    emit();
    scheduleSpike();
  }, SPIKE_DURATION);
}

export function initVitals() {
  if (started) return;
  started = true;
  const el = document.documentElement;

  try {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduce = mq.matches;
    mq.addEventListener("change", (e) => {
      reduce = e.matches;
      if (reduce) {
        stopInterval();
        if (spikeRevertTimer) {
          clearTimeout(spikeRevertTimer);
          spikeRevertTimer = null;
          mode = baseMode;
          try {
            document.documentElement.dataset.mode = mode;
          } catch {}
          setBase();
        }
      } else {
        startInterval();
      }
      emit();
    });
  } catch {}

  try {
    const stored = localStorage.getItem("hc-theme");
    if (stored === "light" || stored === "dark") {
      theme = stored;
    } else if (el.dataset.theme === "light" || el.dataset.theme === "dark") {
      theme = el.dataset.theme as Theme;
    } else {
      theme = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    el.dataset.theme = theme;
  } catch {}

  el.dataset.mode = mode;
  setBase();
  startInterval();
  scheduleSpike();
  emit();
}

export function setMode(next: Mode) {
  baseMode = next;
  // a manual pick always wins immediately over an in-progress involuntary spike
  const wasSpiking = spikeRevertTimer !== null;
  if (wasSpiking) {
    clearTimeout(spikeRevertTimer!);
    spikeRevertTimer = null;
  }
  if (next !== mode) {
    mode = next;
    try {
      document.documentElement.dataset.mode = mode;
    } catch {}
    setBase();
    emit();
  }
  if (wasSpiking) scheduleSpike();
}

export function setTheme(next: Theme) {
  if (next === theme) return;
  theme = next;
  try {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("hc-theme", theme);
  } catch {}
  emit();
}

export function toggleTheme() {
  setTheme(theme === "dark" ? "light" : "dark");
}

/* ---- hooks (return primitives so React can bail on unchanged slices) ---- */
export const useMode = () => useSyncExternalStore(subscribe, () => mode, () => mode);
export const useTheme = () =>
  useSyncExternalStore(subscribe, () => theme, () => theme);
export const useReduce = () =>
  useSyncExternalStore(subscribe, () => reduce, () => false);
export const useBpm = () => useSyncExternalStore(subscribe, () => bpm, () => 58);
export const useReading = () =>
  useSyncExternalStore(subscribe, () => reading, () => "6.2");

export function statusFor(m: Mode) {
  return m === "high" ? "SPIKING" : "RESTING";
}
export function deltaFor(m: Mode) {
  return m === "high" ? "▲ +280% OVER BASELINE" : "▬ WITHIN BASELINE";
}
