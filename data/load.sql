INSERT INTO locations VALUES 
('1', '571 Escondido Mall', 'Stanford', 'United States', 37.426125, -122.167036, '94301', 'CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);
INSERT INTO locations VALUES 
('2', '271 University Ave', 'Palo Alto', 'United States', 37.44568447463292, -122.16192937550616, '94301', 'CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 5);
INSERT INTO locations VALUES
('3', '151 University Ave',  'Palo Alto',  'United States',  37.444233037747495,  -122.16332645468314,  '94301',  'CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3);
INSERT INTO locations VALUES 
('4', '395 Page Mill Rd.', 'Palo Alto',  'United States',  37.42522656533895,  -122.13922429799865,  '94306',  'CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 4);
INSERT INTO locations VALUES 
('5', '101 Forest Ave.',  'Palo Alto',  'United States',  37.442086282055726,  -122.16159119091502,  '94301',  'CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2);

INSERT INTO places VALUES ('1', NULL, 'Coupa Green Library', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, '1');
INSERT INTO places VALUES ('2', NULL, 'Philz Coffee', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, '5');
INSERT INTO places VALUES ('3', NULL, 'La Boulange de Palo Alto', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, '3');
INSERT INTO places VALUES ('4', NULL, 'GroundUp AOL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, '4');
INSERT INTO places VALUES ('5', NULL, 'University Cafe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, '2');

INSERT INTO guides VALUES ('1', 'Snobbery Guide', 'Palo Alto, CA', 'A guide to exquisite coffee.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1');
INSERT INTO guides VALUES ('2', 'Super Caffeinated', 'Palo Alto, CA', 'Get super caffeinated!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1');

INSERT INTO guidesplaces VALUES ('1', '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO guidesplaces VALUES ('2', '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO guidesplaces VALUES ('4', '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO guidesplaces VALUES ('1', '2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO guidesplaces VALUES ('3', '2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO guidesplaces VALUES ('5', '2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO categories VALUES ('1', 'Coffee', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
INSERT INTO categories VALUES ('2', 'Food', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
INSERT INTO categories VALUES ('3', 'Drinks', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
INSERT INTO categories VALUES ('4', 'Shopping', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
INSERT INTO categories VALUES ('5', 'Clubs', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

ALTER SEQUENCE locations_id_seq RESTART WITH 6;
ALTER SEQUENCE places_id_seq RESTART WITH 6;
ALTER SEQUENCE guides_id_seq RESTART WITH 3;
