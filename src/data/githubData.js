// src/data/githubData.js
export const GITHUB_BASE_URL =
  "https://raw.githubusercontent.com/princyrandhawa25/princy-portfolio1/refs/heads/main/portfolio-data/";

export const defaultData = {
  about: {
    name: "",
    title: "",
    summary:
      "Associate Professor in AI/ML, focusing on Machine Learning, Wearable Tech & Control Systems.",
    googleScholar: "",
    photo: "",
  },
  researchInterests: ["Machine Learning", "Wearable Technology", "Control Systems"],
  publications: [],
  patents: [],
  awards: [],
  bookChapters: [],
  talks: [],
  certifications: [],
  workshops: [],
  service: [],
  committees: [],
  achievements: [],
};

// Normalize different about.json shapes into a consistent structure
const normalizeAbout = (raw) => {
  try {
    if (!raw) return null;
    // If file accidentally wrapped as { about: { ... } }
    if (raw && typeof raw === "object" && raw.about && typeof raw.about === "object") {
      raw = raw.about;
    }
    if (typeof raw === "string") {
      return { summary: raw };
    }

    // Some common alternate keys
    const name = raw.name || raw.fullName || "";
    const summary = raw.summary || raw.bio || raw.about || "";
    const photo = raw.photo || raw.image || raw.avatar || "";
    const googleScholar = raw.googleScholar || raw.scholar || "";

    // Prefer explicit title; otherwise compose from headline/tagline/roles
    const roles = Array.isArray(raw.roles) ? raw.roles.filter(Boolean) : [];
    const composed = [raw.headline, raw.tagline, roles.length ? roles.join(" | ") : ""]
      .filter(Boolean)
      .join(" | ");
    const title = raw.title || composed || "";

    return { name, title, summary, photo, googleScholar };
  } catch (e) {
    console.error("normalizeAbout failed", e);
    return raw;
  }
};

export const fetchData = async (fileName) => {
  try {
    if (!fileName) throw new Error("No file name provided");
    const url = `${GITHUB_BASE_URL}${fileName}?t=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch ${fileName}`);
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${fileName} from GitHub:`, error);
    return null;
  }
};

export const fetchText = async (fileName) => {
  try {
    if (!fileName) throw new Error("No file name provided");
    const url = `${GITHUB_BASE_URL}${fileName}?t=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch ${fileName}`);
    return await res.text();
  } catch (error) {
    console.error(`Error fetching ${fileName} as text from GitHub:`, error);
    return null;
  }
};

export const fetchPortfolioData = async () => {
  // Fetch individual files as needed; start with about.json
  const aboutRaw = await fetchData("about.json");
  const about = normalizeAbout(aboutRaw);

  // Merge into defaults so UI always has a complete shape
  return {
    ...defaultData,
    ...(about ? { about } : {}),
  };
};
