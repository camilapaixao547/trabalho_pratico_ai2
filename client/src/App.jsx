import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AreaCliente from './pages/AreaCliente'
import Perfil from './pages/Perfil'
import Backoffice from './pages/Backoffice'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/area-cliente" element={<AreaCliente />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>
    </>
  )
}

export default App
