import { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackReviews = [
  {
    year: 2021,
    domain: "Machine Learning",
    journal: "Soft Computing",
    rank: "Q1",
  },
  {
    year: 2021,
    domain: "Artificial Intelligence",
    journal: "EVOS",
    rank: "Q1",
  },
];

const normalizeReviews = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.reviewer_for_journals))
    return payload.reviewer_for_journals;
  return [];
};

export default function PeerReview() {
  const [reviews, setReviews] = useState(fallbackReviews);

  useEffect(() => {
    fetchData("peerReview.json").then((data) => {
      const normalized = normalizeReviews(data);
      if (normalized.length) setReviews(normalized);
    });
  }, []);

  if (!reviews.length) {
    return (
      <section id="peer-review" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Peer Review Service
        </h2>
        <p className="mt-4 text-white">Loading peer review data...</p>
      </section>
    );
  }

  return (
    <section id="peer-review" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Peer Review Service
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#101418] shadow-2xl">
        <table className="min-w-full text-left text-white text-sm md:text-base">
          <thead className="bg-[#1f2630] text-white/80 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Journal</th>
              <th className="px-4 py-3">Domain (Rank)</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr
                key={`${review.journal}-${review.year}-${index}`}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-4 py-4 font-semibold text-primary">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-white/80">{review.year}</td>
                <td className="px-4 py-4">
                  <div className="font-semibold">{review.journal}</div>
                </td>
                <td className="px-4 py-4 text-white/80">
                  {[
                    review.domain || "—",
                    review.rank ? `(${review.rank})` : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
