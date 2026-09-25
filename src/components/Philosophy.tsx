import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SWISS_EASE, usePrefersReducedMotion } from '../utils/animation';

export const Philosophy: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="philosophy" className="py-16 sm:py-20 lg:py-24 border-b border-[#111111] bg-[#FAFAF8] relative overflow-hidden">
      <div className="swiss-container">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-4 pb-8 sm:pb-12 border-b border-[#111111] items-baseline">
          <div className="col-span-12 sm:col-span-5 flex items-baseline gap-4">
            <span className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tighter leading-none">
              04
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E63312]">
              / ENGINEERING DIRECTIVES
            </span>
          </div>

          <div className="col-span-12 sm:col-span-7 flex justify-start sm:justify-end text-xs font-semibold uppercase tracking-wider text-[#767676]">
            MANDATORY ARCHITECTURAL PRINCIPLES · ZERO BLOAT
          </div>
        </div>

        {/* Section Headline */}
        <div className="py-12 sm:py-16 border-b border-[#111111]">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-[-0.03em] text-[#111111] uppercase max-w-5xl leading-[1.05]">
            Governing Engineering <span className="text-[#E63312]">Directives</span>.
          </h2>
        </div>

        {/* Numbered Principles (Hairline Dividers, NO Cards) Staggering UP from Bottom */}
        <div className="divide-y divide-[#111111] border-b border-[#111111]">
          {PORTFOLIO_DATA.philosophy.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 50 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.12,
                ease: SWISS_EASE,
              }}
              className="py-14 sm:py-20 grid grid-cols-12 gap-8 items-start"
            >
              {/* Directive Number (Cols 1-2) */}
              <div className="col-span-12 sm:col-span-2">
                <span className="text-4xl sm:text-6xl font-black text-[#E63312] tracking-tighter leading-none block">
                  {item.num}
                </span>
                <span className="text-[11px] font-bold text-[#767676] uppercase tracking-widest mt-2 block">
                  DIRECTIVE
                </span>
              </div>

              {/* Title & Core Thesis (Cols 3-7) */}
              <div className="col-span-12 sm:col-span-5 space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#111111]">
                  CLAUSE // {item.title.toUpperCase()}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] uppercase tracking-tight leading-snug">
                  "{item.thesis}"
                </h3>
              </div>

              {/* Architectural Rationale (Cols 8-12) */}
              <div className="col-span-12 sm:col-span-5 space-y-3 sm:pt-6">
                <span className="text-xs font-bold text-[#767676] uppercase tracking-wider block">
                  ARCHITECTURAL RATIONALE:
                </span>
                <p className="text-sm sm:text-base text-[#767676] font-medium leading-relaxed">
                  {item.rationale}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
