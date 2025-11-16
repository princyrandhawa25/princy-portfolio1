import React, { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const References = () => {
  const [refs, setRefs] = useState([]);

  useEffect(() => {
    fetchData("references.json").then((data) => {
      if (data) setRefs(data);
    });
  }, []);

  if (!refs.length)
    return (
      <section id="references" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          References
        </h2>
        <p className="mt-4 text-white">Loading References...</p>
      </section>
    );

  return (
    <section id="references" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        References
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {refs.map((ref, index) => (
          <div
            key={index}
            className="p-5 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary"
          >
            {ref.name && <h3 className="font-semibold text-white">{ref.name}</h3>}
            {(ref.designation || ref.institution) && (
              <p className="text-white">
                {ref.designation && (
                  <span>
                    {ref.designation}
                    {ref.institution ? " | " : ""}
                  </span>
                )}
                {ref.institution && <strong>{ref.institution}</strong>}
              </p>
            )}
            <dl className="mt-2 space-y-1 text-sm text-white">
              {ref.email && (
                <div>
                  <dt className="font-medium inline">Email: </dt>
                  <dd className="inline">
                    <a
                      href={`mailto:${ref.email}`}
                      className="text-primary underline"
                    >
                      {ref.email}
                    </a>
                  </dd>
                </div>
              )}
              {ref.phone && (
                <div>
                  <dt className="font-medium inline">Phone: </dt>
                  <dd className="inline">{ref.phone}</dd>
                </div>
              )}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
};

export default References;


