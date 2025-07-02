import React from "react";

function LoginMesa() {
   const handleSubmit = (e) => {
       e.preventDefault();
       // Lógica para autenticación
   };
   return (
       <form onSubmit={handleSubmit}>
           <h1>Ingrese sus credenciales de acceso</h1>
           <input type="text" placeholder="Correo electrónico" required />
           <input type="text" placeholder="Cédula" required />
           <button type="submit">Iniciar Sesión</button>
       </form>
   );
}

export default LoginMesa;
