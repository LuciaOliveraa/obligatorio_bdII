"Pantalla de confirmación de voto en blanco"

import { useNavigate } from 'react-router-dom';
import '../../Styles/Common.css';
import '../../Styles/ConfirmAction.css';

const Blanco = () => {
  const navigate = useNavigate();

  const handleCancelar = () => {
    navigate('/select-vote-type'); 
  };

  const handleAceptar = () => {
    navigate('/vote-confirmed');
  };

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
