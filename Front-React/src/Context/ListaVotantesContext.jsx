import React, { createContext, useContext, useState } from 'react';

const ListaVotantesContext = createContext();

export const useListaVotantes = () => useContext(ListaVotantesContext);

export const ListaVotantesProvider = ({ children }) => {
  const [listaVotantes, setListaVotantes] = useState([]);

  return (
    <ListaVotantesContext.Provider value={{ listaVotantes, setListaVotantes }}>
      {children}
    </ListaVotantesContext.Provider>
  );
};
