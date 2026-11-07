import AboutProfile from "@/components/ui/about-profile";

type AboutSceneProps = {
  full?: boolean;
};

const facts = [
  { label: "Based in", value: "Cagayan de Oro, Philippines" },
  { label: "Specialization", value: "Full-stack development" },
  { label: "Current goal", value: "Growing as a software developer" },
];

export default function AboutScene({ full = false }: AboutSceneProps) {
  return (
    <div className="about-layout">
      <AboutProfile />

      {/* Introduction and biography */}
      <div className="min-w-0">
        <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          From designing what users see to{" "}
          <span className="text-primary">building the logic behind it</span>, I
          enjoy exploring how every piece of an application comes together.
        </h2>

        <div className="content-flow mt-6 text-base leading-relaxed text-muted-foreground">
          <p>
            My name is{" "}
            <span className="text-primary">Esther Beuthel G. Eblacas</span>, a
            23-year-old fresh graduate with a{" "}
            <span className="text-primary">
              Bachelor of Science in Information Technology
            </span>
            , majoring in Database and Information Systems. I graduated on June
            25, 2026, and I’m currently looking for opportunities to grow and
            apply my skills in the IT industry. Through my capstone project, I
            learned the importance of teamwork, patience, communication, and
            responsibility. I value collaboration, but I can also work
            independently and take ownership of my assigned tasks . I prefer
            understanding a problem before jumping into a solution, and I strive
            to be organized, adaptable, and committed to completing my work.
          </p>

          <p>
            I’m patient when solving problems,{" "}
            <span className="text-primary">detail-oriented</span> when working
            on tasks, and <span className="text-primary">willing to learn</span>{" "}
            when faced with unfamiliar challenges. I value clear communication,
            teamwork, and responsibility, while also being comfortable working
            independently. I strive to{" "}
            <span className="text-primary">understand problems thoroughly</span>
            , adapt to changing requirements, and complete my tasks with care.
          </p>

          {full && (
            <>
              <p>
                As a fresh IT graduate, I’m continuing to{" "}
                <span className="text-primary">
                  strengthen my software development skills
                </span>{" "}
                and deepen my understanding of modern web and mobile
                technologies. I’m interested in improving my knowledge of
                application architecture, database management, code quality, and
                development best practices while exploring tools and
                technologies that can help me build more efficient,
                maintainable, and user-friendly applications.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
