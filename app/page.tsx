import type { Metadata } from "next";

import Drawer from "@/components/drawer";
import SectionLink from "@/components/ui/section-link";
import HomeScene from "@/components/scenes/home-scene";
import AboutScene from "@/components/scenes/about-scene";
import ProjectsScene from "@/components/scenes/projects-scene";
import ExperienceScene from "@/components/scenes/experience-scene";
import StackScene from "@/components/scenes/stack-scene";
import EducationScene from "@/components/scenes/education-scene";

import { cookies } from "next/headers";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://esthereblacas.vercel.app/",
  },
};

export const instant = false;

export default async function Home() {
  const cookieStore = await cookies();
  const drawerOpen = cookieStore.get("portfolio-drawer-open")?.value === "true";

  return (
    <Drawer
      defaultOpen={drawerOpen}
      title="Esther Eblacas"
      footer={
        <>
          <span>© 2026 Esther Beuthel Eblacas</span>

          <span>Designed and built from scratch.</span>
        </>
      }
    >
      {/* Home */}
      <section id="home" className="pb-64">
        <HomeScene />
      </section>

      {/* About */}
      <section id="about" className="min-h-screen px-6 pt-0 pb-12 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-base font-normal text-muted-foreground">
            -- About
          </h2>

          <SectionLink href="/about" label="ALL ABOUT" />
        </div>

        <div className="mt-6">
          <AboutScene />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="min-h-screen px-6 pt-0 pb-12 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-base font-normal text-muted-foreground">
            -- Projects
          </h2>

          <SectionLink href="/projects" label="ALL PROJECTS" />
        </div>

        <div className="mt-6">
          <ProjectsScene />
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="min-h-screen px-6 pt-0 pb-12 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-base font-normal text-muted-foreground">
            -- Experience
          </h2>

          <SectionLink href="/experience" label="ALL EXPERIENCE" />
        </div>

        <div className="mt-6">
          <ExperienceScene />
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="min-h-screen px-6 pt-0 pb-12 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-base font-normal text-muted-foreground">
            -- Stack
          </h2>

          <SectionLink href="/stack" label="ALL STACK" />
        </div>

        <div className="mt-6">
          <StackScene />
        </div>
      </section>

      {/* Education */}
      <section id="education" className="min-h-screen px-6 pt-0 pb-12 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-base font-normal text-muted-foreground">
            -- Education
          </h2>

          <SectionLink href="/education" label="ALL EDUCATION" />
        </div>

        <div className="mt-6">
          <EducationScene />
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="
          min-h-screen
          px-6 pt-0 pb-12
          md:px-10
        "
      >
        <h2 className="font-display text-base font-normal text-muted-foreground">
          -- Contact
        </h2>
      </section>
    </Drawer>
  );
}
