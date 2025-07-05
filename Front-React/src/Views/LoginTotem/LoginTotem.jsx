import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginTotem } from "../../Services/loginServices";
import '../../Styles/LoginTotem.css'; 

function LoginTotem() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try{
            const data = await loginTotem(usuario, contraseña);
            console.log("Login exitoso. ID Circuito:", data.id_circuito);

            navigate('/Welcome'); 
        } catch (error) {
            setError('Usuario o contraseña incorrectos. Intente nuevamente.');
        } 
    };

    return (
        <div className="login-totem">
            <div className="header">
                <img src="/logo.png" alt="Escudo de Uruguay" className="escudo" />
                <h2 className="header-title">
                    Bienvenido al Sistema de registro de <br /> votación electrónica
                </h2>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label className="input-label">Usuario</label>
                    <input 
                        type="text" 
                        placeholder="totem-circuito-xxx" 
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required 
                    />
                    <label className="input-label">Contraseña</label>
                    <input 
                        type="password" 
                        placeholder="C0ntr4señA"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)} 
                        required 
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="vote-button">Ingresar</button>
                </form>
            </div>
        </div>
    );
}

export default LoginTotem;
