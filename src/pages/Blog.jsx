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

  if (mode === "oldest") {
    return sorted.sort((a, b) => a.timestamp - b.timestamp);
  }

  if (mode === "title") {
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

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
      url: `${siteUrl}/blog/${blog.slug}`
    }))
  };
}

function Blog() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/blog`;

  const filteredBlogs = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = blogs.filter((blog) => {
      if (!term) return true;
      return (
        blog.title.toLowerCase().includes(term) ||
        blog.description.toLowerCase().includes(term) ||
        blog.tags.join(" ").toLowerCase().includes(term)
      );
    });

    return sortBlogs(filtered, sortBy);
  }, [search, sortBy]);

  const socialImage = filteredBlogs[0]?.image ? toAbsoluteUrl(filteredBlogs[0].image, siteUrl) : "";
  const schema = useMemo(() => buildBlogSchema(siteUrl, filteredBlogs), [filteredBlogs, siteUrl]);

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
        </section>

        <section className="blog-toolbar">
          <label className="blog-search">
            <span>Search</span>
            <input
              type="text"
              value={search}
              placeholder="Search articles"
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search blog articles"
            />
          </label>

          <label className="blog-sort">
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort blog articles"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="title">Title A-Z</option>
            </select>
          </label>
        </section>

        <p className="blog-result-count">
          {filteredBlogs.length} article{filteredBlogs.length === 1 ? "" : "s"}
        </p>

        {filteredBlogs.length === 0 ? (
          <section className="blog-empty">
            <h2>No articles found</h2>
            <p>Try another keyword.</p>
          </section>
        ) : (
          <section className="blog-grid">
            {filteredBlogs.map((blog) => (
              <article key={blog.slug} className="blog-card">
                <Link to={`/blog/${blog.slug}`} className="blog-card-media">
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="blog-card-image" />
                  ) : (
                    <div className="blog-card-placeholder">
                      <span>{blog.title}</span>
                    </div>
                  )}
                </Link>

                <div className="blog-card-body">
                  <h2>
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  <p className="blog-card-description">{blog.description}</p>
                  <p className="blog-card-meta">
                    <span>{blog.dateLabel || "Date not set"}</span>
                    <span>{blog.reading}</span>
                  </p>
                  <Link to={`/blog/${blog.slug}`} className="blog-card-link">
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Blog;
