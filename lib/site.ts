export const SITE = {
  name: "highcortisol.xyz",
  shortName: "highcortisol",
  title: "highcortisol.xyz — two squads, one hormone",
  description:
    "A hackathon collective rendered as a biometric OS. Low Cortisol ships calm, High Cortisol ships intense. Seven builds, two nervous systems, one lawn.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://highcortisol.xyz").replace(
    /\/$/,
    "",
  ),
  org: "https://github.com/LowCortisol-Projects",
  email: "hi@highcortisol.xyz",
  locale: "en_US",
  period: "APR—JUN 2026",
} as const;

export function abs(path = "/"): string {
  return new URL(path, SITE.url).toString();
}
