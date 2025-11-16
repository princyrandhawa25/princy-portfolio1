import { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackEntries = [
  {
    year: "2017-2018",
    role: "Educator",
    duration: "2 hours (November)",
    location: "Mahavidyalaya Bagru",
    topic: "Cancer Awareness Program",
  },
  {
    year: "2018-2019",
    role: "Educator",
    duration: "2 hours (April)",
    location: "Sanskar College",
    topic: "Women Sanitation & Hygiene",
  },
];

const normalizeEntries = (payload) => {
  if (!payload) return [];
  const base = Array.isArray(payload)
    ? payload
    : payload.voluntary_service || [];

  const expanded = [];
  for (const entry of base) {
    if (Array.isArray(entry.service)) {
      for (const item of entry.service) {
        expanded.push({ ...item, year: entry.year });
      }
    } else {
      expanded.push(entry);
    }
  }
  return expanded;
};

export default function Others() {
  const [items, setItems] = useState(fallbackEntries);

  useEffect(() => {
    fetchData("others.json").then((data) => {
      const normalized = normalizeEntries(data);
      if (normalized.length) setItems(normalized);
    });
  }, []);

  if (!items.length) {
    return (
      <section id="others" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Voluntary Service / Others
        </h2>
        <p className="mt-4 text-white">Loading entries...</p>
      </section>
    );
  }

  return (
    <section id="others" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Voluntary Service / Others
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#101418] shadow-2xl">
        <table className="min-w-full text-left text-white text-sm md:text-base">
          <thead className="bg-[#1f2630] text-white/80 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Role / Topic</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Duration / Notes</th>
            </tr>
          </thead>
          <tbody>
            {items.map((entry, index) => (
              <tr
                key={`${entry.year}-${index}`}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-4 py-4 font-semibold text-primary">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-white/80">{entry.year}</td>
                <td className="px-4 py-4">
                  <div className="font-semibold">
                    {entry.role || entry.service || "—"}
                  </div>
                  {(entry.topic || entry.note) && (
                    <div className="text-white/70 text-sm">
                      {entry.topic || entry.note}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 text-white/80">
                  {entry.location || entry.institution || "—"}
                </td>
                <td className="px-4 py-4 text-white/80">
                  {entry.duration || entry.status || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
