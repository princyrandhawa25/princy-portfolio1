import React, { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const Talks = () => {
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    fetchData("talks.json").then((data) => {
      if (data) setTalks(data);
    });
  }, []);

  if (!talks.length)
    return (
      <section id="talks" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Talks
        </h2>
        <p className="mt-4 text-white">Loading Talks...</p>
      </section>
    );

  return (
    <section id="talks" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Talks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {talks.map((talk, index) => {
          const event = talk.event || talk.conference || talk.venue;
          const year = talk.year || talk.date;
          const type = talk.type || talk.format;
          const location = talk.location || talk.city;

          return (
            <div
              key={index}
              className="p-5 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary"
            >
              {talk.title && (
                <h3 className="font-semibold text-white">{talk.title}</h3>
              )}
              {(event || year || type || location) && (
                <p className="text-sm text-white/80">
                  {[event, location, type, year].filter(Boolean).join(" | ")}
                </p>
              )}
              {talk.description && (
                <p className="mt-2 text-white">{talk.description}</p>
              )}
              {talk.link && (
                <a
                  href={talk.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm text-primary underline"
                >
                  View talk
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Talks;


