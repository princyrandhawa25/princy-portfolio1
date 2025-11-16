import React, { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackEducation = [
  {
    date: "Dec 2025 (Expected)",
    degree: "PhD",
    specialization: "AI-Powered Computer Vision",
    thesis:
      "Design and Development of Smart Jacket for the Classification of Violent Motion using ML Techniques",
    institution: "NIT Warangal",
  },
  {
    date: "Oct 2024",
    degree: "MBA",
    specialization: "Business Analytics and Data Science",
    institution: "Manipal University Jaipur, Rajasthan, India",
  },
  {
    date: "Feb 2021",
    degree: "AICTE PG Certification",
    institution: "AICTE",
  },
  {
    date: "Apr 2013",
    degree: "M.Tech",
    specialization: "Control Systems",
    institution: "Manipal Institute of Technology, Manipal, Karnataka",
  },
  {
    date: "Jul 2010",
    degree: "B.Tech",
    specialization: "Applied Electronics and Instrumentation",
    institution:
      "Mahant Bachittar Singh College of Engineering and Technology, Jammu",
  },
];

const Education = () => {
  const [education, setEducation] = useState(fallbackEducation);

  useEffect(() => {
    fetchData("education.json").then((data) => {
      if (Array.isArray(data) && data.length) {
        setEducation(data);
      }
    });
  }, []);

  if (!education.length)
    return (
      <section id="education" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Education
        </h2>
        <p className="mt-4 text-white">Loading Education...</p>
      </section>
    );

  return (
    <section id="education" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Education
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, index) => (
          <div
            key={index}
            className="p-5 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
          >
            <h3 className="font-semibold text-white">
              {edu.degree}
              {edu.specialization ? ` · ${edu.specialization}` : ""}
            </h3>
            <p className="text-white/90 leading-relaxed">
              <strong>{edu.institution}</strong>
              {edu.date ? ` · ${edu.date}` : ""}
            </p>
            {edu.thesis && (
              <p className="mt-2 text-sm text-white/80">
                <span className="font-semibold">Thesis:</span> {edu.thesis}
              </p>
            )}
            {!edu.thesis && edu.details && (
              <p className="mt-2 text-sm text-white/80">{edu.details}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
