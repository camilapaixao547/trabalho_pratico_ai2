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

    const [form, setForm] = useState({
        id_user: utilizador?.id ?? null,
        id_animal: animal?.id ?? null,
        formulario_quintal: null,
        formulario_outros_animais: null,
        formulario_experiencia: null,
        formulario_descricao: "",
    });

    const [toast, setToast] = useState(false);

    if (!utilizador || !animal) {
        return (
            <div className="text-muted">
                Para criar um formulário, inicia o processo a partir da Dashboard.
            </div>
        );
    }

    const handleChange = (campo, valor) => {
        setForm((prev) => ({ ...prev, [campo]: valor }));
    };

    const handleGuardar = async () => {
        try {
            await criarFormulario(form);
            setToast(true);
            setTimeout(() => navigate("/backoffice/formularios"), 1500);
        } catch (err) {
            console.error("Erro ao guardar formulário:", err);
        }
    };

    return (
        <div style={{ backgroundColor: "#FAF6EC", minHeight: "100vh", padding: "2rem" }}>

            {toast && (
                <div style={{
                    position: "fixed", top: "1.5rem", right: "1.5rem",
                    backgroundColor: "#2ecc71", color: "#fff",
                    padding: "0.75rem 1.5rem", borderRadius: "8px",
                    fontWeight: 600, zIndex: 9999, boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}>
                    ✓ Formulário guardado com sucesso!
                </div>
            )}

            <h2 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>
                Novo Formulário de Adoção
            </h2>

            {/* Banner do animal */}
            <div style={{
                backgroundColor: "#eaf7f0", border: "1px solid #c3e8d5",
                borderRadius: "12px", padding: "1rem 1.5rem",
                display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem",
            }}>
                {animal.fotografia_animal && (
                    <img
                        src={animal.fotografia_animal}
                        alt={animal.nome_animal}
                        style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
                    />
                )}
                <div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>Processo de adoção de</div>
                    <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{animal.nome_animal}</div>
                </div>
            </div>

            {/* Dados do candidato (só leitura) */}
            <div style={secaoStyle}>
                <div style={secaoHeaderStyle}>
                    <span style={iconeVerde}>👤</span>
                    <span style={{ fontWeight: 600 }}>Candidato</span>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 1.25rem" }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                        <label style={labelStyle}>Nome</label>
                        <input type="text" value={utilizador.nome_cliente ?? ""} disabled style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Email</label>
                        <input type="email" value={utilizador.email_cliente ?? ""} disabled style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Telefone</label>
                        <input type="text" value={utilizador.telefone_cliente ?? ""} disabled style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Localidade</label>
                        <input
                            type="text"
                            value={[utilizador.localidade_cliente, utilizador.concelho_cliente, utilizador.distrito_cliente].filter(Boolean).join(", ")}
                            disabled
                            style={inputStyle}
                        />
                    </div>
                </div>
            </div>

            {/* Sobre o Lar */}
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
                        <RadioOpcao name="formulario_quintal" valor={true} selecionado={form.formulario_quintal} onChange={(v) => handleChange("formulario_quintal", v)} />
                        <RadioOpcao name="formulario_quintal" valor={false} selecionado={form.formulario_quintal} onChange={(v) => handleChange("formulario_quintal", v)} />
                    </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
                        Tem outros animais em casa?
                    </label>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                        <RadioOpcao name="formulario_outros_animais" valor={true} selecionado={form.formulario_outros_animais} onChange={(v) => handleChange("formulario_outros_animais", v)} />
                        <RadioOpcao name="formulario_outros_animais" valor={false} selecionado={form.formulario_outros_animais} onChange={(v) => handleChange("formulario_outros_animais", v)} />
                    </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
                        Tem experiência prévia com animais?
                    </label>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                        <RadioOpcao name="formulario_experiencia" valor={true} selecionado={form.formulario_experiencia} onChange={(v) => handleChange("formulario_experiencia", v)} />
                        <RadioOpcao name="formulario_experiencia" valor={false} selecionado={form.formulario_experiencia} onChange={(v) => handleChange("formulario_experiencia", v)} />
                    </div>
                </div>

                <div>
                    <label style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
                        Por que razão deseja adotar?
                    </label>
                    <textarea
                        value={form.formulario_descricao}
                        onChange={(e) => handleChange("formulario_descricao", e.target.value)}
                        rows={5}
                        style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }}
                    />
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
                <button
                    onClick={() => navigate("/backoffice/formularios")}
                    style={{
                        padding: "0.5rem 1.5rem", border: "1.5px solid #ccc",
                        borderRadius: "20px", backgroundColor: "transparent",
                        cursor: "pointer", fontWeight: 500, fontSize: "0.9rem",
                    }}
                >
                    Cancelar
                </button>
                <button
                    onClick={handleGuardar}
                    style={{
                        padding: "0.5rem 1.75rem", border: "none",
                        borderRadius: "20px", background: "linear-gradient(135deg, #2ecc71, #f1c40f)",
                        color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: "0.9rem",
                    }}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
}

function RadioOpcao({ name, valor, selecionado, onChange }) {
    const label = valor === true ? "Sim" : "Não";
    return (
        <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontSize: "0.92rem" }}>
            <input
                type="radio"
                name={name}
                checked={selecionado === valor}
                onChange={() => onChange(valor)}
                style={{ accentColor: "#2ecc71", width: 16, height: 16 }}
            />
            {label}
        </label>
    );
}

const secaoStyle = {
    backgroundColor: "#fff", borderRadius: "12px",
    border: "1px solid #e8e0cc", padding: "1.25rem 1.5rem",
};

const secaoHeaderStyle = {
    display: "flex", alignItems: "center",
    gap: "0.6rem", marginBottom: "0.75rem", fontSize: "1rem",
};

const iconeVerde = {
    fontSize: "1.1rem", backgroundColor: "#eaf7f0",
    padding: "0.3rem", borderRadius: "6px",
};

const labelStyle = {
    fontSize: "0.88rem", fontWeight: 600,
    color: "#333", marginBottom: "0.35rem", display: "block",
};

const inputStyle = {
    width: "100%", padding: "0.55rem 0.85rem",
    border: "1px solid #ddd", borderRadius: "8px",
    fontSize: "0.9rem", outline: "none",
    backgroundColor: "#fff", boxSizing: "border-box",
};