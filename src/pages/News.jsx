import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import Header from "../components/head";
import Footer from "../components/footer/footer";
import { getSiteUrl } from "./blogUtils";
import "./news.css";

function formatRelativeTime(isoString) {
  if (!isoString) return "";
  const timestamp = Date.parse(isoString);
  if (Number.isNaN(timestamp)) return "";

  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.round(diffMs / 60000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function buildNewsSchema(siteUrl, items) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cybersecurity News",
    url: `${siteUrl}/news`,
    description:
      "A live feed of the latest cybersecurity headlines curated from trusted security news outlets.",
    hasPart: items.slice(0, 15).map((item) => ({
      "@type": "NewsArticle",
      headline: item.title,
      url: item.link,
      datePublished: item.publishedAt || undefined,
      publisher: { "@type": "Organization", name: item.source },
    })),
  };
}

function News() {
  const [items, setItems] = useState([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [refreshKey, setRefreshKey] = useState(0);

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/news`;

  useEffect(() => {
    let cancelled = false;
    setStatus((prev) => (prev === "loading" ? "loading" : "refreshing"));

    fetch("/api/cyber-news")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setItems(Array.isArray(data.items) ? data.items : []);
        setUpdatedAt(data.updatedAt || "");
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const sources = useMemo(() => {
    const unique = new Set(items.map((item) => item.source));
    return ["All", ...Array.from(unique).sort()];
  }, [items]);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSource = sourceFilter === "All" || item.source === sourceFilter;
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term);
      return matchesSource && matchesSearch;
    });
  }, [items, search, sourceFilter]);

  return (
    <div className="news-page">
      <Helmet>
        <title>Cybersecurity News | Global Cyber Associates</title>
        <meta
          name="description"
          content="Live cybersecurity news feed — the latest breach reports, vulnerabilities, and threat intelligence curated from trusted security news outlets."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cybersecurity News | Global Cyber Associates" />
        <meta
          property="og:description"
          content="Live cybersecurity news feed curated from trusted security news outlets."
        />
        <meta property="og:url" content={canonicalUrl} />
        {items.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(buildNewsSchema(siteUrl, items))}
          </script>
        )}
      </Helmet>

      <Header />

      <main className="news-main">
        <section className="news-hero">
          <p className="news-kicker">Global Cyber Associates</p>
          <h1>Cybersecurity News</h1>
          <p className="news-hero-sub">
            The latest breach reports, vulnerabilities, and threat intelligence —
            curated from trusted cybersecurity news outlets.
          </p>
        </section>

        <section className="news-toolbar">
          <label className="news-search">
            <span>Search</span>
            <div className="news-search-input-wrap">
              <svg className="news-search-icon" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M15 15l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={search}
                placeholder="Search headlines..."
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search news headlines"
              />
            </div>
          </label>

          <label className="news-source">
            <span>Source</span>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              aria-label="Filter by source"
            >
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </label>
        </section>

        <div className="news-status-row">
          <p className="news-status-text">
            {status === "ready" &&
              `${filteredItems.length} headline${filteredItems.length === 1 ? "" : "s"}${
                updatedAt ? ` · Updated ${formatRelativeTime(updatedAt)}` : ""
              }`}
            {status === "loading" && "Loading latest headlines..."}
            {status === "refreshing" && "Refreshing..."}
            {status === "error" && "Couldn't load the news feed."}
          </p>
          <button
            type="button"
            className="news-refresh-btn"
            onClick={() => setRefreshKey((key) => key + 1)}
            disabled={status === "loading" || status === "refreshing"}
          >
            <RefreshCw size={14} className={status === "refreshing" ? "news-spin" : ""} />
            Refresh
          </button>
        </div>

        {status === "loading" && (
          <div className="news-skeleton-list">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="news-skeleton-row" />
            ))}
          </div>
        )}

        {status === "error" && (
          <section className="news-empty">
            <div className="news-empty-icon">📡</div>
            <h2>News feed unavailable</h2>
            <p>We couldn't reach the cybersecurity news sources right now. Please try again shortly.</p>
            <button className="news-empty-reset" onClick={() => setRefreshKey((key) => key + 1)}>
              Try again
            </button>
          </section>
        )}

        {status !== "loading" && status !== "error" && filteredItems.length === 0 && (
          <section className="news-empty">
            <div className="news-empty-icon">🔍</div>
            <h2>No headlines found</h2>
            <p>Try a different keyword or source.</p>
            <button
              className="news-empty-reset"
              onClick={() => {
                setSearch("");
                setSourceFilter("All");
              }}
            >
              Clear filters
            </button>
          </section>
        )}

        {(status === "ready" || status === "refreshing") && filteredItems.length > 0 && (
          <section className="news-list">
            {filteredItems.map((item) => (
              <a
                key={item.link}
                href={item.link}
                target="_blank"
                rel="noreferrer noopener"
                className="news-row"
              >
                <div className="news-row-body">
                  <div className="news-row-meta">
                    <span className="news-row-source">{item.source}</span>
                    <span className="news-meta-dot">·</span>
                    <span>{formatRelativeTime(item.publishedAt)}</span>
                  </div>
                  <h2>{item.title}</h2>
                  {item.summary && <p className="news-row-summary">{item.summary}</p>}
                </div>
                <ArrowUpRight size={18} className="news-row-arrow" />
              </a>
            ))}
          </section>
        )}

        <p className="news-attribution">
          Headlines and summaries are aggregated from third-party publishers. All links open
          the original article on the publisher's site.
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default News;
