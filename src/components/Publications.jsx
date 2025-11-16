import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchData } from "../data/githubData";

const Publications = ({
  data = [],
  title = "Publications",
  sectionId = "publications",
  filterType,
  dataSource = "publications.json",
}) => {
  const [items, setItems] = useState(Array.isArray(data) ? data : []);

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      fetchData(dataSource).then((d) => {
        if (Array.isArray(d)) {
          setItems(d);
        }
      });
    } else {
      setItems(data);
    }
  }, [data, dataSource]);

  const norm = useCallback(
    (p) => {
      const title = p.title || p.name || p.paper || "Untitled";
      const authors = Array.isArray(p.authors)
        ? p.authors.filter(Boolean)
        : typeof p.authors === "string"
        ? p.authors
            .split(/[,;]+/)
            .map((a) => a.trim())
            .filter(Boolean)
        : [];
      const venue =
        p.venue || p.journal || p.conference || p.book || p.publisher || "";
      const year = p.year || p.date || p.published || "";
      const volume = p.volume || "";
      const issue = p.issue || p.number || "";
      const pages = p.pages || p.page || "";
      const volumeIssuePages = p.volume_issue_pages || "";
      const articleId = p.article_id || p.identifier || "";
      let type = (
        p.type ||
        p.category ||
        (p.journal ? "Journal" : p.conference ? "Conference" : "")
      )
        .toString()
        .trim();
      if (!type && filterType) {
        type = filterType;
      }
      const rawDoi = (p.doi || "").toString().trim();
      const cleanedDoi = rawDoi.replace(/^https?:\/\/doi.org\//i, "");
      const doiUrl = rawDoi
        ? rawDoi.startsWith("http")
          ? rawDoi
          : `https://doi.org/${cleanedDoi}`
        : "";
      const link =
        p.link ||
        p.url ||
        (doiUrl && !doiUrl.includes("arxiv.org") ? doiUrl : "");
      const pdf = p.pdf || "";
      return {
        title,
        authors,
        venue,
        year,
        volume,
        issue,
        pages,
        volumeIssuePages,
        articleId,
        type,
        doi: cleanedDoi || rawDoi,
        doiUrl,
        link,
        pdf,
      };
    },
    [filterType]
  );

  // ✅ Added 'norm' to dependency array to satisfy ESLint
  const sorted = useMemo(() => {
    const withNorm = (items || []).map((p) => ({ raw: p, ...norm(p) }));
    withNorm.sort((a, b) => {
      const ay = parseInt(a.year) || 0;
      const by = parseInt(b.year) || 0;
      if (by !== ay) return by - ay;
      return (a.title || "").localeCompare(b.title || "");
    });
    return withNorm;
  }, [items, norm]);

  const filtered = useMemo(() => {
    if (!filterType) return sorted;
    const target = filterType.toLowerCase();
    return sorted.filter(
      (entry) => (entry.type || "").toLowerCase() === target
    );
  }, [sorted, filterType]);

  const byYear = useMemo(() => {
    const groups = new Map();
    for (const p of filtered) {
      const key = p.year || "Other";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    }
    return Array.from(groups.entries());
  }, [filtered]);

  return (
    <section id={sectionId} className="space-y-6 py-8">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        {title}
      </h2>

      {filtered.length === 0 ? (
        <p className="text-white">No entries available.</p>
      ) : (
        <div className="space-y-10">
          {byYear.map(([year, list]) => (
            <div key={year} className="space-y-4">
              <h3 className="text-xl font-heading text-primary">{year}</h3>
              <ul className="space-y-4">
                {list.map((p, i) => (
                  <li
                    key={`${year}-${i}`}
                    className="p-5 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          {p.type && (
                            <span className="text-xs uppercase tracking-wide px-2 py-0.5 border border-primary text-white rounded">
                              {p.type}
                            </span>
                          )}
                          <h4 className="font-semibold text-white">{p.title}</h4>
                        </div>
                        {p.authors && p.authors.length > 0 && (
                          <p className="text-sm text-white">{p.authors.join(", ")}</p>
                        )}
                        <p className="text-white">
                          {(() => {
                            const parts = [];
                            if (p.venue) parts.push(p.venue);
                            if (p.volumeIssuePages) {
                              parts.push(p.volumeIssuePages);
                            } else {
                              if (p.volume) parts.push(`Vol ${p.volume}`);
                              if (p.issue) parts.push(`(${p.issue})`);
                              if (p.pages) parts.push(p.pages);
                            }
                            if (p.articleId) parts.push(`ID: ${p.articleId}`);
                            return parts.filter(Boolean).join(", ");
                          })()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {p.doiUrl && (
                          <a
                            href={p.doiUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline text-sm text-white"
                          >
                            DOI
                          </a>
                        )}
                        {p.pdf && (
                          <a
                            href={p.pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="underline text-sm text-white"
                          >
                            PDF
                          </a>
                        )}
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="underline text-sm text-white"
                          >
                            Link
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Publications;
