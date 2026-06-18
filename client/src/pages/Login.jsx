import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/hero.jpg'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <div className="auth-page">
      {/* Left: image */}
      <div className="auth-image-col">
        <img src={loginImg} alt="Animais" className="auth-image" />
      </div>

      {/* Right: form */}
      <div className="auth-form-col">
        <div className="auth-form-inner">
          <h1 className="auth-title">Login</h1>

          <div className="mb-4">
            <label className="auth-label">Email</label>
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
