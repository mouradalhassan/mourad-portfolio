import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { RING } from "@/lib/ring";
import Intro from "@/components/Intro";
import Cursor from "@/components/Cursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mourad-portfolio-mix.vercel.app"),
  title: "Mourad Al Hassan — Junior Full Stack Developer",
  description:
    "Junior full stack developer in Tripoli, Lebanon. 20+ bilingual (English/Arabic) websites, stores, and ordering systems built and deployed for real businesses.",
  keywords: [
    "junior full stack developer",
    "web developer Lebanon",
    "Next.js developer",
    "portfolio",
    "Mourad Al Hassan",
  ],
  authors: [{ name: "Mourad Al Hassan" }],
  openGraph: {
    title: "Mourad Al Hassan — Junior Full Stack Developer",
    description:
      "Junior full stack developer. 20+ bilingual websites built and deployed for real businesses in Lebanon.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${serif.variable} h-full antialiased`}
    >
      <head>
        {/* the portrait's head-turn poses start downloading with the page,
            but only on devices with a mouse (phones show a still image) */}
        {RING.map((r) => (
          <link
            key={r.src}
            rel="preload"
            as="image"
            href={r.src}
            media="(hover: hover) and (pointer: fine)"
          />
        ))}
      </head>
      <body className="min-h-full">
        <div id="progress" aria-hidden="true" />
        <Intro />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
