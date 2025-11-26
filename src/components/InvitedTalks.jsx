import { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackTalks = [
  {
    date: "09 Oct 2025",
    title:
      "Invited Speaker - International Conference on Computational Intelligence and Data Communication (ICCIDC-2025)",
    location: "Bali, Indonesia",
  },
  {
    date: "03 Oct 2025",
    title:
      "Expert Lecture on Machine Learning in Industrial Engineering: A Case Study",
    location: "Manipal Institute of Technology, Manipal",
  },
];

const normalizeTalks = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.invited_talks)) return payload.invited_talks;
  return [];
};

export default function InvitedTalks() {
  const [talks, setTalks] = useState(fallbackTalks);

  useEffect(() => {
    fetchData("invitedTalks.json").then((data) => {
      const normalized = normalizeTalks(data);
      if (normalized.length) setTalks(normalized);
    });
  }, []);

  if (!talks.length) {
    return (
      <section id="invited-talks" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Invited Talks
        </h2>
        <p className="mt-4 text-white">Loading invited talks...</p>
      </section>
    );
  }

  return (
    <section id="invited-talks" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Invited Talks
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#101418] shadow-2xl">
        <table className="min-w-full text-left text-white text-sm md:text-base">
          <thead className="bg-[#1f2630] text-white/80 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Location / Details</th>
            </tr>
          </thead>
          <tbody>
            {talks.map((talk, index) => (
              <tr
                key={`${talk.date}-${index}`}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-4 py-4 font-semibold text-primary">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-white/80">
                  {Array.isArray(talk.dates) && talk.dates.length ? (
                    <div className="space-y-1">
                      {talk.dates.map((d, i) => (
                        <div key={`${d}-${i}`}>{d}</div>
                      ))}
                    </div>
                  ) : (
                    talk.date
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="font-semibold">{talk.title}</div>
                </td>
                <td className="px-4 py-4 text-white/80">
                  {talk.location || talk.details || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
