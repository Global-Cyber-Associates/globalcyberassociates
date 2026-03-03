import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./presentation2.css";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const formatMoney = (value) => money.format(value);

export default function Presentation3() {
  const [calculator, setCalculator] = useState({
    employees: 50,
    avgSalary: 25000,
    nonProductiveHoursPerDay: 3,
    recoveryPercent: 10,
    toolCostPerEmployee: 150,
  });

  const calculatorResult = useMemo(() => {
    const employees = Number(calculator.employees) || 0;
    const avgSalary = Number(calculator.avgSalary) || 0;
    const nonProductiveHoursPerDay =
      Number(calculator.nonProductiveHoursPerDay) || 0;
    const recoveryPercent = Number(calculator.recoveryPercent) || 0;
    const toolCostPerEmployee = Number(calculator.toolCostPerEmployee) || 0;
    const standardWorkingHoursPerDay = 8;
    const visunRecoveryRate = recoveryPercent / 100;

    const payroll = employees * avgSalary;
    const nonProductivePercent =
      (nonProductiveHoursPerDay / standardWorkingHoursPerDay) * 100;
    const wasted = payroll * (nonProductivePercent / 100);
    const recovered = wasted * visunRecoveryRate;
    const toolCost = employees * toolCostPerEmployee;
    const netGain = recovered - toolCost;
    const roi = toolCost > 0 ? recovered / toolCost : 0;

    return {
      nonProductivePercent,
      nonProductiveHoursPerDay,
      payroll,
      wasted,
      recovered,
      toolCost,
      netGain,
      roi,
      standardWorkingHoursPerDay,
      visunRecoveryRate,
      recoveryPercent,
    };
  }, [calculator]);

  const slides = useMemo(() => {
    const employees = 50;
    const avgSalary = 25000;
    const payroll = employees * avgSalary;
    const wastedCost = payroll * 0.2;
    const recoveredValue = payroll * 0.1;
    const toolCost = employees * 150;
    const netGain = recoveredValue - toolCost;
    const roiMultiple = recoveredValue / toolCost;

    return [
      {
        id: "cover",
        type: "hero",
        title: "Enterprise Workforce Productivity Tool",
        subtitle: "Executive Investment Perspective",
        cards: [
          {
            title: "Business Goal",
            text: "Reduce non-productive work time without hiring new staff.",
          },
          {
            title: "Finance Goal",
            text: "Improve salary efficiency and recover hidden value every month.",
          },
          {
            title: "Decision Lens",
            text: "Treat Visun as an operating investment with measurable returns.",
          },
        ],
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
      },
      {
        id: "baseline",
        type: "detail",
        title: "Current Salary Baseline",
        subtitle: "Team and payroll assumptions",
        cards: [
          {
            title: "Employees",
            text: `${employees}`,
          },
          {
            title: "Average Salary",
            text: `${formatMoney(avgSalary)} per employee / month`,
          },
          {
            title: "Monthly Payroll",
            text: formatMoney(payroll),
          },
        ],
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
      },
      {
        id: "loss",
        type: "detail",
        title: "Monthly Productivity Leakage",
        subtitle: "20% non-productive time impact",
        cards: [
          {
            title: "Simple Formula",
            text: `20% x ${formatMoney(payroll)} = ${formatMoney(wastedCost)}`,
          },
          {
            title: "Current Loss",
            text: "Around 2.50L lost each month in paid but non-productive time.",
          },
          {
            title: "Why It Matters",
            text: "This is direct payroll leakage that lowers operating efficiency.",
          },
        ],
        image:
          "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=2006",
      },
      {
        id: "recovery",
        type: "detail",
        title: "Value Recovered with Visun",
        subtitle: "10% recovery model",
        cards: [
          {
            title: "Recovery Formula",
            text: `10% x ${formatMoney(payroll)} = ${formatMoney(recoveredValue)}`,
          },
          {
            title: "Recovered Value",
            text: "Around 1.24L to 1.25L value recovered every month.",
          },
          {
            title: "Operational Benefit",
            text: "Recovery is created from existing team capacity, not new hiring.",
          },
        ],
        image:
          "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=2070",
      },
      {
        id: "cost",
        type: "detail",
        title: "Tool Investment",
        subtitle: "Simple monthly pricing",
        cards: [
          {
            title: "Unit Cost",
            text: "INR 150 per employee / month",
          },
          {
            title: "Total Tool Cost",
            text: `${employees} x INR 150 = ${formatMoney(toolCost)}`,
          },
          {
            title: "Investment Quality",
            text: "Low monthly outflow relative to recovered productivity value.",
          },
        ],
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2070",
      },
      {
        id: "roi",
        type: "hero",
        title: "Investment ROI Snapshot",
        subtitle: "Monthly financial impact",
        cards: [
          {
            title: "Recovered Value",
            text: formatMoney(recoveredValue),
          },
          {
            title: "Tool Cost",
            text: formatMoney(toolCost),
          },
          {
            title: "Net Gain",
            text: `${formatMoney(netGain)} per month`,
          },
          {
            title: "ROI Multiple",
            text: `${roiMultiple.toFixed(1)}x (conservative meeting claim: 10x+)`,
          },
        ],
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070",
      },
      {
        id: "advantages",
        type: "detail",
        title: "Investment Advantages of Visun",
        subtitle: "Why this is a high-quality operating investment",
        cards: [
          {
            title: "Salary Efficiency",
            text: "Converts paid idle time into output-producing time.",
          },
          {
            title: "Recurring Gains",
            text: "Benefits repeat monthly instead of one-time savings.",
          },
          {
            title: "Fast Payback",
            text: "Low tool cost compared to recovered productivity value.",
          },
          {
            title: "Margin Support",
            text: "Improves margin without increasing headcount.",
          },
          {
            title: "Finance Visibility",
            text: "Creates measurable and reviewable ROI metrics.",
          },
          {
            title: "Leakage Control",
            text: "Reduces hidden payroll leakage with real-time insight.",
          },
        ],
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2070",
      },
      {
        id: "calculator",
        type: "calculator",
        title: "Now Let’s Calculate for Our Company",
        subtitle:
          "Enter employees and average salary. Select non-productive hours/day to estimate waste and Visun recovery.",
        image:
          "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2070",
      },
    ];
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  const active = slides[currentSlide];

  const goToSlide = (index) => {
    if (index < 0 || index >= totalSlides) return;
    setCurrentSlide(index);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      const target = e.target;
      const isTypingField =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isTypingField) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      }
      if (/^\d$/.test(e.key)) {
        const selected = Number(e.key);
        if (selected >= 1 && selected <= totalSlides) {
          goToSlide(selected - 1);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentSlide, totalSlides]);

  return (
    <div className="fixed inset-0 bg-black text-white z-[100] overflow-hidden select-none cursor-default">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-35" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-[18s] ease-linear ${
              index === currentSlide ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
        </div>
      ))}

      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-700 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      <div className="absolute top-8 left-8 z-[60] flex items-center gap-3 mix-blend-overlay opacity-35">
        <div className="text-xl font-black tracking-tighter italic uppercase text-white">
          GCA <span className="text-blue-600">Global</span>
        </div>
        <div className="h-[1px] w-8 bg-white/50" />
        <div className="text-[10px] font-bold tracking-[0.3rem] text-white/60">
          VISUN AI
        </div>
      </div>

      <div className="relative h-full w-full z-10 flex items-center px-8 md:px-20 lg:px-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-blue-400/90">
              Executive Presentation | Slide {currentSlide + 1}/{totalSlides}
            </p>
            <h1
              className={`mt-4 font-black tracking-tight uppercase italic leading-tight ${
                active.type === "hero"
                  ? "text-4xl md:text-6xl lg:text-7xl"
                  : "text-3xl md:text-5xl lg:text-6xl"
              }`}
            >
              {active.title}
            </h1>
            <p className="mt-5 text-lg md:text-2xl font-light text-white/65 max-w-3xl leading-relaxed">
              {active.subtitle}
            </p>
            {active.type !== "calculator" && (
              <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
                {active.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/15 bg-black/35 backdrop-blur-md p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-blue-300/90">
                      {card.title}
                    </p>
                    <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {active.type === "calculator" && (
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl">
                <div className="rounded-2xl border border-white/15 bg-black/35 backdrop-blur-md p-5 space-y-4">
                  <InputRow
                    label="Employees"
                    value={calculator.employees}
                    onChange={(value) =>
                      setCalculator((prev) => ({ ...prev, employees: value }))
                    }
                  />
                  <InputRow
                    label="Average Salary / Employee (Monthly)"
                    value={calculator.avgSalary}
                    onChange={(value) =>
                      setCalculator((prev) => ({ ...prev, avgSalary: value }))
                    }
                  />
                  <SelectRow
                    label="Non-Productive Time (Hours / Day)"
                    value={calculator.nonProductiveHoursPerDay}
                    options={[1, 2, 3, 4, 5, 6, 7, 8]}
                    unit="hours"
                    onChange={(value) =>
                      setCalculator((prev) => ({
                        ...prev,
                        nonProductiveHoursPerDay: value,
                      }))
                    }
                  />
                  <SelectRow
                    label="Visun Recovery (%)"
                    value={calculator.recoveryPercent}
                    options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    unit="percent"
                    onChange={(value) =>
                      setCalculator((prev) => ({
                        ...prev,
                        recoveryPercent: value,
                      }))
                    }
                  />
                </div>

                <div className="rounded-2xl border border-blue-400/35 bg-slate-950/75 backdrop-blur-md p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-blue-200/90">
                    Live Summary
                  </p>
                  <div className="mt-3 rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3">
                    <p className="text-xs text-blue-100/80">
                      Total Value Recovered ({calculatorResult.recoveryPercent}%)
                    </p>
                    <p className="mt-1 text-3xl font-black text-blue-100">
                      {formatMoney(calculatorResult.recovered)}
                    </p>
                  </div>
                  <div className="mt-4 divide-y divide-white/10">
                    <ResultRow
                      label="Total Money You Waste"
                      value={formatMoney(calculatorResult.wasted)}
                    />
                    <ResultRow
                      label="Total You Invest"
                      value={formatMoney(calculatorResult.toolCost)}
                    />
                    <ResultRow
                      label={`If Visun Recovers ${calculatorResult.recoveryPercent}%`}
                      value={formatMoney(calculatorResult.recovered)}
                    />
                    <ResultRow
                      label="Net Value After Investment"
                      value={formatMoney(calculatorResult.netGain)}
                    />
                  </div>
                  <p className="mt-4 text-xs text-slate-300">
                    Assumption: {calculatorResult.nonProductiveHoursPerDay}h/day
                    non-productive ({calculatorResult.nonProductivePercent.toFixed(
                      1
                    )}
                    %), and Visun recovers {calculatorResult.recoveryPercent}% of
                    wasted value.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 z-50 flex items-center gap-4">
        <div className="text-sm font-semibold text-white/70">
          {currentSlide + 1}/{totalSlides}
        </div>
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10">
          <button
            onClick={() => goToSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 transition"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => goToSlide(currentSlide + 1)}
            disabled={currentSlide === totalSlides - 1}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 transition"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function InputRow({ label, value, onChange }) {
  return (
    <label className="block">
      <p className="text-xs uppercase tracking-[0.12em] text-white/70 mb-2">
        {label}
      </p>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-blue-500"
      />
    </label>
  );
}

function SelectRow({ label, value, onChange, options, unit = "hours" }) {
  return (
    <label className="block">
      <p className="text-xs uppercase tracking-[0.12em] text-white/70 mb-2">
        {label}
      </p>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-900">
            {unit === "percent"
              ? `${option}%`
              : `${option} hour${option > 1 ? "s" : ""} / day`}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultRow({ label, value, emphasize = false }) {
  return (
    <div className="flex items-center justify-between py-3">
      <p className="text-sm text-slate-300">{label}</p>
      <p className={`font-semibold ${emphasize ? "text-blue-200" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}
