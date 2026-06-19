import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/hero.jpg'
import api from '../api/axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    // 🔓 LOGIN FALSO PARA DESENVOLVIMENTO (DESATIVA O LOGIN REAL)
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('perfil', 'admin') // ou 'cliente'
    navigate('/backoffice') // ou '/area-cliente'
    return
    /*
    try {
      const resposta = await api.post('/auth/login', { email_cliente: email, password_cliente: password })
      localStorage.setItem('token', resposta.data.token)
      localStorage.setItem('perfil', resposta.data.perfil)
      if (resposta.data.perfil === 'admin') {
        navigate('/backoffice')
      } else {
        navigate('/area-cliente')
      }
    } catch (err) {
      setErro('Email ou password incorretos.')
    }*/
  }

  return (
    <div className="auth-page">
      <div className="auth-image-col">
        <img src={loginImg} alt="Animais" className="auth-image" />
      </div>

      <div className="auth-form-col">
        <div className="auth-form-inner">
          <h1 className="auth-title">Login</h1>

          {erro && <p className="text-danger small mb-3">{erro}</p>}

          <div className="mb-4">
            <label className="auth-label">Email</label>
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              placeholder="Insere o teu email"
            />
          </div>

          <div className="mb-2">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Insere a tua palavra-passe"
            />
          </div>

          <div className="text-end mb-4">
            <a href="#" className="auth-link">Recuperar palavra-passe</a>
          </div>

          <button className="btn-auth w-100" onClick={handleSubmit}>
            Entrar
          </button>

          <p className="auth-switch mt-5">
            Ainda não tem conta?{' '}
            <Link to="/register" className="auth-link fw-bold">Criar conta</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login