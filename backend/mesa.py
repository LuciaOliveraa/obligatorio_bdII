from flask import jsonify, request
from mysql.connector import Error
from connection import get_db_connection

db = get_db_connection()

def circuito_de_miembro_mesa(cursor, ci_miembro_mesa, id_instancia_electiva):
    print("ci " , ci_miembro_mesa)
    print("ie " , id_instancia_electiva)
    cursor.execute("""SELECT id_circuito
                    FROM mesa_circuito_instancia_electiva
                    WHERE ci_miembro_mesa = %s AND id_instancia_electiva = %s""",
                    (ci_miembro_mesa, id_instancia_electiva,))
    result = cursor.fetchone()

    if result:
        return result["id_circuito"]
    else:
        return None

def info_login_circuito_mesa(cursor, id_circuito):
    cursor.execute("""SELECT usuario, contraseña
                    FROM login_circuito
                    WHERE id_circuito = %s""", (id_circuito,))
    result = cursor.fetchone()

    return result

def mesaRoutes(app):

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
    