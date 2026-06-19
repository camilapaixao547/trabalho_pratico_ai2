import { useNavigate, useParams } from "react-router-dom";
import { useUtilizadores } from "../../context/UtilizadoresContext";
import "./UtilizadorForm.css";

function UtilizadorVisualizar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { utilizadores, loading } = useUtilizadores();

  const utilizador = utilizadores.find((u) => u.id === Number(id));

  if (loading) return <p className="text-muted">A carregar...</p>;
  if (!utilizador) return <p className="text-muted">Utilizador não encontrado.</p>;

  const inicial = utilizador.nome_cliente?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="uform-wrapper">
      <h2 className="uform-title">Detalhes do Utilizador</h2>

      <div className="uform-panel mb-4">
        <div className="uform-section-header">
          <i className="bi bi-person-circle" />
          <span>Fotografia de perfil</span>
        </div>
        <div className="uform-avatar-wrapper">
          {utilizador.fotografia_cliente ? (
            <div
              className="uform-avatar"
              style={{
                backgroundImage: `url(${utilizador.fotografia_cliente})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : (
            <div className="uform-avatar">{inicial}</div>
          )}
        </div>
      </div>

      <div className="uform-panel">
        <div className="uform-section-header">
          <i className="bi bi-person-circle" />
          <span>Dados Pessoais</span>
        </div>

        <div className="row g-3">
          <div className="col-12">
            <label className="uform-label">Nome</label>
            <input type="text" className="form-control" value={utilizador.nome_cliente ?? ""} disabled />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Email</label>
            <input type="email" className="form-control" value={utilizador.email_cliente ?? ""} disabled />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Telefone</label>
            <input type="text" className="form-control" value={utilizador.telefone_cliente ?? ""} disabled />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Data de Nascimento</label>
            <input type="date" className="form-control" value={utilizador.data_nascimento_cliente ?? ""} disabled />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Perfil</label>
            <input type="text" className="form-control" value={utilizador.perfil ?? ""} disabled />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Localidade</label>
            <input type="text" className="form-control" value={utilizador.localidade_cliente ?? ""} disabled />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Concelho</label>
            <input type="text" className="form-control" value={utilizador.concelho_cliente ?? ""} disabled />
          </div>

          <div className="col-12">
            <label className="uform-label">Distrito</label>
            <input type="text" className="form-control" value={utilizador.distrito_cliente ?? ""} disabled />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button className="uform-btn-cancelar" onClick={() => navigate("/backoffice/utilizadores")}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default UtilizadorVisualizar;