// context/UtilizadoresContext.jsx
import { createContext, useContext, useState } from "react";

const UtilizadoresContext = createContext();

const mockUtilizadores = [
  { id: 1, nome: "Joana Abrantes", email: "joanaabrantes@gmail.com", createdAt: "2026-06-18T10:00:00" },
  { id: 2, nome: "Ricardo Henriques", email: "ricardohenriques@gmail.com", createdAt: "2026-06-18T09:30:00" },
  { id: 3, nome: "Carlos Cruz", email: "carloscruz@gmail.com", createdAt: "2026-06-18T09:00:00" },
  { id: 4, nome: "Maria Caetano", email: "mariacaetano@gmail.com", createdAt: "2026-06-17T17:00:00" },
  { id: 5, nome: "Pedro Silva", email: "pedrosilva@gmail.com", createdAt: "2026-06-17T15:00:00" },
];

export function UtilizadoresProvider({ children }) {
  const [utilizadores, setUtilizadores] = useState(mockUtilizadores);

  const criarUtilizador = (dados) => {
    const novoId = Math.max(0, ...utilizadores.map((u) => u.id)) + 1;
    const novo = { ...dados, id: novoId, createdAt: new Date().toISOString() };
    setUtilizadores((prev) => [novo, ...prev]);
    // axios.post("/api/utilizadores", dados) -- futuramente
    return novo;
  };

  const atualizarUtilizador = (id, dados) => {
    setUtilizadores((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...dados } : u))
    );
    // axios.put(`/api/utilizadores/${id}`, dados) -- futuramente
  };

  const eliminarUtilizador = (id) => {
    setUtilizadores((prev) => prev.filter((u) => u.id !== id));
    // axios.delete(`/api/utilizadores/${id}`) -- futuramente
  };

  // Os 5 mais recentes, ordenados do mais novo para o mais antigo
  const ultimosUtilizadores = [...utilizadores]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <UtilizadoresContext.Provider
      value={{
        utilizadores,
        ultimosUtilizadores,
        criarUtilizador,
        atualizarUtilizador,
        eliminarUtilizador,
      }}
    >
      {children}
    </UtilizadoresContext.Provider>
  );
}

export function useUtilizadores() {
  return useContext(UtilizadoresContext);
}