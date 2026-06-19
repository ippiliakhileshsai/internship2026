import { useState } from "react";
import "../styles/Navbar.css";

const navItems = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Simulation", href: "#simulation" },
  { label: "Recommendation", href: "#recommendation" },
  { label: "Challenge", href: "#challenge" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-inner container">
        <a href="#" className="logo">
          ⚡ Smart Energy
        </a>

        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
