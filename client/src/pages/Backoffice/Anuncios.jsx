import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnuncios } from "../../context/AnunciosContext";
import "./Anuncios.css";

const filtros = [
  { label: "Todos", value: "todos" },
  { label: "Cães", value: "Cão" },
  { label: "Gatos", value: "Gato" },
  { label: "Fêmea", value: "Femea" },
  { label: "Macho", value: "Macho" },
];

function Anuncios() {
  const navigate = useNavigate();

  // Agora vem do contexto real
  const { anunciosAtivos, eliminarAnuncio } = useAnuncios();

  const [search, setSearch] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("todos");
  const [anuncioParaEliminar, setAnuncioParaEliminar] = useState(null);
  const [mostrarSucesso, setMostrarSucesso] = useState(false);

  // Filtragem
  const filtrados = anunciosAtivos.filter((a) => {
    const correspondeFiltro =
      filtroAtivo === "todos" ||
      a.especie === filtroAtivo ||
      a.genero === filtroAtivo;

    const correspondeBusca = a.nome
      .toLowerCase()
      .includes(search.toLowerCase());

    return correspondeFiltro && correspondeBusca;
  });

  // Eliminar anúncio
  const confirmarEliminar = () => {
    eliminarAnuncio(anuncioParaEliminar.id);
    setAnuncioParaEliminar(null);

    setMostrarSucesso(true);
    setTimeout(() => setMostrarSucesso(false), 2500);
  };

  return (
    <div className="anun-wrapper">
      <h2 className="anun-title">Gestão de Anúncios</h2>

      {/* FILTROS */}
      <div className="d-flex gap-2 mb-3 flex-wrap">
        {filtros.map((f) => (
          <button
            key={f.value}
            className={
              "anun-filtro-btn" +
              (filtroAtivo === f.value ? " anun-filtro-ativo" : "")
            }
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="btn anun-btn-primary"
            onClick={() => navigate("/backoffice/anuncios/criar")}
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
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((a) => (
              <tr key={a.id}>
                <td>
                  <img src={a.imagem} alt={a.nome} className="anun-thumb" />
                </td>
                <td className="fw-semibold">{a.nome}</td>
                <td>{a.idade}</td>
                <td>{a.especie}</td>

                <td className="text-end">
                  <button
                    className="anun-btn-editar me-2"
                    onClick={() =>
                      navigate(`/backoffice/anuncios/editar/${a.id}`)
                    }
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
                <td colSpan={5} className="text-center text-muted py-4">
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
              Tem a certeza que deseja eliminar{" "}
              <strong>{anuncioParaEliminar.nome}</strong>?
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
  );
}

export default Anuncios;
