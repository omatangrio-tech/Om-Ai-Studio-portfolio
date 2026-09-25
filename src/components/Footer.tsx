import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, ArrowUp, Copy, Check, Send } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SWISS_EASE, usePrefersReducedMotion } from '../utils/animation';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const prefersReduced = usePrefersReducedMotion();

  // Wordmark proximity hover state
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [hollowIndices, setHollowIndices] = useState<Set<number>>(new Set());
  const [isUnderlineFlashing, setIsUnderlineFlashing] = useState(false);
  const [isPointerSupported, setIsPointerSupported] = useState(false);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    if (hasFinePointer && canHover) {
      setIsPointerSupported(true);
    }

    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.developer.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !messageInput.trim()) return;
    setSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Letters of "PATEL OM" for independent alternating slide-in animation
  const nameLetters = [
    { char: 'P', fromLeft: true },
    { char: 'A', fromLeft: false },
    { char: 'T', fromLeft: true },
    { char: 'E', fromLeft: false },
    { char: 'L', fromLeft: true },
    { char: '\u00A0', fromLeft: false }, // non-breaking space
    { char: 'O', fromLeft: true },
    { char: 'M', fromLeft: false },
  ];

  const handleWordmarkMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerSupported || prefersReduced) return;
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    const cursorX = e.clientX;
    const newHollow = new Set<number>();

    letterRefs.current.forEach((el, idx) => {
      if (!el || nameLetters[idx].char === '\u00A0') return;
      const rect = el.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2;
      const distToCenter = Math.abs(cursorX - letterCenterX);
      const distToBox =
        cursorX < rect.left
          ? rect.left - cursorX
          : cursorX > rect.right
            ? cursorX - rect.right
            : 0;

      // Distance threshold: within ~80-100px of cursor X or directly over letter
      const threshold = Math.max(85, Math.min(110, rect.width * 0.8));
      if (distToBox === 0 || distToBox <= 35 || distToCenter <= threshold) {
        newHollow.add(idx);
      }
    });

    setHollowIndices((prev) => {
      if (prev.size === newHollow.size) {
        let isSame = true;
        for (const item of newHollow) {
          if (!prev.has(item)) {
            isSame = false;
            break;
          }
        }
        if (isSame) return prev;
      }
      return newHollow;
    });
  };

  const handleWordmarkMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerSupported || prefersReduced) return;
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    // Brief single-frame acknowledgment flash/thickening on underline
    setIsUnderlineFlashing(true);
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => {
      setIsUnderlineFlashing(false);
    }, 130);

    handleWordmarkMouseMove(e);
  };

  const handleWordmarkMouseLeave = () => {
    if (!isPointerSupported || prefersReduced) return;
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    // Return all letters to solid black after ~200ms delay
    leaveTimeoutRef.current = setTimeout(() => {
      setHollowIndices(new Set());
    }, 200);
  };

  return (
    <footer id="contact" className="pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 bg-[#FAFAF8] text-[#111111] relative overflow-hidden">
      <div className="swiss-container">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-4 pb-8 sm:pb-12 border-b border-[#111111] items-baseline">
          <div className="col-span-12 sm:col-span-5 flex items-baseline gap-4">
            <span className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tighter leading-none">
              06
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E63312]">
              / TRANSMITTAL &amp; CLOSING
            </span>
          </div>

          <div className="col-span-12 sm:col-span-7 flex justify-start sm:justify-end text-xs font-semibold uppercase tracking-wider text-[#767676]">
            PATEL OM · PRINCIPAL DISPATCH MEMORANDUM
          </div>
        </div>

        {/* Requisition / Contact Direct Box */}
        <div className="py-16 sm:py-20 border-b border-[#111111] grid grid-cols-12 gap-8 lg:gap-16 items-start">
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -40 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: SWISS_EASE }}
            className="col-span-12 lg:col-span-6 space-y-6"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#E63312]">
              DIRECT ENGAGEMENT CHANNEL
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] uppercase tracking-tight leading-tight">
              Initiate a Mobile Project <span className="text-[#E63312]">Specification</span>.
            </h2>
            <p className="text-sm sm:text-base text-[#767676] font-medium leading-relaxed max-w-xl">
              I partner with founders, technical leads, and indie studios looking to build fast, offline-first mobile software or eliminate bloat from existing React Native codebases.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleCopyEmail}
                className="px-5 py-3 bg-[#111111] hover:bg-[#E63312] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 border border-[#111111]"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'EMAIL COPIED' : 'COPY DIRECT EMAIL'}</span>
              </button>

              <a
                href={`mailto:${PORTFOLIO_DATA.developer.email}`}
                className="px-5 py-3 border border-[#111111] hover:bg-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                LAUNCH MAIL CLIENT &rarr;
              </a>
            </div>
          </motion.div>

          {/* Clean Swiss Form with Sharp 90-degree Corners */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 40 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1, ease: SWISS_EASE }}
            className="col-span-12 lg:col-span-6 border border-[#111111] p-6 sm:p-10 bg-white space-y-6"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#111111] block pb-2 border-b border-[#111111]">
              DISPATCH FORM // SPEC-2026
            </span>

            {submitted ? (
              <div className="py-8 text-left space-y-3">
                <span className="text-xs font-black text-[#E63312] uppercase tracking-widest block">
                  TRANSMISSION CONFIRMED
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#111111] uppercase">
                  Dispatch Received
                </h4>
                <p className="text-xs sm:text-sm text-[#767676] leading-relaxed">
                  Acknowledged. Patel Om reviews inquiries daily and will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold uppercase tracking-wider text-[#E63312] underline pt-4 cursor-pointer"
                >
                  Send another note &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={handleDispatch} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#111111] block">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 border border-[#111111] bg-[#FAFAF8] text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#E63312]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#111111] block">
                    Project Brief &amp; Platform Target *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Outline mobile goals, target timeline, and offline requirements..."
                    className="w-full px-4 py-3 border border-[#111111] bg-[#FAFAF8] text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#E63312] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#111111] hover:bg-[#E63312] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2 border border-[#111111]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>[ TRANSMIT DISPATCH REQUISITION ]</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* ONE HAIRLINE RULE ABOVE THE NAME */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="border-t border-[#111111] pt-12 sm:pt-16 mt-16 sm:mt-24">
          {/* "PATEL OM" Set at the Largest Scale on the Entire Site */}
          <div
            data-cursor-wordmark="true"
            className="relative overflow-visible pb-4 sm:pb-6 cursor-default pl-1 sm:pl-2"
            onMouseMove={handleWordmarkMouseMove}
            onMouseEnter={handleWordmarkMouseEnter}
            onMouseLeave={handleWordmarkMouseLeave}
          >
            <div className="flex flex-wrap items-baseline justify-start select-none overflow-visible">
              {nameLetters.map((item, idx) => {
                const isOutline =
                  !prefersReduced &&
                  isPointerSupported &&
                  hollowIndices.has(idx) &&
                  item.char !== '\u00A0';

                // For the leading letter 'P' (idx 0), slide up from y: 20 with 0 horizontal offset to guarantee it never sits outside the left container boundary
                const initialMotion = prefersReduced
                  ? { opacity: 0 }
                  : idx === 0
                    ? { opacity: 0, y: 24, x: 0 }
                    : { opacity: 0, x: item.fromLeft ? -30 : 30 };

                const inViewMotion = prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 1, x: 0, y: 0 };

                return (
                  <motion.span
                    key={idx}
                    ref={(el) => {
                      letterRefs.current[idx] = el;
                    }}
                    initial={initialMotion}
                    whileInView={inViewMotion}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.05,
                      ease: SWISS_EASE,
                    }}
                    className={`wordmark-letter text-[11.5vw] min-[400px]:text-[12vw] leading-[0.85] sm:text-[110px] md:text-[150px] lg:text-[195px] xl:text-[230px] font-black tracking-tight sm:tracking-[-0.04em] uppercase inline-block ${
                      isOutline ? 'is-outline' : ''
                    }`}
                  >
                    {item.char}
                  </motion.span>
                );
              })}
            </div>

            {/* Thin Red Underline Draws Itself Left to Right Once Assembled with Flash/Thickening on hover initiation */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { scaleX: 0 }}
              whileInView={prefersReduced ? { opacity: 1 } : { scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: 0.9,
                ease: SWISS_EASE,
              }}
              style={{ transformOrigin: 'left' }}
              className="w-full h-[4px] sm:h-[8px] lg:h-[12px] mt-2 sm:mt-4 overflow-visible"
              aria-hidden="true"
            >
              <div
                className="w-full h-full bg-[#E63312] origin-top transition-transform duration-120 ease-out"
                style={{
                  transform: isUnderlineFlashing ? 'scaleY(1.75)' : 'scaleY(1)',
                }}
              />
            </motion.div>
          </div>

          {/* Small Meta Line Beneath Name: Contact links & Role that fade/slide up after name completes */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: 1.25,
              ease: SWISS_EASE,
            }}
            className="pt-8 sm:pt-12 grid grid-cols-12 gap-6 items-baseline border-t border-[#111111]"
          >
            {/* Role & Tagline */}
            <div className="col-span-12 md:col-span-6 space-y-1">
              <span className="text-sm font-bold uppercase tracking-tight text-[#111111] block">
                Patel Om · Independent Mobile App Developer
              </span>
              <span className="text-xs text-[#767676] block">
                React Native · Expo · Local SQLite · Zero Bloat Architecture
              </span>
            </div>

            {/* Links & Scroll to Top */}
            <div className="col-span-12 md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-6 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <a
                href={PORTFOLIO_DATA.developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E63312] transition-colors flex items-center gap-1"
              >
                <span>GitHub</span>
              </a>

              <a
                href={PORTFOLIO_DATA.developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E63312] transition-colors flex items-center gap-1"
              >
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${PORTFOLIO_DATA.developer.email}`}
                className="hover:text-[#E63312] transition-colors"
              >
                <span>Email</span>
              </a>

              <button
                onClick={scrollToTop}
                className="p-2 border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer ml-2 flex items-center gap-1.5"
                title="Return to top"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
