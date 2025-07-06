from flask import jsonify, request
from mysql.connector import Error
from connection import get_db_connection

db = get_db_connection()

def estadisticasRoutes(app):

    @app.route("/resultados-circuito/<int:id_eleccion>/<int:id_circuito>", methods = ['GET'])
    def get_resultados_circuito(id_eleccion, id_circuito):
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT 
                           CASE
                                WHEN partido_politico is not null THEN partido_politico
                                ELSE tipo_voto
                           END AS partido,
                           cantidad_de_votos,
                           porcentaje_en_circuito_eleccion as porcentaje_de_votos
                            FROM resultados_eleccion_circuito WHERE eleccion=%s AND circuito=%s""", (id_eleccion, id_circuito, ))
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve lista:
                    cantidad_de_votos
                    partido
                    porcentaje_de_votos
            """
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()

    @app.route("/resultados-circuito-listas/<int:id_eleccion>/<int:id_circuito>", methods = ['GET'])
    def get_resultados_circuito_listas(id_eleccion, id_circuito):
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT 
                           CASE
                                WHEN partido_politico is not null THEN partido_politico
                                ELSE tipo_voto
                           END AS partido,
                           lista,
                           cantidad_de_votos,
                           porcentaje_en_circuito_eleccion
                            FROM resultados_eleccion_circuito_lista WHERE eleccion=%s AND circuito=%s""", (id_eleccion, id_circuito, ))
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve lista:
                    cantidad_de_votos
                    lista
                    partido
                    porcentaje_en_circuito_eleccion
            """
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()

    
    @app.route("/resultados-candidato-circuito/<int:id_eleccion>/<int:id_circuito>", methods = ['GET'])
    def get_resultados_candidato_circuito(id_eleccion, id_circuito):
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT 
                           CASE
                                WHEN partido_politico is not null THEN partido_politico
                                ELSE tipo_voto
                           END AS partido,
                           candidato,
                           cantidad_de_votos,
                           porcentaje_en_circuito_eleccion
                            FROM resultados_candidato_eleccion_circuito WHERE eleccion=%s AND circuito=%s""", (id_eleccion, id_circuito, ))
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve lista:
                    candidato
                    cantidad_de_votos
                    circuito
                    eleccion
                    partido_politico
                    porcentaje_en_circuito_eleccion
                    tipo_voto"""
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()

    
    @app.route("/resultados-pais/<int:id_eleccion>", methods = ['GET'])
    def get_resultados_pais(id_eleccion):
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT
                                    partido,
                                    sum(cantidad_de_votos) as cantidad_de_votos,
                                    ROUND(
                                        SUM(cantidad_de_votos) * 100.0 /
                                        SUM(SUM(cantidad_de_votos)) OVER (),
                                        2
                                    ) AS porcentaje_en_eleccion
                                FROM (
                                    SELECT
                                        CASE
                                            WHEN partido_politico is not null THEN partido_politico
                                            ELSE tipo_voto
                                        END AS partido,
                                        cantidad_de_votos
                                    FROM resultados_eleccion_circuito
                                    WHERE eleccion=%s
                                    ) AS sub
                                GROUP BY partido""", (id_eleccion, ))
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve lista:
                    cantidad_de_votos
                    partido
                    porcentaje_en_eleccion
                """
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()

    
    @app.route("/resultados-pais-candidato/<int:id_eleccion>", methods = ['GET'])
    def get_resultados_pais_candidato(id_eleccion):
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT
                                    candidato,
                                    partido,
                                    sum(cantidad_de_votos) as cantidad_de_votos,
                                    ROUND(
                                        SUM(cantidad_de_votos) * 100.0 /
                                        SUM(SUM(cantidad_de_votos)) OVER (),
                                        2
                                    ) AS porcentaje_en_eleccion
                                FROM (
                                    SELECT
                                        CASE
                                            WHEN candidato is not null THEN candidato
                                            ELSE tipo_voto
                                        END AS candidato,
                                        CASE
                                            WHEN partido_politico is not null THEN partido_politico
                                            ELSE null
                                        END AS partido,
                                        cantidad_de_votos
                                    FROM resultados_candidato_eleccion_circuito
                                    WHERE eleccion=%s
                                    ) AS sub
                                GROUP BY candidato, partido
                            """, (id_eleccion, ))
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve lista:
                    candidato
                    cantidad_de_votos
                    partido
                    porcentaje_en_eleccion
                """
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()


    @app.route("/resultados-departamento/<int:id_eleccion>/<string:departamento>", methods = ['GET'])
    def get_resultados_departamento(id_eleccion, departamento):
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT departamento, 
                           CASE
                                WHEN partido_politico is not null THEN partido_politico
                                ELSE tipo_voto
                           END AS partido,
                           cantidad_de_votos,
                           porcentaje_en_departamento_eleccion as porcentaje_de_votos
                           FROM resultados_eleccion_departamento WHERE eleccion=%s AND departamento=%s""", (id_eleccion, departamento, ))
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve lista:
                    cantidad_de_votos
                    departamento
                    partido
                    porcentaje_de_votos
            """
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()

    
    @app.route("/resultados-candidato-departamento/<int:id_eleccion>/<string:departamento>", methods = ['GET'])
    def get_resultados_candidato_departamento(id_eleccion, departamento):
        try:
            cursor = db.cursor(dictionary=True)
            cursor.execute("""SELECT candidato, 
                           departamento,
                           CASE
                                WHEN partido_politico is not null THEN partido_politico
                                ELSE tipo_voto
                           END AS partido,
                           porcentaje_en_departamento_eleccion as porcentaje_de_votos,
                           cantidad_de_votos
                            FROM resultados_candidato_eleccion_departamento WHERE eleccion=%s AND departamento=%s""", (id_eleccion, departamento, ))
            result = cursor.fetchall()

            return jsonify(result), 200
            """ devuelve lista:
                    candidato
                    cantidad_de_votos
                    departamento
                    partido
                    porcentaje_de_votos
            """
        except Error as e:
            return jsonify({"Error: ": str(e)}), 500
        finally:
            cursor.close()
    