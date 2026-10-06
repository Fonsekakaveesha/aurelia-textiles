import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "AURELIA — Modern Essentials",
  description:
    "AURELIA — considered fashion for the quietly confident.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f7f4ee] text-[#171717] antialiased">
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}