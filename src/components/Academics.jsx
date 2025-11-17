import { useEffect, useState } from "react";
import { fetchText } from "../data/githubData";

const normalizeEntries = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.academic_and_research_committees))
    return payload.academic_and_research_committees;
  if (Array.isArray(payload.committees)) return payload.committees;
  return [];
};

const normalizeCourses = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload.courses_taught)) return payload.courses_taught;
  if (Array.isArray(payload.courses)) return payload.courses;
  if (Array.isArray(payload["courses taught"])) return payload["courses taught"];
  if (Array.isArray(payload)) return payload;
  return [];
};

const sanitizeAcademicsText = (raw) => {
  let text = raw;
  text = text.replace(
    /"no_of_students_per_batch":\s*([0-9.]+),\s*"([^"]+)"\s*,/g,
    (_match, number, rest) =>
      `"no_of_students_per_batch":"${number}, ${rest}",`
  );
  text = text.replace(/,\s*([\]}])/g, "$1");
  return text;
};

const Academics = () => {
  const [committees, setCommittees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hadError, setHadError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const raw = await fetchText("academics.json");
        if (!raw) throw new Error("No academics data");
        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch (error) {
          parsed = JSON.parse(sanitizeAcademicsText(raw));
        }
        setCommittees(normalizeEntries(parsed));
        setCourses(normalizeCourses(parsed));
      } catch (error) {
        console.error("Failed to load academics.json", error);
        setHadError(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <section id="academics" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Academic &amp; Research Committees
        </h2>
        <p className="mt-4 text-white">Loading academics...</p>
      </section>
    );
  }

  const hasCommittees = committees.length > 0;
  const hasCourses = courses.length > 0;
  const renderCommaSeparated = (value) => {
    if (!value || typeof value !== "string") {
      return value || "—";
    }
    const parts = value
      .split(/\s*,\s*/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (!parts.length) return "—";
    return parts.map((part, idx) => <div key={`${part}-${idx}`}>{part}</div>);
  };

  if (!hasCommittees && !hasCourses) {
    return (
      <section id="academics" className="py-8 space-y-4">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Academic Highlights
        </h2>
        <p className="text-white">
          {hadError
            ? "Unable to load academics data at the moment."
            : "No academic records available right now."}
        </p>
      </section>
    );
  }

  return (
    <section id="academics" className="space-y-10">
      {hasCommittees && (
        <div className="space-y-4">
          <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
            Academic &amp; Research Committees
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#101418] shadow-2xl">
            <table className="min-w-full text-left text-white text-sm md:text-base">
              <thead className="bg-[#1f2630] text-white/80 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Location</th>
                </tr>
              </thead>
              <tbody>
                {committees.map((entry, index) => (
                  <tr
                    key={`${entry.event}-${index}`}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-4 font-semibold text-primary">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold">{entry.role || "—"}</div>
                    </td>
                    <td className="px-4 py-4 text-white/80">
                      {entry.event || "—"}
                    </td>
                    <td className="px-4 py-4 text-white/80">
                      {entry.date || entry.year || "—"}
                    </td>
                    <td className="px-4 py-4 text-white/80">
                      {entry.location || entry.institution || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {hasCourses && (
        <div className="space-y-4">
          <h3 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
            Courses Taught
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#101418] shadow-2xl">
            <table className="min-w-full text-left text-white text-sm md:text-base">
              <thead className="bg-[#1f2630] text-white/80 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Academic Year</th>
                  <th className="px-4 py-3">Courses / Subjects</th>
                  <th className="px-4 py-3">Students / Batch</th>
                  <th className="px-4 py-3">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={`course-${index}`}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-4 font-semibold text-primary">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-white/80">
                      {renderCommaSeparated(
                        course.academic_year || course.year || ""
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold">
                        {course.name_of_the_subject ||
                          course.subject ||
                          course.course ||
                          "—"}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-white/80">
                      {course.no_of_students_per_batch ||
                        course.students ||
                        course.batch ||
                        "—"}
                    </td>
                    <td className="px-4 py-4 text-white/80">
                      {renderCommaSeparated(
                        course.student_feedback || course.feedback || ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default Academics;
