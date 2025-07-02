from flask import Flask
from flask_cors import CORS
from connection import get_db_connection
from totem import totemRoutes
from login import loginRoutes
from votacion_totem import votacionTotemRoutes

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
votacionTotemRoutes(app)

if __name__ == "__main__":
    app.run()