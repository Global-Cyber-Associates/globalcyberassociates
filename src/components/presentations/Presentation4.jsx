import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import logo from "../logo.png";
import slide1TlImage from "./assets/slide1 Tl.jpg";
import slide2TlImage from "./assets/slide2-TL.png";
import slide1DeveloperImage from "./assets/slide1-developer.jpg";
import slide2DeveloperImage from "./assets/Deloperslide2.png";
import slide1RemoteImage from "./assets/Remoteslide1.png";
import slide2RemoteImage from "./assets/Remoteslide2.png";
import slide1SalesImage from "./assets/slide1-sales.jpg";
import slide2SalesImage from "./assets/sales2 slide.png";

const slideOneCards = [
  {
    word: "Manager",
    image: slide1TlImage,
  },
  {
    word: "Operational Staff",
    image: slide1DeveloperImage,
  },
  {
    word: "Sales",
    image: slide1SalesImage,
  },
  {
    word: "Remote Employee",
    image: slide1RemoteImage,
  },
];

const slideTwoCards = [
  {
    word: "Manager",
    image: slide2TlImage,
  },
  {
    word: "Operational Staff",
    image: slide2DeveloperImage,
  },
  {
    word: "Sales",
    image: slide2SalesImage,
  },
  {
    word: "Remote Employee",
    image: slide2RemoteImage,
  },
];

const ORGANIZATION_IMAGE =
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80";

const CURRENCY_OPTIONS = [
  { code: "INR", label: "India - INR" },
  { code: "PHP", label: "Philippines - PHP" },
  { code: "USD", label: "United States - USD" },
  { code: "GBP", label: "United Kingdom - GBP" },
  { code: "CAD", label: "Canada - CAD" },
  { code: "AUD", label: "Australia - AUD" },
  { code: "EUR", label: "Ireland - EUR" },
  { code: "SGD", label: "Singapore - SGD" },
  { code: "MYR", label: "Malaysia - MYR" },
  { code: "VND", label: "Vietnam - VND" },
  { code: "PLN", label: "Poland - PLN" },
  { code: "RON", label: "Romania - RON" },
  { code: "MXN", label: "Mexico - MXN" },
  { code: "BRL", label: "Brazil - BRL" },
  { code: "ZAR", label: "South Africa - ZAR" },
];

const DEFAULT_CURRENCY = "INR";

// Approximate INR value per 1 unit of selected currency for presentation math.
const INR_PER_CURRENCY = {
  INR: 1,
  PHP: 1.45,
  USD: 83,
  GBP: 106,
  CAD: 61,
  AUD: 54,
  EUR: 91,
  SGD: 62,
  MYR: 18.7,
  VND: 0.0033,
  PLN: 21.2,
  RON: 18.3,
  MXN: 4.9,
  BRL: 14.7,
  ZAR: 4.5,
};

const CURRENCY_LOCALES = {
  INR: "en-IN",
  PHP: "en-PH",
  USD: "en-US",
  GBP: "en-GB",
  CAD: "en-CA",
  AUD: "en-AU",
  EUR: "en-IE",
  SGD: "en-SG",
  MYR: "ms-MY",
  VND: "vi-VN",
  PLN: "pl-PL",
  RON: "ro-RO",
  MXN: "es-MX",
  BRL: "pt-BR",
  ZAR: "en-ZA",
};

const CURRENCY_INPUT_CONFIG = {
  INR: { step: 500, decimals: 0 },
  VND: { step: 1000, decimals: 0 },
  default: { step: 10, decimals: 2 },
};

const CURRENCY_FORMATTERS = Object.fromEntries(
  CURRENCY_OPTIONS.map(({ code }) => [
    code,
    new Intl.NumberFormat(CURRENCY_LOCALES[code] || "en-US", {
      style: "currency",
      currency: code,
      minimumFractionDigits: code === "INR" || code === "VND" ? 0 : 2,
      maximumFractionDigits: code === "INR" || code === "VND" ? 0 : 2,
    }),
  ])
);
const DEFAULT_AVG_SALARY_PER_EMPLOYEE = 30000;

const CALCULATOR_ASSUMPTIONS = {
  nonProductiveHoursPerDay: 2,
  recoveryRatePercent: 50,
  toolCostPerEmployee: 150,
  paidHoursPerDay: 8,
  workingDaysPerMonth: 22,
};

const SLIDE7_STATIC = {
  systemCostPerMonth: 150,
  averageSalaryPerMonth: 30000,
  wastedHoursPerDay: 4,
  monthlySalaryWaste: 15000,
  recoveryPercent: 50,
};

function timeToMinutes(timeValue) {
  const matched = /^(\d+)h\s*(\d+)m$/i.exec(timeValue.trim());
  if (!matched) return 0;
  const hours = Number(matched[1]) || 0;
  const minutes = Number(matched[2]) || 0;
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes) {
  const safeMinutes = Math.max(Number(totalMinutes) || 0, 0);
  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;
  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}

function convertInrToCurrency(value, currencyCode = DEFAULT_CURRENCY) {
  const numericValue = Number(value);
  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
  const inrPerUnit = INR_PER_CURRENCY[currencyCode] || INR_PER_CURRENCY.INR;
  return safeValue / inrPerUnit;
}

function convertCurrencyToInr(value, currencyCode = DEFAULT_CURRENCY) {
  const numericValue = Number(value);
  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
  const inrPerUnit = INR_PER_CURRENCY[currencyCode] || INR_PER_CURRENCY.INR;
  return safeValue * inrPerUnit;
}

function formatCurrency(valueInInr, currencyCode = DEFAULT_CURRENCY) {
  const formatter = CURRENCY_FORMATTERS[currencyCode] || CURRENCY_FORMATTERS.INR;
  return formatter.format(convertInrToCurrency(valueInInr, currencyCode));
}

function getCurrencySymbol(currencyCode = DEFAULT_CURRENCY) {
  const formatter = CURRENCY_FORMATTERS[currencyCode] || CURRENCY_FORMATTERS.INR;
  const currencyPart = formatter
    .formatToParts(0)
    .find((part) => part.type === "currency");
  return currencyPart?.value || currencyCode;
}

function formatHours(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "0";
  const rounded = Math.round(numericValue * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function calculateBusinessImpact(
  employeeCount,
  avgSalaryPerEmployee,
  lostHoursPerDay = CALCULATOR_ASSUMPTIONS.nonProductiveHoursPerDay
) {
  const employees = Math.max(Number(employeeCount) || 0, 0);
  const salaryPerEmployee = Math.max(Number(avgSalaryPerEmployee) || 0, 0);
  const selectedLostHoursPerDay = Math.max(
    Math.min(
      Number(lostHoursPerDay) || 0,
      CALCULATOR_ASSUMPTIONS.paidHoursPerDay
    ),
    0
  );
  const monthlyPayroll = employees * salaryPerEmployee;
  const nonProductivePercent =
    selectedLostHoursPerDay / CALCULATOR_ASSUMPTIONS.paidHoursPerDay;
  const monthlyLoss = monthlyPayroll * nonProductivePercent;
  const monthlyRecoverable =
    monthlyLoss * (CALCULATOR_ASSUMPTIONS.recoveryRatePercent / 100);
  const monthlyToolCost =
    employees * CALCULATOR_ASSUMPTIONS.toolCostPerEmployee;
  const monthlyNetGain = monthlyRecoverable - monthlyToolCost;
  const annualNetGain = monthlyNetGain * 12;
  const monthlyWastedHours =
    employees *
    selectedLostHoursPerDay *
    CALCULATOR_ASSUMPTIONS.workingDaysPerMonth;

  return {
    employees,
    selectedLostHoursPerDay,
    monthlyWastedHours,
    monthlyPayroll,
    monthlyLoss,
    monthlyRecoverable,
    monthlyToolCost,
    monthlyNetGain,
    annualNetGain,
  };
}

export default function Presentation4() {
  const slides = useMemo(
    () => [
      {
        id: "cover",
        type: "cover-page",
        label: "Opening",
        title: "Global Cyber Associates",
        subtitle: "VisuN AI Productivity Presentation",
        openingLine: "Thank you for joining us today.",
        wish: "Wishing your team more focus, stronger output, and faster execution.",
      },
      {
        id: "vision",
        type: "image-grid",
        label: "Slide 1",
        title: "What Leaders think their company looks like",
        subtitle: "Productive people. High ownership. Fast execution.",
        hookTag: "",
        hookText: "Strong team intent and visible energy drive confidence in execution.",
        hookClass: "border-emerald-300/35 bg-emerald-500/10 text-emerald-100",
        cards: slideOneCards,
        badgeClass:
          "border-white/30 bg-slate-900/70 text-cyan-100",
      },
      {
        id: "reality",
        type: "image-grid",
        label: "Slide 2",
        title: "What it actually looks like",
        subtitle: "Employees are present, but focus is lacking and meaningful work is minimal.",
        hookTag: "",
        hookText: "Without visibility, productivity loss grows quietly and impacts business results.",
        hookClass: "border-red-300/35 bg-red-500/10 text-red-100",
        cards: slideTwoCards,
        badgeClass:
          "border-rose-300/40 bg-rose-950/70 text-rose-100",
      },
      {
        id: "problem-statement",
        type: "problem-statement",
        label: "Slide 3",
        title: "The Real Problem: Hidden Time Loss",
        subtitle:
          "Teams may look busy, but hidden idle time quietly turns payroll into loss.",
        points: [
          "Busy does not always mean productive.",
          "Without real-time visibility, lost hours stay invisible.",
          "Even 1 hour lost per employee per day becomes 22 hours per month.",
          "The result: delayed projects, missed targets, and lower team output.",
        ],
      },
      {
        id: "solution",
        type: "solution-hero",
        label: "Slide 4",
        title: "Here is your solution.",
        subtitle: "VisuN AI",
        tagline: "AI-powered productivity engine",
      },
      {
        id: "help",
        type: "help-tracking",
        label: "Slide 5",
        title: "How it helps",
        subtitle:
          "VisuN AI helps you monitor at organization level and employee level.",
        employees: [
          {
            id: "emp-1",
            username: "Aarav",
            photo:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
            productiveTime: "6h 00m",
            idleTime: "1h 00m",
            nonProductiveTime: "1h 00m",
          },
          {
            id: "emp-2",
            username: "Meera",
            photo:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
            productiveTime: "2h 20m",
            idleTime: "2h 10m",
            nonProductiveTime: "3h 30m",
            highNonProductive: true,
          },
          {
            id: "emp-3",
            username: "Rohan",
            photo:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
            productiveTime: "6h 40m",
            idleTime: "0h 50m",
            nonProductiveTime: "0h 30m",
          },
          {
            id: "emp-4",
            username: "Priya",
            photo:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
            productiveTime: "2h 10m",
            idleTime: "2h 00m",
            nonProductiveTime: "3h 50m",
            highNonProductive: true,
          },
          {
            id: "emp-5",
            username: "Kabir",
            photo:
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
            productiveTime: "2h 20m",
            idleTime: "2h 10m",
            nonProductiveTime: "3h 30m",
            highNonProductive: true,
          },
          {
            id: "emp-6",
            username: "Nisha",
            photo:
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
            productiveTime: "6h 20m",
            idleTime: "1h 00m",
            nonProductiveTime: "0h 40m",
          },
        ],
      },
      {
        id: "feature-highlights",
        type: "feature-highlights",
        label: "Slide 6",
        title: "How VisuN AI Helps You Manage Better",
        subtitle:
          "Simple, clear features any manager can use without technical skills.",
        items: [
          {
            title: "See Any Screen in One Click",
            sentence:
              "Open any employee screen instantly from your desk.",
          },
          {
            title: "Know Who Is Working and Who Is Stuck",
            sentence:
              "See productive time and idle time clearly, every day.",
          },
          {
            title: "Find Time-Wasting Apps and Websites",
            sentence:
              "Spot distractions quickly and bring focus back to real work.",
          },
          {
            title: "See How Lost Time Becomes Lost Money",
            sentence:
              "Understand monthly money loss from unproductive hours.",
          },
          {
            title: "Get Alerts Before Work Falls Behind",
            sentence:
              "Receive early warnings so you can act before deadlines are missed.",
          },
          {
            title: "View Full Team or One Employee",
            sentence:
              "View analytics for the entire organization or one particular employee.",
          },
        ],
      },
      {
        id: "comparison",
        type: "ceo-comparison",
        label: "Slide 7",
        title: "Operational Comparison: Without vs With VisuN AI",
        subtitle: "Executive view of visibility, control, and productivity outcomes.",
        withoutTitle: "CEO Without VisuN AI",
        withoutPoints: [
          "No real-time visibility into employee activity.",
          "Organization productivity cannot be measured continuously.",
          "Task, app, and web usage remain fragmented across manual reports.",
          "File audit visibility is limited and accountability is weaker.",
          "Salary leakage is detected late, reducing corrective impact.",
        ],
        withTitle: "CEO With VisuN AI",
        withPoints: [
          "Live screen monitoring enables continuous operational oversight.",
          "Productivity, idle time, and non-productive time are measured in real time.",
          "Unified tracking of applications, websites, and task-level behavior.",
          "File modification monitoring strengthens governance and accountability.",
          "Early intervention reduces salary leakage and improves ROI tracking.",
        ],
      },
      {
        id: "pricing-preview",
        type: "pricing-preview",
        label: "Slide 8",
        title: "Why Invest in VisuN AI?",
        subtitle:
          "A small monthly system cost can recover a much larger salary loss.",
      },
      {
        id: "calculator",
        type: "impact-calculator",
        label: "Slide 9",
        title: "ROI Calculator",
        subtitle:
          "Enter employees and average salary.",
      },
      {
        id: "closing",
        type: "closing-page",
        label: "Closing",
        title: "Let Us Convert Lost Time Into Business Growth",
        subtitle: "Every delayed month means more wasted hours and salary leakage.",
        hook: "If your team saves even one extra productive hour per person daily, your monthly output changes dramatically.",
        thanks: "Thank you for your time.",
        contactPrompt: "Let us connect and plan your rollout.",
        contactEmail: "info@globalcyberassociates.com",
        contactPhone: "+91 89398 51788",
        contactWebsite: "globalcyberassociates.com",
      },
    ],
    []
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("emp-1");
  const [selectedCurrency, setSelectedCurrency] = useState(DEFAULT_CURRENCY);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [calculatorEmployees, setCalculatorEmployees] = useState(50);
  const [calculatorAvgSalary, setCalculatorAvgSalary] = useState(
    DEFAULT_AVG_SALARY_PER_EMPLOYEE
  );
  const [calculatorLostHoursPerDay, setCalculatorLostHoursPerDay] = useState(
    CALCULATOR_ASSUMPTIONS.nonProductiveHoursPerDay
  );
  const formatMoney = (valueInInr) =>
    formatCurrency(valueInInr, selectedCurrency);
  const selectedCurrencySymbol = getCurrencySymbol(selectedCurrency);
  const selectedCurrencyInputConfig =
    CURRENCY_INPUT_CONFIG[selectedCurrency] || CURRENCY_INPUT_CONFIG.default;
  const calculatorSalaryStep = selectedCurrencyInputConfig.step;
  const calculatorSalaryDisplayValue = Number(
    convertInrToCurrency(calculatorAvgSalary, selectedCurrency).toFixed(
      selectedCurrencyInputConfig.decimals
    )
  );
  const activeSlide = slides[currentSlide];
  const totalSlides = slides.length;
  const useStandardHeader = !["cover", "solution", "closing"].includes(
    activeSlide.id
  );
  const selectedMonitoringData = useMemo(() => {
    if (activeSlide.type !== "help-tracking") return null;

    const employees = activeSlide.employees;
    const fallbackEmployee = employees[0];
    const selectedEmployee =
      employees.find((employee) => employee.id === selectedEmployeeId) ||
      fallbackEmployee;

    const organizationTotals = employees.reduce(
      (sum, employee) => ({
        productive: sum.productive + timeToMinutes(employee.productiveTime),
        idle: sum.idle + timeToMinutes(employee.idleTime),
        nonProductive:
          sum.nonProductive + timeToMinutes(employee.nonProductiveTime),
      }),
      { productive: 0, idle: 0, nonProductive: 0 }
    );

    const employeesCount = Math.max(employees.length, 1);
    const organizationTotalWorkMinutes = employeesCount * 480;

    const organizationData = {
      username: "Organization Overall",
      totalHoursLabel: `${minutesToTime(
        organizationTotalWorkMinutes
      )} total (8h x ${employeesCount})`,
      photo: ORGANIZATION_IMAGE,
      productiveTime: minutesToTime(organizationTotals.productive),
      idleTime: minutesToTime(organizationTotals.idle),
      nonProductiveTime: minutesToTime(organizationTotals.nonProductive),
    };

    const selectedData =
      selectedEmployeeId === "org" ? organizationData : selectedEmployee;

    const metrics = [
      {
        label: "Productivity Time",
        value: selectedData.productiveTime,
        toneClass:
          "border-emerald-300/30 bg-emerald-500/10 text-emerald-100",
        barClass: "bg-emerald-400",
      },
      {
        label: "Idle Time",
        value: selectedData.idleTime || "0h 00m",
        toneClass: "border-amber-300/30 bg-amber-500/10 text-amber-100",
        barClass: "bg-amber-400",
      },
      {
        label: "Non Productive Time",
        value: selectedData.nonProductiveTime,
        toneClass: "border-red-300/30 bg-red-500/10 text-red-100",
        barClass: "bg-red-400",
      },
    ];

    return {
      selectedData,
      metrics: metrics.map((metric) => ({
        ...metric,
        percentage: Math.max(
          (timeToMinutes(metric.value) /
            (selectedEmployeeId === "org"
              ? organizationTotalWorkMinutes
              : 480)) *
          100,
          8
        ),
      })),
    };
  }, [activeSlide, selectedEmployeeId]);

  const calculatorData = useMemo(
    () =>
      calculateBusinessImpact(
        calculatorEmployees,
        calculatorAvgSalary,
        calculatorLostHoursPerDay
      ),
    [calculatorEmployees, calculatorAvgSalary, calculatorLostHoursPerDay]
  );
  const slide7RecoveredAmount = Math.round(
    (SLIDE7_STATIC.monthlySalaryWaste * SLIDE7_STATIC.recoveryPercent) / 100
  );
  const slide7NetRecoveryAfterCost =
    slide7RecoveredAmount - SLIDE7_STATIC.systemCostPerMonth;
  const slide7RecoveryMultiple =
    SLIDE7_STATIC.systemCostPerMonth > 0
      ? slide7NetRecoveryAfterCost / SLIDE7_STATIC.systemCostPerMonth
      : 0;

  useEffect(() => {
    const onKeyDown = (event) => {
      if (isCurrencyModalOpen) {
        if (event.key === "Escape") {
          event.preventDefault();
          setIsCurrencyModalOpen(false);
        }
        return;
      }

      const target = event.target;
      const isTypingField =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isTypingField) return;

      if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === " ") {
        event.preventDefault();
        setCurrentSlide((value) => Math.min(value + 1, totalSlides - 1));
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        setCurrentSlide((value) => Math.max(value - 1, 0));
      }

      if (/^\d$/.test(event.key)) {
        const selectedSlide = Number(event.key);
        if (selectedSlide >= 1 && selectedSlide <= totalSlides) {
          setCurrentSlide(selectedSlide - 1);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isCurrencyModalOpen, totalSlides]);

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#020617_0%,#0f172a_55%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[130px]" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />

      <div className="absolute left-0 top-0 z-30 h-[3px] w-full bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
      <button
        type="button"
        aria-label={`Open currency selector (current: ${selectedCurrency})`}
        title={`Current currency: ${selectedCurrency}`}
        onClick={() => setIsCurrencyModalOpen(true)}
        className="absolute right-4 top-4 z-40 inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-cyan-300/40 bg-slate-900/85 px-2 text-cyan-100 shadow-[0_10px_30px_rgba(8,145,178,0.2)] backdrop-blur-md transition hover:border-cyan-300/70 hover:bg-slate-800/90"
      >
        <span className="text-sm font-black leading-none">
          {selectedCurrencySymbol}
        </span>
      </button>

      <main className="relative z-10 h-full w-full overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-8">
        <div className="mx-auto grid h-full w-full max-w-[1600px] grid-rows-[auto_1fr] gap-5">
          {useStandardHeader ? (
            <header className="mx-auto w-full max-w-[1500px]">
              <p className="min-h-[1rem] text-xs uppercase tracking-[0.16em] text-cyan-200/85">
                {activeSlide.label || "\u00A0"}
              </p>
              <h1 className="mt-2 w-full text-[clamp(0.95rem,3.4vw,3.5rem)] font-black tracking-tight">
                {activeSlide.title}
              </h1>
              <p className="mt-3 min-h-[1.4rem] text-sm text-slate-300 md:text-lg">
                {activeSlide.subtitle || "\u00A0"}
              </p>
            </header>
          ) : (
            <div className="h-0" aria-hidden />
          )}

          <div className="min-h-0 flex items-center justify-center">

            {activeSlide.type === "cover-page" && (
              <section className="w-full flex items-center justify-center">
                <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-cyan-300/30 bg-slate-900/65 px-7 py-9 shadow-[0_30px_120px_rgba(8,145,178,0.18)] md:px-12 md:py-12">
                  <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-[110px]" />
                  <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[110px]" />

                  <div className="relative z-10 flex flex-col items-center gap-3 text-center md:gap-4">
                    <img
                      src={logo}
                      alt="VisuN AI logo"
                      className="h-16 w-auto object-contain md:h-20"
                    />

                    <h2 className="text-[clamp(1.7rem,4.7vw,4rem)] font-black tracking-tight text-white">
                      {activeSlide.title}
                    </h2>
                    <p className="max-w-3xl text-base text-slate-200 md:text-xl">
                      {activeSlide.subtitle}
                    </p>

                    <p className="pt-1 text-sm font-semibold uppercase tracking-[0.15em] text-cyan-100/90">
                      {activeSlide.openingLine}
                    </p>
                    <p className="max-w-3xl rounded-2xl border border-emerald-300/30 bg-emerald-500/10 px-5 py-4 text-sm leading-relaxed text-emerald-100 md:text-lg">
                      {activeSlide.wish}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeSlide.type === "image-grid" && (
              <section className="w-full flex items-center justify-center">
                <div className="w-full max-w-[1500px]">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {activeSlide.cards.map((card) => (
                      <article
                        key={`${activeSlide.id}-${card.word}`}
                        className="group"
                      >
                        <div className="overflow-hidden rounded-2xl border border-white/15 bg-slate-900/60">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={card.image}
                              alt={card.word}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                          </div>
                        </div>
                        <span
                          className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${activeSlide.badgeClass}`}
                        >
                          {card.word}
                        </span>
                      </article>
                    ))}
                  </div>

                  {(activeSlide.hookTag || activeSlide.hookText) && (
                    <div
                      className={`mt-5 rounded-xl border px-4 py-3 ${activeSlide.hookClass || "border-white/15 bg-slate-900/65 text-slate-100"}`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-90">
                        {activeSlide.hookTag}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed md:text-base">
                        {activeSlide.hookText}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeSlide.type === "solution-hero" && (
              <section className="w-full flex items-center justify-center">
                <div className="relative w-full max-w-5xl px-3 md:px-6">
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/18 blur-[120px]" />

                  <div className="relative flex flex-col items-center text-center">
                    <div className="mb-5 h-px w-28 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent md:w-36" />

                    <img
                      src={logo}
                      alt="VisuN AI logo"
                      className="h-16 w-auto object-contain md:h-20"
                    />

                    <h2 className="mt-5 text-[clamp(1.8rem,5vw,4.3rem)] font-black tracking-tight text-white">
                      {activeSlide.title}
                    </h2>
                    <p className="mt-3 text-[clamp(1rem,2.2vw,2rem)] font-semibold text-cyan-100">
                      {activeSlide.subtitle}
                    </p>
                    <p className="mt-4 inline-flex rounded-full border border-cyan-200/40 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                      {activeSlide.tagline}
                    </p>
                    <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-200 md:text-lg">
                      One simple platform to see work clearly and improve outcomes faster.
                    </p>

                    <div className="mt-6 h-px w-36 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent md:w-48" />
                  </div>
                </div>
              </section>
            )}

            {activeSlide.type === "problem-statement" && (
              <section className="w-full flex items-center justify-center">
                <article className="w-full max-w-6xl rounded-[2rem] border border-amber-300/30 bg-slate-900/65 p-6 shadow-[0_30px_120px_rgba(251,191,36,0.16)] md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-100/90">
                    The struggle
                  </p>
                  <div className="mt-4 space-y-3">
                    {activeSlide.points.map((point) => (
                      <p
                        key={point}
                        className="rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-base leading-relaxed text-slate-100 md:text-lg"
                      >
                        {point}
                      </p>
                    ))}
                  </div>
                </article>
              </section>
            )}

            {activeSlide.type === "help-tracking" && (
              <section className="w-full flex items-center justify-center">
                <div className="grid w-full max-w-7xl gap-5 xl:grid-cols-[1fr_1.25fr]">
                  <article className="rounded-2xl border border-white/15 bg-slate-900/65 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/90">
                      Choose employee
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedEmployeeId("org")}
                      className={`mt-4 w-full overflow-hidden rounded-2xl border bg-slate-950/70 text-left transition ${selectedEmployeeId === "org"
                        ? "border-cyan-300/70 shadow-[0_14px_35px_rgba(34,211,238,0.2)]"
                        : "border-cyan-300/30 hover:border-cyan-300/50"
                        }`}
                    >
                      <div className="relative h-32">
                        <img
                          src={ORGANIZATION_IMAGE}
                          alt="Organization monitoring"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                          <p className="text-[11px] uppercase tracking-[0.14em] text-cyan-200/90">
                            Organization Level Monitoring
                          </p>
                          {selectedEmployeeId === "org" && (
                            <span className="rounded-full border border-cyan-200/60 bg-cyan-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-100">
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    </button>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {activeSlide.employees.map((employee) => {
                        const isActive = employee.id === selectedEmployeeId;
                        const isHighNonProductive = Boolean(
                          employee.highNonProductive
                        );
                        return (
                          <button
                            type="button"
                            key={employee.id}
                            onClick={() => setSelectedEmployeeId(employee.id)}
                            className={`rounded-xl border px-3 py-4 text-center transition ${isActive
                              ? isHighNonProductive
                                ? "border-red-300/80 bg-slate-900/70 shadow-[0_14px_35px_rgba(248,113,113,0.2)]"
                                : "border-cyan-300/70 bg-cyan-500/15 shadow-[0_14px_35px_rgba(34,211,238,0.2)]"
                              : isHighNonProductive
                                ? "border-red-300/60 bg-slate-900/70 hover:border-red-300/80"
                                : "border-white/15 bg-slate-900/70 hover:border-cyan-300/35 hover:bg-slate-900/90"
                              }`}
                          >
                            <div
                              className={`mx-auto h-12 w-12 overflow-hidden rounded-full border ${isHighNonProductive
                                ? "border-red-200/70 bg-slate-950/60"
                                : isActive
                                  ? "border-cyan-200/70 bg-gradient-to-br from-cyan-500/40 to-blue-500/20"
                                  : "border-white/20 bg-slate-950/60"
                                }`}
                            >
                              <img
                                src={employee.photo}
                                alt={employee.username}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p className="mt-2 text-xs font-semibold text-slate-100 md:text-sm">
                              {employee.username}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </article>

                  <article className="rounded-2xl border border-white/15 bg-slate-900/65 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="mt-1 text-lg font-bold text-white">
                          {selectedMonitoringData?.selectedData.username}
                        </p>
                        {selectedEmployeeId === "org" && (
                          <p className="mt-1 text-xs text-cyan-200/90">
                            {selectedMonitoringData?.selectedData.totalHoursLabel}
                          </p>
                        )}
                      </div>
                      <div className="h-11 w-11 overflow-hidden rounded-full border border-cyan-300/40 bg-cyan-500/10">
                        {selectedMonitoringData?.selectedData.photo && (
                          <img
                            src={selectedMonitoringData.selectedData.photo}
                            alt={selectedMonitoringData.selectedData.username}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {selectedMonitoringData?.metrics.map((metric) => (
                        <article
                          key={metric.label}
                          className={`rounded-xl border px-4 py-3 ${metric.toneClass}`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-[11px] uppercase tracking-[0.14em]">
                              {metric.label}
                            </p>
                            <p className="text-base font-bold">{metric.value}</p>
                          </div>
                          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-900/45">
                            <div
                              className={`h-full rounded-full ${metric.barClass}`}
                              style={{ width: `${metric.percentage}%` }}
                            />
                          </div>
                        </article>
                      ))}
                    </div>
                  </article>
                </div>
              </section>
            )}

            {activeSlide.type === "ceo-comparison" && (
              <section className="w-full flex items-center justify-center">
                <div className="grid w-full max-w-7xl gap-5 xl:grid-cols-2">
                  <article className="rounded-2xl border border-red-300/35 bg-red-500/8 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-200/90">
                      Without
                    </p>
                    <h2 className="mt-2 text-[clamp(1rem,2.2vw,1.9rem)] font-black tracking-tight text-red-100">
                      {activeSlide.withoutTitle}
                    </h2>

                    <div className="mt-4 space-y-3">
                      {activeSlide.withoutPoints.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3 rounded-xl border border-red-300/25 bg-slate-950/45 px-4 py-3"
                        >
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-300" />
                          <p className="text-sm leading-relaxed text-red-50/95">{point}</p>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="rounded-2xl border border-emerald-300/35 bg-emerald-500/8 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200/90">
                      With
                    </p>
                    <h2 className="mt-2 text-[clamp(1rem,2.2vw,1.9rem)] font-black tracking-tight text-emerald-100">
                      {activeSlide.withTitle}
                    </h2>

                    <div className="mt-4 space-y-3">
                      {activeSlide.withPoints.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3 rounded-xl border border-emerald-300/25 bg-slate-950/45 px-4 py-3"
                        >
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-300" />
                          <p className="text-sm leading-relaxed text-emerald-50/95">{point}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              </section>
            )}

            {activeSlide.type === "feature-highlights" && (
              <section className="w-full flex items-center justify-center">
                <div className="w-full max-w-7xl">
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {activeSlide.items.map((item, index) => (
                      <article
                        key={item.title}
                        className="h-full rounded-2xl border border-[var(--border-muted)] bg-[var(--background-card)] p-5 shadow-md transition hover:border-[var(--accent-color)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="text-base font-bold leading-snug tracking-tight text-[var(--white-smoke)] md:text-lg">
                            {item.title}
                          </h2>
                          <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--accent-border-mid)] bg-[var(--accent-bg-mid)] text-xs font-bold text-[var(--light-blue)]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-[0.95rem]">
                          {item.sentence}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeSlide.type === "pricing-preview" && (
              <section className="w-full flex items-center justify-center">
                <article className="w-full max-w-7xl rounded-[2rem] border border-cyan-300/25 bg-slate-900/70 p-5 shadow-[0_24px_80px_rgba(8,145,178,0.16)] md:p-7">
                  <div className="grid gap-5 md:grid-cols-3">
                    <BigValueCard
                      label="Salary Paid / Employee"
                      value={formatMoney(SLIDE7_STATIC.averageSalaryPerMonth)}
                      toneClass="border-white/20 bg-slate-900/70 text-slate-100"
                    />
                    <BigValueCard
                      label="Non-Productive Time"
                      value={`${SLIDE7_STATIC.wastedHoursPerDay}h/day`}
                      toneClass="border-amber-300/35 bg-amber-500/10 text-amber-100"
                    />
                    <BigValueCard
                      label="Salary Loss / Month"
                      value={formatMoney(SLIDE7_STATIC.monthlySalaryWaste)}
                      toneClass="border-red-300/35 bg-red-500/10 text-red-100"
                    />
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-3">
                    <BigValueCard
                      label="VisuN AI Cost / System"
                      value={`${formatMoney(SLIDE7_STATIC.systemCostPerMonth)}/system`}
                      toneClass="border-cyan-300/35 bg-cyan-500/10 text-cyan-100"
                    />
                    <BigValueCard
                      label="Recoverable Value (50%)"
                      value={formatMoney(slide7RecoveredAmount)}
                      toneClass="border-emerald-300/35 bg-emerald-500/10 text-emerald-100"
                    />
                    <BigValueCard
                      label="Net Value Recovered"
                      value={formatMoney(slide7NetRecoveryAfterCost)}
                      toneClass="border-lime-300/35 bg-lime-500/10 text-lime-100"
                    />
                  </div>

                  <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-4">
                    <p className="text-base leading-relaxed text-slate-200">
                      VisuN AI costs{" "}
                      <span className="font-bold text-cyan-100">
                        {formatMoney(SLIDE7_STATIC.systemCostPerMonth)}
                      </span>{" "}
                      per system. In this example, it can recover{" "}
                      <span className="font-bold text-emerald-100">
                        {formatMoney(slide7RecoveredAmount)}
                      </span>
                      , resulting in a net monthly recovery of{" "}
                      <span className="font-bold text-lime-100">
                        {formatMoney(slide7NetRecoveryAfterCost)}
                      </span>
                      . That is about{" "}
                      <span className="font-bold text-lime-100">
                        {slide7RecoveryMultiple.toFixed(1)}x
                      </span>{" "}
                      return over system cost every month.
                    </p>
                  </div>
                </article>
              </section>
            )}

            {activeSlide.type === "impact-calculator" && (
              <section className="w-full flex items-center justify-center">
                <div className="grid w-full max-w-7xl gap-5 xl:grid-cols-[0.95fr_1.15fr]">
                  <article className="rounded-2xl border border-white/15 bg-slate-900/65 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200/90">
                      Enter Team Details
                    </p>

                    <div className="mt-4 space-y-4">
                      <label className="block">
                        <p className="mb-2 text-xs uppercase tracking-[0.13em] text-slate-300">
                          Number of Employees
                        </p>
                        <input
                          type="number"
                          min={1}
                          step={1}
                          value={calculatorEmployees}
                          onChange={(event) => {
                            const parsed = Number(event.target.value);
                            setCalculatorEmployees(
                              Number.isFinite(parsed)
                                ? Math.max(Math.round(parsed), 1)
                                : 1
                            );
                          }}
                          className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60"
                        />
                      </label>

                      <label className="block">
                        <p className="mb-2 text-xs uppercase tracking-[0.13em] text-slate-300">
                          Avg Salary / Employee / Month ({selectedCurrency})
                        </p>
                        <input
                          type="number"
                          min={0}
                          step={calculatorSalaryStep}
                          value={calculatorSalaryDisplayValue}
                          onChange={(event) => {
                            const parsed = Number(event.target.value);
                            setCalculatorAvgSalary(
                              Number.isFinite(parsed)
                                ? Math.max(
                                  Math.round(
                                    convertCurrencyToInr(parsed, selectedCurrency)
                                  ),
                                  0
                                )
                                : 0
                            );
                          }}
                          className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60"
                        />
                      </label>

                      <label className="block">
                        <p className="mb-2 text-xs uppercase tracking-[0.13em] text-slate-300">
                          Lost Hours / Employee / Day
                        </p>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={0.5}
                            max={CALCULATOR_ASSUMPTIONS.paidHoursPerDay}
                            step={0.5}
                            value={calculatorLostHoursPerDay}
                            onChange={(event) => {
                              const parsed = Number(event.target.value);
                              setCalculatorLostHoursPerDay(
                                Number.isFinite(parsed)
                                  ? Math.max(
                                    Math.min(parsed, CALCULATOR_ASSUMPTIONS.paidHoursPerDay),
                                    0.5
                                  )
                                  : CALCULATOR_ASSUMPTIONS.nonProductiveHoursPerDay
                              );
                            }}
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-cyan-400"
                          />
                          <span className="min-w-[62px] rounded-lg border border-cyan-300/35 bg-cyan-500/10 px-3 py-2 text-center text-sm font-bold text-cyan-100">
                            {formatHours(calculatorLostHoursPerDay)}h
                          </span>
                        </div>
                      </label>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <AssumptionPill
                        label="Lost Hours (Daily)"
                        value={`${formatHours(calculatorLostHoursPerDay)}h/day`}
                      />
                      <AssumptionPill
                        label="Expected Recovery"
                        value={`${CALCULATOR_ASSUMPTIONS.recoveryRatePercent}%`}
                      />
                      <AssumptionPill
                        label="VisuN AI Cost / Employee"
                        value={`${formatMoney(CALCULATOR_ASSUMPTIONS.toolCostPerEmployee)}/employee`}
                      />
                      <AssumptionPill
                        label="Working Days / Month"
                        value={`${CALCULATOR_ASSUMPTIONS.workingDaysPerMonth}/month`}
                      />
                    </div>
                  </article>

                  <article className="relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-[linear-gradient(160deg,rgba(8,47,73,0.36)_0%,rgba(15,23,42,0.9)_52%,rgba(8,47,73,0.26)_100%)] p-4">
                    <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-[70px]" />
                    <div className="pointer-events-none absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-emerald-400/15 blur-[80px]" />

                    <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200/90">
                      Monthly Loss Overview
                    </p>

                    <div className="relative z-10 mt-4 grid gap-3 lg:grid-cols-2">
                      <div className="rounded-2xl border border-red-300/40 bg-[linear-gradient(160deg,rgba(127,29,29,0.45)_0%,rgba(15,23,42,0.9)_55%,rgba(127,29,29,0.26)_100%)] px-4 py-4 shadow-[0_14px_40px_rgba(239,68,68,0.2)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-100/90">
                          Total Hours Lost / Month
                        </p>
                        <p className="mt-1 text-4xl font-black tracking-tight text-red-100 md:text-5xl">
                          {formatHours(calculatorData.monthlyWastedHours)}h
                        </p>
                        <p className="mt-2 text-xs text-red-50/95">
                          {`${calculatorData.employees} employees x ${formatHours(
                            calculatorData.selectedLostHoursPerDay
                          )}h/day x ${CALCULATOR_ASSUMPTIONS.workingDaysPerMonth} working days`}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-rose-300/40 bg-[linear-gradient(160deg,rgba(131,24,67,0.38)_0%,rgba(15,23,42,0.9)_55%,rgba(131,24,67,0.24)_100%)] px-4 py-4 shadow-[0_14px_40px_rgba(244,63,94,0.2)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-100/90">
                          Total Salary Loss / Month
                        </p>
                        <p className="mt-1 text-4xl font-black tracking-tight text-rose-100 md:text-5xl">
                          {formatMoney(calculatorData.monthlyLoss)}
                        </p>
                        <p className="mt-2 text-xs text-rose-50/95">
                          Before recovery and before tool savings.
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 mt-4 grid gap-3 sm:grid-cols-2">
                      <CalculatorMetric
                        label="Total Salary Paid / Month"
                        value={formatMoney(calculatorData.monthlyPayroll)}
                        toneClass="border-slate-300/30 bg-slate-500/10 text-slate-100"
                      />
                      <CalculatorMetric
                        label="Potential Recovery / Month"
                        value={formatMoney(calculatorData.monthlyRecoverable)}
                        toneClass="border-emerald-300/30 bg-emerald-500/10 text-emerald-100"
                      />
                      <CalculatorMetric
                        label="VisuN AI Cost / Month"
                        value={formatMoney(calculatorData.monthlyToolCost)}
                        toneClass="border-cyan-300/30 bg-cyan-500/10 text-cyan-100"
                      />
                      <CalculatorMetric
                        label="Net Gain / Month"
                        value={formatMoney(calculatorData.monthlyNetGain)}
                        toneClass={
                          calculatorData.monthlyNetGain >= 0
                            ? "border-emerald-300/30 bg-emerald-500/10 text-emerald-100"
                            : "border-red-300/30 bg-red-500/10 text-red-100"
                        }
                        emphasize
                      />
                    </div>

                    <div
                      className={`relative z-10 mt-4 rounded-xl border px-4 py-4 ${calculatorData.annualNetGain >= 0
                        ? "border-emerald-300/30 bg-emerald-500/10 text-emerald-100"
                        : "border-red-300/30 bg-red-500/10 text-red-100"
                        }`}
                    >
                      <p className="text-xs uppercase tracking-[0.14em]">
                        Net Gain / Year
                      </p>
                      <p className="mt-1 text-3xl font-black md:text-4xl">
                        {formatMoney(calculatorData.annualNetGain)}
                      </p>
                    </div>

                    <div className="relative z-10 mt-4 rounded-xl border border-white/10 bg-slate-950/55 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100/90">
                        Quick Summary
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-200">
                        {`You are burning about ${formatHours(
                          calculatorData.monthlyWastedHours
                        )} hours and ${formatMoney(calculatorData.monthlyLoss)} every month before recovery. `}
                        {calculatorData.monthlyNetGain >= 0
                          ? `Estimated net gain after tool cost: ${formatMoney(
                            calculatorData.monthlyNetGain
                          )} per month.`
                          : `Estimated gap after tool cost: ${formatMoney(
                            Math.abs(calculatorData.monthlyNetGain)
                          )} per month.`}
                      </p>
                    </div>
                  </article>
                </div>
              </section>
            )}

            {activeSlide.type === "closing-page" && (
              <section className="w-full flex items-center justify-center">
                <div className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-cyan-300/30 bg-slate-900/65 px-8 py-12 shadow-[0_30px_120px_rgba(8,145,178,0.18)] md:px-12 md:py-16">
                  <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[115px]" />
                  <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-500/15 blur-[120px]" />

                  <div className="relative z-10 text-center">
                    <span className="inline-flex rounded-full border border-cyan-200/40 bg-cyan-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-100">
                      Final Slide
                    </span>
                    <h2 className="mx-auto mt-4 max-w-5xl text-[clamp(1.4rem,4.6vw,4rem)] font-black tracking-tight text-white">
                      {activeSlide.title}
                    </h2>
                    <p className="mx-auto mt-3 max-w-4xl text-base text-slate-200 md:text-xl">
                      {activeSlide.subtitle}
                    </p>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100/90">
                      {activeSlide.thanks}
                    </p>
                    <p className="mx-auto mt-4 max-w-4xl rounded-2xl border border-amber-300/30 bg-amber-500/10 px-5 py-4 text-sm leading-relaxed text-amber-100 md:text-lg">
                      {activeSlide.hook}
                    </p>

                    <p className="mt-7 text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">
                      {activeSlide.contactPrompt}
                    </p>

                    <div className="mx-auto mt-4 grid max-w-4xl gap-3 text-left sm:grid-cols-3">
                      <a
                        href={`mailto:${activeSlide.contactEmail}`}
                        className="rounded-xl border border-white/15 bg-slate-950/65 px-4 py-3 transition hover:border-cyan-300/55"
                      >
                        <p className="text-[11px] uppercase tracking-[0.13em] text-slate-400">
                          Email
                        </p>
                        <p className="mt-1 text-sm font-semibold text-cyan-100">
                          {activeSlide.contactEmail}
                        </p>
                      </a>
                      <a
                        href={`tel:${activeSlide.contactPhone.replace(/\s+/g, "")}`}
                        className="rounded-xl border border-white/15 bg-slate-950/65 px-4 py-3 transition hover:border-cyan-300/55"
                      >
                        <p className="text-[11px] uppercase tracking-[0.13em] text-slate-400">
                          Call
                        </p>
                        <p className="mt-1 text-sm font-semibold text-cyan-100">
                          {activeSlide.contactPhone}
                        </p>
                      </a>
                      <a
                        href={`https://${activeSlide.contactWebsite}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-white/15 bg-slate-950/65 px-4 py-3 transition hover:border-cyan-300/55"
                      >
                        <p className="text-[11px] uppercase tracking-[0.13em] text-slate-400">
                          Website
                        </p>
                        <p className="mt-1 text-sm font-semibold text-cyan-100">
                          {activeSlide.contactWebsite}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            )}

          </div>
        </div>
      </main>

      {isCurrencyModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close currency selector"
            onClick={() => setIsCurrencyModalOpen(false)}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Currency selector"
            className="relative z-10 w-full max-w-md rounded-2xl border border-cyan-300/30 bg-slate-900/95 p-4 shadow-[0_24px_80px_rgba(8,145,178,0.25)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.13em] text-cyan-100">
                Select Currency
              </p>
              <button
                type="button"
                aria-label="Close currency selector"
                onClick={() => setIsCurrencyModalOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-slate-950/65 text-slate-200 transition hover:border-cyan-300/55"
              >
                <X size={15} />
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-300/90">
              All currency values in this presentation update instantly.
            </p>

            <div className="mt-3 max-h-[58vh] space-y-2 overflow-y-auto pr-1">
              {CURRENCY_OPTIONS.map((option) => {
                const isActive = option.code === selectedCurrency;
                return (
                  <button
                    type="button"
                    key={option.code}
                    onClick={() => {
                      setSelectedCurrency(option.code);
                      setIsCurrencyModalOpen(false);
                    }}
                    className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-semibold transition ${
                      isActive
                        ? "border-cyan-300/75 bg-cyan-500/15 text-cyan-100"
                        : "border-white/12 bg-slate-950/60 text-slate-100 hover:border-cyan-300/45 hover:bg-slate-900/90"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => setCurrentSlide((value) => Math.max(value - 1, 0))}
        disabled={currentSlide === 0}
        className="absolute left-4 top-1/2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/70 text-slate-100 transition hover:border-cyan-300/50 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() =>
          setCurrentSlide((value) => Math.min(value + 1, totalSlides - 1))
        }
        disabled={currentSlide === totalSlides - 1}
        className="absolute right-4 top-1/2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/70 text-slate-100 transition hover:border-cyan-300/50 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

function BigValueCard({
  label,
  value,
  note = "",
  toneClass = "border-white/10 bg-slate-950/55 text-slate-100",
}) {
  return (
    <article className={`rounded-xl border px-4 py-4 ${toneClass}`}>
      <p className="whitespace-nowrap text-xs uppercase tracking-[0.13em] opacity-90">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black md:text-4xl">{value}</p>
      {note && <p className="mt-2 text-sm opacity-85">{note}</p>}
    </article>
  );
}

function AssumptionPill({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/55 px-3 py-3">
      <p className="text-xs uppercase tracking-[0.13em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function CalculatorMetric({
  label,
  value,
  toneClass = "border-white/10 bg-slate-950/55 text-slate-100",
  emphasize = false,
  note = "",
}) {
  return (
    <article className={`rounded-xl border px-4 py-3 ${toneClass}`}>
      <p className="text-xs uppercase tracking-[0.13em] opacity-90">
        {label}
      </p>
      <p className={`mt-1 ${emphasize ? "text-2xl font-black" : "text-xl font-bold"}`}>
        {value}
      </p>
      {note && <p className="mt-1 text-xs opacity-80">{note}</p>}
    </article>
  );
}

