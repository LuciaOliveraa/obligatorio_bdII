"En esta pantalla el usuario9 ya confirmó el partido a votar, ahora debe seleccionar la lisra del partido."

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVote } from '../../Context/VoteContext';
import '../../Styles/Common.css';
import '../../Styles/SelectLista.css';
import { getListasPartido } from "../../Services/totemServices";

const SelectLista = () => {
  const { selectedPartido, setSelectedList } = useVote();
  const [listaSeleccionada, setListaSeleccionada] = useState(null);
  const [listas, setListas] = useState([]);
  const navigate = useNavigate();

  const fetchListasPartido = async () => {
    try{
      const data = await getListasPartido(selectedPartido.id);
      setListas(data);
    }catch(error){
      console.log("Error")
    }
  }
  
  useEffect(() => {
    fetchListasPartido();
  },[]);

  useEffect(() => {
    if (selectedPartido) {
      fetchListasPartido();
    } else {
      navigate('/select-partido');
    }
  }, [selectedPartido, navigate]);

  const handleSeleccion = (lista) => {
    setListaSeleccionada(lista);
  };

  const handleConfirmar = () => {
    setSelectedList(listaSeleccionada);
    localStorage.setItem('listaId', listaSeleccionada.id);
    localStorage.setItem('listaLema', listaSeleccionada.lema);
    localStorage.setItem('partidoId', listaSeleccionada.id_partido_politico)
    console.log(listaSeleccionada);

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
        {Array.isArray(listas) && listas.map((lista) => (
          <button
            key={lista.id}
            className={`lista-button ${listaSeleccionada === lista ? 'selected' : ''}`}
            onClick={() => handleSeleccion(lista)}
          >
            {lista.lema}
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
