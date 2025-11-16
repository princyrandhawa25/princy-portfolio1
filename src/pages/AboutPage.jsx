import About from "../components/About";
import Education from "../components/Education";
import Experience from "../components/Experience";

export default function AboutPage({ data = {} }) {
  return (
    <section className="space-y-16 py-10">
      <About data={data.about} />
      <Education />
      <Experience />
    </section>
  );
}

