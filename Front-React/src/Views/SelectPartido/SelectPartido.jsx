"En esta pantalla el usuario ya confirmó que va a votar una lista, ahora debe seleccionar el partido de la lista a votar."

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVote } from '../../Context/VoteContext';
import '../../Styles/Common.css';
import '../../Styles/SelectPartido.css';
import '../../Styles/VotanteHabilitado.css';
import { getPartidos } from "../../Services/totemServices";
import { useEstadoCircuito } from '../../Context/EstadoCircuitoContext';


const SelectPartido = () => {
  const { setSelectedPartido } = useVote();
  const { estadoCircuito } = useEstadoCircuito();
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
  const navigate = useNavigate();
  const [partidos, setPartidos] = useState([]);

  const fetchPartidos = async () => {
    try{
      const data = await getPartidos();
      setPartidos(data);
    }catch(error){
      console.log("Error")
    }
  }

  useEffect(() => {
    fetchPartidos();
  },[]);

  const handleSeleccion = (partido) => {
    setPartidoSeleccionado(partido);
  };

  const handleSiguiente = () => {
    setSelectedPartido(partidoSeleccionado);
    localStorage.setItem('partidoNombre', partidoSeleccionado.nombre);
    navigate('/select-lista');
  };

  const handleCancelar = () => {
    navigate('/select-vote-type');
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
    <div className="partido-container">
      <button className="flecha-back" onClick={handleCancelar}>←</button>
      <h2>Seleccione el partido a votar:</h2>
      <div className="botones-partido">
        {partidos.map((partido) => (
          <button
            key={partido.id}
            className={`partido-button ${partidoSeleccionado === partido ? 'selected' : ''}`}
            onClick={() => handleSeleccion(partido)}
          >
            {partido.nombre}
          </button>
        ))}
      </div>
      <div className="acciones">
        <button className="cancelar-button" onClick={handleCancelar}>Cancelar</button>
        <button
          className="siguiente-button"
          onClick={handleSiguiente}
          disabled={!partidoSeleccionado}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default SelectPartido;
