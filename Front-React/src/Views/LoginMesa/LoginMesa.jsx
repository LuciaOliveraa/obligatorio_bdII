import React from "react";
import { useNavigate } from "react-router-dom";
import '../../Styles/LoginMesa.css'; 

function LoginMesa() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/busqueda-mesa'); 
    };

    return (
        <div className="login-mesa">
            <div className="header">
                <img src="/logo.png" alt="Escudo de Uruguay" className="escudo" />
                <h2 className="header-title">
                    Bienvenido al Sistema de registro de <br /> votación electrónica
                </h2>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label className="input-label">Email</label>
                    <input type="text" placeholder="ejemplo@gmail.com" required />
                    <label className="input-label">Password</label>
                    <input type="password" placeholder="C0ntr4señA" required />
                    <button type="submit" className="vote-button">Ingresar</button>
                </form>
            </div>
        </div>
    );
}

export default LoginMesa;
