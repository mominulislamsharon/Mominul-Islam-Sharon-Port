import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: "Mominul Islam Sharon — Full Stack MERN Developer",
  description:
    "Full Stack MERN Developer building modern, scalable, high-performance web apps.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  );
}
