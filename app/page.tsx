import Drawer from "@/components/drawer";
import { cookies } from "next/headers";

export const instant = false;

export default async function Home() {
  const cookieStore = await cookies();
  const drawerOpen = cookieStore.get("portfolio-drawer-open")?.value === "true";

  return (
    <Drawer
      defaultOpen={drawerOpen}
      title="Esther Eblacas"
      header={
        <span
          className="
            text-xs text-muted-foreground
          "
        >
          Software Developer
        </span>
      }
      footer={
        <>
          <span>© 2026 Esther Eblacas</span>

          <span>Built with Next.js and Tailwind CSS</span>
        </>
      }
    >
      {/* About */}
      <section
        id="about"
        className="
          min-h-screen
          px-6 py-12
          md:px-10
        "
      >
        <h1
          className="
            font-montserrat text-4xl font-bold
          "
        >
          {"Hi, I'm Esther!"}
        </h1>

        <p
          className="
            mt-4
            text-muted-foreground
          "
        >
          Software Developer
        </p>
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
