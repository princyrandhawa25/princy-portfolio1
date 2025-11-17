import { useState } from "react";
import logo from "../assets/Black & Blue Minimalist Modern Initial Font Logo.png";

const navLinks = [
  { label: "Home", href: "#/" },
  { label: "About", href: "#/about" },
  { label: "Conferences", href: "#/conferences" },
  { label: "Journals", href: "#/journals" },
  { label: "Awards & Achievements", href: "#/awards" },
];

const menuLinks = [
  { label: "Committees", href: "#/committees" },
  { label: "Academics", href: "#/academics" },
  { label: "Patents", href: "#/patents" },
  { label: "Funding", href: "#/funding" },
  { label: "Books & Book Chapters", href: "#/books" },
  { label: "Certifications", href: "#/certifications" },
  { label: "Peer Review", href: "#/peer-review" },
  { label: "Workshops & Conferences Organized", href: "#/workshops" },
  { label: "Guest Editor", href: "#/guest-editor" },
  { label: "Invited Talks", href: "#/invited-talks" },
  { label: "Others", href: "#/others" },
  { label: "My Travel Map", href: "#/countries" },
  { label: "Gallery", href: "#/gallery" },
];

const Header = ({ currentRoute = "/" }) => {
  const [open, setOpen] = useState(false);
  const navColor = "#026559";
  const allMenuLinks = [...navLinks, ...menuLinks];

  const NavLink = ({ href, children, align = "center" }) => {
    const targetRoute = href.replace("#", "");
    const isActive = currentRoute === targetRoute;
    const alignmentClasses =
      align === "start"
        ? "justify-start text-left"
        : "justify-center text-center";
    return (
      <a
        href={href}
        onClick={() => setOpen(false)}
        className={`flex items-center ${alignmentClasses} px-4 py-2 rounded-full text-sm uppercase tracking-wide font-semibold transition-colors duration-200 hover:bg-[#026559]/10 focus-visible:bg-[#026559]/10 ${
          isActive ? "text-[#B46A3C]" : ""
        }`}
        style={{ color: isActive ? undefined : navColor }}
      >
        {children}
      </a>
    );
  };

  return (
    <header className="w-full py-3 border-b border-secondary/30 bg-white shadow-sm">
      <div className="w-full px-3 md:px-6 flex items-center justify-between text-[#026559] relative">
        <a href="#/" className="flex items-center gap-4">
          <img
            src={logo}
            alt="Site logo"
            className="h-16 md:h-20 w-auto select-none drop-shadow brightness-110 contrast-110"
            draggable={false}
          />
          <span className="text-2xl md:text-3xl font-heading font-bold text-[#026559] whitespace-nowrap">
            Princy Randhawa
          </span>
        </a>

        {/* Desktop nav aligned to right edge with only key links */}
        <nav className="hidden md:flex items-center gap-2 text-lg font-semibold ml-auto pr-4 text-[#026559]">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Menu toggle (visible on all sizes) */}
        <button
          aria-label="Open menu"
          aria-expanded={open ? "true" : "false"}
          className="inline-flex items-center gap-2 p-3 rounded hover:bg-[#026559]/10 cursor-pointer ml-4 border border-[#026559]/30 text-[#026559]"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="font-semibold text-lg lg:text-xl transition-colors duration-200">
          </span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-6 bg-[#026559] transition ${open ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-[#026559] transition ${open ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-[#026559] transition ${open ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </div>
        </button>

        {/* Dropdown menu */}
        {open && (
          <div className="absolute right-2 top-16 z-50 w-72 bg-white text-[#026559] rounded shadow-2xl border border-[#026559]/20 p-4">
            <div className="pb-3 mb-3 border-b border-[#026559]/20 font-semibold text-lg">
              Menu
            </div>
            <ul className="space-y-3">
              {allMenuLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} align="start">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
