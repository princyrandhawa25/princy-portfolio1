export default function References() {
  const references = [
    {
      name: "Dr. Vikas Kumar",
      title: "Dean, School of AI & Data Science",
      organization: "Manipal University Jaipur",
      email: "vikas.kumar@jaipur.manipal.edu",
    },
    {
      name: "Dr. Sanjay Singh",
      title: "Professor, Dept. of AI/ML",
      organization: "Dayananda Sagar University, Bengaluru",
      email: "sanjay.singh@dsu.edu.in",
    },
  ];

  return (
    <section id="references" className="space-y-4">
      <h2 className="text-2xl font-heading border-b-4 border-primary inline-block pb-1">
        References
      </h2>
      <ul className="space-y-3">
        {references.map((ref, i) => (
          <li key={i} className="p-4 bg-white/70 rounded-lg shadow border-l-4 border-primary">
            <h3 className="font-semibold">{ref.name}</h3>
            <p>{ref.title}</p>
            <p className="text-sm text-gray-700">{ref.organization}</p>
            <a
              href={`mailto:${ref.email}`}
              className="text-primary underline text-sm"
            >
              {ref.email}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
