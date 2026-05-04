import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import Header from "../components/head";
import Footer from "../components/footer/footer";
import { buildBlogsIndex, getSiteUrl, toAbsoluteUrl } from "./blogUtils";
import "./blog.css";

const blogs = buildBlogsIndex();

function sortBlogs(items, mode) {
  const sorted = [...items];
  if (mode === "oldest") return sorted.sort((a, b) => a.timestamp - b.timestamp);
  if (mode === "title") return sorted.sort((a, b) => a.title.localeCompare(b.title));
  return sorted.sort((a, b) => b.timestamp - a.timestamp);
}

function buildBlogSchema(siteUrl, items) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Global Cyber Associates Blog",
    url: `${siteUrl}/blog`,
    description: "Expert insights on cybersecurity, AI, and digital growth from Global Cyber Associates.",
    blogPost: items.slice(0, 10).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      url: `${siteUrl}/blog/${blog.slug}`,
    })),
  };
}

function Blog() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [activeTag, setActiveTag] = useState("All");
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/blog`;

  // Auto-generate tag list from all blog posts
  const allTags = useMemo(() => {
    const tagSet = new Set();
    blogs.forEach((blog) => blog.tags.forEach((tag) => tagSet.add(tag)));
    return ["All", ...Array.from(tagSet)];
  }, []);

  const filteredBlogs = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = blogs.filter((blog) => {
      const matchesSearch =
        !term ||
        blog.title.toLowerCase().includes(term) ||
        blog.description.toLowerCase().includes(term) ||
        blog.tags.join(" ").toLowerCase().includes(term);
      const matchesTag = activeTag === "All" || blog.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
    return sortBlogs(filtered, sortBy);
  }, [search, sortBy, activeTag]);

  const socialImage = filteredBlogs[0]?.image
    ? toAbsoluteUrl(filteredBlogs[0].image, siteUrl)
    : "";
  const schema = useMemo(
    () => buildBlogSchema(siteUrl, filteredBlogs),
    [filteredBlogs, siteUrl]
  );

  return (
    <div className="blog-page">
      <Helmet>
        <title>Blog | Global Cyber Associates</title>
        <meta
          name="description"
          content="Expert insights on cybersecurity, AI, digital risk, and growth strategy."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Global Cyber Associates Blog" />
        <meta
          property="og:description"
          content="Expert insights on cybersecurity, AI, digital risk, and growth strategy."
        />
        <meta property="og:url" content={canonicalUrl} />
        {socialImage ? <meta property="og:image" content={socialImage} /> : null}
        <meta name="twitter:card" content={socialImage ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content="Global Cyber Associates Blog" />
        <meta
          name="twitter:description"
          content="Expert insights on cybersecurity, AI, digital risk, and growth strategy."
        />
        {socialImage ? <meta name="twitter:image" content={socialImage} /> : null}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />

      <main className="blog-main">
        <section className="blog-hero">
          <p className="blog-kicker">Global Cyber Associates</p>
          <h1>Cybersecurity, AI, and Digital Risk Insights</h1>
          <p className="blog-hero-sub">
            Expert analysis and practical guides written for developers, security
            teams, and business leaders.
          </p>
        </section>

        <section className="blog-toolbar">
          <label className="blog-search">
            <span>Search</span>
            <div className="blog-search-input-wrap">
              <svg className="blog-search-icon" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M15 15l-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                value={search}
                placeholder="Search articles..."
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search blog articles"
              />
            </div>
          </label>

          <label className="blog-sort">
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort blog articles"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="title">Title A–Z</option>
            </select>
          </label>
        </section>

        {allTags.length > 1 && (
          <div className="blog-tag-filters" role="group" aria-label="Filter by topic">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`blog-tag-btn ${activeTag === tag ? "active" : ""}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {filteredBlogs.length > 0 && (
          <p className="blog-result-count">
            {filteredBlogs.length} article{filteredBlogs.length === 1 ? "" : "s"}
            {activeTag !== "All" && (
              <span className="blog-result-tag"> in {activeTag}</span>
            )}
          </p>
        )}

        {filteredBlogs.length === 0 ? (
          <section className="blog-empty">
            <div className="blog-empty-icon">🔍</div>
            <h2>No articles found</h2>
            <p>Try a different keyword or select a different topic.</p>
            <button
              className="blog-empty-reset"
              onClick={() => {
                setSearch("");
                setActiveTag("All");
              }}
            >
              Clear filters
            </button>
          </section>
        ) : (

          <section className="blog-grid">
            {filteredBlogs.map((blog) => (
              <article key={blog.slug} className="blog-card">
                <Link to={`/blog/${blog.slug}`} className="blog-card-media">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="blog-card-image"
                    />
                  ) : (
                    <div className="blog-card-placeholder">
                      <span>{blog.title}</span>
                    </div>
                  )}
                  <div className="blog-card-img-overlay" />
                </Link>

                <div className="blog-card-body">
                  {blog.tags.length > 0 && (
                    <div className="blog-card-tags">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="blog-tag-badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2>
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>

                  <p className="blog-card-description">{blog.description}</p>

                  <div className="blog-card-author">
                    <div className="blog-author-avatar">
                      {blog.author.charAt(0).toUpperCase()}
                    </div>
                    <span>{blog.author}</span>
                  </div>

                  <p className="blog-card-meta">
                    <span>{blog.dateLabel || "Date not set"}</span>
                    <span>{blog.reading}</span>
                  </p>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="blog-read-btn"
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}

        <section className="blog-newsletter">
          <div className="blog-newsletter-content">
            <p className="blog-kicker">Stay Updated</p>
            <h2>Get Security Insights Delivered</h2>
            <p>
              Join professionals who get our latest cybersecurity articles straight
              to their inbox. No spam, ever.
            </p>
          </div>
          <form
            className="blog-newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
            />
            <button type="submit">Subscribe</button>
          </form>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default Blog;


