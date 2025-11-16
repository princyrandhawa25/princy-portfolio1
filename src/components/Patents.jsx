import React, { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackPatents = [
  {
    date: "03/2025",
    title: "SMART ORTHO SUIT",
    co_inventors: [
      "Dr. Shiva Prasad",
      "Safal Choudhary",
      "Sampath Kumar",
      "Manthan Chawla",
    ],
    application_number: "202511021596 A",
  },
  {
    date: "03/2025",
    title: "A SMART BELT TO DETECT ABDOMINAL CANCER",
    co_inventors: [
      "Dr. Shiva Prasad",
      "Safal Choudhary",
      "Sampath Kumar",
      "Manthan Chawla",
    ],
    application_number: "202511021595 A",
  },
];

const normalizePatents = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.patents_and_ipr)) return payload.patents_and_ipr;
  if (Array.isArray(payload.patents)) return payload.patents;
  return [];
};

const Patents = () => {
  const [patents, setPatents] = useState(fallbackPatents);

  useEffect(() => {
    fetchData("patents.json").then((data) => {
      const normalized = normalizePatents(data);
      if (normalized.length) setPatents(normalized);
    });
  }, []);

  if (!patents.length)
    return (
      <section id="patents" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Patents
        </h2>
        <p className="mt-4 text-white">Loading Patents...</p>
      </section>
    );

  return (
    <section id="patents" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Patents
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#101418] shadow-2xl">
        <table className="min-w-full text-left text-white text-sm md:text-base">
          <thead className="bg-[#1f2630] text-white/80 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Application No.</th>
              <th className="px-4 py-3">Co-Inventors</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {patents.map((patent, index) => (
              <tr
                key={`${patent.application_number || patent.title}-${index}`}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-4 py-4 font-semibold text-primary">
                  {index + 1}
                </td>
                <td className="px-4 py-4">
                  <div className="font-semibold">{patent.title}</div>
                </td>
                <td className="px-4 py-4 text-white/80">
                  {patent.application_number || patent.app_no || "—"}
                </td>
                <td className="px-4 py-4 text-white/80">
                  {Array.isArray(patent.co_inventors)
                    ? patent.co_inventors.join(", ")
                    : patent.co_inventors || patent.inventors || "—"}
                </td>
                <td className="px-4 py-4 text-white/80">
                  {patent.date || patent.year || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Patents;


