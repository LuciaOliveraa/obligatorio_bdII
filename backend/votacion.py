from flask import jsonify, request
from mysql.connector import Error
from connection import get_db_connection

ANULADO = 3
EN_BLANCO = 2
PAPELETA = 1

db = get_db_connection()

def votacionRoutes(app):

    def postPapeletaVoto(cursor, id_voto, id_papeleta):
        cursor.execute("""INSERT INTO papeleta_en_voto (id_voto, id_papeleta)
                           VALUES (%s, %s)""", (id_voto, id_papeleta,))

    @app.route('/voto/<int:id_tipo_voto>', methods=['POST'])
    def postVoto(id_tipo_voto):
        try:
            cursor = db.cursor(dictionary=True)

            id_circuito = request.json['id_circuito']
            id_instancia_electiva = request.json['id_instancia_electiva']
            fecha_hora = request.json['fecha_hora']

            cursor.execute("""INSERT INTO voto_circuito_en_instancia_electiva 
                           (id_circuito, id_instancia_electiva, fecha_hora, id_tipo_voto) 
                           VALUES (%s, %s, %s, %s)""", 
                           (id_circuito, id_instancia_electiva, fecha_hora, id_tipo_voto,))
            
            id_voto = cursor.lastrowid      # selecciona el id auto generado del voto ingresado
            id_papeleta_en_voto = request.json.get('papeleta')      # usamos get() para que no de KeyError en el caso de que el campo no esté presente

            if not id_papeleta_en_voto:
                db.commit()
                return jsonify({"message": "Voto correctamente registrado"}), 201
            else:
                postPapeletaVoto(cursor, id_voto, id_papeleta_en_voto)
                db.commit()

            return jsonify({"message": "Voto de papeleta correctamente registrado"}), 201

        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()


    @app.route("/voto-credencial/<string:serie>/<int:num>", methods=['PUT'])
    def put_voto_credencial(serie, num):
        try:
            cursor = db.cursor(dictionary=True)

            voto = request.args.get('voto')

            cursor.execute("""UPDATE credencial_asignada_circuito_instancia_electiva
                            SET voto_realizado = %s
                            WHERE serie_credencial = %s AND numero_credencial = %s""", 
                            (voto, serie, num,))
            
            cursor.execute("""SELECT voto_realizado FROM credencial_asignada_circuito_instancia_electiva
                            WHERE serie_credencial = %s AND numero_credencial = %s""", 
                            (serie, num,))
            voto_data = cursor.fetchall()

            return jsonify({"message": f"Voto {voto} {voto_data} de credencial correctamente registrado"}), 201
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()
