export default function ResearchInterests({ data = [] }) {
  return (
    <section id="research" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Research Interests
      </h2>
      {Array.isArray(data) && data.length > 0 ? (
        <ul className="list-disc ml-6 space-y-1">
          {data.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-white/80">No research interests listed.</p>
      )}
    </section>
  );
}
