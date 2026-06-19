import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterPills from '../../components/FilterPills'
import AnimalCard from '../../components/AnimalCard'

function AreaCliente() {
  const nome = localStorage.getItem('nome') || 'Utilizador'
  const [animals, setAnimals] = useState([])
  const [filter, setFilter] = useState('Todos')

  useEffect(() => {
    axios.get('http://localhost:5000/api/animais')
      .then(res => setAnimals(res.data))
      .catch(err => console.error('Erro ao carregar animais:', err))
  }, [])

  const filteredAnimals = animals.filter((animal) => {
    if (filter === 'Todos') return true
    if (filter === 'Cães') return animal.especie_animal === 'cão'
    if (filter === 'Gatos') return animal.especie_animal === 'gato'
    if (filter === 'Fêmea') return animal.genero_animal === 'fêmea'
    if (filter === 'Macho') return animal.genero_animal === 'macho'
    return true
  })

  return (
    <>
      <div className="bg-cream py-5">
        <div className="container">
          <h1 className="fw-bold mb-0">Bem-vindo,</h1>
          <h1 className="fw-bold text-gradient">{nome}</h1>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">Animais disponíveis para adopção</h2>

        <FilterPills
          options={['Todos', 'Cães', 'Gatos', 'Fêmea', 'Macho']}
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