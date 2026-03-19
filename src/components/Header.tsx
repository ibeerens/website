import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useJson } from "@/hooks/useContent";

const defaultMenuItems = [
  { to: "/", label: "Home" },
  { to: "/news", label: "Laatste nieuws" },
  { to: "/gallery", label: "Fotogalerij" },
  { to: "/calendar", label: "Buurtactiviteiten" },
  { to: "/word-lid", label: "Word Lid" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { data: site } = useJson<{ nav?: typeof defaultMenuItems }>("site.json");
  const menuItems = site?.nav ?? defaultMenuItems;

  return (
    <nav className="bg-white shadow-sm border-b relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img src="/logo.jpg" alt="Logo" className="h-24 w-24 mr-3 rounded-full border border-gray-200" />
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    (location.pathname === item.to
                      ? "text-orange-700 "
                      : "text-orange-600 ") +
                    "hover:text-orange-900 px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Hamburger Button for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-orange-700 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-label="Open main menu"
            >
              {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-b z-30 animate-fade-in">
          <div className="flex flex-col space-y-1 py-4 px-6">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  (location.pathname === item.to
                    ? "text-orange-700 "
                    : "text-orange-600 ") +
                  "hover:text-orange-900 px-3 py-2 rounded-md text-base font-medium"
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
