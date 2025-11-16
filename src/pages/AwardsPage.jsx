import AwardsAchievements from "../components/Awards";

export default function AwardsPage({ data = {} }) {
  return (
    <section className="py-10">
      <AwardsAchievements
        awardsData={data.awards}
        achievementsData={data.achievements}
      />
    </section>
  );
}
