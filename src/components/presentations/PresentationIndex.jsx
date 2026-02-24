import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const presentationCards = [
  {
    id: "presentation-1",
    title: "Enterprise Workforce Productivity Strategy",
    description: "Visun-AI workforce visibility and productivity intelligence.",
    path: "/presentation1",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
  },
  {
    id: "presentation-2",
    title: "MSME Cybersecurity Posture Assessment",
    description: "Cybersecurity posture assessment for MSMEs.",
    path: "/presentation2",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070",
  },
];

export default function PresentationIndex() {
  const [query, setQuery] = useState("");

  const filteredCards = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return presentationCards;

    return presentationCards.filter((card) => {
      return (
        card.title.toLowerCase().includes(term) ||
        card.description.toLowerCase().includes(term)
      );
    });
  }, [query]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80 mb-3">
            GCA Visual Intel
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Presentations
          </h1>
          <p className="mt-3 text-slate-400">
            Select a presentation to open it.
          </p>
        </header>

        <div className="mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search presentation..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
          />
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          {filteredCards.map((card) => (
            <Link
              key={card.id}
              to={card.path}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-400/60 transition-colors"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold">{card.title}</h2>
                <p className="mt-2 text-slate-400">{card.description}</p>
                <span className="inline-block mt-5 text-cyan-300 font-semibold">
                  Open presentation
                </span>
              </div>
            </Link>
          ))}
        </section>
        {filteredCards.length === 0 && (
          <p className="mt-8 text-slate-400">No presentation found.</p>
        )}
      </div>
    </main>
  );
}
