import React, { useState } from "react";
import { createContext, useContext, useEffect } from "react";

const MesaAuthContext = createContext();

// Función que permite usar el contexto y sus funciones en los componentes.
export function useMesaAuth() {
    return useContext(MesaAuthContext);
}


// Componente que se va a renderizar como contexto global.
export const MesaAuthProvider = ({ children }) => {
    const initialState = {
        idCircuito: 0,
        ciMiembroMesa: "",
        idInstanciaElectiva: 1,
        amIloggedIn: 0
    }

    const [mesaAuth, setMesaAuth] = useState(() => {
        const storedMesaAuth = localStorage.getItem("mesaAuth");
        return storedMesaAuth ? JSON.parse(storedMesaAuth) : initialState;
    });

    const updateMesaAuth = (newAuth) => {
        setMesaAuth(newAuth);
        localStorage.setItem('mesaAuth', JSON.stringify(newAuth));
    }

    const logOut = () => {
        localStorage.clear();
    }

    // Utiliza useEffect para confirmar la actualización de auth
    useEffect(() => {
        console.log("Auth actualizado:", mesaAuth);
    }, [mesaAuth]);

    return (
        <MesaAuthContext.Provider value={{mesaAuth, updateMesaAuth, logOut}}>
            {children}
        </MesaAuthContext.Provider>
    );
}
