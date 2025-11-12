export default function Committees({ data }) {
  return (
    <section id="committees" className="space-y-4">
      <h2 className="text-2xl font-heading border-b-4 border-primary inline-block pb-1">
        Committees & Professional Memberships
      </h2>
      <ul className="space-y-3">
        {data && data.length > 0 ? (
          data.map((cmt, i) => (
            <li key={i} className="p-4 bg-white/70 rounded-lg border-l-4 border-primary shadow">
              <h3 className="font-semibold">{cmt.role}</h3>
              <p className="text-sm text-gray-700">{cmt.organization}</p>
              <span className="text-sm text-gray-600">{cmt.year}</span>
            </li>
          ))
        ) : (
          <p>No committee roles listed yet.</p>
        )}
      </ul>
    </section>
  );
}
