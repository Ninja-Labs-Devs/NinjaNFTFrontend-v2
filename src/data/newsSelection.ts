import { NEWS, type NewsItem, type NewsSection } from "./news";

export const RECENT_WINDOW_DAYS = 60;

// Compare publication calendar dates in the project's editorial timezone.
// No import-day substitutions, future posts, or fallback to stale content.
export function isRecentNews(item: NewsItem, now = new Date()): boolean {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Singapore" }).format(now);
  const end = Date.parse(`${today}T00:00:00Z`);
  const published = Date.parse(`${item.publishedAt}T00:00:00Z`);
  return published <= end && published >= end - RECENT_WINDOW_DAYS * 86400000;
}

export function getRecentNews(now = new Date(), items: NewsItem[] = NEWS): NewsItem[] {
  return items.filter((item) => isRecentNews(item, now) && !item.sections.includes("archive") && item.status !== "ended")
    .sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999) || b.publishedAt.localeCompare(a.publishedAt));
}

export function getNewsSections(item: NewsItem, now = new Date()): NewsSection[] {
  const sections: NewsSection[] = item.sections.filter((section) => section !== "latest");
  if (isRecentNews(item, now) && !sections.includes("archive") && item.status !== "ended") {
    if (item.sections.includes("latest")) sections.unshift("latest");
  } else if (!sections.includes("archive")) {
    sections.push("archive");
  }
  return sections;
}
