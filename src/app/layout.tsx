import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createMetadata, LdJsonScript } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createMetadata({
    title: "Tilt - Engineer as a Service (EaaS) - Expert Engineers On-Demand",
    description: "Engineer as a Service platform by Tilt. Get instant access to senior engineers for your projects. Book full-stack, backend, DevOps, and cloud engineering experts by the minute. Remote sessions via Zoom or Microsoft Teams.",
    keywords: [
      "engineer as a service",
      "EaaS",
      "engineering as a service",
      "hire engineers",
      "instant engineering help",
      "freelance engineers",
      "remote engineers",
      "full stack developers",
      "backend engineers",
      "DevOps experts",
      "cloud architects",
      "engineering consultants",
      "on-demand tech support",
      "book engineers online",
      "engineering services",
      "software development help",
      "Tilt engineering",
      "Tilt EaaS"
    ],
    url: "https://engineer-as-a-service.whytilt.com",
    siteName: "Tilt - Engineer as a Service (EaaS)",
    twitterHandle: "@tiltapp",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <LdJsonScript 
          config={{
            title: "Tilt - Engineer as a Service (EaaS) - Expert Engineers On-Demand",
            description: "Engineer as a Service platform by Tilt. Get instant access to senior engineers for your projects. Book full-stack, backend, DevOps, and cloud engineering experts by the minute. Remote sessions via Zoom or Microsoft Teams.",
            ldJsonType: 'Service',
          }} 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
