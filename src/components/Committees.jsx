import React, { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const Committees = () => {
  const [committees, setCommittees] = useState([]);

  useEffect(() => {
    fetchData("committees.json").then((data) => {
      if (data) setCommittees(data);
    });
  }, []);

  if (!committees.length)
    return (
      <section id="committees" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Committees & Memberships
        </h2>
        <p className="mt-4 text-white">Loading Committees...</p>
      </section>
    );

  return (
    <section id="committees" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Committees & Memberships
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {committees.map((cm, index) => {
          const name = cm.committee || cm.name || cm.organization;
          const role = cm.role || cm.position;
          const institution = cm.institution || cm.body || cm.affiliation;
          const year = cm.year || cm.duration || cm.term;

          return (
            <div
              key={index}
              className="p-5 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
            >
              {name && <h3 className="font-semibold text-white">{name}</h3>}
              {(role || institution) && (
                <p className="text-white">
                  {role && (
                    <span className="font-medium">
                      {role}
                      {institution ? " | " : ""}
                    </span>
                  )}
                  {institution}
                </p>
              )}
              {year && <p className="text-sm text-white/80">{year}</p>}
              {cm.description && (
                <p className="mt-2 text-white">{cm.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Committees;


