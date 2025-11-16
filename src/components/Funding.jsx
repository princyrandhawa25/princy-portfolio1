import { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackFunding = [
  {
    project_title:
      "Assessing the Potential of Agri Tech Start-Up Ecosystem for Young Innovators in India: Prospects and Challenges in the Wake of Government Initiatives",
    funding_agency:
      "Indian Council of Social Science Research (ICSSR)",
    program: "Vision Viksit Bharat @ 2047 (VVB@2047)",
    amount: "Rs 20 Lakhs",
    principal_and_co_investigators: [
      "Dr. Pratibha Rai",
      "Dr. Priya Gupta",
      "Prof. Gopal Meena",
      "Dr. Vandana Rai",
      "Dr. Arvind Arahant",
      "Dr. Princy Randhawa",
    ],
  },
];

const normalizeFunding = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.funding)) return payload.funding;
  if (Array.isArray(payload.projects)) return payload.projects;
  return [];
};

export default function Funding() {
  const [projects, setProjects] = useState(fallbackFunding);

  useEffect(() => {
    fetchData("funding.json").then((data) => {
      const normalized = normalizeFunding(data);
      if (normalized.length) {
        setProjects(normalized);
      }
    });
  }, []);

  if (!projects.length) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Funding
        </h2>
        <p className="mt-4 text-white">Loading funding data...</p>
      </section>
    );
  }

  return (
    <section id="funding" className="space-y-6">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Funding
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <article
            key={idx}
            className="p-6 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary space-y-3"
          >
            {project.project_title && (
              <h3 className="text-xl font-semibold">
                {project.project_title}
              </h3>
            )}
            <div className="text-sm text-white/80 space-y-1">
              {project.funding_agency && (
                <p>
                  <span className="font-semibold">Funding Agency:</span>{" "}
                  {project.funding_agency}
                </p>
              )}
              {project.program && (
                <p>
                  <span className="font-semibold">Program:</span>{" "}
                  {project.program}
                </p>
              )}
              {project.amount && (
                <p>
                  <span className="font-semibold">Amount:</span>{" "}
                  {project.amount}
                </p>
              )}
            </div>
            {Array.isArray(project.principal_and_co_investigators) &&
              project.principal_and_co_investigators.length > 0 && (
                <div>
                  <p className="font-semibold text-primary">
                    Principal &amp; Co-Investigators
                  </p>
                  <ul className="mt-2 list-disc ml-5 space-y-1 text-white/90">
                    {project.principal_and_co_investigators.map((pi, i) => (
                      <li key={i}>{pi}</li>
                    ))}
                  </ul>
                </div>
              )}
            {project.description && (
              <p className="text-white/80">{project.description}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
