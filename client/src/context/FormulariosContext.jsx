import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FormulariosContext = createContext();

export function FormulariosProvider({ children }) {
  const [formularios, setFormularios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar todos os formulários (com Animal e User incluídos)
  useEffect(() => {
    axios.get("/api/formularios")
      .then((res) => {
        // protege contra respostas inesperadas da API
        const data = Array.isArray(res.data) ? res.data : res.data.formularios ?? [];
        setFormularios(data);
      })
      .catch((err) => console.error("Erro ao carregar formulários:", err))
      .finally(() => setLoading(false));
  }, []);

  const criarFormulario = async (dados) => {
    const res = await axios.post("/api/formularios", dados);
    setFormularios((prev) => [res.data, ...prev]);
    return res.data;
  };

  const marcarComoVisto = async (id) => {
    await axios.patch(`/api/formularios/${id}/lido`);
    setFormularios((prev) =>
      prev.map((f) => (f.id_formulario === id ? { ...f, formulario_lido: true } : f))
    );
  };

  const atualizarFormulario = async (id, dados) => {
    await axios.put(`/api/formularios/${id}`, dados);
    setFormularios((prev) =>
      prev.map((f) => (f.id_formulario === id ? { ...f, ...dados } : f))
    );
  };

  const eliminarFormulario = async (id) => {
    await axios.delete(`/api/formularios/${id}`);
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