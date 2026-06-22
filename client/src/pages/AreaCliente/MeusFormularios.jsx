import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ClientNavbar from '../../components/CompAreaCliente/ClientNavbar'
import api from '../../api/api'

function MeusFormularios() {
  const [formularios, setFormularios] = useState([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    api.get('/formularios/meus', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setFormularios(res.data))
      .catch(() => setErro('Erro ao carregar formulários.'))
  }, [])

  return (
    <>

      <div className="bg-cream py-4">
        <div className="container">
          <Link to="/area-cliente" className="text-decoration-none text-muted">← Volta à Página Inicial</Link>
          <h2 className="fw-bold mt-3 mb-0">Os Meus Formulários</h2>
          <p className="text-muted">Visualize o seu histórico</p>
        </div>
      </div>

      <div className="container py-4">
        {erro && <div className="alert alert-danger">{erro}</div>}

        {formularios.length === 0 && !erro && (
          <p className="text-muted text-center mt-4">Ainda não submeteste nenhum formulário.</p>
        )}

        <div className="d-flex flex-column gap-3">
          {formularios.map((f) => (
            <div key={f.id_formulario} className="card card-pantureco p-3 d-flex flex-row align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={f.Animal?.fotografia_animal || '/placeholder.jpg'}
                  alt={f.Animal?.nome_animal}
                  className="rounded-circle"
                  style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                />
                <div>
                  <span className="fw-bold d-block">{f.Animal?.nome_animal}</span>
                  <span className="text-muted small">{f.Animal?.especie_animal}</span>
                </div>
              </div>
              <div className="text-end">
                <span className="text-muted small d-block">{new Date(f.data_formulario).toLocaleDateString('pt-PT')}</span>
                <span className={`badge ${f.formulario_lido ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {f.formulario_lido ? 'Lido' : 'Pendente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MeusFormularios