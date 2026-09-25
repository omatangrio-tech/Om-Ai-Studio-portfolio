import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SWISS_EASE, usePrefersReducedMotion } from '../utils/animation';

export const Skills: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const domains = PORTFOLIO_DATA.skillsCategories;

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 border-b border-[#111111] bg-[#FAFAF8] relative overflow-hidden">
      <div className="swiss-container">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-4 pb-8 sm:pb-12 border-b border-[#111111] items-baseline">
          <div className="col-span-12 sm:col-span-5 flex items-baseline gap-4">
            <span className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tighter leading-none">
              05
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E63312]">
              / TECHNICAL INVENTORY
            </span>
          </div>

          <div className="col-span-12 sm:col-span-7 flex justify-start sm:justify-end text-xs font-semibold uppercase tracking-wider text-[#767676]">
            DOMAIN-ALIGNED STACK &amp; CAPABILITIES · 2026
          </div>
        </div>

        {/* Section Headline */}
        <div className="py-12 sm:py-16 border-b border-[#111111]">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-[-0.03em] text-[#111111] uppercase max-w-5xl leading-[1.05]">
            Engineering Stack &amp; <span className="text-[#E63312]">Capabilities</span>.
          </h2>
        </div>

        {/* Grouped by Domain: Grid-Aligned List with Hairline Rules Only (NO card shadows) */}
        <div className="space-y-20 py-16">
          {domains.map((category, catIdx) => (
            <div key={category.domain} className="space-y-6">
              {/* Domain Block Header */}
              <div className="grid grid-cols-12 gap-4 pb-4 border-b-2 border-[#111111] items-baseline">
                <div className="col-span-12 sm:col-span-4 flex items-baseline gap-3">
                  <span className="text-xs font-black text-[#E63312] uppercase tracking-widest">
                    DOMAIN 0{catIdx + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111111] uppercase tracking-tight">
                    {category.domain}
                  </h3>
                </div>
                <div className="col-span-12 sm:col-span-8 text-xs font-medium text-[#767676]">
                  {category.description}
                </div>
              </div>

              {/* Rows Fade In with Quick Hard Cut, Staggered Top to Bottom */}
              <div className="divide-y divide-[#111111] border-b border-[#111111]">
                {category.items.map((item, itemIdx) => {
                  const globalIdx = catIdx * 4 + itemIdx;

                  return (
                    <motion.div
                      key={item.name}
                      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 15 }}
                      whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.35,
                        delay: itemIdx * 0.08,
                        ease: SWISS_EASE,
                      }}
                      className="py-6 sm:py-8 grid grid-cols-12 gap-4 sm:gap-6 items-baseline hover:bg-white transition-colors px-2"
                    >
                      {/* Skill Name (Cols 1-4) */}
                      <div className="col-span-12 sm:col-span-4">
                        <span className="text-base sm:text-lg font-bold text-[#111111] uppercase tracking-tight">
                          {item.name}
                        </span>
                      </div>

                      {/* Detail (Cols 5-9) */}
                      <div className="col-span-12 sm:col-span-5">
                        <p className="text-xs sm:text-sm text-[#767676] font-medium leading-relaxed">
                          {item.detail}
                        </p>
                      </div>

                      {/* Proficiency & Years (Cols 10-12) */}
                      <div className="col-span-12 sm:col-span-3 flex items-baseline justify-between sm:justify-end gap-6 text-xs">
                        <span className="font-bold text-[#111111] uppercase tracking-wide">
                          {item.level}
                        </span>
                        <span className="font-bold text-[#E63312] tracking-wider">
                          {item.experience}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
