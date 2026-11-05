import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/ssr";

import { getButtonStyles } from "@/components/ui/button";
import ResumePreview from "@/components/ui/resume-preview";
import Tooltip from "@/components/ui/tooltip";
import SagePortrait from "@/components/3d/sage-portrait";

export default function IntroductionScene() {
  const buttonClass = `
    inline-flex min-h-11 items-center justify-center gap-2
    rounded-lg px-5 py-3
    font-display text-sm
    transition-colors
    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-ring
  `;

  const socialClass = `
    inline-flex size-11 items-center justify-center
    rounded-lg text-muted-foreground
    transition-colors hover:text-primary
    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-ring
  `;

  const resumeHref = "/files/esther-beuthel-eblacas-resume.pdf";
  const githubHref = "https://github.com/Esther0212";
  const linkedinHref = "https://www.linkedin.com/in/estherebs/";
  const email = "eblacas.estherbeuthel@gmail.com";

  return (
    <div className="grid w-full items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      {/* Introduction */}
      <div>
        <p className="flex items-center gap-3 font-display text-sm text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full bg-primary"
          />
          Open to software roles
        </p>

        <h2
          id="introduction-heading"
          className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Always learning, exploring, and{" "}
          <span className="text-primary">creating.</span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          I enjoy turning ideas into small projects and{" "}
          <span className="text-primary">learning as I build</span>. I’m
          exploring web development, trying new tools, and finding ways to{" "}
          <span className="text-primary">bring creativity into my work</span>.
          There’s still a lot I want to learn, and I’m taking it{" "}
          <span className="text-primary">one project at a time</span>.
        </p>

        {/* Résumé and contact */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {resumeHref && (
            <>
              <ResumePreview href={resumeHref} />

              <a
                href={resumeHref}
                download
                className={getButtonStyles("primary")}
              >
                <span className="inline-flex items-center gap-2">
                  Download Résumé
                </span>
              </a>
            </>
          )}

          <a
            href="#contact"
            className={`inline-flex items-center justify-center ${getButtonStyles("secondary")}`}
          >
            Contact
          </a>
        </div>

        {/* Social links */}
        <div className="mt-5 -ml-[11.5px] flex flex-wrap items-center gap-1 pl-[calc(1.25rem+1rem+2px+0.75rem)]">
          {githubHref && (
            <Tooltip
              content="GitHub"
              position="bottom"
              collapsedOnly={false}
              className="!w-auto shrink-0"
            >
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className={socialClass}
              >
                <GithubLogoIcon size={21} aria-hidden="true" />
              </a>
            </Tooltip>
          )}

          {linkedinHref && (
            <Tooltip
              content="LinkedIn"
              position="bottom"
              collapsedOnly={false}
              className="!w-auto shrink-0"
            >
              <a
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className={socialClass}
              >
                <LinkedinLogoIcon size={21} aria-hidden="true" />
              </a>
            </Tooltip>
          )}

          {email && (
            <Tooltip
              content="Email"
              position="bottom"
              collapsedOnly={false}
              className="!w-auto shrink-0"
            >
              <a
                href={`mailto:${email}`}
                aria-label="Email Esther"
                className={socialClass}
              >
                <EnvelopeSimpleIcon size={21} aria-hidden="true" />
              </a>
            </Tooltip>
          )}
        </div>
      </div>

      
{/* Interactive Sage 3D Model */}
<div className="relative mx-auto h-[450px] w-full max-w-[500px] lg:h-[550px]">
  <SagePortrait />
</div>

    </div>
  );
}
