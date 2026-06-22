import { createContext, useContext, useState, useEffect } from "react";
import api from '../api/api'

const FormulariosContext = createContext();

export function FormulariosProvider({ children }) {
  const [formularios, setFormularios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/formularios")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.formularios ?? [];
        setFormularios(data);
      })
      .catch((err) => console.error("Erro ao carregar formulários:", err))
      .finally(() => setLoading(false));
  }, []);

  const criarFormulario = async (dados) => {
    const res = await api.post("/formularios", dados);
    setFormularios((prev) => [res.data, ...prev]);
    return res.data;
  };

  const marcarComoVisto = async (id) => {
    await api.patch(`/formularios/${id}/lido`);
    setFormularios((prev) =>
      prev.map((f) => (f.id_formulario === id ? { ...f, formulario_lido: true } : f))
    );
  };

  const atualizarFormulario = async (id, dados) => {
    await api.put(`/formularios/${id}`, dados);
    setFormularios((prev) =>
      prev.map((f) => (f.id_formulario === id ? { ...f, ...dados } : f))
    );
  };

  const eliminarFormulario = async (id) => {
    await api.delete(`/formularios/${id}`);
    setFormularios((prev) => prev.filter((f) => f.id_formulario !== id));
  };

  const novosFormularios = formularios.filter((f) => !f.formulario_lido);

  return (
    <FormulariosContext.Provider
      value={{
        formularios,
        novosFormularios,
        loading,
        criarFormulario,
        marcarComoVisto,
        atualizarFormulario,
        eliminarFormulario,
      }}
    >
      {children}
    </FormulariosContext.Provider>
  );
}

export function useFormularios() {
  return useContext(FormulariosContext);
}