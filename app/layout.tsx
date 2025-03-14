import type { Metadata } from "next";
import { Poppins, Gilda_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const gildaDisplay = Gilda_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gilda-display",
});

export const metadata: Metadata = {
  title: "FetchAPaw - Finding homes for dogs in need",
  description:
    "FetchAPaw is a platform that helps you find homes for dogs in need",
  keywords: "dog adoption",
  openGraph: {
    title: "FetchAPaw - Finding homes for dogs in need",
    description:
      "FetchAPaw is a platform that helps you find homes for dogs in need",
    images: [
      {
        url: "/images/main-logo.png",
        width: 1200,
        height: 630,
        alt: "FetchAPaw logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`bg-main ${poppins.variable} ${gildaDisplay.variable}`}
    >
      <body className={`${poppins.className} px-10`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
