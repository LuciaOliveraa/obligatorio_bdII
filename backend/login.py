from flask import jsonify, request
from mysql.connector import Error
from connection import get_db_connection

db = get_db_connection()

def loginRoutes(app):

    @app.route('/login-totem', methods=['POST'])
    def login_totem():
        cursor = db.cursor(dictionary=True)
        usuario = request.json['usuario']
        contraseña = request.json['contraseña']

        try:
            cursor.execute("SELECT * FROM login_circuito WHERE usuario = %s", (usuario,))
            login_data = cursor.fetchone()
            
            # Corroboro errores base.
            if not login_data:
                return jsonify({"error": "Login user not found"}), 404
            
            actual_password = login_data['contraseña']

            if contraseña != actual_password:
                return jsonify({"error": "Incorrect credentials"}), 401
            
            return jsonify({"id_circuito": login_data["id_circuito"]})
                
        except Error as error:
            return jsonify({"error": str(error)}), 500
        finally:
            cursor.close()

    
    @app.route('/login-miembro-mesa', methods=['POST'])
    def login_miembro_mesa():
        cursor = db.cursor(dictionary=True)
        usuario = request.json['usuario']
        contraseña = request.json['contraseña']

        try:
            cursor.execute("SELECT * FROM login_miembro_mesa WHERE usuario = %s", (usuario,))
            login_data = cursor.fetchone()
            
            # Corroboro errores base.
            if not login_data:
                return jsonify({"error": "Login user not found"}), 404
            
            actual_password = login_data['contraseña']

            if contraseña != actual_password:
                return jsonify({"error": "Incorrect credentials"}), 401
            
            ci_miembro_mesa = login_data["ci_miembro_mesa"]
            cursor.execute("""SELECT r.descripcion FROM rol_miembro_mesa r 
                           JOIN mesa_circuito_instancia_electiva m ON r.id = m.id_rol 
                           WHERE m.ci_miembro_mesa = %s""", (ci_miembro_mesa,))
            miembro_mesa = cursor.fetchone()
            rol_miembro_mesa = miembro_mesa["descripcion"]

            return jsonify({"id_circuito": login_data["ci_miembro_mesa"], "rol_miembro_mesa": rol_miembro_mesa})
                
        except Error as error:
            return jsonify({"error": str(error)}), 500
        finally:
            cursor.close()

