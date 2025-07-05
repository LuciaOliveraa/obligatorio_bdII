-- Creación de tabla que relaciona cada circuito en una instancia electiva
-- con un establecimiento dado.
-- Modificaciones pertinentes necesarias para su creación.

ALTER TABLE policia
DROP FOREIGN KEY fk_establecimiento;

DROP TABLE establecimiento;

CREATE TABLE establecimiento (
    id int AUTO_INCREMENT,
    nombre varchar(50),
    direccion varchar(70),
    id_zona int,
    id_departamento int,
    PRIMARY KEY (id),
    UNIQUE (id, id_zona, id_departamento),
    FOREIGN KEY (id_zona) REFERENCES zona(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_departamento) REFERENCES zona(id_departamento)
        ON DELETE CASCADE
);

ALTER TABLE policia
ADD CONSTRAINT fk_establecimiento FOREIGN KEY (id_establecimiento)
    REFERENCES establecimiento(id)
    ON DELETE SET NULL; -- puede haber un policía sin establecimiento asignado.

CREATE TABLE circuito_ie_ubicacion (
    id_circuito smallint,
    id_instancia_electiva int,
    id_establecimiento int,
    FOREIGN KEY (id_circuito) REFERENCES circuito(id) ON DELETE CASCADE,
    FOREIGN KEY (id_instancia_electiva) REFERENCES instancia_electiva(id) ON DELETE CASCADE,
    FOREIGN KEY (id_establecimiento) REFERENCES establecimiento(id) ON DELETE CASCADE,
    PRIMARY KEY (id_circuito, id_instancia_electiva, id_establecimiento)
);
