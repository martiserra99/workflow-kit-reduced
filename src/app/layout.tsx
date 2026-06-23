import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "../styles/index.css";

import { cn } from "@/shared/lib/cn";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  style: "normal",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workflow Kit: React Flow Workflow Editor Template",
  description:
    "Everything you need to build a workflow editor on top of React Flow. Production-ready codebase with drag and drop, auto layout, undo/redo, and more.",
  appleWebApp: {
    title: "Workflow Kit",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(dmSans.variable, dmMono.variable)}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
