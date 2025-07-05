export const loginTotem = async (usuario, contraseña) => {
  try {
    const response = await fetch('http://localhost:5000/login-totem', {
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



export const loginMesa = async (usuario, contraseña, idInstanciaElectiva) => {
  try {
    const response = await fetch(`http://localhost:5000/login-miembro-mesa?ie=${idInstanciaElectiva}`, {
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

    return data;
  } catch (error) {
    console.error('Error en loginMiembroMesa:', error.message);
    throw error;
  }
};
