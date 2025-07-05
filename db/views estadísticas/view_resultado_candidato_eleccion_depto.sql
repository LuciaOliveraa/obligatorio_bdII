-- Esta VIEW agrupa los resultados de cada elección
-- Dentro de cada elección separa los votos por: departamento, tipo de voto y candidato
-- Cuenta la cantidad de votos dentro de cada grupo y muestra el porcentaje de esa categoría dentro de ese departamento y elección.
-- También muestra el partido político de cada candidato.

CREATE OR REPLACE VIEW resultados_candidato_eleccion_departamento AS
    SELECT e.id as eleccion,
           d.nombre as departamento,
           CONCAT(c.nombre, ' ', c.apellido) as candidato,
           CASE
               WHEN tv.descripcion = 'Papeleta' THEN pp.nombre  -- si el voto es blanco o anulado, no tiene papeleta
               ELSE null
           end as partido_politico,
           tv.descripcion as tipo_voto,
           COUNT(vcie.id_voto) as cantidad_de_votos,
           ROUND(
            COUNT(vcie.id_voto) * 100.0 /       -- cuenta votos particionados (cantidad_de_votos)
            SUM(COUNT(vcie.id_voto)) OVER (PARTITION BY e.id, d.nombre),  -- cuenta votos por departamento en elección
           2) AS porcentaje_en_departamento_eleccion
    FROM eleccion e
        -- Joins para averiguar voto por circuito en cada elección
        LEFT JOIN eleccion_en_instancia_electiva eie
            ON e.id = eie.id_eleccion
        LEFT JOIN circuito_en_instancia_electiva cie
            ON eie.id_instancia_electiva = cie.id_instancia_electiva
        LEFT JOIN voto_circuito_en_instancia_electiva vcie
            ON cie.id_circuito = vcie.id_circuito
        -- Joins para averiguar ubicación de cada circuito
        LEFT JOIN circuito_ie_ubicacion cu
            ON vcie.id_circuito = cu.id_circuito AND vcie.id_instancia_electiva = cu.id_instancia_electiva
        LEFT JOIN establecimiento es
            ON cu.id_establecimiento = es.id
        LEFT JOIN departamento d
            ON es.id_departamento = d.id
        -- Joins para averiguar información de cada voto (tipo, papeleta, partido)
        LEFT JOIN tipo_voto tv
            ON vcie.id_tipo_voto = tv.id
        LEFT JOIN papeleta_en_voto pv
            ON vcie.id_voto = pv.id_voto
        LEFT JOIN papeleta_lista pl
            ON pv.id_papeleta = pl.id
        LEFT JOIN partido_politico pp
            ON pl.id_partido_politico = pp.id
        -- Joins para averiguar candidato a Presidente
        LEFT JOIN integrante_en_papeleta_lista ipl
            ON pl.id = ipl.id_papeleta_lista
        LEFT JOIN ciudadano c
            ON ipl.id_integrante = c.ci
    WHERE ipl.id_rol = 1 -- donde el integrante sea candidato a Presidente
    GROUP BY eleccion, departamento, candidato, partido_politico, tipo_voto
    ORDER BY eleccion, departamento, candidato, partido_politico, tipo_voto;
