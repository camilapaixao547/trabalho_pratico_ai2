import { Link } from 'react-router-dom'

function AnimalCard({ animal }) {
  return (
    <div className="card card-pantureco h-100">
      <div className="position-relative">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-100"
          style={{ height: '220px', objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
        />
        <div className="position-absolute top-0 start-0 m-3 d-flex gap-2">
          <span className="badge-dark-pill">{animal.species}</span>
          <span className="badge-light-pill">{animal.gender}</span>
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="fw-bold mb-0">{animal.name}</h5>
        <p className="small mb-2" style={{ color: 'var(--color-green-dark)' }}>
          <i className="bi bi-calendar-event"></i> {animal.age}</p>
      <p className="text-muted small flex-grow-1">{animal.description}</p>
      <Link to={`/formulario-adocao/${animal.id}`} className="btn btn-gradient w-100 mt-2">
        Iniciar Adoção
      </Link>
    </div>
    </div >
  )
}

export default AnimalCard