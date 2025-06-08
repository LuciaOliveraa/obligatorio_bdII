-- Creación de Data Base
CREATE DATABASE elecciones;

use elecciones;

-- Creación de tablas de ENTIDADES base

CREATE TABLE eleccion (
    id int AUTO_INCREMENT,
    PRIMARY KEY (id)
);

CREATE TABLE ballotage (
    id int,
    FOREIGN KEY (id) REFERENCES eleccion(id)
);

CREATE TABLE plebiscito (
    id int PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES eleccion(id)
);

CREATE TABLE presidencial (
    id int PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES eleccion(id)
);

CREATE TABLE papeleta (
    id int AUTO_INCREMENT,
    descripcion varchar(100),
    PRIMARY KEY (id)
);

CREATE TABLE papeleta_ballotage (
    id int PRIMARY KEY,
    candidato varchar(100),
    FOREIGN KEY (id) REFERENCES papeleta(id)
);

CREATE TABLE papeleta_plebiscito (
    id int PRIMARY KEY,
    color varchar(50),
    FOREIGN KEY (id) REFERENCES papeleta(id)
);

CREATE TABLE papeleta_lista (
    id int PRIMARY KEY,
    lema varchar(150),
    num_lista int,
    FOREIGN KEY (id) REFERENCES papeleta(id)
);

CREATE TABLE rol_en_papeleta_lista (
    id int,
    descripcion varchar(50),
    PRIMARY KEY (id)
);

CREATE TABLE voto (
    id int AUTO_INCREMENT,
    observado boolean,
    PRIMARY KEY (id)
);

CREATE TABLE tipo_voto (
    id tinyint AUTO_INCREMENT,
    descripcion varchar(150),
    PRIMARY KEY (id)
);

CREATE TABLE circuito (
    id smallint AUTO_INCREMENT,
    accesible boolean,
    PRIMARY KEY (id)
);

CREATE TABLE instancia_electiva (
    id int AUTO_INCREMENT,
    fecha date,
    PRIMARY KEY (id)
);

CREATE TABLE credencial (
    serie varchar(3),
    numero int,
    fecha_expedido date,
    PRIMARY KEY (serie, numero)
);

CREATE TABLE ciudadano (
    ci varchar(20),
    nombre varchar(30),
    apellido varchar(60),
    fecha_nacimiento date,
    PRIMARY KEY (ci)
);

CREATE TABLE integrante_partido (
    ci varchar(20),
    PRIMARY KEY (ci),
    FOREIGN KEY (ci) REFERENCES ciudadano(ci)
);

CREATE TABLE policia (
    ci varchar(20),
    comisaria varchar(20),
    PRIMARY KEY (ci),
    FOREIGN KEY (ci) REFERENCES ciudadano(ci)
);

CREATE TABLE miembro_mesa (
    ci varchar(20),
    organismo_estado varchar(60),
    PRIMARY KEY (ci),
    FOREIGN KEY (ci) REFERENCES ciudadano(ci)
);

CREATE TABLE rol_miembro_mesa (
    id tinyint AUTO_INCREMENT,
    descripcion varchar(50),
    PRIMARY KEY (id)
);

CREATE TABLE partido_politico (
    id int AUTO_INCREMENT,
    direccion_sede varchar(60),
    PRIMARY KEY (id)
);

CREATE TABLE rol_integrante_partido_politico (
    id tinyint AUTO_INCREMENT,
    descripcion varchar(50),
    PRIMARY KEY (id)
);

CREATE TABLE establecimiento (
    id int AUTO_INCREMENT,
    nombre varchar(50),
    direccion varchar(70),
    PRIMARY KEY (id)
);

CREATE TABLE zona (
    id int AUTO_INCREMENT,
    nombre varchar(50),
    PRIMARY KEY (id)
);

CREATE TABLE departamento (
    id int AUTO_INCREMENT,
    nombre varchar(50),
    PRIMARY KEY (id)
);

