import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAnuncios } from "../../context/AnunciosContext";
import api from "../../api/api";
import "./AnuncioForm.css";

const initialState = {
  nome_animal: "",
  fotografia_animal: "",
  idade_valor_animal: "",
  idade_unidade_animal: "anos",
  idade_indefinida_animal: false,
  especie_animal: "",
  genero_animal: "",
  descricao_animal: "",
  disponivel_animal: true,
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
  const [aGuardar, setAGuardar] = useState(false);
  const [aEnviarImagem, setAEnviarImagem] = useState(false);
  const [erroImagem, setErroImagem] = useState("");
  const [erroServidor, setErroServidor] = useState("");

  // Carregar dados no modo edição
  useEffect(() => {
    if (isEdicao) {
      const anuncio = anuncios.find((a) => a.id === Number(id));
      if (anuncio) {
        setForm({
          nome_animal: anuncio.nome_animal ?? "",
          fotografia_animal: anuncio.fotografia_animal ?? "",
          idade_valor_animal: anuncio.idade_valor_animal ?? "",
          idade_unidade_animal: anuncio.idade_unidade_animal ?? "anos",
          idade_indefinida_animal: anuncio.idade_indefinida_animal ?? false,
          especie_animal: anuncio.especie_animal ?? "",
          genero_animal: anuncio.genero_animal ?? "",
          descricao_animal: anuncio.descricao_animal ?? "",
          disponivel_animal: anuncio.disponivel_animal ?? true,
        });
        setPreviewImagem(anuncio.fotografia_animal || null);
      }
    }
  }, [id, isEdicao, anuncios]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    // "Adotado" no formulário corresponde ao inverso de disponivel_animal
    setForm((prev) => ({ ...prev, disponivel_animal: !e.target.checked }));
  };

  const handleIdadeIndefinidaChange = (e) => {
    const indefinida = e.target.checked;
    setForm((prev) => ({
      ...prev,
      idade_indefinida_animal: indefinida,
      idade_valor_animal: indefinida ? "" : prev.idade_valor_animal,
    }));
  };

  const handleImagemClick = () => {
    fileInputRef.current.click();
  };

  // Faz upload real do ficheiro para o servidor (rota /upload, multer).
  // Mostra logo um preview local enquanto o upload decorre, e guarda o
  // URL devolvido pelo servidor em fotografia_animal quando terminar.
  const handleImagemChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setErroImagem("");

    const tiposPermitidos = ["image/png", "image/jpg", "image/jpeg"];
    if (!tiposPermitidos.includes(file.type)) {
      setErroImagem("Apenas ficheiros PNG, JPG ou JPEG são permitidos.");
      e.target.value = "";
      return;
    }

    // Preview imediato local (antes do upload terminar)
    const previewLocal = URL.createObjectURL(file);
    setPreviewImagem(previewLocal);

    const dadosFormulario = new FormData();
    dadosFormulario.append("imagem", file);

    try {
      setAEnviarImagem(true);
      const res = await api.post("/upload", dadosFormulario, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({ ...prev, fotografia_animal: res.data.url }));
      setPreviewImagem(res.data.url);
    } catch (err) {
      setErroImagem("Não foi possível enviar a imagem. Tenta novamente.");
      setPreviewImagem(form.fotografia_animal || null);
    } finally {
      setAEnviarImagem(false);
      e.target.value = "";
    }
  };

  const validar = () => {
    const novosErros = {};
    if (!form.nome_animal.trim()) novosErros.nome_animal = "O nome é obrigatório.";
    if (!form.idade_indefinida_animal && !String(form.idade_valor_animal).trim()) {
      novosErros.idade_valor_animal = "A idade é obrigatória.";
    }
    if (!form.especie_animal) novosErros.especie_animal = "Selecione a espécie.";
    if (!form.genero_animal) novosErros.genero_animal = "Selecione o género.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleGuardar = async () => {
    if (!validar()) return;

    setErroServidor("");
    setAGuardar(true);

    const payload = {
      nome_animal: form.nome_animal.trim(),
      fotografia_animal: form.fotografia_animal || null,
      idade_valor_animal: form.idade_indefinida_animal
        ? null
        : Number(form.idade_valor_animal),
      idade_unidade_animal: form.idade_indefinida_animal
        ? null
        : form.idade_unidade_animal,
      idade_indefinida_animal: form.idade_indefinida_animal,
      especie_animal: form.especie_animal,
      genero_animal: form.genero_animal,
      descricao_animal: form.descricao_animal || null,
      disponivel_animal: form.disponivel_animal,
    };

    try {
      if (isEdicao) {
        await atualizarAnuncio(Number(id), payload);
      } else {
        await criarAnuncio(payload);
      }

      // Se foi marcado como adotado (indisponível) → vai para adoções
      if (!form.disponivel_animal) {
        navigate("/backoffice/adocoes");
      } else {
        navigate("/backoffice/anuncios");
      }
    } catch (err) {
      setErroServidor("Não foi possível guardar o anúncio. Tenta novamente.");
    } finally {
      setAGuardar(false);
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
            {aEnviarImagem && (
              <div className="afor-avatar-overlay">A enviar...</div>
            )}
          </div>

          <button
            className="afor-avatar-edit"
            type="button"
            onClick={handleImagemClick}
            disabled={aEnviarImagem}
          >
            <i className="bi bi-pencil-fill" />
          </button>

          <input
            type="file"
            accept=".png,.jpg,.jpeg,image/png,image/jpeg"
            ref={fileInputRef}
            onChange={handleImagemChange}
            className="d-none"
          />
        </div>
        {erroImagem && <div className="afor-error mt-2">{erroImagem}</div>}
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
            name="nome_animal"
            className={`form-control ${erros.nome_animal ? "is-invalid" : ""}`}
            value={form.nome_animal}
            onChange={handleChange}
          />
          {erros.nome_animal && (
            <div className="invalid-feedback">{erros.nome_animal}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="afor-label d-block">Idade*</label>
          <div className="d-flex gap-2 align-items-start flex-wrap">
            <input
              type="number"
              min="0"
              name="idade_valor_animal"
              placeholder="ex: 2"
              className={`form-control ${erros.idade_valor_animal ? "is-invalid" : ""}`}
              style={{ maxWidth: "120px" }}
              value={form.idade_valor_animal}
              onChange={handleChange}
              disabled={form.idade_indefinida_animal}
            />

            <select
              name="idade_unidade_animal"
              className="form-select"
              style={{ maxWidth: "140px" }}
              value={form.idade_unidade_animal}
              onChange={handleChange}
              disabled={form.idade_indefinida_animal}
            >
              <option value="meses">Meses</option>
              <option value="anos">Anos</option>
            </select>

            <label className="afor-radio-label">
              <input
                type="checkbox"
                className="afor-radio"
                checked={form.idade_indefinida_animal}
                onChange={handleIdadeIndefinidaChange}
              />
              Idade desconhecida
            </label>
          </div>
          {erros.idade_valor_animal && (
            <div className="afor-error">{erros.idade_valor_animal}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="afor-label d-block">Espécie*</label>
          <div className="d-flex gap-4">
            {[
              { label: "Cão", value: "cão" },
              { label: "Gato", value: "gato" },
            ].map((op) => (
              <label key={op.value} className="afor-radio-label">
                <input
                  type="radio"
                  name="especie_animal"
                  value={op.value}
                  checked={form.especie_animal === op.value}
                  onChange={handleChange}
                  className="afor-radio"
                />
                {op.label}
              </label>
            ))}
          </div>
          {erros.especie_animal && (
            <div className="afor-error">{erros.especie_animal}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="afor-label d-block">Género*</label>
          <div className="d-flex gap-4">
            {[
              { label: "Macho", value: "macho" },
              { label: "Fêmea", value: "fêmea" },
              { label: "Indefinido", value: "indefinido" },
            ].map((op) => (
              <label key={op.value} className="afor-radio-label">
                <input
                  type="radio"
                  name="genero_animal"
                  value={op.value}
                  checked={form.genero_animal === op.value}
                  onChange={handleChange}
                  className="afor-radio"
                />
                {op.label}
              </label>
            ))}
          </div>
          {erros.genero_animal && (
            <div className="afor-error">{erros.genero_animal}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="afor-label">Descrição</label>
          <textarea
            name="descricao_animal"
            rows={4}
            className="form-control"
            value={form.descricao_animal}
            onChange={handleChange}
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input afor-checkbox"
            id="adotado"
            checked={!form.disponivel_animal}
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

      {erroServidor && (
        <div className="afor-error mt-3 text-end">{erroServidor}</div>
      )}

      {/* AÇÕES */}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          className="afor-btn-cancelar"
          onClick={() => navigate("/backoffice/anuncios")}
          disabled={aGuardar}
        >
          Cancelar
        </button>

        <button
          className="afor-btn-guardar"
          onClick={handleGuardar}
          disabled={aGuardar || aEnviarImagem}
        >
          {aGuardar ? "A guardar..." : "Guardar alterações"}
        </button>
      </div>
    </div>
  );
}

export default AnuncioForm;
