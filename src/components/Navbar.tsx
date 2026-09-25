import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SWISS_EASE, usePrefersReducedMotion } from '../utils/animation';

export const Navbar: React.FC = () => {
  const [pastHero, setPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Determine if scrolled past the hero section
      const heroEl = document.querySelector('section');
      const threshold = heroEl ? heroEl.offsetHeight - 120 : 350;
      setPastHero(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile full-screen overlay is open and toggle helper class
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
      // Ensure zero horizontal scroll position immediately on open
      if (overlayRef.current) {
        overlayRef.current.scrollLeft = 0;
      }
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { num: '§01', name: 'About', href: '#about' },
    { num: '§02', name: 'Projects', href: '#projects' },
    { num: '§03', name: 'Philosophy', href: '#philosophy' },
    { num: '§04', name: 'Skills', href: '#skills' },
    { num: '§05', name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Navbar Header */}
      <header
        className={`fixed top-0 left-0 right-0 ${
          mobileMenuOpen ? 'z-[9000]' : 'z-50'
        } bg-[#FAFAF8] transition-colors duration-150 h-16 sm:h-20 flex items-center ${
          pastHero
            ? 'border-b border-[#111111] bg-[#FAFAF8]/95 backdrop-blur-xs'
            : 'border-b border-transparent'
        }`}
      >
        <div className="swiss-container w-full">
          {/* Strict 12-Column Grid Alignment */}
          <div className="grid grid-cols-12 items-center">
            {/* Logo / Brand: Occupies Left Columns (1–3 on Desktop, 1–8 on Mobile/Tablet <1024px) */}
            <div className="col-span-8 lg:col-span-3 flex items-baseline">
              <a href="#" className="inline-flex items-baseline gap-2.5 group cursor-pointer py-2">
                <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-[#111111] uppercase group-hover:text-[#E63312] transition-none leading-none">
                  {PORTFOLIO_DATA.developer.name}
                </span>
                <span className="hidden xl:inline text-[11px] font-bold text-[#767676] uppercase tracking-wider leading-none">
                  / MOBILE ENGINEER
                </span>
              </a>
            </div>

            {/* Middle Defined Block: 5 Nav Items with STRICT EQUAL Mathematical Spacing on Desktop (>=1024px) */}
            <nav className="hidden lg:grid lg:grid-cols-5 lg:col-span-7 items-center text-center px-1 lg:px-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group inline-flex items-baseline justify-center px-1 lg:px-2 py-1.5 text-xs lg:text-sm font-bold text-[#111111] hover:bg-[#111111] hover:text-white transition-none cursor-pointer whitespace-nowrap"
                >
                  {/* Numeral and Label sit on the exact same typographic baseline */}
                  <span className="text-[#E63312] font-black mr-1 sm:mr-1.5 leading-none">
                    {link.num}
                  </span>
                  <span className="leading-none group-hover:text-white">
                    {link.name}
                  </span>
                </a>
              ))}
            </nav>

            {/* Right Action on Desktop (>=1024px): Structural vertical divider strictly contained to 24px + Anchored CTA Button */}
            <div className="hidden lg:flex lg:col-span-2 items-center justify-end">
              {/* Contained hairline vertical divider (strictly 24px height, zero bleed) */}
              <span
                className="w-[1px] h-6 bg-[#111111] mr-3 lg:mr-5 shrink-0 inline-block"
                aria-hidden="true"
              />
              <a
                href="#contact"
                className="px-3 lg:px-5 py-2.5 bg-[#111111] hover:bg-[#E63312] text-white text-[11px] lg:text-xs font-bold uppercase tracking-wider transition-none cursor-pointer border border-[#111111] shrink-0 text-center leading-none"
              >
                Get in Touch
              </a>
            </div>

            {/* Mobile/Tablet Screen (<1024px): Grotesk "MENU" text trigger with >=44px touch target & tap state */}
            <div className="col-span-4 lg:hidden flex justify-end">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(true)}
                className="min-h-[44px] min-w-[64px] px-3.5 py-2 border border-[#111111] text-xs font-black uppercase tracking-widest text-[#111111] hover:bg-[#111111] hover:text-white rounded-none shadow-none transition-none cursor-pointer flex items-center justify-center select-none"
                aria-label="Open Navigation Index"
              >
                MENU
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Bleed 100vw x 100dvh Swiss Overlay Menu Rendered Standalone (NOT inside header flexbox) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={overlayRef}
            key="mobile-nav-overlay"
            data-mobile-menu="true"
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: -20 }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 1, y: 0 }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: -16 }
            }
            transition={{
              duration: 0.3,
              ease: SWISS_EASE,
            }}
            className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-full h-[100dvh] max-w-[100vw] max-h-[100dvh] m-0 z-[9000] bg-[#111111] text-white rounded-none shadow-none overflow-y-auto overflow-x-hidden mobile-menu-scroll overscroll-contain select-none box-border"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '100vw',
              height: '100dvh',
              margin: 0,
              borderRadius: 0,
              boxShadow: 'none',
              boxSizing: 'border-box',
              overflowX: 'hidden',
            }}
          >
            {/* Inner Content Container: Strict full-width box with safe padding-bottom */}
            <div
              className="w-full max-w-full box-border min-h-full flex flex-col justify-between px-4 sm:px-8 md:px-10 lg:px-12 pt-6 sm:pt-8 pb-16 sm:pb-20 overflow-x-hidden"
              style={{
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
                overflowX: 'hidden',
                paddingBottom: 'max(4.5rem, calc(2.5rem + env(safe-area-inset-bottom, 24px)))',
              }}
            >
              {/* Top Bar inside Overlay */}
              <div className="w-full max-w-full box-border flex items-center justify-between pb-5 sm:pb-6 border-b border-white/20 shrink-0 gap-3 overflow-x-hidden">
                <span className="text-lg sm:text-xl font-black uppercase tracking-tight text-white truncate min-w-0">
                  {PORTFOLIO_DATA.developer.name}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-11 px-4 sm:px-5 shrink-0 bg-white border border-white text-[#111111] hover:bg-[#E63312] hover:border-[#E63312] hover:text-white rounded-none shadow-none transition-none cursor-pointer inline-flex items-center justify-center whitespace-nowrap select-none gap-2 text-xs font-black uppercase tracking-wider"
                  aria-label="Close Navigation Index"
                >
                  <span className="leading-none">CLOSE</span>
                  <span className="inline-flex items-center justify-center leading-none gap-[1px]">
                    <span className="leading-none">[</span>
                    <span className="text-sm font-black leading-none pb-[1px]">&times;</span>
                    <span className="leading-none">]</span>
                  </span>
                </motion.button>
              </div>

              {/* Large Numbered Links in Pure Swiss Typographic Scale with Pure Vertical Fade-Slide */}
              <div className="w-full max-w-full box-border py-6 sm:py-8 space-y-4 shrink-0 overflow-x-hidden">
                <motion.div
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{
                    duration: 0.25,
                    delay: prefersReduced ? 0 : 0.06,
                    ease: SWISS_EASE,
                  }}
                  className="w-full text-xs font-black text-[#E63312] uppercase tracking-widest mb-3 sm:mb-4 truncate"
                >
                  SPECIFICATION INDEX // SECTIONS
                </motion.div>

                <div className="w-full max-w-full box-border divide-y divide-white/15 border-t border-b border-white/15 overflow-x-hidden">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      whileTap={{ scale: 0.98 }}
                      initial={
                        prefersReduced
                          ? { opacity: 0 }
                          : { opacity: 0, y: 10 }
                      }
                      animate={
                        prefersReduced
                          ? { opacity: 1 }
                          : { opacity: 1, y: 0 }
                      }
                      exit={
                        prefersReduced
                          ? { opacity: 0 }
                          : { opacity: 0, y: -8 }
                      }
                      transition={{
                        duration: 0.3,
                        delay: prefersReduced ? 0 : 0.08 + idx * 0.05,
                        ease: SWISS_EASE,
                      }}
                      className="w-full max-w-full box-border group flex items-baseline justify-between py-4 sm:py-5 min-h-[48px] sm:min-h-[52px] text-[clamp(1.2rem,5.5vw,2.25rem)] sm:text-4xl font-black uppercase tracking-tight text-white hover:text-[#E63312] transition-none cursor-pointer rounded-none overflow-hidden"
                      style={{ width: '100%', boxSizing: 'border-box' }}
                    >
                      <span
                        className="min-w-0 flex-1 truncate pr-3 group-hover:translate-x-1 transition-transform duration-100 text-left"
                        style={{ minWidth: 0 }}
                      >
                        {link.name}
                      </span>
                      <span
                        className="shrink-0 text-lg sm:text-2xl text-[#E63312] font-black pl-3 text-right"
                        style={{ flexShrink: 0 }}
                      >
                        {link.num}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Bottom Dispatch Zone with Touch Requisition Button (Guaranteed safe margin) */}
              <motion.div
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  duration: 0.3,
                  delay: prefersReduced ? 0 : 0.1 + navLinks.length * 0.05,
                  ease: SWISS_EASE,
                }}
                className="w-full max-w-full box-border pt-5 sm:pt-6 border-t border-white/20 space-y-4 shrink-0 mt-auto overflow-x-hidden"
              >
                <div className="w-full max-w-full box-border flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-xs font-semibold text-neutral-400 overflow-x-hidden">
                  <span className="break-words max-w-full">PATEL OM · INDEPENDENT MOBILE ENGINEER</span>
                  <span className="text-white font-bold break-all">{PORTFOLIO_DATA.developer.email}</span>
                </div>
                <motion.a
                  whileTap={{ scale: 0.97 }}
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full max-w-full box-border min-h-[48px] flex items-center justify-center py-3.5 px-4 bg-[#E63312] hover:bg-white hover:text-[#111111] text-white text-center text-xs font-black uppercase tracking-widest rounded-none shadow-none transition-none border border-[#E63312]"
                >
                  GET IN TOUCH / TRANSMIT REQUISITION &rarr;
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
