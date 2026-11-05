import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Montserrat, Geist_Mono, Oxanium } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://esthereblacas.vercel.app"),
  title: {
    default: "Esther Beuthel Eblacas | Software Developer",
    template: "%s | Esther Beuthel Eblacas",
  },
  description:
    "I'm Esther Beuthel Eblacas. I build thoughtful web experiences through design and code. Explore my projects, skills, and experience.",
  openGraph: {
    title: "Esther Beuthel Eblacas | Software Developer",
    description:
      "Explore my projects, skills, and experience building thoughtful web experiences through design and code.",
    siteName: "Esther Beuthel Eblacas",
    type: "website",
    locale: "en_US",
  },
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored === "dark" ||
      (stored !== "light" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", dark);
  } catch (error) {
    // Use the default theme if storage is unavailable.
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-initializer" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>

      <body
        className={`
          font-body
          antialiased
          ${montserrat.variable} ${geistMono.variable} ${oxanium.variable}
        `}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
