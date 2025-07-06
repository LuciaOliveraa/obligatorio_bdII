import React from "react";

const Table = ({ datos }) => {
  if (!datos || datos.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  const columnas = Object.keys(datos[0]);

  return (
    <table border="1">
      <thead>
        <tr>
          {columnas.map((col) => (
            <th key={col}>{col.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datos.map((item, i) => (
          <tr key={i}>
            {columnas.map((col) => (
              <td key={col}>{item[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
