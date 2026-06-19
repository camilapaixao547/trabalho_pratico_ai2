import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ClientNavbar from '../../components/CompAreaCliente/ClientNavbar'
import api from '../../api/axios'

function FormularioAdocao() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [animal, setAnimal] = useState(null)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)

  const [form, setForm] = useState({
    formulario_quintal: '',
    formulario_outros_animais: '',
    formulario_experiencia: '',
    formulario_descricao: ''
  })

  useEffect(() => {
    api.get(`/animais/${id}`)
      .then(res => setAnimal(res.data))
      .catch(() => setErro('Erro ao carregar animal.'))
  }, [id])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')

    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }

    try {
      await api.post('/formularios', {
        id_animal: Number(id),
        formulario_quintal: form.formulario_quintal === 'Sim',
        formulario_outros_animais: form.formulario_outros_animais === 'Sim',
        formulario_experiencia: form.formulario_experiencia === 'Sim',
        formulario_descricao: form.formulario_descricao
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSucesso(true)
    } catch (err) {
      setErro('Erro ao submeter formulário. Tenta novamente.')
    }
  }

  if (!animal) return <p className="text-center mt-5">A carregar...</p>

  return (
    <>
      <ClientNavbar />

      <div className="bg-cream py-4">
        <div className="container">
          <Link to="/area-cliente" className="text-decoration-none text-muted">← Volta à Página Inicial</Link>
          <h2 className="fw-bold mt-3 mb-0">Formulário de Adoção</h2>
          <p className="text-muted">Preencha o formulário abaixo para iniciar o processo de adopção.</p>
        </div>
      </div>

      <div className="container py-4">

        {sucesso && (
          <div className="alert alert-success">
            Pedido submetido com sucesso! Entraremos em contacto brevemente.
          </div>
        )}

        {erro && <div className="alert alert-danger">{erro}</div>}

        <div className="d-flex align-items-center gap-3 p-3 mb-4 rounded-3" style={{ background: 'var(--color-card-green)' }}>
          <img
            src={animal.fotografia_animal || '/placeholder.jpg'}
            alt={animal.nome_animal}
            className="rounded-circle"
            style={{ width: '48px', height: '48px', objectFit: 'cover' }}
          />
          <div>
            <p className="mb-0 small">A iniciar o processo de adoção de</p>
            <h5 className="fw-bold mb-0">{animal.nome_animal}</h5>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card card-pantureco p-4 mb-4">
            <h6 className="fw-bold mb-3">Sobre o Lar</h6>
            <hr />

            {[
              { label: 'Tem jardim ou quintal?', name: 'formulario_quintal' },
              { label: 'Tem outros animais em casa?', name: 'formulario_outros_animais' },
              { label: 'Tem experiência prévia com animais?', name: 'formulario_experiencia' }
            ].map((q) => (
              <div className="mb-3" key={q.name}>
                <p className="fw-semibold mb-2">{q.label}</p>
                <div className="d-flex gap-4">
                  <label className="d-flex align-items-center gap-2">
                    <input type="radio" name={q.name} value="Sim" checked={form[q.name] === 'Sim'} onChange={handleChange} required /> Sim
                  </label>
                  <label className="d-flex align-items-center gap-2">
                    <input type="radio" name={q.name} value="Não" checked={form[q.name] === 'Não'} onChange={handleChange} /> Não
                  </label>
                </div>
              </div>
            ))}

            <div>
              <label className="form-label fw-semibold">Por que razão deseja adotar?</label>
              <textarea
                name="formulario_descricao"
                className="form-control"
                rows="4"
                value={form.formulario_descricao}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mb-5">
            <Link to="/area-cliente" className="btn btn-outline-pantureco">Cancelar</Link>
            <button type="submit" className="btn btn-gradient" disabled={sucesso}>
              Submeter Pedido
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormularioAdocao