from flask import jsonify, request
from mysql.connector import Error
from connection import get_db_connection

from mesa import info_login_circuito_mesa, circuito_de_miembro_mesa

db = get_db_connection()

def loginRoutes(app):

    @app.route('/instancia-electiva/<string:fecha_actual>', methods=['GET'])
    def get_ie(fecha_actual):
        cursor = db.cursor(dictionary=True)
        # Debe recibir fecha en formato YYYY-MM-DD
        
        try:
            cursor.execute("""SELECT ie.id as instancia_electiva, eie.id_eleccion
                            FROM instancia_electiva ie
                            JOIN eleccion_en_instancia_electiva eie
                             WHERE fecha = %s""", (fecha_actual,))
            result = cursor.fetchone()
            
            return jsonify(result), 200
            """ devuelve lista:
                id_eleccion
                instancia_electiva
                """
                
        except Error as error:
            return jsonify({"error": str(error)}), 500
        finally:
            cursor.close()


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

            # averiguo circuito correspondiente a este miembro de mesa
            id_instancia_electiva = request.args.get('ie') 
            id_circuito = circuito_de_miembro_mesa(cursor, ci_miembro_mesa, id_instancia_electiva)
            if id_circuito is None:
                return jsonify({"error": "No se encontró un circuito para ese miembro de mesa en estas elecciones"}), 404

            # averiguo info login correspondiente a este miembro de mesa
            login_circuito = info_login_circuito_mesa(cursor, id_circuito)

            return jsonify({"ci_miembro_mesa": login_data["ci_miembro_mesa"], 
                            "rol_miembro_mesa": rol_miembro_mesa, 
                            "id_circuito": id_circuito,
                            "usuario_circuito": login_circuito["usuario"],
                            "contraseña_circuito": login_circuito["contraseña"]})
                
        except Error as error:
            return jsonify({"error": str(error)}), 500
        finally:
            cursor.close()

