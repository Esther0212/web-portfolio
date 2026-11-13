import Drawer from "@/components/drawer";
import EducationScene from "@/components/scenes/education-scene";
import { cookies } from "next/headers";

export const instant = false;

export default async function EducationPage() {
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
      <section
        aria-labelledby="education-heading"
        className="min-h-screen py-12 md:py-20"
      >
        <h1
          id="education-heading"
          className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Education
        </h1>

        <div className="mt-10 md:mt-14">
          <EducationScene collapsible />
        </div>
      </section>
    </Drawer>
  );
}
