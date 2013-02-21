DROP TABLE guides;
DROP TABLE locations;
DROP TABLE places;

INSERT INTO locations VALUES 
('1', '571 Escondido Mall', 'Stanford', 'United States', 37.442086282055726, -122.16159119091502, '94301', 'CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);
INSERT INTO locations VALUES 
('2', '271 University Ave', 'Palo Alto', 'United States', 37.44568447463292, -122.16192937550616, '94301', 'CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 5);
INSERT INTO locations VALUES
('3', '151 University Ave',  'Palo Alto',  'United States',  37.444233037747495,  -122.16332645468314,  '94301',  'CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3);
INSERT INTO locations VALUES 
('4', '395 Page Mill Rd.', 'Palo Alto',  'United States',  37.42522656533895,  -122.13922429799865,  '94306',  'CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 4);
INSERT INTO locations VALUES 
('5', '101 Forest Ave.',  'Palo Alto',  'United States',  37.442086282055726,  -122.16159119091502,  '94301',  'CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2);

INSERT INTO places VALUES ('1', 'Coupa Green Library', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0, '1');
INSERT INTO places VALUES ('2', 'Philz Coffee', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0, '5');
INSERT INTO places VALUES ('3', 'La Boulange de Palo Alto', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0, '3');
INSERT INTO places VALUES ('4', 'GroundUp AOL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0, '4');
INSERT INTO places VALUES ('5', 'University Cafe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0, '2');

INSERT INTO guides VALUES ('1', 'Snobbery Guide', 'Palo Alto, CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO guides VALUES ('2', 'Super Caffeinated', 'Palo Alto, CA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO guidesplaces VALUES ('1', '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO guidesplaces VALUES ('2', '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO guidesplaces VALUES ('4', '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO guidesplaces VALUES ('1', '2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO guidesplaces VALUES ('2', '2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO guidesplaces VALUES ('4', '2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);