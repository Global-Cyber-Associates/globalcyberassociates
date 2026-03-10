import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1,
});

const CHART_COLORS = {
  cyan: "#22d3ee",
  blue: "#60a5fa",
  green: "#34d399",
  amber: "#fbbf24",
  red: "#f87171",
  slate: "#94a3b8",
};

const STAGES = [
  "Step 1 / Yesterday Check",
  "Step 2 / Problem Statement",
  "Step 3 / Salary Loss",
  "Step 4 / Fix Plan",
  "Step 5 / Investment + ROI",
  "Your Calculator",
];

const formatMoney = (value) => currencyFormatter.format(value || 0);
const formatCompactMoney = (value) => compactCurrencyFormatter.format(value || 0);

function calculateModel(input) {
  const employees = Math.max(Number(input.employees) || 0, 0);
  const avgSalary = Math.max(Number(input.avgSalary) || 0, 0);
  const nonProductiveHoursPerDay = Math.max(
    Number(input.nonProductiveHoursPerDay) || 0,
    0
  );
  const recoveryPercent = Math.max(Number(input.recoveryPercent) || 0, 0);
  const toolCostPerEmployee = Math.max(Number(input.toolCostPerEmployee) || 0, 0);
  const paidHoursPerDay = 8;

  const monthlyPayroll = employees * avgSalary;
  const nonProductivePercent = (nonProductiveHoursPerDay / paidHoursPerDay) * 100;
  const monthlyLoss = monthlyPayroll * (nonProductivePercent / 100);
  const monthlyRecovered = monthlyLoss * (recoveryPercent / 100);
  const monthlyCost = employees * toolCostPerEmployee;
  const netMonthlyBenefit = monthlyRecovered - monthlyCost;
  const annualNetBenefit = netMonthlyBenefit * 12;
  const grossRoiMultiple = monthlyCost > 0 ? monthlyRecovered / monthlyCost : 0;
  const netRoiPercent =
    monthlyCost > 0 ? (netMonthlyBenefit / monthlyCost) * 100 : 0;
  const paybackMonths =
    netMonthlyBenefit > 0 ? monthlyCost / netMonthlyBenefit : null;

  return {
    employees,
    avgSalary,
    nonProductiveHoursPerDay,
    nonProductivePercent,
    recoveryPercent,
    toolCostPerEmployee,
    monthlyPayroll,
    monthlyLoss,
    monthlyRecovered,
    monthlyCost,
    netMonthlyBenefit,
    annualNetBenefit,
    grossRoiMultiple,
    netRoiPercent,
    paybackMonths,
  };
}

export default function Presentation3() {
  const MotionSection = motion.section;
  const [calculator, setCalculator] = useState({
    employees: 10,
    avgSalary: 30000,
    nonProductiveHoursPerDay: 2,
    recoveryPercent: 20,
    toolCostPerEmployee: 200,
  });

  const sampleInputs = useMemo(
    () => ({
      employees: 10,
      avgSalary: 30000,
      nonProductiveHoursPerDay: 2,
      recoveryPercent: 20,
      toolCostPerEmployee: 200,
    }),
    []
  );

  const sample = useMemo(() => calculateModel(sampleInputs), [sampleInputs]);
  const calculatorResult = useMemo(
    () => calculateModel(calculator),
    [calculator]
  );

  const slides = useMemo(() => {
    const weeklyRecoveryData = [
      { name: "Week 1", value: sample.monthlyRecovered * 0.2 },
      { name: "Week 2", value: sample.monthlyRecovered * 0.45 },
      { name: "Week 3", value: sample.monthlyRecovered * 0.75 },
      { name: "Week 4", value: sample.monthlyRecovered },
    ];

    return [
      {
        id: "attention",
        type: "insight",
        stage: STAGES[0],
        title: "How productive was your employee yesterday?",
        subtitle: "If you cannot answer this daily, salary loss stays hidden.",
        cards: [
          {
            label: "Need",
            value: "Daily visibility",
            note: "See productive time every day",
          },
          {
            label: "Current gap",
            value: "No live proof",
            note: "Manual reports come too late",
          },
          {
            label: "Risk",
            value: "Silent salary leakage",
            note: "Cost rises, output does not",
          },
        ],
        chart: {
          title: "Typical Workday Split",
          type: "donut",
          unit: "percent",
          data: [
            {
              name: "Productive hours",
              value: 100 - sample.nonProductivePercent,
              color: CHART_COLORS.green,
            },
            {
              name: "Non-productive hours",
              value: sample.nonProductivePercent,
              color: CHART_COLORS.red,
            },
          ],
        },
      },
      {
        id: "interest",
        type: "insight",
        stage: STAGES[1],
        title: "Problem statement",
        subtitle:
          "Company pays full salary, but a part of that paid time is non-productive.",
        cards: [
          {
            label: "What is happening",
            value: "Paid time != Productive time",
            note: "Idle time is hidden",
          },
          {
            label: "Why it continues",
            value: "No real-time tracking",
            note: "Managers act after the loss",
          },
          {
            label: "Business impact",
            value: "Lower margin",
            note: "More spend for same output",
          },
        ],
        chart: {
          title: "Where Salary Spend Goes",
          type: "bar",
          unit: "currency",
          data: [
            {
              name: "Total Salary Spend",
              value: sample.monthlyPayroll,
              color: CHART_COLORS.blue,
            },
            {
              name: "Non-Productive Spend",
              value: sample.monthlyLoss,
              color: CHART_COLORS.red,
            },
            {
              name: "Productive Spend",
              value: sample.monthlyPayroll - sample.monthlyLoss,
              color: CHART_COLORS.green,
            },
          ],
        },
      },
      {
        id: "desire-method",
        type: "insight",
        stage: STAGES[2],
        title: "How much salary investment is going non-productive?",
        subtitle: `${sample.employees} employees at ${formatMoney(
          sample.avgSalary
        )} average salary per month.`,
        cards: [
          {
            label: "Salary spend / month",
            value: formatMoney(sample.monthlyPayroll),
            note: "Total salary investment",
          },
          {
            label: "Non-productive spend / month",
            value: formatMoney(sample.monthlyLoss),
            note: `${sample.nonProductiveHoursPerDay.toFixed(
              1
            )} non-productive hours/day`,
          },
          {
            label: "Non-productive spend / year",
            value: formatMoney(sample.monthlyLoss * 12),
            note: "If current pattern continues",
          },
        ],
        chart: {
          title: "Salary Loss If Nothing Changes",
          type: "bar",
          unit: "currency",
          data: [
            {
              name: "Month Loss",
              value: sample.monthlyLoss,
              color: CHART_COLORS.amber,
            },
            {
              name: "Year Loss",
              value: sample.monthlyLoss * 12,
              color: CHART_COLORS.red,
            },
          ],
        },
      },
      {
        id: "desire-proof",
        type: "insight",
        stage: STAGES[3],
        title: "How Visun fixes this",
        subtitle: "Simple 14-day plan.",
        cards: [
          {
            label: "Days 1-4",
            value: "Capture baseline",
            note: "See current productivity clearly",
          },
          {
            label: "Days 5-10",
            value: "Manager action",
            note: "Fix top non-productive areas",
          },
          {
            label: "Days 11-14",
            value: "Review gains",
            note: "Decide scale using real numbers",
          },
        ],
        chart: {
          title: "Estimated Value Recovery In Month 1",
          type: "area",
          unit: "currency",
          data: weeklyRecoveryData,
        },
      },
      {
        id: "action",
        type: "insight",
        stage: STAGES[4],
        title: "Tool investment and ROI",
        subtitle:
          "This is the investment per system, and ROI against monthly salary loss.",
        cards: [
          {
            label: "Tool cost per system / month",
            value: formatMoney(sample.toolCostPerEmployee),
            note: `${sample.employees} systems in this sample`,
          },
          {
            label: "Total tool cost / month",
            value: formatMoney(sample.monthlyCost),
            note: "Your monthly tool investment",
          },
          {
            label: "Salary loss / month",
            value: formatMoney(sample.monthlyLoss),
            note: "Current non-productive salary cost",
          },
          {
            label: "ROI and net gain",
            value: `${sample.netRoiPercent.toFixed(0)}%`,
            note: `${formatMoney(sample.netMonthlyBenefit)} net gain / month`,
          },
        ],
        chart: {
          title: "Salary Loss vs Tool Cost vs Net Gain",
          type: "bar",
          unit: "currency",
          data: [
            {
              name: "Salary Loss",
              value: sample.monthlyLoss,
              color: CHART_COLORS.red,
            },
            {
              name: "Tool Cost",
              value: sample.monthlyCost,
              color: CHART_COLORS.blue,
            },
            {
              name: "Net Gain",
              value: sample.netMonthlyBenefit,
              color:
                sample.netMonthlyBenefit >= 0
                  ? CHART_COLORS.green
                  : CHART_COLORS.red,
            },
          ],
        },
      },
      {
        id: "calculator",
        type: "calculator",
        stage: STAGES[5],
        title: "Enter your numbers",
        subtitle: "See your monthly and yearly gain.",
      },
    ];
  }, [sample]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  const active = slides[currentSlide];

  const goToSlide = useCallback(
    (nextIndexOrUpdater) => {
      setCurrentSlide((previous) => {
        const next =
          typeof nextIndexOrUpdater === "function"
            ? nextIndexOrUpdater(previous)
            : nextIndexOrUpdater;
        if (next < 0 || next >= totalSlides) return previous;
        return next;
      });
    },
    [totalSlides]
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isTypingField =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isTypingField) return;

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        goToSlide((index) => index + 1);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        goToSlide((index) => index - 1);
      }

      if (/^\d$/.test(event.key)) {
        const selected = Number(event.key);
        if (selected >= 1 && selected <= totalSlides) {
          goToSlide(selected - 1);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToSlide, totalSlides]);

  const calculatorChartData = useMemo(
    () => [
      {
        name: "Loss",
        value: calculatorResult.monthlyLoss,
        color: CHART_COLORS.amber,
      },
      {
        name: "Recovered",
        value: calculatorResult.monthlyRecovered,
        color: CHART_COLORS.green,
      },
      {
        name: "Cost",
        value: calculatorResult.monthlyCost,
        color: CHART_COLORS.blue,
      },
      {
        name: "Net",
        value: calculatorResult.netMonthlyBenefit,
        color:
          calculatorResult.netMonthlyBenefit >= 0
            ? CHART_COLORS.cyan
            : CHART_COLORS.red,
      },
    ],
    [calculatorResult]
  );

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-slate-950 text-slate-100">
      <DeckBackground accentIndex={currentSlide} />

      <div className="absolute top-0 left-0 h-[3px] w-full bg-white/10 z-40">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      <main className="relative z-20 h-full px-3 py-5 md:px-6 md:py-6">
        <AnimatePresence mode="wait">
          <MotionSection
            key={active.id}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/55 p-5 shadow-[0_30px_90px_rgba(2,6,23,0.55)] backdrop-blur-2xl md:p-8"
          >
            <h1 className="mt-1 w-full text-2xl font-black leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {active.title}
            </h1>
            <p className="mt-2 w-full text-sm text-slate-300 md:text-lg">
              {active.subtitle}
            </p>

            {active.type !== "calculator" && (
              <div className="mt-5 grid min-h-0 flex-1 gap-5 xl:grid-cols-12">
                <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:col-span-7">
                  {active.cards.map((card) => (
                    <MetricCard
                      key={`${card.label}-${card.value}`}
                      label={card.label}
                      value={card.value}
                      note={card.note}
                    />
                  ))}
                </div>
                <div className="min-h-0 xl:col-span-5">
                  <ChartCard chart={active.chart} fullHeight />
                </div>
              </div>
            )}

            {active.type === "calculator" && (
              <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.05fr]">
                <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/90">
                    Your Inputs
                  </p>

                  <div className="mt-4 space-y-4">
                    <NumberRow
                      label="Employees"
                      value={calculator.employees}
                      min={1}
                      step={1}
                      onChange={(value) =>
                        setCalculator((prev) => ({ ...prev, employees: value }))
                      }
                    />
                    <NumberRow
                      label="Average Salary Per Employee"
                      value={calculator.avgSalary}
                      min={1000}
                      step={500}
                      onChange={(value) =>
                        setCalculator((prev) => ({ ...prev, avgSalary: value }))
                      }
                    />
                    <NumberRow
                      label="Tool Cost Per System"
                      value={calculator.toolCostPerEmployee}
                      min={0}
                      step={10}
                      onChange={(value) =>
                        setCalculator((prev) => ({
                          ...prev,
                          toolCostPerEmployee: value,
                        }))
                      }
                    />
                    <RangeRow
                      label="Lost Hours Per Day"
                      value={calculator.nonProductiveHoursPerDay}
                      min={0.5}
                      max={4}
                      step={0.1}
                      suffix="hours"
                      onChange={(value) =>
                        setCalculator((prev) => ({
                          ...prev,
                          nonProductiveHoursPerDay: value,
                        }))
                      }
                    />
                    <RangeRow
                      label="Recovery Rate with Visun"
                      value={calculator.recoveryPercent}
                      min={5}
                      max={40}
                      step={1}
                      suffix="%"
                      onChange={(value) =>
                        setCalculator((prev) => ({
                          ...prev,
                          recoveryPercent: value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-300/25 bg-slate-950/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/90">
                    Your Result
                  </p>

                  <div className="mt-3 rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-red-100/85">
                      Total Salary Loss Per Month
                    </p>
                    <p className="mt-1 text-4xl font-black text-red-100 md:text-5xl">
                      {formatMoney(calculatorResult.monthlyLoss)}
                    </p>
                  </div>

                  <div className="mt-4 h-40 rounded-xl border border-white/10 bg-slate-900/60 p-3">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-slate-300">
                      Loss vs Recovery vs Cost
                    </p>
                    <div className="mt-2 h-32">
                      <ValueBarChart data={calculatorChartData} unit="currency" />
                    </div>
                  </div>

                  <div className="mt-3 divide-y divide-white/10">
                    <ResultRow
                      label="Monthly Payroll"
                      value={formatMoney(calculatorResult.monthlyPayroll)}
                    />
                    <ResultRow
                      label="Value Recovered Per Month"
                      value={formatMoney(calculatorResult.monthlyRecovered)}
                    />
                    <ResultRow
                      label="Tool Cost Per Month"
                      value={formatMoney(calculatorResult.monthlyCost)}
                    />
                    <ResultRow
                      label="Net Gain Per Month"
                      value={formatMoney(calculatorResult.netMonthlyBenefit)}
                      emphasize
                    />
                    <ResultRow
                      label="ROI vs Monthly Salary Loss"
                      value={
                        calculatorResult.monthlyLoss > 0
                          ? `${(
                              (calculatorResult.netMonthlyBenefit /
                                calculatorResult.monthlyLoss) *
                              100
                            ).toFixed(0)}%`
                          : "0%"
                      }
                      emphasize
                    />
                  </div>

                  <p className="mt-3 text-xs text-slate-300">
                    Formula: Net gain = Recovered value - Tool cost.
                  </p>
                </div>
              </div>
            )}
          </MotionSection>
        </AnimatePresence>
      </main>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goToSlide((index) => index - 1)}
        disabled={currentSlide === 0}
        className="absolute left-4 top-1/2 z-40 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/70 text-slate-100 transition hover:border-cyan-300/50 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goToSlide((index) => index + 1)}
        disabled={currentSlide === totalSlides - 1}
        className="absolute right-4 top-1/2 z-40 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/70 text-slate-100 transition hover:border-cyan-300/50 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

function DeckBackground({ accentIndex }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#020617_0%,#0f172a_52%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.1)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div
        className="absolute -left-28 top-8 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px] transition-transform duration-700"
        style={{ transform: `translateX(${accentIndex * 16}px)` }}
      />
      <div
        className="absolute -right-28 bottom-0 h-[26rem] w-[26rem] rounded-full bg-blue-500/25 blur-[140px] transition-transform duration-700"
        style={{ transform: `translateX(${-accentIndex * 14}px)` }}
      />
    </div>
  );
}

function MetricCard({ label, value, note }) {
  return (
    <article className="h-full rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <p className="text-[11px] uppercase tracking-[0.14em] text-slate-300">{label}</p>
      <p className="mt-2 text-xl font-bold text-slate-100 md:text-2xl">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{note}</p>
    </article>
  );
}

function ChartCard({ chart, fullHeight = false }) {
  if (!chart) return null;

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-slate-950/65 p-4 ${
        fullHeight ? "h-full" : ""
      }`}
    >
      <p className="text-[11px] uppercase tracking-[0.14em] text-cyan-100/90">
        {chart.title}
      </p>
      {chart.type === "donut" && (
        <div
          className={`mt-3 grid items-center gap-4 md:grid-cols-[1.15fr_1fr] ${
            fullHeight ? "h-[calc(100%-1.6rem)]" : ""
          }`}
        >
          <div className={fullHeight ? "h-full min-h-[220px]" : "h-40"}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chart.data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={42}
                  outerRadius={72}
                  paddingAngle={2}
                >
                  {chart.data.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={entry.color || CHART_COLORS.slate}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) =>
                    formatChartValue(Number(value), chart.unit || "currency")
                  }
                  contentStyle={tooltipStyle}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {chart.data.map((entry) => (
              <div
                key={entry.name}
                className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2"
              >
                <p className="text-xs text-slate-300">{entry.name}</p>
                <p className="text-sm font-semibold" style={{ color: entry.color }}>
                  {formatChartValue(entry.value, chart.unit || "currency")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {chart.type === "area" && (
        <div className={fullHeight ? "mt-3 h-[calc(100%-1.6rem)] min-h-[220px]" : "mt-3 h-44"}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chart.data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.24)"
              />
              <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 11 }} />
              <YAxis
                tick={{ fill: "#cbd5e1", fontSize: 11 }}
                tickFormatter={(value) => formatAxisValue(value, chart.unit)}
              />
              <Tooltip
                formatter={(value) =>
                  formatChartValue(Number(value), chart.unit || "currency")
                }
                contentStyle={tooltipStyle}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={CHART_COLORS.cyan}
                fill={CHART_COLORS.cyan}
                fillOpacity={0.23}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
      {chart.type === "bar" && (
        <div className={fullHeight ? "mt-3 h-[calc(100%-1.6rem)] min-h-[220px]" : "mt-3 h-44"}>
          <ValueBarChart data={chart.data} unit={chart.unit || "currency"} />
        </div>
      )}
    </div>
  );
}

function ValueBarChart({ data, unit = "currency" }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.24)" />
        <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 11 }} />
        <YAxis
          tick={{ fill: "#cbd5e1", fontSize: 11 }}
          tickFormatter={(value) => formatAxisValue(value, unit)}
        />
        <Tooltip
          formatter={(value) => formatChartValue(Number(value), unit)}
          contentStyle={tooltipStyle}
        />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`${entry.name}-${index}`}
              fill={entry.color || CHART_COLORS.slate}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

const tooltipStyle = {
  background: "#020617",
  border: "1px solid rgba(148, 163, 184, 0.45)",
  borderRadius: "10px",
  color: "#e2e8f0",
};

function formatAxisValue(value, unit) {
  if (unit === "percent") return `${Number(value).toFixed(0)}%`;
  return formatCompactMoney(value);
}

function formatChartValue(value, unit) {
  if (unit === "percent") return `${Number(value).toFixed(1)}%`;
  return formatMoney(value);
}

function NumberRow({ label, value, onChange, min = 0, step = 1 }) {
  return (
    <label className="block">
      <p className="mb-2 text-xs uppercase tracking-[0.13em] text-slate-300">{label}</p>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(event) => {
          const parsed = Number(event.target.value);
          onChange(Number.isFinite(parsed) ? parsed : 0);
        }}
        className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-2.5 text-slate-100 outline-none transition focus:border-cyan-300/60"
      />
    </label>
  );
}

function RangeRow({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  suffix = "",
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.13em] text-slate-300">{label}</p>
        <p className="text-sm font-semibold text-cyan-100">
          {value}
          {suffix}
        </p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => {
          const parsed = Number(event.target.value);
          onChange(Number.isFinite(parsed) ? parsed : min);
        }}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700/70 accent-cyan-300"
      />
    </label>
  );
}

function ResultRow({ label, value, emphasize = false }) {
  return (
    <div className="flex items-center justify-between py-3 text-sm">
      <p className="text-slate-300">{label}</p>
      <p className={`font-semibold ${emphasize ? "text-cyan-100" : "text-slate-100"}`}>
        {value}
      </p>
    </div>
  );
}
