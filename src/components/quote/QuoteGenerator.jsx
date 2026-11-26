import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowDown, ArrowLeft, ArrowUp, FileDown, Plus, RotateCcw, Trash2 } from "lucide-react";
import { isAdminUnlocked, unlockAdmin } from "../../lib/adminAuth";
import logo from "../logo.png";
import "./quote.css";
import { COMPANY, GROUPS, GROUP_ORDER, GROUP_PICKER_LABELS, SERVICES } from "./quoteData";
import {
  addDays, amountInWords, buildTerms, formatDate, formatINR, newQuoteNo, pluralize,
} from "./quoteUtils";

const DRAFT_KEY = "gca-quote-draft";
const ADVANCE_PCT = 50;

const todayISO = () => {
  const d = new Date();
  const p = (x) => String(x).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

let keySeq = 0;
const makeItem = (service, overrides = {}) => ({
  key: `i${Date.now()}-${keySeq++}`,
  serviceId: service.id,
  group: service.group,
  name: service.name,
  description: service.description,
  unit: service.unit,
  monthly: service.period === "month",
  qty: service.qty,
  rate: service.rate,
  ...overrides,
});

const freshState = () => ({
  quoteNo: newQuoteNo(COMPANY.quotePrefix),
  quoteDate: todayISO(),
  validDays: 15,
  gstRate: 0,
  discountPct: 0,
  discountLabel: "Promotional discount",
  billingType: "auto", // "auto" | "one-time" | "recurring"
  subject: "",
  client: { name: "", address: "", gstin: "", email: "" },
  items: [],
});

// ?client=M&items=visun:20,vapt-web:1:45000&discount=10 pre-fills a quote.
const stateFromParams = (params) => {
  const raw = params.get("items");
  if (!raw) return null;
  const s = freshState();
  s.client.name = params.get("client") || "";
  s.discountPct = Number(params.get("discount")) || 0;
  s.gstRate = Number(params.get("gst")) || 0;
  if (["one-time", "recurring"].includes(params.get("billing"))) s.billingType = params.get("billing");
  s.items = raw.split(",").map((part) => {
    const [id, qty, rate] = part.split(":");
    const svc = SERVICES.find((x) => x.id === id);
    if (!svc) return null;
    const o = {};
    if (qty) o.qty = Number(qty);
    if (rate) o.rate = Number(rate);
    return makeItem(svc, o);
  }).filter(Boolean);
  return s;
};

const escapeCss = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");

// Password gate: reuses the Ctrl+P admin unlock for this browser session.
export default function QuoteGate() {
  const [unlocked, setUnlocked] = useState(isAdminUnlocked);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (unlockAdmin(pw)) setUnlocked(true);
    else { setError(true); setPw(""); }
  };

  return (
    <>
      <Helmet>
        <title>Quote Generator | GCA</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {unlocked ? <QuoteGenerator /> : (
        <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/70 p-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">GCA Internal</p>
            <h1 className="text-2xl font-black">Quote Generator</h1>
            <input
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="Administration password"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-cyan-400"
            />
            {error && <p className="text-sm text-red-400">Invalid password.</p>}
            <button className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400">Unlock</button>
          </form>
        </main>
      )}
    </>
  );
}

// ---------- small UI pieces ----------
const inputCls = "w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";
const labelCls = "block text-xs font-semibold text-slate-300 mb-1.5";

const Field = ({ label, hint, children }) => (
  <div>
    {label && <label className={labelCls}>{label}</label>}
    {children}
    {hint && <p className="mt-1 text-[11px] text-slate-400">{hint}</p>}
  </div>
);

const Step = ({ n, title, children, right }) => (
  <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 space-y-4">
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-3 text-base font-bold text-white">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-sm font-black text-slate-950">{n}</span>
        {title}
      </h2>
      {right}
    </div>
    {children}
  </section>
);

const iconBtn = "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-30 disabled:hover:border-slate-600 disabled:hover:text-slate-200";

function QuoteGenerator() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(() => {
    const fromUrl = stateFromParams(params);
    if (fromUrl) return fromUrl;
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY));
      if (saved && Array.isArray(saved.items)) return { ...freshState(), ...saved };
    } catch { /* ignore */ }
    return freshState();
  });
  const [picker, setPicker] = useState("");

  useEffect(() => { localStorage.setItem(DRAFT_KEY, JSON.stringify(q)); }, [q]);

  useEffect(() => {
    const id = "gca-poppins";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  const set = (patch) => setQ((s) => ({ ...s, ...patch }));
  const setClient = (patch) => setQ((s) => ({ ...s, client: { ...s.client, ...patch } }));
  const setItem = (key, patch) => setQ((s) => ({ ...s, items: s.items.map((it) => (it.key === key ? { ...it, ...patch } : it)) }));
  const removeItem = (key) => setQ((s) => ({ ...s, items: s.items.filter((it) => it.key !== key) }));
  const moveItem = (key, dir) => setQ((s) => {
    const items = [...s.items];
    const i = items.findIndex((it) => it.key === key);
    const j = i + dir;
    if (j < 0 || j >= items.length) return s;
    [items[i], items[j]] = [items[j], items[i]];
    return { ...s, items };
  });

  const addService = () => {
    const svc = SERVICES.find((x) => x.id === picker);
    if (svc) setQ((s) => ({ ...s, items: [...s.items, makeItem(svc)] }));
    setPicker("");
  };

  const newQuote = () => {
    if (q.items.length && !window.confirm("Start a new quote? The current one will be cleared.")) return;
    setQ(freshState());
  };

  // ---------- derived ----------
  const lines = q.items.map((it) => ({ ...it, amount: (Number(it.qty) || 0) * (Number(it.rate) || 0) }));
  const subtotal = lines.reduce((a, l) => a + l.amount, 0);
  const discountPct = Math.min(Math.max(Number(q.discountPct) || 0, 0), 100);
  const discount = (subtotal * discountPct) / 100;
  const taxable = subtotal - discount;
  const gstRate = Number(q.gstRate) || 0;
  const gst = (taxable * gstRate) / 100;
  const total = taxable + gst;
  const advance = (total * ADVANCE_PCT) / 100;
  // Billing type: "auto" follows the services (any monthly item => recurring); the toggle overrides it.
  const hasMonthly = lines.some((l) => l.monthly);
  const billing = q.billingType === "one-time" || q.billingType === "recurring"
    ? q.billingType
    : (hasMonthly ? "recurring" : "one-time");
  const isRecurring = billing === "recurring";
  // Monthly amount = the monthly items, or the whole quote if recurring is forced on one-time items.
  const monthlyBase = hasMonthly ? lines.filter((l) => l.monthly).reduce((a, l) => a + l.amount, 0) : subtotal;
  const recurring = isRecurring ? monthlyBase * (1 - discountPct / 100) * (1 + gstRate / 100) : 0;
  const recurringQualifiers = [gstRate > 0 && "incl. tax", discountPct > 0 && "after discount"].filter(Boolean);
  const discountLabel = q.discountLabel.trim() || "Discount";

  const groupIds = [...new Set(q.items.map((it) => it.group))];
  const terms = useMemo(
    () => buildTerms(groupIds, { validDays: q.validDays, discountPct }),
    [groupIds.join(), q.validDays, discountPct], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const onlyVisun = groupIds.length === 1 && groupIds[0] === "visun";
  const tagline = onlyVisun ? GROUPS.visun.tagline : COMPANY.tagline;
  const clientName = q.client.name.trim() || "Customer";

  const autoSubject = (() => {
    if (!lines.length) return "";
    if (lines.length === 1) {
      const l = lines[0];
      if (l.serviceId === "visun") return `VisuN AI subscription for ${l.qty} ${pluralize("agent", l.qty)}`;
      return l.name || "Custom service";
    }
    const names = lines.map((l) => l.name || "Custom service");
    return names.length <= 3 ? names.join(", ") : `${names.slice(0, 2).join(", ")} and ${names.length - 2} more services`;
  })();
  const subject = q.subject.trim() || autoSubject;

  const note = [
    ...lines.map((l) => `${l.qty} ${pluralize(l.unit, l.qty)} x ₹ ${formatINR(l.rate)} per ${l.unit}${l.monthly && isRecurring ? " per month" : ""}.`),
    discountPct ? `${discountLabel} of ${discountPct}% applied.` : "",
    gstRate ? `GST @ ${gstRate}% included in the total.` : "Taxes extra as applicable.",
  ].filter(Boolean).join(" ");

  const payline = `Payment terms: ${ADVANCE_PCT}% advance on acceptance; balance as set out in Section 3 of the Terms & Conditions overleaf.`;
  const footerLeft = `${COMPANY.name} · ${COMPANY.email} · WhatsApp ${COMPANY.whatsapp}`;

  const printCss = `
    @page {
      size: A4;
      margin: 18mm 16mm 22mm;
      @top-left { content: "${escapeCss(COMPANY.name)}"; font: 600 9pt Poppins, sans-serif; color: #111a2e; vertical-align: bottom; padding-bottom: 3mm; border-bottom: 0.6pt solid #e2e8f0; }
      @top-right { content: "Quotation ${escapeCss(q.quoteNo)} · ${escapeCss(clientName)}"; font: 400 9pt Poppins, sans-serif; color: #64748b; vertical-align: bottom; padding-bottom: 3mm; border-bottom: 0.6pt solid #e2e8f0; }
      @bottom-left { content: "${escapeCss(footerLeft)}\\A This is a computer-generated quotation."; white-space: pre; font: 400 7.5pt Poppins, sans-serif; color: #64748b; vertical-align: top; padding-top: 2.5mm; border-top: 0.6pt solid #e2e8f0; }
      @bottom-right { content: "${escapeCss(q.quoteNo)}\\A Page " counter(page) " of " counter(pages); white-space: pre; text-align: right; font: 600 7.5pt Poppins, sans-serif; color: #0b78b6; vertical-align: top; padding-top: 2.5mm; border-top: 0.6pt solid #e2e8f0; }
    }
    @page :first {
      margin-top: 0;
      @top-left { content: none; border: none; }
      @top-right { content: none; border: none; }
    }
    @media print { .q-bar { margin: 0 -16mm 7mm !important; } }
  `;

  const printPdf = () => {
    const prev = document.title;
    document.title = `Quote_${clientName.replace(/[^\w-]+/g, "_")}_${q.quoteNo}`;
    window.print();
    setTimeout(() => { document.title = prev; }, 500);
  };

  let clauseSection = 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 lg:flex print:block print:bg-white print:min-h-0">
      <style>{printCss}</style>

      {/* ================= Form ================= */}
      <aside className="q-no-print lg:w-[480px] lg:h-screen lg:sticky lg:top-0 flex flex-col border-r border-slate-800 bg-slate-950">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">
          <div>
            <Link to="/presentations" className="inline-flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200">
              <ArrowLeft size={14} /> Back to Visual Intel
            </Link>
            <h1 className="text-xl font-black tracking-tight text-white">Quote Generator</h1>
          </div>
          <button
            onClick={newQuote}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:border-cyan-400 hover:text-cyan-300"
          >
            <RotateCcw size={15} /> New quote
          </button>
        </div>

        {/* Scrollable steps */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          <Step n={1} title="Customer">
            <Field label="Customer / company name">
              <input className={inputCls} placeholder="e.g. Acme Pvt Ltd" value={q.client.name} onChange={(e) => setClient({ name: e.target.value })} />
            </Field>
            <Field label="Address (optional)">
              <textarea rows={2} className={inputCls} value={q.client.address} onChange={(e) => setClient({ address: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="GSTIN (optional)">
                <input className={inputCls} value={q.client.gstin} onChange={(e) => setClient({ gstin: e.target.value })} />
              </Field>
              <Field label="Email (optional)">
                <input className={inputCls} value={q.client.email} onChange={(e) => setClient({ email: e.target.value })} />
              </Field>
            </div>
          </Step>

          <Step n={2} title="Services">
            <div className="flex gap-2">
              <select className={inputCls} value={picker} onChange={(e) => setPicker(e.target.value)}>
                <option value="">Choose a service…</option>
                {GROUP_ORDER.map((g) => (
                  <optgroup key={g} label={GROUP_PICKER_LABELS[g]}>
                    {SERVICES.filter((s) => s.group === g).map((s) => (
                      <option key={s.id} value={s.id}>{s.custom ? "Custom service (type your own)" : s.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <button
                onClick={addService}
                disabled={!picker}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-cyan-500 px-4 text-sm font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus size={16} /> Add
              </button>
            </div>

            {q.items.length === 0 && (
              <p className="rounded-lg border border-dashed border-slate-600 p-4 text-center text-sm text-slate-400">
                No services added yet. Choose one above and click <b className="text-slate-200">Add</b>. You can add several.
              </p>
            )}

            {lines.map((it, idx) => (
              <div key={it.key} className="rounded-xl border border-slate-600 bg-slate-950 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">#{idx + 1}</span>
                    <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">{GROUPS[it.group].label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button className={iconBtn} onClick={() => moveItem(it.key, -1)} disabled={idx === 0} title="Move up" aria-label="Move up"><ArrowUp size={15} /></button>
                    <button className={iconBtn} onClick={() => moveItem(it.key, 1)} disabled={idx === lines.length - 1} title="Move down" aria-label="Move down"><ArrowDown size={15} /></button>
                    <button
                      onClick={() => removeItem(it.key)}
                      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-500/60 bg-red-500/15 px-2.5 text-xs font-bold text-red-300 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
                <Field label="Service name">
                  <input className={inputCls} placeholder="Type the service name" value={it.name} onChange={(e) => setItem(it.key, { name: e.target.value })} />
                </Field>
                <Field label="Description">
                  <input className={inputCls} value={it.description} onChange={(e) => setItem(it.key, { description: e.target.value })} />
                </Field>
                <div className="grid grid-cols-3 gap-2">
                  <Field label="Quantity">
                    <input type="number" min="0" className={inputCls} value={it.qty} onChange={(e) => setItem(it.key, { qty: e.target.value })} />
                  </Field>
                  <Field label="Unit">
                    <input className={inputCls} value={it.unit} onChange={(e) => setItem(it.key, { unit: e.target.value })} />
                  </Field>
                  <Field label="Rate (₹)">
                    <input type="number" min="0" step="0.01" className={inputCls} value={it.rate} onChange={(e) => setItem(it.key, { rate: e.target.value })} />
                  </Field>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    <input type="checkbox" className="h-4 w-4 accent-cyan-500" checked={it.monthly} onChange={(e) => setItem(it.key, { monthly: e.target.checked })} />
                    Billed monthly
                  </label>
                  <span className="text-sm text-slate-300">Amount: <b className="text-white">₹ {formatINR(it.amount)}</b></span>
                </div>
              </div>
            ))}
          </Step>

          <Step n={3} title="Billing, discount & tax">
            <Field
              label="Payment type (shown below the total)"
              hint={q.billingType === "auto"
                ? "Picked automatically from the services. Click to change it."
                : "Set manually for this quote."}
            >
              <div className="grid grid-cols-2 gap-1 rounded-xl border border-slate-600 bg-slate-950 p-1">
                {[
                  ["one-time", "One-time payment"],
                  ["recurring", "Recurring (monthly)"],
                ].map(([value, text]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set({ billingType: value })}
                    aria-pressed={billing === value}
                    className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                      billing === value ? "bg-cyan-500 text-slate-950" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </Field>
            {q.billingType !== "auto" && (
              <button type="button" onClick={() => set({ billingType: "auto" })} className="-mt-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200">
                ↺ Back to automatic
              </button>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Discount %" hint="0 = no discount">
                <input type="number" min="0" max="100" step="0.01" className={inputCls} value={q.discountPct} onChange={(e) => set({ discountPct: e.target.value })} />
              </Field>
              <Field label="GST %" hint='0 = "Taxes extra as applicable"'>
                <input type="number" min="0" step="0.01" className={inputCls} value={q.gstRate} onChange={(e) => set({ gstRate: e.target.value })} />
              </Field>
            </div>
            {discountPct > 0 && (
              <Field label="Discount name (shown on the quote)">
                <input className={inputCls} value={q.discountLabel} onChange={(e) => set({ discountLabel: e.target.value })} />
              </Field>
            )}
          </Step>

          <Step n={4} title="Quote details">
            <Field label="Quote number">
              <div className="flex gap-2">
                <input className={inputCls} value={q.quoteNo} onChange={(e) => set({ quoteNo: e.target.value })} />
                <button title="Generate a new number" aria-label="Generate a new number" onClick={() => set({ quoteNo: newQuoteNo(COMPANY.quotePrefix) })} className={`${iconBtn} h-auto w-11 shrink-0`}>
                  <RotateCcw size={15} />
                </button>
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Quote date">
                <input type="date" className={`${inputCls} [color-scheme:dark]`} value={q.quoteDate} onChange={(e) => set({ quoteDate: e.target.value })} />
              </Field>
              <Field label="Valid for (days)">
                <input type="number" min="1" className={inputCls} value={q.validDays} onChange={(e) => set({ validDays: e.target.value })} />
              </Field>
            </div>
            <Field label="Subject" hint="Leave blank to fill in from the services">
              <input className={inputCls} placeholder={autoSubject} value={q.subject} onChange={(e) => set({ subject: e.target.value })} />
            </Field>
          </Step>
          <Step n={5} title="Summary & download">
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-300"><span>Subtotal</span><span>₹ {formatINR(subtotal)}</span></div>
            {discountPct > 0 && (
              <div className="flex justify-between text-emerald-300"><span>{discountLabel} ({discountPct}%)</span><span>− ₹ {formatINR(discount)}</span></div>
            )}
            {gstRate > 0 && (
              <div className="flex justify-between text-slate-300"><span>GST {gstRate}%</span><span>₹ {formatINR(gst)}</span></div>
            )}
            <div className="flex justify-between pt-1 text-base font-black text-white"><span>Total</span><span>₹ {formatINR(total)}</span></div>
            <div className="flex justify-between text-slate-300">
              <span>Payment type</span>
              <span>{isRecurring ? `Recurring · ₹ ${formatINR(recurring)} / month` : "One-time"}</span>
            </div>
            <div className="flex justify-between text-cyan-300"><span>Advance on acceptance ({ADVANCE_PCT}%)</span><span>₹ {formatINR(advance)}</span></div>
          </div>
          <button
            onClick={printPdf}
            disabled={!q.items.length}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileDown size={18} /> Download PDF
          </button>
          <p className="text-[11px] leading-snug text-slate-400">
            In the print window choose <b className="text-slate-200">Save as PDF</b>, paper <b className="text-slate-200">A4</b>, and turn off <b className="text-slate-200">Headers and footers</b>.
          </p>
          </Step>
        </div>

        {/* Slim bottom bar: total + download, always reachable */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-800 bg-slate-900 px-5 py-3">
          <div className="leading-tight">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">Total</div>
            <div className="text-lg font-black text-white">₹ {formatINR(total)}</div>
          </div>
          <button
            onClick={printPdf}
            disabled={!q.items.length}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileDown size={18} /> Download PDF
          </button>
        </div>
      </aside>

      {/* ================= Preview / printable document ================= */}
      <main className="q-print-area flex-1 overflow-x-auto p-6 lg:p-10">
        <p className="q-no-print mb-4 text-center text-xs uppercase tracking-[0.2em] text-slate-500">Live preview</p>
        <div className="q-doc">
          {/* Page 1 */}
          <div className="q-sheet q-first">
            <div className="q-bar" />
            <div className="q-head">
              <div className="q-brand">
                <img src={logo} alt="" />
                <div>
                  <div className="q-brand-name">{COMPANY.name}</div>
                  <div className="q-brand-tag">{tagline}</div>
                </div>
              </div>
              <div className="q-title">
                <h1>QUOTATION</h1>
                <div># {q.quoteNo}</div>
              </div>
            </div>

            <div className="q-meta">
              <div><div className="q-label">Quote No</div><strong>{q.quoteNo}</strong></div>
              <div><div className="q-label">Quote Date</div><strong>{formatDate(q.quoteDate)}</strong></div>
              <div><div className="q-label">Valid Until</div><strong>{formatDate(addDays(q.quoteDate, q.validDays))}</strong></div>
            </div>

            <div className="q-parties">
              <div>
                <div className="q-label">From</div>
                <div className="q-party-name">{COMPANY.name}</div>
                <div className="q-party-lines">{[...COMPANY.address, COMPANY.email, COMPANY.phone].join("\n")}</div>
              </div>
              <div>
                <div className="q-label">Bill To</div>
                <div className="q-party-name">{clientName}</div>
                <div className="q-party-lines">
                  {[q.client.address, q.client.gstin && `GSTIN: ${q.client.gstin}`, q.client.email].filter(Boolean).join("\n")}
                </div>
              </div>
            </div>

            <div className="q-subject"><span>Subject:</span><strong>{subject || "-"}</strong></div>

            <table className="q-table">
              <thead>
                <tr>
                  <th style={{ width: "8%" }}>#</th>
                  <th>Description</th>
                  <th className="ctr" style={{ width: "10%" }}>Qty</th>
                  <th className="num" style={{ width: "16%" }}>Rate (INR)</th>
                  <th className="num" style={{ width: "18%" }}>Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                {lines.length === 0 && (
                  <tr><td colSpan={5} style={{ color: "#94a3b8", textAlign: "center" }}>Add services from the panel on the left</td></tr>
                )}
                {lines.map((l, i) => (
                  <tr key={l.key}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="q-item-name">{l.name || "Custom service"}</div>
                      {l.description && <div className="q-item-desc">{l.description}</div>}
                    </td>
                    <td className="ctr">{l.qty}</td>
                    <td className="num">{formatINR(l.rate)}</td>
                    <td className="num" style={{ fontWeight: 600 }}>{formatINR(l.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="q-totals">
              <div className="q-words">
                <div className="q-label">Total in Words</div>
                <strong>{amountInWords(total)}</strong>
                <p>{note}</p>
              </div>
              <div>
                <div className="q-sum-row"><span>Subtotal</span><span>₹ {formatINR(subtotal)}</span></div>
                {discountPct > 0 && (
                  <div className="q-sum-row q-discount"><span>{discountLabel} ({discountPct}%)</span><span>− ₹ {formatINR(discount)}</span></div>
                )}
                {gstRate > 0 && <div className="q-sum-row"><span>GST @ {gstRate}%</span><span>₹ {formatINR(gst)}</span></div>}
                <div className="q-sum-total"><span>Total</span><span>₹ {formatINR(total)}</span></div>
                <div className="q-billing">
                  <span>Payment type</span>
                  <strong>{isRecurring ? "Recurring - Monthly" : "One-time Payment"}</strong>
                </div>
                {isRecurring && (
                  <div className="q-recurring">
                    Recurring charge per month{recurringQualifiers.length > 0 && ` (${recurringQualifiers.join(", ")})`}
                    : <span style={{ whiteSpace: "nowrap" }}>₹ {formatINR(recurring)}</span>
                  </div>
                )}
                <div className="q-advance"><span>Advance on acceptance ({ADVANCE_PCT}%)</span><span>₹ {formatINR(advance)}</span></div>
              </div>
            </div>

            <div className="q-payline">{payline}</div>

            <div className="q-footer">
              <div>{footerLeft}<br />This is a computer-generated quotation.</div>
              <div className="r"><strong>{q.quoteNo}</strong>Page 1</div>
            </div>
          </div>

          {/* Terms & acceptance */}
          <div className="q-sheet q-break">
            <div className="q-running">
              <strong>{COMPANY.name}</strong>
              <span>Quotation {q.quoteNo} · {clientName}</span>
            </div>

            <h2 className="q-h2">Terms &amp; Conditions</h2>

            {terms.map((s) => {
              clauseSection += 1;
              const n = clauseSection;
              return (
                <div key={s.title} className={`q-section${s.highlight ? " q-hl" : ""}`}>
                  <h3>{n}.&nbsp; {s.title}</h3>
                  {s.clauses.map((c, i) => (
                    <div key={i} className="q-clause"><b>{n}.{i + 1}</b><span>{c}</span></div>
                  ))}
                </div>
              );
            })}

            <div className="q-accept">
              <h2 className="q-h2">Acceptance</h2>
              <p>By signing below, the Customer accepts this quotation and the Terms &amp; Conditions above.</p>
              <div className="q-signs">
                <div>
                  <strong>For {COMPANY.name}</strong>
                  <div>Authorised signatory</div><div>Name:</div><div>Designation:</div><div>Date:</div>
                </div>
                <div>
                  <strong>For {clientName}</strong>
                  <div>Authorised signatory</div><div>Name:</div><div>Designation:</div><div>Date:</div>
                </div>
              </div>
            </div>

            <div className="q-footer">
              <div>{footerLeft}<br />This is a computer-generated quotation.</div>
              <div className="r"><strong>{q.quoteNo}</strong>Terms</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
