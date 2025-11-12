export default function Certifications({ data }) {
  return (
    <section id="certifications" className="space-y-4">
      <h2 className="text-2xl font-heading border-b-4 border-primary inline-block pb-1">
        Certifications & Courses
      </h2>
      <ul className="space-y-3">
        {data && data.length > 0 ? (
          data.map((cert, i) => (
            <li key={i} className="p-4 bg-white/70 rounded-lg border-l-4 border-primary shadow">
              <h3 className="font-semibold">{cert.title}</h3>
              <p className="text-sm text-gray-700">{cert.platform}</p>
              <span className="text-sm text-gray-600">{cert.year}</span>
            </li>
          ))
        ) : (
          <p>No certifications listed yet.</p>
        )}
      </ul>
    </section>
  );
}
