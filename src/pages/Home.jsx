import profilePhoto from "../assets/princy_photo.jpg";
import TravelMap from "../components/TravelMap";

const loadCarouselImages = () => {
  try {
    const context = require.context(
      "../assets/carousal_images",
      true,
      /\.(png|jpe?g|svg)$/
    );
    const keys = context.keys();
    const malaysiaKeys = keys.filter((key) => key.startsWith("./malaysia/"));
    const otherKeys = keys.filter((key) => !key.startsWith("./malaysia/"));
    return [...malaysiaKeys, ...otherKeys].map((key) => context(key));
  } catch (error) {
    console.error("Failed to load carousel images", error);
    return [];
  }
};

export default function Home({ data = {} }) {
  const about = data.about || {};
  const name = about.name || "Princy Randhawa";
  const title =
    about.title ||
    "Researcher | Associate Professor | AI & ML Enthusiast";
  const summary =
    about.summary ||
    "I build data-driven solutions that bridge academic rigor with real-world impact across machine learning, wearable technology, and control systems.";
  const truncate = (text, limit = 160) =>
    text.length > limit ? `${text.slice(0, limit).trim()}...` : text;
  const blurb = truncate(summary, 140);
  const socials = data.socials || {};
  const socialLinks = [
    {
      label: "Facebook",
      href:
        socials.facebook || "https://www.facebook.com/randhawa.prinncy/",
      color: "#1877F2",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 text-white"
          fill="currentColor"
        >
          <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.495v-9.294H9.691V11.17h3.128V8.414c0-3.1 1.893-4.787 4.659-4.787 1.325 0 2.462.099 2.793.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.584l-.466 3.536h-3.118V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href:
        socials.instagram ||
        "https://www.instagram.com/randhawa_prinncy/?utm_source=qr&igsh=M2RnNjB2MXo1NXlk",
      color: "#E4405F",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 text-white"
          fill="currentColor"
        >
          <path d="M12 2.2c3.2 0 3.58.012 4.845.07 1.17.054 1.805.248 2.228.413.56.217.96.477 1.38.896.42.42.679.82.896 1.38.165.423.359 1.058.413 2.228.058 1.265.07 1.645.07 4.845s-.012 3.58-.07 4.845c-.054 1.17-.248 1.805-.413 2.228-.217.56-.477.96-.896 1.38-.42.42-.82.679-1.38.896-.423.165-1.058.359-2.228.413-1.265.058-1.645.07-4.845.07s-3.58-.012-4.845-.07c-1.17-.054-1.805-.248-2.228-.413-.56-.217-.96-.477-1.38-.896-.42-.42-.679-.82-.896-1.38-.165-.423-.359-1.058-.413-2.228C2.212 15.58 2.2 15.2 2.2 12s.012-3.58.07-4.845c.054-1.17.248-1.805.413-2.228.217-.56.477-.96.896-1.38.42-.42.82-.679 1.38-.896.423-.165 1.058-.359 2.228-.413C8.42 2.212 8.8 2.2 12 2.2m0-2.2C8.735 0 8.332.014 7.052.072 5.773.13 4.682.363 3.74.74c-.97.38-1.79.888-2.61 1.708-.82.82-1.327 1.64-1.708 2.61-.377.942-.61 2.033-.668 3.312C-.014 8.332 0 8.735 0 12c0 3.265-.014 3.668.072 4.948.058 1.279.291 2.37.668 3.312.38.97.888 1.79 1.708 2.61.82.82 1.64 1.327 2.61 1.708.942.377 2.033.61 3.312.668C8.332 24.014 8.735 24 12 24s3.668.014 4.948-.072c1.279-.058 2.37-.291 3.312-.668.97-.38 1.79-.888 2.61-1.708.82-.82 1.327-1.64 1.708-2.61.377-.942.61-2.033.668-3.312.058-1.28.072-1.683.072-4.948s.014-3.668-.072-4.948c-.058-1.279-.291-2.37-.668-3.312-.38-.97-.888-1.79-1.708-2.61-.82-.82-1.64-1.327-2.61-1.708-.942-.377-2.033-.61-3.312-.668C15.668-.014 15.265 0 12 0z" />
          <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z" />
          <circle cx="18.406" cy="5.594" r="1.44" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href:
        socials.linkedin || "https://www.linkedin.com/in/dr-princy-randhawa/",
      color: "#0A66C2",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 text-white"
          fill="white"
        >
          <path d="M20.447 20.452H17.2v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.137 1.445-2.137 2.939v5.667H9.2V9h3.271v1.561h.047c.455-.863 1.567-1.767 3.225-1.767 3.447 0 4.075 2.271 4.075 5.221v6.437zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.873 20.452H3.8V9h3.073v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
        </svg>
      ),
    },
  ];
  const carouselImages = loadCarouselImages();
  const heroImages = carouselImages.length
    ? carouselImages
    : [about.photo || profilePhoto];
  const marqueeImages = [...heroImages, ...heroImages];
  const carouselDuration = `${Math.max(heroImages.length, 4) * 5}s`;

  return (
    <div className="bg-white text-white">
      <section className="bg-black px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="mx-auto w-full max-w-2xl text-white px-4 py-8 sm:px-6 sm:py-9 flex flex-col items-center text-center gap-5">
          <img
            src={about.photo || profilePhoto}
            alt={name}
            className="h-48 w-48 rounded-full object-cover border-4 border-accent/70 shadow-xl"
          />

          <div className="space-y-5 w-full">
            <h1 className="text-3xl sm:text-4xl font-heading leading-tight text-[#026559]">
              {name}
            </h1>
            <p className="text-base sm:text-lg text-slate-200">{title}</p>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {blurb}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              {socialLinks.map(({ href, label, icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg shadow-black/30 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                  style={{ backgroundColor: color }}
                >
                  {icon}
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="relative isolate flex items-start justify-center overflow-hidden bg-black px-0 py-4 sm:px-6">
        <div className="absolute inset-0 -z-10 bg-black" aria-hidden="true" />

        <div className="relative w-full pb-0">
          <div className="w-full overflow-hidden px-0 py-0">
            <div
              className="flex min-w-max items-center gap-12 animate-carousel"
              style={{ animationDuration: carouselDuration }}
            >
              {marqueeImages.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="flex-none overflow-hidden rounded-[2.5rem] flex items-center justify-center w-[85vw] h-[22rem] sm:w-[20rem] sm:h-[28rem] lg:w-[24rem] lg:h-[32rem] xl:w-[26rem] xl:h-[34rem]"
                >
                  <img
                    src={src}
                    alt={`Research carousel ${idx + 1}`}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="text-center text-white">
            <p className="text-2xl sm:text-3xl font-bold tracking-[0.4em] uppercase text-white">
              GLOBAL FOOTPRINTS
            </p>
          </div>
          <div className="mt-6">
            <TravelMap />
          </div>
          <div className="grid gap-8 md:grid-cols-3 text-white">
            <div className="space-y-3">
              <h3 className="text-xl font-heading border-b border-white/20 pb-2">
                Europe (4)
              </h3>
              <ul className="space-y-2 text-white/80">
                <li>Italy (Rome, Milan)</li>
                <li>Malta</li>
                <li>London (UK)</li>
                <li>Switzerland</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-heading border-b border-white/20 pb-2">
                Asia (4)
              </h3>
              <ul className="space-y-2 text-white/80">
                <li>Singapore</li>
                <li>Malaysia</li>
                <li>Dubai (UAE)</li>
                <li>South Korea</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-heading border-b border-white/20 pb-2">
                Australia / Oceania (1)
              </h3>
              <p className="text-white/80">
                Australia (Brisbane, Sydney, Melbourne)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
