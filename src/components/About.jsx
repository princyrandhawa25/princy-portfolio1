import profilePhoto from "../assets/princy_photo.jpg";

export default function About({ data = {} }) {
  const photo = data.photo || profilePhoto;
  const name = data.name || "";
  const title = data.title || "";
  const summary = data.summary || data.bio || "";

  return (
    <section id="about" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">About</h2>
      <div className="mt-4">
        <div className="bg-[#1a1f23] rounded-3xl px-6 py-8 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-6 text-white">
          <img
            src={photo}
            alt={name || "Profile"}
            className="h-40 w-40 rounded-full object-cover border-4 border-accent/50 shadow-lg"
          />
          <div className="text-center md:text-left space-y-3 w-full">
            {name && <h3 className="text-2xl font-heading text-white">{name}</h3>}
            {title && <p className="text-base text-white/85">{title}</p>}
            {summary && (
              <p className="leading-relaxed text-white/80">{summary}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
