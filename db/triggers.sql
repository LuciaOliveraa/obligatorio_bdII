
-- TRIGGERS

DELIMITER //

CREATE TRIGGER validar_partido_papeleta
BEFORE INSERT ON integrante_en_papeleta_lista
FOR EACH ROW
BEGIN
    DECLARE partido_papeleta INT;

    -- Obtener el partido político desde la tabla papeleta_lista
    SELECT id_partido_politico
    INTO partido_papeleta
    FROM papeleta_lista
    WHERE papeleta_lista.id = NEW.papeleta_lista.id;

    -- Comparar con el valor insertado
    IF partido_papeleta IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La papeleta especificada no existe.';
    ELSEIF partido_papeleta != NEW.id_partido_politico THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El id_partido_politico del integrante no coincide con el de la papeleta.';
    END IF;
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER validar_serie_solo_letras
BEFORE INSERT ON credencial
FOR EACH ROW
BEGIN
    IF NEW.serie NOT REGEXP '^[A-Za-z]+$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El campo debe contener solamente letras.';
    END IF;
END;
//

DELIMITER ;



-- agregar trigger para ci?
