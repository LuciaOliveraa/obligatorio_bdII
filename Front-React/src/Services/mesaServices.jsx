const url = 'http://127.0.0.1:5001'

export const getCredencialesCircuito = async (id_ie, id_circuito) => {
    try {
        const response = await fetch(`${url}/credenciales-circuito/${id_ie}/${id_circuito}`, {
            method: "GET"
        });
        const data = await response.json();
        console.log('credenciales desde service: ', data);
        return data;
    } catch (error) {
        console.log(`Error obteniendo credenciales del circuito ${id_circuito}`, error);
    }
};


export const getAllCredenciales = async (id_ie) => {
    try {
        const response = await fetch(`${url}/credenciales/${id_ie}`, {
            method: "GET"
        });
        const data = await response.json();
        console.log('ALL credenciales desde service: ', data);
        return data;
    } catch (error) {
        console.log(`Error obteniendo todas las credenciales`, error);
    }
};


export const getInfoVotante = async (serie, numero) => {
    try {
        const response = await fetch(`${url}/info-voto-credencial/${serie}/${numero}`, {
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
        const response = await fetch(`${url}/estado-circuito/${id_circuito}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error updateando el estado del circuito`, error);
    }
};


export const getEstadoCircuito = async (id_circuito) => {
    try {
        const response = await fetch(`${url}/get-estado-circuito/${id_circuito}`, {
            method: "GET"
        });
        const data = await response.json();
        
        return data[0];
    } catch (error) {
        console.log(`Error obteniendo el estado del circuito`, error);
    }
}


export const updateVotoObservado = async (serie, numero) => {
    try {
        const response = await fetch(`${url}/voto-observado/${serie}/${numero}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        //console.log('entre al service updateVotoObservado ', data);
        return data;
    } catch (error) {
        console.log(`Error updateando el voto observado de la credencial`, error);
    }
};
