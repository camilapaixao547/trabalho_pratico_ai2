import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnuncios } from "../../context/AnunciosContext";
import "./Adocoes.css";

const filtros = [
  { label: "Todos", value: "todos" },
  { label: "Cães", value: "Cão" },
  { label: "Gatos", value: "Gato" },
  { label: "Fêmea", value: "Femea" },
  { label: "Macho", value: "Macho" },
];

function Adocoes() {
  const navigate = useNavigate();
  const { adocoesConcluidas } = useAnuncios();
  const [search, setSearch] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("todos");

  const filtrados = adocoesConcluidas.filter((a) => {
    const correspondeFiltro =
      filtroAtivo === "todos" || a.especie === filtroAtivo || a.genero === filtroAtivo;
    const correspondeBusca = a.nome.toLowerCase().includes(search.toLowerCase());
    return correspondeFiltro && correspondeBusca;
  });

  return (
    <div className="adoc-wrapper">
      <h2 className="adoc-title">Adoções Concluídas</h2>

      <div className="d-flex gap-2 mb-3 flex-wrap">
        {filtros.map((f) => (
          <button
            key={f.value}
            className={
              "adoc-filtro-btn" + (filtroAtivo === f.value ? " adoc-filtro-ativo" : "")
            }
            onClick={() => setFiltroAtivo(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="adoc-panel">
        <div className="d-flex justify-content-end mb-3">
          <div className="adoc-search">
            <i className="bi bi-search adoc-search-icon" />
            <input
              type="text"
              className="form-control adoc-search-input"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="table adoc-table">
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
                <td><img src={a.imagem} alt={a.nome} className="adoc-thumb" /></td>
                <td className="fw-semibold">{a.nome}</td>
                <td>{a.idade}</td>
                <td>{a.especie}</td>
                <td className="text-end">
                  <button
                    className="adoc-btn-ver-mais"
                    onClick={() => navigate(`/backoffice/adocoes/${a.id}`)}
                  >
                    Ver mais
                  </button>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  Ainda não há adoções concluídas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Adocoes;