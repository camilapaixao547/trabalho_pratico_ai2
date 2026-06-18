import { Link } from 'react-router-dom'
import logo from '../assets/images/logoPantureco.png'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white py-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Pantureco" height="40" />
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
            <Link to="/login" className="btn btn-pantureco ms-2">Começar</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar