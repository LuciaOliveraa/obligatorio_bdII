"Esta pantalla confirma el voto en caso de ser una lista."

import { useNavigate } from 'react-router-dom';
import { useVote } from '../../Context/VoteContext';
import '../../Styles/Common.css';

const Lista = () => {
  const { selectedPartido, selectedList } = useVote();
  const navigate = useNavigate();

  const handleConfirmar = () => {
    navigate('/vote-confirmed');
  };

  const handleCancelar = () => {
    navigate('/select-lista');
  };

  return (
    <div className="confirmar-voto-container">
      <button className="flecha-back" onClick={handleCancelar}>←</button>
      <div className="popup">
        <h2>¿Está seguro que desea votar la siguiente opción?</h2>
        <p><strong>Partido:</strong> {selectedPartido}</p>
        <p><strong>Lista:</strong> {selectedList}</p>
        <button className="cancelar-button" onClick={handleCancelar}>Cancelar</button>
        <button className="confirmar-button" onClick={handleConfirmar}>Confirmar</button>
      </div>
    </div>
  );
};

export default Lista;
