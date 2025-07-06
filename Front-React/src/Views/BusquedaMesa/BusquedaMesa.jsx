import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/BusquedaMesa.css';
import { getCredencialesCircuito, getAllCredenciales } from '../../Services/mesaServices';

function BusquedaMesa() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [votantes, setVotantes] = useState([
    { id: 1, nombre: 'Credencial2', isObserved: true },
    { id: 2, nombre: 'Credencial3', isObserved: false },
    { id: 3, nombre: 'Menu Item', isObserved: true },
    { id: 4, nombre: 'Menu Item', isObserved: true },
    { id: 5, nombre: 'Menu Item', isObserved: true }
  ]);
  const [allVotantes, setAllVotantes] = useState([]);

  // Trae las credenciales habilitadas para el circuito
  const fetchCredencialesCircuito = async () => {
    try {
      const data = await getCredencialesCircuito(1, 1); /* (id_ie, id_circuito) hardcodeadas */
      setVotantes(data);
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
    //fetchAllCredenciales();
  }, []);

  const filtered = votantes?.filter(user =>
    typeof query === 'string' && user.nombre.toLowerCase().includes(query.toLowerCase())
  );

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
        {filtered?.map(user => (
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
