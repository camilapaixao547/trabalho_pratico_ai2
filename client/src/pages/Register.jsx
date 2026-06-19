import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import heroLogin from '../assets/images/hero_login2.png'
import logoBranco from '../assets/images/logo_pantureco_branco.png'
import api from '../api/axios'

function Register() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    try {
      await api.post('/auth/register', { nome_cliente: nome, email_cliente: email, password_cliente: password })
      navigate('/login')
    } catch (err) {
      setErro('Erro ao criar conta. Tenta novamente.')
    }
  }

  return (
    <div className="auth-page">
      <img src={heroLogin} alt="Background" className="auth-bg" />
      <div className="auth-overlay" />

      <div className="auth-form-col">
        <Link to="/" className="auth-logo-link">
          <img src={logoBranco} alt="Logo" className="auth-logo" />
        </Link>

        <div className="auth-form-inner">
          <h1 className="auth-title">Criar Conta</h1>

          {erro && <p className="text-danger small mb-3">{erro}</p>}

          <div className="mb-4">
            <label className="auth-label">Nome</label>
            <input
              type="text"
              className="auth-input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="off"
              placeholder="Insere o teu nome"
            />
          </div>

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

          <div className="mb-5">
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

          <button className="btn-auth w-100" onClick={handleSubmit}>
            Criar
          </button>

          <p className="auth-switch mt-5">
            Já tem conta?{' '}
            <Link to="/login" className="auth-link fw-bold">Fazer login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
