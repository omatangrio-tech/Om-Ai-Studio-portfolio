import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SWISS_EASE, usePrefersReducedMotion } from '../utils/animation';

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ target, prefix = '', suffix = '', duration = 1.0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    let start = 0;
    const startTime = performance.now();
    const totalDuration = duration * 1000;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / totalDuration);
      // Hard ease out
      const easeVal = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeVal * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(frame);
  }, [isInView, target, duration, prefersReduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

export const Hero: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();

  // Headline lines to stagger from the LEFT (~80ms apart)
  const headlineLines = [
    { text: "Building", highlight: false },
    { text: "focused,", highlight: false },
    { text: "no-nonsense", highlight: true },
    { text: "mobile tools.", highlight: false },
  ];

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 border-b border-[#111111] bg-[#FAFAF8] overflow-hidden">
      <div className="swiss-container">
        {/* Top 12-Column Index & Classification Header */}
        <div className="grid grid-cols-12 gap-4 pb-8 sm:pb-12 border-b border-[#111111] items-baseline">
          {/* Left: Large Section Index Numeral */}
          <div className="col-span-12 sm:col-span-4 flex items-baseline gap-4">
            <span className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tighter leading-none">
              01
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E63312]">
              / SPECIFICATION
            </span>
          </div>

          {/* Right: Metadata sliding in from the RIGHT */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 40 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.35,
              ease: SWISS_EASE,
            }}
            className="col-span-12 sm:col-span-8 flex flex-wrap items-baseline justify-start sm:justify-end gap-x-6 gap-y-1 text-xs font-semibold uppercase tracking-wider text-[#767676]"
          >
            <span>DISCIPLINE: INDEPENDENT MOBILE ENGINEERING</span>
            <span className="hidden md:inline text-[#111111] font-bold">·</span>
            <span>SYSTEM: REACT NATIVE &amp; LOCAL SQLITE</span>
            <span className="hidden md:inline text-[#111111] font-bold">·</span>
            <span className="text-[#111111] font-bold">PATEL OM</span>
          </motion.div>
        </div>

        {/* Main Asymmetric Grid: Extreme Scale Headline (120-180px Desktop) with Calibrated Line-Height & Separation */}
        <div className="py-12 sm:py-20 lg:py-24 border-b border-[#111111]">
          <h1 className="text-[34px] min-[400px]:text-[40px] sm:text-[72px] md:text-[92px] lg:text-[124px] xl:text-[148px] font-black tracking-[-0.035em] text-[#111111] uppercase select-none leading-[1.02]">
            {headlineLines.map((line, idx) => (
              <motion.span
                key={idx}
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -60 }}
                animate={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: SWISS_EASE,
                }}
                className={`block text-left mb-2 sm:mb-3 lg:mb-4.5 last:mb-0 ${
                  line.text === "focused," ? "pb-1.5 sm:pb-2.5 lg:pb-3" : ""
                }`}
              >
                {line.highlight ? (
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#111111]">{line.text}</span>
                    {/* Structural signal red underline cleanly aligned below the text */}
                    <span
                      className="absolute left-0 bottom-1 sm:bottom-1.5 lg:bottom-2.5 w-full h-[5px] sm:h-[8px] lg:h-[12px] bg-[#E63312] z-0"
                      aria-hidden="true"
                    />
                  </span>
                ) : (
                  line.text
                )}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Secondary Asymmetric Row: Narrative Sub-Copy & Dual Action Buttons */}
        <div className="grid grid-cols-12 gap-6 sm:gap-10 py-12 sm:py-16 border-b border-[#111111] items-start">
          {/* Empty negative space / Index Label column in 12-col grid */}
          <div className="col-span-12 lg:col-span-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#E63312] block mb-2">
              DISPATCH CLAUSE
            </span>
            <span className="text-xs font-medium text-[#767676] block">
              Independent Practice · 2026
            </span>
          </div>

          {/* Sub-Copy: Left-aligned, Ragged-right (Col 4-8) */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -30 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.38, ease: SWISS_EASE }}
            className="col-span-12 lg:col-span-6 space-y-4"
          >
            <p className="text-lg sm:text-2xl font-bold tracking-tight text-[#111111] leading-[1.35]">
              I'm <span className="underline decoration-2 underline-offset-4 decoration-[#E63312]">Patel Om</span>. I design and engineer offline-first iOS and Android apps with React Native, Expo, and local SQLite.
            </p>
            <p className="text-sm sm:text-base text-[#767676] font-medium leading-relaxed">
              Zero surveillance, zero cloud lag, and zero unnecessary bloat. Software built to function as an instantaneous physical instrument.
            </p>
          </motion.div>

          {/* Action Buttons: Sharp 90-degree Corners (Col 9-12) with >=44px touch targets */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 30 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease: SWISS_EASE }}
            className="col-span-12 lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 pt-2"
          >
            <a
              href="#projects"
              className="min-h-[48px] px-6 py-3.5 bg-[#111111] hover:bg-[#E63312] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-none cursor-pointer text-left flex items-center justify-between group border border-[#111111]"
            >
              <span>[ View Projects ]</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#demo"
              className="min-h-[48px] px-6 py-3.5 bg-transparent hover:bg-[#111111] text-[#111111] hover:text-white border border-[#111111] text-xs sm:text-sm font-bold uppercase tracking-wider transition-none cursor-pointer text-left flex items-center justify-between group"
            >
              <span>Try 3-Tap Budget Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Stats Row: Strict 12-Column Grid with Large Numerals Counting Up */}
        <div className="pt-12 sm:pt-16">
          <div className="text-xs font-black uppercase tracking-widest text-[#767676] pb-6">
            TABLE 01.1 // SYSTEM TOLERANCES &amp; PRODUCTION METRICS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#111111] border-t border-b border-[#111111]">
            {/* Stat 01: 4 */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: 0,
                ease: SWISS_EASE,
              }}
              className="py-8 sm:px-6 lg:px-8 first:sm:pl-0 last:sm:pr-0 space-y-2"
            >
              <span className="text-xs font-bold text-[#E63312] uppercase tracking-widest block">
                INDEX 01
              </span>
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#111111] tracking-tighter leading-none">
                <AnimatedCounter target={4} duration={0.8} />
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#111111] pt-2 uppercase tracking-tight">
                Published Mobile Apps
              </p>
              <span className="text-[11px] text-[#767676] block">
                Shipped to App Store &amp; Play Store
              </span>
            </motion.div>

            {/* Stat 02: <3 taps */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: SWISS_EASE,
              }}
              className="py-8 sm:px-6 lg:px-8 space-y-2"
            >
              <span className="text-xs font-bold text-[#E63312] uppercase tracking-widest block">
                INDEX 02
              </span>
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#111111] tracking-tighter leading-none">
                &lt;<AnimatedCounter target={3} duration={0.7} />
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#111111] pt-2 uppercase tracking-tight">
                Tap Action Completion
              </p>
              <span className="text-[11px] text-[#767676] block">
                Max 3 taps to commit transactions
              </span>
            </motion.div>

            {/* Stat 03: 100% */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: SWISS_EASE,
              }}
              className="py-8 sm:px-6 lg:px-8 space-y-2"
            >
              <span className="text-xs font-bold text-[#E63312] uppercase tracking-widest block">
                INDEX 03
              </span>
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#111111] tracking-tighter leading-none">
                <AnimatedCounter target={100} suffix="%" duration={1.1} />
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#111111] pt-2 uppercase tracking-tight">
                Offline-First Local Storage
              </p>
              <span className="text-[11px] text-[#767676] block">
                Zero network dependency on boot
              </span>
            </motion.div>

            {/* Stat 04: 0 */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: SWISS_EASE,
              }}
              className="py-8 sm:px-6 lg:px-8 space-y-2"
            >
              <span className="text-xs font-bold text-[#E63312] uppercase tracking-widest block">
                INDEX 04
              </span>
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#E63312] tracking-tighter leading-none">
                <AnimatedCounter target={0} duration={0.5} />
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#111111] pt-2 uppercase tracking-tight">
                Third-Party Ad Trackers
              </p>
              <span className="text-[11px] text-[#767676] block">
                Clean binaries, zero user profiling
              </span>
            </motion.div>
          </div>

          {/* Structural Document End-of-Table / Section 01 Closure Bar */}
          <div className="pt-8 sm:pt-10 flex flex-wrap items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest text-[#767676]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#E63312]" />
              <span className="text-[#111111]">END TABLE 01.1 // SYSTEM TOLERANCES &amp; PRODUCTION METRICS</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#767676]">TOLERANCE STATUS: VERIFIED</span>
              <span className="hidden sm:inline text-[#111111]">·</span>
              <a href="#about" className="text-[#E63312] hover:underline underline-offset-4 font-black">
                PROCEED TO §02 MANIFESTO &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
