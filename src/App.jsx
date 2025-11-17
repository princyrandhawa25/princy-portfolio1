import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ConferencesPage from "./pages/ConferencesPage";
import JournalsPage from "./pages/JournalsPage";
import AwardsPage from "./pages/AwardsPage";
import AcademicsPage from "./pages/AcademicsPage";
import CertificationsPage from "./pages/CertificationsPage";
import FundingPage from "./pages/FundingPage";
import BookChaptersPage from "./pages/BookChaptersPage";
import WorkshopsPage from "./pages/WorkshopsPage";
import GuestEditorPage from "./pages/GuestEditorPage";
import OthersPage from "./pages/OthersPage";
import InvitedTalksPage from "./pages/InvitedTalksPage";
import PeerReviewPage from "./pages/PeerReviewPage";
import PatentsPage from "./pages/PatentsPage";
import GalleryPage from "./pages/GalleryPage";
import CountriesPage from "./pages/CountriesPage";
import CommitteesPage from "./pages/CommitteesPage";
import Footer from "./components/Footer";
import { fetchPortfolioData, defaultData } from "./data/githubData";


function App() {
  const [data, setData] = useState(defaultData);
  const getRoute = () => (window.location.hash.slice(1) || "/");
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    let mounted = true;
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    fetchPortfolioData()
      .then((d) => {
        if (mounted && d) setData(d);
      })
      .catch((e) => console.error(e));
    return () => {
      mounted = false;
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-secondary font-body">
      <Header currentRoute={route} />
      <main className="px-6 md:px-20 py-0">
        {route === "/about" ? (
          <AboutPage data={data} />
        ) : route === "/conferences" || route === "/publications" ? (
          <ConferencesPage data={data} />
        ) : route === "/journals" ? (
          <JournalsPage data={data} />
        ) : route === "/awards" || route === "/achievements" ? (
          <AwardsPage data={data} />
        ) : route === "/academics" ? (
          <AcademicsPage />
        ) : route === "/funding" ? (
          <FundingPage />
        ) : route === "/books" ? (
          <BookChaptersPage />
        ) : route === "/workshops" ? (
          <WorkshopsPage />
        ) : route === "/guest-editor" ? (
          <GuestEditorPage />
        ) : route === "/others" ? (
          <OthersPage />
        ) : route === "/invited-talks" ? (
          <InvitedTalksPage />
        ) : route === "/peer-review" ? (
          <PeerReviewPage />
        ) : route === "/patents" ? (
          <PatentsPage />
        ) : route === "/certifications" ? (
          <CertificationsPage data={data} />
        ) : route === "/committees" ? (
          <CommitteesPage />
        ) : route === "/gallery" ? (
          <GalleryPage />
        ) : route === "/countries" ? (
          <CountriesPage />
        ) : (
          <Home data={data} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
