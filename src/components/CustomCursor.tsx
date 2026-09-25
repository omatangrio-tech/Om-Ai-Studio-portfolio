import React, { useEffect, useRef, useState } from 'react';

export type CursorSection = 'hero' | 'about' | 'projects' | 'philosophy' | 'skills' | 'contact';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [hasMovedState, setHasMovedState] = useState(false);

  // Active section tracked via IntersectionObserver and scroll fallback
  const [activeSection, setActiveSection] = useState<CursorSection>('hero');
  const [isHoveredProjectRow, setIsHoveredProjectRow] = useState(false);
  const [isHoveredInteractive, setIsHoveredInteractive] = useState(false);
  const [isHoveredWordmark, setIsHoveredWordmark] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const [isOverMenu, setIsOverMenu] = useState(false);

  useEffect(() => {
    // Gracefully disable on touch devices (mobile & tablet without fine pointer)
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    // Only actual touch-only devices without fine pointer should have custom cursor disabled
    if (!hasFinePointer) {
      return;
    }

    setIsSupported(true);
    document.body.classList.add('has-custom-cursor');

    // Observe body class changes to immediately catch mobile-menu-open state
    const checkMenuState = () => {
      const open = document.body.classList.contains('mobile-menu-open');
      setIsOverMenu(open);
    };
    const bodyObserver = new MutationObserver(checkMenuState);
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Section detection via IntersectionObserver with robust viewport threshold
    const sectionIds: CursorSection[] = ['hero', 'about', 'projects', 'philosophy', 'skills', 'contact'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry with the highest visible ratio
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topVisible = visibleEntries[0];
          const newSection = topVisible.target.id as CursorSection;
          if (sectionIds.includes(newSection)) {
            setActiveSection(newSection);
          }
        }
      },
      {
        root: null,
        rootMargin: '-10% 0px -25% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    // Scroll fallback to verify section position in case user jumps
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el.offsetTop <= scrollPos) {
          const sec = el.id as CursorSection;
          if (sectionIds.includes(sec)) {
            setActiveSection(sec);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth trailing physics
    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let hasMoved = false;
    let rafId: number;

    const updateElementHoverState = (target: Element | null) => {
      // Check text input/textarea to let system I-beam or native selection take over cleanly
      const isInput = !!target?.closest('input, textarea');
      setIsInputActive(isInput);

      // Check footer wordmark hover
      const isWordmark = !!target?.closest('[data-cursor-wordmark="true"]');
      setIsHoveredWordmark(isWordmark);

      // Check project row hover
      const isProjRow = !!target?.closest('[data-cursor-project-row="true"]');
      setIsHoveredProjectRow(isProjRow);

      // Check general interactive element
      const interactive = !!target?.closest(
        'a, button, [role="button"], [data-cursor="pointer"], .cursor-pointer, .group'
      );
      setIsHoveredInteractive(interactive);

      // Check if cursor is over mobile menu overlay (or menu open)
      const menuTarget = !!target?.closest('[data-mobile-menu="true"]') || document.body.classList.contains('mobile-menu-open');
      setIsOverMenu(menuTarget);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        setHasMovedState(true);
        ringX = mouseX;
        ringY = mouseY;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      updateElementHoverState(e.target as Element | null);
    };

    // Keep cursor state updated when scrolling inside containers (e.g. scrollable menu overlay)
    const handleScrollUpdate = () => {
      if (mouseX >= 0 && mouseY >= 0) {
        const el = document.elementFromPoint(mouseX, mouseY);
        if (el) {
          updateElementHoverState(el);
        }
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (hasMoved) {
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    // Smooth animation loop: dot tracks immediately, ring has calibrated easing
    const render = () => {
      if (hasMoved) {
        // Linear interpolation (lerp) for trailing ring (~0.18 gives a responsive yet smooth drag)
        const ease = 0.18;
        ringX += (mouseX - ringX) * ease;
        ringY += (mouseY - ringY) * ease;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScrollUpdate, { passive: true, capture: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      bodyObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollUpdate, { capture: true } as EventListenerOptions);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!isSupported) return null;

  // Derive per-section classes and styles for ring and dot
  let ringClasses = 'w-[34px] h-[34px] border-[1.5px] border-[#111111] bg-transparent';
  let dotClasses = 'w-[4px] h-[4px] bg-[#111111]';
  let ringExtraStyles: React.CSSProperties = {};

  if (isOverMenu) {
    // While the menu overlay is open: single NEUTRAL state (plain dot + thin ring, restrained default size, no per-section styling, no red fill, no pulse)
    // mix-blend-difference ensures crisp contrast over both the black overlay (#111111) and the white-filled CLOSE button
    ringClasses = 'w-[34px] h-[34px] border-[1.5px] border-white bg-transparent mix-blend-difference';
    dotClasses = 'w-[4px] h-[4px] bg-white mix-blend-difference';
    ringExtraStyles = {};
  } else if (activeSection === 'hero') {
    // Baseline / Neutral
    ringClasses = 'w-[34px] h-[34px] border-[1.5px] border-[#111111] bg-transparent';
    dotClasses = 'w-[4px] h-[4px] bg-[#111111]';
  } else if (activeSection === 'about') {
    // Technical construction dashed line
    ringClasses = 'w-[34px] h-[34px] border-[1.5px] border-dashed border-[#111111] bg-transparent';
    dotClasses = 'w-[4px] h-[4px] bg-[#111111]';
  } else if (activeSection === 'projects') {
    // Section browsing: solid black low-opacity spotlight fill
    if (isHoveredProjectRow) {
      // Expanding high-intent row hover with red dot
      ringClasses = 'w-[54px] h-[54px] border-[1.5px] border-[#111111] bg-[#111111]/20';
      dotClasses = 'w-[5px] h-[5px] bg-[#E63312]';
    } else {
      ringClasses = 'w-[38px] h-[38px] border-[1.5px] border-[#111111] bg-[#111111]/10';
      dotClasses = 'w-[4px] h-[4px] bg-[#111111]';
    }
  } else if (activeSection === 'philosophy') {
    // Tight deliberate reading cursor, red accent dot
    ringClasses = 'w-[22px] h-[22px] border-[1.5px] border-[#111111] bg-transparent';
    dotClasses = 'w-[4px] h-[4px] bg-[#E63312]';
  } else if (activeSection === 'skills') {
    // Slow technical gauge rotation
    ringClasses = 'w-[34px] h-[34px] border-[1.5px] border-[#111111] border-t-[#E63312] bg-transparent animate-cursor-spin';
    dotClasses = 'w-[4px] h-[4px] bg-[#111111]';
  } else if (activeSection === 'contact') {
    // Thicker stroke + gentle pulse
    ringClasses = 'w-[36px] h-[36px] border-[2.5px] border-[#111111] bg-transparent animate-cursor-pulse';
    dotClasses = 'w-[4px] h-[4px] bg-[#111111]';
  }

  // Wordmark hover state: shrink ring to nothing and keep just the subtle dot, or hide ring cleanly
  const hideRing = isHoveredWordmark || isInputActive;
  const hideDot = isInputActive;

  // General interactive expansion on main page content (NEVER when isOverMenu is true — keeps restrained scale)
  if (isHoveredInteractive && activeSection !== 'projects' && !isOverMenu && !isHoveredWordmark && !isInputActive) {
    ringClasses += ' scale-125';
  }

  // If the user has not moved mouse yet, keep cursor fully hidden to prevent any static artifact
  if (!hasMovedState) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 999999 }}
      aria-hidden="true"
    >
      {/* 1. Trailing Eased Ring */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 pointer-events-none will-change-transform ${
          hideRing ? 'scale-0 !opacity-0' : ''
        }`}
        style={{
          opacity: 0,
          zIndex: 999999,
          transform: 'translate3d(-200px, -200px, 0)',
          transition: 'width 250ms ease, height 250ms ease, background-color 250ms ease, border-color 250ms ease, border-width 250ms ease, opacity 200ms ease, scale 250ms ease',
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div
            className={`rounded-full transition-all duration-250 ease-out ${ringClasses}`}
            style={ringExtraStyles}
          />
        </div>
      </div>

      {/* 2. Direct Immediate Dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 pointer-events-none will-change-transform ${
          hideDot ? '!opacity-0' : ''
        }`}
        style={{
          opacity: 0,
          zIndex: 999999,
          transform: 'translate3d(-200px, -200px, 0)',
          transition: 'opacity 150ms ease',
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Exact Center Dot */}
          <div
            className={`rounded-full transition-colors duration-250 ease-out ${dotClasses}`}
          />
        </div>
      </div>
    </div>
  );
};
