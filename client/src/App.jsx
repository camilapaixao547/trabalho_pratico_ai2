import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ClientNavbar from './components/ClientNavbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AreaCliente from './pages/AreaCliente'
import Perfil from './pages/Perfil'
import Backoffice from './pages/Backoffice'
import FormularioAdocao from './pages/FormularioAdocao'

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
        <Route path="/area-cliente" element={<AreaCliente />} />
        <Route path="/formularios-adocao" element={<FormularioAdocao/>}/>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>
    </>
  )
}

export default App
