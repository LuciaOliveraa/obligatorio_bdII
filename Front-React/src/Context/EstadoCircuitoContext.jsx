import React, { useState, useEffect, createContext, useContext } from "react";

const EstadoCircuitoContext = createContext();

// Hook para usar el contexto
export function useEstadoCircuito() {
    return useContext(EstadoCircuitoContext);
}

// Componente proveedor del contexto
export const EstadoCircuitoProvider = ({ children }) => {
    const initialState = 2;

    const [estadoCircuito, setEstadoCircuito] = useState(() => {
        const stored = localStorage.getItem("estadoCircuito");
        return stored ? JSON.parse(stored) : initialState;
    });

    const updateEstadoCircuitoContext = (nuevoEstado) => {
        setEstadoCircuito(nuevoEstado);
        localStorage.setItem("estadoCircuito", JSON.stringify(nuevoEstado));
    };

    const logOut = () => {
        localStorage.clear();
    };

    useEffect(() => {
        console.log("EstadoCircuito actualizado:", estadoCircuito);
    }, [estadoCircuito]);

    return (
        <EstadoCircuitoContext.Provider value={{ estadoCircuito, updateEstadoCircuitoContext, logOut }}>
            {children}
        </EstadoCircuitoContext.Provider>
    );
};
