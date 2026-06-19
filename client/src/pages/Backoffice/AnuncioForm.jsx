import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAnuncios } from "../../context/AnunciosContext";
import "./AnuncioForm.css";

const initialState = {
  nome: "",
  idade: "",
  especie: "",
  genero: "",
  descricao: "",
  adotado: false,
  imagem: null,
};

function AnuncioForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdicao = Boolean(id);
  const fileInputRef = useRef(null);

  const { anuncios, atualizarAnuncio, criarAnuncio } = useAnuncios();

  const [form, setForm] = useState(initialState);
  const [erros, setErros] = useState({});
  const [previewImagem, setPreviewImagem] = useState(null);

  // Carregar dados no modo edição
  useEffect(() => {
    if (isEdicao) {
      const anuncio = anuncios.find((a) => a.id === Number(id));
      if (anuncio) {
        setForm(anuncio);
        setPreviewImagem(anuncio.imagem);
      }
    }
  }, [id, isEdicao, anuncios]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    setForm((prev) => ({ ...prev, adotado: e.target.checked }));
  };

  const handleImagemClick = () => {
    fileInputRef.current.click();
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, imagem: file }));
      setPreviewImagem(URL.createObjectURL(file));
    }
  };

  const validar = () => {
    const novosErros = {};
    if (!form.nome.trim()) novosErros.nome = "O nome é obrigatório.";
    if (!form.idade.trim()) novosErros.idade = "A idade é obrigatória.";
    if (!form.especie) novosErros.especie = "Selecione a espécie.";
    if (!form.genero) novosErros.genero = "Selecione o género.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleGuardar = () => {
    if (!validar()) return;

    if (isEdicao) {
      atualizarAnuncio(Number(id), form);
    } else {
      criarAnuncio(form);
    }

    // Se foi marcado como adotado → vai para adoções
    if (form.adotado) {
      navigate("/backoffice/adocoes");
    } else {
      navigate("/backoffice/anuncios");
    }
  };

  return (
    <div className="afor-wrapper">
      <h2 className="afor-title">
        {isEdicao ? "Editar Anúncio" : "Criar Anúncio"}
      </h2>

      {/* FOTOGRAFIA */}
      <div className="afor-panel mb-4">
        <div className="afor-section-header">
          <i className="bi bi-person-circle" />
          <span>Fotografia</span>
        </div>

        <div className="afor-avatar-wrapper">
          <div
            className="afor-avatar"
            onClick={handleImagemClick}
            style={
              previewImagem
                ? {
                    backgroundImage: `url(${previewImagem})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            {!previewImagem && <i className="bi bi-paw afor-paw-icon" />}
          </div>

          <button
            className="afor-avatar-edit"
            type="button"
            onClick={handleImagemClick}
          >
            <i className="bi bi-pencil-fill" />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImagemChange}
            className="d-none"
          />
        </div>
      </div>

      {/* DADOS */}
      <div className="afor-panel">
        <div className="afor-section-header">
          <i className="bi bi-person-circle" />
          <span>Dados</span>
        </div>

        <div className="mb-3">
          <label className="afor-label">Nome*</label>
          <input
            type="text"
            name="nome"
            className={`form-control ${erros.nome ? "is-invalid" : ""}`}
            value={form.nome}
            onChange={handleChange}
          />
          {erros.nome && <div className="invalid-feedback">{erros.nome}</div>}
        </div>

        <div className="mb-3">
          <label className="afor-label">Idade*</label>
          <input
            type="text"
            name="idade"
            placeholder="ex: 2 anos"
            className={`form-control ${erros.idade ? "is-invalid" : ""}`}
            value={form.idade}
            onChange={handleChange}
          />
          {erros.idade && <div className="invalid-feedback">{erros.idade}</div>}
        </div>

        <div className="mb-3">
          <label className="afor-label d-block">Espécie*</label>
          <div className="d-flex gap-4">
            {["Cão", "Gato"].map((op) => (
              <label key={op} className="afor-radio-label">
                <input
                  type="radio"
                  name="especie"
                  value={op}
                  checked={form.especie === op}
                  onChange={handleChange}
                  className="afor-radio"
                />
                {op}
              </label>
            ))}
          </div>
          {erros.especie && <div className="afor-error">{erros.especie}</div>}
        </div>

        <div className="mb-3">
          <label className="afor-label d-block">Género*</label>
          <div className="d-flex gap-4">
            <label className="afor-radio-label">
              <input
                type="radio"
                name="genero"
                value="Macho"
                checked={form.genero === "Macho"}
                onChange={handleChange}
                className="afor-radio"
              />
              Macho
            </label>

            <label className="afor-radio-label">
              <input
                type="radio"
                name="genero"
                value="Femea"
                checked={form.genero === "Femea"}
                onChange={handleChange}
                className="afor-radio"
              />
              Fêmea
            </label>
          </div>
          {erros.genero && <div className="afor-error">{erros.genero}</div>}
        </div>

        <div className="mb-3">
          <label className="afor-label">Descrição</label>
          <textarea
            name="descricao"
            rows={4}
            className="form-control"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input afor-checkbox"
            id="adotado"
            checked={form.adotado}
            onChange={handleCheckbox}
          />
          <label
            className="form-check-label afor-checkbox-label"
            htmlFor="adotado"
          >
            Adotado
          </label>
        </div>
      </div>

      {/* AÇÕES */}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          className="afor-btn-cancelar"
          onClick={() => navigate("/backoffice/anuncios")}
        >
          Cancelar
        </button>

        <button className="afor-btn-guardar" onClick={handleGuardar}>
          Guardar alterações
        </button>
      </div>
    </div>
  );
}

export default AnuncioForm;
