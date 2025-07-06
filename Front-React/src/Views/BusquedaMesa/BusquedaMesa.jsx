import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/BusquedaMesa.css';
import './BusquedaMesa.css';
import { getCredencialesCircuito, getAllCredenciales } from '../../Services/mesaServices';
import { useMesaAuth } from '../../Context/MesaAuthContext';
import { useListaVotantes } from '../../Context/ListaVotantesContext';

function BusquedaMesa() {
  const { mesaAuth } = useMesaAuth();
  const { listaVotantes, setListaVotantes } = useListaVotantes();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [votantes, setVotantes] = useState([]);
  const [allVotantes, setAllVotantes] = useState([]);
  const [hasFetchedAll, setHasFetchedAll] = useState(false);

  //const [listaVotantes, setListaVotantes] = useState([]);

  // Trae las credenciales habilitadas para el circuito
  const fetchCredencialesCircuito = async () => {
    try {
      const data = await getCredencialesCircuito(mesaAuth.idInstanciaElectiva, mesaAuth.idCircuito); /* (id_ie, id_circuito) hardcodeadas */
      setVotantes(data);
      console.log("DATA DESDE BACKEND not all:", data);
      setListaVotantes(data);
    } catch (error) {
      console.error("Error obteniendo votantes:", error);
    }
  };

  // Trae todas las credenciales de la eleccion
  const fetchAllCredenciales = async () => {
    try {
      const data = await getAllCredenciales(mesaAuth.idInstanciaElectiva); /* (id_ie) hardcodeado */
      console.log("DATA DESDE BACKEND:", data);
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
  }, [query]);   // Solo se hace el fetch de all-credenciales si se hace una búsqueda.


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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/loginmesa');
  };

  return (
    <div className="busqueda-mesa">
      {/* Header */}
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h2 className="title">Ingrese credenciales del usuario a votar</h2>

        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
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
        {listaVotantes?.map(user => {
            const estaHabilitado = votantes.some(v =>
            v.serie_credencial === user.serie_credencial &&
            v.numero_credencial === user.numero_credencial
          );

          return (
          <div key={`${user.serie_credencial}-${user.numero_credencial}`} className="votante">
            {/* Solo el nombre es clickeable */}
            <span
              className="nombre clickable"
              onClick={() => navigate('/confirmacionvotante', { state: { user, estaHabilitado } })}
            >
              {user.serie_credencial} {user.numero_credencial}         {user.nombre} {user.apellido}
            </span>

            <div className="botones-container">
              {/* Botón de habilitación */}
              <button className={estaHabilitado ? 'boton-habilitado' : 'boton-no-habilitado'}>
                {estaHabilitado ? 'Habilitado' : 'No habilitado'}
              </button>

              {/* Botón de voto */}
              <button className={user.voto_realizado === 1 ? 'boton-ya-voto' : 'boton-no-voto'} onClick={() => console.log(user)}>
                {user.voto_realizado === 1 ? 'Ya votó' : 'No votó'}
              </button>

              <input
                type="checkbox"
                className="switch"
                checked={user.observado}
                onChange={(e) => handleToggle(e, user.id)}
              />
            </div>

          </div>
        );})}
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
