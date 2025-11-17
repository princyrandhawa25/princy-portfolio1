// src/data/githubData.js
export const GITHUB_BASE_URL =
  "https://raw.githubusercontent.com/princyrandhawa25/princy-portfolio1/refs/heads/main/portfolio-data/";

export const defaultData = {
  about: {
    name: "",
    title: "",
    summary:
      "Dr. Princy Randhawa is a passionate Machine learning/AI researcher and educator with over 12 years of experience in teaching and industry. She is an Associate Professor at Dayanand Sagar University and previously worked for a decade in the Mechatronics Engineering Department at Manipal University Jaipur. Her research and teaching span control systems, machine learning, IoT, and data analytics, and she completed her PhD in machine learning for wearable technology. Dr. Randhawa has authored more than 50 publications, including 14 SCI journal papers with seven in Q1. She has led numerous academic and administrative initiatives, serving as Assistant Director of Alumni Relations, program co-coordinator, nodal officer for MoUs, alumni coordinator, ISA faculty advisor, industry connect coordinator, international coordinator, and social media coordinator. A Senior Member of IEEE and member of ISA, she actively supports social causes such as cancer awareness and women's sanitation hygiene programs. She is passionate about applying artificial intelligence for women's safety and empowerment.",
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
