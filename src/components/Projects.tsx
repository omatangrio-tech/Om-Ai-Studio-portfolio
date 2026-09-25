import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Plus, Minus, ExternalLink, Github } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { BudgetSimulator } from './BudgetSimulator';
import { SWISS_EASE, usePrefersReducedMotion } from '../utils/animation';

export const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  const projects = PORTFOLIO_DATA.projects;

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 border-b border-[#111111] bg-[#FAFAF8] relative overflow-hidden">
      <div className="swiss-container">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-4 pb-8 sm:pb-12 border-b border-[#111111] items-baseline">
          <div className="col-span-12 sm:col-span-5 flex items-baseline gap-4">
            <span className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tighter leading-none">
              03
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E63312]">
              / APPLICATION INDEX
            </span>
          </div>

          <div className="col-span-12 sm:col-span-7 flex justify-start sm:justify-end text-xs font-semibold uppercase tracking-wider text-[#767676]">
            NUMBERED PRODUCTION SPECIFICATIONS · 2026
          </div>
        </div>

        {/* Section Headline */}
        <div className="py-12 sm:py-16 border-b border-[#111111]">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-[-0.03em] text-[#111111] uppercase max-w-5xl leading-[1.05]">
            Featured &amp; Published <span className="text-[#E63312]">Applications</span>.
          </h2>
        </div>

        {/* Interactive 3-Tap Budget Simulator Anchor Banner */}
        <div id="demo" className="py-6 border-b border-[#111111] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#E63312]" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#111111]">
              INTERACTIVE HARNESS: SIMPLE BUDGET TRACKER
            </span>
          </div>

          <button
            onClick={() => setShowDemo(!showDemo)}
            className="px-5 py-2.5 bg-[#111111] hover:bg-[#E63312] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 border border-[#111111]"
          >
            <span>{showDemo ? '[ HIDE 3-TAP DEMO ]' : '[ LAUNCH 3-TAP DEMO ]'}</span>
            {showDemo ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Simulator Section */}
        {showDemo && (
          <div className="py-8 border-b border-[#111111] bg-white">
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-[#767676]">
              TEST BENCH: VERIFY &le;3 TAPS ATOMIC COMMIT
            </div>
            <BudgetSimulator />
          </div>
        )}

        {/* Numbered Index / Table (NOT cards!) with Zigzag Animation & Hard Hover Invert */}
        <div className="border-b border-[#111111]">
          {projects.map((proj, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={proj.id}
                data-cursor-project-row="true"
                className="group border-b border-[#111111] last:border-b-0 transition-colors duration-150 hover:bg-[#111111] hover:text-white cursor-pointer"
                onClick={() => setActiveProject(activeProject?.id === proj.id ? null : proj)}
              >
                <div className="py-10 sm:py-14 px-2 sm:px-6 grid grid-cols-12 gap-6 items-baseline">
                  {/* Index Numeral: Hard cut, appears first */}
                  <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
                    whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.05,
                      delay: idx * 0.1,
                    }}
                    className="col-span-12 sm:col-span-2 lg:col-span-1"
                  >
                    <span className="text-3xl sm:text-5xl font-black tracking-tighter text-[#E63312] group-hover:text-[#E63312] block">
                      {proj.num}
                    </span>
                  </motion.div>

                  {/* Title & Description: Slides in from alternating directions (LEFT / RIGHT zigzag) */}
                  <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1 + 0.1,
                      ease: SWISS_EASE,
                    }}
                    className="col-span-12 sm:col-span-6 lg:col-span-5 space-y-2"
                  >
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] group-hover:text-white uppercase tracking-tight">
                        {proj.name}
                      </h3>
                      {proj.id === 'simple-budget-tracker' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#E63312] px-1.5 py-0.5">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#767676] group-hover:text-neutral-300 font-medium leading-relaxed">
                      {proj.tagline}
                    </p>
                  </motion.div>

                  {/* Tech Stack as Inline List */}
                  <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1 + 0.15,
                      ease: SWISS_EASE,
                    }}
                    className="col-span-12 sm:col-span-3 lg:col-span-5 text-xs text-[#767676] group-hover:text-neutral-300 font-semibold"
                  >
                    <span className="text-[#111111] group-hover:text-white font-bold block mb-1">
                      STACK:
                    </span>
                    <span>{proj.techStack.join(' · ')}</span>
                  </motion.div>

                  {/* Open / Close Indicator */}
                  <div className="col-span-12 sm:col-span-1 flex justify-end">
                    <span className="p-2 border border-[#111111] group-hover:border-white text-[#111111] group-hover:text-white">
                      {activeProject?.id === proj.id ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Expanded Details Drawer for Row */}
                {activeProject?.id === proj.id && (
                  <div
                    className="p-6 sm:p-10 border-t border-[#111111] group-hover:border-neutral-800 bg-[#FAFAF8] text-[#111111] space-y-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-12 gap-6 items-start">
                      <div className="col-span-12 lg:col-span-6 space-y-4">
                        <span className="text-xs font-black uppercase tracking-widest text-[#E63312]">
                          ARCHITECTURAL BREAKDOWN
                        </span>
                        <p className="text-sm sm:text-base font-medium leading-relaxed">
                          {proj.description}
                        </p>

                        <div className="p-4 border border-[#111111] bg-white space-y-2">
                          <span className="text-xs font-bold text-[#E63312] uppercase block">
                            OFFLINE &amp; STORAGE STRATEGY
                          </span>
                          <p className="text-xs sm:text-sm text-[#767676]">
                            {proj.detailedCaseStudy.offlineStrategy}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-12 lg:col-span-6 space-y-4">
                        <span className="text-xs font-black uppercase tracking-widest text-[#111111]">
                          PRODUCTION BENCHMARKS
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {proj.detailedCaseStudy.keyMetrics.map((m, i) => (
                            <div key={i} className="p-3 border border-[#111111] bg-white text-left">
                              <span className="text-lg sm:text-xl font-black text-[#111111] block">
                                {m.value}
                              </span>
                              <span className="text-[10px] font-bold text-[#767676] uppercase block">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
                          {proj.links.github && (
                            <a
                              href={proj.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-[#111111] text-white hover:bg-[#E63312] transition-colors flex items-center gap-1.5"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>VIEW SOURCE</span>
                            </a>
                          )}
                          {proj.id === 'simple-budget-tracker' && (
                            <button
                              onClick={() => {
                                setShowDemo(true);
                                const demoEl = document.getElementById('demo');
                                if (demoEl) demoEl.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="px-4 py-2 border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                            >
                              EXECUTE DEMO HARNESS &rarr;
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
