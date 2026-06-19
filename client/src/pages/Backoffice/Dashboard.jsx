import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnuncios } from "../../context/AnunciosContext";
import { useUtilizadores } from "../../context/UtilizadoresContext";
import { useFormularios } from "../../context/FormulariosContext";
import "./Dashboard.css";

function Dashboard() {
  const { anunciosAtivos, adocoesConcluidas } = useAnuncios();
  const { ultimosUtilizadores } = useUtilizadores();
  const { novosFormularios } = useFormularios();

  const stats = {
    adocoesConcluidas: adocoesConcluidas.length,
    anunciosAtivos: anunciosAtivos.length,
    formulariosPendentes: novosFormularios.length,
  };

  return (
    <div className="dash-wrapper">
      {/* CARDS DE ESTATÍSTICAS */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="dash-card">
            <div className="dash-card-icon dash-icon-green">🐾</div>
            <div>
              <p className="dash-card-label">Adoções Concluídas</p>
              <p className="dash-card-value">{stats.adocoesConcluidas}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dash-card">
            <div className="dash-card-icon dash-icon-mint">📋</div>
            <div>
              <p className="dash-card-label">Anúncios Ativos</p>
              <p className="dash-card-value">{stats.anunciosAtivos}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dash-card">
            <div className="dash-card-icon dash-icon-yellow">📄</div>
            <div>
              <p className="dash-card-label">Formulários Pendentes</p>
              <p className="dash-card-value">{stats.formulariosPendentes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÕES DE AÇÃO — agora ligados às rotas certas */}
      <BotoesAcao />

      {/* TABELA: NOVOS FORMULÁRIOS */}
      <PainelNovosFormularios formularios={novosFormularios} />

      {/* TABELA: NOVOS UTILIZADORES */}
      <PainelNovosUtilizadores utilizadores={ultimosUtilizadores} />

      {/* INICIAR PROCESSO DE ADOÇÃO */}
      <IniciarAdocao />
    </div>
  );
}

function BotoesAcao() {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-end gap-2 mb-4">
      <button
        className="btn dash-btn-primary"
        onClick={() => navigate("/backoffice/anuncios/criar")}
      >
        + Adicionar Anúncio
      </button>
      <button
        className="btn dash-btn-primary"
        onClick={() => navigate("/backoffice/utilizadores/criar")}
      >
        + Adicionar Utilizador
      </button>
    </div>
  );
}

function PainelNovosFormularios({ formularios }) {
  const navigate = useNavigate();
  const { marcarComoVisto } = useFormularios();

  const handleVerMais = (id) => {
    marcarComoVisto(id);
    navigate(`/backoffice/formularios/ver/${id}`);
  };

  return (
    <div className="dash-panel mb-4">
      <h5 className="dash-panel-title">Novos Formulários</h5>
      {formularios.length === 0 ? (
        <p className="text-muted mb-0">Não há formulários por ver.</p>
      ) : (
        <table className="table dash-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Motivação</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {formularios.map((f) => (
              <tr key={f.id}>
                <td>{f.nome}</td>
                <td>{f.data}</td>
                <td>{f.motivacao}</td>
                <td className="text-end">
                  <button
                    className="dash-btn-ver-mais"
                    onClick={() => handleVerMais(f.id)}
                  >
                    Ver mais
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function PainelNovosUtilizadores({ utilizadores }) {
  const navigate = useNavigate();

  return (
    <div className="dash-panel mb-4">
      <h5 className="dash-panel-title">Novos Utilizadores</h5>
      <table className="table dash-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {utilizadores.map((u) => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{new Date(u.createdAt).toLocaleDateString("pt-PT")}</td>
              <td>{u.email}</td>
              <td className="text-end">
                <button
                  className="dash-btn-ver-mais"
                  onClick={() => navigate(`/backoffice/utilizadores/ver/${u.id}`)}
                >
                  Ver mais
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IniciarAdocao() {
  const navigate = useNavigate();
  const { utilizadores } = useUtilizadores();
  const { anunciosAtivos } = useAnuncios();

  const [searchUtilizador, setSearchUtilizador] = useState("");
  const [searchPatudo, setSearchPatudo] = useState("");
  const [utilizadorSelecionado, setUtilizadorSelecionado] = useState(null);
  const [animalSelecionado, setAnimalSelecionado] = useState(null);

  const sugestoesUtilizadores =
    searchUtilizador.length > 0 && !utilizadorSelecionado
      ? utilizadores.filter((u) =>
          u.nome.toLowerCase().includes(searchUtilizador.toLowerCase())
        )
      : [];

  const sugestoesAnimais =
    searchPatudo.length > 0 && !animalSelecionado
      ? anunciosAtivos.filter((a) =>
          a.nome.toLowerCase().includes(searchPatudo.toLowerCase())
        )
      : [];

  const handleIniciar = () => {
    if (!utilizadorSelecionado || !animalSelecionado) return;

    // Passa os dados pré-selecionados via router state
    navigate("/backoffice/formularios/criar", {
      state: {
        utilizador: utilizadorSelecionado,
        animal: animalSelecionado,
      },
    });
  };

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
                  {utilizadorSelecionado.nome.charAt(0).toUpperCase()}
                </div>
                <span className="fw-semibold">{utilizadorSelecionado.nome}</span>
              </div>
              <button
                className="dash-btn-remover"
                onClick={() => {
                  setUtilizadorSelecionado(null);
                  setSearchUtilizador("");
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
                        setUtilizadorSelecionado(u);
                        setSearchUtilizador("");
                      }}
                    >
                      {u.nome}
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
                <img
                  src={animalSelecionado.imagem}
                  alt={animalSelecionado.nome}
                  className="dash-avatar-img"
                />
                <span className="fw-semibold">{animalSelecionado.nome}</span>
              </div>
              <button
                className="dash-btn-remover"
                onClick={() => {
                  setAnimalSelecionado(null);
                  setSearchPatudo("");
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
                        setAnimalSelecionado(a);
                        setSearchPatudo("");
                      }}
                    >
                      {a.nome}
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
  );
}

export default Dashboard;