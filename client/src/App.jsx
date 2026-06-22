import { Routes, Route, useLocation } from 'react-router-dom'
import RotaProtegida from './components/RotaProtegida'
import Navbar from './components/Navbar/Navbar'
import ClientNavbar from './components/CompAreaCliente/ClientNavbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AreaCliente from './pages/AreaCliente/AreaCliente'
import Perfil from './pages/AreaCliente/PerfilCliente'
import FormularioAdocao from './pages/AreaCliente/FormularioAdocao'
import MeusFormularios from './pages/AreaCliente/MeusFormularios'

import { AnunciosProvider } from "./context/AnunciosContext";
import { UtilizadoresProvider } from "./context/UtilizadoresContext";
import { FormulariosProvider } from "./context/FormulariosContext";

// Backoffice
import BackofficeLayout from './components/Backoffice/BackofficeLayout'
import Dashboard from './pages/Backoffice/Dashboard'
import Utilizadores from "./pages/Backoffice/Utilizadores";
import UtilizadorForm from "./pages/Backoffice/UtilizadorForm";
import UtilizadorVisualizar from "./pages/Backoffice/UtilizadorVisualizar";
import Anuncios from "./pages/Backoffice/Anuncios";
import AnuncioForm from "./pages/Backoffice/AnuncioForm";
import FormulariosPage from './pages/Backoffice/FormulariosPage';
import FormularioCriarPage from './pages/Backoffice/FormularioCriarPage';
import FormularioEditarPage from './pages/Backoffice/FormularioEditarPage';
import FormularioVisualizar from './pages/Backoffice/FormularioVisualizar';
import Adocoes from './pages/Backoffice/Adocoes'
import AdocaoDetalhe from './pages/Backoffice/AdocaoDetalhe'

import './styles/areadecliente.css'

const CLIENT_ROUTES = ['/area-cliente', '/perfil', '/formulario-adocao', '/meus-formularios']

function App() {
  const location = useLocation()

  const isClientArea = CLIENT_ROUTES.some(route =>
    location.pathname.startsWith(route)
  )
  const isBackoffice = location.pathname.startsWith('/backoffice')
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      {!isBackoffice && !isAuthPage && (isClientArea ? <ClientNavbar /> : <Navbar />)}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas de cliente */}
        <Route path="/area-cliente" element={
          <RotaProtegida perfil="cliente"><AreaCliente /></RotaProtegida>
        } />
        <Route path="/perfil" element={
          <RotaProtegida perfil="cliente"><Perfil /></RotaProtegida>
        } />
        <Route path="/formulario-adocao/:id" element={
          <RotaProtegida perfil="cliente"><FormularioAdocao /></RotaProtegida>
        } />
        <Route path="/meus-formularios" element={
          <RotaProtegida perfil="cliente"><MeusFormularios /></RotaProtegida>
        } />

        {/* Rotas de admin */}
        <Route path="/backoffice" element={
          <RotaProtegida perfil="admin">
            <AnunciosProvider>
              <UtilizadoresProvider>
                <FormulariosProvider>
                  <BackofficeLayout />
                </FormulariosProvider>
              </UtilizadoresProvider>
            </AnunciosProvider>
          </RotaProtegida>
        }>
          <Route index element={<Dashboard />} />

          {/* utilizadores */}
          <Route path="utilizadores" element={<Utilizadores />} />
          <Route path="utilizadores/criar" element={<UtilizadorForm />} />
          <Route path="utilizadores/editar/:id" element={<UtilizadorForm />} />
          <Route path="utilizadores/ver/:id" element={<UtilizadorVisualizar />} />

          {/* anúncios */}
          <Route path="anuncios" element={<Anuncios />} />
          <Route path="anuncios/criar" element={<AnuncioForm />} />
          <Route path="anuncios/editar/:id" element={<AnuncioForm />} />

          {/* formulários */}
          <Route path="formularios" element={<FormulariosPage />} />
          <Route path="formularios/criar" element={<FormularioCriarPage />} />
          <Route path="formularios/editar/:id" element={<FormularioEditarPage />} />
          <Route path="formularios/ver/:id" element={<FormularioVisualizar />} />

          {/* adoções */}
          <Route path="adocoes" element={<Adocoes />} />
          <Route path="adocoes/:id" element={<AdocaoDetalhe />} />
        </Route>
      </Routes>
    </>
  )
}

export default App