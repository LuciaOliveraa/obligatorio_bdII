
-- USE IC_Grupo4;
-- use elecciones;

-- Creación tabla estado del circuito
CREATE TABLE estado_circuito (
    id tinyint auto_increment,
    descripcion varchar(50),
    PRIMARY KEY (id)
);

-- Alteración tabla circuito para que cada circuito tenga asociado un estado
ALTER TABLE circuito
ADD COLUMN id_estado tinyint;

ALTER TABLE circuito
ADD CONSTRAINT fk_estado
    FOREIGN KEY circuito(id_estado) REFERENCES estado_circuito(id);


-- login miembro de mesa
CREATE TABLE login_miembro_mesa (
    usuario varchar (30),
    contraseña varchar(30),
    ci_miembro_mesa varchar(20) UNIQUE,     -- solo puede haber un usuario por miembro de mesa
    FOREIGN KEY login_miembro_mesa(ci_miembro_mesa) REFERENCES miembro_mesa(ci),
    PRIMARY KEY (usuario)
);


-- login circuito
CREATE TABLE login_circuito (
    usuario varchar (30),
    contraseña varchar(30),
    id_circuito smallint UNIQUE,       -- hay solo un usuario por circuito
    FOREIGN KEY login_circuito(id_circuito) REFERENCES  circuito(id),
    PRIMARY KEY (usuario)
);
