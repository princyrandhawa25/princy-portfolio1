export default function Workshops({ data }) {
  return (
    <section id="workshops" className="space-y-4">
      <h2 className="text-2xl font-heading border-b-4 border-primary inline-block pb-1">
        Workshops & Conferences Organized
      </h2>
      <ul className="space-y-3">
        {data && data.length > 0 ? (
          data.map((work, i) => (
            <li key={i} className="p-4 bg-white/70 rounded-lg border-l-4 border-primary shadow">
              <h3 className="font-semibold">{work.title}</h3>
              <p className="text-sm text-gray-700">{work.role}</p>
              <span className="text-sm text-gray-600">{work.year}</span>
            </li>
          ))
        ) : (
          <p>No workshops listed yet.</p>
        )}
      </ul>
    </section>
  );
}
