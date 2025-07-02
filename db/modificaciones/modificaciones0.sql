-- Modificaciones a las tablas voto_circuito_en_instancia_electiva y papeleta_en_voto
-- para que ya no se necesite la tabla voto.
-- Las inserciones y select se vuelven más dinámicos


-- agregamos el tipo del voto a la tabla que lo crea para que tenga toda la info necesaria
ALTER TABLE voto_circuito_en_instancia_electiva
ADD COLUMN id_tipo_voto tinyint;

ALTER TABLE voto_circuito_en_instancia_electiva
ADD CONSTRAINT fk_tipo_voto_cirinstel FOREIGN KEY (id_tipo_voto) REFERENCES tipo_voto(id);

-- borramos fk id_voto para que ya no esté relacionada con voto
ALTER TABLE voto_circuito_en_instancia_electiva DROP FOREIGN KEY voto_circuito_en_instancia_electiva_ibfk_1;

ALTER TABLE voto_circuito_en_instancia_electiva MODIFY id_voto INT AUTO_INCREMENT;

-- borramos constraint fk en papeleta_en_voto para que ya no dependa de voto
-- queremos que dependa de voto_circuito_en_instancia_electiva
ALTER TABLE papeleta_en_voto DROP FOREIGN KEY papeleta_en_voto_ibfk_1;

ALTER TABLE papeleta_en_voto
ADD CONSTRAINT fk_id_voto FOREIGN KEY (id_voto) REFERENCES voto_circuito_en_instancia_electiva(id_voto);

DROP TABLE voto;

-- rellena id_tipo_voto de los valores que ya estaban agregados a la base
UPDATE voto_circuito_en_instancia_electiva
SET id_tipo_voto = CASE
  WHEN id_voto BETWEEN 1 AND 50 THEN 1
  WHEN id_voto BETWEEN 51 AND 60 THEN 2
  WHEN id_voto BETWEEN 61 AND 70 THEN 3
END
WHERE id_voto BETWEEN 1 AND 70;
