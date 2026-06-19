import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnuncios } from '../../context/AnunciosContext'
import { Mars, Venus } from 'lucide-react'
import './Anuncios.css'

const filtros = [
  { label: 'Todos', value: 'todos' },
  { label: 'Cães', value: 'cão' },
  { label: 'Gatos', value: 'gato' },
  { label: 'Fêmea', value: 'fêmea' },
  { label: 'Macho', value: 'macho' },
]

function Anuncios() {
  const navigate = useNavigate()
  const { anunciosAtivos, eliminarAnuncio, loading } = useAnuncios()

  const [search, setSearch] = useState('')
  const [filtroAtivo, setFiltroAtivo] = useState('todos')
  const [anuncioParaEliminar, setAnuncioParaEliminar] = useState(null)
  const [mostrarSucesso, setMostrarSucesso] = useState(false)

  const filtrados = anunciosAtivos
    .filter(a => {
      const correspondeFiltro =
        filtroAtivo === 'todos' ||
        a.especie_animal === filtroAtivo ||
        a.genero_animal === filtroAtivo

      const correspondeBusca = a.nome_animal
        .toLowerCase()
        .includes(search.toLowerCase())

      return correspondeFiltro && correspondeBusca
    })
    // Mais recente primeiro: usa createdAt se existir, caso contrário cai para o id (auto-incremento)
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      return b.id - a.id
    })

  const confirmarEliminar = async () => {
    await eliminarAnuncio(anuncioParaEliminar.id)
    setAnuncioParaEliminar(null)
    setMostrarSucesso(true)
    setTimeout(() => setMostrarSucesso(false), 2500)
  }

  if (loading) return <p className="text-muted p-4">A carregar anúncios...</p>

  return (
    <div className="anun-wrapper">
      <h2 className="anun-title">Gestão de Anúncios</h2>

      {/* FILTROS */}
      <div className="d-flex gap-2 mb-3 flex-wrap">
        {filtros.map(f => (
          <button
            key={f.value}
            className={'anun-filtro-btn' + (filtroAtivo === f.value ? ' anun-filtro-ativo' : '')}
            onClick={() => setFiltroAtivo(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="anun-panel">
        <div className="d-flex justify-content-between align-items-center mb-3 gap-3">
          <div className="anun-search flex-grow-1">
            <i className="bi bi-search anun-search-icon" />
            <input
              type="text"
              className="form-control anun-search-input"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <button
            className="btn anun-btn-primary"
            onClick={() => navigate('/backoffice/anuncios/criar')}
          >
            + Adicionar Anúncio
          </button>
        </div>

        {/* TABELA */}
        <table className="table anun-table">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Espécie</th>
              <th>Género</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(a => (
              <tr key={a.id}>
                <td>
                  <img src={a.fotografia_animal} alt={a.nome_animal} className="anun-thumb" />
                </td>
                <td className="fw-semibold">{a.nome_animal}</td>
                <td>
                  {a.idade_indefinida_animal
                    ? 'Idade desconhecida'
                    : `${a.idade_valor_animal} ${a.idade_unidade_animal}`}
                </td>
                <td>{a.especie_animal}</td>
                <td>
                  {a.genero_animal === 'macho' ? (
                    <span className="anun-genero anun-genero-macho">
                      <Mars size={16} strokeWidth={2.5} />
                      Macho
                    </span>
                  ) : a.genero_animal === 'fêmea' ? (
                    <span className="anun-genero anun-genero-femea">
                      <Venus size={16} strokeWidth={2.5} />
                      Fêmea
                    </span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="text-end">
                  <button
                    className="anun-btn-editar me-2"
                    onClick={() => navigate(`/backoffice/anuncios/editar/${a.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="anun-btn-eliminar"
                    onClick={() => setAnuncioParaEliminar(a)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  Nenhum anúncio encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL CONFIRMAR */}
      {anuncioParaEliminar && (
        <div className="anun-modal-backdrop">
          <div className="anun-modal">
            <p className="anun-modal-text">
              Tem a certeza que deseja eliminar{' '}
              <strong>{anuncioParaEliminar.nome_animal}</strong>?
            </p>
            <div className="d-flex justify-content-center gap-2 mt-4">
              <button
                className="anun-btn-cancelar"
                onClick={() => setAnuncioParaEliminar(null)}
              >
                Cancelar
              </button>
              <button
                className="anun-btn-confirmar"
                onClick={confirmarEliminar}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {mostrarSucesso && (
        <div className="anun-toast">Eliminado com sucesso!</div>
      )}
    </div>
  )
}

export default Anuncios
