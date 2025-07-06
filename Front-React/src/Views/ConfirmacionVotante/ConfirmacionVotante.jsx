import React from "react";
import { useLocation } from "react-router-dom";
import '../../Styles/ConfirmacionVotante.css';

function ConfirmacionVotante({ onConfirm, onCancel }) {
  const location = useLocation();
  const user = location.state?.user;

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
        <button className="cancel-button" onClick={onCancel}>Cancelar</button>
        <button className="confirm-button" onClick={() => onConfirm(user)}>Sí</button>
      </div>
    </div>
  );
}

export default ConfirmacionVotante;
