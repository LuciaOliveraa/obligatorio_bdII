"En esta pantalla el usuario selecciona si su voto será anulado, blanco o lista."

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useVote } from '../../Context/VoteContext';
import VoteButton from '../../Components/VoteButton/VoteButton';
import { ROUTES } from '../../Constants/Routes';
import '../../Styles/Common.css';
import '../../Styles/SelectVoteType.css';
import '../../Styles/VotanteHabilitado.css';
import { getVoteTypes } from "../../Services/totemServices";
import { useEstadoCircuito } from '../../Context/EstadoCircuitoContext';

const SelectVoteType = () => {
  const { setVoteType, resetVote } = useVote();
  const { updateEstadoCircuitoContext, estadoCircuito } = useEstadoCircuito();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [voteTypes, setVoteTypes] = useState([]);

  const fetchVoteTypes = async () => {
  try{
    const data = await getVoteTypes();
    setVoteTypes(data);
  }catch(error){
    console.log("Error")
  }
}

  useEffect(() => {
    fetchVoteTypes();
  },[]);

  useEffect(() => {
    resetVote(); 
  }, [resetVote]);

  const handleSelect = (tipo) => {
    setSelected(tipo);
  };

  const handleNext = () => {
    setVoteType(selected);
    const routeMap = {
      '1': ROUTES.PARTIDO,
      '2': ROUTES.BLANCO,
      '3': ROUTES.ANULADO
    };
    navigate(routeMap[selected]);
  };


  if (estadoCircuito != 1) {
    return (
    <div className="votante-container">
      <img src="/logo.png" alt="Escudo de Uruguay" />
      <h1>Espere a ser habilitado para realizar su voto</h1>
      <button onClick={() => navigate('/welcome')}>Volver</button>
    </div>
  );
  }

  return (
    <div className="seleccion-container">
      <h2>Seleccione la papeleta a votar:</h2>
      <div className="botones-tipo">
        {voteTypes.map(({ id, descripcion }) => (
          <VoteButton
            key={id}
            label={descripcion}
            onClick={() => handleSelect(id)}
            variant={selected === id ? 'primary' : 'secondary'}
            fullWidth
          />
        ))}
      </div>
      <VoteButton
        label="Siguiente"
        onClick={handleNext}
        disabled={!selected}
        variant="primary"
        fullWidth
      />
    </div>
  );
};

export default SelectVoteType;