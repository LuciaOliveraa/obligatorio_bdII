const url = 'http://localhost:5001'

export const getResultadosCircuito = async (idEleccion, idCircuito) => {
    try {
        const response = await fetch(`${url}/resultados-circuito/${idEleccion}/${idCircuito}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al obtener resultados de circuito:", error);
    }
};

"esto es una prueba de commit para ver si funciona el push desde la terminal";
