import Drawer from "@/components/drawer";
import Link from "next/link";
import { cookies } from "next/headers";

export const instant = false;

export default async function ProjectsPage() {
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
      <section className="min-h-screen px-6 py-8 md:px-10">
        <h1>Projects</h1>

        <p className="mt-6">
          Your full Projects content goes here.
        </p>

        <Link
        href="/#projects"
        className="font-display text-muted-foreground"
      >
        ← BACK TO HOME
      </Link>
      </section>
    </Drawer>
  );
}