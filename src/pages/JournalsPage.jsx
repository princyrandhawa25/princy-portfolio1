import { useEffect, useState } from "react";
import { fetchText } from "../data/githubData";

const extractHeading = (markdown = "") => {
  const headingMatch = markdown.match(/^\s*#\s+(.+)$/m);
  return headingMatch ? headingMatch[1].trim() : "Journals";
};

const extractEntries = (markdown = "") => {
  const normalized = markdown.replace(/\r/g, "").trim();
  if (!normalized) return [];
  const entryPattern = /(?:^|\n)\d+\.\s+[\s\S]*?(?=(?:\n\d+\.\s+)|\s*$)/g;
  const matches = normalized.match(entryPattern);
  if (!matches) return [];
  return matches.map((entry) => entry.replace(/^\s*\d+\.\s*/, "").trim());
};

const renderInlineMarkdown = (text = "") => {
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const segments = [];
  let lastIndex = 0;
  let match;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    segments.push({
      type: "link",
      label: match[1],
      url: match[2],
    });
    lastIndex = linkPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) });
  }

  return segments.map((segment, index) =>
    segment.type === "link" ? (
      <a
        key={`link-${index}`}
        href={segment.url}
        target="_blank"
        rel="noreferrer"
        className="underline text-primary break-words"
      >
        {segment.label}
      </a>
    ) : (
      <span key={`text-${index}`}>{segment.content}</span>
    )
  );
};

export default function JournalsPage() {
  const [heading, setHeading] = useState("Journals");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const loadMarkdown = async () => {
      const markdown = await fetchText("journals.md");
      if (ignore) return;
      setHeading(extractHeading(markdown || ""));
      setEntries(extractEntries(markdown || ""));
      setLoading(false);
    };

    loadMarkdown();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section id="journals" className="py-10 space-y-6">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        {heading}
      </h2>

      {loading ? (
        <p className="text-white">Loading journals...</p>
      ) : entries.length === 0 ? (
        <p className="text-white">No journal entries available.</p>
      ) : (
        <ol className="list-decimal list-outside space-y-6 pl-5 text-white">
          {entries.map((entry, index) => (
            <li key={index} className="leading-relaxed whitespace-pre-line">
              {renderInlineMarkdown(entry)}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
