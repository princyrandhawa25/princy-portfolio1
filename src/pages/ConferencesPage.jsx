import { useEffect, useState } from "react";
import Publications from "../components/Publications";
import { fetchData } from "../data/githubData";

const normalizeConferences = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.conference_presentations)) {
    return payload.conference_presentations;
  }
  if (Array.isArray(payload.conferences)) return payload.conferences;
  return [];
};

export default function ConferencesPage({ data = {} }) {
  const initial = Array.isArray(data.publications) ? data.publications : [];
  const [conferences, setConferences] = useState(initial);

  useEffect(() => {
    fetchData("conferences.json").then((payload) => {
      const normalized = normalizeConferences(payload);
      if (normalized.length) {
        setConferences(normalized);
      }
    });
  }, [data.publications]);

  return (
    <section className="py-10">
      <Publications
        data={conferences}
        title="Conferences"
        sectionId="conferences"
        filterType="Conference"
        dataSource="conferences.json"
      />
    </section>
  );
}
