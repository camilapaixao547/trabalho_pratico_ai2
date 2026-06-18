import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ClientNavbar from '../components/ClientNavbar'
import mockAnimals from '../data/mockAnimals'

function FormularioAdocao() {
  const { id } = useParams()
  const animal = mockAnimals.find((a) => a.id === Number(id)) || mockAnimals[0]

  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', nascimento: '', nif: '',
    localidade: '', concelho: '', distrito: '',
    temJardim: '', temOutrosAnimais: '', temExperiencia: '', motivo: ''
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Pedido de adoção:', { animal: animal.name, ...form })
    // Mais tarde: axios.post('/api/adocoes', { animalId: animal.id, ...form })
  }

  return (
    <>
      <ClientNavbar />

      <div className="bg-cream py-4">
        <div className="container">
          <Link to="/area-cliente" className="text-decoration-none text-muted">← Volta à Página Inicial</Link>
          <h2 className="fw-bold mt-3 mb-0">Formulário de Adoção</h2>
          <p className="text-muted">Preencha o formulário abaixo para iniciar o processo de adopção. Todos os campos marcados com * são obrigatórios.</p>
        </div>
      </div>

      <div className="container py-4">
        <div className="d-flex align-items-center gap-3 p-3 mb-4 rounded-3" style={{ background: 'var(--color-card-green)' }}>
          <img src={animal.image} alt={animal.name} className="rounded-circle" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
          <div>
            <p className="mb-0 small">A iniciar o processo de adoção de</p>
            <h5 className="fw-bold mb-0">{animal.name}</h5>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
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
            <h6 className="fw-bold mb-3">Sobre o Lar</h6>
            <hr />

            {[
              { label: 'Tem jardim ou quintal?', name: 'temJardim' },
              { label: 'Tem outros animais em casa?', name: 'temOutrosAnimais' },
              { label: 'Tem experiência prévia com animais?', name: 'temExperiencia' }
            ].map((q) => (
              <div className="mb-3" key={q.name}>
                <p className="fw-semibold mb-2">{q.label}</p>
                <div className="d-flex gap-4">
                  <label className="d-flex align-items-center gap-2">
                    <input type="radio" name={q.name} value="Sim" checked={form[q.name] === 'Sim'} onChange={handleChange} /> Sim
                  </label>
                  <label className="d-flex align-items-center gap-2">
                    <input type="radio" name={q.name} value="Não" checked={form[q.name] === 'Não'} onChange={handleChange} /> Não
                  </label>
                </div>
              </div>
            ))}

            <div>
              <label className="form-label fw-semibold">Por que razão deseja adotar?</label>
              <textarea name="motivo" className="form-control" rows="4" value={form.motivo} onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mb-5">
            <Link to="/area-cliente" className="btn btn-outline-pantureco">Cancelar</Link>
            <button type="submit" className="btn btn-gradient">Submeter Pedido</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormularioAdocao                                         