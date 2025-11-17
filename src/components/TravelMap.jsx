import worldMap from "../assets/world-map-colored.png";

const mapMarkers = [
  { label: "Italy – Rome & Milan", top: "42%", left: "49%", flag: "🇮🇹" },
  { label: "Malta", top: "49%", left: "53%", flag: "🇲🇹" },
  { label: "Singapore", top: "63%", left: "71%", flag: "🇸🇬" },
  { label: "Malaysia", top: "58%", left: "68%", flag: "🇲🇾" },
  { label: "London, United Kingdom", top: "40%", left: "46%", flag: "🇬🇧" },
  {
    label: "Australia – Brisbane, Sydney, Melbourne",
    top: "78%",
    left: "82%",
    flag: "🇦🇺",
  },
  { label: "Dubai, United Arab Emirates", top: "53%", left: "58%", flag: "🇦🇪" },
  { label: "Switzerland", top: "41%", left: "52%", flag: "🇨🇭" },
  { label: "South Korea", top: "46%", left: "79%", flag: "🇰🇷" },
];

const TravelMap = () => (
  <div className="bg-gradient-to-br from-[#050b0f] via-[#0f1c24] to-[#050b0f] border border-primary/20 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
    <div className="relative aspect-[7/3] w-full">
      <div
        className="absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#B46A3C]/40 blur-3xl opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute -right-8 top-1/3 h-64 w-64 rounded-full bg-cyan-400/40 blur-3xl opacity-70"
        aria-hidden="true"
      />
      <img
        src={worldMap}
        alt="World map with highlighted destinations"
        className="w-full h-full object-cover brightness-110 contrast-110 saturate-125"
        loading="lazy"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.35),_transparent_45%)]"
        aria-hidden="true"
      />
      {mapMarkers.map((marker) => (
        <div
          key={marker.label}
          className="group absolute flex flex-col items-center gap-1 text-center"
          style={{
            top: marker.top,
            left: marker.left,
            transform: "translate(-50%, -50%)",
          }}
          aria-label={marker.label}
        >
          <span className="relative flex items-center justify-center">
            <span className="absolute h-10 w-10 rounded-full bg-[#B46A3C]/40 blur-md opacity-0 group-hover:opacity-100 transition duration-200" />
            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#B46A3C]/40 opacity-50" />
            <span className="px-2 py-1 text-xs font-semibold uppercase bg-[#B46A3C] text-white rounded-full shadow-lg">
              {marker.flag}
            </span>
          </span>
          <div className="pointer-events-none absolute left-1/2 top-full mt-3 w-48 -translate-x-1/2 rounded-xl bg-black/80 p-3 text-center text-xs text-white opacity-0 shadow-lg backdrop-blur transition-all duration-200 group-hover:translate-y-1 group-hover:opacity-100">
            {marker.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TravelMap;
