import React, { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackExperience = [
  {
    start_date: "4/09/2025",
    end_date: "Present",
    position: "Associate Professor",
    department: "AI/ML Department",
    institution: "Dayanand Sagar University, Bengaluru",
  },
  {
    start_date: "05/2025",
    end_date: "02/09/2025",
    position: "Associate Professor",
    department: "Department of Mechatronics Engineering",
    institution: "Manipal University Jaipur, Rajasthan",
  },
  {
    start_date: "07/2015",
    end_date: "04/2025",
    position: "Associate Professor",
    department: "Department of Mechatronics Engineering",
    institution: "Manipal University Jaipur, Rajasthan",
  },
  {
    start_date: "13/04/2023",
    end_date: "2025",
    position: "Assistant Director",
    department: "Directorate of Alumni Relations",
    institution: "Manipal University Jaipur",
  },
  {
    start_date: "09/2014",
    end_date: "06/2015",
    position: "Assistant Professor",
    specialization: "Applied Electronics and Instrumentation",
    institution: "MBS College of Engineering & Technology, Jammu",
  },
  {
    start_date: "07/2013",
    end_date: "05/2014",
    position: "System Modelling and Simulation Engineer",
    institution: "ITGlobe Inc, Bangalore, Karnataka",
  },
];

const normalizeExperience = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw.employment)) return raw.employment;
  return [];
};

const Experience = () => {
  const [items, setItems] = useState(fallbackExperience);

  useEffect(() => {
    fetchData("experience.json").then((data) => {
      const normalized = normalizeExperience(data);
      if (normalized.length) {
        setItems(normalized);
      }
    });
  }, []);

  if (!items.length) {
    return (
      <section id="experience" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Experience
        </h2>
        <p className="mt-4 text-white">Loading Experience...</p>
      </section>
    );
  }

  const displayPeriod = (it) => {
    if (it.period) return it.period;
    if (it.duration) return it.duration;
    const start =
      it.start ||
      it.startDate ||
      it.from ||
      it.yearStart ||
      it.start_date ||
      it.started;
    const end =
      it.end ||
      it.endDate ||
      it.to ||
      it.yearEnd ||
      it.end_date ||
      it.ended ||
      "Present";
    if (start || end) return [start, end].filter(Boolean).join(" - ");
    return it.year || "";
  };

  const displayTitle = (it) => it.title || it.role || it.position || "";
  const displayOrg = (it) => it.organization || it.company || it.institution || "";
  const displayDetails = (it) =>
    it.details ||
    (typeof it.description === "string" ? it.description : it.summary) ||
    "";
  const displayBullets = (it) =>
    Array.isArray(it.bullets)
      ? it.bullets
      : Array.isArray(it.responsibilities)
      ? it.responsibilities
      : Array.isArray(it.description)
      ? it.description
      : null;

  return (
    <section id="experience" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Experience
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((it, idx) => {
          const title = displayTitle(it);
          const org = displayOrg(it);
          const period = displayPeriod(it);
          const details = displayDetails(it);
          const bullets = displayBullets(it);
          const location = it.location || it.city || it.place || "";
          const department = it.department || it.division || "";
          const specialization = it.specialization || "";
          const deptLine = [department, specialization].filter(Boolean).join(" · ");
          return (
            <div
              key={idx}
              className="p-5 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
            >
              {title && <h3 className="font-semibold text-white">{title}</h3>}
              {(org || period || location) && (
                <p className="text-white/90">
                  {org && <strong>{org}</strong>} {location && `· ${location}`}{" "}
                  {period && `· ${period}`}
                </p>
              )}
              {deptLine && <p className="text-white/80">{deptLine}</p>}
              {details && <p className="mt-2 text-white/80">{details}</p>}
              {bullets && bullets.length > 0 && (
                <ul className="mt-2 list-disc ml-5 space-y-1">
                  {bullets.map((b, i) => (
                    <li key={i} className="text-white/80">
                      {b}
                    </li>
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

export default Experience;
