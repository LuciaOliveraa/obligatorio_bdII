import React from "react";

function ConfirmationPopup({ user, onConfirm, onCancel }) {
   return (
       <div className="popup">
           <p>¿Está seguro de que desea habilitar a: {user.name} - CI?</p>
           <button onClick={() => { onConfirm(user); }}>Sí</button>
           <button onClick={onCancel}>No</button>
       </div>
   );
}

export default ConfirmationPopup;