import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../Styles/ConfirmacionVotante.css';
import { updateVotoCredencial } from "../../Services/votacionServices";
import { updateVotoObservado } from "../../Services/mesaServices";

function ConfirmacionVotante({ onConfirm, onCancel }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const estaHabilitado = location.state?.estaHabilitado;

  // Función para que react espere antes de navegar a la siguiente página
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const habilitarVoto = async () => {
      try {
        await updateVotoCredencial(user.serie_credencial, user.numero_credencial, 1); /* (serie, numero, voto) */
        await sleep(2000);
        
        console.log('esta habilitado: ', estaHabilitado);
        console.log('user: ', user);
        if (!estaHabilitado) {
          console.log('entre al if de observado!');
          // Si el votante no está habilidado en el circuito correspondiente, se marca en la credencial voto observado
          await updateVotoObservado(user.serie_credencial, user.numero_credencial);
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
        <button className="confirm-button" onClick={() => habilitarVoto()}>Sí</button>
      </div>
    </div>
  );
}

export default ConfirmacionVotante;
