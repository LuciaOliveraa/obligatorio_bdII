import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../Styles/ConfirmacionVotante.css';
import { updateVotoCredencial } from "../../Services/votacionServices";

function ConfirmacionVotante({ onConfirm, onCancel }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const estaHabilitado = location.state?.user;

  const updateVotanteVoto = async () => {
      try {
        await updateVotoCredencial(user.serie_credencial, user.numero_credencial, 1); /* (serie, numero, voto) */
        if (!estaHabilitado) {
          // llamar a put voto observado
        }
        navigate('/busqueda-mesa');
      } catch (error) {
        console.error("Error obteniendo votantes:", error);
      }
    };

  // tambien hay que llamar service para cambio de estado de circuito


    if (!user) {
        return <div className="confirmation-container">Cargando datos del votante...</div>;
    }
  return (
    <div className="confirmation-container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <h1>Confirmación de habilitación</h1>
      <div className="confirmation-details">
        <p>¿Desea habilitar al votante?</p>
        <p><strong>Nombre:</strong> {user.nombre} {user.apellido} </p>
        <p><strong>Credencial:</strong> {user.serie_credencial} {user.numero_credencial} </p>
        <p><strong>¿Su voto fue realizado?</strong> { user.voto_realizado == 0 ? <p> no </p> : <p> sí </p>} </p>
      </div>
      <div className="confirmation-buttons">
        <button className="cancel-button" onClick={() => navigate('/busqueda-mesa')}>Cancelar</button>
        <button className="confirm-button" onClick={() => updateVotanteVoto()}>Sí</button>
      </div>
    </div>
  );
}

export default ConfirmacionVotante;
