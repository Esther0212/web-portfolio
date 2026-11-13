import Image from "next/image";

import ExpandableCard from "@/components/ui/expandable-card";
import { education } from "@/data/education";

type EducationSceneProps = {
  collapsible?: boolean;
};

export default function EducationScene({
  collapsible = false,
}: EducationSceneProps) {
  return (
    <div className="education-list">
      {education.map((item) => (
        <ExpandableCard
          key={item.id}
          collapsible={collapsible}
          title={item.abbreviation}
          description={`${item.school} · ${item.campus}`}
          icon={
  <Image
    src={item.logo}
    alt=""
    width={56}
    height={56}
    className="education-logo"
  />
}
          meta={
            <>
              <time dateTime={item.startDate}>{item.startLabel}</time>
              <span aria-hidden="true"> – </span>
              <span className="sr-only"> to </span>
              <time dateTime={item.endDate}>{item.endLabel}</time>
            </>
          }
        >
          <div>
            <p className="text-eyebrow">{item.abbreviation}</p>

            <h3 className="education-degree">{item.degree}</h3>

            <p className="education-meta">Major in {item.major}</p>
            <p className="education-meta">GWA: {item.gwa}</p>
          </div>

          <div>
            <h4 className="education-subheading">Key courses</h4>

            <ul className="education-items">
              {item.courses.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="education-subheading">Achievements</h4>

            <ul className="education-items">
              {item.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        </ExpandableCard>
      ))}
    </div>
  );
}
