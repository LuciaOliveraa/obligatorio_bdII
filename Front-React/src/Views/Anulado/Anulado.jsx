"Pantalla de confirmación en caso de seleccionar voto anulado"

import { useNavigate } from 'react-router-dom';
import '../../Styles/Common.css'
import '../../Styles/ConfirmAction.css';
import { postVoto } from "../../Services/votacionServices";
import { useEstadoCircuito } from '../../Context/EstadoCircuitoContext';

const Anulado = () => {
  const navigate = useNavigate();
  const { estadoCircuito } = useEstadoCircuito();

  const handleCancelar = () => {
    navigate('/select-vote-type');
  };

  const handleAceptar = async () => {
    try{
      const circuito = localStorage.getItem('circuito');
      await postVoto(circuito, 1, null, 3);
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
        <h2>¿Está seguro que desea votar en ANULADO?</h2>
        <div className="popup-buttons">
          <button className="cancelar-button" onClick={handleCancelar}>Cancelar</button>
          <button className="aceptar-button" onClick={handleAceptar}>Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default Anulado;
