import React, { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackChapters = [
  {
    year: 2022,
    title: "Internet of Things (IoT) System Security Vulnerabilities and Its Mitigation",
    authors: "Patel, A.B., Sharma, P.R., Randhawa, P.",
    book_title: "Security and Privacy in Cyberspace. Blockchain Technologies",
    editors: "Kaiwartya, O., Kaushik, K., Gupta, S.K., Mishra, A., Kumar, M.",
    publisher: "Springer, Singapore",
    doi: "https://doi.org/10.1007/978-981-19-1960-2_8",
  },
  {
    year: 2022,
    title: "Industrial IoT Technologies and Protocols",
    authors: "Devkar, R., Randhawa, P., Bukya, M.",
    book_title: "New Frontiers in Cloud Computing and Internet of Things",
    series: "Internet of Things",
    editors: "Buyya, R., Garg, L., Fortino, G., Misra, S.",
    publisher: "Springer, Cham",
    doi: "https://doi.org/10.1007/978-3-031-05528-7_9",
  },
];

const normalizeChapters = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.book_chapters)) return payload.book_chapters;
  if (Array.isArray(payload.chapters)) return payload.chapters;
  return [];
};

const BookChapters = () => {
  const [chapters, setChapters] = useState(fallbackChapters);

  useEffect(() => {
    fetchData("bookChapters.json").then((data) => {
      const normalized = normalizeChapters(data);
      if (normalized.length) setChapters(normalized);
    });
  }, []);

  if (!chapters.length)
    return (
      <section id="book-chapters" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Book Chapters
        </h2>
        <p className="mt-4 text-white">Loading Book Chapters...</p>
      </section>
    );

  return (
    <section id="book-chapters" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Book Chapters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chapters.map((ch, index) => {
          const title = ch.title || ch.chapter || ch.name;
          const book = ch.book || ch.bookTitle || ch.book_title || ch.collection;
          const year = ch.year || ch.published || ch.date;
          const authors = Array.isArray(ch.authors)
            ? ch.authors.join(", ")
            : ch.authors;
          const editors = ch.editors;
          const publisher = ch.publisher;
          const series = ch.series;
          const pages = ch.pages;
          const doi = ch.doi;
          return (
            <div
              key={index}
              className="p-5 bg-[#1a1f23] text-white rounded-lg shadow border-l-4 border-primary transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
            >
              {title && <h3 className="font-semibold text-white">{title}</h3>}
              {(book || year) && (
                <p className="text-sm text-white/80">
                  {[book, year].filter(Boolean).join(" | ")}
                </p>
              )}
              {authors && (
                <p className="mt-2 text-white text-sm">
                  <strong>Authors:</strong> {authors}
                </p>
              )}
              {editors && (
                <p className="text-white/80 text-sm">
                  <strong>Editors:</strong> {editors}
                </p>
              )}
              {publisher && (
                <p className="text-white/80 text-sm">
                  <strong>Publisher:</strong> {publisher}
                </p>
              )}
              {series && (
                <p className="text-white/80 text-sm">
                  <strong>Series:</strong> {series}
                </p>
              )}
              {pages && (
                <p className="text-white/80 text-sm">
                  <strong>Pages:</strong> {pages}
                </p>
              )}
              {ch.description && (
                <p className="mt-2 text-white text-sm">{ch.description}</p>
              )}
              {doi && (
                <a
                  href={doi}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm text-primary underline"
                >
                  View DOI
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BookChapters;


