import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/solvianmc.png";

const navLinks = [
  { name: "Inicio", path: "/" },
  { name: "Actualizaciones", path: "/actualizaciones" },
  { name: "Tienda", path: "https://tienda.solvianmc.net", external: true },
  { name: "Valoraciones", path: "/valoraciones" },
  { name: "Discord", path: "/discord" },
  { name: "Votar", path: "/votar" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="SolvianMC" className="h-10 w-10 object-contain" />
          <span className="font-heading font-bold text-lg text-gradient-gold">SolvianMC</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-semibold text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`font-body font-semibold text-sm transition-colors ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* IP Copy */}
        <button
          onClick={() => navigator.clipboard.writeText("play.solvianmc.net")}
          className="hidden md:block px-4 py-2 bg-primary text-primary-foreground font-heading font-bold text-sm rounded-lg hover:opacity-90 transition-opacity animate-pulse-gold"
        >
          play.solvianmc.net
        </button>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-body font-semibold text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`block font-body font-semibold ${
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}
          <button
            onClick={() => {
              navigator.clipboard.writeText("play.solvianmc.net");
              setOpen(false);
            }}
            className="w-full px-4 py-2 bg-primary text-primary-foreground font-heading font-bold text-sm rounded-lg"
          >
            play.solvianmc.net
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
