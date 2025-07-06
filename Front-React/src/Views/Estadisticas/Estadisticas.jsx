import React, { useEffect, useState } from 'react';
import Table from '../../Components/Table/Table';
import '../../Styles/Estadisticas.css';

function Estadisticas() {
  const [datos, setDatos] = useState([]);
  const [titulo, setTitulo] = useState('Resultados País');
  const [circuito, setCircuito] = useState(1);

  useEffect(() => {
    cargarDatos("pais");
  }, []);

  const cargarDatos = (tipo) => {
    let url = "";
    let nuevoTitulo = "";

    if (tipo === "pais") {
      url = "http://localhost:5001/resultados-pais/1";
      nuevoTitulo = "Resultados País";
    } else if (tipo === "pais-candidato") {
      url = "http://localhost:5001/resultados-pais-candidato/1";
      nuevoTitulo = "Resultados País por Candidato";
    } else if (tipo === "circuito") {
      url = `http://localhost:5001/resultados-circuito/1/${circuito}`;
      nuevoTitulo = `Resultados Circuito ${circuito}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTitulo(nuevoTitulo);
        setDatos(data);
      })
      .catch((err) => console.error("Error al cargar datos:", err));
  };

  return (
    <div className="estadisticas-container">
      <h1 className="title">{titulo}</h1>

      <div className="header">
        <button onClick={() => cargarDatos("pais")}>Resultados por País</button>
        <button onClick={() => cargarDatos("pais-candidato")}>Resultados por Candidato</button>
        <input
          type="number"
          min="1"
          value={circuito}
          onChange={(e) => setCircuito(e.target.value)}
          placeholder="N° Circuito"
          style={{ margin: "0 10px", padding: "6px" }}
        />
        <button onClick={() => cargarDatos("circuito")}>Resultados por Circuito</button>
      </div>

      <Table datos={datos} />
    </div>
  );
}

export default Estadisticas;
