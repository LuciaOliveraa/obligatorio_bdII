import React from 'react';
import '../../Styles/VotanteHabilitado.css';
import { useNavigate } from 'react-router-dom';

function VotanteHabilitado() {
  const navigate = useNavigate();

  return (
    <div className="votante-container">
      <img src="/logo.png" alt="Escudo de Uruguay" />
      <h1>Usuario habilitado para votar</h1>
      <button onClick={() => navigate('/busqueda-mesa')}>Volver</button>
    </div>
  );
}

// <button onClick={() => window.history.back()}>Volver</button>

export default VotanteHabilitado;
