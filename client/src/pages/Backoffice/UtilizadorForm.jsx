import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UtilizadorForm.css";

// Mock - simula dados existentes (viria do Axios em modo edição)
const mockUtilizadores = [
  {
    id: 1,
    nome: "Joana Abrantes",
    email: "joanaabrantes@gmail.com",
    telefone: "912345678",
    dataNascimento: "1995-04-12",
    nif: "123456789",
    localidade: "Viseu",
    concelho: "Viseu",
    distrito: "Viseu",
  },
];

const distritos = [
  "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra",
  "Évora", "Faro", "Guarda", "Leiria", "Lisboa", "Portalegre", "Porto",
  "Santarém", "Setúbal", "Viana do Castelo", "Vila Real", "Viseu",
  "Açores", "Madeira",
];

const initialState = {
  nome: "",
  email: "",
  telefone: "",
  dataNascimento: "",
  nif: "",
  localidade: "",
  concelho: "",
  distrito: "",
};

function UtilizadorForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdicao = Boolean(id);

  const [form, setForm] = useState(initialState);
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (isEdicao) {
      // axios.get(`/api/utilizadores/${id}`).then((res) => setForm(res.data));
      const utilizador = mockUtilizadores.find((u) => u.id === Number(id));
      if (utilizador) setForm(utilizador);
    }
  }, [id, isEdicao]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const novosErros = {};
    if (!form.nome.trim()) novosErros.nome = "O nome é obrigatório.";
    if (!form.email.trim()) novosErros.email = "O email é obrigatório.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleGuardar = () => {
    if (!validar()) return;

    if (isEdicao) {
      // axios.put(`/api/utilizadores/${id}`, form)
    } else {
      // axios.post("/api/utilizadores", form)
    }

    navigate("/backoffice/utilizadores");
  };

  const inicial = form.nome ? form.nome.charAt(0).toUpperCase() : "?";

  return (
    <div className="uform-wrapper">
      <h2 className="uform-title">
        {isEdicao ? "Editar Utilizador" : "Criar Utilizador"}
      </h2>

      {/* FOTOGRAFIA DE PERFIL */}
      <div className="uform-panel mb-4">
        <div className="uform-section-header">
          <i className="bi bi-person-circle" />
          <span>Fotografia de perfil</span>
        </div>
        <div className="uform-avatar-wrapper">
          <div className="uform-avatar">{inicial}</div>
          <button className="uform-avatar-edit" type="button">
            <i className="bi bi-pencil-fill" />
          </button>
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
              name="nome"
              className={`form-control ${erros.nome ? "is-invalid" : ""}`}
              value={form.nome}
              onChange={handleChange}
            />
            {erros.nome && <div className="invalid-feedback">{erros.nome}</div>}
          </div>

          <div className="col-md-6">
            <label className="uform-label">Email*</label>
            <input
              type="email"
              name="email"
              className={`form-control ${erros.email ? "is-invalid" : ""}`}
              value={form.email}
              onChange={handleChange}
            />
            {erros.email && <div className="invalid-feedback">{erros.email}</div>}
          </div>
          <div className="col-md-6">
            <label className="uform-label">Telefone</label>
            <input
              type="text"
              name="telefone"
              className="form-control"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              className="form-control"
              value={form.dataNascimento}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="uform-label">NIF</label>
            <input
              type="text"
              name="nif"
              className="form-control"
              value={form.nif}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="uform-label">Localidade</label>
            <input
              type="text"
              name="localidade"
              className="form-control"
              value={form.localidade}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="uform-label">Concelho</label>
            <input
              type="text"
              name="concelho"
              className="form-control"
              value={form.concelho}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="uform-label">Distrito</label>
            <select
              name="distrito"
              className="form-select"
              value={form.distrito}
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

      {/* AÇÕES */}
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