-- Cambiando de lugar info voto observado.

ALTER TABLE voto_circuito_en_instancia_electiva
DROP COLUMN observado;

ALTER TABLE credencial_asignada_circuito_instancia_electiva
ADD COLUMN observado boolean DEFAULT false;
