import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import type { NewsItem } from "../../data/news";
import { getRecentNews, RECENT_WINDOW_DAYS } from "../../data/newsSelection";
import { useNewsDate } from "../../hooks/useNewsDate";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import "./NewsTicker.css";

const ROTATE_MS = 3000;
const SLOT_COUNT = 3;

const statusText = {
  active: { zh: "进行中", en: "Active" },
  ended: { zh: "已结束", en: "Ended" },
  recap: { zh: "回顾", en: "Recap" },
  evergreen: { zh: "长期阅读", en: "Evergreen" },
} as const;

function NewsTicker() {
  const now = useNewsDate();
  const items = getRecentNews(now);
  return <NewsTickerContent key={items.map((item) => item.id).join(",")} items={items} />;
}

function NewsTickerContent({ items: TICKER_NEWS }: { items: NewsItem[] }) {
  const { language } = useLanguage();
  const t = (zh: string, en: string) => (language === "zh" ? zh : en);
  const [track, setTrack] = useState<number[]>(() =>
    Array.from({ length: Math.min(SLOT_COUNT, TICKER_NEWS.length) }, (_, index) => index),
  );
  const [shifting, setShifting] = useState(false);
  const nextRef = useRef(SLOT_COUNT % Math.max(1, TICKER_NEWS.length));
  const trackEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash !== "#city-dispatch") return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("city-dispatch")?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (TICKER_NEWS.length <= SLOT_COUNT) return;

    const timer = window.setInterval(() => {
      setTrack((previous) => {
        if (previous.length > SLOT_COUNT) return previous;

        let next = nextRef.current % TICKER_NEWS.length;
        let guard = 0;
        while (previous.includes(next) && guard < TICKER_NEWS.length) {
          next = (next + 1) % TICKER_NEWS.length;
          guard += 1;
        }
        nextRef.current = (next + 1) % TICKER_NEWS.length;
        return [...previous, next];
      });
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [TICKER_NEWS.length]);

  useLayoutEffect(() => {
    if (track.length <= SLOT_COUNT) return;
    void trackEl.current?.offsetWidth;
    setShifting(true);
  }, [track.length]);

  const finishShift = useCallback(() => {
    setTrack((previous) => (previous.length > SLOT_COUNT ? previous.slice(1) : previous));
    setShifting(false);
  }, []);

  useEffect(() => {
    if (!shifting) return;
    const fallback = window.setTimeout(finishShift, 700);
    return () => window.clearTimeout(fallback);
  }, [finishShift, shifting]);

  const handleShiftEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    finishShift();
  };

  return (
    <section id="city-dispatch" className="section news-ticker-section reveal">
      <div className="container dispatch-home-shell">
        <header className="dispatch-home-header">
          <div>
            <p className="section-kicker dispatch-eyebrow">{t("城市快报", "CITY DISPATCH")}</p>
            <p className="dispatch-home-intro">
              {t(
                "捕捉最新信号，追踪持续展开的事件脉络，也保留经得起时间检验的观点。",
                "Fresh signals, unfolding storylines, and ideas that outlast the news cycle.",
              )}
            </p>
          </div>
          <Link to="/news" className="dispatch-view-all">
            {t("查看新闻库", "Open news library")} →
          </Link>
        </header>

        <div className="news-ticker-viewport">
          <div
            ref={trackEl}
            className={`news-ticker-track${shifting ? " is-shifting" : ""}`}
            onTransitionEnd={handleShiftEnd}
          >
            {track.map((newsIndex) => {
              const item = TICKER_NEWS[newsIndex];
              return (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="news-tk-card"
                  data-news-id={item.id}
                >
                  <div className="news-tk-top">
                    <div className="news-tk-media">
                      <ImagePlaceholder
                        src={item.image}
                        ratio="16 / 9"
                        label={t(item.imageLabel.zh, item.imageLabel.en)}
                        loading="lazy"
                        objectFit={item.imageFit}
                      />
                    </div>
                    <div className="news-tk-meta">
                      <div className="news-tk-tagrow">
                        <span className={`news-tk-tag news-tk-tag-${item.catKey}`}>
                          {t(item.category.zh, item.category.en)}
                        </span>
                        <span className={`news-tk-state news-tk-state-${item.status}`}>
                          {t(statusText[item.status].zh, statusText[item.status].en)}
                        </span>
                        <span className="news-tk-source">
                          {t(item.source.zh, item.source.en)} · {item.date}
                        </span>
                      </div>
                      <h3 className="news-tk-title">{t(item.title.zh, item.title.en)}</h3>
                    </div>
                  </div>
                  <p className="news-tk-desc">{t(item.summary.zh, item.summary.en)}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <footer className="dispatch-home-footer">
          <span>
            {t(
              `近 ${RECENT_WINDOW_DAYS} 天 · ${TICKER_NEWS.length} 条动态参与轮播`,
              `Past ${RECENT_WINDOW_DAYS} days · ${TICKER_NEWS.length} dispatches in rotation`,
            )}
          </span>
          <span className="dispatch-online"><i /> {t("快报在线", "DISPATCH ONLINE")}</span>
        </footer>
      </div>
    </section>
  );
}

export default NewsTicker;
