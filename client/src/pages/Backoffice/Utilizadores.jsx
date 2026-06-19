import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Utilizadores.css";

const mockUtilizadores = [
  { id: 1, nome: "Joana Abrantes", data: "18/06/2026", email: "joanaabrantes@gmail.com" },
  { id: 2, nome: "Ricardo Henriques", data: "18/06/2026", email: "ricardohenriques@gmail.com" },
  { id: 3, nome: "Carlos Cruz", data: "18/06/2026", email: "carloscruz@gmail.com" },
];

function Utilizadores() {
  const navigate = useNavigate();
  const [utilizadores, setUtilizadores] = useState(mockUtilizadores);
  const [search, setSearch] = useState("");
  const [utilizadorParaEliminar, setUtilizadorParaEliminar] = useState(null);
  const [mostrarSucesso, setMostrarSucesso] = useState(false);

  const filtrados = utilizadores.filter((u) =>
    u.nome.toLowerCase().includes(search.toLowerCase())
  );

  const confirmarEliminar = (utilizador) => {
    setUtilizadorParaEliminar(utilizador);
  };

  const eliminarUtilizador = () => {
    // axios.delete(`/api/utilizadores/${utilizadorParaEliminar.id}`)
    setUtilizadores((prev) =>
      prev.filter((u) => u.id !== utilizadorParaEliminar.id)
    );
    setUtilizadorParaEliminar(null);
    setMostrarSucesso(true);

    setTimeout(() => setMostrarSucesso(false), 2500);
  };

  return (
    <div className="util-wrapper">
      <h2 className="util-title">Gestão de Utilizadores</h2>

      <div className="util-panel">
        <div className="d-flex justify-content-between align-items-center mb-3 gap-3">
          <div className="util-search flex-grow-1">
            <i className="bi bi-search util-search-icon" />
            <input
              type="text"
              className="form-control util-search-input"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="btn util-btn-primary"
            onClick={() => navigate("/backoffice/utilizadores/criar")}
          >
            + Adicionar Utilizador
          </button>
        </div>

        <table className="table util-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((u) => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.data}</td>
                <td>{u.email}</td>
                <td className="text-end">
                  <button
                    className="util-btn-editar me-2"
                    onClick={() =>
                      navigate(`/backoffice/utilizadores/editar/${u.id}`)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="util-btn-eliminar"
                    onClick={() => confirmarEliminar(u)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted py-4">
                  Nenhum utilizador encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL CONFIRMAR ELIMINAÇÃO */}
      {utilizadorParaEliminar && (
        <div className="util-modal-backdrop">
          <div className="util-modal">
            <p className="util-modal-text">
              Tem a certeza que deseja eliminar{" "}
              <strong>{utilizadorParaEliminar.nome}</strong>?
            </p>
            <div className="d-flex justify-content-center gap-2 mt-4">
              <button
                className="util-btn-cancelar"
                onClick={() => setUtilizadorParaEliminar(null)}
              >
                Cancelar
              </button>
              <button className="util-btn-confirmar" onClick={eliminarUtilizador}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST DE SUCESSO */}
      {mostrarSucesso && (
        <div className="util-toast">Eliminado com sucesso!</div>
      )}
    </div>
  );
}

export default Utilizadores;