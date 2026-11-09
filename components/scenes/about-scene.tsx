import {
  GameControllerIcon,
  MusicNotesIcon,
  PaintBrushIcon,
  TranslateIcon,
} from "@phosphor-icons/react/ssr";

import AboutProfile from "@/components/ui/about-profile";
import Card from "@/components/ui/card";
import { ChipGroup } from "@/components/ui/chip";
import { about, type AboutTextPart } from "@/data/about";

type AboutSceneProps = {
  full?: boolean;
};

const hobbyIcons = {
  gaming: GameControllerIcon,
  music: MusicNotesIcon,
  arts: PaintBrushIcon,
  language: TranslateIcon,
};

function AboutText({ parts }: { parts: AboutTextPart[] }) {
  return (
    <>
      {parts.map((part, index) => (
        <span
          key={index}
          className={part.highlight ? "text-primary" : undefined}
        >
          {part.text}
        </span>
      ))}
    </>
  );
}

export default function AboutScene({ full = false }: AboutSceneProps) {
  const paragraphs = about.biography.filter(
    (paragraph) => full || !paragraph.fullOnly,
  );

  return (
    <>
      <div className="about-layout">
        <AboutProfile />

        <div className="min-w-0">
          <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            <AboutText parts={about.headline} />
          </h2>

          <div className="mt-12 space-y-8 text-base leading-relaxed text-muted-foreground">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.id}>
                <AboutText parts={paragraph.parts} />
              </p>
            ))}
          </div>
        </div>
      </div>

      {full && (
        <>
          {about.exploring.length > 0 && (
            <section
              aria-labelledby="exploring-heading"
              className="about-detail-section"
            >
              <h2 id="exploring-heading" className="text-eyebrow">
                Currently exploring
              </h2>

              <ChipGroup
                items={about.exploring}
                label="Currently exploring"
                className="mt-6"
              />
            </section>
          )}

          {about.hobbies.length > 0 && (
            <section
              aria-labelledby="hobbies-heading"
              className="about-detail-section"
            >
              <h2 id="hobbies-heading" className="text-eyebrow">
                Hobbies
              </h2>

              <div className="about-hobbies-grid mt-6">
                {about.hobbies.map((hobby) => {
                  const Icon = hobbyIcons[hobby.icon];

                  return (
                    <Card
                      key={hobby.id}
                      title={hobby.title}
                      icon={<Icon size={32} weight="duotone" />}
                    >
                      <p className="text-description mt-3">
                        {hobby.description}
                      </p>

                      <ul className="mt-5 space-y-2">
                        {hobby.interests.map((interest) => (
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
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
