import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "FreeTube Modern - Lecteur YouTube sans pub et privacy-focused",
  description: "Version web moderne de FreeTube. Regardez vos vidéos YouTube préférées sans publicités ni tracking. 100% gratuit et open-source.",
  keywords: ["youtube", "freetube", "sans pub", "privacy", "video", "player"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="font-sans antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
