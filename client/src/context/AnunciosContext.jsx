// context/AnunciosContext.jsx
import { createContext, useContext, useState } from "react";

const AnunciosContext = createContext();

const mockAnuncios = [
  { id: 1, nome: "Mia", idade: "3 anos", especie: "Gato", genero: "Femea", descricao: "Gata muito carinhosa e brincalhona.", adotado: false, imagem: "https://placedog.net/300/200?id=10" },
  { id: 2, nome: "Buddy", idade: "2 anos", especie: "Cão", genero: "Macho", descricao: "Cão brincalhão e leal.", adotado: false, imagem: "https://placedog.net/300/200?id=2" },
  { id: 3, nome: "Bela", idade: "3 anos", especie: "Cão", genero: "Femea", descricao: "Calma e sociável com crianças.", adotado: false, imagem: "https://placedog.net/300/200?id=3" },
];

export function AnunciosProvider({ children }) {
  const [anuncios, setAnuncios] = useState(mockAnuncios);

  // axios.get("/api/anuncios").then(res => setAnuncios(res.data)) -- futuramente

  const atualizarAnuncio = (id, dadosAtualizados) => {
    setAnuncios((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...dadosAtualizados } : a))
    );
    // axios.put(`/api/anuncios/${id}`, dadosAtualizados) -- futuramente
  };

  const criarAnuncio = (novoAnuncio) => {
    const novoId = Math.max(0, ...anuncios.map((a) => a.id)) + 1;
    setAnuncios((prev) => [...prev, { ...novoAnuncio, id: novoId, adotado: false }]);
    // axios.post("/api/anuncios", novoAnuncio) -- futuramente
  };

  const eliminarAnuncio = (id) => {
    setAnuncios((prev) => prev.filter((a) => a.id !== id));
    // axios.delete(`/api/anuncios/${id}`) -- futuramente
  };

  const anunciosAtivos = anuncios.filter((a) => !a.adotado);
  const adocoesConcluidas = anuncios.filter((a) => a.adotado);

  return (
    <AnunciosContext.Provider
      value={{
        anuncios,
        anunciosAtivos,
        adocoesConcluidas,
        atualizarAnuncio,
        criarAnuncio,
        eliminarAnuncio,
      }}
    >
      {children}
    </AnunciosContext.Provider>
  );
}

export function useAnuncios() {
  return useContext(AnunciosContext);
}