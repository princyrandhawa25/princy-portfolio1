import { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackEntries = [
  {
    role: "Convener",
    event:
      "IEEE International Conference on Augmented Reality, Intelligent System and Industrial Automation (ARIIA)",
    date: "20-21 December 2024",
    location: "MIT Manipal",
  },
  {
    role: "Technical Program Committee",
    event: "International Conference on Electronics, AI & Robotics",
    date: "15-17 July 2025",
    location: "Sungkyunkwan University, Republic of Korea",
  },
];

const normalizeEntries = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.academic_and_research_committees))
    return payload.academic_and_research_committees;
  if (Array.isArray(payload.committees)) return payload.committees;
  return [];
};

export default function Academics() {
  const [items, setItems] = useState(fallbackEntries);

  useEffect(() => {
    fetchData("academics.json").then((data) => {
      const normalized = normalizeEntries(data);
      if (normalized.length) setItems(normalized);
    });
  }, []);

  if (!items.length) {
    return (
      <section id="academics" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Academic &amp; Research Committees
        </h2>
        <p className="mt-4 text-white">Loading academics...</p>
      </section>
    );
  }

  return (
    <section id="academics" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Academic &amp; Research Committees
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#101418] shadow-2xl">
        <table className="min-w-full text-left text-white text-sm md:text-base">
          <thead className="bg-[#1f2630] text-white/80 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Location</th>
            </tr>
          </thead>
          <tbody>
            {items.map((entry, index) => (
              <tr
                key={`${entry.event}-${index}`}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-4 py-4 font-semibold text-primary">
                  {index + 1}
                </td>
                <td className="px-4 py-4">
                  <div className="font-semibold">{entry.role}</div>
                </td>
                <td className="px-4 py-4 text-white/80">{entry.event}</td>
                <td className="px-4 py-4 text-white/80">
                  {entry.date || entry.year || "—"}
                </td>
                <td className="px-4 py-4 text-white/80">
                  {entry.location || entry.institution || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
