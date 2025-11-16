import Certifications from "../components/Certifications";

export default function CertificationsPage({ data = {} }) {
  return (
    <section className="py-10">
      <Certifications data={data.certifications} />
    </section>
  );
}

