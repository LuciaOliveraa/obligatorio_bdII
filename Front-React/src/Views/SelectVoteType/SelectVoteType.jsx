"En esta pantalla el usuario selecciona si su voto será anulado, blanco o lista."

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useVote } from '../../Context/VoteContext';
import VoteButton from '../../Components/VoteButton/VoteButton';
import { ROUTES } from '../../Constants/Routes';
import '../../Styles/Common.css';
import '../../Styles/SelectVoteType.css';
import { getVoteTypes } from "../../Services/totemServices";

// Test conexión con backend

// const VOTE_TYPES = [
//   { id: 'lista', label: 'Lista', variant: 'primary' },
//   { id: 'blanco', label: 'Blanco', variant: 'primary' },
//   { id: 'anulado', label: 'Anulado', variant: 'primary' }
// ];

const SelectVoteType = () => {
  const { setVoteType, resetVote } = useVote();
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
    console.log(selected);
    const routeMap = {
      '1': ROUTES.PARTIDO,
      '2': ROUTES.BLANCO,
      '3': ROUTES.ANULADO
    };
    navigate(routeMap[selected]);
  };

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