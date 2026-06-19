import { Link } from 'react-router-dom'

function AnimalCard({ animal }) {
  const idade = animal.idade_indefinida_animal
    ? 'Idade desconhecida'
    : `${animal.idade_valor_animal} ${animal.idade_unidade_animal}`

  return (
    <div className="card card-pantureco h-100">
      <div className="position-relative">
        <img
          src={animal.fotografia_animal || '/placeholder.jpg'}
          alt={animal.nome_animal}
          className="w-100"
          style={{ height: '220px', objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
        />
        <div className="position-absolute top-0 start-0 m-3 d-flex gap-2">
          <span className="badge-dark-pill">{animal.especie_animal}</span>
          <span className="badge-light-pill">{animal.genero_animal}</span>
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="fw-bold mb-0">{animal.nome_animal}</h5>
        <p className="small mb-2" style={{ color: 'var(--color-green-dark)' }}>
          <i className="bi bi-calendar-event"></i> {idade}
        </p>
        <p className="text-muted small flex-grow-1">{animal.descricao_animal}</p>
        <Link to={`/formulario-adocao/${animal.id}`} className="btn btn-gradient w-100 mt-2">
          Iniciar Adoção
        </Link>
      </div>
    </div>
  )
}

export default AnimalCard