"Esta pantalla muestra un mensaje de bienvenida al usuario."

import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../../Styles/Common.css';
import '../../Styles/Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/select-vote-type');
  };

  return (
    <div className="welcome-container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <h1 className="title">BIENVENIDO AL SISTEMA DE VOTACIÓN ELECTRÓNICA</h1>
      <button className="start-button" onClick={handleStart}>
        <i class="fa-solid fa-hand-point-up"></i>        
        Toque aquí para comenzar
      </button>
    </div>
  );
};

export default Welcome;