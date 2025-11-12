export default function Awards({ data }) {
  return (
    <section id="awards" className="space-y-4">
      <h2 className="text-2xl font-heading border-b-4 border-primary inline-block pb-1">Awards</h2>
      <ul className="space-y-3">
        {data.map((award, i) => (
          <li key={i} className="p-4 bg-white/70 rounded-lg shadow border-l-4 border-primary">
            <h3 className="font-semibold">{award.title}</h3>
            <p>{award.description}</p>
            <span className="text-sm text-gray-600">{award.year}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
