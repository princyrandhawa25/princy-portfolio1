import TravelMap from "../components/TravelMap";

const CountriesPage = () => {
  return (
    <section id="countries" className="py-10 space-y-8 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          My Travel Map
        </h2>
      </div>

      <TravelMap />

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
    </section>
  );
};

export default CountriesPage;
