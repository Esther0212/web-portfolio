import Drawer from "@/components/drawer";
import HomeScene from "@/components/home-scene";

import { cookies } from "next/headers";

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
          <span>© 2026 Esther Eblacas</span>

          <span>Designed and built from scratch.</span>
        </>
      }
    >
      {/* Home */}
      <section id="home">
        <HomeScene />
      </section>

      {/* About */}
      <section
        id="about"
        className="
          min-h-screen
          px-6 py-12
          md:px-10
        "
      >
        <h2
          className="
            text-3xl font-bold
          "
        >
          About
        </h2>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="
          min-h-screen
          px-6 py-12
          md:px-10
        "
      >
        <h2
          className="
            text-3xl font-bold
          "
        >
          Projects
        </h2>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="
          min-h-screen
          px-6 py-12
          md:px-10
        "
      >
        <h2
          className="
            text-3xl font-bold
          "
        >
          Experience
        </h2>
      </section>

      {/* Stack */}
      <section
        id="stack"
        className="
          min-h-screen
          px-6 py-12
          md:px-10
        "
      >
        <h2
          className="
            text-3xl font-bold
          "
        >
          Tech Stack
        </h2>
      </section>

      {/* Education */}
      <section
        id="education"
        className="
          min-h-screen
          px-6 py-12
          md:px-10
        "
      >
        <h2
          className="
            text-3xl font-bold
          "
        >
          Education
        </h2>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="
          min-h-screen
          px-6 py-12
          md:px-10
        "
      >
        <h2
          className="
            text-3xl font-bold
          "
        >
          Contact
        </h2>
      </section>
    </Drawer>
  );
}
