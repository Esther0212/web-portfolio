import Link from "next/link";

import { ChipGroup } from "@/components/ui/chip";
import { experiences } from "@/data/experiences";

type ExperienceSceneProps = {
  full?: boolean;
};

export default function ExperienceScene({
  full = false,
}: ExperienceSceneProps) {
  if (!full) {
    return (
      <ul className="experience-preview">
        {experiences.map((company) => {
          const role = company.roles[0];

          if (!role) return null;

          return (
            <li key={company.id}>
              <Link
                href={`/experience#${role.id}`}
                className="experience-preview-row"
              >
                <span className="font-mono text-sm text-muted-foreground">
                  {role.year}
                </span>

                <span className="font-heading text-base font-medium">
                  {role.title}
                </span>

                <span className="experience-preview-company text-description">
                  {company.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ol className="experience-timeline">
      {experiences.map((company) => (
        <li key={company.id} className="experience-company">
          <div className="experience-company-rail" aria-hidden="true">
            <span className="experience-company-mark">{company.initials}</span>
          </div>

          <div className="min-w-0">
            <header>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {company.name}
              </h2>

              <p className="mt-3 font-display text-sm text-muted-foreground">
                {company.employmentType} • {company.duration}
              </p>

              <p className="text-description mt-2">
                {company.location} • {company.arrangement}
              </p>
            </header>

            <ol className="experience-roles">
              {company.roles.map((role) => (
                <li key={role.id} id={role.id} className="experience-role">
                  <span className="experience-role-dot" aria-hidden="true" />

                  <h3 className="font-heading text-lg font-medium sm:text-xl">
                    {role.title}
                  </h3>

                  <p className="mt-3 font-display text-sm text-muted-foreground">
                    {role.period} • {role.duration}
                  </p>

                  <ul className="experience-responsibilities text-description">
                    {role.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>

                  <ChipGroup
                    items={role.skills}
                    label={`Skills used as ${role.title}`}
                    className="mt-5"
                  />
                </li>
              ))}
            </ol>
          </div>
        </li>
      ))}
    </ol>
  );
}
