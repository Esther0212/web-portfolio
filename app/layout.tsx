import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Esther Eblacas | Portfolio",
  description: "Personal software developer portfolio",
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
        className="
          font-montserrat
          antialiased
        "
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
