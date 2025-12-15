import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/layout/Navbar";

export const metadata: Metadata = {
  title: "Reacthform",
  description: "Next.js contact form and CRUD demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-5xl items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
