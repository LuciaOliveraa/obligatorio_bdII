from flask import jsonify
from mysql.connector import Error
from connection import get_db_connection

db = get_db_connection()

def totemRoutes(app):

    @app.route("/partidos", methods = ['GET'])
    def get_partidos():
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("SELECT * FROM partido_politico")
            result = cursor.fetchall()

            return jsonify(result), 200
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()


    @app.route("/tipo-voto", methods = ['GET'])
    def get_tipo_voto():
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("SELECT * FROM tipo_voto")
            result = cursor.fetchall()

            return jsonify(result), 200
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()


    @app.route("/lista/<int:id>", methods = ['GET'])
    def get_lista(id):
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("SELECT * FROM papeleta_lista WHERE id_partido_politico=%s", (id, ))
            result = cursor.fetchall()

            return jsonify(result), 200
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()
            