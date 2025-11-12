export default function Service({ data }) {
  return (
    <section id="service" className="space-y-4">
      <h2 className="text-2xl font-heading border-b-4 border-primary inline-block pb-1">
        Community & Voluntary Service
      </h2>
      <ul className="space-y-3">
        {data && data.length > 0 ? (
          data.map((srv, i) => (
            <li key={i} className="p-4 bg-white/70 rounded-lg border-l-4 border-primary shadow">
              <h3 className="font-semibold">{srv.title}</h3>
              <p className="text-sm text-gray-700">{srv.description}</p>
              <span className="text-sm text-gray-600">{srv.year}</span>
            </li>
          ))
        ) : (
          <p>No service records yet.</p>
        )}
      </ul>
    </section>
  );
}
