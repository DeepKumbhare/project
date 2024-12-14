import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Templates } from '../components/landing/Templates';
import { Benefits } from '../components/landing/Benefits';
import { Testimonials } from '../components/landing/Testimonials';
import { Pricing } from '../components/landing/Pricing';
import { Header } from '../components/landing/Header';
import { Footer } from '../components/landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Templates />
        <Benefits />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}