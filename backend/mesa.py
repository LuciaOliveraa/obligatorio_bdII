from flask import jsonify, request, make_response
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
    
    # Devuelve todas las credenciales de un circuito en una instancia electiva
    @app.route("/credenciales-circuito/<int:ie>/<int:id>", methods = ['GET'])
    def get_credenciales_circuito(ie, id):
        cursor = None
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT serie_credencial, numero_credencial, voto_realizado, observado, ci.nombre, ci.apellido
                            FROM credencial_asignada_circuito_instancia_electiva ca
                                JOIN credencial c 
                                    ON ca.serie_credencial = c.serie AND ca.numero_credencial = c.numero
                                JOIN ciudadano ci 
                                    ON c.ci_ciudadano = ci.ci
                            WHERE id_circuito = %s AND id_instancia_electiva = %s""", 
                            (id, ie,)) # ie es instancia electiva
            result = cursor.fetchall()
            print("get_credenciales_circuito desde endpoint ", result)

            return jsonify(result), 200
            """ devuelve lista:
                    numero_credencial
                    serie_credencial
                    voto_realizado (0-1)
                    nombre
                    apellido
            """
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            if cursor:
                cursor.close()
    
    
    # Devuelve una lista de todas las credenciales habilitadas para una instancia electiva en específico.
    @app.route("/credenciales/<int:ie>", methods = ['GET'])
    def get_all_credenciales(ie):
        cursor = None
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT serie_credencial, numero_credencial, voto_realizado, observado, ci.nombre, ci.apellido
                            FROM credencial_asignada_circuito_instancia_electiva ca
                                JOIN credencial c 
                                    ON ca.serie_credencial = c.serie AND ca.numero_credencial = c.numero
                                JOIN ciudadano ci 
                                    ON c.ci_ciudadano = ci.ci
                            WHERE id_instancia_electiva = %s""", 
                            (ie,)) # ie es instancia electiva
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve lista:
                    numero_credencial
                    serie_credencial
                    voto_realizado (0-1)
                    nombre
                    apellido
            """
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            if cursor:
                cursor.close()


    # Devuelve la información de un votante en base a su credencial.
    @app.route("/info-voto-credencial/<string:serie>/<int:num>", methods=['GET'])
    def get_info_voto_credencial(serie, num):
        cursor = None
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT serie_credencial, numero_credencial, observado, voto_realizado, ci.nombre, ci.apellido
                            FROM credencial_asignada_circuito_instancia_electiva ca
                                JOIN credencial c 
                                    ON ca.serie_credencial = c.serie AND ca.numero_credencial = c.numero
                                JOIN ciudadano ci 
                                    ON c.ci_ciudadano = ci.ci
                            WHERE serie_credencial = %s AND numero_credencial = %s""", 
                            (serie, num,))
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve:
                    numero_credencial
                    serie_credencial
                    voto_realizado (0-1)
                    nombre
                    apellido
            """
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            if cursor:
                cursor.close()


    # Cambia el estado del circuito desde la tablet de la mesa.
    """ id_estado: (del circuito):
        1 Votando
        2 Bloqueado
        3 Esperando
    """
    @app.route("/estado-circuito/<int:id_circuito>", methods=["PUT"])
    def put_cambio_estado_circuito(id_circuito):
        try: 
            cursor = db.cursor(dictionary=True)

            nuevo_estado = request.json["nuevo_estado"]
            cursor.execute("""UPDATE circuito SET id_estado = %s WHERE id = %s""",
                        (nuevo_estado, id_circuito,))
            db.commit()
            
            cursor.execute("""SELECT descripcion FROM estado_circuito WHERE id = %s""", (nuevo_estado,))
            estado = cursor.fetchone()
            descripcion_estado = estado["descripcion"]
            
            return jsonify({"message": f"Estado del circuito cambiado correctamente a {nuevo_estado} {descripcion_estado}"}), 201

        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()  


    @app.route("/voto-observado/<string:serie>/<int:numero>", methods=['PUT'])
    def put_voto_observado_credencial(serie, numero):
        try:
            cursor = db.cursor(dictionary=True)

            cursor.execute("""UPDATE credencial_asignada_circuito_instancia_electiva
                            SET observado = 1
                            WHERE serie_credencial = %s AND numero_credencial = %s""", 
                            (serie, numero,))
            db.commit()

            return jsonify({"message": f"Voto observado de credencial correctamente registrado"}), 201
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()
