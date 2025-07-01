INSERT INTO papeleta_lista (id, lema, num_lista, id_eleccion_presidencial, id_partido_politico) VALUES
(1, 'Un país para todos', 101, 1, 1),
(2, 'Futuro con justicia', 22, 1, 1),
(3, 'Cambio real, ahora', 303, 1, 2),
(4, 'Unidad y esperanza', 45, 1, 2),
(5, 'Renovación responsable', 9, 1, 3);

INSERT INTO integrante_en_papeleta_lista (id_integrante, id_partido_politico, id_papeleta_lista, orden, id_rol) VALUES
-- Papeleta 1 (Partido 1)
('1.467.847-6', 1, 1, 1, 1),
('3.673.986-3', 1, 1, 2, 2),
('4.409.196-6', 1, 1, 3, 3),
('7.997.573-3', 1, 1, 4, 4),

-- Papeleta 2 (Partido 1)
('8.331.044-4', 1, 2, 1, 5),
('8.416.469-2', 1, 2, 2, 1),
('8.476.256-6', 1, 2, 3, 2),
('8.586.431-1', 1, 2, 4, 3),

-- Papeleta 3 (Partido 2)
('2.572.090-8', 2, 3, 1, 4),
('3.955.567-2', 2, 3, 2, 5),
('5.055.109-6', 2, 3, 3, 1),
('7.073.299-4', 2, 3, 4, 2),

-- Papeleta 4 (Partido 2)
('8.531.623-0', 2, 4, 1, 3),
('9.090.524-3', 2, 4, 2, 4),
('1.918.115-4', 3, 4, 3, 5),
('3.447.151-4', 3, 4, 4, 1),

-- Papeleta 5 (Partido 3)
('3.653.515-6', 3, 5, 1, 2),
('5.125.276-8', 3, 5, 2, 3),
('6.160.974-6', 3, 5, 3, 4),
('8.988.078-9', 3, 5, 4, 5);


INSERT INTO mesa_circuito_instancia_electiva (ci_miembro_mesa, id_circuito, id_instancia_electiva, id_rol) VALUES
('1.467.847-6', 1, 1, 1),
('3.673.986-3', 1, 1, 2),
('4.409.196-6', 1, 1, 3),

('7.997.573-3', 2, 1, 1),
('8.331.044-4', 2, 1, 2),
('8.416.469-2', 2, 1, 3),

('8.476.256-6', 3, 1, 1),
('8.531.623-0', 3, 1, 2),
('8.586.431-1', 3, 1, 3),

('2.572.090-8', 4, 1, 1),
('3.955.567-2', 4, 1, 2),
('5.055.109-6', 4, 1, 3),

('5.125.276-8', 5, 1, 1),
('6.160.974-6', 5, 1, 2),
('7.073.299-4', 5, 1, 3),

('1.918.115-4', 6, 1, 1),
('3.447.151-4', 6, 1, 2),
('3.653.515-6', 6, 1, 3),

('8.988.078-9', 7, 1, 1),
('9.090.524-3', 7, 1, 2);
-- circuito 7 no tiene vocal
-- circuitos del 8 al 15 no tienen miembros de mesa


-- no hay inserciones en preside_vice_preside_partido porque no se necesitan para probar la app
