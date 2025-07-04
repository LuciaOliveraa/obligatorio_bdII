
-- use elecciones;

-- ROLES
-- Este script solo funciona si estas conectado al servidor de la ucu. Mentira!! En ese servidor no tenemos permitido crear roles o usuarios.


CREATE ROLE IF NOT EXISTS 'administrador_rol';
CREATE ROLE IF NOT EXISTS 'encargado_circuito_rol';

-- Permisos admin (todo).
GRANT ALL PRIVILEGES ON IC_Grupo4.* TO 'administrador_rol';
-- permisos basados en los del usuario que se nos brindó en el servidor

-- Permisos encargado_circuito
GRANT SELECT ON IC_Grupo4.* TO 'encargado_circuito_rol'; -- puede consultar todo
GRANT INSERT, UPDATE ON IC_Grupo4.voto_circuito_en_instancia_electiva TO 'encargado_circuito_rol';
    -- puede registrar y modificar votos
GRANT UPDATE ON IC_Grupo4.credencial_asignada_circuito_instancia_electiva TO 'encargado_circuito_rol';
    -- puede modificar si una persona votó o no

-- Asignarte ambos roles (o el que necesites)
GRANT 'administrador_rol', 'encargado_circuito_rol' TO 'ic_g4_admin'@'%';

-- Activar uno a la vez según necesidad.
-- SET ROLE 'encargado_circuito_rol'; -- descomentar cuando se corra la app

-- SET ROLE 'administrador_rol'; -- descomentar cuando se ingresen datos, o se modifique la estructura de la base
