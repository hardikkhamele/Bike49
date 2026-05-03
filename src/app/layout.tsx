import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300","400","500","600","700"],
});

export const metadata: Metadata = {
  title: "Bike49 - Premium Buy & Sell Bikes",
  description: "Find Your Perfect Ride. Buy and Sell your bike hassle-free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans text-[#051b3d] bg-[#f4f5f7] relative">
        {/* Subtle Blue Effect Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/60 via-[#f4f5f7] to-[#f4f5f7]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(5,27,61,0.02),_transparent_50%)]" />
        </div>

        <Navbar />
        <main className="flex-grow pt-16 relative z-10">
          {children}
        </main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}
