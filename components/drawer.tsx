"use client";

import {
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import {
  HandWavingIcon,
  UserIcon,
  LaptopIcon,
  BriefcaseIcon,
  BookmarkIcon,
  GraduationCapIcon,
  PhoneIcon,
} from "@phosphor-icons/react";

import Header from "./header";
import Main from "./main";
import Footer from "./footer";

import SidebarHome from "./ui/sidebar-home";
import SidebarNavigation, { type NavigationItem } from "./sidebar-navigation";

import ThemeToggle from "./ui/theme-toggle";
import SoundToggle from "./ui/sound-toggle";

export type DrawerItem = NavigationItem;

export type DrawerProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  items?: DrawerItem[];
  title?: ReactNode;
  brand?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode | null;
  defaultOpen?: boolean;
  onSoundChange?: (enabled: boolean) => void;
};

const defaultItems: DrawerItem[] = [
  {
    label: "Introduction",
    href: "/#introduction",
    icon: HandWavingIcon,
  },
  { label: "About", href: "/about", icon: UserIcon },
  { label: "Projects", href: "/projects", icon: LaptopIcon },
  {
    label: "Experience",
    href: "/experience",
    icon: BriefcaseIcon,
  },
  { label: "Stack", href: "/stack", icon: BookmarkIcon },
  {
    label: "Education",
    href: "/education",
    icon: GraduationCapIcon,
  },
  { label: "Contact", href: "/#contact", icon: PhoneIcon },
];

export default function Drawer({
  children,
  items = defaultItems,
  title = "Esther Eblacas",
  brand,
  header,
  footer,
  defaultOpen = false,
  onSoundChange,
  className = "",
  ...props
}: DrawerProps) {
  const drawerId = useId();

  // Shared drawer state
  const [isOpen, updateIsOpen] = useState(defaultOpen);

  // Update drawer state and remember preference
  const setIsOpen = (open: boolean) => {
    updateIsOpen(open);

    document.cookie = [
      `portfolio-drawer-open=${open}`,
      "Path=/",
      "Max-Age=31536000",
      "SameSite=Lax",
    ].join("; ");
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close drawer after selecting a navigation link on mobile
  const closeMobileDrawer = () => {
    if (window.matchMedia("(max-width: 1023.98px)").matches) {
      setIsOpen(false);
    }
  };

  return (
    <div
      id="top"
      className={`
        drawer lg:drawer-open
        min-h-dvh w-full min-w-0
        bg-sidebar text-foreground
        ${className}
      `}
    >
      {/* daisyUI drawer controller */}
      <input
        id={drawerId}
        type="checkbox"
        checked={isOpen}
        onChange={(event) => {
          setIsOpen(event.target.checked);
        }}
        className="
          drawer-toggle
        "
      />

      {/* Elevated content */}
      <div
        className="
          flex flex-col
          min-w-0
          m-2
          text-foreground
          bg-background
          rounded-[var(--radius)] border border-border
          shadow-[var(--shadow-elevated)]
          portfolio-content drawer-content relative
          sm:m-3
        "
      >
        <Header
          drawerId={drawerId}
          sidebarExpanded={isOpen}
          onToggleSidebar={toggleSidebar}
          title={title}
          actions={header}
        />

        <Main>{children}</Main>

        {footer !== null && <Footer>{footer}</Footer>}
      </div>

      {/* Sidebar */}
      <div
        className="
          max-lg:z-50
          drawer-side is-drawer-close:overflow-visible
        "
      >
        {/* Mobile overlay */}
        <label
          htmlFor={drawerId}
          aria-label="Close sidebar"
          className="
            drawer-overlay
          "
        />

        <aside
          id={`${drawerId}-panel`}
          className="
            flex flex-col overflow-visible
            h-[calc(100dvh-1.5rem)] min-h-0 min-w-0
            my-3 ml-3 mr-0
            text-sidebar-foreground
            bg-sidebar
            rounded-[var(--radius)]
            transition-[width]
            relative is-drawer-close:w-14 is-drawer-open:w-[12.5rem] duration-[var(--duration-slow)] ease-[var(--ease-standard)] motion-reduce:transition-none
          "
        >
          {/* Sidebar logo / Home */}
          <SidebarHome
            title={title}
            brand={brand}
            onNavigate={closeMobileDrawer}
          />

          {/* Navigation */}
          <SidebarNavigation items={items} onNavigate={closeMobileDrawer} />

          {/* Bottom controls */}
          <div
            className="
              z-10
              px-2 pb-3
              relative shrink-0
            "
          >
            <div
              className="
                mx-1 mb-3
                border-t border-sidebar-border
              "
            />

            <ul
              className="
                flex flex-col
                w-full min-w-0
                p-0
                gap-1
              "
            >
              <li
                className="
                  block
                  h-10
                  relative shrink-0 list-none
                "
              >
                <ThemeToggle />
              </li>

              <li
                className="
                  block
                  h-10
                  relative shrink-0 list-none
                "
              >
                <SoundToggle onChange={onSoundChange} />
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
