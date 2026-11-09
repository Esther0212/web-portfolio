export type AboutTextPart = {
  text: string;
  highlight?: boolean;
};

type AboutParagraph = {
  id: string;
  fullOnly?: boolean;
  parts: AboutTextPart[];
};

type HobbyIcon = "gaming" | "music" | "arts" | "language";

type AboutHobby = {
  id: string;
  title: string;
  icon: HobbyIcon;
  description: string;
  interests: string[];
};

type AboutData = {
  profile: {
    image: {
      src: string;
      alt: string;
    };
    facts: {
      label: string;
      value: string;
    }[];
  };
  headline: AboutTextPart[];
  biography: AboutParagraph[];
  exploring: string[];
  hobbies: AboutHobby[];
};

export const about: AboutData = {
  profile: {
    image: {
      src: "/about/esther-beuthel-eblacas-picture.png",
      alt: "Esther Beuthel Eblacas",
    },
    facts: [
      {
        label: "Based in",
        value: "Cagayan de Oro, Philippines",
      },
      {
        label: "Specialization",
        value: "Full-stack development",
      },
      {
        label: "Current goal",
        value: "Growing as a software developer",
      },
    ],
  },

  headline: [
    {
      text: "Learning how things work, ",
    },
    {
      text: "one project at a time",
      highlight: true,
    },
    {
      text: ".",
    },
  ],

  biography: [
    {
      id: "introduction",
      parts: [
        { text: "My name is " },
        {
          text: "Esther Beuthel G. Eblacas",
          highlight: true,
        },
        {
          text: ", a 23-year-old fresh graduate with a ",
        },
        {
          text: "Bachelor of Science in Information Technology",
          highlight: true,
        },
        {
          text: ", majoring in Database and Information Systems. I graduated on June 25, 2026, and I’m currently looking for opportunities to grow and apply my skills in the IT industry. Through my capstone project, I learned the importance of teamwork, patience, communication, and responsibility. I value collaboration, but I can also work independently and take ownership of my assigned tasks. I prefer understanding a problem before jumping into a solution, and I strive to be organized, adaptable, and committed to completing my work.",
        },
      ],
    },
    {
      id: "working-style",
      parts: [
        { text: "I’m patient when solving problems, " },
        {
          text: "detail-oriented",
          highlight: true,
        },
        { text: " when working on tasks, and " },
        {
          text: "willing to learn",
          highlight: true,
        },
        {
          text: " when faced with unfamiliar challenges. I value clear communication, teamwork, and responsibility, while also being comfortable working independently. I strive to ",
        },
        {
          text: "understand problems thoroughly",
          highlight: true,
        },
        {
          text: ", adapt to changing requirements, and complete my tasks with care.",
        },
      ],
    },
    {
      id: "continued-learning",
      fullOnly: true,
      parts: [
        {
          text: "As a fresh IT graduate, I’m continuing to ",
        },
        {
          text: "strengthen my software development skills",
          highlight: true,
        },
        {
          text: " and deepen my understanding of modern web and mobile technologies. I’m interested in improving my knowledge of application architecture, database management, code quality, and development best practices while exploring tools and technologies that can help me build more efficient, maintainable, and user-friendly applications.",
        },
      ],
    },
  ],

  exploring: [
    "daisyUI",
    "Next.js",
    "Express.js",
    "Prisma ORM",
    "Docker",
    "Playwright",
    "Vitest",
  ],

  hobbies: [
    {
      id: "gaming",
      title: "Gaming",
      icon: "gaming",
      description:
        "I enjoy playing a variety of games, particularly free-to-play titles that encourage strategy, teamwork, and creative thinking.",
      interests: ["Valorant", "PUBG", "R.E.P.O.", "Roblox", "Minecraft"],
    },
    {
      id: "music",
      title: "Music",
      icon: "music",
      description:
        "I enjoy Christian music, jazz, classical music, and OPM. I continue to develop my musical skills through piano study and playing at church, alongside playing the ukulele and guitar.",
      interests: ["Piano", "Ukulele", "Guitar"],
    },
    {
      id: "arts",
      title: "Arts",
      icon: "arts",
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
      id: "language",
      title: "Language",
      icon: "language",
      description:
        "I speak Filipino, English, and Visayan, specifically the Cagayan de Oro dialect. I am currently learning Mandarin Chinese and enjoy exploring other languages and cultures.",
      interests: ["Learning Mandarin Chinese", "Interested in Japanese"],
    },
  ],
};
