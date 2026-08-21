import type { Metadata } from "next";
import { Public_Sans, Geist_Mono, Italianno } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/auth/Navbar";
import { CartProvider } from "@/context/cartContext";
import Footer from "@/components/shared/Footer";


const publicSans = Public_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const italianno = Italianno({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ember & Bean",
  description: "A cozy coffee shop, roasted with care.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${geistMono.variable} ${italianno.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}