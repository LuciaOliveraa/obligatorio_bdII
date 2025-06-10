from flask import Flask
from connection import get_db_connection

app = Flask(__name__)

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

if __name__ == "__main__":
    app.run()