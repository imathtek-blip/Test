import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Studio Boudoir - Photographie Boudoir, Érotique & Mode",
  description: "Studio de photographie professionnelle spécialisé en boudoir, érotique et mode. Shooting photo 300€ sans limite de temps ni de photos éditées.",
  keywords: ["photographie boudoir", "photo érotique", "studio photo", "mode", "shooting photo"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
