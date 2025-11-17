import React, { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackEvents = [
  {
    title:
      "IEEE International Conference on Augmented Reality, Intelligent Systems, and Industrial Automation (ARIIA-2024)",
    role: "Organizer",
    date: "20-21 Dec 2024",
  },
  {
    title:
      "AICTE Sponsored ATAL FDP on Recent Advances in AI for Industrial Applications",
    role: "Organizer",
    date: "2-7 Dec 2024",
  },
];

const normalizeWorkshops = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.workshops_and_conferences_organized))
    return payload.workshops_and_conferences_organized;
  if (Array.isArray(payload.workshops)) return payload.workshops;
  return [];
};

const Workshops = () => {
  const [workshops, setWorkshops] = useState(fallbackEvents);

  useEffect(() => {
    fetchData("worshops.json").then((data) => {
      const normalized = normalizeWorkshops(data);
      if (normalized.length) setWorkshops(normalized);
    });
  }, []);

  if (!workshops.length)
    return (
      <section id="workshops" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Workshops &amp; Conferences Organized
        </h2>
        <p className="mt-4 text-white">Loading Workshops...</p>
      </section>
    );

  return (
    <section id="workshops" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Workshops &amp; Conferences Organized
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {workshops.map((ws, index) => {
          const title = ws.title || ws.name || ws.event;
          const role = ws.role || ws.position;
          const location = ws.location || ws.venue || ws.organization;
          const date =
            ws.date || ws.year || ws.duration || [ws.from, ws.to].filter(Boolean).join(" - ");
          const duration = ws.duration;
          const highlights = Array.isArray(ws.highlights)
            ? ws.highlights
            : Array.isArray(ws.details)
            ? ws.details
            : null;

          return (
            <div
              key={index}
              className="p-5 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
            >
              {title && <h3 className="font-semibold text-white">{title}</h3>}
              {(role || location || date) && (
                <p className="text-sm text-white/80">
                  {[role, location, date].filter(Boolean).join(" | ")}
                </p>
              )}
              {ws.description && (
                <p className="mt-2 text-white text-sm">{ws.description}</p>
              )}
              {duration && (
                <p className="text-white/80 text-sm">Duration: {duration}</p>
              )}
              {highlights && highlights.length > 0 && (
                <ul className="mt-3 list-disc ml-5 space-y-1 text-white/90 text-sm">
                  {highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Workshops;


