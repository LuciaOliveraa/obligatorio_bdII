import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/BusquedaMesa.css';
import { getCredencialesCircuito, getAllCredenciales } from '../../Services/mesaServices';

function BusquedaMesa() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [votantes, setVotantes] = useState([]);
  const [allVotantes, setAllVotantes] = useState([]);
  const [hasFetchedAll, setHasFetchedAll] = useState(false);

  const [listaVotantes, setListaVotantes] = useState([]);

  // Trae las credenciales habilitadas para el circuito
  const fetchCredencialesCircuito = async () => {
    try {
      const data = await getCredencialesCircuito(1, 1); /* (id_ie, id_circuito) hardcodeadas */
      setVotantes(data);
      setListaVotantes(data);
    } catch (error) {
      console.error("Error obteniendo votantes:", error);
    }
  };

  // Trae todas las credenciales de la eleccion
  const fetchAllCredenciales = async () => {
    try {
      const data = await getAllCredenciales(1); /* (id_ie) hardcodeado */
      setAllVotantes(data);
    } catch (error) {
      console.error("Error obteniendo votantes:", error);
    }
  };

  useEffect(() => {
    fetchCredencialesCircuito();
  }, []);

  useEffect(() => {
    if (query.trim() !== '' && !hasFetchedAll) {
      fetchAllCredenciales();
      setHasFetchedAll(true);
    }
  }, [query, hasFetchedAll]);   // Solo se hace el fetch de all-credenciales si se hace una búsqueda.

  
  // Define qué lista de votantes se muestra en pantalla
  useEffect(() => {
    if (query.trim() === '') {
      // Si no hay búsqueda, muestra los votantes del circuito
      setListaVotantes(votantes);
    } else {
      // Si hay búsqueda, muestra el filtrado de allVotantes
      const filtrados = allVotantes.filter(user =>
        `${user.serie_credencial}${user.numero_credencial}`.toLowerCase().includes(query.toLowerCase())
      );
      setListaVotantes(filtrados);
    }
  }, [query, votantes, allVotantes]);


  const handleToggle = (e, userId) => {
        e.stopPropagation(); 
        setVotantes(prev=>
            prev.map(user =>
                user.id === userId ? { ...user, isObserved: e.target.checked } : user
            )
        )
  };

  return (
    <div className="busqueda-mesa">
      {/* Header */}
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h2 className="title">Ingrese credenciales del usuario a votar</h2>
      </div>

      {/* Buscador */}
      <div className="buscador-container">
        <input
          type="text"
          placeholder="Serie-Número"
          className="buscador"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Lista de usuarios */}
      <div className="lista-votantes">
        {listaVotantes?.map(user => (
          <div key={user.id} className="votante">
            {/* Solo el nombre es clickeable */}
            <span
              className="nombre clickable"
              onClick={() => navigate('/confirmacionvotante', { state: { user } })}
            >
              {user.serie_credencial} {user.numero_credencial}         {user.nombre} {user.apellido}
            </span>

            <input
              type="checkbox"
              className="switch"
              checked={user.isObserved}
              onChange={(e) => handleToggle(e, user.id)}
            />
          </div>
        ))}
      </div>

      {/* Navbar. */}
      <div className="navbar">
        <div className="nav-item active" onClick={() => navigate('/')}>
          <span>🔍</span>
          <p>Buscador</p>
        </div>
        <div className="nav-item" onClick={() => navigate('/estadisticas')}>
          <span>📊</span>
          <p>Estadísticas</p>
        </div>
      </div>
    </div>
  );
}

export default BusquedaMesa;
