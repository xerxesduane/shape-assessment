import type { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://shape-fellowship-dubai.vercel.app"),
  title: {
    default: "S.H.A.P.E. Discovery | Fellowship Dubai",
    template: "%s | Fellowship Dubai",
  },
  description: "Discover your Spiritual Gifts, Heart, Abilities, Personality, and Experiences, then build a private ministry profile for serving at Fellowship Dubai.",
  applicationName: "Fellowship Dubai S.H.A.P.E. Discovery",
  keywords: ["Fellowship Dubai", "SHAPE assessment", "spiritual gifts", "church ministry", "serving", "Dubai church"],
  authors: [{ name: "Fellowship Dubai", url: "https://fellowshipdubai.com/" }],
  creator: "Fellowship Dubai",
  publisher: "Fellowship Dubai",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "/",
    siteName: "Fellowship Dubai S.H.A.P.E. Discovery",
    title: "Discover How God SHAPED You to Serve",
    description: "Explore your Spiritual Gifts, Heart, Abilities, Personality, and Experiences, then build a private, shareable ministry profile.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover How God SHAPED You to Serve",
    description: "Build your personal S.H.A.P.E. ministry profile with Fellowship Dubai.",
  },
  category: "religion and spirituality",
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#12263f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
