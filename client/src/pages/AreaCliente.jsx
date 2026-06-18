import { useState, useEffect } from 'react'
import FilterPills from '../components/FilterPills'
import AnimalCard from '../components/AnimalCard'
import mockAnimals from '../data/mockAnimals'

function AreaCliente() {
  const [animals, setAnimals] = useState([])
  const [filter, setFilter] = useState('Todos')

  useEffect(() => {
    // Mais tarde: axios.get('/api/animals').then(res => setAnimals(res.data))
    setAnimals(mockAnimals)
  }, [])

  const filteredAnimals = animals.filter((animal) => {
    if (filter === 'Todos') return true
    if (filter === 'Cães') return animal.species === 'Cão'
    if (filter === 'Gatos') return animal.species === 'Gato'
    if (filter === 'Femêa') return animal.gender === 'Femêa'
    if (filter === 'Macho') return animal.gender === 'Macho'
    return true
  })

  return (
    <>

      <div className="bg-cream py-5">
        <div className="container">
          <h1 className="fw-bold mb-0">Bem-vindo,</h1>
          <h1 className="fw-bold text-gradient">Sónia Santos</h1>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">Animais disponíveis para adopção</h2>

        <FilterPills
          options={['Todos', 'Cães', 'Gatos', 'Femêa', 'Macho']}
          active={filter}
          onChange={setFilter}
        />

        <div className="row g-4">
          {filteredAnimals.map((animal) => (
            <div className="col-12 col-md-6 col-lg-4" key={animal.id}>
              <AnimalCard animal={animal} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AreaCliente