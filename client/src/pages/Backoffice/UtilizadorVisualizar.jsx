import { useNavigate, useParams } from "react-router-dom";
import { useUtilizadores } from "../../context/UtilizadoresContext";
import "./UtilizadorForm.css"; // reaproveita o mesmo CSS do form de utilizador

function UtilizadorVisualizar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { utilizadores } = useUtilizadores();

  const utilizador = utilizadores.find((u) => u.id === Number(id));

  if (!utilizador) {
    return <p className="text-muted">Utilizador não encontrado.</p>;
  }

  const inicial = utilizador.nome ? utilizador.nome.charAt(0).toUpperCase() : "?";

  return (
    <div className="uform-wrapper">
      <h2 className="uform-title">Detalhes do Utilizador</h2>

      {/* FOTOGRAFIA DE PERFIL */}
      <div className="uform-panel mb-4">
        <div className="uform-section-header">
          <i className="bi bi-person-circle" />
          <span>Fotografia de perfil</span>
        </div>
        <div className="uform-avatar-wrapper">
          <div className="uform-avatar">{inicial}</div>
        </div>
      </div>

      {/* DADOS PESSOAIS */}
      <div className="uform-panel">
        <div className="uform-section-header">
          <i className="bi bi-person-circle" />
          <span>Dados Pessoais</span>
        </div>

        <div className="row g-3">
          <div className="col-12">
            <label className="uform-label">Nome</label>
            <input
              type="text"
              className="form-control"
              value={utilizador.nome || ""}
              disabled
            />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={utilizador.email || ""}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label className="uform-label">Telefone</label>
            <input
              type="text"
              className="form-control"
              value={utilizador.telefone || ""}
              disabled
            />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Data de Nascimento</label>
            <input
              type="date"
              className="form-control"
              value={utilizador.dataNascimento || ""}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label className="uform-label">NIF</label>
            <input
              type="text"
              className="form-control"
              value={utilizador.nif || ""}
              disabled
            />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Localidade</label>
            <input
              type="text"
              className="form-control"
              value={utilizador.localidade || ""}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label className="uform-label">Concelho</label>
            <input
              type="text"
              className="form-control"
              value={utilizador.concelho || ""}
              disabled
            />
          </div>

          <div className="col-12">
            <label className="uform-label">Distrito</label>
            <input
              type="text"
              className="form-control"
              value={utilizador.distrito || ""}
              disabled
            />
          </div>
        </div>
      </div>

      {/* AÇÕES */}
      <div className="d-flex justify-content-end mt-4">
        <button
          className="uform-btn-cancelar"
          onClick={() => navigate("/backoffice/utilizadores")}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default UtilizadorVisualizar;