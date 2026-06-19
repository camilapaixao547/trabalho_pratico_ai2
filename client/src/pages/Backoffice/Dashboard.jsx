import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnuncios } from "../../context/AnunciosContext";
import { useUtilizadores } from "../../context/UtilizadoresContext";
import { useFormularios } from "../../context/FormulariosContext";
import PainelNovosUtilizadores from '../../components/CompBackoffice/PainelNovosUtilizadores'
import PainelNovosFormularios from '../../components/CompBackoffice/PainelNovosFormularios'
import IniciarAdocao from '../../components/CompBackoffice/IniciarAdocao'
import CardsEstatisticas from '../../components/CompBackoffice/CardsEstatisticas'
import "./Dashboard.css";

function Dashboard() {
  const { anunciosAtivos, adocoesConcluidas } = useAnuncios();
  const { ultimosUtilizadores } = useUtilizadores();
  const { novosFormularios } = useFormularios();

  const stats = {
    adocoesConcluidas: adocoesConcluidas.length,
    anunciosAtivos: anunciosAtivos.length,
    formulariosPendentes: novosFormularios.length,
  };

  return (
    <div className="dash-wrapper">
      <CardsEstatisticas stats={stats} />

      <BotoesAcao />

      <PainelNovosFormularios />

      <PainelNovosUtilizadores />

      <IniciarAdocao />
    </div>
  );
}

function BotoesAcao() {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-end gap-2 mb-4">
      <button
        className="btn dash-btn-primary"
        onClick={() => navigate("/backoffice/anuncios/criar")}
      >
        + Adicionar Anúncio
      </button>
      <button
        className="btn dash-btn-primary"
        onClick={() => navigate("/backoffice/utilizadores/criar")}
      >
        + Adicionar Utilizador
      </button>
    </div>
  );
}

export default Dashboard;