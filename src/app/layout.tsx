// app/layout.tsx (or src/app/layout.tsx in your structure)
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1️⃣ Define your metadata here
export const metadata: Metadata = {
  title: "My Next.js App",
  description: "An awesome Next.js application.",
  openGraph: {
    title: "My Next.js App — OG Title",
    description: "An awesome Next.js application with Open Graph metadata.",
    url: "https://nextjs-preview-seven.vercel.app/", 
    siteName: "My Next.js App",
    images: [
      {
        url: "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Next.js App — Twitter Title",
    description: "An awesome Next.js application with Twitter Card metadata.",
    images: ["https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
