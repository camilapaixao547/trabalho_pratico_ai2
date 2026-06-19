import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormularios } from "../../context/FormulariosContext";
import api from "../../api/axios";
import "./AnuncioForm.css";

function AdocaoDetalhe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { marcarComoVisto } = useFormularios();

  const [formulario, setFormulario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/formularios/${id}`)
      .then((res) => {
        setFormulario(res.data);
        if (!res.data.formulario_lido) {
          marcarComoVisto(Number(id));
        }
      })
      .catch((err) => console.error("Erro ao carregar formulário:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-muted">A carregar...</p>;
  if (!formulario) return <p className="text-muted">Formulário não encontrado.</p>;

  const animal = formulario.Animal;
  const user = formulario.User;

  return (
    <div className="afor-wrapper">
      <h2 className="afor-title">Detalhes do Pedido de Adoção</h2>

      {/* ANIMAL */}
      <div className="afor-panel mb-4">
        <div className="afor-section-header">
          <i className="bi bi-heart-fill" />
          <span>Animal</span>
        </div>

        {animal?.fotografia_animal && (
          <div
            className="afor-avatar"
            style={{
              backgroundImage: `url(${animal.fotografia_animal})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "default",
            }}
          />
        )}

        <div className="mb-3">
          <label className="afor-label">Nome</label>
          <input className="form-control" value={animal?.nome_animal ?? "—"} disabled />
        </div>

        <div className="mb-3">
          <label className="afor-label">Espécie</label>
          <input className="form-control" value={animal?.especie_animal ?? "—"} disabled />
        </div>

        <div className="mb-3">
          <label className="afor-label">Género</label>
          <input className="form-control" value={animal?.genero_animal ?? "—"} disabled />
        </div>

        <div className="mb-3">
          <label className="afor-label">Idade</label>
          <input
            className="form-control"
            value={
              animal?.idade_indefinida_animal
                ? "Desconhecida"
                : `${animal?.idade_valor_animal ?? ""} ${animal?.idade_unidade_animal ?? ""}`
            }
            disabled
          />
        </div>

        {animal?.descricao_animal && (
          <div className="mb-3">
            <label className="afor-label">Descrição</label>
            <textarea rows={3} className="form-control" value={animal.descricao_animal} disabled />
          </div>
        )}
      </div>

      {/* CANDIDATO */}
      <div className="afor-panel mb-4">
        <div className="afor-section-header">
          <i className="bi bi-person-circle" />
          <span>Candidato</span>
        </div>

        <div className="mb-3">
          <label className="afor-label">Nome</label>
          <input className="form-control" value={user?.nome_cliente ?? "—"} disabled />
        </div>

        <div className="mb-3">
          <label className="afor-label">Email</label>
          <input className="form-control" value={user?.email_cliente ?? "—"} disabled />
        </div>

        <div className="mb-3">
          <label className="afor-label">Telefone</label>
          <input className="form-control" value={user?.telefone_cliente ?? "—"} disabled />
        </div>

        <div className="mb-3">
          <label className="afor-label">Data de Nascimento</label>
          <input className="form-control" value={user?.data_nascimento_cliente ?? "—"} disabled />
        </div>

        <div className="mb-3">
          <label className="afor-label">Localidade</label>
          <input
            className="form-control"
            value={[user?.localidade_cliente, user?.concelho_cliente, user?.distrito_cliente]
              .filter(Boolean)
              .join(", ") || "—"}
            disabled
          />
        </div>
      </div>

      {/* RESPOSTAS DO FORMULÁRIO */}
      <div className="afor-panel mb-4">
        <div className="afor-section-header">
          <i className="bi bi-clipboard2-check" />
          <span>Respostas</span>
        </div>

        <div className="mb-3">
          <label className="afor-label">Tem quintal?</label>
          <input
            className="form-control"
            value={formulario.formulario_quintal ? "Sim" : "Não"}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="afor-label">Tem outros animais?</label>
          <input
            className="form-control"
            value={formulario.formulario_outros_animais ? "Sim" : "Não"}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="afor-label">Tem experiência com animais?</label>
          <input
            className="form-control"
            value={formulario.formulario_experiencia ? "Sim" : "Não"}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="afor-label">Motivação</label>
          <textarea
            rows={4}
            className="form-control"
            value={formulario.formulario_descricao ?? ""}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="afor-label">Data do pedido</label>
          <input className="form-control" value={formulario.data_formulario ?? "—"} disabled />
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button className="afor-btn-cancelar" onClick={() => navigate("/backoffice/adocoes")}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default AdocaoDetalhe;