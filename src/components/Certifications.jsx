import React, { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackCertifications = [
  {
    course_name: "Young Leadership Development Program (YLDP)",
    organizing_institution: "People Business & Manipal University Jaipur",
    from: "Sep 2024",
    to: "July 2025",
    duration: "10 months",
  },
  {
    course_name:
      "First International Conference on Artificial Intelligence, Computation, Communication and Network Security (AICCoNS 2025)",
    organizing_institution: "University of Wollongong in Dubai, UAE",
    from: "5 June 2025",
    to: "6 June 2025",
    duration: "2 Days",
  },
];

const normalizeCertifications = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.courses_and_certifications))
    return payload.courses_and_certifications;
  if (Array.isArray(payload.certifications)) return payload.certifications;
  return [];
};

const Certifications = () => {
  const [certs, setCerts] = useState(fallbackCertifications);

  useEffect(() => {
    fetchData("certifications.json").then((data) => {
      const normalized = normalizeCertifications(data);
      if (normalized.length) setCerts(normalized);
    });
  }, []);

  if (!certs.length)
    return (
      <section id="certifications" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Certifications
        </h2>
        <p className="mt-4 text-white">Loading Certifications...</p>
      </section>
    );

  return (
    <section id="certifications" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Certifications
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#101418] shadow-2xl">
        <table className="min-w-full text-left text-white text-sm md:text-base">
          <thead className="bg-[#1f2630] text-white/80 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Course / Certification</th>
              <th className="px-4 py-3">Organizer</th>
              <th className="px-4 py-3">Duration</th>
            </tr>
          </thead>
          <tbody>
            {certs.map((cert, index) => {
              const title =
                cert.title ||
                cert.name ||
                cert.course_name ||
                cert.program ||
                cert.event;
              const provider =
                cert.provider ||
                cert.organization ||
                cert.issuer ||
                cert.organizing_institution;
              const from = cert.from || cert.start || cert.date || "";
              const to = cert.to || cert.end || "";
              const duration = cert.duration;
              const description = cert.description;
              const period = [from, to && to !== "-" ? `to ${to}` : ""]
                .filter(Boolean)
                .join(" ");

              return (
                <tr
                  key={index}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-4 font-semibold text-primary">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold">{title}</div>
                    {(period || description) && (
                      <div className="text-white/70 text-sm">
                        {[period, description].filter(Boolean).join(" • ")}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-white/80">{provider}</td>
                  <td className="px-4 py-4 text-white/80">
                    {[duration].filter(Boolean).join(" ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Certifications;
