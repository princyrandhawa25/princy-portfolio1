import React, { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const Service = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    fetchData("service.json").then((data) => {
      if (data) setService(data);
    });
  }, []);

  if (!service.length)
    return (
      <section id="service" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Service & Social Work
        </h2>
        <p className="mt-4 text-white">Loading Service...</p>
      </section>
    );

  return (
    <section id="service" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Service & Social Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {service.map((srv, index) => (
          <div
            key={index}
            className="p-5 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary"
          >
            {srv.role && <h3 className="font-semibold text-white">{srv.role}</h3>}
            {(srv.organization || srv.duration || srv.location) && (
              <p className="text-sm text-white/80">
                {[srv.organization, srv.location, srv.duration]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
            )}
            {srv.description && (
              <p className="mt-2 text-white">{srv.description}</p>
            )}
            {Array.isArray(srv.highlights) && srv.highlights.length > 0 && (
              <ul className="mt-2 list-disc ml-5 space-y-1 text-white">
                {srv.highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;


