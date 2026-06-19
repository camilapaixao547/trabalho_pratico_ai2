// context/FormulariosContext.jsx
import { createContext, useContext, useState } from "react";

const FormulariosContext = createContext();

const mockFormularios = [
  {
    id: 1,
    utilizadorId: 1,
    nome: "Joana Abrantes",
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
    motivacao: "A adoção não é um 'plano B' para nós...",
    animalId: 1,
    animal: "Mia",
    animalFoto: "https://placedog.net/300/200?id=10",
    data: "18/06/2026",
    visto: false,
  },
  {
    id: 2,
    utilizadorId: 2,
    nome: "Ricardo Henriques",
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
    motivacao: "A minha motivação é pura e simplesme...",
    animalId: 2,
    animal: "Buddy",
    animalFoto: "https://placedog.net/300/200?id=2",
    data: "18/06/2026",
    visto: false,
  },
  {
    id: 3,
    utilizadorId: 3,
    nome: "Carlos Cruz",
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
    motivacao: "os laços mais fortes do mundo...",
    animalId: 3,
    animal: "Bela",
    animalFoto: "https://placedog.net/300/200?id=3",
    data: "18/06/2026",
    visto: false,
  },
];

export function FormulariosProvider({ children }) {
  const [formularios, setFormularios] = useState(mockFormularios);

  const criarFormulario = (dados) => {
    const novoId = Math.max(0, ...formularios.map((f) => f.id)) + 1;
    const novo = { ...dados, id: novoId, visto: false, data: new Date().toLocaleDateString("pt-PT") };
    setFormularios((prev) => [novo, ...prev]);
    // axios.post("/api/formularios", dados) -- futuramente
    return novo;
  };

  const marcarComoVisto = (id) => {
    setFormularios((prev) =>
      prev.map((f) => (f.id === id ? { ...f, visto: true } : f))
    );
    // axios.patch(`/api/formularios/${id}`, { visto: true }) -- futuramente
  };

  const atualizarFormulario = (id, dados) => {
    setFormularios((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...dados } : f))
    );
    // axios.put(`/api/formularios/${id}`, dados) -- futuramente
  };

  const eliminarFormulario = (id) => {
    setFormularios((prev) => prev.filter((f) => f.id !== id));
  };

  const novosFormularios = formularios.filter((f) => !f.visto);

  return (
    <FormulariosContext.Provider
      value={{
        formularios,
        novosFormularios,
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