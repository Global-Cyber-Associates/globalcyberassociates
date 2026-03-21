const FRONTMATTER_REGEX = /^---\s*([\s\S]*?)\s*---/;
const FALLBACK_DESCRIPTION =
  "Practical insights from Global Cyber Associates on cybersecurity, AI, and digital growth.";
const FALLBACK_AUTHOR = "Global Cyber Associates Team";
const FALLBACK_SITE_URL = "https://www.globalcyberassociate.com";

export const blogFiles = import.meta.glob("../blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

function cleanFrontmatterValue(value) {
  const trimmed = value.trim();
  const hasDoubleQuotes = trimmed.startsWith("\"") && trimmed.endsWith("\"");
  const hasSingleQuotes = trimmed.startsWith("'") && trimmed.endsWith("'");

  if (hasDoubleQuotes || hasSingleQuotes) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function toPlainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugToTitle(slug) {
  return slug
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getFirstHeading(markdown) {
  const match = markdown.match(/^\s*#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function removeLeadHeading(markdown) {
  return markdown.replace(/^\s*#\s+.+\n+/, "").trim();
}

function createExcerpt(markdown, maxLength = 165) {
  const plain = toPlainText(markdown);

  if (!plain) {
    return FALLBACK_DESCRIPTION;
  }

  if (plain.length <= maxLength) {
    return plain;
  }

  const clipped = plain.slice(0, maxLength);
  const lastWordIndex = clipped.lastIndexOf(" ");
  const excerpt = lastWordIndex > 0 ? clipped.slice(0, lastWordIndex) : clipped;
  return `${excerpt.trim()}...`;
}

export function parseFrontmatter(file) {
  const match = file.match(FRONTMATTER_REGEX);
  const data = {};

  if (match) {
    match[1]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line) => {
        const separatorIndex = line.indexOf(":");

        if (separatorIndex === -1) {
          return;
        }

        const key = line.slice(0, separatorIndex).trim();
        const value = cleanFrontmatterValue(line.slice(separatorIndex + 1));
        data[key] = value;
      });
  }

  const content = file.replace(FRONTMATTER_REGEX, "").trim();
  return { data, content };
}

export function readingTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function parseTags(tags) {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags
      .map((tag) => String(tag).replace(/[\[\]]/g, "").trim())
      .filter(Boolean);
  }

  return String(tags)
    .replace(/^\[|\]$/g, "")   // strips the outer [ ] brackets
    .split(",")
    .map((tag) => tag.replace(/[\[\]]/g, "").trim())
    .filter(Boolean);
}

function dateToTimestamp(dateText) {
  if (!dateText) return 0;
  const timestamp = Date.parse(dateText);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function formatDate(dateText) {
  const timestamp = dateToTimestamp(dateText);

  if (!timestamp) {
    return "";
  }

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function getStringValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function buildBlogRecord(slug, file) {
  const { data, content: rawContent } = parseFrontmatter(file);
  const frontmatterTitle = getStringValue(data.title);
  const headingTitle = getFirstHeading(rawContent);
  const title = frontmatterTitle || headingTitle || slugToTitle(slug);
  const content = removeLeadHeading(rawContent);
  const description = getStringValue(data.description) || getStringValue(data.excerpt) || createExcerpt(content || rawContent);
  const tags = parseTags(data.tags);
  const rawDate = getStringValue(data.date);
  const timestamp = dateToTimestamp(rawDate);
  const image = getStringValue(data.coverImage) || getStringValue(data.image) || getStringValue(data.cover);
  const author = getStringValue(data.author) || FALLBACK_AUTHOR;
  const readDuration = readingTime(content || rawContent);

  return {
    slug,
    title,
    description,
    image,
    author,
    tags,
    content: content || rawContent,
    reading: readDuration,
    readingMinutes: Number.parseInt(readDuration, 10) || 1,
    timestamp,
    date: rawDate,
    dateLabel: formatDate(rawDate),
    publishedTimeISO: timestamp ? new Date(timestamp).toISOString() : ""
  };
}

export function getBlogPostBySlug(slug) {
  const file = blogFiles[`../blogs/${slug}.md`];
  if (!file) return null;
  return buildBlogRecord(slug, file);
}

export function buildBlogsIndex() {
  return Object.entries(blogFiles)
    .map(([path, file]) => {
      const slug = path.split("/").pop().replace(".md", "");
      return buildBlogRecord(slug, file);
    })
    .sort((a, b) => b.timestamp - a.timestamp);
}

export function getSiteUrl() {
  const envUrl = getStringValue(import.meta.env.VITE_SITE_URL);

  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/$/, "");
  }

  return FALLBACK_SITE_URL;
}

export function toAbsoluteUrl(path, baseUrl = getSiteUrl()) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
