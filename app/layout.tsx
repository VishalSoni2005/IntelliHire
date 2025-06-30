import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import React from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IntelliHire",
  description:
    "A full-stack AI-powered platform for conducting mock interviews using voice-based AI and real-time code collaboration between recruiter and candidate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark">
      <body className={`${monaSans.className} antialiased `}>
        <ParticlesBackground /> 
        {children}
        <Toaster />
      </body>
    </html>
  );
}
