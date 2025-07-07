const url = 'http://localhost:5001'

export const getInstanciaElectiva = async () => {
  const fechaActual = obtenerFechaActual();
  // const body = {
  //   fecha_actual: fechaActual
  // }
  console.log('fecha actual en service get: ', fechaActual);

    try {
        const response = await fetch(`${url}/instancia-electiva/${fechaActual}`, {
            method: "GET"
        });
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.log(`Error obteniendo la instancia electiva del día de hoy`, error);
    }
}


export const loginTotem = async (usuario, contraseña) => {
  try {
    const response = await fetch(`${url}/login-totem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, contraseña })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    return data; // debería contener: { id_circuito: ... }
  } catch (error) {
    console.error('Error en loginTotem:', error.message);
    throw error;
  }
};



export const loginMesa = async (usuario, contraseña, idInstanciaElectiva, setMesaAuth) => {
  try {
    const response = await fetch(`${url}/login-miembro-mesa?ie=${idInstanciaElectiva}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, contraseña })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    const mesa = {
      idCircuito: data.id_circuito,
      ciMiembroMesa: data.ci_miembro_mesa,
      idInstanciaElectiva: idInstanciaElectiva,
      amIloggedIn: 1
    }
    setMesaAuth(mesa);  // Set MesaAuthContext

    return data;
  } catch (error) {
    console.error('Error en loginMiembroMesa:', error.message);
    throw error;
  }
};


function obtenerFechaActual() {
  const ahora = new Date();

  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Enero es 0
  const dia = String(ahora.getDate()).padStart(2, '0');

  return `${año}-${mes}-${dia}`;
}