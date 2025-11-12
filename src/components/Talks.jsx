export default function Talks({ data }) {
  return (
    <section id="talks" className="space-y-4">
      <h2 className="text-2xl font-heading border-b-4 border-primary inline-block pb-1">
        Talks & Invited Lectures
      </h2>
      <ul className="space-y-3">
        {data && data.length > 0 ? (
          data.map((talk, i) => (
            <li key={i} className="p-4 bg-white/70 rounded-lg border-l-4 border-primary shadow">
              <h3 className="font-semibold">{talk.title}</h3>
              <p className="text-sm text-gray-700">{talk.event}</p>
              <span className="text-sm text-gray-600">{talk.year}</span>
            </li>
          ))
        ) : (
          <p>No talks or lectures listed.</p>
        )}
      </ul>
    </section>
  );
}
