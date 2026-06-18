import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ClientNavbar from '../../components/CompAreaCliente/ClientNavbar'
import FilterPills from '../../components/FilterPills'
import mockFormularios from '../../data/mockFormularios'

function MeusFormularios() {
  const [formularios, setFormularios] = useState([])
  const [filter, setFilter] = useState('Todos')

  useEffect(() => {
    setFormularios(mockFormularios)
  }, [])

  const filtered = formularios.filter((f) => {
    if (filter === 'Todos') return true
    if (filter === 'Cães') return f.species === 'Cão'
    if (filter === 'Gatos') return f.species === 'Gato'
    if (filter === 'Femêa') return f.gender === 'Femêa'
    if (filter === 'Macho') return f.gender === 'Macho'
    return true
  })

  return (
    <>
      <ClientNavbar />

      <div className="bg-cream py-4">
        <div className="container">
          <Link to="/area-cliente" className="text-decoration-none text-muted">← Volta à Página Inicial</Link>
          <h2 className="fw-bold mt-3 mb-0">Os Meus Formulários</h2>
          <p className="text-muted">Visualize o seu histórico</p>
        </div>
      </div>

      <div className="container py-4">
        <FilterPills
          options={['Todos', 'Cães', 'Gatos', 'Femêa', 'Macho']}
          active={filter}
          onChange={setFilter}
        />

        <div className="d-flex flex-column gap-3">
          {filtered.map((f) => (
            <div key={f.id} className="card card-pantureco p-3 d-flex flex-row align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <img src={f.image} alt={f.animalName} className="rounded-circle" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                <span className="fw-bold">{f.animalName}</span>
              </div>
              <span className="text-muted small">{f.date}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MeusFormularios