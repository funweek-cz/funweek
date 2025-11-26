import { Geist, Geist_Mono, Gabarito } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gabarito = Gabarito({
    variable: "--font-gabarito",
    weight: "400",
    subsets: ["latin"],
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
                url: "https://yrrpusyjrzcaqqnydsuo.supabase.co/storage/v1/object/sign/usables/thumbnail.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kZGU0ZDUyMC01MjUzLTQ0ZjYtYWE2NS0xNDljMTUyMDQ0NDIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1c2FibGVzL3RodW1ibmFpbC5wbmciLCJpYXQiOjE3NjQxMDM3MzEsImV4cCI6MTc5NTYzOTczMX0.F5JTqNpEaR24Z6AnM8VI6nyPCQkuD5vSPQp3AqSOyPE",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gabarito.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
