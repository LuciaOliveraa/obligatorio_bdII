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


    @app.route("/circuito/<int:id>", methods = ['GET'])
    def get_circuito(id):
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("SELECT * FROM circuito WHERE id=%s", (id, ))
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve:
                id_circuito
                accesible (0-1)
                id_estado (1, 2, 3)"""
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()


    @app.route("/credenciales-circuito/<int:ie>/<int:id>", methods = ['GET'])
    def get_credenciales_circuito(ie, id):
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT serie_credencial, numero_credencial, voto_realizado
                            FROM credencial_asignada_circuito_instancia_electiva
                            WHERE id_circuito = %s AND id_instancia_electiva = %s""", 
                            (id, ie,)) # ie es instancia electiva
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve lista:
                    numero_credencial
                    serie_credencial
                    voto_realizado (0-1)
            """
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()


    @app.route("/info-voto-credencial/<string:serie>/<int:num>", methods=['GET'])
    def get_info_voto_credencial(serie, num):
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT serie_credencial, numero_credencial, voto_realizado
                            FROM credencial_asignada_circuito_instancia_electiva
                            WHERE serie_credencial = %s AND numero_credencial = %s""", 
                            (serie, num,))
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve:
                    numero_credencial
                    serie_credencial
                    voto_realizado (0-1)
            """
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()
