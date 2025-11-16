import React, { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const normalizeEntries = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.awards_and_achievements))
    return payload.awards_and_achievements;
  if (Array.isArray(payload.awards)) return payload.awards;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
};

const AwardsAchievements = ({ awardsData = [], achievementsData = [] }) => {
  const [awards, setAwards] = useState(
    Array.isArray(awardsData) ? awardsData : []
  );
  const [achievements, setAchievements] = useState(
    Array.isArray(achievementsData) ? achievementsData : []
  );

  useEffect(() => {
    if (awards.length) return;
    fetchData("awards.json").then((data) => {
      const normalized = normalizeEntries(data);
      if (normalized.length) setAwards(normalized);
    });
  }, [awards.length]);

  useEffect(() => {
    if (achievements.length) return;
    fetchData("achievements.json").then((data) => {
      const normalized = normalizeEntries(data);
      if (normalized.length) setAchievements(normalized);
    });
  }, [achievements.length]);

  const hasAwards = awards.length > 0;
  const hasAchievements = achievements.length > 0;

  if (!hasAwards && !hasAchievements) {
    return (
      <section className="py-8 space-y-4">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Awards &amp; Achievements
        </h2>
        <p className="text-white">Loading recognitions...</p>
      </section>
    );
  }

  return (
    <section className="space-y-10">
      {hasAwards && (
        <div id="awards" className="space-y-4">
          <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
            Awards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div
                key={`award-${index}`}
                className="p-5 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
              >
                {award.title && (
                  <h3 className="font-semibold text-white">{award.title}</h3>
                )}
                {[
                  award.organization || award.institution || award.event || "",
                  award.date || award.year,
                ]
                  .filter(Boolean)
                  .length > 0 && (
                  <p className="text-sm text-white/80">
                    {[
                      award.organization || award.institution || award.event || "",
                      award.date || award.year,
                    ]
                      .filter(Boolean)
                      .join(" | ")}
                  </p>
                )}
                {award.description && (
                  <p className="mt-2 text-white">{award.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {hasAchievements && (
        <div id="achievements" className="space-y-4">
          <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((ach, index) => {
              const meta = [
                ach.organization || ach.institution || ach.event || "",
                ach.location,
                ach.year,
              ]
                .filter(Boolean)
                .join(" | ");

              return (
                <div
                  key={`achievement-${index}`}
                  className="p-5 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
                >
                  {ach.title && (
                    <h3 className="font-semibold text-white">{ach.title}</h3>
                  )}
                  {meta && <p className="text-sm text-white/80">{meta}</p>}
                  {ach.description && (
                    <p className="mt-2 text-white">{ach.description}</p>
                  )}
                  {ach.link && (
                    <a
                      href={ach.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex text-sm text-primary underline"
                    >
                      View details
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default AwardsAchievements;


