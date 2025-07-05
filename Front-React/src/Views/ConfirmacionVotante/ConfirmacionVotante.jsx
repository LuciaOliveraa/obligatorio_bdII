import React from "react";
import '../../Styles/ConfirmacionVotante.css';

function ConfirmacionVotante({ user, onConfirm, onCancel }) {
    if (!user) {
        return <div className="confirmation-container">Cargando datos del votante...</div>;
    }
  return (
    <div className="confirmation-container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <h1>Confirmación de habilitación</h1>
      <div className="confirmation-details">
        <p>¿Desea habilitar al votante?</p>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Credencial:</strong> {user.ci}</p>
      </div>
      <div className="confirmation-buttons">
        <button className="confirm-button" onClick={() => onConfirm(user)}>Sí</button>
        <button className="cancel-button" onClick={onCancel}>No</button>
      </div>
    </div>
  );
}

export default ConfirmacionVotante;
