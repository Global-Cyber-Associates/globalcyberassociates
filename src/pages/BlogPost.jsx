import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowRight, ChevronRight } from "lucide-react";
import Header from "../components/head";
import Footer from "../components/footer/footer";
import { buildBlogsIndex, getBlogPostBySlug, getSiteUrl, toAbsoluteUrl } from "./blogUtils";
import "./blog-post.css";

const allBlogs = buildBlogsIndex();

const markdownComponents = {
  a({ href, children }) {
    const isExternal = href?.startsWith("http://") || href?.startsWith("https://");
    return (
      <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
        {children}
      </a>
    );
  },
  img({ src, alt }) {
    return <img src={src} alt={alt || "Blog image"} loading="lazy" />;
  }
};

function buildArticleSchema(blog, canonicalUrl, siteUrl, imageUrl) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Organization",
      name: blog.author
    },
    publisher: {
      "@type": "Organization",
      name: "Global Cyber Associates",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`
      }
    }
  };

  if (blog.publishedTimeISO) {
    schema.datePublished = blog.publishedTimeISO;
  }

  if (imageUrl) {
    schema.image = [imageUrl];
  }

  return schema;
}

function buildBreadcrumbSchema(blog, siteUrl, canonicalUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: blog.title, item: canonicalUrl }
    ]
  };
}

function getRelatedBlogs(blog, limit = 3) {
  const others = allBlogs.filter((item) => item.slug !== blog.slug);
  const scored = others
    .map((item) => ({
      item,
      score: item.tags.filter((tag) => blog.tags.includes(tag)).length
    }))
    .sort((a, b) => b.score - a.score || b.item.timestamp - a.item.timestamp);
  return scored.slice(0, limit).map(({ item }) => item);
}

function BlogPost() {
  const { slug } = useParams();
  const blog = useMemo(() => getBlogPostBySlug(slug), [slug]);
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/blog/${slug}`;

  if (!blog) {
    return (
      <div className="blog-post-page">
        <Header />
        <main className="blog-post-main">
          <section className="blog-post-missing">
            <h1>Article not found</h1>
            <p>The article may have moved or been removed.</p>
            <Link to="/blog">Back to blog</Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const imageUrl = blog.image ? toAbsoluteUrl(blog.image, siteUrl) : "";
  const schema = buildArticleSchema(blog, canonicalUrl, siteUrl, imageUrl);
  const breadcrumbSchema = buildBreadcrumbSchema(blog, siteUrl, canonicalUrl);
  const relatedBlogs = getRelatedBlogs(blog);

  return (
    <div className="blog-post-page">
      <Helmet>
        <title>{blog.title} | Global Cyber Associates</title>
        <meta name="description" content={blog.description} />
        {blog.tags.length > 0 ? <meta name="keywords" content={blog.tags.join(", ")} /> : null}
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Global Cyber Associates" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:url" content={canonicalUrl} />
        {blog.publishedTimeISO ? (
          <meta property="article:published_time" content={blog.publishedTimeISO} />
        ) : null}
        {blog.tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
        {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
        <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description} />
        {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="blog-post-main">
        <nav className="blog-post-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <Link to="/blog">Blog</Link>
          <ChevronRight size={13} />
          <span>{blog.title}</span>
        </nav>

        <article className="blog-post-article">
          <header className="blog-post-header">
            {blog.tags.length > 0 ? (
              <p className="blog-post-category">{blog.tags[0]}</p>
            ) : null}
            <h1>{blog.title}</h1>
            <p className="blog-post-description">{blog.description}</p>

            <div className="blog-post-meta">
              <span className="blog-post-author">{blog.author}</span>
              <span className="blog-post-meta-dot">·</span>
              <span>{blog.dateLabel || "Date not set"}</span>
              <span className="blog-post-meta-dot">·</span>
              <span>{blog.reading}</span>
            </div>
          </header>

          {imageUrl ? (
            <div className="blog-post-cover">
              <img src={imageUrl} alt={blog.title} />
            </div>
          ) : null}

          <section className="blog-post-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={markdownComponents}
            >
              {blog.content}
            </ReactMarkdown>
          </section>

          {blog.tags.length > 0 ? (
            <div className="blog-post-tags">
              {blog.tags.map((tag) => (
                <span key={tag} className="blog-post-tag-badge">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="blog-post-cta">
            <div>
              <p className="blog-post-cta-title">See it in action</p>
              <p className="blog-post-cta-sub">
                Explore how VisuN AI brings this to life for your organization.
              </p>
            </div>
            <a href="/products/visunai" className="blog-post-cta-btn">
              Explore VisuN AI
              <ArrowRight size={15} />
            </a>
          </div>
        </article>

        {relatedBlogs.length > 0 && (
          <section className="blog-post-related">
            <h2>Continue Reading</h2>
            <div className="blog-post-related-list">
              {relatedBlogs.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="blog-post-related-row"
                >
                  <div>
                    <p className="blog-post-related-kicker">
                      {related.tags[0] || "Insight"}
                    </p>
                    <h3>{related.title}</h3>
                  </div>
                  <ArrowRight size={16} className="blog-post-related-arrow" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default BlogPost;
