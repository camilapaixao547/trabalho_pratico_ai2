import { Routes, Route, useLocation } from 'react-router-dom'
import RotaProtegida from './components/RotaProtegida'
import Navbar from './components/Navbar/Navbar'
import ClientNavbar from './components/CompAreaCliente/ClientNavbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AreaCliente from './pages/AreaCliente/AreaCliente'
import Perfil from './pages/AreaCliente/PerfilCliente'
import Backoffice from './pages/Backoffice/Backoffice'
import FormularioAdocao from './pages/AreaCliente/FormularioAdocao'

// Rotas que usam a ClientNavbar
const CLIENT_ROUTES = ['/area-cliente', '/perfil', '/meus-formularios']

function App() {
  const location = useLocation()
  const isClientArea = CLIENT_ROUTES.some(route =>
    location.pathname.startsWith(route)
  )

  return (
    <>
      {isClientArea ? <ClientNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas de cliente */}
        <Route path="/area-cliente" element={<RotaProtegida perfil="cliente"><AreaCliente /></RotaProtegida>} />

        <Route path="/perfil" element={
          <RotaProtegida perfil="cliente"><Perfil /></RotaProtegida>
        } />

        <Route path="/formularios-adocao" element={
          <RotaProtegida perfil="cliente"><FormularioAdocao /></RotaProtegida>
        } />

        {/* Rotas de admin */}
        <Route path="/backoffice" element={
          <RotaProtegida perfil="admin"><Backoffice /></RotaProtegida>
        } />

      </Routes>
    </>
  )
}

export default App
