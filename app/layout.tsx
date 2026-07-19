import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shiv Consultancy",
  description: "All Insurance Solutions Under One Roof",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}