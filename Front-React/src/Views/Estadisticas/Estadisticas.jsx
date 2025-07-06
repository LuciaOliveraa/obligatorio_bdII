import React, { useEffect, useState } from 'react';
import Table from '../../Components/Table/Table';
import VoteButton from '../../Components/VoteButton/VoteButton';
import '../../Styles/Estadisticas.css';

function Estadisticas() {
  const [datos, setDatos] = useState([]);
  const [subtitulo, setSubtitulo] = useState('Resultados País');
  const [circuito, setCircuito] = useState(1);

  useEffect(() => {
    cargarDatos("pais");
  }, []);

  const cargarDatos = (tipo) => {
    let url = "";
    let nuevoSubtitulo = "";

    if (tipo === "pais") {
      url = "http://localhost:5001/resultados-pais/1";
      nuevoSubtitulo = "Resultados País";
    } else if (tipo === "pais-candidato") {
      url = "http://localhost:5001/resultados-pais-candidato/1";
      nuevoSubtitulo = "Resultados País por Candidato";
    } else if (tipo === "circuito") {
      url = `http://localhost:5001/resultados-circuito/1/${circuito}`;
      nuevoSubtitulo = `Resultados Circuito ${circuito}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSubtitulo(nuevoSubtitulo);
        setDatos(data);
      })
      .catch((err) => console.error("Error al cargar datos:", err));
  };

  return (
    <div className="estadisticas">
      <h1 className="main-title">Estadísticas</h1>
      <h2 className="subtitle">{subtitulo}</h2>

      <div className="botonera">
        <VoteButton label="Resultados por País" onClick={() => cargarDatos("pais")} />
        <VoteButton label="Resultados por Candidato" onClick={() => cargarDatos("pais-candidato")} />
        <VoteButton label="Resultados por Circuito" onClick={() => cargarDatos("circuito")} />
        <input
          className="input-circuito"
          type="number"
          min="1"
          value={circuito}
          onChange={(e) => setCircuito(e.target.value)}
          placeholder="N° Circuito"
        />
      </div>

      <Table datos={datos} />
    </div>
  );
}

export default Estadisticas;
