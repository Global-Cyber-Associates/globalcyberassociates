import { XMLParser } from "fast-xml-parser";

const SOURCES = [
  { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
  { name: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/" },
  { name: "Krebs on Security", url: "https://krebsonsecurity.com/feed/" },
  { name: "Dark Reading", url: "https://www.darkreading.com/rss.xml" },
  { name: "SecurityWeek", url: "https://www.securityweek.com/feed/" },
  { name: "Security Affairs", url: "https://www.securityaffairs.com/feed" },
];

const FETCH_TIMEOUT_MS = 8000;
const MAX_ITEMS = 40;
const MAX_SUMMARY_LENGTH = 220;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function stripHtml(value) {
  if (!value) return "";
  return decodeEntities(
    String(value)
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
      .replace(/<[^>]*>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).trim()}...`;
}

function extractLink(rawLink) {
  if (!rawLink) return "";
  if (typeof rawLink === "string") return rawLink.trim();
  if (Array.isArray(rawLink)) {
    const alt = rawLink.find((entry) => entry?.["@_rel"] !== "self") || rawLink[0];
    return extractLink(alt);
  }
  if (typeof rawLink === "object") {
    return rawLink["@_href"] || rawLink["#text"] || "";
  }
  return "";
}

function extractText(raw) {
  if (raw == null) return "";
  if (typeof raw === "string") return raw;
  if (typeof raw === "object" && "#text" in raw) return String(raw["#text"]);
  return String(raw);
}

function parsePubDate(item) {
  const raw = extractText(item.pubDate || item.published || item.updated || item["dc:date"]);
  const timestamp = Date.parse(raw);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; GCA-CyberNewsBot/1.0; +https://www.globalcyberassociates.com)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function normalizeItems(xml, sourceName) {
  const parsed = parser.parse(xml);
  const channelItems = parsed?.rss?.channel?.item;
  const feedEntries = parsed?.feed?.entry;
  const rawItems = channelItems || feedEntries || [];
  const items = Array.isArray(rawItems) ? rawItems : [rawItems];

  return items
    .filter(Boolean)
    .map((item) => {
      const title = stripHtml(extractText(item.title));
      const link = extractLink(item.link) || extractText(item.guid);
      const summarySource =
        item.description || item.summary || item["content:encoded"] || item.content;
      const cleanedSummary = stripHtml(extractText(summarySource)).replace(
        /\s*The post .+? appeared first on .+?\.\s*$/i,
        ""
      );
      const summary = truncate(cleanedSummary, MAX_SUMMARY_LENGTH);
      const timestamp = parsePubDate(item);

      return {
        title,
        link,
        source: sourceName,
        summary,
        timestamp,
        publishedAt: timestamp ? new Date(timestamp).toISOString() : "",
      };
    })
    .filter((item) => {
      if (!item.title || !item.link) return false;
      if (!item.timestamp || item.timestamp > Date.now() + 5 * 60 * 1000) return false;
      if (/\/events?\//i.test(item.link)) return false;
      return true;
    });
}

function sendJson(res, statusCode, body) {
  const payload = JSON.stringify(body);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
  });
  res.end(payload);
}

export async function getCyberNews() {
  const results = await Promise.allSettled(
    SOURCES.map(async (source) => {
      const xml = await fetchWithTimeout(source.url);
      return normalizeItems(xml, source.name);
    })
  );

  const allItems = [];
  const sourceErrors = [];

  results.forEach((result, index) => {
    const source = SOURCES[index];
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    } else {
      sourceErrors.push({ source: source.name, error: String(result.reason?.message || result.reason) });
    }
  });

  const seen = new Set();
  const deduped = allItems.filter((item) => {
    const key = item.link || item.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  deduped.sort((a, b) => b.timestamp - a.timestamp);

  return {
    items: deduped.slice(0, MAX_ITEMS),
    sourceErrors,
  };
}

export default async function handler(req, res) {
  const { items, sourceErrors } = await getCyberNews();

  if (items.length === 0) {
    sendJson(res, 502, {
      error: "Unable to fetch any cybersecurity news feeds right now.",
      sourceErrors,
    });
    return;
  }

  sendJson(res, 200, {
    updatedAt: new Date().toISOString(),
    items,
    sourceErrors: sourceErrors.length > 0 ? sourceErrors : undefined,
  });
}
