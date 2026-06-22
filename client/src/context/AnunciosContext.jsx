import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/api'

const AnunciosContext = createContext()

export function AnunciosProvider({ children }) {
  const [anuncios, setAnuncios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/animais')
      .then(res => setAnuncios(res.data))
      .catch(err => console.log('Erro ao buscar animais:', err))
      .finally(() => setLoading(false))
  }, [])

  const atualizarAnuncio = async (id, dadosAtualizados) => {
    try {
      const res = await api.put(`/animais/${id}`, dadosAtualizados)
      setAnuncios(prev => prev.map(a => a.id === id ? res.data : a))
      return res.data
    } catch (err) {
      console.log('Erro ao atualizar animal:', err)
      throw err
    }
  }

  const criarAnuncio = async (novoAnuncio) => {
    try {
      const res = await api.post('/animais', novoAnuncio)
      setAnuncios(prev => [...prev, res.data])
      return res.data
    } catch (err) {
      console.log('Erro ao criar animal:', err)
      throw err
    }
  }

  const eliminarAnuncio = async (id) => {
    try {
      await api.delete(`/animais/${id}`)
      setAnuncios(prev => prev.filter(a => a.id !== id))
    } catch (err) {
      console.log('Erro ao eliminar animal:', err)
      throw err
    }
  }

  const anunciosAtivos = anuncios.filter(a => a.disponivel_animal === true)
  const adocoesConcluidas = anuncios.filter(a => a.disponivel_animal === false)

  return (
    <AnunciosContext.Provider value={{
      anuncios,
      anunciosAtivos,
      adocoesConcluidas,
      atualizarAnuncio,
      criarAnuncio,
      eliminarAnuncio,
      loading
    }}>
      {children}
    </AnunciosContext.Provider>
  )
}

export function useAnuncios() {
  return useContext(AnunciosContext)
}
