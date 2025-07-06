"Pantalla de confirmación en caso de seleccionar voto anulado"

import { useNavigate } from 'react-router-dom';
import '../../Styles/Common.css'
import '../../Styles/ConfirmAction.css';
import { postVoto } from "../../Services/votacionServices";

const Anulado = () => {
  const navigate = useNavigate();

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
