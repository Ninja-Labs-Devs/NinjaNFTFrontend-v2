import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const server = await createServer({ configFile: false, cacheDir: "node_modules/.vite-content-check", server: { middlewareMode: true }, appType: "custom" });
try {
  const { NEWS } = await server.ssrLoadModule("/src/data/news.ts");
  const { OCTOBER_2026_NEWS } = await server.ssrLoadModule("/src/data/news202610.ts");
  const { getRecentNews, getNewsSections } = await server.ssrLoadModule("/src/data/newsSelection.ts");
  const { PUBLIC_PROJECTS } = await server.ssrLoadModule("/src/data/publicProjects.ts");
  const { OPEN_REPOS } = await server.ssrLoadModule("/src/data/openRepos.ts");
  const now = new Date("2026-10-13T04:00:00Z");
  assert.equal(NEWS.length, 32);
  assert.equal(OCTOBER_2026_NEWS.length, 12);
  assert.equal(new Set(NEWS.map((item) => item.id)).size, NEWS.length);
  assert.equal(PUBLIC_PROJECTS.filter((item) => item.kind !== "repo").length, 12);
  assert.equal(OPEN_REPOS.length, 13);
  assert.equal(new Set(OPEN_REPOS.map((item) => item.githubRepo)).size, 13);
  assert.ok(!PUBLIC_PROJECTS.some((item) => /alphapal/i.test(item.id + item.title)));
  assert.equal(new Set(PUBLIC_PROJECTS.map((item) => item.id)).size, PUBLIC_PROJECTS.length);
  for (const id of ["maneki-ai", "olaxbt"]) {
    const item = PUBLIC_PROJECTS.find((project) => project.id === id);
    assert.ok(item?.descriptionZh && item.descriptionEn && item.statusZh && item.statusEn);
    assert.ok(item.href.startsWith("https://"));
  }
  for (const item of OPEN_REPOS.slice(0, 3)) {
    assert.ok(item.descriptionZh && item.descriptionEn && item.featuresZh && item.featuresEn);
  }
  for (const item of OCTOBER_2026_NEWS) {
    for (const lang of ["zh", "en"]) {
      assert.ok(item.title[lang] && item.summary[lang] && item.body[lang].length && item.imageLabel[lang]);
    }
    assert.ok(item.url.startsWith("https://"));
  }
  for (const image of [...NEWS.map((item) => item.image), ...PUBLIC_PROJECTS.map((item) => item.image), ...OPEN_REPOS.map((item) => item.imageSrc)]) {
    assert.ok(image && existsSync(path.join(process.cwd(), "public", image)), `Missing local image: ${image}`);
  }
  const recent = getRecentNews(now);
  assert.equal(recent.length, 10);
  assert.deepEqual(recent.slice(0, 6).map((item) => item.id), ["injective-gulf-labs", "n1nj4-website-refresh", "injective-sec-transfer-agent", "usdc-usdt-rivalry", "injective-bitrefill-payments", "inj-on-solana"]);
  assert.ok(!recent.some((item) => item.id === "gwdc-korea-andrew-kang" || item.id === "blockchain-association-history"));
  const fixture = (date, extra = {}) => ({ ...NEWS[0], id: date, publishedAt: date, sections: ["latest"], ...extra });
  assert.deepEqual(getRecentNews(now, [fixture("2026-08-14"), fixture("2026-08-13"), fixture("2026-10-14")]).map((item) => item.id), ["2026-08-14"]);
  assert.equal(getRecentNews(now, [fixture("2026-10-01", { sections: ["archive"] }), fixture("2026-10-02", { status: "ended" })]).length, 0);
  assert.equal(getRecentNews(new Date("2027-01-01T00:00:00Z")).length, 0, "Do not refill an empty pool with stale news");
  assert.ok(getNewsSections(fixture("2026-08-13"), now).includes("archive"));
  assert.ok(!getNewsSections(fixture("2026-08-13"), now).includes("latest"));
  assert.equal(getRecentNews(new Date("2026-10-12T16:00:00Z"), [fixture("2026-08-14")]).length, 1);
  assert.equal(getRecentNews(new Date("2026-10-13T16:00:00Z"), [fixture("2026-08-14")]).length, 0);
  assert.equal(NEWS.find((item) => item.id === "adventurex-2026").publishedAt, "2026-07-21");
  console.log("PASS: 32 dispatches, 12 projects, 13 repos; bilingual fields, local images, deduplication, archives, 60-day boundary, timezone rollover, and empty pool.");
} finally {
  await server.close();
}
