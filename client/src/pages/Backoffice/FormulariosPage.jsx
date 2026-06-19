import { useState } from "react";
import { useNavigate } from "react-router-dom";

// DADOS MOCK — substituir por axios.get('/api/formularios') dentro do useEffect
const mockFormularios = [
  {
    id: 1,
    nome: "Joana Abrantes",
    data: "18/06/2026",
    motivacao: "A adoção não é um 'plano B', é a escolha mais bonita que alguém pode fazer por um animal.",
    animal: "Mia",
    animalFoto: "https://placekitten.com/40/40",
    email: "joana.abrantes@email.com",
    telefone: "912 345 678",
    dataNascimento: "1990-03-15",
    nif: "123456789",
    localidade: "Cascais",
    concelho: "Cascais",
    distrito: "Lisboa",
    jardim: "sim",
    outrosAnimais: "nao",
    experiencia: "sim",
  },
  {
    id: 2,
    nome: "Ricardo Henriques",
    data: "18/06/2026",
    motivacao: "A minha motivação é pura — quero dar uma segunda oportunidade a um animal que merece amor.",
    animal: "Thor",
    animalFoto: "https://placedog.net/40/40",
    email: "ricardo.h@email.com",
    telefone: "965 432 100",
    dataNascimento: "1985-07-22",
    nif: "987654321",
    localidade: "Porto",
    concelho: "Porto",
    distrito: "Porto",
    jardim: "sim",
    outrosAnimais: "sim",
    experiencia: "sim",
  },
  {
    id: 3,
    nome: "Carlos Cruz",
    data: "18/06/2026",
    motivacao: "Os laços mais fortes do mundo são os que se criam com um animal de estimação.",
    animal: "Luna",
    animalFoto: "https://placekitten.com/41/40",
    email: "carlos.cruz@email.com",
    telefone: "933 111 222",
    dataNascimento: "1978-11-05",
    nif: "456789123",
    localidade: "Braga",
    concelho: "Braga",
    distrito: "Braga",
    jardim: "nao",
    outrosAnimais: "nao",
    experiencia: "nao",
  },
];

export default function FormulariosPage() {
  const navigate = useNavigate();

  const [formularios, setFormularios] = useState(mockFormularios);
  const [search, setSearch] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [idParaEliminar, setIdParaEliminar] = useState(null);
  const [toast, setToast] = useState(false);

  // Filtra por nome ou motivação
  const resultados = formularios.filter((f) => {
    const termo = search.toLowerCase();
    return (
      f.nome.toLowerCase().includes(termo) ||
      f.motivacao.toLowerCase().includes(termo)
    );
  });

  function abrirModal(id) {
    setIdParaEliminar(id);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setIdParaEliminar(null);
  }

  function confirmarEliminar() {
    // axios.delete(`/api/formularios/${idParaEliminar}`)
    setFormularios((prev) => prev.filter((f) => f.id !== idParaEliminar));
    fecharModal();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
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
          ✓ Eliminado com sucesso!
        </div>
      )}

      {/* Título */}
      <h2 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>
        Gestão de Formulários
      </h2>

      {/* Tabela com search */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e8e0cc",
          overflow: "hidden",
        }}
      >
        {/* Search */}
        <div style={{ padding: "1rem" }}>
          <div style={{ position: "relative", maxWidth: "300px" }}>
            <span
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#aaa",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem 0.5rem 2.2rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "0.9rem",
                outline: "none",
                backgroundColor: "#fafafa",
              }}
            />
          </div>
        </div>

        {/* Tabela */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Data</th>
              <th style={thStyle}>Motivação</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {resultados.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "2rem", color: "#999" }}>
                  Nenhum formulário encontrado.
                </td>
              </tr>
            ) : (
              resultados.map((f) => (
                <tr key={f.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={tdStyle}>{f.nome}</td>
                  <td style={tdStyle}>{f.data}</td>
                  <td style={{ ...tdStyle, color: "#555", maxWidth: "300px" }}>
                    {f.motivacao.length > 50
                      ? f.motivacao.substring(0, 50) + "…"
                      : f.motivacao}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    <button
                      onClick={() => navigate(`/backoffice/formularios/editar/${f.id}`)}
                      style={badgeEditar}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => abrirModal(f.id)}
                      style={badgeEliminar}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmação */}
      {modalAberto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>⚠️</div>
            <h5 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
              Tem a certeza que deseja eliminar?
            </h5>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Esta ação é irreversível. O formulário será apagado permanentemente.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={fecharModal}
                style={{
                  padding: "0.5rem 1.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminar}
                style={{
                  padding: "0.5rem 1.5rem",
                  border: "none",
                  borderRadius: "20px",
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Sim, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos reutilizáveis
const thStyle = {
  textAlign: "left",
  padding: "0.75rem 1rem",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "#888",
  backgroundColor: "#fafafa",
};

const tdStyle = {
  padding: "0.85rem 1rem",
  fontSize: "0.92rem",
  verticalAlign: "middle",
};

const badgeEditar = {
  backgroundColor: "transparent",
  color: "#f39c12",
  border: "1.5px solid #f39c12",
  borderRadius: "20px",
  padding: "0.25rem 0.9rem",
  fontSize: "0.82rem",
  fontWeight: 600,
  cursor: "pointer",
  marginRight: "0.5rem",
};

const badgeEliminar = {
  backgroundColor: "transparent",
  color: "#e74c3c",
  border: "1.5px solid #e74c3c",
  borderRadius: "20px",
  padding: "0.25rem 0.9rem",
  fontSize: "0.82rem",
  fontWeight: 600,
  cursor: "pointer",
};
