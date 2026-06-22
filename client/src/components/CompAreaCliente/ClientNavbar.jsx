import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import logo from '../../assets/images/logoPantureco.png'

function ClientNavbar() {
  const navigate = useNavigate()
  const userName = localStorage.getItem('nome') || 'U'
  const initial = userName.charAt(0).toUpperCase()

  const handleSair = () => {
    localStorage.clear()
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <nav className="navbar bg-white py-3 border-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Pantureco" height="36" />
        </Link>

        <div className="d-flex align-items-center gap-3" style={{ marginLeft: 'auto' }}>
          <div className="dropdown">
            <button className="avatar-circle border-0" data-bs-toggle="dropdown">
              {initial}
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm mt-2">
              <li><Link className="dropdown-item" to="/perfil">Editar Perfil</Link></li>
              <li><Link className="dropdown-item" to="/meus-formularios">Os Meus Formulários</Link></li>
            </ul>
          </div>

          <button
            onClick={handleSair}
            style={{ marginLeft: 'auto' }}
            className="border-0 bg-transparent text-dark p-0"
            title="Sair"
          >
            <LogOut size={22} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default ClientNavbar