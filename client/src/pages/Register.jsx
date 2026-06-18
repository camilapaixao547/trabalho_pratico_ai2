import { useState } from 'react'
import { Link } from 'react-router-dom'
import loginImg from '../assets/images/hero.jpg'

function Register() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ nome, email, password })
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
          <h1 className="auth-title">Criar Conta</h1>

          <div className="mb-4">
            <label className="auth-label">Nome</label>
            <input
              type="text"
              className="auth-input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="auth-label">Email</label>
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
