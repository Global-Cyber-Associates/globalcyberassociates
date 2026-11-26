import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "../../components/head";
import Footer from "../../components/footer/footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { getBlogPostBySlug, getSiteUrl } from "../blogUtils";
import pillars from "./pillarData";
import "./pillar.css";

function buildSchema(pillar, siteUrl, spokes) {
  const canonicalUrl = `${siteUrl}${pillar.path}`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pillar.metaTitle,
    description: pillar.metaDescription,
    url: canonicalUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: spokes.map((blog, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteUrl}/blog/${blog.slug}`,
        name: blog.title
      }))
    }
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: pillar.heroTitle, item: canonicalUrl }
    ]
  };

  const faqSchema = pillar.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: pillar.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer }
        }))
      }
    : null;

  return { webPage, breadcrumb, faqSchema };
}

function PillarPage({ pillarKey }) {
  const pillar = pillars[pillarKey];
  if (!pillar) return null;

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}${pillar.path}`;

  const spokeGroups = pillar.spokeGroups.map((group) => ({
    heading: group.heading,
    spokes: group.spokes.map((slug) => getBlogPostBySlug(slug)).filter(Boolean)
  }));
  const allSpokes = spokeGroups.flatMap((g) => g.spokes);

  const { webPage, breadcrumb, faqSchema } = buildSchema(pillar, siteUrl, allSpokes);

  return (
    <div className="pillar-page">
      <Helmet>
        <title>{pillar.metaTitle} | Global Cyber Associates</title>
        <meta name="description" content={pillar.metaDescription} />
        <meta name="keywords" content={pillar.keywords} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pillar.metaTitle} />
        <meta property="og:description" content={pillar.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pillar.metaTitle} />
        <meta name="twitter:description" content={pillar.metaDescription} />
        <meta name="twitter:image" content={`${siteUrl}/logo.png`} />
        <script type="application/ld+json">{JSON.stringify(webPage)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        {faqSchema ? (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        ) : null}
      </Helmet>

      <Header />

      <main className="pillar-main">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: pillar.heroTitle }]} />

        <header className="pillar-hero">
          <p className="pillar-eyebrow">{pillar.eyebrow}</p>
          <h1 className="pillar-title">{pillar.heroTitle}</h1>
          <p className="pillar-intro">{pillar.heroIntro}</p>
        </header>

        <section className="pillar-sections">
          {pillar.sections.map((section) => (
            <article className="pillar-section" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>

        {spokeGroups.map((group) => (
          <section className="pillar-spoke-group" key={group.heading}>
            <h2 className="pillar-spoke-heading">{group.heading}</h2>
            <div className="pillar-spoke-grid">
              {group.spokes.map((blog) => (
                <Link key={blog.slug} to={`/blog/${blog.slug}`} className="pillar-spoke-card">
                  <p className="pillar-spoke-kicker">{blog.tags[0] || "Guide"}</p>
                  <h3>{blog.title}</h3>
                  <p>{blog.description}</p>
                  <span className="pillar-spoke-link">
                    Read the guide <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {pillar.faq?.length ? (
          <section className="pillar-faq">
            <h2>Frequently Asked Questions</h2>
            {pillar.faq.map((item) => (
              <div className="pillar-faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        ) : null}

        <section className="pillar-cta">
          <p>Ready to put this into practice?</p>
          <Link to={pillar.cta.href} className="pillar-cta-btn">
            {pillar.cta.label} <ArrowRight size={15} />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PillarPage;
