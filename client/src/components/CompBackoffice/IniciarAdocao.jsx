import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnuncios } from '../../context/AnunciosContext'
import { useUtilizadores } from '../../context/UtilizadoresContext'

function IniciarAdocao() {
    const navigate = useNavigate()
    const { utilizadores } = useUtilizadores()
    const { anunciosAtivos } = useAnuncios()

    const [searchUtilizador, setSearchUtilizador] = useState('')
    const [searchPatudo, setSearchPatudo] = useState('')
    const [utilizadorSelecionado, setUtilizadorSelecionado] = useState(null)
    const [animalSelecionado, setAnimalSelecionado] = useState(null)

    const sugestoesUtilizadores =
        searchUtilizador.length > 0 && !utilizadorSelecionado
            ? utilizadores.filter((u) =>
                u.nome_cliente?.toLowerCase().includes(searchUtilizador.toLowerCase())
            )
            : []

    const sugestoesAnimais =
        searchPatudo.length > 0 && !animalSelecionado
            ? anunciosAtivos.filter((a) =>
                a.nome_animal?.toLowerCase().includes(searchPatudo.toLowerCase())
            )
            : []

    const handleIniciar = () => {
        if (!utilizadorSelecionado || !animalSelecionado) return
        navigate('/backoffice/formularios/criar', {
            state: {
                utilizador: utilizadorSelecionado,
                animal: animalSelecionado,
            },
        })
    }

    return (
        <div className="dash-panel">
            <h5 className="dash-panel-title">Iniciar Processo de Adoção</h5>

            <div className="row g-3 mb-3">
                {/* PESQUISA UTILIZADOR */}
                <div className="col-md-6">
                    {utilizadorSelecionado ? (
                        <div className="dash-selecionado">
                            <div className="d-flex align-items-center gap-2">
                                <div className="dash-avatar-circle">
                                    {utilizadorSelecionado.nome_cliente?.charAt(0).toUpperCase()}
                                </div>
                                <span className="fw-semibold">{utilizadorSelecionado.nome_cliente}</span>
                            </div>
                            <button
                                className="dash-btn-remover"
                                onClick={() => {
                                    setUtilizadorSelecionado(null)
                                    setSearchUtilizador('')
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <div className="dash-search position-relative">
                            <i className="bi bi-search dash-search-icon" />
                            <input
                                type="text"
                                className="form-control dash-search-input"
                                placeholder="Pesquisar utilizador"
                                value={searchUtilizador}
                                onChange={(e) => setSearchUtilizador(e.target.value)}
                            />
                            {sugestoesUtilizadores.length > 0 && (
                                <div className="dash-dropdown">
                                    {sugestoesUtilizadores.map((u) => (
                                        <div
                                            key={u.id}
                                            className="dash-dropdown-item"
                                            onClick={() => {
                                                setUtilizadorSelecionado(u)
                                                setSearchUtilizador('')
                                            }}
                                        >
                                            <span>{u.nome_cliente}</span>
                                            <small style={{ color: "#999", marginLeft: "0.5rem" }}>
                                                {u.email_cliente}
                                            </small>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* PESQUISA ANIMAL */}
                <div className="col-md-6">
                    {animalSelecionado ? (
                        <div className="dash-selecionado">
                            <div className="d-flex align-items-center gap-2">
                                {animalSelecionado.fotografia_animal && (
                                    <img
                                        src={animalSelecionado.fotografia_animal}
                                        alt={animalSelecionado.nome_animal}
                                        className="dash-avatar-img"
                                    />
                                )}
                                <span className="fw-semibold">{animalSelecionado.nome_animal}</span>
                            </div>
                            <button
                                className="dash-btn-remover"
                                onClick={() => {
                                    setAnimalSelecionado(null)
                                    setSearchPatudo('')
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <div className="dash-search position-relative">
                            <i className="bi bi-search dash-search-icon" />
                            <input
                                type="text"
                                className="form-control dash-search-input"
                                placeholder="Pesquisar patudo"
                                value={searchPatudo}
                                onChange={(e) => setSearchPatudo(e.target.value)}
                            />
                            {sugestoesAnimais.length > 0 && (
                                <div className="dash-dropdown">
                                    {sugestoesAnimais.map((a) => (
                                        <div
                                            key={a.id}
                                            className="dash-dropdown-item"
                                            onClick={() => {
                                                setAnimalSelecionado(a)
                                                setSearchPatudo('')
                                            }}
                                        >
                                            {animalSelecionado?.fotografia_animal && (
                                                <img
                                                    src={a.fotografia_animal}
                                                    alt={a.nome_animal}
                                                    style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover", marginRight: "0.5rem" }}
                                                />
                                            )}
                                            <span>{a.nome_animal}</span>
                                            <small style={{ color: "#999", marginLeft: "0.5rem" }}>
                                                {a.especie_animal}
                                            </small>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button
                    className="dash-btn-iniciar"
                    disabled={!utilizadorSelecionado || !animalSelecionado}
                    onClick={handleIniciar}
                >
                    Iniciar
                </button>
            </div>
        </div>
    )
}

export default IniciarAdocao