import { COMMON, GROUPS, GROUP_ORDER } from "./quoteData";

export const formatINR = (n) =>
  (Number(n) || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const twoDigits = (n) => (n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? ` ${ONES[n % 10]}` : ""}`);
const threeDigits = (n) => {
  const h = Math.floor(n / 100);
  const r = n % 100;
  return [h ? `${ONES[h]} Hundred` : "", r ? twoDigits(r) : ""].filter(Boolean).join(" ");
};

// Indian numbering: crore, lakh, thousand.
const integerToWords = (num) => {
  if (num === 0) return "Zero";
  const parts = [];
  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  if (crore) parts.push(`${integerToWords(crore)} Crore`);
  if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
  if (num) parts.push(threeDigits(num));
  return parts.join(" ");
};

export const amountInWords = (amount) => {
  const rounded = Math.round((Number(amount) || 0) * 100);
  const rupees = Math.floor(rounded / 100);
  const paise = rounded % 100;
  let words = `${integerToWords(rupees)} Rupees`;
  if (paise) words += ` and ${twoDigits(paise)} Paise`;
  return `${words} Only`;
};

export const pluralize = (word, qty) => {
  if (Number(qty) === 1 || !word) return word;
  if (/(s|x|ch|sh)$/i.test(word)) return `${word}es`;
  return `${word}s`;
};

export const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export const addDays = (iso, days) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + (Number(days) || 0));
  const p = (x) => String(x).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

// GCA-Q-YYMMDD-HHMM
export const newQuoteNo = (prefix, date = new Date()) => {
  const p = (x) => String(x).padStart(2, "0");
  return `${prefix}-${String(date.getFullYear()).slice(2)}${p(date.getMonth() + 1)}${p(date.getDate())}-${p(date.getHours())}${p(date.getMinutes())}`;
};

const clauseText = (c) => (typeof c === "string" ? c : c.text);

/**
 * Builds the numbered Terms & Conditions for the service groups on a quote.
 * Returns [{ title, highlight, clauses: [string] }].
 */
export const buildTerms = (groupIds, { validDays, discountPct = 0 }) => {
  const groups = GROUP_ORDER.filter((g) => groupIds.includes(g));
  const multi = groups.length > 1;
  const seen = new Set();
  const fill = (t) => t.replace("{validDays}", String(validDays)).replace("{discountPct}", String(discountPct));

  const take = (text) => {
    if (seen.has(text)) return null;
    seen.add(text);
    return fill(text);
  };

  // Group clauses for a shared section, then common clauses.
  const shared = (key, commonFirst = false) => {
    const common = [];
    (COMMON[key] || []).forEach((c) => {
      if (typeof c === "object" && c.omitIfGroup && groups.includes(c.omitIfGroup)) return;
      const text = take(clauseText(c));
      if (text) common.push(text);
    });
    const byText = new Map();
    groups.forEach((g) => {
      (GROUPS[g][key] || []).forEach((c) => {
        const t = clauseText(c);
        if (!byText.has(t)) byText.set(t, []);
        byText.get(t).push(GROUPS[g].label);
      });
    });
    const out = [];
    byText.forEach((labels, t) => {
      const text = take(t);
      if (text) out.push(multi ? `${labels.join(" & ")}: ${text}` : text);
    });
    return commonFirst ? [...common, ...out] : [...out, ...common];
  };

  const sections = [
    { title: "Data Privacy & Confidentiality", highlight: true, clauses: shared("privacy") },
    {
      title: "Pricing & Taxes",
      clauses: [...shared("pricing", true), ...(Number(discountPct) > 0 ? COMMON.discount.map(take).filter(Boolean) : [])],
    },
    { title: "Payment Terms", clauses: [...COMMON.advance.map(take).filter(Boolean), ...shared("payment")] },
  ];

  groups.forEach((g) => {
    (GROUPS[g].sections || []).forEach((s) => {
      const clauses = s.clauses.map(take).filter(Boolean);
      if (clauses.length) {
        sections.push({ title: multi ? `${GROUPS[g].label} - ${s.title}` : s.title, clauses });
      }
    });
  });

  sections.push(
    { title: "Customer Responsibilities & Acceptable Use", clauses: shared("customer") },
    { title: "Warranty & Limitation of Liability", clauses: shared("warranty") },
    { title: "Governing Law & Disputes", clauses: shared("law") },
    { title: "Acceptance & Entire Agreement", clauses: shared("acceptance") },
  );

  return sections.filter((s) => s.clauses.length);
};
