export interface Project {
  id: string;
  num: string;
  name: string;
  tagline: string;
  description: string;
  detailedCaseStudy: {
    problem: string;
    solution: string;
    architecture: string[];
    offlineStrategy: string;
    keyMetrics: { label: string; value: string }[];
  };
  techStack: string[];
  links: {
    github?: string;
    appStore?: string;
    demo?: string;
  };
}

export interface SkillItem {
  name: string;
  level: string;
  experience: string;
  detail: string;
}

export interface SkillCategory {
  domain: string;
  description: string;
  items: SkillItem[];
}

export interface PortfolioData {
  developer: {
    name: string;
    role: string;
    tagline: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
    availability: string;
  };
  stats: { value: string; label: string; suffix: string }[];
  milestones: {
    year: string;
    title: string;
    description: string;
  }[];
  projects: Project[];
  philosophy: {
    num: string;
    title: string;
    thesis: string;
    rationale: string;
  }[];
  skillsCategories: SkillCategory[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  developer: {
    name: "Patel Om",
    role: "Independent Mobile App Developer",
    tagline: "Building focused, no-nonsense mobile tools.",
    location: "Remote Worldwide",
    email: "patelom.dev@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    availability: "Available for select freelance contracts & mobile architecture advisory.",
  },

  stats: [
    { value: "4", label: "Published Mobile Apps", suffix: "" },
    { value: "<3", label: "Tap Action Completion", suffix: " taps" },
    { value: "100%", label: "Offline-First Local Storage", suffix: "" },
    { value: "0", label: "Third-Party Ad Trackers", suffix: "" },
  ],

  milestones: [
    {
      year: "2020",
      title: "Native Client Foundations",
      description: "Built high-throughput mobile frontends for distributed platforms. Learned firsthand how enterprise feature bloat degrades real-world battery life, thread availability, and user attention.",
    },
    {
      year: "2023",
      title: "The Independent Shift",
      description: "Transitioned to standalone engineering. Dedicated practice to single-purpose utilities with zero ad trackers, zero forced cloud accounts, and honest software monetization.",
    },
    {
      year: "2025–PRESENT",
      title: "Local-First Standardization",
      description: "Published 4 production mobile applications powered by SQLite WAL journaling, zero-latency state machines, and local-first data residency.",
    },
  ],

  projects: [
    {
      id: "simple-budget-tracker",
      num: "01",
      name: "Simple Budget Tracker",
      tagline: "Frictionless personal expense ledger capped at 3 taps per entry.",
      description: "An offline-first mobile budgeting application with a minimal-friction design (expense logging in 3 taps or fewer), no bank linking, no multi-currency, and no AI — deliberately simple.",
      detailedCaseStudy: {
        problem: "Mainstream budgeting apps demand bank credentials, disconnect regularly, monetize transaction history, and require 15–30 seconds of multi-step form friction just to log a morning coffee.",
        solution: "Engineered a local-first client where every mutation commits directly to device flash storage via SQLite WAL in under 10ms. No bank linking, no mandatory login, and no background network reliance.",
        architecture: [
          "React Native + Expo Router file-based native routing",
          "expo-sqlite with Write-Ahead Logging (WAL) mode enabled",
          "Zustand optimistic state machine hydrated on device boot",
          "Optional encrypted Supabase sync with strict Row-Level Security",
        ],
        offlineStrategy: "100% offline capability. Database schema and journal reside on flash storage. Zero remote endpoints required to operate.",
        keyMetrics: [
          { label: "Tap Budget", value: "≤3 Taps" },
          { label: "Commit Latency", value: "<8ms" },
          { label: "Ad Trackers", value: "0" },
          { label: "Cold Start", value: "54ms" },
        ],
      },
      techStack: [
        "React Native (Expo)",
        "Expo Router",
        "expo-sqlite (WAL)",
        "Zustand",
        "Supabase",
        "TypeScript",
      ],
      links: {
        github: "https://github.com",
        appStore: "https://apple.com",
        demo: "#demo",
      },
    },
    {
      id: "focus-pulse",
      num: "02",
      name: "FocusPulse",
      tagline: "Silent interval timer powered by native CoreHaptics vibration patterns.",
      description: "A focused work-interval timer that operates without disruptive sound alarms. Delivers precision rhythmic tactile feedback exclusively through native vibration engines.",
      detailedCaseStudy: {
        problem: "Audio chimes disrupt shared offices, while intrusive push notifications break deep work states.",
        solution: "Built a hardware-aligned haptic synthesizer running directly on native threads at 120 FPS, consuming under 1% battery per hour.",
        architecture: [
          "React Native with custom native CoreHaptics bridge",
          "Reanimated 3 running on UI thread at 120 FPS",
          "Background task scheduler with zero audio background permissions",
        ],
        offlineStrategy: "Completely standalone binary. Never makes a network request.",
        keyMetrics: [
          { label: "UI Thread FPS", value: "120" },
          { label: "Audio Alerts", value: "0" },
          { label: "Battery / Hr", value: "<1%" },
          { label: "Bundle Size", value: "8.4MB" },
        ],
      },
      techStack: [
        "React Native",
        "CoreHaptics",
        "Reanimated 3",
        "Expo Modules API",
      ],
      links: {
        github: "https://github.com",
        appStore: "https://apple.com",
      },
    },
    {
      id: "paperclip-reader",
      num: "03",
      name: "Paperclip Reader",
      tagline: "Stripped-down offline article reader with SQLite full-text search.",
      description: "A lightweight read-it-later client that automatically strips tracking scripts, ads, and telemetry before storing clean typography locally in SQLite FTS5.",
      detailedCaseStudy: {
        problem: "Read-it-later tools have bloated into algorithmic social feeds with paywalled tagging and analytics trackers.",
        solution: "A local reader that extracts article DOM content, deletes all JavaScript/beacons, and builds an instant full-text index on device.",
        architecture: [
          "SQLite Full-Text Search (FTS5) for instant token matching",
          "Native readability parser executing on device",
          "Background asset caching with automatic image compression",
        ],
        offlineStrategy: "Articles stored indefinitely as local plain text and offline cached graphics.",
        keyMetrics: [
          { label: "FTS5 Search", value: "12ms" },
          { label: "Cached Articles", value: "10k+" },
          { label: "Trackers Stripped", value: "100%" },
          { label: "Bundle Size", value: "9.2MB" },
        ],
      },
      techStack: [
        "React Native",
        "SQLite FTS5",
        "Expo FileSystem",
        "TypeScript",
      ],
      links: {
        github: "https://github.com",
        appStore: "https://apple.com",
      },
    },
    {
      id: "orbit-habits",
      num: "04",
      name: "Orbit Habits",
      tagline: "Daily cadence tracker with hardware-rendered Skia graphics and iOS widgets.",
      description: "Minimalist habit tracker based on orbital mechanics metaphors. Uses GPU-accelerated Skia rendering and instant WidgetKit synchronization with zero streak guilt.",
      detailedCaseStudy: {
        problem: "Habit trackers induce anxiety with streak breaks, push notification spam, and social gamification.",
        solution: "A calm, visual cadence tracker prioritizing consistency over streaks, synced natively with lock screen widgets.",
        architecture: [
          "React Native Skia for hardware-rendered graphics",
          "MMKV high-performance key-value storage",
          "Native iOS WidgetKit integration via App Groups",
        ],
        offlineStrategy: "All habit histories recorded in local MMKV memory; instant widget synchronization.",
        keyMetrics: [
          { label: "Render", value: "60 FPS GPU" },
          { label: "Widget Sync", value: "<2ms" },
          { label: "Streak Shaming", value: "0" },
          { label: "Bundle Size", value: "11.1MB" },
        ],
      },
      techStack: [
        "React Native Skia",
        "MMKV",
        "WidgetKit",
        "Expo Config Plugins",
      ],
      links: {
        github: "https://github.com",
        appStore: "https://apple.com",
      },
    },
  ],

  philosophy: [
    {
      num: "01",
      title: "Minimal Friction",
      thesis: "Action paths must be hard-capped at 3 taps or fewer.",
      rationale: "Every additional tap, settings toggle, marketing modal, and redundant navigation tier is friction standing between a person and their task. Software should do one job ruthlessly well, then get out of the way.",
    },
    {
      num: "02",
      title: "Offline-First Sovereignty",
      thesis: "Your phone is a supercomputer; it must never stall on a remote server.",
      rationale: "Modern mobile hardware contains gigabytes of high-speed flash and multi-core silicon. Storing data locally first in SQLite with Write-Ahead Logging ensures zero cloud latency and total device autonomy.",
    },
    {
      num: "03",
      title: "Privacy by Default",
      thesis: "Privacy is not a compliance checklist — it is the engineering refusal to surveil.",
      rationale: "When people purchase or use independent tools, they are the patrons, not the product. Zero third-party ad networks, zero analytics beacons, zero user profiling, and zero background battery drain.",
    },
    {
      num: "04",
      title: "The Instrument Standard",
      thesis: "Build software like fine physical instruments: durable, quiet, and outlasting trends.",
      rationale: "Craftsmanship is found in 120 FPS gesture physics, crisp tactile feedback, and applications that remain fully functional a decade after installation without breaking from remote server shutdowns.",
    },
  ],

  skillsCategories: [
    {
      domain: "Mobile Client",
      description: "Architecture, rendering engines, and native platform runtimes.",
      items: [
        {
          name: "React Native & Expo",
          level: "Production Core",
          experience: "5+ Years",
          detail: "Expo Router file-based architecture, prebuild workflows, custom config plugins, and OTA management.",
        },
        {
          name: "TypeScript",
          level: "Strict / Exhaustive",
          experience: "6+ Years",
          detail: "End-to-end type safety, runtime payload validation, and strict compile-time invariants.",
        },
        {
          name: "Reanimated 3 & Skia",
          level: "Advanced Hardware",
          experience: "4+ Years",
          detail: "Declarative worklet thread animations, custom gesture handlers, and 60–120 FPS canvas shaders.",
        },
        {
          name: "Native Platform APIs",
          level: "iOS & Android",
          experience: "5+ Years",
          detail: "CoreHaptics, WidgetKit, App Groups, background task execution, and SQLite C-bindings.",
        },
      ],
    },
    {
      domain: "Local-First & Persistence",
      description: "Flash storage, embedded databases, and state synchronization.",
      items: [
        {
          name: "expo-sqlite (WAL Mode)",
          level: "Primary Storage",
          experience: "4+ Years",
          detail: "Relational schemas, Write-Ahead Logging, migration pipelines, and sub-10ms atomic mutations.",
        },
        {
          name: "SQLite FTS5",
          level: "Full-Text Search",
          experience: "3+ Years",
          detail: "On-device tokenization, BM25 ranking, and sub-15ms fuzzy document queries across 50k+ records.",
        },
        {
          name: "MMKV High-Speed KV",
          level: "Synchronous State",
          experience: "4+ Years",
          detail: "Zero-copy memory mapped key-value storage for settings, widget caches, and instant state hydration.",
        },
        {
          name: "Zustand State Engine",
          level: "Decoupled Reactive",
          experience: "4+ Years",
          detail: "Predictable optimistic state machines with local-first middleware and zero re-render overhead.",
        },
      ],
    },
    {
      domain: "Backend & Cloud",
      description: "Optional cloud sync, authentication boundaries, and build pipelines.",
      items: [
        {
          name: "Supabase & PostgreSQL",
          level: "Encrypted Backup",
          experience: "4+ Years",
          detail: "Row-Level Security (RLS) policies, Postgres functions, and encrypted remote replication.",
        },
        {
          name: "EAS Build & Deploy",
          level: "Production Pipeline",
          experience: "4+ Years",
          detail: "Automated test harnesses, iOS TestFlight and Android Google Play internal track submissions.",
        },
        {
          name: "GitHub Actions CI/CD",
          level: "Automated Quality",
          experience: "5+ Years",
          detail: "Strict linting, TypeScript verification, bundle size budgets, and automated regression suites.",
        },
      ],
    },
  ],
};
