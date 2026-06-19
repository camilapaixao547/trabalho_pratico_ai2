import { useNavigate, useParams } from "react-router-dom";
import { useAnuncios } from "../../context/AnunciosContext";
import "./AnuncioForm.css"; // reaproveita o mesmo CSS

function AdocaoDetalhe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { anuncios } = useAnuncios();

  const anuncio = anuncios.find((a) => a.id === Number(id));

  if (!anuncio) {
    return <p className="text-muted">Anúncio não encontrado.</p>;
  }

  return (
    <div className="afor-wrapper">
      <h2 className="afor-title">Detalhes da Adoção</h2>

      <div className="afor-panel mb-4">
        <div className="afor-section-header">
          <i className="bi bi-person-circle" />
          <span>Fotografia</span>
        </div>
        <div
          className="afor-avatar"
          style={{
            backgroundImage: `url(${anuncio.imagem})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "default",
          }}
        />
      </div>

      <div className="afor-panel">
        <div className="afor-section-header">
          <i className="bi bi-person-circle" />
          <span>Dados</span>
        </div>

        <div className="mb-3">
          <label className="afor-label">Nome</label>
          <input type="text" className="form-control" value={anuncio.nome} disabled />
        </div>

        <div className="mb-3">
          <label className="afor-label">Idade</label>
          <input type="text" className="form-control" value={anuncio.idade} disabled />
        </div>

        <div className="mb-3">
          <label className="afor-label d-block">Espécie</label>
          <div className="d-flex gap-4">
            {["Cão", "Gato"].map((op) => (
              <label key={op} className="afor-radio-label">
                <input
                  type="radio"
                  checked={anuncio.especie === op}
                  disabled
                  className="afor-radio"
                />
                {op}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="afor-label d-block">Género</label>
          <div className="d-flex gap-4">
            <label className="afor-radio-label">
              <input type="radio" checked={anuncio.genero === "Macho"} disabled className="afor-radio" />
              Macho
            </label>
            <label className="afor-radio-label">
              <input type="radio" checked={anuncio.genero === "Femea"} disabled className="afor-radio" />
              Fêmea
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="afor-label">Descrição</label>
          <textarea rows={4} className="form-control" value={anuncio.descricao} disabled />
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input afor-checkbox" checked disabled />
          <label className="form-check-label afor-checkbox-label">Adotado</label>
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