
use elecciones;

-- RELACIONES

CREATE TABLE eleccion_en_instancia_electiva (
    id_eleccion int,
    id_instancia_electiva int,
    PRIMARY KEY (id_eleccion, id_instancia_electiva),
    FOREIGN KEY (id_eleccion) REFERENCES eleccion(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_instancia_electiva) REFERENCES instancia_electiva(id)
        ON DELETE CASCADE
);

CREATE TABLE circuito_en_instancia_electiva (
    id_circuito smallint,
    id_instancia_electiva int,
    PRIMARY KEY (id_circuito, id_instancia_electiva),
    FOREIGN KEY (id_circuito) REFERENCES circuito(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_instancia_electiva) REFERENCES instancia_electiva(id)
        ON DELETE CASCADE
);

-- Alteración tabla credencial para modelar su relación de debilidad con ciudadano.
ALTER TABLE credencial
ADD COLUMN ci_ciudadano varchar(20) UNIQUE;
    -- En vez de agregar la ci como PK, la agrego de manera UNIQUE, dado que hay solo una credencial por persona
    -- y serie-numero son suficientes para identificar a un individuo y credencial.
    -- Si una persona desea cambiar su credencial, en la transacción de pasar de una a otra
    -- se eliminan los datos de la anterior para llenar los datos de la nueva. (o simplemente se modifican)

ALTER TABLE credencial
ADD CONSTRAINT fk_ci FOREIGN KEY (ci_ciudadano) REFERENCES ciudadano(ci)
        ON DELETE CASCADE;


CREATE TABLE credencial_asignada_circuito_instancia_electiva (
    id int AUTO_INCREMENT,
    serie_credencial varchar(3),
    numero_credencial int,
    id_circuito smallint,
    id_instancia_electiva int,
    voto_realizado boolean,
    UNIQUE (serie_credencial, numero_credencial, id_circuito, id_instancia_electiva), -- como no es PK, se marca como UNIQUE
    PRIMARY KEY (id),
    FOREIGN KEY (serie_credencial, numero_credencial) REFERENCES credencial(serie, numero)
        ON DELETE CASCADE,
    FOREIGN KEY (id_circuito, id_instancia_electiva) REFERENCES circuito_en_instancia_electiva(id_circuito, id_instancia_electiva)
        ON DELETE CASCADE
); -- se crea una PK auto_increment para hacer más eficiente la db


-- Alteración tabla zona para modelar su relación de debilidad con departamento.
-- ALTER TABLE zona
-- ADD COLUMN id_departamento int;

-- ALTER TABLE zona
-- DROP PRIMARY KEY;
-- Estas líneas no se pueden hacer porque "there can only be one auto column and it must be defined as a key.

DROP TABLE zona;

CREATE TABLE zona (
    id int AUTO_INCREMENT,
    nombre varchar(50),
    id_departamento int,
    PRIMARY KEY (id, id_departamento),
    FOREIGN KEY (id_departamento) REFERENCES departamento(id)
        ON DELETE CASCADE
);


-- Alteración tabla establecimiento para modelar su relación de debilidad con zona.
DROP TABLE establecimiento;

CREATE TABLE establecimiento (
    id int AUTO_INCREMENT,
    nombre varchar(50),
    direccion varchar(70),
    id_zona int,
    id_departamento int,
    PRIMARY KEY (id, id_zona, id_departamento),
    FOREIGN KEY (id_zona) REFERENCES zona(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_departamento) REFERENCES zona(id_departamento)
        ON DELETE CASCADE
);


CREATE TABLE mesa_circuito_instancia_electiva (
    ci_miembro_mesa varchar(20),
    id_circuito smallint,
    id_instancia_electiva int,
    id_rol tinyint,
    PRIMARY KEY (ci_miembro_mesa, id_circuito, id_instancia_electiva),
    FOREIGN KEY (ci_miembro_mesa) REFERENCES miembro_mesa(ci)
        ON DELETE CASCADE,
    FOREIGN KEY (id_circuito, id_instancia_electiva) REFERENCES circuito_en_instancia_electiva(id_circuito, id_instancia_electiva)
        ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES rol_miembro_mesa(id)
        ON DELETE SET NULL -- Se puede querer que un funcionario esté en un circuito, pero sin saber su rol todavía
                            -- también puede haber cambios en los roles existentes, sin que se erradique la relación
                            -- miembro mesa - circuito.
                            -- En una eliminación de rol, se puede no querer eliminar los datos de que funcionarios
                            -- corresponden a cada mesa.
);


-- Alteración tabla policia para agregar su relación con establecimiento.
ALTER TABLE policia
ADD COLUMN id_establecimiento int,
ADD COLUMN id_zona_establecimiento int,
ADD COLUMN id_departamento_establecimiento int;

ALTER TABLE policia
ADD CONSTRAINT fk_establecimiento FOREIGN KEY (id_establecimiento, id_zona_establecimiento, id_departamento_establecimiento)
    REFERENCES establecimiento(id, id_zona, id_departamento)
    ON DELETE SET NULL; -- puede haber un policía sin establecimiento asignado.


-- Alteración papeletas para agregar su relación con las elecciones.
ALTER TABLE papeleta_ballotage
ADD COLUMN id_eleccion_ballotage int,
ADD CONSTRAINT fk_ballotage FOREIGN KEY (id_eleccion_ballotage)
    REFERENCES ballotage(id)
    ON DELETE CASCADE;

ALTER TABLE papeleta_plebiscito
ADD COLUMN id_eleccion_plebiscito int,
ADD CONSTRAINT fk_plebiscito FOREIGN KEY (id_eleccion_plebiscito)
    REFERENCES plebiscito(id)
    ON DELETE CASCADE;

ALTER TABLE papeleta_lista
ADD COLUMN id_eleccion_presidencial int,
ADD CONSTRAINT fk_presidencial FOREIGN KEY (id_eleccion_presidencial)
    REFERENCES presidencial(id)
    ON DELETE CASCADE;

-- Alteración voto para modelar su relación con tipo_voto.
ALTER TABLE voto
ADD COLUMN tipo tinyint,
ADD CONSTRAINT fk_tipo_voto FOREIGN KEY (tipo) REFERENCES tipo_voto(id)
    ON DELETE SET NULL;


CREATE TABLE papeleta_en_voto (
    id_voto int,
    id_papeleta int,
    PRIMARY KEY (id_voto, id_papeleta),
    FOREIGN KEY (id_voto) REFERENCES voto(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_papeleta) REFERENCES papeleta(id)
        ON DELETE CASCADE
);


CREATE TABLE voto_circuito_en_instancia_electiva (
    id_voto int,
    id_circuito smallint,
    id_instancia_electiva int,
    fecha_hora datetime,
    observado boolean,
    PRIMARY KEY (id_voto), -- solo voto como PK porque un voto solo puede estar en un circuito.
                            -- Se considera id_voto un int auto_increment, por ende, no se va a repetir.
    FOREIGN KEY (id_voto) REFERENCES voto(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_circuito, id_instancia_electiva)
        REFERENCES circuito_en_instancia_electiva(id_circuito, id_instancia_electiva)
        ON DELETE CASCADE
);


-- Alteración integrante para que contemple su relación con partido_politico.
ALTER TABLE integrante_partido
ADD COLUMN id_partido int,
ADD CONSTRAINT fk_partido FOREIGN KEY (id_partido) REFERENCES partido_politico(id)
    ON DELETE CASCADE; -- Los requerimientos no especifican que se necesite guardar el dato
                        -- de los ciudadanos que alguna vez fueron parte de un partido.

ALTER TABLE integrante_partido
DROP PRIMARY KEY, 
ADD CONSTRAINT PRIMARY KEY (ci, id_partido);

ALTER TABLE integrante_partido
UNIQUE (ci);

-- Presidente y vicepresidente de partido político.
CREATE TABLE preside_vicepreside_partido (
    id_rol tinyint,
    id_integrante_partido varchar(20),
    id_partido_politico int,
    PRIMARY KEY (id_rol, id_partido_politico), -- si se agregara a la PK el integrante, se permitiría que hubieran dos presidentes por partido.
    FOREIGN KEY (id_rol) REFERENCES rol_integrante_partido_politico(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_integrante_partido) REFERENCES integrante_partido(ci)
        ON DELETE SET NULL,
    FOREIGN KEY (id_partido_politico) REFERENCES partido_politico(id)
        ON DELETE CASCADE
);


CREATE TABLE integrante_apoya_candidato (
    id_integrante varchar(20),
    id_integrante_candidato varchar(20),
    PRIMARY KEY (id_integrante), -- un integrante apoya a un y solo un candidato. Elección a elección este dato se actualiza.
    FOREIGN KEY (id_integrante) REFERENCES integrante_partido(ci)
        ON DELETE CASCADE,
    FOREIGN KEY (id_integrante_candidato) REFERENCES integrante_partido(ci)
        ON DELETE CASCADE
);


-- Alteración papeleta_lista para contemplar relación con partido_político.
ALTER TABLE papeleta_lista
ADD COLUMN id_partido_politico int,
ADD CONSTRAINT fk_partido_papeleta FOREIGN KEY (id_partido_politico)
    REFERENCES partido_politico(id)
    ON DELETE CASCADE;

CREATE TABLE integrante_en_papeleta_lista (
    id_integrante varchar(20), -- un integrante puede estar en distintas listas
    id_partido_politico int,
    id_papeleta_lista int,
    orden int,
    id_rol int,
    PRIMARY KEY (id_papeleta_lista, id_integrante, orden),
    FOREIGN KEY (id_integrante, id_partido_politico) REFERENCES integrante_partido(ci, id_partido)
        ON DELETE CASCADE,
    FOREIGN KEY (id_papeleta_lista) REFERENCES papeleta_lista(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES rol_en_papeleta_lista(id)
        ON DELETE SET NULL
);

