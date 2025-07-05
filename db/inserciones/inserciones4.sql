-- Inserciones para estadísticas de votación circuito - ubicación

INSERT INTO zona (nombre, id_departamento) VALUES
('Artigas', 1),
('Canelones', 2),
('Melo', 3),
('Colonia del Sacramento', 4),
('Durazno', 5),
('Trinidad', 6),
('Florida', 7),
('Minas', 8),
('Maldonado', 9),
-- Montevideo no lo agregamos, porque ahí tomamos como zona a los distintos barrios.
('Paysandú', 11),
('Fray Bentos', 12),
('Rivera', 13),
('Rocha', 14),
('Salto', 15),
('San José de Mayo', 16),
('Mercedes', 17),
('Tacuarembó', 18),
('Treinta y Tres', 19);

INSERT INTO circuito_ie_ubicacion (id_circuito, id_instancia_electiva, id_establecimiento) VALUES
(1, 1, 1),  -- Montevideo - Centro
(2, 1, 2),  -- Montevideo - Pocitos
(3, 1, 3),  -- Montevideo - Carrasco
(4, 1, 4),  -- Montevideo - Parque Rodó
(5, 1, 5),  -- Montevideo - Tres Cruces
(6, 1, 6),  -- Artigas
(7, 1, 7),  -- Canelones
(8, 1, 8),  -- Cerro Largo (Melo)
(9, 1, 9),  -- Colonia
(10, 1, 10), -- Durazno
(11, 1, 11), -- Flores (Trinidad)
(12, 1, 12), -- Florida
(13, 1, 13), -- Lavalleja (Minas)
(14, 1, 14), -- Maldonado
(15, 1, 15); -- Paysandú
