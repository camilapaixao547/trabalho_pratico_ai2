import { useState } from 'react'
import { Link } from 'react-router-dom'
import ClientNavbar from '../../components/CompAreaCliente/ClientNavbar'

function Perfil() {
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', nascimento: '', nif: '',
    localidade: '', concelho: '', distrito: '',
    novaPassword: '', confirmarPassword: ''
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Dados a guardar:', form)
    // Mais tarde: axios.put('/api/users/me', form)
  }

  return (
    <>
      <ClientNavbar />

      <div className="bg-cream py-4">
        <div className="container">
          <Link to="/area-cliente" className="text-decoration-none text-muted">← Volta à Página Inicial</Link>
          <h2 className="fw-bold mt-3 mb-0">Editar Perfil</h2>
          <p className="text-muted">Atualize os seus dados pessoais</p>
        </div>
      </div>

      <div className="container py-4">
        <form onSubmit={handleSubmit}>
          <div className="card card-pantureco p-4 mb-4">
            <h6 className="fw-bold mb-3">Fotografia de perfil</h6>
            <hr />
            <div className="position-relative" style={{ width: '90px' }}>
              <div className="avatar-circle" style={{ width: '90px', height: '90px', fontSize: '2rem', borderRadius: '16px' }}>
                S
              </div>
              <button type="button" className="btn btn-gradient position-absolute bottom-0 end-0 p-0 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                ✎
              </button>
            </div>
          </div>

          <div className="card card-pantureco p-4 mb-4">
            <h6 className="fw-bold mb-3">Dados Pessoais</h6>
            <hr />
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-semibold">Nome*</label>
                <input type="text" name="nome" className="form-control" value={form.nome} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email*</label>
                <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Telefone</label>
                <input type="text" name="telefone" className="form-control" value={form.telefone} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Data de Nascimento</label>
                <input type="date" name="nascimento" className="form-control" value={form.nascimento} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">NIF</label>
                <input type="text" name="nif" className="form-control" value={form.nif} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Localidade</label>
                <input type="text" name="localidade" className="form-control" value={form.localidade} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Concelho</label>
                <input type="text" name="concelho" className="form-control" value={form.concelho} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Distrito</label>
                <select name="distrito" className="form-select" value={form.distrito} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="Viseu">Viseu</option>
                  <option value="Coimbra">Coimbra</option>
                  <option value="Lisboa">Lisboa</option>
                  <option value="Porto">Porto</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card card-pantureco p-4 mb-4">
            <h6 className="fw-bold mb-3">Alterar Palavra-Passe</h6>
            <hr />
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nova Palavra-Passe*</label>
                <input type="password" name="novaPassword" className="form-control" value={form.novaPassword} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Confirmar Nova Palavra-Passe*</label>
                <input type="password" name="confirmarPassword" className="form-control" value={form.confirmarPassword} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mb-4">
            <Link to="/area-cliente" className="btn btn-outline-pantureco">Cancelar</Link>
            <button type="submit" className="btn btn-gradient">Guardar alterações</button>
          </div>

          <div className="card card-pantureco p-4 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h6 className="fw-bold mb-1">Eliminar Conta</h6>
              <p className="text-muted small mb-0">Esta ação é irreversível. Todos os seus dados serão apagados permanentemente.</p>
            </div>
            <button type="button" className="btn btn-outline-danger-pill">Eliminar conta</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Perfil