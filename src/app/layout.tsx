import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AppConfig } from "@/lib/app-config";

import "./globals.css";
import { defaultTheme } from "@/constants/theme";

export const metadata: Metadata = {
  title: AppConfig.name,
  description: AppConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme={defaultTheme}
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
