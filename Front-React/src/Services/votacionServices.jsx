export const updateVotoCredencial = async(serie, numero, voto) => {
    try {
        const response = await fetch (`http://127.0.0.1:5000/voto-credencial/${serie}/${numero}?voto=${voto}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        }) 
        const data = await response.json();
        return data; 
    } catch (error) {
        console.log('Error editando actividad', error)
    }
}

export const postVoto = async (circuito, instancia_electiva, papeleta, id_tipo_voto) => {
    // Todos los datos a ingresar son de tipo int

    const voto_info = {
        id_circuito: circuito,
        id_instancia_electiva: instancia_electiva,
        fecha_hora: obtenerFechaHoraActual(),
        papeleta: papeleta          // si voto es blanco o anulado, en papeleta poner null
    }

    /* id_tipo_voto:
        1 Papeleta
        2 Blanco
        3 Anulado
    */
    try {
        const response = await fetch (`http://127.0.0.1:5000/voto/${id_tipo_voto}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(voto_info)
        }) 
        const data = await response.json();

        console.log("post voto response: ", data);
        return data; 
    } catch (error) {
        console.log('Error en post voto', error)
    }
}

// Parsea el formato de la Date de js a date de SQL
function obtenerFechaHoraActual() {
  const ahora = new Date();

  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Enero es 0
  const dia = String(ahora.getDate()).padStart(2, '0');

  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');

  return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}
