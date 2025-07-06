from flask import Flask
from flask_cors import CORS
from connection import get_db_connection
from totem import totemRoutes
from login import loginRoutes
from votacion import votacionRoutes
from mesa import mesaRoutes
from estadisticas import estadisticasRoutes

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Bienvenido a la página principal de backend de Obligatorio BD2: Elecciones"

@app.route("/status/db")
def status_db():
    db = get_db_connection()

    if(db.is_connected()):
        status = "Conectado a la base de datos."
    else: 
        status = "Desconectado de la base de datos."
    
    return status

totemRoutes(app)
loginRoutes(app)
votacionRoutes(app)
mesaRoutes(app)
estadisticasRoutes(app)

#prueba
@app.route('/test-cors', methods=['POST', 'OPTIONS'])
def test_cors():
    return {'ok': True}


if __name__ == "__main__":
    app.run(debug=True, port=5001)
