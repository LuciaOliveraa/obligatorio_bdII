import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/BusquedaMesa.css';

function BusquedaMesa() {
  const [query, setQuery] = useState('');
  const [votantes, setVotantes] = useState([
    { id: 1, nombre: 'Credencial2', isObserved: true },
    { id: 2, nombre: 'Credencial3', isObserved: false },
    { id: 3, nombre: 'Menu Item', isObserved: true },
    { id: 4, nombre: 'Menu Item', isObserved: true },
    { id: 5, nombre: 'Menu Item', isObserved: true }
  ]);

  const navigate = useNavigate();

  const filtered = votantes.filter(user =>
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
        {filtered.map(user => (
          <div key={user.id} className="votante">
            {/* Solo el nombre es clickeable */}
            <span
              className="nombre clickable"
              onClick={() => navigate('/confirmacionvotante')}
            >
              {user.nombre}
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

      {/* Navbar */}
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
