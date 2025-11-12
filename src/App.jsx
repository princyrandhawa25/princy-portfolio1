import { useEffect, useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import ResearchInterests from "./components/ResearchInterests";
import Awards from "./components/Awards";
import Patents from "./components/Patents";
import Publications from "./components/Publications";
import BookChapters from "./components/BookChapters";
import Talks from "./components/Talks";
import Certifications from "./components/Certifications";
import Workshops from "./components/Workshops";
import Service from "./components/Service";
import Committees from "./components/Committees";
import References from "./components/References";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { fetchGitHubData } from "./data/githubData";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchGitHubData().then(setData).catch(console.error);
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="min-h-screen bg-background text-secondary font-body">
      <Header />
      <main className="px-6 md:px-20 space-y-16 py-10">
        <About data={data.about} />
        <ResearchInterests data={data.researchInterests} />
        <Education />
        <Experience />
        <Publications data={data.publications} />
        <BookChapters data={data.bookChapters} />
        <Patents data={data.patents} />
        <Awards data={data.awards} />
        <Talks data={data.talks} />
        <Certifications data={data.certifications} />
        <Workshops data={data.workshops} />
        <Service data={data.service} />
        <Committees data={data.committees} />
        <References />
      </main>
      <Footer />
    </div>
  );
}

export default App;
