import { Navigate } from 'react-router-dom'

function RotaProtegida({ children, perfil }) {
    const token = localStorage.getItem('token')
    const perfilGuardado = localStorage.getItem('perfil')

    if (!token) return <Navigate to="/login" />
    if (perfil && perfilGuardado !== perfil) return <Navigate to="/login" />

    return children
}

export default RotaProtegida