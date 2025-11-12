export default function ResearchInterests({ data }) {
  return (
    <section id="research" className="space-y-4">
      <h2 className="text-2xl font-heading border-b-4 border-primary inline-block pb-1">
        Research Interests
      </h2>
      <ul className="list-disc ml-6 space-y-1">
        {data.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </section>
  );
}
