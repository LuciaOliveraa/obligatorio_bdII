const url = 'http://localhost:5001'

export const getVoteTypes = async() => {
    try{
        const response = await fetch(`${url}/tipo-voto`, { method: "GET"})
        const data = await response.json();
        return data;

    }catch(error){
        console.log("Error obteniendo tipo voto", error)
    }
}

export const getPartidos = async() => {
    try{
        const response = await fetch(`${url}/partidos`, { method: "GET"})
        const data = await response.json();
        return data;

    }catch(error){
        console.log("Error obteniendo partidos", error)
    }
}

export const getListasPartido = async(id) => {
    try{
        const response = await fetch(`${url}/lista/${id}`, { method: "GET"})
        const data = await response.json();
        return data;

    }catch(error){
        console.log("Error obteniendo listas de partido", error)
    }
}