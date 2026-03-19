import { Link } from "react-router-dom";
import { Mail, Facebook } from "lucide-react";
import { useJson } from "@/hooks/useContent";

interface SiteConfig {
  name?: string;
  footer?: {
    tagline?: string;
    links?: { to: string; label: string }[];
    contact?: { email?: string; facebookUrl?: string; facebookLabel?: string };
    copyright?: string;
  };
}

const defaultConfig: SiteConfig = {
  name: "Buurtvereniging de Steenstraat",
  footer: {
    tagline: "Samen maken we onze buurt een fijne plek om te wonen.",
    links: [
      { to: "/", label: "Home" },
      { to: "/news", label: "Laatste nieuws" },
      { to: "/gallery", label: "Fotogalerij" },
      { to: "/calendar", label: "Buurtactiviteiten" },
      { to: "/word-lid", label: "Word Lid" },
      { to: "/contact", label: "Contact" },
    ],
    contact: {
      email: "buurtverenigingdesteenstraat@outlook.com",
      facebookUrl: "https://www.facebook.com/groups/396194063895407",
      facebookLabel: "Volg ons op Facebook",
    },
    copyright: "Buurtvereniging de Steenstraat. Alle rechten voorbehouden.",
  },
};

export default function Footer() {
  const { data: site } = useJson<SiteConfig>("site.json");
  const config = { ...defaultConfig, ...site };
  const footer = config.footer ?? defaultConfig.footer!;
  const links = footer.links ?? defaultConfig.footer!.links!;
  const contact = footer.contact ?? defaultConfig.footer!.contact!;

  return (
    <footer className="bg-gradient-to-r from-orange-600 to-green-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{config.name}</h3>
            <p className="text-orange-100">{footer.tagline}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Snel navigeren</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-orange-100 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-orange-100">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center">
                <Facebook className="h-4 w-4 mr-2" />
                <a
                  href={contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {contact.facebookLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-orange-500 mt-8 pt-8 text-center text-orange-200">
          <p>&copy; {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
