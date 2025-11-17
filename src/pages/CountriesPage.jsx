import TravelMap from "../components/TravelMap";

const CountriesPage = () => {
  return (
    <section id="countries" className="py-10 space-y-8 text-white">
      <div className="space-y-3 text-center">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          My Travel Map
        </h2>
        <p className="max-w-3xl text-white/80">
      
        </p>
      </div>

      <TravelMap />
    </section>
  );
};

export default CountriesPage;
