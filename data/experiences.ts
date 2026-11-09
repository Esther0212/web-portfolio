export type ExperienceRole = {
  id: string;
  title: string;
  startDate: string;
  year: string;
  period: string;
  duration: string;
  responsibilities: string[];
  skills: string[];
};

export type ExperienceCompany = {
  id: string;
  name: string;
  initials: string;
  employmentType: string;
  duration: string;
  location: string;
  arrangement: string;
  roles: ExperienceRole[];
};

const experienceData: ExperienceCompany[] = [
  {
    id: "cocpo",
    name: "COCPO Headquarters",
    initials: "CO",
    employmentType: "Internship",
    duration: "3 months",
    location: "Cagayan de Oro, Northern Mindanao, Philippines",
    arrangement: "Onsite",
    roles: [
      {
        id: "cocpo-software-development",
        title: "Software Development Intern",
        startDate: "2026-03",
        year: "2026",
        period: "March 2026 – May 2026",
        duration: "2 months",
        responsibilities: [
          "Developed and maintained frontend and backend components of a centralized police reporting system.",
          "Contributed to a reporting system that allows police offices across Cagayan de Oro City to submit monthly reports and enables headquarters to review individual submissions and consolidated totals.",
          "Worked with React.js, JavaScript, Firebase, and Firestore in developing web-based system functionalities.",
          "Assisted in integrating Google APIs and Google Drive API to support system operations.",
          "Used Vercel for application deployment.",
        ],
        skills: [
          "React.js",
          "JavaScript",
          "Firebase",
          "Firestore",
          "Google APIs",
          "Google Drive API",
          "Vercel",
        ],
      },
      {
        id: "cocpo-graphic-design",
        title: "Graphic Designer Intern",
        startDate: "2026-02",
        year: "2026",
        period: "February 2026 – March 2026",
        duration: "1 month",
        responsibilities: [
          "Designed award layouts and plaque designs for recognition and awarding activities.",
          "Created visual materials that supported the office’s recognition initiatives and formal events.",
        ],
        // Add the design tools you actually used here.
        skills: ["Figma", "Canva", "Adobe Photoshop",],
      },
    ],
  },
];

export const experiences: ExperienceCompany[] = experienceData
  .map((company) => ({
    ...company,
    roles: [...company.roles].sort((a, b) =>
      b.startDate.localeCompare(a.startDate),
    ),
  }))
  .sort((a, b) => {
    const aLatest = a.roles[0]?.startDate ?? "";
    const bLatest = b.roles[0]?.startDate ?? "";

    return bLatest.localeCompare(aLatest);
  });
