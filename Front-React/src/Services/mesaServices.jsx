export const getCredencialesCircuito = async (id_ie, id_circuito) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/credenciales-circuito/${id_ie}/${id_circuito}`, {
            method: "GET"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error obteniendo credenciales del circuito ${id_circuito}`, error);
    }
};


export const getAllCredenciales = async (id_ie) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/credenciales/${id_ie}`, {
            method: "GET"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error obteniendo todas las credenciales`, error);
    }
};


export const getInfoVotante = async (serie, numero) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/info-voto-credencial/${serie}/${numero}`, {
            method: "GET"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error obteniendo la información del votante ${serie} ${numero}`, error);
    }
};


export const updateEstadoCircuito = async (id_circuito, nuevo_estado) => {
    const body = {
        nuevo_estado: nuevo_estado
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/estado-circuito/${id_circuito}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error obteniendo la información del votante ${serie} ${numero}`, error);
    }
};
