// app/layout.tsx (or src/app/layout.tsx)
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

/**
 * This async function lets us dynamically fetch or generate metadata.
 * Here we simulate a 2-second delay to mock an API call (like AWS Amplify).
 */
export async function generateMetadata(): Promise<Metadata> {
  // Simulate a 2-second delay:
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Imagine you're fetching from AWS Amplify instead:
  // const response = await fetch("https://my-amplify-endpoint.com/metadata");
  // const data = await response.json();

  // Return the metadata object (static or based on fetched `data`)
  return {
    title: "My Next.js App (Dynamically Fetched)",
    description: "An awesome Next.js application with dynamic metadata.",
    openGraph: {
      title: "My Next.js App — OG Title (Dynamic)",
      description: "Open Graph metadata fetched with a 2-second simulated delay.",
      url: "https://nextjs-preview-seven.vercel.app/",
      siteName: "My Next.js App",
      images: [
        {
          url: "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=800&auto=format&fit=crop&q=60",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "My Next.js App — Twitter Title (Dynamic)",
      description: "Twitter Card metadata fetched with a 2-second simulated delay.",
      images: [
        "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=800&auto=format&fit=crop&q=60",
      ],
    },
  };
}

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
