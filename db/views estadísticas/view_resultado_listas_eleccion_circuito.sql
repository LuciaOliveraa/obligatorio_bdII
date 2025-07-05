-- Esta VIEW agrupa los resultados de cada elección
-- Dentro de cada elección separa los votos por: circuito, lista, tipo de voto y partido político
-- Cuenta la cantidad de votos dentro de cada grupo y muestra el porcentaje de esa categoría dentro de ese circuito y elección.

CREATE OR REPLACE VIEW resultados_eleccion_circuito_lista AS
    SELECT e.id as eleccion,
           cie.id_circuito as circuito,
           pl.num_lista as lista,
           CASE
               WHEN tv.descripcion = 'Papeleta' THEN pp.nombre
               ELSE null
           end as partido_politico,
           tv.descripcion as tipo_voto,
           COUNT(vcie.id_voto) as cantidad_de_votos,
           ROUND(
            COUNT(vcie.id_voto) * 100.0 /       -- cuenta votos particionados (cantidad_de_votos)
            SUM(COUNT(vcie.id_voto)) OVER (PARTITION BY e.id, cie.id_circuito),  -- cuenta votos por circuito en elección
           2) AS porcentaje_en_circuito_eleccion
    FROM eleccion e
        LEFT JOIN eleccion_en_instancia_electiva eie
            ON e.id = eie.id_eleccion
        LEFT JOIN circuito_en_instancia_electiva cie
            ON eie.id_instancia_electiva = cie.id_instancia_electiva
        LEFT JOIN voto_circuito_en_instancia_electiva vcie
            ON cie.id_circuito = vcie.id_circuito
        LEFT JOIN tipo_voto tv
            ON vcie.id_tipo_voto = tv.id
        LEFT JOIN papeleta_en_voto pv
            ON vcie.id_voto = pv.id_voto
        LEFT JOIN papeleta_lista pl
            ON pv.id_papeleta = pl.id
        LEFT JOIN partido_politico pp
            ON pl.id_partido_politico = pp.id
    GROUP BY eleccion, circuito, lista, partido_politico, tipo_voto
    ORDER BY eleccion, circuito, lista, partido_politico, tipo_voto;
