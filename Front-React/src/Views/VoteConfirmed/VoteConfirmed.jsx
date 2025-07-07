"Pantalla de confirmación de voto"

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useVote } from '../../Context/VoteContext';
import VoteButton from '../../Components/VoteButton/VoteButton';
import { ROUTES } from '../../Constants/Routes';
import '../../Styles/Common.css';
import '../../Styles/VoteConfirmed.css';
import { updateEstadoCircuito } from '../../Services/mesaServices';

const VoteConfirmed = () => {
  const { voteType, selectedPartido, selectedList, resetVote } = useVote();
  const navigate = useNavigate();

  const getVoteDetails = () => {
    if (voteType === 'lista') {
      return (
        <>
          <p><strong>Partido:</strong> {selectedPartido}</p>
          <p><strong>Lista:</strong> {selectedList}</p>
        </>
      );
    }
    return <p><strong>Tipo de voto:</strong> {voteType}</p>;
  };

  // Función para que react espere antes de navegar a la siguiente página
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleReturn = async () => {
    resetVote();
    // Cambia estado del totem circuito a Esperando.
    await updateEstadoCircuito(localStorage.getItem("circuito"), 2);
    sleep(1000);
    navigate(ROUTES.WELCOME);
  };

  return (
    <div className="vote-confirmed-container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <h1>Su voto fue registrado con éxito</h1>
      <div className="vote-details">
        {getVoteDetails()}
      </div>
      <p>Muchas gracias por su tiempo</p>
      <VoteButton
        label="Volver al inicio"
        onClick={handleReturn}
        variant="primary"
        fullWidth
      />
    </div>
  );
};

export default VoteConfirmed;
