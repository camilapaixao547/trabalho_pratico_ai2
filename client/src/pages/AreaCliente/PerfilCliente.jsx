import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ClientNavbar from '../../components/CompAreaCliente/ClientNavbar'
import api from '../../api/api'

function Perfil() {
  const navigate = useNavigate()
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const initial = localStorage.getItem('nome')?.charAt(0).toUpperCase() || '?'

  const [form, setForm] = useState({
    nome_cliente: '',
    email_cliente: '',
    telefone_cliente: '',
    data_nascimento_cliente: '',
    localidade_cliente: '',
    concelho_cliente: '',
    distrito_cliente: '',
    novaPassword: '',
    confirmarPassword: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    api.get('/users/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const u = res.data
        setForm(f => ({
          ...f,
          nome_cliente: u.nome_cliente || '',
          email_cliente: u.email_cliente || '',
          telefone_cliente: u.telefone_cliente || '',
          data_nascimento_cliente: u.data_nascimento_cliente || '',
          localidade_cliente: u.localidade_cliente || '',
          concelho_cliente: u.concelho_cliente || '',
          distrito_cliente: u.distrito_cliente || '',
        }))
      })
      .catch(() => setErro('Erro ao carregar perfil.'))
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setSucesso('')

    if (form.novaPassword && form.novaPassword !== form.confirmarPassword) {
      setErro('As passwords não coincidem.')
      return
    }

    const token = localStorage.getItem('token')
    const dados = {
      nome_cliente: form.nome_cliente,
      email_cliente: form.email_cliente,
      telefone_cliente: form.telefone_cliente,
      data_nascimento_cliente: form.data_nascimento_cliente,
      localidade_cliente: form.localidade_cliente,
      concelho_cliente: form.concelho_cliente,
      distrito_cliente: form.distrito_cliente,
    }
    if (form.novaPassword) dados.password_cliente = form.novaPassword

    try {
      await api.put('/users/me', dados, { headers: { Authorization: `Bearer ${token}` } })
      localStorage.setItem('nome', form.nome_cliente)
      setSucesso('Perfil atualizado com sucesso.')
    } catch {
      setErro('Erro ao guardar alterações.')
    }
  }

  const handleEliminar = async () => {
    if (!window.confirm('Tens a certeza que queres eliminar a conta? Esta ação é irreversível.')) return
    const token = localStorage.getItem('token')
    try {
      await api.delete('/users/me', { headers: { Authorization: `Bearer ${token}` } })
      localStorage.clear()
      sessionStorage.clear()
      navigate('/')
    } catch {
      setErro('Erro ao eliminar conta.')
    }
  }

  return (
    <>

      <div className="bg-cream py-4">
        <div className="container">
          <Link to="/area-cliente" className="text-decoration-none text-muted">← Volta à Página Inicial</Link>
          <h2 className="fw-bold mt-3 mb-0">Editar Perfil</h2>
          <p className="text-muted">Atualize os seus dados pessoais</p>
        </div>
      </div>

      <div className="container py-4">
        {erro && <div className="alert alert-danger">{erro}</div>}
        {sucesso && <div className="alert alert-success">{sucesso}</div>}

        <form onSubmit={handleSubmit}>
          <div className="card card-pantureco p-4 mb-4">
            <h6 className="fw-bold mb-3">Fotografia de perfil</h6>
            <hr />
            <div className="position-relative" style={{ width: '90px' }}>
              <div className="avatar-circle" style={{ width: '90px', height: '90px', fontSize: '2rem', borderRadius: '16px' }}>
                {initial}
              </div>
            </div>
          </div>

          <div className="card card-pantureco p-4 mb-4">
            <h6 className="fw-bold mb-3">Dados Pessoais</h6>
            <hr />
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-semibold">Nome*</label>
                <input type="text" name="nome_cliente" className="form-control" value={form.nome_cliente} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email*</label>
                <input type="email" name="email_cliente" className="form-control" value={form.email_cliente} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Telefone</label>
                <input type="text" name="telefone_cliente" className="form-control" value={form.telefone_cliente} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Data de Nascimento</label>
                <input type="date" name="data_nascimento_cliente" className="form-control" value={form.data_nascimento_cliente} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Localidade</label>
                <input type="text" name="localidade_cliente" className="form-control" value={form.localidade_cliente} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Concelho</label>
                <input type="text" name="concelho_cliente" className="form-control" value={form.concelho_cliente} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Distrito</label>
                <select name="distrito_cliente" className="form-select" value={form.distrito_cliente} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="Aveiro">Aveiro</option>
                  <option value="Braga">Braga</option>
                  <option value="Coimbra">Coimbra</option>
                  <option value="Faro">Faro</option>
                  <option value="Leiria">Leiria</option>
                  <option value="Lisboa">Lisboa</option>
                  <option value="Porto">Porto</option>
                  <option value="Setúbal">Setúbal</option>
                  <option value="Viseu">Viseu</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card card-pantureco p-4 mb-4">
            <h6 className="fw-bold mb-3">Alterar Palavra-Passe</h6>
            <hr />
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nova Palavra-Passe</label>
                <input type="password" name="novaPassword" className="form-control" value={form.novaPassword} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Confirmar Nova Palavra-Passe</label>
                <input type="password" name="confirmarPassword" className="form-control" value={form.confirmarPassword} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mb-4">
            <Link to="/area-cliente" className="btn btn-outline-pantureco">Cancelar</Link>
            <button type="submit" className="btn btn-gradient">Guardar alterações</button>
          </div>
        </form>

        <div className="card card-pantureco p-4 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h6 className="fw-bold mb-1">Eliminar Conta</h6>
            <p className="text-muted small mb-0">Esta ação é irreversível. Todos os seus dados serão apagados permanentemente.</p>
          </div>
          <button type="button" className="btn btn-outline-danger-pill" onClick={handleEliminar}>Eliminar conta</button>
        </div>
      </div>
    </>
  )
}

export default Perfil