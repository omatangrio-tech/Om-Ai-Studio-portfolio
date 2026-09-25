/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Philosophy } from './components/Philosophy';
import { Skills } from './components/Skills';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Precision smooth scroll via Lenis
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth section-to-section navigation for internal hash links
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -80,
            duration: 0.9,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-[#111111] selection:bg-[#E63312] selection:text-white">
      {/* Swiss Precision Custom Cursor (Dot + Trailing Ring with Per-Section States) */}
      <CustomCursor />

      {/* 2px Precision Signal Red Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Swiss Modernist Fixed Navbar */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* 01 — Hero */}
        <Hero />

        {/* 02 — About / Manifesto */}
        <About />

        {/* 03 — Projects (Numbered Index / Table) */}
        <Projects />

        {/* 04 — Philosophy (Directives) */}
        <Philosophy />

        {/* 05 — Skills (Domain-Grouped Grid List) */}
        <Skills />
      </main>

      {/* Footer / Contact (Large-Scale PATEL OM & Transmittal) */}
      <Footer />
    </div>
  );
}
