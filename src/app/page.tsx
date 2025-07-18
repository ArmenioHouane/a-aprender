'use client'

import Header from "@/components/header";
import Hero from "@/components/landing/Hero"
import Features from "@/components/landing/Features"
import Testimonials from "@/components/landing/Testimonials"
import Pricing from "@/components/landing/Pricing"
import Footer from "@/components/footer";

export default function Home() {
 

  return (
    <>
    <Header />
    <main className="min-h-screen bg-white dark:bg-gray-900">
    <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer/>
    </main>
    
    
    </>
  );
}
