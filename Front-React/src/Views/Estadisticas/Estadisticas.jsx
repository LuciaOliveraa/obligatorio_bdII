import React, { useState } from 'react';
import Table from '../../Components/Table/Table';
import VoteButton from '../../Components/VoteButton/VoteButton';
import '../../Styles/Estadisticas.css';
import '../../Styles/VotanteHabilitado.css'; // para página alternativa
import { useEffect } from 'react';
import { useMesaAuth } from '../../Context/MesaAuthContext';
import { useNavigate } from 'react-router-dom';

function Estadisticas() {
  const navigate = useNavigate();

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  const { mesaAuth } = useMesaAuth();

  const [datos, setDatos] = useState([]);
  const [titulo, setTitulo] = useState('Estadísticas');
  const [subtitulo, setSubtitulo] = useState('Selecciona una opción para ver los resultados');
  const [circuito, setCircuito] = useState(1);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');

  const departamentos = [
    'Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno',
    'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Montevideo',
    'Paysandú', 'Río Negro', 'Rivera', 'Rocha', 'Salto',
    'San José', 'Soriano', 'Tacuarembó', 'Treinta y Tres'
  ];

  const cargarDatos = (tipo) => {
    let url = '';
    let nuevoSubtitulo = '';

    switch (tipo) {
      case 'pais':
        url = 'http://localhost:5001/resultados-pais/1';
        nuevoSubtitulo = 'Resultados por Partidos - País';
        break;
      case 'pais-candidato':
        url = 'http://localhost:5001/resultados-pais-candidato/1';
        nuevoSubtitulo = 'Resultados por Candidatos - País';
        break;
      case 'circuito-partidos':
        url = `http://localhost:5001/resultados-circuito/1/${circuito}`;
        nuevoSubtitulo = `Resultados por Partidos - Circuito ${circuito}`;
        break;
      case 'circuito-listas':
        url = `http://localhost:5001/resultados-circuito-listas/1/${circuito}`;
        nuevoSubtitulo = `Resultados por Listas - Circuito ${circuito}`;
        break;
      case 'circuito-candidatos':
        url = `http://localhost:5001/resultados-candidato-circuito/1/${circuito}`;
        nuevoSubtitulo = `Resultados por Candidatos - Circuito ${circuito}`;
        break;
      case 'departamento-partidos':
        url = `http://localhost:5001/resultados-departamento/1/${departamentoSeleccionado}`;
        nuevoSubtitulo = `Resultados por Partidos - Departamento ${departamentoSeleccionado}`;
        break;
      case 'departamento-candidatos':
        url = `http://localhost:5001/resultados-candidato-departamento/1/${departamentoSeleccionado}`;
        nuevoSubtitulo = `Resultados por Candidatos - Departamento ${departamentoSeleccionado}`;
        break;
      default:
        return;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTitulo('Estadísticas');
        setSubtitulo(nuevoSubtitulo);
        setDatos(data);
      })
      .catch((err) => console.error('Error al cargar datos:', err));
  };


  if (mesaAuth.amIloggedIn != 1) {
    return (
    <div className="votante-container">
      <img src="/logo.png" alt="Escudo de Uruguay" />
      <h1>Si no inicia sesión no puede visualizar las estadísticas</h1>
      <button onClick={() => navigate('/loginmesa')}>Iniciar sesión</button>
    </div>
  );
  }

  return (
    <div className="estadisticas">
      <div className= "titulo-container">
        <h1 className="title">{titulo}</h1>
        <h2 className="subtitle">{subtitulo}</h2>
      </div>

      {/* Grupo País */}
      <div className="botonera">
        <div className="boton-group">
          <VoteButton label="Resultados País" onClick={() => cargarDatos('pais')} />
          <VoteButton label="Candidatos País" onClick={() => cargarDatos('pais-candidato')} />
        </div>
      </div>

      {/* Grupo Circuito */}
      <div className="botonera">
        <div className="boton-group">
          <VoteButton label="Partidos por Circuito" onClick={() => cargarDatos('circuito-partidos')} />
          <VoteButton label="Listas por Circuito" onClick={() => cargarDatos('circuito-listas')} />
          <VoteButton label="Candidatos por Circuito" onClick={() => cargarDatos('circuito-candidatos')} />
        </div>
        <div className="input-group">
          <input
            className="input-circuito"
            label="N° Circuito"
            type="number"
            min="1"
            value={circuito}
            onChange={(e) => setCircuito(e.target.value)}
            placeholder="N° Circuito"
          />
        </div>
      </div>

      {/* Grupo Departamento */}
      <div className="botonera">
        <div className="boton-group">
          <VoteButton label="Partidos por Departamento" onClick={() => cargarDatos('departamento-partidos')} />
          <VoteButton label="Candidatos por Departamento" onClick={() => cargarDatos('departamento-candidatos')} />
        </div>
        <div className="input-group">
          <select
            className="select-departamento"
            value={departamentoSeleccionado}
            onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
          >
            <option value="">Departamento</option>
            {departamentos.map((dpto) => (
              <option key={dpto} value={dpto}>{dpto}</option>
            ))}
          </select>
        </div>
      </div>
      

      <div className="tabla-container">
        <Table datos={datos} />
      </div>
    </div>
  );
}

export default Estadisticas;
