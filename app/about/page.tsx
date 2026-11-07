import { cookies } from "next/headers";
import {
  GameControllerIcon,
  MusicNotesIcon,
  PaintBrushIcon,
  TranslateIcon,
} from "@phosphor-icons/react/ssr";

import Drawer from "@/components/drawer";
import AboutScene from "@/components/scenes/about-scene";
import SectionLink from "@/components/ui/section-link";
import Chip from "@/components/ui/chip";
import Card from "@/components/ui/card";

export const instant = false;

const exploring = [
  "daisyUI",
  "Next.js",
  "Express.js",
  "Prisma ORM",
  "Docker",
  "Playwright",
  "Vitest",
];

const hobbies = [
  {
    title: "Gaming",
    icon: GameControllerIcon,
    description:
      "I enjoy playing a variety of games, particularly free-to-play titles that encourage strategy, teamwork, and creative thinking.",
    interests: ["Valorant", "PUBG", "R.E.P.O.", "Roblox", "Minecraft"],
  },
  {
    title: "Music",
    icon: MusicNotesIcon,
    description:
      "I enjoy Christian music, jazz, classical music, and OPM. I continue to develop my musical skills through piano study and playing at church, alongside playing the ukulele and guitar.",
    interests: ["Piano", "Ukulele", "Guitar"],
  },
  {
    title: "Arts",
    icon: PaintBrushIcon,
    description:
      "I create publication materials for our church and explore traditional and digital art. My interests include drawing, watercolor painting, and graphic design.",
    interests: [
      "Sketching",
      "Drawing",
      "Watercolor",
      "IbisPaint X",
      "Adobe Photoshop",
      "Canva",
    ],
  },
  {
    title: "Language",
    icon: TranslateIcon,
    description:
      "I speak Filipino, English, and Visayan, specifically the Cagayan de Oro dialect. I am currently learning Mandarin Chinese and enjoy exploring other languages and cultures.",
    interests: ["Learning Mandarin Chinese", "Interested in Japanese"],
  },
];

export default async function AboutPage() {
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
      <div className="px-6 py-12 md:px-10 md:py-20">
        <div className="about-content">
          <section aria-labelledby="about-heading">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <h1
                id="about-heading"
                className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
              >
                <span className="text-primary">-- 01</span> About
              </h1>

              <SectionLink href="/#about" label="BACK TO HOME" />
            </div>

            <AboutScene full />
          </section>

          <section
            aria-labelledby="exploring-heading"
            className="about-detail-section"
          >
            <h2 id="exploring-heading" className="text-eyebrow">
              Currently exploring
            </h2>

            <ul className="mt-6 flex flex-wrap gap-3">
              {exploring.map((technology) => (
                <li key={technology}>
                  <Chip>{technology}</Chip>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="hobbies-heading"
            className="about-detail-section"
          >
            <h2 id="hobbies-heading" className="text-eyebrow">
              Hobbies
            </h2>

            <div className="about-hobbies-grid mt-6">
              {hobbies.map(({ title, icon: Icon, description, interests }) => (
                <Card
                  key={title}
                  title={title}
                  icon={<Icon size={32} weight="duotone" />}
                >
                  <p className="text-description mt-3">{description}</p>

                  <ul className="mt-5 space-y-2">
                    {interests.map((interest) => (
                      <li
                        key={interest}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Icon
                          size={16}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-primary"
                        />

                        <span>{interest}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Drawer>
  );
}
