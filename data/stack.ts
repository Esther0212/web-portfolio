
type StackCategory = {
  id: string;
  title: string;
  items: string[];
};

export const stack: StackCategory[] = [
  {
    id: "languages",
    title: "Programming & markup languages",
    items: [
      "C++",
      "Python",
      "PHP",
      "Java",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
    ],
  },
  {
    id: "frontend",
    title: "Frontend frameworks & libraries",
    items: [
      "React.js",
      "Next.js",
      "React Router",
      "Tailwind CSS",
      "DaisyUI",
      "Base UI",
    ],
  },
  {
    id: "backend",
    title: "Backend technologies",
    items: [
      "Node.js",
      "Laravel",
    ],
  },
  {
    id: "mobile",
    title: "Mobile development",
    items: ["React Native"],
  },
  {
    id: "databases",
    title: "Databases & backend services",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Firebase Firestore",
      "Supabase",
    ],
  },
  {
    id: "deployment",
    title: "Cloud & deployment",
    items: [
      "Vercel",
      "GitHub Pages",
    ],
  },
  {
    id: "build-tools",
    title: "Build tools & package management",
    items: [
      "Vite",
      "npm",
    ],
  },
  {
    id: "apis",
    title: "APIs & integration",
    items: [
      "REST APIs",
      "Axios",
      "JSON",
      "Google Drive API",
      "Google APIs",
    ],
  },
  {
    id: "cms",
    title: "CMS & website builders",
    items: ["WordPress"],
  },
  {
    id: "developer-tools",
    title: "Development tools",
    items: [
      "Git",
      "GitHub",
      "Visual Studio Code",
      "PyCharm",
      "Dev-C++",
      "Prettier",
      "ESLint",
      "Postman",
      "Google Colab",
    ],
  },
  {
    id: "design",
    title: "Design & diagramming",
    items: [
      "Canva",
      "Excalidraw",
      "Mermaid",
    ],
  },
  {
    id: "productivity",
    title: "Productivity & collaboration",
    items: [
      "Discord",
      "Notion",
      "ClickUp",
      "Google Workspace",
      "Microsoft 365",
    ],
  },
];

// Flatten categories and remove duplicate names.
export const stackPreviewItems = [
  ...new Set(stack.flatMap((category) => category.items)),
];
