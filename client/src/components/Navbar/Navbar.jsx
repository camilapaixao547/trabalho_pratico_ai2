import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logoPantureco.png'
import './Navbar.css'

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogoClick(e) {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 sticky-top shadow-sm">
      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
          onClick={handleLogoClick}
        >
          <img src={logo} alt="Pantureco" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto align-items-center gap-3">
            <a className="nav-link" href="#quem-somos">Quem Somos</a>
            <a className="nav-link" href="#como-adotar">Como Adotar</a>
            <a className="nav-link" href="#testemunhos">Testemunhos</a>
            <Link to="/login" className="btn btn-pantureco ms-2">Entrar</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar