import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SWISS_EASE, usePrefersReducedMotion } from '../utils/animation';

export const About: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 border-b border-[#111111] bg-[#FAFAF8] relative overflow-hidden">
      <div className="swiss-container">
        {/* Section Header: Large Index Numeral & Title */}
        <div className="grid grid-cols-12 gap-4 pb-8 sm:pb-12 border-b border-[#111111] items-baseline">
          <div className="col-span-12 sm:col-span-5 flex items-baseline gap-4">
            <span className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tighter leading-none">
              02
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E63312]">
              / MANIFESTO &amp; RECORD
            </span>
          </div>

          <div className="col-span-12 sm:col-span-7 flex justify-start sm:justify-end text-xs font-semibold uppercase tracking-wider text-[#767676]">
            PATEL OM · INDEPENDENT ENGINEERING PHILOSOPHY
          </div>
        </div>

        {/* Section Headline */}
        <div className="py-12 sm:py-16 border-b border-[#111111]">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-[-0.03em] text-[#111111] uppercase max-w-5xl leading-[1.05]">
            Why I build deliberately <span className="text-[#E63312]">minimal</span> mobile tools.
          </h2>
        </div>

        {/* Converging 12-Column Grid: Body (LEFT) & Pull-Quote (RIGHT) */}
        <div className="grid grid-cols-12 gap-8 lg:gap-14 py-16 sm:py-20 border-b border-[#111111] items-start">
          {/* Left Column (6 cols): Body text sliding in from LEFT */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -50 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: SWISS_EASE }}
            className="col-span-12 lg:col-span-6 space-y-6"
          >
            <div className="text-xs font-black uppercase tracking-widest text-[#E63312]">
              INDEPENDENT THESIS
            </div>

            <p className="text-base sm:text-xl font-bold text-[#111111] leading-snug">
              Every day, mobile software devolves further into bloated engagement machines designed to capture attention and monetize user habits rather than perform focused utility.
            </p>

            <p className="text-sm sm:text-base text-[#111111] font-normal leading-relaxed">
              In 2023, I chose the independent engineering path to build apps that do exactly what you opened them to do—quickly, privately, and reliably. No compulsory user signups, no bank-linking aggregators that disconnect, no battery-draining ad networks, and no cloud latency standing between you and your work.
            </p>

            <p className="text-sm sm:text-base text-[#767676] font-normal leading-relaxed">
              By prioritizing device hardware sovereignty through embedded SQLite and Write-Ahead Logging, software becomes immune to server deprecation, offline transit dead zones, and venture-funded monetization pivots.
            </p>
          </motion.div>

          {/* Right Column (6 cols): Pull-Quote sliding in from RIGHT on a slight delay */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 50 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: SWISS_EASE }}
            className="col-span-12 lg:col-span-6 border border-[#111111] p-8 sm:p-12 bg-white relative space-y-6"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#111111] block pb-2 border-b border-[#111111]">
              PRINCIPLE STATEMENT
            </span>

            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] tracking-tight leading-snug">
              "Software should feel like a finely weighted physical instrument — instantaneous, dependable in airplane mode, and completely silent until you ask for it."
            </blockquote>

            <div className="pt-4 border-t border-[#111111] flex items-baseline justify-between text-xs font-bold uppercase tracking-wider text-[#767676]">
              <span>— Patel Om</span>
              <span className="text-[#E63312]">Mobile Engineer</span>
            </div>
          </motion.div>
        </div>

        {/* Milestone / Revision Log Section: Stack in from BOTTOM individually */}
        <div className="pt-16 sm:pt-20">
          <div className="grid grid-cols-12 gap-4 pb-8 items-baseline">
            <div className="col-span-12 lg:col-span-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#E63312] block">
                CAREER REVISION LOG
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight mt-1">
                Engineering Milestones
              </h3>
            </div>
            <div className="col-span-12 lg:col-span-8 text-xs font-semibold uppercase tracking-wider text-[#767676]">
              A chronological record of architectural focus and software stewardship.
            </div>
          </div>

          <div className="divide-y divide-[#111111] border-t border-b border-[#111111]">
            {PORTFOLIO_DATA.milestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 35 }}
                whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.12,
                  ease: SWISS_EASE,
                }}
                className="py-8 sm:py-10 grid grid-cols-12 gap-6 items-baseline"
              >
                <div className="col-span-12 sm:col-span-3 lg:col-span-2">
                  <span className="text-lg sm:text-xl font-black text-[#E63312] tracking-tighter">
                    {item.year}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-4 lg:col-span-4">
                  <h4 className="text-base sm:text-lg font-bold text-[#111111] uppercase tracking-tight">
                    {item.title}
                  </h4>
                </div>
                <div className="col-span-12 sm:col-span-5 lg:col-span-6">
                  <p className="text-xs sm:text-sm text-[#767676] font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
