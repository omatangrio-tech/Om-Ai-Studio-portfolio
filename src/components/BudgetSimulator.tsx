import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Check, ArrowRight } from 'lucide-react';
import { SWISS_EASE, usePrefersReducedMotion } from '../utils/animation';

interface Expense {
  id: string;
  category: string;
  categoryCode: string;
  amount: number;
  time: string;
  latencyMs: number;
}

const CATEGORIES = [
  { name: 'Groceries', code: 'GROC_01', defaultAmount: 42.50 },
  { name: 'Coffee', code: 'COFF_02', defaultAmount: 4.75 },
  { name: 'Dining', code: 'DINE_03', defaultAmount: 26.00 },
  { name: 'Transit', code: 'TRNS_04', defaultAmount: 3.50 },
  { name: 'Utility', code: 'UTIL_05', defaultAmount: 14.99 },
];

export const BudgetSimulator: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[0]>(CATEGORIES[0]);
  const [amount, setAmount] = useState<number>(42.50);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 'REC-091', category: 'Coffee', categoryCode: 'COFF_02', amount: 4.75, time: '08:42:10', latencyMs: 6.2 },
    { id: 'REC-090', category: 'Transit', categoryCode: 'TRNS_04', amount: 3.50, time: '09:15:02', latencyMs: 7.1 },
    { id: 'REC-089', category: 'Groceries', categoryCode: 'GROC_01', amount: 38.10, time: '14:20:45', latencyMs: 8.4 },
  ]);
  const [logTrace, setLogTrace] = useState<string>('Ready: SQLite WAL journal initialized on flash storage.');

  const monthlyCap = 1400.00;
  const currentTotal = expenses.reduce((acc, c) => acc + c.amount, 0) + 420.00;
  const remaining = monthlyCap - currentTotal;
  const ratio = Math.min(100, Math.round((currentTotal / monthlyCap) * 100));

  const handleSelectCat = (cat: typeof CATEGORIES[0]) => {
    setSelectedCategory(cat);
    setAmount(cat.defaultAmount);
    setLogTrace(`Tap 01: [${cat.name}] selected. Initialized write buffer.`);
    setStep(2);
  };

  const handleSetAmount = () => {
    setLogTrace(`Tap 02: Amount validated [$${amount.toFixed(2)}]. Ready for flash commit.`);
    setStep(3);
  };

  const handleCommit = () => {
    const latency = +(Math.random() * 3 + 5).toFixed(1);
    const newEntry: Expense = {
      id: `REC-${Math.floor(Math.random() * 800 + 100)}`,
      category: selectedCategory.name,
      categoryCode: selectedCategory.code,
      amount: amount,
      time: new Date().toTimeString().split(' ')[0],
      latencyMs: latency,
    };
    setExpenses([newEntry, ...expenses]);
    setLogTrace(`Tap 03: Inserted to local SQLite WAL in ${latency}ms.`);
    setStep(1);
    setSelectedCategory(CATEGORIES[0]);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedCategory(CATEGORIES[0]);
    setAmount(42.50);
    setLogTrace('Reset: State restored.');
  };

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 25 }}
      whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: SWISS_EASE }}
      className="w-full border border-[#111111] bg-[#FAFAF8] text-[#111111] p-6 sm:p-10 space-y-8"
    >
      {/* Test Bench Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#111111]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#E63312]" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#111111]">
            TEST BENCH // 3-TAP INGESTION SPECIFICATION
          </span>
        </div>

        <button
          onClick={handleReset}
          className="p-2 border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
          title="Reset Test Bench"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Diagnostics & Taps Sequence */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#E63312]">
              STEP SEQUENCE STATUS
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-[#111111] uppercase tracking-tight">
              Record Transaction in Exactly 3 Taps
            </h4>
            <p className="text-xs sm:text-sm text-[#767676] leading-relaxed">
              Every action executes synchronously against local memory and asynchronously commits to SQLite WAL. Zero network overhead.
            </p>
          </div>

          <div className="space-y-3">
            <div
              className={`p-4 border transition-colors ${
                step === 1 ? 'border-[#111111] bg-white' : 'border-[#111111]/30 bg-[#FAFAF8]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span>01. CATEGORY SELECTION</span>
                {step > 1 && <span className="text-[#E63312] font-black">[COMPLETED]</span>}
              </div>
              <p className="text-xs text-[#767676] mt-1">
                Select category to prime mutation payload.
              </p>
            </div>

            <div
              className={`p-4 border transition-colors ${
                step === 2 ? 'border-[#111111] bg-white' : 'border-[#111111]/30 bg-[#FAFAF8]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span>02. VALUE CONFIRMATION</span>
                {step > 2 && <span className="text-[#E63312] font-black">[COMPLETED]</span>}
              </div>
              <p className="text-xs text-[#767676] mt-1">
                One-tap presets eliminate on-screen keyboard latency.
              </p>
            </div>

            <div
              className={`p-4 border transition-colors ${
                step === 3 ? 'border-[#111111] bg-white' : 'border-[#111111]/30 bg-[#FAFAF8]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span>03. SQLITE ATOMIC WRITE</span>
                {expenses.length > 3 && <span className="text-[#E63312] font-black">[COMMITTED]</span>}
              </div>
              <p className="text-xs text-[#767676] mt-1">
                Atomic commit to device flash storage under 10ms.
              </p>
            </div>
          </div>

          {/* Trace Buffer */}
          <div className="p-4 border border-[#111111] bg-white space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#767676] block">
              TRACE LOG
            </span>
            <p className="text-xs font-bold text-[#111111] truncate">
              {logTrace}
            </p>
          </div>
        </div>

        {/* Right Column: Swiss Smartphone Mockup Screen */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-[310px] sm:w-[340px] border-2 border-[#111111] bg-white p-5 space-y-5">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#111111] text-[11px] font-bold uppercase tracking-wider text-[#767676]">
              <span>9:41 AM</span>
              <span className="text-[#E63312]">SQLITE WAL · LOCAL</span>
            </div>

            {/* Balance Display */}
            <div className="p-4 border border-[#111111] bg-[#FAFAF8] space-y-1">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#767676]">
                <span>MONTHLY CAP</span>
                <span className="text-[#E63312]">${remaining.toFixed(2)} REMAINING</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                ${currentTotal.toFixed(2)}
              </div>
              <div className="w-full h-1.5 bg-[#111111]/10 mt-2">
                <div className="h-full bg-[#111111]" style={{ width: `${ratio}%` }} />
              </div>
            </div>

            {/* Step 1: Category Selection */}
            {step === 1 && (
              <div className="space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#111111] block">
                  SELECT CATEGORY [TAP 1]:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.code}
                      onClick={() => handleSelectCat(cat)}
                      className="p-3 border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors text-left cursor-pointer group"
                    >
                      <span className="font-bold text-xs block uppercase">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-[#767676] group-hover:text-neutral-400 block">
                        ~${cat.defaultAmount.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#111111] text-[11px] text-[#767676] space-y-1">
                  <span className="font-bold text-[#111111] block uppercase tracking-wider text-[10px]">
                    RECENT LOCAL WRITES:
                  </span>
                  {expenses.slice(0, 3).map((e) => (
                    <div key={e.id} className="flex justify-between font-medium">
                      <span>{e.category}</span>
                      <span className="font-bold text-[#111111]">${e.amount.toFixed(2)} ({e.latencyMs}ms)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Amount Verify */}
            {step === 2 && (
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#111111] block">
                  SET AMOUNT [TAP 2]:
                </span>

                <div className="p-4 border border-[#111111] bg-[#FAFAF8] text-center space-y-1">
                  <span className="text-xs font-bold uppercase text-[#767676] block">
                    {selectedCategory.name}
                  </span>
                  <div className="text-3xl font-black text-[#111111] tracking-tight">
                    ${amount.toFixed(2)}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[selectedCategory.defaultAmount * 0.5, selectedCategory.defaultAmount, selectedCategory.defaultAmount * 1.5].map((val, i) => (
                    <button
                      key={i}
                      onClick={() => setAmount(Number(val.toFixed(2)))}
                      className={`p-2 border text-center text-xs font-bold cursor-pointer transition-colors ${
                        Math.abs(amount - val) < 0.01
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'border-[#111111] text-[#111111] hover:bg-[#FAFAF8]'
                      }`}
                    >
                      ${val.toFixed(2)}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 border border-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#FAFAF8] cursor-pointer"
                  >
                    BACK
                  </button>
                  <button
                    onClick={handleSetAmount}
                    className="flex-1 py-2.5 bg-[#111111] hover:bg-[#E63312] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>CONFIRM</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Atomic Commit */}
            {step === 3 && (
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#111111] block">
                  COMMIT TO SQLITE [TAP 3]:
                </span>

                <div className="p-4 border border-[#E63312] bg-[#E63312]/5 text-center space-y-1">
                  <span className="text-xs font-bold uppercase text-[#767676] block">
                    {selectedCategory.name}
                  </span>
                  <div className="text-3xl font-black text-[#E63312] tracking-tight">
                    -${amount.toFixed(2)}
                  </div>
                  <span className="text-[10px] font-bold text-[#767676] uppercase tracking-wider block">
                    TARGET: LOCAL FLASH DISK
                  </span>
                </div>

                <button
                  onClick={handleCommit}
                  className="w-full py-3.5 bg-[#E63312] hover:bg-[#111111] text-white text-xs font-black uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2 border border-[#E63312]"
                >
                  <Check className="w-4 h-4" />
                  <span>COMMIT TRANSACTION NOW</span>
                </button>

                <button
                  onClick={() => setStep(2)}
                  className="w-full text-center text-[11px] font-bold uppercase tracking-wider text-[#767676] hover:text-[#111111] cursor-pointer"
                >
                  Amend Amount &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
