"Flecha para ir hacia atrás."

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = ({ onClick, navigateTo }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <button className="back-button" onClick={handleClick}>
      ←
    </button>
  );
};

export default BackButton;