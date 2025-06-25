"Voton para votar."

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VoteButton.css';
import PropTypes from 'prop-types'; 

const VoteButton = ({ 
  label, 
  onClick, 
  navigateTo, 
  disabled = false,
  type = 'button',
  variant = 'primary',
  icon = null, 
  fullWidth = false
}) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <button
      type={type}
      className={`vote-button ${variant} ${fullWidth ? 'full-width' : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {label}
    </button>
  );
};

VoteButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  navigateTo: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  icon: PropTypes.node,
  fullWidth: PropTypes.bool
};

export default VoteButton;