import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormularios } from "../../context/FormulariosContext";

const distritos = [
    "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra",
    "Évora", "Faro", "Guarda", "Leiria", "Lisboa", "Portalegre", "Porto",
    "Santarém", "Setúbal", "Viana do Castelo", "Vila Real", "Viseu",
];

export default function FormularioCriarPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { criarFormulario } = useFormularios();

    const { utilizador, animal } = location.state || {};

    // Se não vier do fluxo "Iniciar Adoção", não há dados — redireciona
    if (!utilizador || !animal) {
        return (
            <div className="text-muted">
                Para criar um formulário, inicia o processo a partir da Dashboard.
            </div>
        );
    }

    const [form, setForm] = useState({
        utilizadorId: utilizador.id,
        nome: utilizador.nome,
        email: utilizador.email,
        telefone: "",
        dataNascimento: "",
        nif: "",
        localidade: "",
        concelho: "",
        distrito: "",
        jardim: "",
        outrosAnimais: "",
        experiencia: "",
        motivacao: "",
        animalId: animal.id,
        animal: animal.nome,
        animalFoto: animal.imagem,
    });

    const [toast, setToast] = useState(false);

    const handleChange = (campo, valor) => {
        setForm((prev) => ({ ...prev, [campo]: valor }));
    };

    const handleGuardar = () => {
        criarFormulario(form);
        setToast(true);
        setTimeout(() => {
            navigate("/backoffice/formularios");
        }, 1500);
    };

    if (!form) {
        return (
            <div style={{ padding: "2rem", color: "#999" }}>
                A carregar formulário...
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#FAF6EC", minHeight: "100vh", padding: "2rem" }}>

            {/* Toast de sucesso */}
            {toast && (
                <div
                    style={{
                        position: "fixed",
                        top: "1.5rem",
                        right: "1.5rem",
                        backgroundColor: "#2ecc71",
                        color: "#fff",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "8px",
                        fontWeight: 600,
                        zIndex: 9999,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                >
                    ✓ Formulário guardado com sucesso!
                </div>
            )}

            {/* Título */}
            <h2 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>
                Editar Formulário de Adoção
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
                {/* Cabeçalho da secção */}
                <div style={secaoHeaderStyle}>
                    <span style={iconeVerde}>👤</span>
                    <span style={{ fontWeight: 600 }}>Dados Pessoais</span>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 1.25rem" }} />

                {/* Nome */}
                <div style={{ marginBottom: "1rem" }}>
                    <label style={labelStyle}>Nome*</label>
                    <input
                        type="text"
                        value={form.nome}
                        onChange={(e) => handleChange("nome", e.target.value)}
                        style={inputStyle}
                    />
                </div>

                {/* Email + Telefone */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                        <label style={labelStyle}>Email*</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Telefone</label>
                        <input
                            type="text"
                            value={form.telefone}
                            onChange={(e) => handleChange("telefone", e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Data de Nascimento + NIF */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                        <label style={labelStyle}>Data de Nascimento</label>
                        <input
                            type="date"
                            value={form.dataNascimento}
                            onChange={(e) => handleChange("dataNascimento", e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>NIF</label>
                        <input
                            type="text"
                            value={form.nif}
                            onChange={(e) => handleChange("nif", e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Localidade + Concelho */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                        <label style={labelStyle}>Localidade</label>
                        <input
                            type="text"
                            value={form.localidade}
                            onChange={(e) => handleChange("localidade", e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Concelho</label>
                        <input
                            type="text"
                            value={form.concelho}
                            onChange={(e) => handleChange("concelho", e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Distrito */}
                <div style={{ marginBottom: "0.5rem" }}>
                    <label style={labelStyle}>Distrito</label>
                    <div style={{ position: "relative" }}>
                        <select
                            value={form.distrito}
                            onChange={(e) => handleChange("distrito", e.target.value)}
                            style={{ ...inputStyle, appearance: "none", paddingRight: "2.5rem", cursor: "pointer" }}
                        >
                            <option value="">Selecionar...</option>
                            {distritos.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                        <span
                            style={{
                                position: "absolute",
                                right: "0.9rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none",
                                color: "#888",
                            }}
                        >
                            ▾
                        </span>
                    </div>
                </div>
            </div>

            {/* ── SECÇÃO 2: Sobre o Lar ── */}
            <div style={{ ...secaoStyle, marginTop: "1.5rem" }}>
                <div style={secaoHeaderStyle}>
                    <span style={iconeVerde}>🏠</span>
                    <span style={{ fontWeight: 600 }}>Sobre o Lar</span>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 1.25rem" }} />

                {/* Jardim ou quintal */}
                <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
                        Tem jardim ou quintal?
                    </label>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                        <RadioOpcao
                            name="jardim"
                            valor="sim"
                            selecionado={form.jardim}
                            onChange={(v) => handleChange("jardim", v)}
                        />
                        <RadioOpcao
                            name="jardim"
                            valor="nao"
                            selecionado={form.jardim}
                            onChange={(v) => handleChange("jardim", v)}
                        />
                    </div>
                </div>

                {/* Outros animais */}
                <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
                        Tem outros animais em casa?
                    </label>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                        <RadioOpcao
                            name="outrosAnimais"
                            valor="sim"
                            selecionado={form.outrosAnimais}
                            onChange={(v) => handleChange("outrosAnimais", v)}
                        />
                        <RadioOpcao
                            name="outrosAnimais"
                            valor="nao"
                            selecionado={form.outrosAnimais}
                            onChange={(v) => handleChange("outrosAnimais", v)}
                        />
                    </div>
                </div>

                {/* Experiência */}
                <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
                        Tem experiência prévia com animais?
                    </label>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                        <RadioOpcao
                            name="experiencia"
                            valor="sim"
                            selecionado={form.experiencia}
                            onChange={(v) => handleChange("experiencia", v)}
                        />
                        <RadioOpcao
                            name="experiencia"
                            valor="nao"
                            selecionado={form.experiencia}
                            onChange={(v) => handleChange("experiencia", v)}
                        />
                    </div>
                </div>

                {/* Motivação */}
                <div>
                    <label style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
                        Por que razão deseja adotar?
                    </label>
                    <textarea
                        value={form.motivacao}
                        onChange={(e) => handleChange("motivacao", e.target.value)}
                        rows={5}
                        style={{
                            ...inputStyle,
                            resize: "vertical",
                            fontFamily: "inherit",
                            lineHeight: 1.5,
                        }}
                    />
                </div>
            </div>

            {/* Botões de ação */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "1rem",
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
                    Cancelar
                </button>
                <button
                    onClick={handleGuardar}
                    style={{
                        padding: "0.5rem 1.75rem",
                        border: "none",
                        borderRadius: "20px",
                        background: "linear-gradient(135deg, #2ecc71, #f1c40f)",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                    }}
                >
                    Guardar Alterações
                </button>
            </div>
        </div>
    );
}

// Componente auxiliar para radio buttons com label "Sim"/"Não"
function RadioOpcao({ name, valor, selecionado, onChange }) {
    const label = valor === "sim" ? "Sim" : "Não";
    return (
        <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontSize: "0.92rem" }}>
            <input
                type="radio"
                name={name}
                value={valor}
                checked={selecionado === valor}
                onChange={() => onChange(valor)}
                style={{ accentColor: "#2ecc71", width: 16, height: 16 }}
            />
            {label}
        </label>
    );
}

// Estilos partilhados
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
    backgroundColor: "#fff",
    boxSizing: "border-box",
};
