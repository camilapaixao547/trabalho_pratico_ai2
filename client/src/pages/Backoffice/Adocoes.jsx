import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnuncios } from "../../context/AnunciosContext";
import "./Adocoes.css";

// Ícones de género em SVG inline (não dependem de nenhuma biblioteca externa)
function IconeMacho({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="14" r="6" />
      <path d="M21 3l-7.5 7.5" />
      <path d="M21 3h-6" />
      <path d="M21 3v6" />
    </svg>
  );
}

function IconeFemea({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v7" />
      <path d="M9 19h6" />
    </svg>
  );
}

const filtros = [
  { label: "Todos", value: "todos" },
  { label: "Cães", value: "cão" },
  { label: "Gatos", value: "gato" },
  { label: "Fêmea", value: "fêmea" },
  { label: "Macho", value: "macho" },
];

function Adocoes() {
  const navigate = useNavigate();
  const { adocoesConcluidas } = useAnuncios();
  const [search, setSearch] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("todos");

  const filtrados = adocoesConcluidas.filter((a) => {
    const correspondeFiltro =
      filtroAtivo === "todos" ||
      a.especie_animal === filtroAtivo ||
      a.genero_animal === filtroAtivo;
    const correspondeBusca = a.nome_animal
      .toLowerCase()
      .includes(search.toLowerCase());
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
              <th>Género</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((a) => (
              <tr key={a.id}>
                <td>
                  <img
                    src={a.fotografia_animal}
                    alt={a.nome_animal}
                    className="adoc-thumb"
                  />
                </td>
                <td className="fw-semibold">{a.nome_animal}</td>
                <td>
                  {a.idade_indefinida_animal
                    ? "Idade desconhecida"
                    : `${a.idade_valor_animal} ${a.idade_unidade_animal}`}
                </td>
                <td>{a.especie_animal}</td>
                <td>
                  {a.genero_animal === "macho" ? (
                    <span className="adoc-genero adoc-genero-macho">
                      <IconeMacho size={16} />
                      Macho
                    </span>
                  ) : a.genero_animal === "fêmea" ? (
                    <span className="adoc-genero adoc-genero-femea">
                      <IconeFemea size={16} />
                      Fêmea
                    </span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
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
                <td colSpan={6} className="text-center text-muted py-4">
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
