use elecciones;

-- modificación de FKs con ON DELETE CASCADE
-- en entidades base

-- ballotage
ALTER TABLE ballotage
DROP FOREIGN KEY ballotage_ibfk_1,
ADD CONSTRAINT fk_ballotage_eleccion
FOREIGN KEY (id) REFERENCES eleccion(id) ON DELETE CASCADE;

-- plebiscito
ALTER TABLE plebiscito
DROP FOREIGN KEY plebiscito_ibfk_1,
ADD CONSTRAINT fk_plebiscito_eleccion
FOREIGN KEY (id) REFERENCES eleccion(id) ON DELETE CASCADE;

-- presidencial
ALTER TABLE presidencial
DROP FOREIGN KEY presidencial_ibfk_1,
ADD CONSTRAINT fk_presidencial_eleccion
FOREIGN KEY (id) REFERENCES eleccion(id) ON DELETE CASCADE;

-- papeleta_ballotage
ALTER TABLE papeleta_ballotage
DROP FOREIGN KEY papeleta_ballotage_ibfk_1,
ADD CONSTRAINT fk_papeleta_ballotage_papeleta
FOREIGN KEY (id) REFERENCES papeleta(id) ON DELETE CASCADE;

-- papeleta_plebiscito
ALTER TABLE papeleta_plebiscito
DROP FOREIGN KEY papeleta_plebiscito_ibfk_1,
ADD CONSTRAINT fk_papeleta_plebiscito_papeleta
FOREIGN KEY (id) REFERENCES papeleta(id) ON DELETE CASCADE;

-- papeleta_lista
ALTER TABLE papeleta_lista
DROP FOREIGN KEY papeleta_lista_ibfk_1,
ADD CONSTRAINT fk_papeleta_lista_papeleta
FOREIGN KEY (id) REFERENCES papeleta(id) ON DELETE CASCADE;

-- integrante_partido
ALTER TABLE integrante_partido
DROP FOREIGN KEY integrante_partido_ibfk_1,
ADD CONSTRAINT fk_integrante_partido_ciudadano
FOREIGN KEY (ci) REFERENCES ciudadano(ci) ON DELETE CASCADE;

-- policia
ALTER TABLE policia
DROP FOREIGN KEY policia_ibfk_1,
ADD CONSTRAINT fk_policia_ciudadano
FOREIGN KEY (ci) REFERENCES ciudadano(ci) ON DELETE CASCADE;

-- miembro_mesa
ALTER TABLE miembro_mesa
DROP FOREIGN KEY miembro_mesa_ibfk_1,
ADD CONSTRAINT fk_miembro_mesa_ciudadano
FOREIGN KEY (ci) REFERENCES ciudadano(ci) ON DELETE CASCADE;
