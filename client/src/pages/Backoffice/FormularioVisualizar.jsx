import { useNavigate, useParams } from "react-router-dom";
import { useFormularios } from "../../context/FormulariosContext";

export default function FormularioVisualizar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { formularios } = useFormularios();

  const form = formularios.find((f) => f.id === parseInt(id));

  if (!form) {
    return (
      <div style={{ padding: "2rem", color: "#999" }}>
        Formulário não encontrado.
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FAF6EC", minHeight: "100vh", padding: "2rem" }}>
      {/* Título */}
      <h2 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>
        Detalhes do Formulário de Adoção
      </h2>

      {/* Banner do animal */}
      <div
        style={{
          backgroundColor: "#eaf7f0",
          border: "1px solid #c3e8d5",
          borderRadius: "12px",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <img
          src={form.animalFoto}
          alt={form.animal}
          style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
        />
        <div>
          <div style={{ fontSize: "0.8rem", color: "#666" }}>Processo de adoção de</div>
          <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{form.animal}</div>
        </div>
      </div>

      {/* ── SECÇÃO 1: Dados Pessoais ── */}
      <div style={secaoStyle}>
        <div style={secaoHeaderStyle}>
          <span style={iconeVerde}>👤</span>
          <span style={{ fontWeight: 600 }}>Dados Pessoais</span>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 1.25rem" }} />

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Nome</label>
          <input type="text" value={form.nome} disabled style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" value={form.email} disabled style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Telefone</label>
            <input type="text" value={form.telefone} disabled style={inputStyle} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={labelStyle}>Data de Nascimento</label>
            <input type="date" value={form.dataNascimento} disabled style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>NIF</label>
            <input type="text" value={form.nif} disabled style={inputStyle} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={labelStyle}>Localidade</label>
            <input type="text" value={form.localidade} disabled style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Concelho</label>
            <input type="text" value={form.concelho} disabled style={inputStyle} />
          </div>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label style={labelStyle}>Distrito</label>
          <input type="text" value={form.distrito} disabled style={inputStyle} />
        </div>
      </div>

      {/* ── SECÇÃO 2: Sobre o Lar ── */}
      <div style={{ ...secaoStyle, marginTop: "1.5rem" }}>
        <div style={secaoHeaderStyle}>
          <span style={iconeVerde}>🏠</span>
          <span style={{ fontWeight: 600 }}>Sobre o Lar</span>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 1.25rem" }} />

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
            Tem jardim ou quintal?
          </label>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <RadioOpcaoDisabled valor="sim" selecionado={form.jardim} />
            <RadioOpcaoDisabled valor="nao" selecionado={form.jardim} />
          </div>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
            Tem outros animais em casa?
          </label>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <RadioOpcaoDisabled valor="sim" selecionado={form.outrosAnimais} />
            <RadioOpcaoDisabled valor="nao" selecionado={form.outrosAnimais} />
          </div>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
            Tem experiência prévia com animais?
          </label>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <RadioOpcaoDisabled valor="sim" selecionado={form.experiencia} />
            <RadioOpcaoDisabled valor="nao" selecionado={form.experiencia} />
          </div>
        </div>

        <div>
          <label style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
            Por que razão deseja adotar?
          </label>
          <textarea
            value={form.motivacao}
            disabled
            rows={5}
            style={{
              ...inputStyle,
              resize: "none",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
          />
        </div>
      </div>

      {/* Ações */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1.5rem",
        }}
      >
        <button
          onClick={() => navigate("/backoffice/formularios")}
          style={{
            padding: "0.5rem 1.5rem",
            border: "1.5px solid #ccc",
            borderRadius: "20px",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

// Radio "Sim"/"Não" em modo leitura
function RadioOpcaoDisabled({ valor, selecionado }) {
  const label = valor === "sim" ? "Sim" : "Não";
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.92rem" }}>
      <input
        type="radio"
        checked={selecionado === valor}
        disabled
        style={{ accentColor: "#2ecc71", width: 16, height: 16 }}
      />
      {label}
    </label>
  );
}

// Estilos partilhados (idênticos ao FormularioEditarPage)
const secaoStyle = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  border: "1px solid #e8e0cc",
  padding: "1.25rem 1.5rem",
};

const secaoHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  marginBottom: "0.75rem",
  fontSize: "1rem",
};

const iconeVerde = {
  fontSize: "1.1rem",
  backgroundColor: "#eaf7f0",
  padding: "0.3rem",
  borderRadius: "6px",
};

const labelStyle = {
  fontSize: "0.88rem",
  fontWeight: 600,
  color: "#333",
  marginBottom: "0.35rem",
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "0.55rem 0.85rem",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "0.9rem",
  outline: "none",
  backgroundColor: "#f5f5f5",
  color: "#555",
  boxSizing: "border-box",
};