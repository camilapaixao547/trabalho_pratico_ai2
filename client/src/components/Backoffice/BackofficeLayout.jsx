import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  HouseDoorFill,
  PeopleFill,
  Files,
  FileText,
  Heart,
} from "react-bootstrap-icons";
import { LogOut } from "lucide-react";
import "./BackofficeLayout.css";

const menuItems = [
  { to: "/backoffice", label: "Dashboard", icon: <HouseDoorFill size={18} />, end: true },
  { to: "/backoffice/utilizadores", label: "Utilizadores", icon: <PeopleFill size={18} /> },
  { to: "/backoffice/anuncios", label: "Anúncios", icon: <Files size={18} /> },
  { to: "/backoffice/formularios", label: "Formulários", icon: <FileText size={18} /> },
  { to: "/backoffice/adocoes", label: "Adoções", icon: <Heart size={18} /> },
];

function BackofficeLayout() {
  const navigate = useNavigate();

  const handleSair = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="d-flex bo-wrapper">
      <aside className="bo-sidebar">
        <div className="bo-logo">
          <span className="bo-logo-text">Pantureco</span>
        </div>

        <nav className="bo-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                "bo-nav-link" + (isActive ? " bo-nav-link-active" : "")
              }
            >
              <span className="bo-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="bo-main flex-grow-1">
        <header className="bo-header d-flex justify-content-between align-items-center px-4">
          <div />
          <div className="d-flex align-items-center gap-3">
            <div className="bo-search">
              <i className="bi bi-search bo-search-icon" />
              <input
                type="text"
                className="form-control bo-search-input"
                placeholder="Search"
              />
            </div>
            <div className="bo-avatar">A</div>
            <button
              onClick={handleSair}
              title="Sair"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: 0 }}
            >
              <LogOut size={22} />
            </button>
          </div>
        </header>

        <main className="bo-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default BackofficeLayout;