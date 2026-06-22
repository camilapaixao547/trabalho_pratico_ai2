import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUtilizadores } from "../../context/UtilizadoresContext";
import api from "../../api/api";
import "./UtilizadorForm.css";

const distritos = [
  "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra",
  "Évora", "Faro", "Guarda", "Leiria", "Lisboa", "Portalegre", "Porto",
  "Santarém", "Setúbal", "Viana do Castelo", "Vila Real", "Viseu",
  "Açores", "Madeira",
];

const initialState = {
  fotografia_cliente: "",
  nome_cliente: "",
  email_cliente: "",
  password_cliente: "",
  telefone_cliente: "",
  data_nascimento_cliente: "",
  localidade_cliente: "",
  concelho_cliente: "",
  distrito_cliente: "",
};

function UtilizadorForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdicao = Boolean(id);
  const { utilizadores, atualizarUtilizador, criarUtilizador } = useUtilizadores();

  const [form, setForm] = useState(initialState);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (isEdicao) {
      const utilizador = utilizadores.find((u) => u.id === Number(id));
      if (utilizador) {
        setForm({
          fotografia_cliente: utilizador.fotografia_cliente ?? "",
          nome_cliente: utilizador.nome_cliente ?? "",
          email_cliente: utilizador.email_cliente ?? "",
          password_cliente: "",
          telefone_cliente: utilizador.telefone_cliente ?? "",
          data_nascimento_cliente: utilizador.data_nascimento_cliente ?? "",
          localidade_cliente: utilizador.localidade_cliente ?? "",
          concelho_cliente: utilizador.concelho_cliente ?? "",
          distrito_cliente: utilizador.distrito_cliente ?? "",
        });
        if (utilizador.fotografia_cliente) {
          setFotoPreview(utilizador.fotografia_cliente);
        }
      }
    }
  }, [id, isEdicao, utilizadores]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFoto = async (e) => {
    const ficheiro = e.target.files[0];
    if (!ficheiro) return;

    const formData = new FormData();
    formData.append("imagem", ficheiro);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({ ...prev, fotografia_cliente: res.data.url }));
      setFotoPreview(URL.createObjectURL(ficheiro));
    } catch (err) {
      console.error("Erro ao fazer upload:", err);
    }
  };

  const validar = () => {
    const novosErros = {};
    if (!form.nome_cliente.trim()) novosErros.nome_cliente = "O nome é obrigatório.";
    if (!form.email_cliente.trim()) novosErros.email_cliente = "O email é obrigatório.";
    if (!isEdicao && !form.password_cliente.trim()) novosErros.password_cliente = "A password é obrigatória.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleGuardar = async () => {
    if (!validar()) return;
    try {
      const dados = { ...form };
      if (isEdicao && !dados.password_cliente) delete dados.password_cliente;
      if (isEdicao) {
        await atualizarUtilizador(Number(id), dados);
      } else {
        await criarUtilizador(dados);
      }
      navigate("/backoffice/utilizadores");
    } catch (err) {
      console.error("Erro ao guardar utilizador:", err);
    }
  };

  const inicial = form.nome_cliente ? form.nome_cliente.charAt(0).toUpperCase() : "?";

  return (
    <div className="uform-wrapper">
      <h2 className="uform-title">
        {isEdicao ? "Editar Utilizador" : "Criar Utilizador"}
      </h2>

      {/* FOTOGRAFIA */}
      <div className="uform-panel mb-4">
        <div className="uform-section-header">
          <i className="bi bi-person-circle" />
          <span>Fotografia de perfil</span>
        </div>
        <div className="uform-avatar-wrapper">
          {fotoPreview ? (
            <div
              className="uform-avatar"
              style={{
                backgroundImage: `url(${fotoPreview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : (
            <div className="uform-avatar">{inicial}</div>
          )}
          <label className="uform-avatar-edit" style={{ cursor: "pointer" }}>
            <i className="bi bi-pencil-fill" />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFoto}
            />
          </label>
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
            <label className="uform-label">Nome*</label>
            <input
              type="text"
              name="nome_cliente"
              className={`form-control ${erros.nome_cliente ? "is-invalid" : ""}`}
              value={form.nome_cliente}
              onChange={handleChange}
            />
            {erros.nome_cliente && <div className="invalid-feedback">{erros.nome_cliente}</div>}
          </div>

          <div className="col-md-6">
            <label className="uform-label">Email*</label>
            <input
              type="email"
              name="email_cliente"
              className={`form-control ${erros.email_cliente ? "is-invalid" : ""}`}
              value={form.email_cliente}
              onChange={handleChange}
            />
            {erros.email_cliente && <div className="invalid-feedback">{erros.email_cliente}</div>}
          </div>

          <div className="col-md-6">
            <label className="uform-label">Telefone</label>
            <input
              type="text"
              name="telefone_cliente"
              className="form-control"
              value={form.telefone_cliente}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="uform-label">
              {isEdicao ? "Nova Password (deixar em branco para manter)" : "Password*"}
            </label>
            <input
              type="password"
              name="password_cliente"
              className={`form-control ${erros.password_cliente ? "is-invalid" : ""}`}
              value={form.password_cliente}
              onChange={handleChange}
            />
            {erros.password_cliente && <div className="invalid-feedback">{erros.password_cliente}</div>}
          </div>

          <div className="col-md-6">
            <label className="uform-label">Data de Nascimento</label>
            <input
              type="date"
              name="data_nascimento_cliente"
              className="form-control"
              value={form.data_nascimento_cliente}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Localidade</label>
            <input
              type="text"
              name="localidade_cliente"
              className="form-control"
              value={form.localidade_cliente}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Concelho</label>
            <input
              type="text"
              name="concelho_cliente"
              className="form-control"
              value={form.concelho_cliente}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="uform-label">Distrito</label>
            <select
              name="distrito_cliente"
              className="form-select"
              value={form.distrito_cliente}
              onChange={handleChange}
            >
              <option value="">Selecione um distrito</option>
              {distritos.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          className="uform-btn-cancelar"
          onClick={() => navigate("/backoffice/utilizadores")}
        >
          Cancelar
        </button>
        <button className="uform-btn-guardar" onClick={handleGuardar}>
          Guardar
        </button>
      </div>
    </div>
  );
}

export default UtilizadorForm;