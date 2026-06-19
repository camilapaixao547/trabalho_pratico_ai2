// context/UtilizadoresContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const UtilizadoresContext = createContext();

export function UtilizadoresProvider({ children }) {
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/users")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setUtilizadores(data);
      })
      .catch((err) => console.error("Erro ao carregar utilizadores:", err))
      .finally(() => setLoading(false));
  }, []);

  const criarUtilizador = async (dados) => {
    const res = await api.post("/users", dados);
    setUtilizadores((prev) => [res.data, ...prev]);
    return res.data;
  };

  const atualizarUtilizador = async (id, dados) => {
    const res = await api.put(`/users/${id}`, dados);
    setUtilizadores((prev) =>
      prev.map((u) => (u.id === id ? res.data : u))
    );
    return res.data;
  };

  const eliminarUtilizador = async (id) => {
    await api.delete(`/users/${id}`);
    setUtilizadores((prev) => prev.filter((u) => u.id !== id));
  };

  const ultimosUtilizadores = [...utilizadores]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <UtilizadoresContext.Provider
      value={{
        utilizadores,
        ultimosUtilizadores,
        loading,
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