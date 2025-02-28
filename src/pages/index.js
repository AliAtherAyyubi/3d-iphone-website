import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Features from "@/components/Features";
import HowitWorks from "@/components/howitWork";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
    <Navbar />
      <Hero />
      <Highlights />
      {/* <Model /> */}
      <Features/>
      <HowitWorks/>
      <Footer/>
    </>
  );
}
