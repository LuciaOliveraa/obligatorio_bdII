import React, { useState } from 'react';
import { Switch } from 'antd'; // Asegúrate de tener Ant Design instalado

function BusquedaMesa() {
   const [users, setUsers] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);
  
   const handleSearch = (query) => {
       // Lógica de búsqueda
   };
  
   const toggleUser = (user) => {
       setSelectedUser(user);
       // Lógica para abrir pop-up
   };

   return (
       <div>
           <input type="text" onChange={(e) => handleSearch(e.target.value)} />
           {users.map(user => (
               <div key={user.id}>
                   <span>{user.name}</span>
                   <Switch checked={user.isObserved} onChange={() => toggleUser(user)} />
               </div>
           ))}
       </div>
   );
}

export default BusquedaMesa;