import { cookies } from "next/headers";

import Drawer from "@/components/drawer";
import ExperienceScene from "@/components/scenes/experience-scene";

export const instant = false;

export default async function ExperiencePage() {
  const cookieStore = await cookies();
  const drawerOpen =
    cookieStore.get("portfolio-drawer-open")?.value === "true";

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
      <section
        aria-labelledby="experience-heading"
        className="min-h-screen px-6 py-12 md:px-10 md:py-20"
      >
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 md:mb-14">
          <h1
            id="experience-heading"
            className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Experience
          </h1>
        </div>

        <ExperienceScene full />
      </section>
    </Drawer>
  );
}