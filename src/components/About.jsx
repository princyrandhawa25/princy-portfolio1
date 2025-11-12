import profilePhoto from "../assets/princy_photo.jpg";

export default function About({ data }) {
  return (
    <section id="about" className="space-y-4">
      <h2 className="text-2xl font-heading border-b-4 border-primary inline-block pb-1">About</h2>
      <div className="mt-4 flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={profilePhoto}
          alt="Profile"
          className="h-40 w-40 rounded-full object-cover border-4 border-accent/50 shadow-sm"
        />
        <p className="leading-relaxed">{data.summary}</p>
      </div>
    </section>
  );
}
