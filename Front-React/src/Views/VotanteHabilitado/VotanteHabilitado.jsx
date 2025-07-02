import React from 'react';
import '../../Styles/VotanteHabilitado.css';

function VotanteHabilitado() {
  return (
    <div className="votante-container">
      <img src="/logo.png" alt="Escudo de Uruguay" />
      <h1>Usuario habilitado para votar</h1>
      <button onClick={() => window.history.back()}>Volver</button>
    </div>
  );
}

export default VotanteHabilitado;
