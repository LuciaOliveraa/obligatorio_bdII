import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

load_dotenv()  # Carga las variables del archivo .env

db_password = os.getenv('DB_PASSWORD')

# Configuración de la conexión a la base de datos
# config = {
#     'host': 'localhost',
#     'user': 'root',
#     'password': 'rootpass',
#     'database': 'elecciones',
# }

# Configuración de la conexión a la base de datos de la UCU
config = {
    'host': 'mysql.reto-ucu.net',
    'port': 50006,
    'user': 'ic_g4_admin',
    'password': db_password,
    'database': 'IC_Grupo4',
}

# Conectar a la base de datos y devolver la conexión
def get_db_connection():
    try:
        db = mysql.connector.connect(**config)
        return db
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None
    