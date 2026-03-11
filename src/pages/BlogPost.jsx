import { useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Header from "../components/head";
import Footer from "../components/footer/footer";
import { getBlogPostBySlug, getSiteUrl, toAbsoluteUrl } from "./blogUtils";
import "./blog-post.css";

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

  return (
    <div className="blog-post-page">
      <Helmet>
        <title>{blog.title} | Global Cyber Associates</title>
        <meta name="description" content={blog.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:url" content={canonicalUrl} />
        {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
        <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description} />
        {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />

      <main className="blog-post-main">
        <Link to="/blog" className="blog-post-back-top">
          Back to insights
        </Link>

        <article className="blog-post-shell">
          <header className="blog-post-header">
            <p className="blog-post-kicker">Global Cyber Associates</p>
            <h1>{blog.title}</h1>
            <p className="blog-post-description">{blog.description}</p>

            <div className="blog-post-meta">
              <span>{blog.dateLabel || "Date not set"}</span>
              <span>{blog.reading}</span>
              <span>{blog.author}</span>
            </div>

            {blog.tags.length > 0 ? <p className="blog-post-tags">{blog.tags.join(" | ")}</p> : null}
          </header>

          <section className="blog-post-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={markdownComponents}
            >
              {blog.content}
            </ReactMarkdown>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default BlogPost;
