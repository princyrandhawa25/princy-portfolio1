export default function Patents({ data }) {
  return (
    <section id="patents" className="space-y-4">
      <h2 className="text-2xl font-heading border-b-4 border-primary inline-block pb-1">Patents</h2>
      <ul className="space-y-3">
        {data.map((pat, i) => (
          <li key={i} className="p-4 bg-white/70 rounded-lg shadow border-l-4 border-primary">
            <h3 className="font-semibold">{pat.title}</h3>
            <p>Application No: {pat.applicationNumber}</p>
            <span className="text-sm text-gray-600">{pat.year}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
