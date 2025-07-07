import React from 'react';
import '../../Styles/VotanteHabilitado.css';
import '../../Styles/Common.css';
import { useLocation, useNavigate } from 'react-router-dom';

function InfoLoginCircuito() {
  const navigate = useNavigate();
  const location = useLocation();
  const userCircuito = location.state.usuarioCircuito;
  const passCircuito = location.state.passCircuito;

  return (
    <div className="votante-container">
      <img src="/logo.png" alt="Escudo de Uruguay" />
      <h1>Información de inicio sesión de su circuito: </h1>
        <p><strong>Usuario:</strong> {userCircuito}</p>
        <p><strong>Contraseña:</strong> {passCircuito}</p>
      <button onClick={() => navigate('/busqueda-mesa')}>Continuar</button>
    </div>
  );
}

// <button onClick={() => window.history.back()}>Volver</button>

export default InfoLoginCircuito;
