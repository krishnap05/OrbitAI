import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "OrbitAI",
  description: "AI-powered project & team management tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {/* Navbar always visible */}
        <Navbar />

        {/* Page content injected here */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
