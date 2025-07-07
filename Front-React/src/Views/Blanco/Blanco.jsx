"Pantalla de confirmación de voto en blanco"

import { useNavigate } from 'react-router-dom';
import '../../Styles/Common.css';
import '../../Styles/ConfirmAction.css';
import { postVoto } from "../../Services/votacionServices";
import { useEstadoCircuito } from '../../Context/EstadoCircuitoContext';

const Blanco = () => {
  const navigate = useNavigate();
  const {estadoCircuito} = useEstadoCircuito();

  const handleCancelar = () => {
    navigate('/select-vote-type'); 
  };

  const handleAceptar = async () => {
    try{
      const circuito = localStorage.getItem('circuito');
      await postVoto(circuito, 1, null, 2);
    }catch (error){
      console.error("Error en post voto", error);
    }
    navigate('/vote-confirmed');
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
    <div className="confirmar-container">
      <button className="flecha-back" onClick={handleCancelar}>←</button>
      <div className="popup">
        <h2>¿Está seguro que desea votar en BLANCO?</h2>
        <div className="popup-buttons">
          <button className="cancelar-button" onClick={handleCancelar}>Cancelar</button>
          <button className="aceptar-button" onClick={handleAceptar}>Votar</button>
        </div>
      </div>
    </div>
  );
};

export default Blanco;
