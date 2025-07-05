export const getVoteTypes = async() => {
    try{
        const response = await fetch('http://localhost:5000/tipo-voto', { method: "GET"})
        const data = await response.json();
        return data;

    }catch(error){
        console.log("Error", error)
    }
}

export const getPartidos = async() => {
    try{
        const response = await fetch('http://localhost:5000/partidos', { method: "GET"})
        const data = await response.json();
        return data;

    }catch(error){
        console.log("Error", error)
    }
}