-- Arreglando detalles que se producieron en modificaciones0

UPDATE papeleta_en_voto
SET id_papeleta = ROUND(FLOOR(1 + RAND() * 5))
WHERE id_papeleta > 5;

DELETE FROM papeleta_en_voto
WHERE id_voto IN (
    SELECT id_voto
    FROM voto_circuito_en_instancia_electiva
    WHERE id_tipo_voto IN (2, 3) -- si el voto es anulado o en blanco no debería tener papeleta asociada
);

DELETE FROM voto_circuito_en_instancia_electiva
WHERE id_tipo_voto = 1
  AND id_voto NOT IN (
    SELECT id_voto FROM (
      SELECT DISTINCT id_voto
      FROM papeleta_en_voto
    ) AS votos_validos
);


-- Corrigiendo inserciones para que todas las papeletas lista tengan un presidente
UPDATE integrante_en_papeleta_lista SET id_rol = 1
    WHERE id_papeleta_lista = 5 AND id_rol = 5;
