import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BellRing,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  Globe,
  Lock,
  Monitor,
  RotateCcw,
  ShieldAlert,
  Timer,
  TrendingDown,
  Usb,
  Users,
  X,
} from "lucide-react";
import logo from "../logo.png";
import bpoOffice1 from "./assets/bpo-office-1.jpg";
import bpoOffice2 from "./assets/bpo-office-2.jpg";
import bpoOffice3 from "./assets/bpo-office-3.jpg";
import frustratedAgent from "./assets/bpo-frustrated-agent.jpg";
import happyAgent from "./assets/bpo-happy-agent.jpg";

const BPO_PROBLEMS = [
  {
    title: "Average Handle Time Creeps Up Unnoticed",
    description: "A call that should take four minutes stretches to seven, and nobody sees the pattern until the SLA report lands.",
    icon: Clock,
  },
  {
    title: "Shrinkage Quietly Eats the Schedule",
    description: "Breaks, no-shows, and \"system issues\" chip away at paid hours long before a single call gets answered.",
    icon: Timer,
  },
  {
    title: "Agents Drift From Their Shift Times",
    description: "Login and logout times slip ten minutes here, fifteen there — and it adds up to a lost shift every month.",
    icon: Users,
  },
  {
    title: "Anyone Can Open a Client Call Recording",
    description: "Sensitive QA recordings and compliance data sit open to the whole floor, not just the supervisors who need them.",
    icon: Lock,
  },
  {
    title: "Distracted Agents Miss the Queue",
    description: "Tabs stay open to social media and shopping sites while calls sit waiting in the queue.",
    icon: Globe,
  },
  {
    title: "SLA Breaches Surface Too Late",
    description: "A client's service-level target slips for days before anyone on your side notices.",
    icon: BellRing,
  },
  {
    title: "Work-From-Home Agents, Zero Visibility",
    description: "Half your floor works remote, but no one can tell if they're on a call or watching a show.",
    icon: Eye,
  },
  {
    title: "Client PII and Card Data Walks Out the Door",
    description: "Agents handle cardholder and patient data all day; one screenshot or USB copy and it's already gone.",
    icon: ShieldAlert,
  },
  {
    title: "Invisible Burnout Drives Agents Out the Door",
    description: "An agent quietly checks out for weeks, and the first sign anyone sees is a resignation letter.",
    icon: AlertTriangle,
  },
];

const COMPANY_LOSS_CASES = [
  {
    company: "Caduceus Health",
    flag: "🇺🇸",
    image: bpoOffice1,
    stat: "14%",
    statLabel: "call abandonment rate, no floor visibility",
    loss: "Remote billing and call teams had no real-time visibility. Call abandonment kept climbing and managers couldn't tell why.",
    tool: "Workforce Productivity Tracking Tool",
    result: "Call abandonment dropped to under 3%, productivity rose 20%, and employee engagement climbed 30%.",
    sourceLabel: "Caduceus Health Case Study",
    sourceUrl: "https://www.insightful.io/customer/caduceus-health",
  },
  {
    company: "SupportZebra",
    flag: "🇵🇭",
    image: bpoOffice2,
    statLabel: "700+ agents, zero real-time visibility after going hybrid",
    loss: "When the floor went hybrid, managers lost the ability to see who was actually working — and their old monitoring tool couldn't fix it.",
    tool: "Workforce Productivity Tracking Tool",
    result: "Real-time dashboards and client-facing reports restored full transparency, strengthening trust with the clients whose accounts they run.",
    sourceLabel: "SupportZebra Case Study",
    sourceUrl: "https://www.insightful.io/customers/supportzebra",
  },
  {
    company: "A Global Contact Center*",
    flag: "🌐",
    image: bpoOffice3,
    stat: "$800,000",
    statLabel: "spent yearly on unused software licenses alone",
    loss: "Agents drifted to secondary tasks during peak hours, call wait times crept up, and licenses nobody used kept renewing.",
    tool: "Workforce Productivity Tracking Tool",
    result: "Peak-hour call wait times fell 30%, and $800,000 in unused software licenses was recovered in year one.",
    sourceLabel: "Contact Center Case Study",
    sourceUrl: "https://www.activtrak.com/blog/case-study-inside-sales-call-centers/",
  },
];

const BPO_IMPACT_EVIDENCE = [
  {
    category: "Attrition & Workforce Loss",
    icon: Users,
    visual: "range",
    rangeMax: 60,
    rangeUnit: "%",
    bandStart: 30,
    bandEnd: 40,
    stat: "30–40%",
    line: "That's normal annual agent turnover across 500+ benchmarked contact centers — before anyone even calls it a crisis.",
    sourceLabel: "SQM Group",
    sourceUrl: "https://www.sqmgroup.com/resources/library/blog/call-center-attrition-rate",
  },
  {
    category: "Remote Agent Trust Risk",
    icon: Eye,
    visual: "donut",
    percent: 55,
    stat: "55%",
    line: "That many US consumers already see work-from-home agents as a risk to their personal data.",
    sourceLabel: "Eckoh",
    sourceUrl: "https://www.eckoh.com/blog/understanding-consumer-concerns-about-home-based-agents",
  },
  {
    category: "Insider Data Risk",
    icon: ShieldAlert,
    visual: "donut",
    percent: 45,
    stat: "45%",
    line: "That many data leaks trace back to a careless or malicious insider — not an outside hacker.",
    sourceLabel: "Ponemon Institute",
    sourceUrl: "https://www.kiteworks.com/cybersecurity-risk-management/hidden-enemy-within-decoding-the-2025-ponemon-institute-report-on-insider-threats/",
  },
];

const SOLUTION_PROBLEM_PAIRS = [
  {
    id: "activity",
    solution: "Know Who's On a Call and Who's Stuck",
    problem: "Work-from-home agents have zero visibility",
    icon: Activity,
  },
  {
    id: "screen",
    solution: "See Any Agent's Screen in One Click",
    problem: "Average handle time creeps up unnoticed",
    icon: Monitor,
  },
  {
    id: "apps",
    solution: "Find Time-Wasting Apps and Websites",
    problem: "Distracted agents miss the queue",
    icon: Globe,
  },
  {
    id: "usb",
    solution: "Catch USB and File Risks Instantly",
    problem: "Client PII and card data walks out the door",
    icon: Usb,
  },
  {
    id: "money",
    solution: "See How Lost Time Becomes Lost Money",
    problem: "Shrinkage quietly eats the schedule",
    icon: DollarSign,
  },
  {
    id: "alerts",
    solution: "Get Alerts Before an SLA Is Missed",
    problem: "SLA breaches surface too late",
    icon: BellRing,
  },
  {
    id: "view",
    solution: "View Full Floor or One Agent",
    problem: "Agents drift from their shift times",
    icon: Users,
  },
  {
    id: "access",
    solution: "Control Who Sees What",
    problem: "Anyone can open a client call recording",
    icon: Lock,
  },
];

const SOLUTION_MATCH_RIGHT_ORDER = [
  "activity",
  "screen",
  "apps",
  "usb",
  "money",
  "alerts",
  "view",
  "access",
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
// BPO/call-center agent salaries typically run lower than the insurance-deck
// defaults, so the starting assumptions here are adjusted accordingly: a
// larger floor headcount and a lower average monthly salary per agent.
const DEFAULT_AVG_SALARY_PER_EMPLOYEE = 22000;

const CALCULATOR_ASSUMPTIONS = {
  nonProductiveHoursPerDay: 2,
  recoveryRatePercent: 50,
  toolCostPerEmployee: 799,
  paidHoursPerDay: 8,
  workingDaysPerMonth: 22,
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
  lostHoursPerDay = CALCULATOR_ASSUMPTIONS.nonProductiveHoursPerDay,
  toolCostPerEmployee = CALCULATOR_ASSUMPTIONS.toolCostPerEmployee
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
  const selectedToolCostPerEmployee = Math.max(
    Number(toolCostPerEmployee) || 0,
    0
  );
  const monthlyPayroll = employees * salaryPerEmployee;
  const nonProductivePercent =
    selectedLostHoursPerDay / CALCULATOR_ASSUMPTIONS.paidHoursPerDay;
  const monthlyLoss = monthlyPayroll * nonProductivePercent;
  const monthlyRecoverable =
    monthlyLoss * (CALCULATOR_ASSUMPTIONS.recoveryRatePercent / 100);
  const monthlyToolCost = employees * selectedToolCostPerEmployee;
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

export default function Presentation7() {
  const MotionArticle = motion.article;
  const slides = useMemo(
    () => [
      {
        id: "cover",
        type: "cover-page",
        label: "Slide 1",
        title: "Global Cyber Associates",
        subtitle: "VisuN AI Productivity Presentation",
        openingLine: "Thank you for joining us today.",
        wish: "Wishing your floor more focus, stronger SLAs, and calls that never sit waiting.",
      },
      {
        id: "timeline",
        type: "loss-timeline",
        label: "Slide 2",
        title: "Let's Start with a Story",
        subtitle: "Three real companies, and what it cost them before they changed.",
        companyCases: COMPANY_LOSS_CASES,
      },
      {
        id: "vision",
        type: "problem-cards",
        label: "Slide 3",
        title: "The Problems These Stories Reveal",
        subtitle: "Shrinkage, SLAs, and remote agents — all running with blind spots.",
        problems: BPO_PROBLEMS,
        impactTitle: "The Real Impact",
        evidence: BPO_IMPACT_EVIDENCE,
      },
      {
        id: "solved",
        type: "how-they-solved",
        label: "Slide 4",
        title: "Real Companies, Real Results",
        subtitle: "Tap a company to reveal what they used, and what happened next.",
        companyCases: COMPANY_LOSS_CASES,
      },
      {
        id: "solution",
        type: "solution-hero",
        label: "Slide 5",
        title: "Meet VisuN AI",
        subtitle: "VisuN AI",
        tagline: "AI-powered productivity engine",
      },
      {
        id: "match",
        type: "solution-match",
        label: "Slide 6",
        title: "Watch Every Problem Get Solved",
        subtitle: "Drag a problem on the left to its matching solution on the right.",
        pairs: SOLUTION_PROBLEM_PAIRS,
        rightOrder: SOLUTION_MATCH_RIGHT_ORDER,
      },
      {
        id: "help",
        type: "help-tracking",
        label: "Slide 7",
        title: "VisuN AI in Action",
        subtitle:
          "VisuN AI tracks attendance and productivity together — for the whole floor and for every agent.",
        employees: [
          {
            id: "emp-1",
            username: "Aarav",
            photo:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
            checkIn: "09:01 AM",
            checkOut: "06:04 PM",
            productiveTime: "6h 00m",
            idleTime: "1h 00m",
            nonProductiveTime: "1h 00m",
          },
          {
            id: "emp-2",
            username: "Meera",
            photo:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
            checkIn: "08:58 AM",
            checkOut: "06:02 PM",
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
            checkIn: "09:00 AM",
            checkOut: "05:59 PM",
            productiveTime: "6h 40m",
            idleTime: "0h 50m",
            nonProductiveTime: "0h 30m",
          },
          {
            id: "emp-4",
            username: "Priya",
            photo:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
            checkIn: "09:03 AM",
            checkOut: "06:01 PM",
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
            checkIn: "08:59 AM",
            checkOut: "06:05 PM",
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
            checkIn: "09:02 AM",
            checkOut: "06:00 PM",
            productiveTime: "6h 20m",
            idleTime: "1h 00m",
            nonProductiveTime: "0h 40m",
          },
        ],
      },
      {
        id: "comparison",
        type: "ceo-comparison",
        label: "Slide 8",
        title: "Without vs With VisuN AI",
        subtitle: "Same floor. A completely different result.",
        sadPhoto: frustratedAgent,
        happyPhoto: happyAgent,
        withoutLabels: [
          "No Idea Which Agents Are On Queue",
          "Attendance Records Don't Add Up",
          "No Data on Idle Time Between Calls",
          "Quality Misses Go Unnoticed",
          "SLA Penalties Pile Up Every Month",
        ],
        withLabels: [
          "See Every Agent's Screen Live",
          "Attendance Verified Automatically",
          "Idle Time Tracked in Real Time",
          "Every Interaction Is Logged",
          "SLA Penalties Recovered as Savings",
        ],
      },
      {
        id: "calculator",
        type: "impact-calculator",
        label: "Slide 9",
        title: "Calculate Your ROI",
        subtitle:
          "Enter agents and average salary.",
      },
      {
        id: "closing",
        type: "closing-page",
        label: "Slide 10",
        title: "Let Us Turn Idle Minutes Into Client Retention",
        subtitle: "Every unmonitored shift means slower SLAs, thinner margins, and clients who start asking questions.",
        hook: "If your floor recovers even one extra productive hour per agent daily, your SLA compliance and margins move immediately.",
        thanks: "Thank you for your time.",
        contactPrompt: "Let us connect and plan your rollout.",
        contactEmail: "ram@globalcyberassociates.com",
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
  const [calculatorEmployees, setCalculatorEmployees] = useState(800);
  const [calculatorAvgSalary, setCalculatorAvgSalary] = useState(
    DEFAULT_AVG_SALARY_PER_EMPLOYEE
  );
  const [calculatorLostHoursPerDay, setCalculatorLostHoursPerDay] = useState(
    CALCULATOR_ASSUMPTIONS.nonProductiveHoursPerDay
  );
  const [calculatorToolCostPerEmployee, setCalculatorToolCostPerEmployee] =
    useState(CALCULATOR_ASSUMPTIONS.toolCostPerEmployee);
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
  const calculatorToolCostDisplayValue = Number(
    convertInrToCurrency(
      calculatorToolCostPerEmployee,
      selectedCurrency
    ).toFixed(selectedCurrencyInputConfig.decimals)
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
      username: "Entire Floor",
      totalHoursLabel: `${minutesToTime(
        organizationTotalWorkMinutes
      )} total (8h x ${employeesCount})`,
      attendanceLabel: `${employeesCount}/${employeesCount} present today`,
      photo: ORGANIZATION_IMAGE,
      productiveTime: minutesToTime(organizationTotals.productive),
      idleTime: minutesToTime(organizationTotals.idle),
      nonProductiveTime: minutesToTime(organizationTotals.nonProductive),
    };

    const selectedData =
      selectedEmployeeId === "org"
        ? organizationData
        : {
            ...selectedEmployee,
            attendanceLabel: `Present · ${selectedEmployee.checkIn} – ${selectedEmployee.checkOut}`,
          };

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
        calculatorLostHoursPerDay,
        calculatorToolCostPerEmployee
      ),
    [
      calculatorEmployees,
      calculatorAvgSalary,
      calculatorLostHoursPerDay,
      calculatorToolCostPerEmployee,
    ]
  );
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
      <span className="absolute bottom-3 left-4 z-40 text-[11px] font-medium tracking-[0.08em] text-slate-500">
        {activeSlide.label}
      </span>
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

      <main className="relative z-10 h-full w-full overflow-y-auto px-3 py-3 sm:px-5 sm:py-4 md:px-7 md:py-5">
        <div className="mx-auto grid h-full w-full max-w-[1280px] grid-rows-[auto_1fr] gap-3">
          {useStandardHeader ? (
            <header className="mx-auto w-full max-w-[1200px]">
              <h1 className="w-full text-[clamp(0.85rem,2.4vw,2.1rem)] font-black tracking-tight leading-none mb-1">
                {activeSlide.title}
              </h1>
              <p className="min-h-[1.2rem] text-xs text-slate-300 md:text-sm relative z-20">
                {activeSlide.subtitle || " "}
              </p>
            </header>
          ) : (
            <div className="h-0" aria-hidden />
          )}

          <div className="min-h-0 w-full flex flex-col items-center justify-center">

            {activeSlide.type === "cover-page" && (
              <section className="w-full flex items-center justify-center">
                <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-900/65 px-5 py-6 shadow-[0_30px_120px_rgba(8,145,178,0.18)] md:px-9 md:py-8">
                  <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-[110px]" />
                  <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[110px]" />

                  <div className="relative z-10 flex flex-col items-center gap-2 text-center md:gap-3">
                    <img
                      src={logo}
                      alt="VisuN AI logo"
                      className="h-10 w-auto object-contain md:h-12"
                    />

                    <h2 className="text-[clamp(1.3rem,3.2vw,2.4rem)] font-black tracking-tight text-white">
                      {activeSlide.title}
                    </h2>
                    <p className="max-w-2xl text-sm text-slate-200 md:text-base">
                      {activeSlide.subtitle}
                    </p>

                    <p className="pt-0.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100/90">
                      {activeSlide.openingLine}
                    </p>
                    <p className="max-w-2xl rounded-2xl border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 text-xs leading-relaxed text-emerald-100 md:text-sm">
                      {activeSlide.wish}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeSlide.type === "loss-timeline" && (
              <section className="w-full flex items-center justify-center">
                <div className="w-full max-w-6xl space-y-5">
                  {activeSlide.companyCases && (
                    <div className="grid gap-5 sm:grid-cols-3">
                      {activeSlide.companyCases.map((item, index) => (
                        <MotionArticle
                          key={item.company}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                          className="flex flex-col overflow-hidden rounded-2xl border border-red-300/25 bg-slate-900/65 shadow-[0_18px_50px_rgba(239,68,68,0.15)]"
                        >
                          <div className="relative aspect-square w-full flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.company}
                              className="h-full w-full object-cover grayscale-[35%] contrast-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-red-950/25 to-transparent" />
                            <p className="absolute bottom-2 left-3 right-3 text-sm font-bold text-white">
                              {item.flag} {item.company}
                            </p>
                          </div>

                          <div className="flex flex-1 flex-col items-center p-4 text-center">
                            <div className="flex items-center gap-1 text-red-300">
                              <TrendingDown size={13} strokeWidth={2.5} />
                            </div>

                            {item.stat && (
                              <div className="mt-1.5">
                                <p className="text-2xl font-black tracking-tight text-red-300">
                                  {item.stat}
                                </p>
                                {item.statLabel && (
                                  <p className="text-[11px] text-slate-400">
                                    {item.statLabel}
                                  </p>
                                )}
                              </div>
                            )}
                            {!item.stat && item.statLabel && (
                              <p className="mt-1.5 text-[11px] text-slate-400">
                                {item.statLabel}
                              </p>
                            )}

                            <p className="mt-2 text-xs leading-relaxed text-red-50/90">
                              {item.loss}
                            </p>

                            {item.sourceUrl && (
                              <a
                                href={item.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-auto pt-2 text-[10px] text-slate-500 transition hover:text-cyan-200"
                              >
                                Source: {item.sourceLabel}
                              </a>
                            )}
                          </div>
                        </MotionArticle>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeSlide.type === "how-they-solved" && (
              <section className="w-full flex items-center justify-center">
                <div className="grid w-full max-w-6xl gap-5 sm:grid-cols-3">
                  {activeSlide.companyCases.map((item, index) => (
                    <SolvedFlipCard key={item.company} item={item} index={index} />
                  ))}
                </div>
              </section>
            )}

            {activeSlide.type === "problem-cards" && (
              <section className="w-full flex items-center justify-center">
                <div className="w-full max-w-6xl">
                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {activeSlide.problems.map((problem, index) => {
                      const Icon = problem.icon;
                      return (
                        <MotionArticle
                          key={problem.title}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.06 }}
                          whileHover={{ y: -2 }}
                          className="flex items-start gap-2.5 rounded-xl border border-red-300/25 bg-slate-900/65 p-3 shadow-[0_14px_40px_rgba(2,6,23,0.4)] transition duration-300 hover:border-red-300/45"
                        >
                          {Icon && (
                            <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-red-300/30 bg-red-500/10 text-red-200">
                              <Icon size={16} strokeWidth={2} />
                            </span>
                          )}
                          <div>
                            <h2 className="text-[13px] font-bold leading-snug tracking-tight text-white">
                              {problem.title}
                            </h2>
                            <p className="mt-1 text-[11px] leading-snug text-slate-400">
                              {problem.description}
                            </p>
                          </div>
                        </MotionArticle>
                      );
                    })}
                  </div>

                  {activeSlide.evidence && (
                    <div className="mt-4">
                      <div className="mb-2 flex items-center gap-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
                          {activeSlide.impactTitle}
                        </p>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>

                      <div className="grid gap-2.5 sm:grid-cols-3">
                        {activeSlide.evidence.map((metric, index) => {
                          const Icon = metric.icon;
                          return (
                            <MotionArticle
                              key={metric.category}
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.45, delay: 0.3 + index * 0.1 }}
                              whileHover={{ y: -2 }}
                              className="flex flex-col items-center rounded-xl border border-red-300/25 bg-slate-900/65 p-3 text-center shadow-[0_14px_40px_rgba(2,6,23,0.4)] transition duration-300 hover:border-red-300/45"
                            >
                              <div className="flex items-center gap-1.5">
                                <Icon size={12} className="text-red-300" strokeWidth={2} />
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-red-200/85">
                                  {metric.category}
                                </p>
                              </div>

                              <div className="mt-2">
                                {metric.visual === "donut" ? (
                                  <DonutStat percent={metric.percent} label={metric.stat} size="sm" />
                                ) : (
                                  <RangeStat
                                    max={metric.rangeMax}
                                    unit={metric.rangeUnit}
                                    bandStart={metric.bandStart}
                                    bandEnd={metric.bandEnd}
                                    label={metric.stat}
                                    size="sm"
                                  />
                                )}
                              </div>

                              <p className="mt-2 text-[11px] leading-snug text-slate-300">
                                {metric.line}
                              </p>

                              <a
                                href={metric.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 text-[9px] text-slate-500 transition hover:text-cyan-200"
                              >
                                Source: {metric.sourceLabel}
                              </a>
                            </MotionArticle>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeSlide.type === "solution-hero" && (
              <section className="w-full flex items-center justify-center">
                <div className="relative w-full max-w-3xl px-3 md:px-6">
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/18 blur-[120px]" />

                  <div className="relative flex flex-col items-center text-center">
                    <div className="mb-3 h-px w-24 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent md:w-32" />

                    <img
                      src={logo}
                      alt="VisuN AI logo"
                      className="h-10 w-auto object-contain md:h-12"
                    />

                    <h2 className="mt-3 text-[clamp(1.3rem,3.2vw,2.4rem)] font-black tracking-tight text-white">
                      {activeSlide.title}
                    </h2>
                    <p className="mt-2 text-[clamp(0.9rem,1.6vw,1.35rem)] font-semibold text-cyan-100">
                      {activeSlide.subtitle}
                    </p>
                    <p className="mt-3 inline-flex rounded-full border border-cyan-200/40 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                      {activeSlide.tagline}
                    </p>
                    <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-200 md:text-sm">
                      One simple platform to see every agent clearly and hit every SLA faster.
                    </p>

                    <div className="mt-4 h-px w-28 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent md:w-36" />
                  </div>
                </div>
              </section>
            )}

            {activeSlide.type === "solution-match" && (
              <section className="w-full flex items-center justify-center">
                <SolutionMatchBoard
                  pairs={activeSlide.pairs}
                  rightOrder={activeSlide.rightOrder}
                />
              </section>
            )}

            {activeSlide.type === "help-tracking" && (
              <section className="w-full flex items-center justify-center">
                <div className="grid w-full max-w-7xl gap-5 xl:grid-cols-[1fr_1.25fr]">
                  <article className="rounded-2xl border border-white/15 bg-slate-900/65 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/90">
                      Choose agent
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
                          alt="Floor-wide monitoring"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                          <p className="text-[11px] uppercase tracking-[0.14em] text-cyan-200/90">
                            Floor-Wide Monitoring
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
                        {selectedMonitoringData?.selectedData.attendanceLabel && (
                          <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-300/35 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">
                            <CheckCircle2 size={12} />
                            {selectedMonitoringData.selectedData.attendanceLabel}
                          </span>
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
                <div className="w-full max-w-4xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-red-400/30 shadow-[0_20px_60px_rgba(239,68,68,0.25)] md:h-44 md:w-44">
                        <img
                          src={activeSlide.sadPhoto}
                          alt="Without VisuN AI"
                          className="h-full w-full object-cover grayscale contrast-125 brightness-75"
                        />
                      </div>
                      <p className="mt-3 text-base font-bold text-red-200">
                        Without VisuN AI
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-emerald-400/30 shadow-[0_20px_60px_rgba(16,185,129,0.25)] md:h-44 md:w-44">
                        <img
                          src={activeSlide.happyPhoto}
                          alt="With VisuN AI"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="mt-3 text-base font-bold text-emerald-200">
                        With VisuN AI
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 items-stretch gap-x-6 gap-y-3">
                    {activeSlide.withoutLabels.map((label, index) => (
                      <Fragment key={label}>
                        <motion.div
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: index * 0.08 }}
                          className="flex items-center gap-2.5 rounded-xl border border-red-300/30 bg-red-500/8 px-4 py-3"
                        >
                          <X
                            size={14}
                            className="flex-shrink-0 text-red-300"
                            strokeWidth={2.5}
                          />
                          <p className="text-sm font-semibold text-red-100">
                            {label}
                          </p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: 0.15 + index * 0.08 }}
                          className="flex items-center gap-2.5 rounded-xl border border-emerald-300/30 bg-emerald-500/8 px-4 py-3"
                        >
                          <CheckCircle2
                            size={14}
                            className="flex-shrink-0 text-emerald-300"
                            strokeWidth={2.5}
                          />
                          <p className="text-sm font-semibold text-emerald-100">
                            {activeSlide.withLabels[index]}
                          </p>
                        </motion.div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </section>
            )}


            {activeSlide.type === "impact-calculator" && (
              <section className="w-full flex items-center justify-center">
                <div className="grid w-full max-w-7xl gap-4 xl:grid-cols-[0.95fr_1.15fr]">
                  <article className="rounded-2xl border border-white/15 bg-slate-900/65 p-4 md:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/90">
                      Enter Floor Details
                    </p>

                    <div className="mt-3 space-y-3">
                      <label className="block">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.13em] text-slate-300">
                          Number of Agents
                        </p>
                        <input
                          type="number"
                          min={1}
                          step={1}
                          value={calculatorEmployees}
                          onChange={(event) => {
                            const parsed = Number(event.target.value);
                            setCalculatorEmployees(
                              Number.isFinite(parsed) ? Math.max(Math.round(parsed), 1) : 1
                            );
                          }}
                          className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300/60"
                        />
                      </label>

                      <label className="block">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.13em] text-slate-300">
                          Avg Salary / Agent / Month ({selectedCurrency})
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
                                ? Math.max(Math.round(convertCurrencyToInr(parsed, selectedCurrency)), 0)
                                : 0
                            );
                          }}
                          className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300/60"
                        />
                      </label>

                      <label className="block">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.13em] text-slate-300">
                          VisuN AI Cost / Agent / Month ({selectedCurrency})
                        </p>
                        <input
                          type="number"
                          min={0}
                          step={calculatorSalaryStep}
                          value={calculatorToolCostDisplayValue}
                          onChange={(event) => {
                            const parsed = Number(event.target.value);
                            setCalculatorToolCostPerEmployee(
                              Number.isFinite(parsed)
                                ? Math.max(Math.round(convertCurrencyToInr(parsed, selectedCurrency)), 0)
                                : 0
                            );
                          }}
                          className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300/60"
                        />
                      </label>

                      <label className="block">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.13em] text-slate-300">
                          Lost Hours / Agent / Day
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
                                  ? Math.max(Math.min(parsed, CALCULATOR_ASSUMPTIONS.paidHoursPerDay), 0.5)
                                  : CALCULATOR_ASSUMPTIONS.nonProductiveHoursPerDay
                              );
                            }}
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-cyan-400"
                          />
                          <span className="min-w-[50px] rounded-lg border border-cyan-300/35 bg-cyan-500/10 px-2 py-1 text-center text-xs font-bold text-cyan-100">
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
                        label="VisuN AI Cost / Agent"
                        value={`${formatMoney(calculatorToolCostPerEmployee)}/agent`}
                      />
                      <AssumptionPill
                        label="Working Days / Month"
                        value={`${CALCULATOR_ASSUMPTIONS.workingDaysPerMonth}/month`}
                      />
                    </div>
                  </article>

                  <article className="relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-[linear-gradient(160deg,rgba(8,47,73,0.36)_0%,rgba(15,23,42,0.9)_52%,rgba(8,47,73,0.26)_100%)] p-4 md:p-5">
                    <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-[70px]" />
                    <div className="pointer-events-none absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-emerald-400/15 blur-[80px]" />

                    <p className="relative z-10 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/90">
                      Monthly Loss Overview
                    </p>

                    <div className="relative z-10 mt-3 grid gap-3 lg:grid-cols-2">
                      <div className="rounded-2xl border border-red-300/40 bg-[linear-gradient(160deg,rgba(127,29,29,0.45)_0%,rgba(15,23,42,0.9)_55%,rgba(127,29,29,0.26)_100%)] px-4 py-3 shadow-[0_14px_40px_rgba(239,68,68,0.2)]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-red-100/90">Total Hours Lost / Month</p>
                        <p className="mt-1 text-3xl font-black tracking-tight text-red-100">{formatHours(calculatorData.monthlyWastedHours)}h</p>
                      </div>

                      <div className="rounded-2xl border border-rose-300/40 bg-[linear-gradient(160deg,rgba(131,24,67,0.38)_0%,rgba(15,23,42,0.9)_55%,rgba(131,24,67,0.24)_100%)] px-4 py-3 shadow-[0_14px_40px_rgba(244,63,94,0.2)]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-100/90">Total Salary Loss / Month</p>
                        <p className="mt-1 text-3xl font-black tracking-tight text-rose-100">{formatMoney(calculatorData.monthlyLoss)}</p>
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

                    <div className={`relative z-10 mt-3 rounded-xl border px-4 py-3 ${calculatorData.annualNetGain >= 0 ? "border-emerald-300/30 bg-emerald-500/10 text-emerald-100" : "border-red-300/30 bg-red-500/10 text-red-100"}`}>
                      <p className="text-[11px] uppercase tracking-[0.14em]">Net Gain / Year</p>
                      <p className="mt-1 text-2xl font-black">{formatMoney(calculatorData.annualNetGain)}</p>
                    </div>

                    <div className="relative z-10 mt-3 rounded-xl border border-white/10 bg-slate-950/55 px-4 py-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100/90">Quick Summary</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-200">
                        {`Burning ${formatHours(calculatorData.monthlyWastedHours)}h and ${formatMoney(calculatorData.monthlyLoss)}/mo. `}
                        {calculatorData.monthlyNetGain >= 0 ? `Estimated net gain after tool cost: ${formatMoney(calculatorData.monthlyNetGain)}/mo.` : `Estimated gap after tool cost: ${formatMoney(Math.abs(calculatorData.monthlyNetGain))}/mo.`}
                      </p>
                    </div>
                  </article>

                </div>
              </section>
            )}

            {activeSlide.type === "closing-page" && (
              <section className="w-full flex items-center justify-center">
                <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-900/65 px-6 py-8 shadow-[0_30px_120px_rgba(8,145,178,0.18)] md:px-9 md:py-10">
                  <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[115px]" />
                  <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-500/15 blur-[120px]" />

                  <div className="relative z-10 text-center">
                    <span className="inline-flex rounded-full border border-cyan-200/40 bg-cyan-500/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-100">
                      Final Slide
                    </span>
                    <h2 className="mx-auto mt-3 max-w-3xl text-[clamp(1.3rem,3.2vw,2.4rem)] font-black tracking-tight text-white">
                      {activeSlide.title}
                    </h2>
                    <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-200 md:text-base">
                      {activeSlide.subtitle}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/90">
                      {activeSlide.thanks}
                    </p>
                    <p className="mx-auto mt-3 max-w-2xl rounded-2xl border border-amber-300/30 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-100 md:text-sm">
                      {activeSlide.hook}
                    </p>

                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
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

function DonutStat({ percent, label, size = "md" }) {
  const isSmall = size === "sm";
  const radius = isSmall ? 40 : 46;
  const circumference = 2 * Math.PI * radius;
  const safePercent = Math.max(Math.min(percent, 100), 0);
  const dash = (safePercent / 100) * circumference;
  const boxClass = isSmall ? "h-24 w-24" : "h-32 w-32";

  return (
    <div className={`relative inline-flex items-center justify-center ${boxClass}`}>
      <svg viewBox="0 0 120 120" className={`-rotate-90 ${boxClass}`}>
        <circle
          cx={60}
          cy={60}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={isSmall ? 10 : 12}
        />
        <motion.circle
          cx={60}
          cy={60}
          r={radius}
          fill="none"
          stroke="#f87171"
          strokeWidth={isSmall ? 10 : 12}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <span
        className={`absolute font-black tracking-tight text-amber-200 ${
          isSmall ? "text-lg" : "text-2xl"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function RangeStat({ max, unit, bandStart, bandEnd, label, size = "md" }) {
  const isSmall = size === "sm";
  const bandLeftPercent = (bandStart / max) * 100;
  const bandWidthPercent = ((bandEnd - bandStart) / max) * 100;

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isSmall ? "h-24 w-32" : "h-32 w-40"
      }`}
    >
      <p
        className={`font-black tracking-tight text-amber-200 ${
          isSmall ? "text-lg" : "text-2xl"
        }`}
      >
        {label}
      </p>
      <div className="relative mt-3 h-2 w-full rounded-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 rounded-full bg-red-400"
          style={{ left: `${bandLeftPercent}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${bandWidthPercent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="mt-1.5 flex w-full items-center justify-between text-[10px] text-slate-500">
        <span>0</span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}

function SolvedFlipCard({ item, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-[420px] w-full [perspective:1200px] sm:h-[460px]"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-red-300/25 bg-slate-900/65 shadow-[0_18px_50px_rgba(2,6,23,0.45)] [backface-visibility:hidden]">
          <div className="relative aspect-square w-full flex-shrink-0">
            <img
              src={item.image}
              alt={item.company}
              className="h-full w-full object-cover grayscale-[35%] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-red-950/25 to-transparent" />
            <p className="absolute bottom-2 left-3 right-3 text-sm font-bold text-white">
              {item.flag} {item.company}
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3.5 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/70 hover:bg-cyan-500/15"
            >
              How did they solve it?
            </button>
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-emerald-300/30 bg-slate-900/65 p-5 text-center shadow-[0_18px_50px_rgba(16,185,129,0.15)] [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <CheckCircle2 size={22} className="text-emerald-300" strokeWidth={2} />
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-200/80">
            Tool Used
          </p>
          <p className="text-sm font-bold text-white">{item.tool}</p>
          <p className="mt-3 text-sm leading-relaxed text-emerald-50/90">
            {item.result}
          </p>
          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 text-[11px] text-slate-500 transition hover:text-cyan-200"
            >
              Source: {item.sourceLabel}
            </a>
          )}
          <button
            type="button"
            onClick={() => setFlipped(false)}
            className="mt-2 text-[11px] text-slate-500 transition hover:text-cyan-200"
          >
            ← Back
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SolutionMatchBoard({ pairs, rightOrder }) {
  const containerRef = useRef(null);
  const leftRefs = useRef({});
  const rightRefs = useRef({});
  const [connected, setConnected] = useState({});
  const [dragId, setDragId] = useState(null);
  const [dragPos, setDragPos] = useState(null);
  const [, forceTick] = useState(0);

  useEffect(() => {
    const onResize = () => forceTick((tick) => tick + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const getPoint = useCallback((clientX, clientY) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const getAnchor = useCallback((el, edge) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!el || !containerRect) return null;
    const rect = el.getBoundingClientRect();
    return {
      x: (edge === "right" ? rect.right : rect.left) - containerRect.left,
      y: rect.top + rect.height / 2 - containerRect.top,
    };
  }, []);

  const handlePointerDown = (id) => (event) => {
    if (connected[id]) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragId(id);
    setDragPos(getPoint(event.clientX, event.clientY));
  };

  const handlePointerMove = (event) => {
    if (!dragId) return;
    setDragPos(getPoint(event.clientX, event.clientY));
  };

  const handlePointerUp = (event) => {
    if (!dragId) return;
    const target = document.elementFromPoint(event.clientX, event.clientY);
    const problemEl = target?.closest("[data-problem-id]");
    const droppedId = problemEl?.getAttribute("data-problem-id");
    if (droppedId === dragId) {
      setConnected((prev) => ({ ...prev, [dragId]: true }));
    }
    setDragId(null);
    setDragPos(null);
  };

  const totalConnected = Object.keys(connected).length;
  const allConnected = totalConnected === pairs.length;
  const dragAnchor = dragId ? getAnchor(leftRefs.current[dragId], "right") : null;

  return (
    <div className="w-full max-w-7xl">
      <div className="mb-3 flex items-center justify-end">
        <button
          type="button"
          onClick={() => setConnected({})}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-900/70 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/50 hover:text-cyan-100"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative grid grid-cols-2 items-stretch gap-x-16 gap-y-2.5 md:gap-x-28"
      >
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          {pairs.map((pair) => {
            if (!connected[pair.id]) return null;
            const from = getAnchor(leftRefs.current[pair.id], "right");
            const to = getAnchor(rightRefs.current[pair.id], "left");
            if (!from || !to) return null;
            const dx = (to.x - from.x) / 2;
            const d = `M ${from.x} ${from.y} C ${from.x + dx} ${from.y}, ${to.x - dx} ${to.y}, ${to.x} ${to.y}`;
            return (
              <motion.path
                key={pair.id}
                d={d}
                fill="none"
                stroke="#34d399"
                strokeWidth={3}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  filter: "drop-shadow(0 0 6px rgba(52,211,153,0.6))",
                }}
              />
            );
          })}
          {dragId && dragPos && dragAnchor && (
            <path
              d={`M ${dragAnchor.x} ${dragAnchor.y} C ${dragAnchor.x - (dragAnchor.x - dragPos.x) / 2} ${dragAnchor.y}, ${dragPos.x + (dragAnchor.x - dragPos.x) / 2} ${dragPos.y}, ${dragPos.x} ${dragPos.y}`}
              fill="none"
              stroke="#fbbf24"
              strokeWidth={2.5}
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
          )}
        </svg>

        {pairs.map((leftPair, index) => {
          const rightId = rightOrder[index];
          const rightPair = pairs.find((candidate) => candidate.id === rightId);
          const SolutionIcon = leftPair.icon;
          const isConnected = Boolean(connected[leftPair.id]);
          return (
            <Fragment key={leftPair.id}>
              {rightPair && (
                <div
                  ref={(el) => {
                    leftRefs.current[rightPair.id] = el;
                  }}
                  onPointerDown={handlePointerDown(leftPair.id)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  style={{ touchAction: "none" }}
                  className={`flex select-none items-center gap-3 rounded-xl border px-3.5 py-2.5 transition ${
                    isConnected
                      ? "cursor-default border-emerald-300/40 bg-emerald-500/10"
                      : "cursor-grab border-red-300/30 bg-red-500/8 hover:border-red-300/55"
                  }`}
                >
                  <span
                    className={`flex-1 text-sm font-semibold leading-snug ${
                      isConnected ? "text-emerald-100" : "text-red-100"
                    }`}
                  >
                    {rightPair.problem}
                  </span>
                  {isConnected ? (
                    <CheckCircle2
                      size={16}
                      className="ml-auto flex-shrink-0 text-emerald-300"
                    />
                  ) : (
                    <span className="ml-auto h-3 w-3 flex-shrink-0 rounded-full border-2 border-red-300/70 bg-slate-950" />
                  )}
                </div>
              )}

              <div
                ref={(el) => {
                  rightRefs.current[leftPair.id] = el;
                }}
                data-problem-id={leftPair.id}
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition ${
                  isConnected
                    ? "border-emerald-300/40 bg-emerald-500/10"
                    : "border-cyan-300/30 bg-slate-900/70"
                }`}
              >
                <span
                  className={`h-3 w-3 flex-shrink-0 rounded-full border-2 ${
                    isConnected
                      ? "border-emerald-300 bg-emerald-400"
                      : "border-cyan-300/70 bg-slate-950"
                  }`}
                />
                <span
                  className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border ${
                    isConnected
                      ? "border-emerald-300/40 bg-emerald-500/15 text-emerald-200"
                      : "border-cyan-300/35 bg-cyan-500/10 text-cyan-200"
                  }`}
                >
                  <SolutionIcon size={16} strokeWidth={2} />
                </span>
                <span className="flex-1 text-sm font-semibold leading-snug text-slate-100">
                  {leftPair.solution}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>

      {allConnected && (
        <p className="mt-4 text-center text-sm font-semibold text-emerald-200">
          Every problem, solved.
        </p>
      )}
    </div>
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
