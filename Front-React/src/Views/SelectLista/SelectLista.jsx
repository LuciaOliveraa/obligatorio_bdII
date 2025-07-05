"En esta pantalla el usuario9 ya confirmó el partido a votar, ahora debe seleccionar la lisra del partido."

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVote } from '../../Context/VoteContext';
import '../../Styles/Common.css';
import '../../Styles/SelectLista.css';

const listasPorPartido = {
  'Partido A': ['Lista A1', 'Lista A2'],
  'Partido B': ['Lista B1', 'Lista B2'],
  'Partido C': ['Lista C1', 'Lista C2'],
};

const SelectLista = () => {
  const { selectedPartido, setSelectedList } = useVote();
  const [listaSeleccionada, setListaSeleccionada] = useState(null);
  const [listas, setListas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPartido) {
      setListas(listasPorPartido[selectedPartido] || []);
    } else {
      navigate('/select-partido');
    }
  }, [selectedPartido, navigate]);

  const handleSeleccion = (lista) => {
    setListaSeleccionada(lista);
  };

  const handleConfirmar = () => {
    setSelectedList(listaSeleccionada);
    navigate('/lista');
  };

  const handleCancelar = () => {
    navigate('/select-partido');
  };

  return (
    <div className="lista-container">
      <button className="flecha-back" onClick={handleCancelar}>←</button>
      <h2>Listas de {selectedPartido.nombre}</h2>
      <div className="botones-lista">
        {listas.map((lista) => (
          <button
            key={lista}
            className={`lista-button ${listaSeleccionada === lista ? 'selected' : ''}`}
            onClick={() => handleSeleccion(lista)}
          >
            {lista}
          </button>
        ))}
      </div>
      <div className="acciones">
        <button className="cancelar-button" onClick={handleCancelar}>Cancelar</button>
        <button
          className="confirmar-button"
          onClick={handleConfirmar}
          disabled={!listaSeleccionada}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default SelectLista;
