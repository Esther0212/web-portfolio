import type { Metadata } from "next";

import Drawer from "@/components/drawer";
import SectionLink from "@/components/ui/section-link";
import HomeScene from "@/components/scenes/home-scene";
import AboutScene from "@/components/scenes/about-scene";
import ProjectsScene from "@/components/scenes/projects-scene";
import ExperienceScene from "@/components/scenes/experience-scene";
import StackScene from "@/components/scenes/stack-scene";
import EducationScene from "@/components/scenes/education-scene";
import IntroductionScene from "@/components/scenes/introduction-scene";

import { cookies } from "next/headers";

const sageAssets = [
  "/models/sage/scene.gltf",
  "/models/sage/scene.bin",
  "/models/sage/textures/CS_Thorne_S0_Hair_MI_baseColor.png",
  "/models/sage/textures/CS_Thorne_S0_Hair_MI_normal.png",
  "/models/sage/textures/CS_Thorne_S0_MI_baseColor.png",
  "/models/sage/textures/CS_Thorne_S0_MI_normal.png",
  "/models/sage/textures/TP_Core_Eye_MI_Sage_baseColor.png",
  "/models/sage/textures/TP_Core_Eye_MI_Sage_specularf0.png",
];
{
  /* Home */
}
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
      {sageAssets.map((href) => (
        <link
          key={href}
          rel="preload"
          href={href}
          as={href.endsWith(".png") ? "image" : "fetch"}
          crossOrigin="anonymous"
        />
      ))}

      {/* Home */}
      <section id="home" className="pb-64">
        <HomeScene />
      </section>

      {/* Introduction */}
      <section
        id="introduction"
        aria-labelledby="introduction-heading"
        className="px-6 py-12 md:px-10 md:py-20"
      >
        <IntroductionScene />
      </section>

      {/* About */}
      <section id="about" className="px-6 py-12 md:px-10 md:py-20">
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
      <section id="projects" className="px-6 py-12 md:px-10 md:py-20">
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
      <section id="experience" className="px-6 py-12 md:px-10 md:py-20">
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
      <section id="stack" className="px-6 py-12 md:px-10 md:py-20">
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
      <section id="education" className="px-6 py-12 md:px-10 md:py-20">
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
