import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "../styles/index.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  style: "normal",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workflow Kit - A Complete Workflow Engine for React Flow",
  description:
    "Save months building workflow tools. Workflow Kit delivers layout algorithms, MVC, undo/redo, drag-and-drop, and more in one production-ready package.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-neutral-950">
      <body className={`${nunitoSans.variable} bg-neutral-950 font-sans`}>
        {children}
      </body>
    </html>
  );
}
