import type { Metadata } from "next";
import { getAllProjects, squadMeta } from "@/lib/projects";
import { SITE } from "@/lib/site";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { SquadSplit } from "@/components/squad-split";
import { ProjectsSection, type ProjectVM } from "@/components/projects-section";
import { ContributorsSection } from "@/components/contributors-section";
import { Timeline } from "@/components/timeline";
import { Cta } from "@/components/cta";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "highcortisol.xyz",
  url: SITE.url,
  description: SITE.description,
  sameAs: [SITE.org],
};

export default function HomePage() {
  const raw = getAllProjects();
  const projects: ProjectVM[] = raw.map((p, i) => {
    const sm = squadMeta(p.squad);
    return {
      n: String(i + 1).padStart(2, "0"),
      slug: p.slug,
      title: p.title,
      month: p.month,
      squad: p.squad,
      summary: p.summary,
      tags: p.tags,
      liveUrl: p.liveUrl,
      repoUrl: p.repoUrl,
      label: sm.label,
      bg: sm.bg,
      fg: sm.fg,
      bd: sm.bd,
    };
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Ticker />
      <SquadSplit />
      <ProjectsSection projects={projects} />
      <ContributorsSection />
      <Timeline />
      <Cta />
    </>
  );
}
