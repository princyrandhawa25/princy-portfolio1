import { useEffect, useState } from "react";
import Publications from "../components/Publications";
import { fetchData } from "../data/githubData";

const normalizeJournals = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.peer_reviewed_journal_publications))
    return payload.peer_reviewed_journal_publications;
  if (Array.isArray(payload.journals)) return payload.journals;
  return [];
};

export default function JournalsPage({ data = {} }) {
  const initial = Array.isArray(data.publications) ? data.publications : [];
  const [journals, setJournals] = useState(initial);

  useEffect(() => {
    fetchData("journals.json").then((payload) => {
      const normalized = normalizeJournals(payload);
      if (normalized.length) {
        setJournals(normalized);
      }
    });
  }, [data.publications]);

  return (
    <section className="py-10">
      <Publications
        data={journals}
        title="Journals"
        sectionId="journals"
        filterType="Journal"
        dataSource="journals.json"
      />
    </section>
  );
}
