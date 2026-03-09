import { Gabarito, Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/common/navigation/Navbar.server";
import Footer from "@/components/Footer";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Funweek",
  description: "Hradec Králové 2028",

  openGraph: {
    title: "Funweek 2028",
    description: "#fw28",
    url: "https://funweek.cz",
    siteName: "Funweek",
    images: [
      {
        url: "/assets/images/brand/thumbnail.png",
        width: 1047,
        height: 628,
        alt: "funweek-thumbnail",
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Funweek 2028",
    description: "#fw28",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs" className={`${gabarito.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-funweek/20">
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
