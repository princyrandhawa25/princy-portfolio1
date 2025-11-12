export default function BookChapters({ data }) {
  return (
    <section id="book-chapters" className="space-y-4">
      <h2 className="text-2xl font-heading border-b-4 border-primary inline-block pb-1">
        Book Chapters
      </h2>
      <ul className="space-y-3">
        {data && data.length > 0 ? (
          data.map((chapter, i) => (
            <li key={i} className="p-4 bg-white/70 rounded-lg border-l-4 border-primary shadow">
              <h3 className="font-semibold">{chapter.title}</h3>
              <p className="text-sm text-gray-700">
                {chapter.publisher} ({chapter.year})
              </p>
              {chapter.link && (
                <a
                  href={chapter.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline text-sm"
                >
                  View Chapter
                </a>
              )}
            </li>
          ))
        ) : (
          <p>No book chapters available.</p>
        )}
      </ul>
    </section>
  );
}
