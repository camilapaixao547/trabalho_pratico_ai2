import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormularios } from "../../context/FormulariosContext";
import "./Formularios.css";

function Formularios() {
  const navigate = useNavigate();
  const { formularios, eliminarFormulario } = useFormularios();
  const [search, setSearch] = useState("");
  const [formularioParaEliminar, setFormularioParaEliminar] = useState(null);
  const [mostrarSucesso, setMostrarSucesso] = useState(false);

  const filtrados = formularios.filter((f) =>
    f.nome.toLowerCase().includes(search.toLowerCase())
  );

  const confirmarEliminar = () => {
    eliminarFormulario(formularioParaEliminar.id);
    setFormularioParaEliminar(null);
    setMostrarSucesso(true);
    setTimeout(() => setMostrarSucesso(false), 2500);
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Gestão de Formulários</h2>

      <div className="form-panel">
        <div className="d-flex justify-content-between align-items-center mb-3 gap-3">
          <div className="form-search flex-grow-1">
            <i className="bi bi-search form-search-icon" />
            <input
              type="text"
              className="form-control form-search-input"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="table form-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Animal</th>
              <th>Motivação</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((f) => (
              <tr key={f.id}>
                <td className="fw-semibold">{f.nome}</td>
                <td>{f.data}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img src={f.animalFoto} alt={f.animal} className="form-animal-thumb" />
                    {f.animal}
                  </div>
                </td>
                <td className="form-motivacao-cell">{f.motivacao}</td>
                <td className="text-end">
                  <button
                    className="form-btn-ver-mais me-2"
                    onClick={() => navigate(`/backoffice/formularios/ver/${f.id}`)}
                  >
                    Ver mais
                  </button>
                  <button
                    className="form-btn-editar me-2"
                    onClick={() => navigate(`/backoffice/formularios/editar/${f.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="form-btn-eliminar"
                    onClick={() => setFormularioParaEliminar(f)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  Nenhum formulário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL CONFIRMAR ELIMINAÇÃO */}
      {formularioParaEliminar && (
        <div className="form-modal-backdrop">
          <div className="form-modal">
            <p className="form-modal-text">
              Tem a certeza que deseja eliminar o formulário de{" "}
              <strong>{formularioParaEliminar.nome}</strong>?
            </p>
            <div className="d-flex justify-content-center gap-2 mt-4">
              <button
                className="form-btn-cancelar"
                onClick={() => setFormularioParaEliminar(null)}
              >
                Cancelar
              </button>
              <button className="form-btn-confirmar" onClick={confirmarEliminar}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarSucesso && <div className="form-toast">Eliminado com sucesso!</div>}
    </div>
  );
}

export default Formularios;