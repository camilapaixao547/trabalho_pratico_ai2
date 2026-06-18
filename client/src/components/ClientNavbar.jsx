import { Link } from 'react-router-dom'
import logo from '../assets/images/logoPantureco.png'

function ClientNavbar({ userName = 'Sónia Santos' }) {
  const initial = userName.charAt(0).toUpperCase()

  return (
    <nav className="navbar bg-white py-3 border-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Pantureco" height="36" />
        </Link>

        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            <button className="avatar-circle border-0" data-bs-toggle="dropdown">
              {initial}
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm mt-2">
              <li><Link className="dropdown-item" to="/perfil">Editar Perfil</Link></li>
              <li><Link className="dropdown-item" to="/meus-formularios">Os Meus Formulários</Link></li>
            </ul>
          </div>

          <Link to="/" className="text-dark" title="Sair">
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 12.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h4A1.5 1.5 0 0 1 12 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
              <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default ClientNavbar