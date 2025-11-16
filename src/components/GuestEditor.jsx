import { useEffect, useState } from "react";
import { fetchData } from "../data/githubData";

const fallbackGuestRoles = [
  {
    title:
      "AI in Healthcare: Smarter Imaging and Personalized Treatment (Special Session-5)",
    event:
      "International Conference on AI, Computing, Communication, and Network Security (AICCoNS 2025)",
    institution: "University of Wollongong, Dubai",
    dates: "28-30 April 2026",
  },
  {
    title:
      "AI-Enabled Wearables: IoT Applications in Healthcare and Beyond (Special Session-4)",
    event:
      "International Conference on AI, Computing, Communication, and Network Security (AICCoNS 2025)",
    institution: "University of Wollongong, Dubai",
    dates: "28-30 April 2026",
  },
];

const normalizeGuestRoles = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.guest_editor_roles))
    return payload.guest_editor_roles;
  if (Array.isArray(payload.roles)) return payload.roles;
  return [];
};

export default function GuestEditor() {
  const [roles, setRoles] = useState(fallbackGuestRoles);

  useEffect(() => {
    fetchData("guestEditor.json").then((data) => {
      const normalized = normalizeGuestRoles(data);
      if (normalized.length) {
        setRoles(normalized);
      }
    });
  }, []);

  if (!roles.length) {
    return (
      <section id="guest-editor" className="py-8">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Guest Editor Roles
        </h2>
        <p className="mt-4 text-white">Loading guest editor data...</p>
      </section>
    );
  }

  return (
    <section id="guest-editor" className="space-y-4">
      <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
        Guest Editor Roles
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#101418] shadow-2xl">
        <table className="min-w-full text-left text-white text-sm md:text-base">
          <thead className="bg-[#1f2630] text-white/80 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Role / Title</th>
              <th className="px-4 py-3">Event / Publication</th>
              <th className="px-4 py-3">Organization</th>
              <th className="px-4 py-3">Dates / Status</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => {
              const title = role.title || role.name;
              const event = role.event || role.journal || role.publication;
              const org =
                role.institution ||
                role.organization ||
                role.publisher ||
                role.collaboration;
              const dates =
                role.dates ||
                role.duration ||
                role.status ||
                role.note ||
                (Array.isArray(role.years) ? role.years.join(", ") : "");
              const position = role.role;
              return (
                <tr
                  key={index}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-4 font-semibold text-primary">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold">{title}</div>
                    {position && (
                      <div className="text-white/70 text-sm">{position}</div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-white/80">{event}</td>
                  <td className="px-4 py-4 text-white/80">{org}</td>
                  <td className="px-4 py-4 text-white/80">{dates}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
